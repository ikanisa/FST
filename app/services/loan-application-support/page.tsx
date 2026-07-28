import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Business Loan Application Support",
  description: "Loan application readiness, facility fit, financial schedules, application forms, lender evidence packs, queries, approval and drawdown support.",
  path: "/services/loan-application-support",
});

export default function LoanApplicationSupportPage() {
  return <ServicePage
    serviceName="Loan Application Support"
    path="/services/loan-application-support"
    eyebrow="Loan Application Support"
    title="Give lenders a complete application they can follow."
    lede="Loan application forms, financial schedules and evidence packs built from consistent records, a clear borrowing need and realistic repayment logic."
    image="/fst-finance.webp"
    imageAlt="Loan application financial schedules and lender evidence under review"
    sectionImages={{
      intro: { src: "/fst-operations.webp", alt: "An operating team connecting borrowing requirements to delivery needs" },
      offerings: { src: "/fst-finance.webp", alt: "Loan application schedules and evidence being prepared for a lender" },
      outcomes: { src: "/fst-accounting.webp", alt: "Reconciled accounts and evidence supporting a loan application" },
      cta: { src: "/fst-consultation.webp", alt: "A private discussion about loan application readiness and next steps" },
    }}
    introduction="FST tests the borrowing need, affordability, financial schedules and supporting documents before the application reaches the lender."
    accent="rose"
    services={[
      { title: "Loan application readiness assessment", description: "Early assessment of loan purpose, affordability, repayment capacity, security and information gaps." },
      { title: "Borrowing requirement & facility fit", description: "Definition of the funding purpose, amount, timing, term and repayment profile against suitable lender facilities." },
      { title: "Loan application forms", description: "Preparation and coordination of application forms, declarations, narrative and lender-specific information requirements." },
      { title: "Lender financial schedules", description: "Application-specific forecasts, debt-service calculations, cash-flow schedules, sensitivities and repayment analysis." },
      { title: "Loan application evidence pack", description: "Indexed accounts, tax records, bank data, contracts, quotations, ownership records and management documents ready for lender review." },
      { title: "Security & covenant information", description: "Structured information on proposed security, guarantees, existing facilities, commitments and anticipated covenant requirements." },
      { title: "Lender queries & revisions", description: "Controlled responses to lender questions with updated assumptions, schedules and reconciled supporting documents." },
      { title: "Approval & drawdown support", description: "Review of approval conditions, outstanding evidence, drawdown requirements, dates and responsible owners." },
      { title: "Post-approval monitoring", description: "Use-of-funds monitoring, covenant dates, repayment tracking and lender-reporting routines prepared after approval." },
    ]}
    outcomes={["A complete loan application", "Financial schedules that reconcile", "An indexed lender evidence pack", "Visible affordability and repayment logic"]}
  />;
}
