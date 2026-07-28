import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Business Planning & Finance Applications",
  description: "Business-plan preparation and review, budgets, projections, loan readiness, lender packs and application support.",
  path: "/services/business-planning-finance-applications",
});

export default function BusinessPlanningFinanceApplicationsPage() {
  return <ServicePage
    eyebrow="Business Planning & Finance Applications"
    title="Give lenders a case they can follow."
    lede="Business plans, budgets, projections and loan-application packs built from consistent evidence and realistic repayment logic."
    image="/fst-finance.webp"
    imageAlt="A financial model, business plan and lending evidence under review"
    sectionImages={{
      intro: { src: "/fst-operations.webp", alt: "An operating team connecting delivery milestones to financing needs" },
      offerings: { src: "/fst-finance.webp", alt: "A budget and projection model being prepared for a loan application" },
      outcomes: { src: "/fst-accounting.webp", alt: "Reconciled accounts and evidence supporting the financial case" },
      cta: { src: "/fst-consultation.webp", alt: "A private discussion about loan readiness and next steps" },
    }}
    introduction="FST tests the need, narrative, numbers and supporting documents before they reach the lender."
    accent="rose"
    services={[
      { title: "Business-plan preparation", description: "Full drafting across market need, offer, operations, management capability, milestones, risk and financial viability." },
      { title: "Business-plan review", description: "A structured challenge of an existing plan’s evidence, internal logic, feasibility and lender readability." },
      { title: "Financial projections", description: "Linked profit-and-loss, balance-sheet and cash-flow forecasts with stated drivers and scenarios." },
      { title: "Budgeting & cash planning", description: "Operating and capital budgets, funding-gap analysis, cash runway and sensitivities tied to the delivery plan." },
      { title: "Loan readiness assessment", description: "Early assessment of funding purpose, affordability, repayment capacity, security and information gaps." },
      { title: "Loan application support", description: "Preparation and coordination of forms, narrative, financial data, declarations and lender requirements." },
      { title: "Lender evidence pack", description: "Indexed accounts, tax records, bank data, contracts, quotations and management documents ready for review." },
      { title: "Queries & revisions", description: "Controlled responses to lender questions with updated assumptions, forecasts and reconciled documents." },
      { title: "Post-approval planning", description: "Drawdown conditions, covenant dates, use-of-funds monitoring and reporting routines prepared after approval." },
    ]}
    outcomes={["A lender-readable business plan", "Projections that reconcile", "An indexed application file", "Visible affordability and downside cases"]}
  />;
}
