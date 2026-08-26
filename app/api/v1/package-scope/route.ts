import { getJurisdiction } from "../../../../lib/jurisdictions";
import { formatSectorPackagePrice, getSectorCatalogueEntries, getSectorPackage } from "../../../../lib/sector-packages";

type ScopePayload = {
  jurisdiction?: unknown;
  packageSlug?: unknown;
  packageVersion?: unknown;
  locations?: unknown;
  employees?: unknown;
  workload?: unknown;
  records?: unknown;
  regulatedEvent?: unknown;
  addOnIds?: unknown;
};

const employeeBands = new Set(["1-5", "6-10", "11-20", "21+"]);
const workloadBands = new Set(["entry", "growth", "complex"]);
const recordStates = new Set(["clean", "mixed", "cleanup"]);

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function integer(value: unknown, min: number, max: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : undefined;
}

export async function POST(request: Request) {
  let payload: ScopePayload;
  try {
    payload = (await request.json()) as ScopePayload;
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const config = getJurisdiction(text(payload.jurisdiction, 2).toLowerCase());
  const packageSlug = text(payload.packageSlug, 80);
  if (!config) return Response.json({ error: "invalid_jurisdiction" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const item = getSectorPackage(config.code, packageSlug);
  if (!item) return Response.json({ error: "sector_package_not_found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  if (text(payload.packageVersion, 40) !== item.version) {
    return Response.json({ error: "package_version_mismatch", currentVersion: item.version }, { status: 409, headers: { "Cache-Control": "no-store" } });
  }
  const primaryEntry = getSectorCatalogueEntries(item)[0];
  if (!primaryEntry) return Response.json({ error: "sector_package_not_found" }, { status: 404, headers: { "Cache-Control": "no-store" } });

  const locations = integer(payload.locations, 1, 20);
  const employees = text(payload.employees, 20);
  const workload = text(payload.workload, 20);
  const records = text(payload.records, 20);
  if (!locations || !employeeBands.has(employees) || !workloadBands.has(workload) || !recordStates.has(records)) {
    return Response.json({ error: "validation_failed" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const validAddOns = new Set(item.addOns.map((addOn) => addOn.id));
  const addOnIds = Array.isArray(payload.addOnIds)
    ? payload.addOnIds.map((value) => text(value, 80)).filter((value) => validAddOns.has(value)).slice(0, item.addOns.length)
    : [];
  const reasons: string[] = [];
  let multiplier = 1;
  let needsReview = false;

  if (locations > 1) {
    multiplier += Math.min(locations - 1, 2) * 0.25;
    reasons.push(`${locations} locations require a wider operating and reconciliation scope.`);
  }
  if (employees === "6-10") {
    multiplier += 0.1;
    reasons.push("The employee band is above the entry payroll allowance.");
  } else if (employees === "11-20" || employees === "21+") {
    needsReview = true;
    reasons.push("The employee band requires manual payroll and control scoping.");
  }
  if (workload === "growth") {
    multiplier += 0.25;
    reasons.push(`The ${item.scopeLabels.workload.toLowerCase()} band is above the entry allowance.`);
  } else if (workload === "complex") {
    needsReview = true;
    reasons.push(`The ${item.scopeLabels.workload.toLowerCase()} band requires a manual delivery-capacity review.`);
  }
  if (records === "mixed") {
    multiplier += 0.15;
    reasons.push("Mixed record quality adds reconciliation and exception work.");
  } else if (records === "cleanup") {
    needsReview = true;
    reasons.push("Historical clean-up is outside the recurring entry package.");
  }
  if (payload.regulatedEvent === true) {
    needsReview = true;
    reasons.push("A current filing, licence, inspection, tender, customs or professional event requires responsible-provider review.");
  }
  if (addOnIds.length) reasons.push(`${addOnIds.length} event ${addOnIds.length === 1 ? "add-on is" : "add-ons are"} scoped separately.`);

  const estimatedMonthlyFrom = Math.ceil((primaryEntry.from * multiplier) / (config.currency === "RWF" ? 500 : 5)) * (config.currency === "RWF" ? 500 : 5);
  return Response.json({
    jurisdiction: config.code,
    packageId: item.id,
    packageSlug: item.slug,
    packageVersion: item.version,
    quoteStatus: needsReview ? "manual_review_required" : "indicative_fit",
    fit: needsReview ? "Manual scope review required" : "Entry package appears suitable",
    monthlyFrom: estimatedMonthlyFrom,
    monthlyPriceLabel: `From ${formatSectorPackagePrice(item, estimatedMonthlyFrom)} / ${item.monthlyUnit}`,
    setupFrom: primaryEntry.setupFrom,
    setupPriceLabel: primaryEntry.setupFrom ? `Setup from ${formatSectorPackagePrice(item, primaryEntry.setupFrom)}` : undefined,
    addOnIds,
    reasons: reasons.length ? reasons : ["The answers remain within the published entry limits."],
    officialCostsExcluded: true,
    engagementAccepted: false,
  }, { headers: { "Cache-Control": "no-store" } });
}
