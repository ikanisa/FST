"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { trackConversion } from "../../lib/analytics";
import { googleCalendarTemplateUrl, siteConfig } from "../../lib/site-config";

type BookingResult = { calendarUrl?: string; meetUrl?: string; error?: string };

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "unavailable" | "error">("idle");
  const [result, setResult] = useState<BookingResult>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("company_website")) return;

    const localStart = new Date(String(values.get("start") || ""));
    const duration = Number(values.get("duration"));
    if (Number.isNaN(localStart.getTime())) return;

    const payload = {
      name: String(values.get("name") || ""),
      email: String(values.get("email") || ""),
      organisation: String(values.get("organisation") || ""),
      context: String(values.get("context") || ""),
      start: localStart.toISOString(),
      duration,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      privacy_consent: values.get("privacy_consent"),
      company_website: values.get("company_website"),
    };

    setStatus("submitting");
    trackConversion("booking_form_submit");
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as BookingResult;
      if (response.ok) {
        setResult(data);
        setStatus("success");
        trackConversion("booking_created");
        return;
      }
      if (data.error === "booking_not_configured" || data.error === "calendar_service_unavailable") {
        const fallbackUrl = googleCalendarTemplateUrl({
          start: localStart,
          end: new Date(localStart.getTime() + duration * 60 * 1000),
          name: payload.name,
          email: payload.email,
          context: payload.context,
        });
        setResult({ calendarUrl: fallbackUrl });
        setStatus("unavailable");
        return;
      }
      setResult(data);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="booking-success" role="status">
        <p className="eyebrow">Meeting confirmed</p>
        <h2>Your invitation is on its way.</h2>
        <p>Google Calendar has sent the invitation to you and FST’s scheduling contacts. Use the links below if you would like to open it now.</p>
        <div className="booking-result-actions">
          {result.calendarUrl && <a className="text-link" href={result.calendarUrl} target="_blank" rel="noreferrer">Open Calendar event</a>}
          {result.meetUrl && <a className="text-link" href={result.meetUrl} target="_blank" rel="noreferrer">Open Google Meet</a>}
        </div>
        <button type="button" className="reset-button" onClick={() => setStatus("idle")}>Request another time</button>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="booking-success" role="status">
        <p className="eyebrow">Calendar handoff</p>
        <h2>Complete this request in Google Calendar.</h2>
        <p>The selected time is ready in a pre-addressed calendar invitation. Add Google Meet, review the details and send it to FST for confirmation.</p>
        {result.calendarUrl && <a className="text-link" href={result.calendarUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("booking_fallback_open")}>Open Google Calendar</a>}
        <button type="button" className="reset-button" onClick={() => setStatus("idle")}>Choose another time</button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <input type="hidden" name="company_website" value="" readOnly />
      <div className="field-row">
        <label>Full name<input name="name" autoComplete="name" required /></label>
        <label>Work email<input type="email" name="email" autoComplete="email" required /></label>
      </div>
      <label>Organisation<input name="organisation" autoComplete="organization" /></label>
      <div className="field-row">
        <label>Preferred date and time<input type="datetime-local" name="start" required /></label>
        <label>Duration<select name="duration" defaultValue="30"><option value="30">30 minutes</option><option value="60">60 minutes</option></select></label>
      </div>
      <label>What would you like to discuss?<textarea name="context" rows={4} /></label>
      <label className="consent-check">
        <input type="checkbox" name="privacy_consent" value="agreed" required />
        <span>I agree that FST may use these details to arrange and respond to this meeting request, as explained in the <Link href="/privacy">privacy policy</Link>.</span>
      </label>
      {status === "error" && <p className="form-error" role="alert">{result.error === "slot_unavailable" ? "That time is no longer available. Please choose another." : "We could not complete the booking. Please try again or contact us by phone or WhatsApp."}</p>}
      <button className="submit-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Checking availability…" : siteConfig.primaryCtaLabel}</button>
      <p className="booking-note">Times are subject to availability. Confirmed bookings receive a Google Calendar invitation with a Google Meet link.</p>
      {siteConfig.appointmentScheduleUrl && <a className="schedule-link" href={siteConfig.appointmentScheduleUrl} target="_blank" rel="noreferrer">Or view all available times in Google Calendar</a>}
    </form>
  );
}
