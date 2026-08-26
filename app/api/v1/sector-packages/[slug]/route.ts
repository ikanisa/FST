import { getJurisdiction } from "../../../../../lib/jurisdictions";
import { getSectorPackage, publicSectorPackage } from "../../../../../lib/sector-packages";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: Request, { params }: RouteContext) {
  const url = new URL(request.url);
  const config = getJurisdiction((url.searchParams.get("jurisdiction") || "").toLowerCase());
  if (!config) {
    return Response.json({ error: "invalid_jurisdiction" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const item = getSectorPackage(config.code, (await params).slug);
  if (!item) {
    return Response.json({ error: "sector_package_not_found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  return Response.json(publicSectorPackage(item), { headers: { "Cache-Control": "public, max-age=120, s-maxage=900" } });
}
