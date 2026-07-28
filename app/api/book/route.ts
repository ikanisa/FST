import { serverEnv } from "../../../lib/server-env";
import { siteConfig } from "../../../lib/site-config";

type BookingPayload = {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  context?: unknown;
  start?: unknown;
  duration?: unknown;
  timezone?: unknown;
  privacy_consent?: unknown;
  company_website?: unknown;
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const bookingWindows = new Map<string, { count: number; resetAt: number }>();
const bookingWindowMs = 10 * 60 * 1000;
const bookingWindowLimit = 6;

function hasTrustedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const requestOrigin = new URL(request.url).origin;
  return origin === requestOrigin || origin === siteConfig.url;
}

function isRateLimited(request: Request) {
  const forwarded = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!forwarded) return false;

  const now = Date.now();
  const current = bookingWindows.get(forwarded);
  if (!current || current.resetAt <= now) {
    bookingWindows.set(forwarded, { count: 1, resetAt: now + bookingWindowMs });
    return false;
  }

  current.count += 1;
  if (bookingWindows.size > 10_000) {
    for (const [key, value] of bookingWindows) {
      if (value.resetAt <= now) bookingWindows.delete(key);
    }
  }
  return current.count > bookingWindowLimit;
}

function text(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}
async function accessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!response.ok) throw new Error("calendar_auth_failed");
  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("calendar_auth_failed");
  return data.access_token;
}

export async function POST(request: Request) {
  if (!hasTrustedOrigin(request)) return json({ error: "origin_not_allowed" }, 403);
  if (isRateLimited(request)) {
    return Response.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "600" } },
    );
  }

  let payload: BookingPayload;
  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  if (text(payload.company_website, 200)) return json({ ok: true });

  const name = text(payload.name, 120);
  const email = text(payload.email, 254).toLowerCase();
  const organisation = text(payload.organisation, 160);
  const context = text(payload.context, 3000);
  const timezone = text(payload.timezone, 80) || "Europe/Malta";
  const duration = Number(payload.duration);
  const start = new Date(text(payload.start, 64));
  const consent = payload.privacy_consent === "agreed" || payload.privacy_consent === true;

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !consent || ![30, 60].includes(duration) || Number.isNaN(start.getTime())) {
    return json({ error: "validation_failed" }, 400);
  }

  const now = Date.now();
  if (start.getTime() < now + 60 * 60 * 1000 || start.getTime() > now + 180 * 24 * 60 * 60 * 1000) {
    return json({ error: "time_out_of_range" }, 400);
  }

  const end = new Date(start.getTime() + duration * 60 * 1000);
  const bindings = serverEnv();
  const calendarId = bindings.GOOGLE_CALENDAR_ID || "primary";
  const calendarTimezone = bindings.GOOGLE_CALENDAR_TIMEZONE || timezone;
  if (!bindings.GOOGLE_CALENDAR_CLIENT_ID || !bindings.GOOGLE_CALENDAR_CLIENT_SECRET || !bindings.GOOGLE_CALENDAR_REFRESH_TOKEN) {
    return json({ error: "booking_not_configured" }, 503);
  }

  try {
    const token = await accessToken(
      bindings.GOOGLE_CALENDAR_CLIENT_ID,
      bindings.GOOGLE_CALENDAR_CLIENT_SECRET,
      bindings.GOOGLE_CALENDAR_REFRESH_TOKEN,
    );
    const authorization = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const availabilityResponse = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: authorization,
      body: JSON.stringify({
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        timeZone: calendarTimezone,
        items: [{ id: calendarId }],
      }),
    });
    if (!availabilityResponse.ok) throw new Error("availability_failed");
    const availability = (await availabilityResponse.json()) as { calendars?: Record<string, { busy?: unknown[] }> };
    if ((availability.calendars?.[calendarId]?.busy?.length || 0) > 0) {
      return json({ error: "slot_unavailable" }, 409);
    }

    const eventResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: "POST",
        headers: authorization,
        body: JSON.stringify({
          summary: `FST advisory conversation — ${name}`,
          description: `Website booking request\n\nName: ${name}\nEmail: ${email}\nOrganisation: ${organisation || "Not provided"}\n\nContext:\n${context || "Not provided"}`,
          start: { dateTime: start.toISOString(), timeZone: calendarTimezone },
          end: { dateTime: end.toISOString(), timeZone: calendarTimezone },
          attendees: [
            { email, displayName: name },
            ...siteConfig.bookingRecipients
              .filter((recipient) => recipient !== email)
              .map((recipient) => ({ email: recipient })),
          ],
          conferenceData: {
            createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } },
          },
          guestsCanModify: false,
          reminders: { useDefault: true },
        }),
      },
    );
    if (!eventResponse.ok) throw new Error("event_creation_failed");
    const event = (await eventResponse.json()) as { htmlLink?: string; hangoutLink?: string; id?: string };
    return json({ ok: true, eventId: event.id, calendarUrl: event.htmlLink, meetUrl: event.hangoutLink });
  } catch {
    return json({ error: "calendar_service_unavailable" }, 502);
  }
}
