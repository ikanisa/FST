import { getJurisdiction } from "../../../../lib/jurisdictions";
import { serverEnv } from "../../../../lib/server-env";
import { siteConfig } from "../../../../lib/site-config";
import { getSectorCatalogueEntry, getSectorPackageById } from "../../../../lib/sector-packages";

type Payload = {
  jurisdiction?: unknown;
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  phone?: unknown;
  message?: unknown;
  serviceIds?: unknown;
  packageId?: unknown;
  packageVersion?: unknown;
  packageEntryId?: unknown;
  scopeAnswers?: unknown;
  addonIds?: unknown;
  atomicServiceIds?: unknown;
  quoteStatus?: unknown;
  privacy_consent?: unknown;
  company_website?: unknown;
  sourcePath?: unknown;
};

const windows = new Map<string, { count: number; resetAt: number }>();
const windowMs = 10 * 60 * 1000;
const limit = 8;

function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function trustedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const requestOrigin = new URL(request.url).origin;
  return origin === requestOrigin || origin === siteConfig.url;
}

function rateLimited(request: Request, jurisdiction: string) {
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!ip) return false;
  const key = `${jurisdiction}:${ip}`;
  const now = Date.now();
  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

export async function POST(request: Request) {
  if (!trustedOrigin(request)) return json({ error: "origin_not_allowed" }, 403);

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const jurisdiction = getJurisdiction(text(payload.jurisdiction, 2).toLowerCase());
  if (!jurisdiction) return json({ error: "invalid_jurisdiction" }, 400);
  if (rateLimited(request, jurisdiction.code)) return json({ error: "rate_limited" }, 429, { "Retry-After": "600" });
  if (text(payload.company_website, 200)) return json({ ok: true });

  const name = text(payload.name, 120);
  const email = text(payload.email, 254).toLowerCase();
  const organisation = text(payload.organisation, 160);
  const phone = text(payload.phone, 40);
  const message = text(payload.message, 3000);
  const sourcePath = text(payload.sourcePath, 240) || `/${jurisdiction.code}/contact`;
  const consent = payload.privacy_consent === "agreed" || payload.privacy_consent === true;
  const serviceIds = Array.isArray(payload.serviceIds)
    ? payload.serviceIds.map((value) => text(value, 80)).filter(Boolean).slice(0, 30)
    : [];
  const packageId = text(payload.packageId, 80);
  const packageItem = packageId ? getSectorPackageById(jurisdiction.code, packageId) : undefined;
  if (packageId && !packageItem) return json({ error: "invalid_sector_package" }, 400);
  const packageVersion = packageItem ? text(payload.packageVersion, 40) : "";
  if (packageItem && packageVersion !== packageItem.version) return json({ error: "package_version_mismatch" }, 409);
  const packageEntryId = packageItem ? text(payload.packageEntryId, 80) : "";
  const packageEntry = packageItem && packageEntryId ? getSectorCatalogueEntry(packageItem, packageEntryId) : undefined;
  if (packageEntryId && !packageEntry) return json({ error: "invalid_package_entry" }, 400);
  const validAddonIds = new Set(packageItem?.addOns.map((addOn) => addOn.id) || []);
  const addonIds = packageItem && Array.isArray(payload.addonIds)
    ? payload.addonIds.map((value) => text(value, 80)).filter((value) => validAddonIds.has(value)).slice(0, packageItem.addOns.length)
    : [];
  const atomicServiceIds = packageEntry ? packageEntry.atomicServiceIds : packageItem?.atomicServiceIds || [];
  const scopeSource = payload.scopeAnswers && typeof payload.scopeAnswers === "object" && !Array.isArray(payload.scopeAnswers)
    ? payload.scopeAnswers as Record<string, unknown>
    : {};
  const scopeAnswers = packageItem ? {
    locations: text(scopeSource.locations, 3),
    employees: text(scopeSource.employees, 20),
    workload: text(scopeSource.workload, 20),
    records: text(scopeSource.records, 20),
    regulatedEvent: scopeSource.regulatedEvent === true,
  } : {};
  const requestedQuoteStatus = text(payload.quoteStatus, 40);
  const quoteStatus = packageItem && ["scope_requested", "indicative_fit", "manual_review_required"].includes(requestedQuoteStatus)
    ? requestedQuoteStatus
    : packageItem ? "scope_requested" : "";

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message || !consent) {
    return json({ error: "validation_failed" }, 400);
  }
  if (!sourcePath.startsWith(`/${jurisdiction.code}`)) return json({ error: "jurisdiction_path_mismatch" }, 400);

  const db = serverEnv().DB;
  if (!db) return json({ error: "enquiry_storage_not_configured" }, 503);

  const now = new Date().toISOString();
  const requestId = `ENQ-${jurisdiction.code.toUpperCase()}-${now.slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  try {
    await db.prepare(`
      INSERT INTO enquiries (
        id, jurisdiction, name, email, organisation, phone, message,
        service_ids_json, package_id, package_version, package_entry_id, scope_answers_json,
        addon_ids_json, atomic_service_ids_json, quote_status,
        source_path, status, privacy_consent_at,
        created_at, updated_at, version
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, 1)
    `).bind(
      requestId,
      jurisdiction.code,
      name,
      email,
      organisation,
      phone,
      message,
      JSON.stringify(serviceIds),
      packageItem?.id || "",
      packageVersion,
      packageEntry?.id || "",
      JSON.stringify(scopeAnswers),
      JSON.stringify(addonIds),
      JSON.stringify(atomicServiceIds),
      quoteStatus,
      sourcePath,
      now,
      now,
      now,
    ).run();
  } catch {
    return json({ error: "enquiry_storage_unavailable" }, 503);
  }

  return json({ ok: true, requestId, jurisdiction: jurisdiction.code }, 201);
}
