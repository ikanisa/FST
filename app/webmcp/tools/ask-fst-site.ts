import { defineTool } from "@nekuda/webmcp-sdk";
import { searchFstContent } from "../content";

type AskFstSiteInput = {
  question: string;
  max_results?: number;
};

export const askFstSiteTool = defineTool<AskFstSiteInput>({
  stableKey: "fst.content.ask",
  name: "ask_fst_site",
  title: "Ask FST",
  description: "Find relevant FST website information for a visitor question across services, industry packages, professional safeguards, insights, contact, privacy and legal information. Use when the visitor asks what FST offers, how work is handled or where to continue; returns matched excerpts with source paths and does not change the page.",
  inputSchema: {
    type: "object",
    properties: {
      question: { type: "string", minLength: 2, maxLength: 500, description: "The visitor's question about FST." },
      max_results: { type: "integer", minimum: 1, maximum: 8, default: 5, description: "Maximum number of matched excerpts to return." },
    },
    required: ["question"],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: true, untrustedContentHint: false },
  execute(input) {
    const question = typeof input.question === "string" ? input.question.trim() : "";
    if (question.length < 2 || question.length > 500) throw new Error("question must contain between 2 and 500 characters");
    const maximum = input.max_results === undefined ? 5 : Number(input.max_results);
    if (!Number.isInteger(maximum) || maximum < 1 || maximum > 8) throw new Error("max_results must be an integer between 1 and 8");
    const results = searchFstContent(question, maximum, typeof window === "undefined" ? "/" : window.location.pathname);
    return {
      question,
      results,
      count: results.length,
      note: results.length
        ? "Use these published FST excerpts and source paths to answer the visitor."
        : "The FST site has no matching published content for this question.",
    };
  },
});
