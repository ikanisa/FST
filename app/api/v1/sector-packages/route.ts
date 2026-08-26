import { getJurisdiction } from "../../../../lib/jurisdictions";
import { getSectorPackages, publicSectorPackage } from "../../../../lib/sector-packages";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const config = getJurisdiction((url.searchParams.get("jurisdiction") || "").toLowerCase());
  if (!config) {
    return Response.json({ error: "invalid_jurisdiction" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const packages = getSectorPackages(config.code).map(publicSectorPackage);
  return Response.json({
    jurisdiction: config.code,
    currency: config.currency,
    pricingMode: "indicative_package_floor",
    packages,
    count: packages.length,
  }, { headers: { "Cache-Control": "public, max-age=120, s-maxage=900" } });
}
