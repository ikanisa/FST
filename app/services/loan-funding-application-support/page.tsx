import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Loan & Funding Application Support",
  description: "Integrated loan and funding application support covering finance readiness, lender schedules, evidence, FONDI.eu, Malta Enterprise and Xjenza Malta routes.",
  path: "/services/loan-funding-application-support",
});

export default function LoanFundingApplicationSupportPage() {
  return <ServicePage
    serviceName="Loan & Funding Application Support"
    path="/services/loan-funding-application-support"
    eyebrow="Loan & Funding Application Support"
    title="Build one credible case for the finance you need."
    lede="A consolidated service for bank lending, public funding and innovation support—from route selection and financial modelling through complete applications, evidence, review and approval readiness."
    image="/fst-finance.webp"
    imageAlt="Business leaders reviewing an integrated loan and funding application file"
    sectionImages={{
      intro: { src: "/funding-intro-v2.webp", alt: "An adviser comparing lender and public-funding routes against a business need" },
      offerings: { src: "/funding-offerings-v2.webp", alt: "A coordinated team preparing financial schedules, application forms and evidence" },
      outcomes: { src: "/funding-outcomes-v2.webp", alt: "Leaders reviewing a reconciled finance application and approval plan" },
      cta: { src: "/funding-cta-v2.webp", alt: "A confidential first discussion about borrowing and funding requirements" },
    }}
    introduction="FST tests the financing need first, then joins the commercial case, financial model, route rules, application forms and supporting evidence into one controlled file."
    accent="rose"
    referenceLinks={[
      { label: "FONDI.eu", href: "https://fondi.eu/what-funding-is-available/", description: "EU and cohesion-funded calls, official guidance, scheme documents and beneficiary requirements." },
      { label: "Malta Enterprise", href: "https://maltaenterprise.com/support", description: "Enterprise incentives, tax credits, repayable finance, business development and innovation support." },
      { label: "Xjenza Malta", href: "https://xjenzamalta.mt/media/open-funding-schemes/", description: "Current research, innovation, digital, commercialisation and collaboration funding schemes." },
    ]}
    services={[
      { title: "Finance & funding readiness assessment", description: "Early assessment of purpose, amount, timing, eligibility, affordability, repayment capacity, co-financing and information gaps." },
      { title: "Route & facility fit", description: "Comparison of suitable loan facilities, grants, incentives, tax credits and innovation routes against the project and organisation." },
      { title: "Borrowing requirement & repayment case", description: "Definition of the finance purpose, amount, term, security, repayment profile and debt-service capacity." },
      { title: "Loan application forms", description: "Preparation and coordination of lender forms, declarations, narrative and institution-specific information requirements." },
      { title: "Lender financial schedules", description: "Forecasts, debt-service calculations, cash-flow schedules, sensitivities, covenant information and repayment analysis." },
      { title: "Funding eligibility & project design", description: "Applicant and activity screening followed by clear objectives, work packages, milestones, outputs, indicators and delivery roles." },
      { title: "Business case & application narrative", description: "A consistent commercial, operational and impact case mapped to lender questions or funding evaluation criteria." },
      { title: "Budget, eligible costs & co-financing", description: "Project budgets, quotations, aid intensity, own contribution, financing plan, cash flow and cross-document consistency checks." },
      { title: "Loan & funding evidence pack", description: "Indexed accounts, tax records, bank data, contracts, quotations, ownership records, declarations, CVs and management evidence." },
      { title: "State aid & double-funding checks", description: "Prior and pending aid mapping, applicable aid treatment, cost separation and documented conflict checks for public funding routes." },
      { title: "Application quality review", description: "Independent challenge of completeness, assumptions, scoring logic, calculations, attachments and submission readiness." },
      { title: "Lender & funder queries", description: "Controlled responses to clarification requests with reconciled revisions to assumptions, schedules, forms and evidence." },
      { title: "Approval, drawdown & award setup", description: "Review of conditions, outstanding evidence, drawdown or contracting requirements, dates, responsibilities and implementation controls." },
      { title: "Post-approval & post-award support", description: "Use-of-funds monitoring, covenant dates, procurement evidence, claims, milestones, reports and change-control support." },
      { title: "Authorised submission control", description: "A final portal and completeness check while the authorised applicant retains approval, declarations and external submission control." },
    ]}
    outcomes={["A documented financing-route decision", "One financial model supporting the full case", "A complete lender or funding evidence pack", "Clear approval, submission and implementation responsibilities"]}
  />;
}
