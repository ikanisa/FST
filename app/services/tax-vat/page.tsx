import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Tax & VAT",
  description: "Malta tax and VAT advisory, registration, compliance, return preparation, review and authority support for businesses and organisations.",
  path: "/services/tax-vat",
});

export default function TaxVatPage() {
  return <ServicePage
    eyebrow="Tax & VAT"
    title="Clear positions. Timely compliance."
    lede="Practical support across VAT, corporate income tax and day-to-day tax obligations—connected to the decisions behind the numbers."
    image="/insights-tax-v2.webp"
    imageAlt="Tax professionals reviewing VAT and corporate tax schedules"
    sectionImages={{
      intro: { src: "/tax-intro-v2.webp", alt: "Tax adviser organising VAT and corporate income tax information into one clear view" },
      offerings: { src: "/tax-offerings-v2.webp", alt: "Tax team reconciling returns, records and compliance schedules" },
      outcomes: { src: "/tax-outcomes-v2.webp", alt: "Finance leader reviewing a clear tax position and compliance calendar" },
      cta: { src: "/tax-cta-v2.webp", alt: "Tax adviser explaining a practical next step to a client" },
    }}
    introduction="Tax support should make obligations, positions and decisions easier to understand—not add another layer of uncertainty."
    accent="orange"
    services={[
      { title: "VAT registration", description: "Registration, deregistration and status support aligned with the organisation’s activities and obligations." },
      { title: "VAT returns & reconciliations", description: "Preparation and review of VAT returns, recapitulative statements, reconciliations and supporting records." },
      { title: "VAT advisory", description: "Practical analysis of transactions, place-of-supply questions, exemptions, rates and cross-border VAT treatment." },
      { title: "Corporate income tax", description: "Corporate income tax calculations, return preparation and review, including clear supporting schedules." },
      { title: "Tax compliance calendar", description: "Coordinated deadlines, payment visibility and responsibility tracking across recurring tax obligations." },
      { title: "Tax planning & advisory", description: "Commercially grounded support for transactions, structures, growth, reorganisations and changing obligations." },
      { title: "Tax refunds & credits", description: "Preparation, reconciliation and follow-up support for refund or credit positions and related evidence." },
      { title: "Tax authority support", description: "Structured responses, information packs and correspondence support for queries, reviews and compliance matters." },
      { title: "Tax position review", description: "Focused review of returns, calculations, records and risk areas before filing or management action." },
    ]}
    outcomes={["Clearer tax positions", "More reliable VAT reporting", "Better visibility of deadlines", "Stronger supporting records"]}
  />;
}
