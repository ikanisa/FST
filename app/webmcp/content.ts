import { aiAgents } from "../../lib/ai-agents";
import { fieldNotes } from "../../lib/field-notes";
import { getJurisdictionServices } from "../../lib/jurisdiction-services";
import { jurisdictionCodes, jurisdictionConfig, marketPath, type JurisdictionCode } from "../../lib/jurisdictions";
import { getSectorCatalogueEntries, getSectorPackages } from "../../lib/sector-packages";

export type FstContentEntry = {
  title: string;
  text: string;
  path: string;
  jurisdiction?: JurisdictionCode;
};

const coreEntries: FstContentEntry[] = [
  {
    title: "FST professional services",
    text: "FST organises management advisory, risk and controls, audit and assurance, taxation, accounting and financial reporting, corporate administration, and loan, grant and funding application support around executable outcomes.",
    path: "/services",
  },
  {
    title: "Professional responsibility and engagement safeguards",
    text: "A catalogue request, website enquiry or meeting request is not a professional engagement. The legal provider, responsible professional, authority, independence, conflicts, competence, scope, fee and terms are confirmed separately before work starts. External filing, legal notice, audit opinion, tax return, funding submission and other professional submissions require recorded human approval.",
    path: "/legal-information",
  },
  {
    title: "Service catalogue request process",
    text: "Visitors can select individual services or industry packages, review an itemised non-binding order with displayed starting fees, and open a prefilled WhatsApp message. The visitor reviews and sends the message. FST then confirms records required, deadline, final fee, official costs and the responsible professional before accepting work.",
    path: "/services/catalogue",
  },
  {
    title: "Meeting requests",
    text: "The booking form requests a name, business email, organisation or project, requested start, duration and non-confidential context. Privacy consent is required. A confirmed request may create a Calendar event, meeting link and attendee notifications; booking does not create a professional engagement.",
    path: "/book",
  },
  {
    title: "Privacy and first-contact boundaries",
    text: "Do not submit passwords, payment credentials, identity documents, health information or confidential client records through the booking or first-contact forms. Read the privacy notice and legal provider information before sharing records.",
    path: "/privacy",
  },
  {
    title: "Supervised professional AI agents",
    text: `FST uses IKANISA's supervised professional AI-agent infrastructure for structured preparation and quality support. ${aiAgents.map((agent) => `${agent.name}: ${agent.role}`).join(" ")} Responsible professionals retain scope, judgement, review, approval and regulated outputs.`,
    path: "/ai-agent-team",
  },
];

const jurisdictionEntries = jurisdictionCodes.flatMap((jurisdiction) => {
  const config = jurisdictionConfig[jurisdiction];
  const serviceEntries: FstContentEntry[] = getJurisdictionServices(jurisdiction).map((service) => ({
    title: service.title,
    text: [
      service.introduction,
      service.description,
      ...service.offerings.flatMap((offering) => [offering.title, offering.description]),
      ...service.outcomes,
      service.professionalNote?.title,
      service.professionalNote?.description,
      config.operationalNotice,
    ].filter(Boolean).join(" "),
    path: marketPath(jurisdiction, `/services/${service.slug}`),
    jurisdiction,
  }));
  const packageEntries: FstContentEntry[] = getSectorPackages(jurisdiction).map((item) => {
    const catalogueEntry = getSectorCatalogueEntries(item)[0];
    return {
      title: catalogueEntry?.title || item.title,
      text: [
        item.sectorLabel,
        catalogueEntry?.description || item.summary,
        catalogueEntry?.bestFor || item.fitStatement,
        ...(catalogueEntry?.includes || item.included.map((included) => `${included.title}: ${included.description}`)),
        ...item.boundaries,
        config.operationalNotice,
      ].join(" "),
      path: marketPath(jurisdiction, "/services/catalogue"),
      jurisdiction,
    };
  });
  return [...serviceEntries, ...packageEntries];
});

const insightEntries: FstContentEntry[] = fieldNotes.map((note) => ({
  title: note.title,
  text: [
    note.category,
    note.summary,
    note.description,
    ...note.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.points || [])]),
  ].join(" "),
  path: `/insights/${note.slug}`,
}));

export const fstContentEntries: readonly FstContentEntry[] = [
  ...coreEntries,
  ...jurisdictionEntries,
  ...insightEntries,
];

const stopWords = new Set(["a", "an", "and", "are", "for", "how", "i", "in", "is", "it", "of", "on", "or", "the", "to", "what", "where", "with"]);

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function queryTokens(question: string) {
  const words = normalise(question).split(/\s+/).filter(Boolean);
  const meaningful = words.filter((word) => !stopWords.has(word));
  return meaningful.length ? meaningful : words;
}

function excerpt(text: string, tokens: string[]) {
  const lower = text.toLowerCase();
  const firstMatch = tokens.map((token) => lower.indexOf(token)).filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, firstMatch - 120);
  const end = Math.min(text.length, start + 620);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}

export function searchFstContent(question: string, maximum: number, currentPath = "/") {
  const phrase = normalise(question);
  const tokens = queryTokens(question);
  const pathJurisdiction = jurisdictionCodes.find((code) => currentPath === `/${code}` || currentPath.startsWith(`/${code}/`));
  return fstContentEntries
    .map((entry) => {
      const title = normalise(entry.title);
      const text = normalise(entry.text);
      const path = normalise(entry.path);
      let score = phrase && text.includes(phrase) ? 12 : 0;
      for (const token of tokens) {
        if (title.includes(token)) score += 6;
        if (text.includes(token)) score += 2;
        if (path.includes(token)) score += 1;
      }
      if (pathJurisdiction && entry.jurisdiction === pathJurisdiction) score += 1;
      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, maximum)
    .map(({ entry }) => ({
      title: entry.title,
      excerpt: excerpt(entry.text, tokens),
      sourcePath: entry.path,
      jurisdiction: entry.jurisdiction,
    }));
}
