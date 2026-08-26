import { getJurisdiction } from "../../../../lib/jurisdictions";
import { catalogueCategories, catalogueServices, formatCataloguePrice } from "../../../../lib/service-catalogue";
import { rwandaCatalogueCategories, rwandaCatalogueServices } from "../../../../lib/rwanda-catalogue";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const config = getJurisdiction((url.searchParams.get("jurisdiction") || "").toLowerCase());
  if (!config) return Response.json({ error: "invalid_jurisdiction" }, { status: 400, headers: { "Cache-Control": "no-store" } });

  const services = config.code === "mt" ? catalogueServices : rwandaCatalogueServices;
  const categories = config.code === "mt" ? catalogueCategories : rwandaCatalogueCategories;
  const category = url.searchParams.get("category");
  const query = (url.searchParams.get("q") || "").trim().toLowerCase().slice(0, 120);
  const filtered = services.filter((service) => {
    if (category && service.category !== category) return false;
    if (!query) return true;
    return [service.title, service.description, ...service.tags].some((value) => value.toLowerCase().includes(query));
  });

  return Response.json({
    jurisdiction: config.code,
    currency: config.currency,
    pricingMode: "indicative_starting_fee",
    categories: categories.filter((item) => services.some((service) => service.category === item.id)).map((item) => ({
      id: item.id,
      label: item.label,
      shortLabel: item.shortLabel,
      description: item.description,
      regulatedNote: "regulatedNote" in item ? item.regulatedNote : undefined,
    })),
    services: filtered.map((service) => ({
      id: service.id,
      category: service.category,
      title: service.title,
      description: service.description,
      unit: service.unit,
      from: service.from,
      priceLabel: formatCataloguePrice(service, config.currency, config.currencyLocale),
      regulated: Boolean(service.regulated),
      tags: service.tags,
    })),
    count: filtered.length,
  }, { headers: { "Cache-Control": "public, max-age=120, s-maxage=900" } });
}
