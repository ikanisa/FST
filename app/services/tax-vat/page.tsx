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
    title="Know the position before the deadline arrives."
    lede="Malta VAT and corporate income tax support that keeps calculations, returns, records and business decisions aligned."
    image="/fst-tax.webp"
    imageAlt="A tax specialist reviewing corporate income tax and VAT schedules"
    sectionImages={{
      intro: { src: "/fst-accounting.webp", alt: "Accounting records being reconciled before tax preparation" },
      offerings: { src: "/fst-tax.webp", alt: "A tax specialist checking calculations and supporting evidence" },
      outcomes: { src: "/fst-insights.webp", alt: "A compliance calendar and analytical workpapers arranged for review" },
      cta: { src: "/fst-consultation.webp", alt: "An adviser explaining the next tax action in a private meeting" },
    }}
    introduction="FST brings the return, ledger, transaction evidence and commercial context into a reviewable tax position."
    accent="orange"
    services={[
      { title: "VAT registration", description: "Assessment and handling support for registration, status changes and deregistration based on actual activity." },
      { title: "VAT returns & reconciliations", description: "Return and recapitulative-statement preparation or review, reconciled to ledgers and source records." },
      { title: "VAT advisory", description: "Transaction-level guidance on rates, exemptions, place of supply, documentation and cross-border treatment." },
      { title: "Corporate income tax", description: "CIT computations, return preparation or review, tax-account reconciliations and transparent supporting schedules." },
      { title: "Tax compliance calendar", description: "A single view of filing, payment, information and review dates with accountable owners." },
      { title: "Tax planning & advisory", description: "Tax implications modelled for growth, reorganisations, contracts, financing and other commercial decisions." },
      { title: "Tax refunds & credits", description: "Reconciled claims, supporting evidence and follow-up packs for refund and credit positions." },
      { title: "Tax authority support", description: "Organised responses, reconciliations and correspondence packs for information requests and compliance reviews." },
      { title: "Tax position review", description: "Pre-filing challenge of calculations, classifications, documentation and material exposure areas." },
    ]}
    outcomes={["Reconciled VAT and CIT filings", "A visible obligation calendar", "Defensible transaction treatment", "Evidence ready for review"]}
  />;
}
