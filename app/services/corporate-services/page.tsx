import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Corporate & Administrative Services",
  description: "Company formation, corporate administration, company secretarial, statutory records, filings and administrative support.",
  path: "/services/corporate-services",
});

export default function CorporateServicesPage() {
  return <ServicePage
    eyebrow="Corporate & Administrative Services"
    title="Structures that support where you are going."
    lede="Thoughtful corporate, governance and administrative support—from formation and records through filings, changes and ongoing coordination."
    image="/corporate-services.webp"
    imageAlt="Corporate adviser and business owner reviewing governance documents"
    sectionImages={{
      intro: { src: "/corporate-intro-v2.webp", alt: "Corporate adviser clarifying an ownership and governance structure" },
      offerings: { src: "/corporate-offerings-v2.webp", alt: "Company secretarial team preparing board and statutory records" },
      outcomes: { src: "/corporate-outcomes-v2.webp", alt: "Directors holding an orderly governance meeting with clear responsibilities" },
      cta: { src: "/corporate-cta-v2.webp", alt: "Business owner discussing a future corporate structure with a trusted adviser" },
    }}
    introduction="The right structure should make ownership, governance and administration clearer—not more complicated."
    accent="green"
    services={[
      { title: "Company formation", description: "Practical support to establish an appropriate legal and administrative foundation." },
      { title: "Corporate administration", description: "Dependable ongoing administration, records and coordination across the corporate lifecycle." },
      { title: "Company secretarial", description: "Board and statutory support that helps governance remain organised, timely and effective." },
      { title: "Statutory registers & filings", description: "Maintenance of statutory records and coordinated preparation of recurring company filings and returns." },
      { title: "Board & shareholder support", description: "Meeting packs, resolutions, minutes and action tracking for orderly corporate decision-making." },
      { title: "Beneficial ownership support", description: "Record and filing support for ownership information and related corporate compliance requirements." },
      { title: "Governance support", description: "Clear responsibilities, decision processes and documentation appropriate to the organisation." },
      { title: "Corporate changes", description: "Coordinated support for ownership, officer, capital and constitutional changes." },
      { title: "Administrative support", description: "Structured document, correspondence, deadline and records administration that keeps corporate work moving." },
      { title: "Corporate compliance calendar", description: "Practical calendars, owners and reminders that support timely recurring obligations." },
    ]}
    outcomes={["Clearer ownership and responsibilities", "Reliable corporate records", "Stronger governance discipline", "Structures aligned with long-term intent"]}
  />;
}
