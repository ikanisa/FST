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
    title="Keep the corporate record aligned with the business."
    lede="Formation, governance, company-secretarial and administrative support for orderly decisions, records, filings and change."
    image="/fst-corporate.webp"
    imageAlt="Corporate records and governance documents organised for review"
    sectionImages={{
      intro: { src: "/fst-corporate.webp", alt: "Statutory records and a corporate action checklist" },
      offerings: { src: "/fst-collaboration.webp", alt: "Advisers coordinating corporate responsibilities with management" },
      outcomes: { src: "/fst-legal.webp", alt: "A structured document review workspace" },
      cta: { src: "/fst-consultation.webp", alt: "A business owner discussing an upcoming corporate change" },
    }}
    introduction="FST keeps legal structure, governance actions and administrative evidence working as one dependable corporate file."
    accent="green"
    services={[
      { title: "Company formation", description: "Formation workflow, document coordination and opening records for an appropriate corporate foundation." },
      { title: "Corporate administration", description: "Ongoing management of entity records, correspondence, actions and lifecycle events." },
      { title: "Company secretarial", description: "Board-cycle and statutory support with dates, decisions and responsibilities kept under control." },
      { title: "Statutory registers & filings", description: "Registers, annual returns and recurring filing packs maintained against source documents." },
      { title: "Board & shareholder support", description: "Agendas, papers, resolutions, minutes and action registers for traceable decision-making." },
      { title: "Beneficial ownership support", description: "Ownership records and related change documentation prepared for accurate reporting." },
      { title: "Governance support", description: "Authority schedules, meeting architecture and decision records suited to the organisation’s scale." },
      { title: "Corporate changes", description: "Coordinated documentation for changes in officers, ownership, capital and constitutional arrangements." },
      { title: "Administrative support", description: "Document control, deadline tracking, correspondence and practical back-office coordination." },
      { title: "Corporate compliance calendar", description: "A monitored schedule of recurring obligations, preparation dates, reviewers and evidence." },
    ]}
    outcomes={["An orderly statutory file", "Traceable board and owner decisions", "Corporate dates under control", "Administration ready for change"]}
  />;
}
