import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Tax Advisory & Compliance",
  description: "Comprehensive tax support across income tax, VAT, payroll and FSS, social security, withholding, property, transfer, international and transaction taxes.",
  path: "/services/taxation",
});

export default function TaxationPage() {
  return <ServicePage
    serviceName="Taxation"
    path="/services/taxation"
    eyebrow="Taxation"
    title="Bring every applicable tax obligation into one working plan."
    lede="Comprehensive tax support across corporate and personal income tax, VAT, employment taxes, social security, withholding, property and transfer taxes, international tax and other applicable obligations."
    image="/fst-tax.webp"
    imageAlt="A tax specialist reviewing reconciled schedules across tax obligations"
    sectionImages={{
      intro: { src: "/fst-accounting.webp", alt: "Accounting records being reconciled before tax preparation" },
      offerings: { src: "/fst-tax.webp", alt: "A tax specialist checking calculations and supporting evidence" },
      outcomes: { src: "/fst-insights.webp", alt: "A compliance calendar and analytical workpapers arranged for review" },
      cta: { src: "/fst-consultation.webp", alt: "An adviser explaining the next tax action in a private meeting" },
    }}
    introduction="FST connects registrations, calculations, returns, payments, transaction evidence and commercial context across the taxes that apply to the client."
    accent="orange"
    services={[
      { title: "Tax registrations & taxpayer setup", description: "Income-tax, VAT and employer registration support, taxpayer access, status changes and deregistration based on the actual activity." },
      { title: "Corporate income tax", description: "Company tax computations, return preparation or review, tax-account reconciliations and transparent supporting schedules." },
      { title: "Personal & self-employed income tax", description: "Return preparation or review for individuals, sole traders and self-employed persons, including income, deductions and provisional-tax positions." },
      { title: "VAT returns & reconciliations", description: "VAT return and recapitulative-statement preparation or review, reconciled to ledgers, invoices and source records." },
      { title: "VAT advisory", description: "Transaction-level guidance on rates, exemptions, place of supply, documentation and cross-border treatment." },
      { title: "Payroll tax, FSS & social security", description: "Employer registrations, payroll tax and Final Settlement System support, Class 1 and Class 2 contribution reviews and reconciliations." },
      { title: "Withholding tax & cross-border payments", description: "Review of withholding, reporting, treaty and documentary requirements for dividends, interest, royalties and other cross-border payments." },
      { title: "Property, capital gains & transfer taxes", description: "Support for property and asset transactions, capital-gains positions, valuations and duty on documents and transfers." },
      { title: "International tax & transfer pricing", description: "Residence, treaty, permanent-establishment, double-taxation and transfer-pricing analysis with supporting files for cross-border arrangements." },
      { title: "Provisional tax & payment planning", description: "Calculation and scheduling of provisional tax, settlement tax and other tax payments against forecast cash requirements." },
      { title: "Tax compliance calendar", description: "A single view of filing, payment, information and review dates with accountable owners." },
      { title: "Tax planning & transaction advisory", description: "Tax implications modelled for growth, reorganisations, contracts, financing, investments and other commercial decisions." },
      { title: "Tax refunds, credits & shareholder refunds", description: "Reconciled claims, supporting evidence and follow-up packs for income-tax, VAT, credit and eligible shareholder-refund positions." },
      { title: "MTCA queries, reviews & objections", description: "Organised responses, reconciliations, correspondence and objection packs for information requests, compliance reviews and disputed assessments." },
      { title: "Customs, excise & ECO contribution coordination", description: "Scoping, information preparation and specialist coordination where customs, excise or ECO contribution obligations affect the client." },
      { title: "Tax position review", description: "Pre-filing challenge of calculations, classifications, documentation and material exposure areas." },
    ]}
    outcomes={["Reconciled tax filings and payments", "A visible obligation calendar", "Defensible treatment across transactions", "Evidence ready for MTCA review"]}
  />;
}
