import { defineTool } from "@nekuda/webmcp-sdk";

type BrowseFstOfferingsInput = {
  jurisdiction: "mt" | "rw";
  query: string;
  category?: string;
  limit?: number;
};

type CatalogueService = {
  id: string;
  category: string;
  title: string;
  description: string;
  unit: string;
  priceLabel: string;
  regulated: boolean;
  tags: string[];
};

type SectorPackage = {
  id: string;
  slug: string;
  sectorLabel: string;
  title: string;
  summary: string;
  monthlyPriceLabel: string;
  boundaries: string[];
};

function matchScore(query: string, values: string[]) {
  const normalised = query.toLowerCase();
  const tokens = normalised.split(/[^a-z0-9]+/).filter(Boolean);
  const haystack = values.join(" ").toLowerCase();
  let score = haystack.includes(normalised) ? 10 : 0;
  for (const token of tokens) if (haystack.includes(token)) score += 2;
  return score;
}

export const browseFstOfferingsTool = defineTool<BrowseFstOfferingsInput>({
  stableKey: "fst.catalogue.browse",
  name: "browse_fst_offerings",
  title: "Browse FST offerings",
  description: "Search FST's current Malta or Rwanda services and industry-package catalogue by need, category or phrase. Use when a visitor wants suitable offerings or starting fees; returns concise matches with IDs, prices, safeguards and catalogue paths and does not change the page.",
  inputSchema: {
    type: "object",
    properties: {
      jurisdiction: { type: "string", enum: ["mt", "rw"], description: "The FST market whose services and prices apply." },
      query: { type: "string", minLength: 1, maxLength: 120, description: "The service need, category or phrase to search for." },
      category: { type: "string", minLength: 1, maxLength: 80, description: "Optional catalogue category identifier." },
      limit: { type: "integer", minimum: 1, maximum: 10, default: 6, description: "Maximum number of matches to return." },
    },
    required: ["jurisdiction", "query"],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: true, untrustedContentHint: false },
  async execute(input) {
    const jurisdiction = input.jurisdiction;
    if (jurisdiction !== "mt" && jurisdiction !== "rw") throw new Error("jurisdiction must be mt or rw");
    const query = typeof input.query === "string" ? input.query.trim() : "";
    if (!query || query.length > 120) throw new Error("query must contain between 1 and 120 characters");
    const category = typeof input.category === "string" ? input.category.trim() : "";
    if (category.length > 80) throw new Error("category must not exceed 80 characters");
    const limit = input.limit === undefined ? 6 : Number(input.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 10) throw new Error("limit must be an integer between 1 and 10");

    const catalogueParams = new URLSearchParams({ jurisdiction, q: query });
    if (category) catalogueParams.set("category", category);
    const packageParams = new URLSearchParams({ jurisdiction });
    const [catalogueResponse, packagesResponse] = await Promise.all([
      fetch(`/api/v1/catalogue?${catalogueParams.toString()}`, { headers: { Accept: "application/json" } }),
      fetch(`/api/v1/sector-packages?${packageParams.toString()}`, { headers: { Accept: "application/json" } }),
    ]);
    if (!catalogueResponse.ok) throw new Error(`catalogue search failed: HTTP ${catalogueResponse.status}`);
    if (!packagesResponse.ok) throw new Error(`sector package search failed: HTTP ${packagesResponse.status}`);
    const catalogue = await catalogueResponse.json() as { services?: CatalogueService[] };
    const packages = await packagesResponse.json() as { packages?: SectorPackage[] };
    if (!Array.isArray(catalogue.services) || !Array.isArray(packages.packages)) throw new Error("catalogue APIs returned an invalid response");

    const sourcePath = `/${jurisdiction}/services/catalogue`;
    const matches = [
      ...catalogue.services.map((service) => ({
        score: matchScore(query, [service.title, service.description, service.category, ...service.tags]),
        item: {
          kind: "service" as const,
          id: service.id,
          category: service.category,
          title: service.title,
          description: service.description,
          price: service.priceLabel,
          unit: service.unit,
          regulated: service.regulated,
          sourcePath,
        },
      })),
      ...packages.packages.map((item) => ({
        score: matchScore(query, [item.sectorLabel, item.title, item.summary, ...item.boundaries]),
        item: {
          kind: "industry_package" as const,
          id: item.id,
          slug: item.slug,
          sector: item.sectorLabel,
          title: item.title,
          description: item.summary,
          price: item.monthlyPriceLabel,
          safeguards: item.boundaries,
          sourcePath,
        },
      })),
    ]
      .filter((match) => match.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, limit)
      .map((match) => match.item);

    return {
      jurisdiction,
      query,
      category: category || null,
      matches,
      count: matches.length,
      note: matches.length
        ? "Starting fees are indicative; FST confirms scope, records, responsible professional and final fee before work starts."
        : "The FST site has no matching catalogue offering for this search.",
    };
  },
});
