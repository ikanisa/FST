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
  seo: {
    homeTitle: string;
    homeDescription: string;
  };
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
  location?: {
    name: string;
    eyebrow: string;
    headline: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    postalLabel: string;
    mapUrl: string;
    latitude: number;
    longitude: number;
    geoRegion: string;
    coverage: string;
  };
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
    seo: {
      homeTitle: "Professional Services in Malta",
      homeDescription:
        "FST provides management, accounting, tax, governance, assurance and funding support from SOHO The Strand to organisations across Malta.",
    },
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
    location: {
      name: "SOHO The Strand",
      eyebrow: "Gżira office · Malta-wide service",
      headline: "Meet us at SOHO The Strand or work with us from anywhere in Malta.",
      streetAddress: "SOHO The Strand, Fawwara Building, Triq l-Imsida",
      addressLocality: "Gżira",
      addressRegion: "Central Region",
      addressCountry: "MT",
      postalLabel: "SOHO The Strand, Fawwara Building, Triq l-Imsida, Gżira GZR 1401, Malta",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=SOHO+The+Strand%2C+Fawwara+Building%2C+Triq+l-Imsida%2C+Gzira+GZR+1401%2C+Malta",
      latitude: 35.9023513,
      longitude: 14.4938964,
      geoRegion: "MT-12",
      coverage:
        "Available by appointment in Gżira and online for businesses, organisations and finance teams across Malta and Gozo.",
    },
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
    seo: {
      homeTitle: "Accounting, Tax & Business Advisory in Rwanda",
      homeDescription:
        "Bookkeeping, accounting, RRA tax compliance, EBM, PAYE, audit readiness, business setup and funding support from Norrsken House Kigali.",
    },
    hero: {
      title: "Accounting, tax and business advisory in Rwanda.",
      lede:
        "FST connects bookkeeping, financial reporting, RRA tax compliance, audit readiness, governance and funding support in one accountable programme of work.",
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
    location: {
      name: "Norrsken House Kigali",
      eyebrow: "Kigali office · nationwide service",
      headline: "Meet us at Norrsken House or work with us from anywhere in Rwanda.",
      streetAddress: "1 KN 78 St, Norrsken House",
      addressLocality: "Kigali",
      addressRegion: "City of Kigali",
      addressCountry: "RW",
      postalLabel: "1 KN 78 St, Norrsken House, Kiyovu, Nyarugenge, Kigali, Rwanda",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Norrsken+House+Kigali%2C+1+KN+78+St%2C+Kigali%2C+Rwanda",
      latitude: -1.9511,
      longitude: 30.06,
      geoRegion: "RW-01",
      coverage:
        "Available by appointment in Kigali and online across the City of Kigali and Rwanda’s Northern, Southern, Eastern and Western provinces.",
    },
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
