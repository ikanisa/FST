import { siteConfig } from "./site-config";

export const jurisdictionCodes = ["mt", "rw"] as const;

export type JurisdictionCode = (typeof jurisdictionCodes)[number];

export type JurisdictionConfig = {
  code: JurisdictionCode;
  name: string;
  country: string;
  locale: string;
  openGraphLocale: string;
  currency: "EUR" | "RWF";
  currencyLocale: string;
  timezone: "Europe/Malta" | "Africa/Kigali";
  callingCode: string;
  contactEmail: string;
  whatsappDisplay: string;
  whatsappUrl: string;
  serviceOrderWhatsappDisplay: string;
  serviceOrderWhatsappUrl: string;
  serviceArea: string;
  hero: {
    title: string;
    lede: string;
    imageAlt: string;
  };
  visuals: {
    hero: string;
    collaboration: string;
    operations: string;
    consultation: string;
    international: string;
    management: string;
    finance: string;
  };
  audience: Array<{ title: string; description: string }>;
  operationalNotice: string;
};

function whatsappUrl(number: string) {
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

const rwWhatsappDisplay = process.env.NEXT_PUBLIC_RW_WHATSAPP_DISPLAY || "+250795588248";
const rwServiceWhatsappDisplay = process.env.NEXT_PUBLIC_RW_SERVICE_WHATSAPP_DISPLAY || rwWhatsappDisplay;

export const jurisdictionConfig: Record<JurisdictionCode, JurisdictionConfig> = {
  mt: {
    code: "mt",
    name: "Malta",
    country: "Malta",
    locale: "en-MT",
    openGraphLocale: "en_MT",
    currency: "EUR",
    currencyLocale: "en-IE",
    timezone: "Europe/Malta",
    callingCode: "+356",
    contactEmail: siteConfig.contactEmail,
    whatsappDisplay: siteConfig.whatsappDisplay,
    whatsappUrl: siteConfig.whatsappUrl,
    serviceOrderWhatsappDisplay: siteConfig.serviceOrderWhatsappDisplay,
    serviceOrderWhatsappUrl: siteConfig.serviceOrderWhatsappUrl,
    serviceArea:
      "Supporting local and international businesses, finance teams and institutions through online and appointment-led engagements.",
    hero: {
      title: "Turn ambition into an executable plan.",
      lede:
        "FST brings management, audit, finance, tax, governance and loan and funding application support into one accountable programme of work.",
      imageAlt: "Advisers shaping a controlled work programme with a business leadership team",
    },
    visuals: {
      hero: "/fst-hero.webp",
      collaboration: "/fst-collaboration.webp",
      operations: "/fst-operations.webp",
      consultation: "/fst-consultation.webp",
      international: "/fst-international.webp",
      management: "/fst-management.webp",
      finance: "/fst-finance.webp",
    },
    audience: [
      { title: "Start-ups and self-employed professionals", description: "Practical structure for setup, records, tax, financing and the first operating controls." },
      { title: "SMEs and established businesses", description: "Connected finance, compliance, assurance and management support as operations become more complex." },
      { title: "NGOs and international programmes", description: "Evidence-led financial, donor, governance and project-accountability work." },
    ],
    operationalNotice:
      "Regulated work is accepted only after provider authority, independence, competence and engagement checks are complete.",
  },
  rw: {
    code: "rw",
    name: "Rwanda",
    country: "Rwanda",
    locale: "en-RW",
    openGraphLocale: "en_RW",
    currency: "RWF",
    currencyLocale: "en-RW",
    timezone: "Africa/Kigali",
    callingCode: "+250",
    contactEmail: process.env.NEXT_PUBLIC_RW_CONTACT_EMAIL || siteConfig.contactEmail,
    whatsappDisplay: rwWhatsappDisplay,
    whatsappUrl: whatsappUrl(rwWhatsappDisplay),
    serviceOrderWhatsappDisplay: rwServiceWhatsappDisplay,
    serviceOrderWhatsappUrl: whatsappUrl(rwServiceWhatsappDisplay),
    serviceArea:
      "Supporting businesses, entrepreneurs, cooperatives, NGOs and institutions through online and appointment-led engagements.",
    hero: {
      title: "Make the next business decision workable.",
      lede:
        "FST connects management, finance, tax readiness, governance and funding support into a controlled programme designed around the decision that must move.",
      imageAlt: "Business leaders and advisers organising priorities, evidence and delivery responsibilities",
    },
    visuals: {
      hero: "/fst-rw-hero.webp",
      collaboration: "/fst-rw-collaboration.webp",
      operations: "/fst-rw-operations.webp",
      consultation: "/fst-rw-collaboration.webp",
      international: "/fst-rw-collaboration.webp",
      management: "/fst-rw-collaboration.webp",
      finance: "/fst-rw-operations.webp",
    },
    audience: [
      { title: "Entrepreneurs and growing SMEs", description: "Business planning, financial records, compliance readiness and operating controls that can scale." },
      { title: "Cooperatives and community enterprises", description: "Governance, bookkeeping, reporting and bankability support organised around member accountability." },
      { title: "NGOs and development programmes", description: "Budgeting, donor reporting, grant controls, audit readiness and evidence management." },
    ],
    operationalNotice:
      "Services remain subject to scope, applicable professional requirements and confirmation of the responsible provider before an engagement starts.",
  },
};

export function isJurisdiction(value: string): value is JurisdictionCode {
  return jurisdictionCodes.includes(value as JurisdictionCode);
}

export function getJurisdiction(value: string) {
  return isJurisdiction(value) ? jurisdictionConfig[value] : undefined;
}

export function marketPath(jurisdiction: JurisdictionCode, path = "/") {
  if (path === "/") return `/${jurisdiction}`;
  return `/${jurisdiction}${path.startsWith("/") ? path : `/${path}`}`;
}
