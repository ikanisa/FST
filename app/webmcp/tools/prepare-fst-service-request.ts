import { defineTool } from "@nekuda/webmcp-sdk";

export type PrepareFstServiceRequestInput = {
  service_ids?: string[];
  package_slugs?: string[];
  replace_selection?: boolean;
};

export type CatalogueToolBindings = {
  prepare(input: PrepareFstServiceRequestInput): Promise<unknown>;
};

let activeBindings: CatalogueToolBindings | undefined;

export function attachCatalogueToolBindings(bindings: CatalogueToolBindings) {
  activeBindings = bindings;
  return () => {
    if (activeBindings === bindings) activeBindings = undefined;
  };
}

export const prepareFstServiceRequestTool = defineTool<PrepareFstServiceRequestInput>({
  stableKey: "fst.request.prepare",
  name: "prepare_fst_service_request",
  title: "Prepare an FST service request",
  description: "Select valid FST services or industry packages and open the website's order review. Use when a visitor wants to assemble a non-binding request; returns the itemised selection, displayed starting fees and handoff status. It does not send a WhatsApp message or accept an engagement.",
  inputSchema: {
    type: "object",
    properties: {
      service_ids: {
        type: "array",
        items: { type: "string", minLength: 1, maxLength: 80 },
        maxItems: 30,
        uniqueItems: true,
        description: "Catalogue service identifiers to select.",
      },
      package_slugs: {
        type: "array",
        items: { type: "string", minLength: 1, maxLength: 80 },
        maxItems: 10,
        uniqueItems: true,
        description: "Industry-package slugs to select.",
      },
      replace_selection: { type: "boolean", default: true, description: "Replace the current order when true; otherwise extend it." },
    },
    additionalProperties: false,
  },
  annotations: { readOnlyHint: false, untrustedContentHint: false },
  async execute(input) {
    const serviceIds = Array.isArray(input.service_ids) ? input.service_ids : [];
    const packageSlugs = Array.isArray(input.package_slugs) ? input.package_slugs : [];
    if (!serviceIds.length && !packageSlugs.length) throw new Error("provide at least one service_id or package_slug");
    if (!activeBindings) throw new Error("the FST service catalogue is not currently available on this page");
    return activeBindings.prepare({
      service_ids: serviceIds,
      package_slugs: packageSlugs,
      replace_selection: input.replace_selection !== false,
    });
  },
});
