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
    title="Turn the plan into a credible financial case."
    lede="Business plans, budgets, projections and loan-application support built around the decision a lender, board or funding partner needs to make."
    image="/who-we-work-with-business-v2.webp"
    imageAlt="Business owner and adviser reviewing a growth plan and financing requirements"
    sectionImages={{
      intro: { src: "/insights-strategy-v2.webp", alt: "Leadership team connecting strategy, operating milestones and financial assumptions" },
      offerings: { src: "/home-consulting-v2.webp", alt: "Advisers building a business plan, budget and finance application workplan" },
      outcomes: { src: "/about-story-v2.webp", alt: "Business leaders reviewing a coherent plan, projections and evidence package" },
      cta: { src: "/consulting-cta-v2.webp", alt: "Senior adviser discussing finance readiness with a business owner" },
    }}
    introduction="A strong finance application connects the commercial story, operating plan, evidence and numbers into one credible case."
    accent="rose"
    services={[
      { title: "Business-plan preparation", description: "End-to-end preparation of a structured business plan covering market, operations, management, risks, milestones and finances." },
      { title: "Business-plan review", description: "Critical review of an existing plan for clarity, evidence, consistency, feasibility and lender or investor readiness." },
      { title: "Financial projections", description: "Integrated profit and loss, balance-sheet and cash-flow projections with transparent assumptions and scenarios." },
      { title: "Budgeting & cash planning", description: "Operating budgets, capital requirements, funding gaps, cash runway and sensitivity analysis connected to delivery milestones." },
      { title: "Loan readiness assessment", description: "Review of borrowing need, affordability, repayment capacity, security considerations and supporting information before application." },
      { title: "Loan application support", description: "Preparation and coordination of the lender application, business case, financial information and required declarations." },
      { title: "Lender evidence pack", description: "Organisation of accounts, tax records, bank information, quotations, contracts and management evidence into a review-ready pack." },
      { title: "Queries & revisions", description: "Structured responses to lender questions, revised projections and reconciled updates during the assessment process." },
      { title: "Post-approval planning", description: "Drawdown readiness, covenant calendars, management reporting and use-of-funds tracking after approval." },
    ]}
    outcomes={["A clearer financing case", "Reconciled plans and projections", "A complete lender-ready evidence pack", "Better visibility of affordability and risk"]}
  />;
}
