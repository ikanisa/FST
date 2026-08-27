import type { JurisdictionCode } from "./jurisdictions";

export const jurisdictionServiceSlugs = [
  "management-consulting",
  "audit-assurance",
  "taxation",
  "accounting-financial-reporting",
  "corporate-services",
  "loan-funding-application-support",
] as const;

export type JurisdictionServiceSlug = (typeof jurisdictionServiceSlugs)[number];

export type JurisdictionService = {
  slug: JurisdictionServiceSlug;
  title: string;
  shortTitle: string;
  introduction: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  offerings: Array<{ title: string; description: string }>;
  outcomes: string[];
  professionalNote?: { title: string; description: string };
  accent: "cobalt" | "violet" | "orange" | "rose" | "blue";
  image: string;
  imageAlt: string;
};

const shared: Record<JurisdictionServiceSlug, Pick<JurisdictionService, "slug" | "shortTitle" | "accent" | "image">> = {
  "management-consulting": { slug: "management-consulting", shortTitle: "Management, risk & controls", accent: "violet", image: "/fst-management.webp" },
  "audit-assurance": { slug: "audit-assurance", shortTitle: "Audit & assurance", accent: "cobalt", image: "/fst-insights.webp" },
  taxation: { slug: "taxation", shortTitle: "Taxation", accent: "orange", image: "/fst-tax.webp" },
  "accounting-financial-reporting": { slug: "accounting-financial-reporting", shortTitle: "Accounting & reporting", accent: "blue", image: "/fst-accounting.webp" },
  "corporate-services": { slug: "corporate-services", shortTitle: "Corporate services", accent: "rose", image: "/fst-corporate.webp" },
  "loan-funding-application-support": { slug: "loan-funding-application-support", shortTitle: "Loans & funding", accent: "violet", image: "/funding-application-services.webp" },
};

const maltaServices: JurisdictionService[] = [
  {
    ...shared["management-consulting"],
    title: "Management Advisory, Risk & Controls",
    introduction: "Build the operating plan, ownership and control environment behind the next decision.",
    description: "Senior support for organisations working through strategy, feasibility, operating-model, risk, control and performance questions.",
    imageAlt: "Leadership and advisers mapping an operating plan and control responsibilities",
    offerings: [
      { title: "Business planning & feasibility", description: "Commercial assumptions, delivery model, resources, milestones and decision-ready scenarios." },
      { title: "Risk management & internal controls", description: "Risk ownership, control design, indicators, evidence and reporting routines." },
      { title: "Operating-model improvement", description: "Roles, hand-offs, procedures and management information rebuilt around the required outcome." },
    ],
    outcomes: ["An executable plan", "Named owners and deadlines", "Controls linked to material risks", "A usable management evidence file"],
  },
  {
    ...shared["audit-assurance"],
    title: "Audit & Assurance",
    introduction: "Independent work should strengthen confidence without blurring responsibility.",
    description: "Risk-led audit, assurance, internal audit, controls, donor and project work organised around evidence and clear reporting.",
    imageAlt: "Independent reviewers assessing financial evidence and documented conclusions",
    offerings: [
      { title: "Financial statement audit", description: "Statutory or voluntary audit subject to authority, independence and formal engagement acceptance." },
      { title: "Internal audit & controls assurance", description: "Focused testing of governance, risk, processes and control operation." },
      { title: "Grant, donor & project audit", description: "Expenditure, eligibility, procurement and reporting tests against the funding terms." },
    ],
    outcomes: ["Evidence-supported conclusions", "Clear findings", "Visible unresolved matters", "Actions that preserve independence"],
    professionalNote: {
      title: "Authority and independence come first.",
      description: "Regulated audit and assurance work is performed only through an appropriately authorised provider after independence, conflict, competence and acceptance checks.",
    },
  },
  {
    ...shared.taxation,
    title: "Taxation",
    introduction: "Keep the tax position connected to the records, transaction and filing evidence.",
    description: "Support across income tax, VAT, payroll, withholding, property, international tax and authority queries.",
    imageAlt: "Tax records, reconciliations and filing evidence arranged for professional review",
    offerings: [
      { title: "Corporate & personal income tax", description: "Computations, returns, payment planning and reconciled supporting schedules." },
      { title: "VAT, payroll & employment taxes", description: "Registrations, recurring returns, FSS, social-security and control reconciliations." },
      { title: "Transactions & international tax", description: "Withholding, property, cross-border and transfer-pricing work with documented assumptions." },
    ],
    outcomes: ["A reconciled tax working file", "Deadlines and approvals made visible", "Queries supported by evidence", "No filing without client approval"],
    professionalNote: {
      title: "Preparation does not replace approval.",
      description: "Final positions, elections, returns and submissions remain subject to client approval and all applicable professional requirements.",
    },
  },
  {
    ...shared["accounting-financial-reporting"],
    title: "Accounting & Financial Reporting",
    introduction: "Reliable decisions start with records that reconcile and reporting that arrives on time.",
    description: "Bookkeeping, close, financial statements, management reporting, payroll and finance-operations support.",
    imageAlt: "An organised finance workspace with reconciled records and management reporting",
    offerings: [
      { title: "Bookkeeping & reconciliations", description: "Controlled posting, bank reconciliation, exception management and supporting records." },
      { title: "Financial statements & close", description: "Year-end preparation, balance substantiation and review-ready schedules." },
      { title: "Management reporting & finance operations", description: "Budgets, forecasts, liquidity reporting, payroll and recurring finance controls." },
    ],
    outcomes: ["Reconciled records", "A controlled close", "Decision-ready reporting", "A credible year-end file"],
  },
  {
    ...shared["corporate-services"],
    title: "Corporate & Administrative Services",
    introduction: "Keep ownership, decisions, records and deadlines aligned through the company lifecycle.",
    description: "Entity setup, governance records, statutory registers, recurring administration and corporate changes.",
    imageAlt: "Company records, governance actions and deadlines organised in one controlled file",
    offerings: [
      { title: "Formation & recurring administration", description: "Setup, recurring records, registers and calendar-led obligations." },
      { title: "Board & ownership actions", description: "Resolutions, minutes, changes and supporting evidence prepared for approval." },
      { title: "Compliance records & submissions", description: "Controlled preparation of recurring corporate information and filing packs." },
    ],
    outcomes: ["Current statutory records", "Traceable decisions", "Visible deadlines", "Approved submission packs"],
    professionalNote: {
      title: "Corporate authority stays explicit.",
      description: "Company-service-provider activities are delivered only where the required authorisation, registration or exemption is in place.",
    },
  },
  {
    ...shared["loan-funding-application-support"],
    title: "Loan & Funding Application Support",
    introduction: "Turn the financing question into one controlled application and evidence file.",
    description: "Readiness, route selection, applications, financial schedules, evidence packs and post-approval setup.",
    imageAlt: "A financing application file with budgets, projections and supporting evidence",
    offerings: [
      { title: "Loan application readiness", description: "Borrowing requirement, repayment logic, lender information and supporting schedules." },
      { title: "Grant & incentive applications", description: "Eligibility, project design, budgets, narrative and evidence mapping." },
      { title: "Queries, approval & award setup", description: "Clarifications, conditions, control setup and post-decision responsibilities." },
    ],
    outcomes: ["A coherent application", "Reconciled financial schedules", "Evidence mapped to requirements", "Conditions and owners tracked"],
  },
];

const rwandaServices: JurisdictionService[] = [
  {
    ...shared["management-consulting"],
    image: "/fst-rw-collaboration.webp",
    title: "Management Advisory, Risk & Controls",
    seoTitle: "Business Plans, Risk & Internal Controls in Rwanda",
    seoDescription: "Business planning, feasibility, risk management and internal controls support for Rwanda businesses, cooperatives, NGOs and development programmes.",
    introduction: "Business plans, risk management and internal controls built for execution.",
    description: "Practical support for businesses, cooperatives and programmes working through strategy, execution, governance and control questions.",
    imageAlt: "Business leaders mapping priorities, ownership and operating controls",
    offerings: [
      { title: "Business plans & feasibility", description: "Market logic, operating assumptions, budgets, milestones and scenario testing." },
      { title: "Governance, risk & controls", description: "Decision rights, risk ownership, policies, control evidence and reporting routines." },
      { title: "Performance & operating-model improvement", description: "Roles, workflows, indicators and action tracking connected to delivery." },
    ],
    outcomes: ["A bankable operating plan", "Named owners and milestones", "Controls linked to material risks", "Useful management reporting"],
  },
  {
    ...shared["audit-assurance"],
    title: "Audit Readiness & Assurance Support",
    seoTitle: "Audit Readiness & Internal Controls in Rwanda",
    seoDescription: "Audit readiness, internal audit, controls review and donor-project evidence support for organisations and programmes operating in Rwanda.",
    introduction: "Audit readiness and internal controls support built around reliable evidence.",
    description: "Audit readiness, internal audit, controls, donor and project evidence support for organisations and programmes.",
    imageAlt: "A structured audit-readiness file with records, evidence and review points",
    offerings: [
      { title: "Financial-statement audit readiness", description: "Reconciliations, schedules, evidence indexing and review-point closure before external audit." },
      { title: "Internal audit & controls review", description: "Risk-led process review, findings, actions and follow-up support." },
      { title: "Grant, donor & project assurance support", description: "Eligibility, expenditure, procurement and reporting evidence prepared against the funding terms." },
    ],
    outcomes: ["A review-ready evidence file", "Clear unresolved matters", "Findings with owners", "Regulated conclusions kept with authorised professionals"],
    professionalNote: {
      title: "Regulated conclusions require the right authority.",
      description: "FST does not present preparation support as a statutory audit opinion. Any regulated audit or assurance conclusion is accepted and issued only by a provider authorised for the applicable engagement.",
    },
  },
  {
    ...shared.taxation,
    title: "Tax Compliance Readiness",
    seoTitle: "RRA Tax Compliance, VAT, EBM, PAYE & WHT in Rwanda",
    seoDescription: "RRA tax compliance support covering VAT, EBM reconciliation, PAYE, withholding tax, income tax workpacks, RSSB schedules and authority queries.",
    introduction: "RRA tax compliance, VAT, EBM, PAYE and withholding tax support.",
    description: "Preparation support for RRA tax registrations and returns, VAT and EBM reconciliation, PAYE, withholding tax, RSSB schedules and authority queries.",
    imageAlt: "Tax records and reconciliation schedules organised for review and approval",
    offerings: [
      { title: "Income tax & business tax readiness", description: "Computations, return workpacks, payment schedules and supporting evidence." },
      { title: "VAT, EBM, PAYE, WHT & RSSB workpacks", description: "RRA and RSSB obligation calendars, VAT and EBM reconciliations, payroll support, PAYE and withholding-tax schedules." },
      { title: "Tax queries & review support", description: "Issue logs, source records, reconciliations and response packs for professional review." },
    ],
    outcomes: ["A reconciled tax file", "Visible filing responsibilities", "Approval evidence", "Questions escalated to the right professional"],
    professionalNote: {
      title: "Local review and taxpayer approval remain mandatory.",
      description: "Tax positions, filings and representations are confirmed under the applicable requirements by the taxpayer and responsible professional before submission.",
    },
  },
  {
    ...shared["accounting-financial-reporting"],
    title: "Accounting & Financial Reporting",
    seoTitle: "Bookkeeping & Accounting Services in Rwanda",
    seoDescription: "Bookkeeping, bank and mobile-money reconciliation, management accounts, financial reporting, budgets and year-end accounting support in Rwanda.",
    introduction: "Bookkeeping and accounting services that keep business records decision-ready.",
    description: "Bookkeeping, bank and mobile-money reconciliation, close, financial reporting, budgets, cash-flow and finance-control support for organisations and programmes.",
    imageAlt: "Reconciled accounting records and financial reports prepared for management review",
    offerings: [
      { title: "Bookkeeping & reconciliations", description: "Ledger maintenance, bank and mobile-money reconciliation, exceptions and source-document control." },
      { title: "Financial reporting & close", description: "Management accounts, year-end schedules, balance substantiation and review readiness." },
      { title: "Budgets, forecasts & cash management", description: "Operating budgets, cash-flow scenarios and routine financial performance reporting." },
    ],
    outcomes: ["Reconciled records", "Timely reporting", "Visible cash requirements", "A controlled year-end file"],
  },
  {
    ...shared["corporate-services"],
    title: "Corporate Governance & Administration",
    seoTitle: "Business Setup & Corporate Governance in Rwanda",
    seoDescription: "Business setup readiness, ownership records, governance documents, resolutions, registers and recurring corporate administration support in Rwanda.",
    introduction: "Business setup and corporate governance support with controlled records.",
    description: "Preparation support for business setup, registration information, ownership records, governance documents, registers, resolutions and recurring administration.",
    imageAlt: "Governance records, resolutions and compliance actions organised in one file",
    offerings: [
      { title: "Business setup & RDB registration readiness", description: "Information checklists, ownership records, operating documents and registration workpacks prepared for approval." },
      { title: "Governance records", description: "Meeting packs, decisions, action logs, policies and controlled registers." },
      { title: "Recurring compliance administration", description: "Obligation calendars, evidence files and approval-controlled submission preparation." },
    ],
    outcomes: ["Current governance records", "Traceable decisions", "Visible obligations", "Submission packs ready for approval"],
    professionalNote: {
      title: "Registration and legal acts remain provider-controlled.",
      description: "FST confirms the responsible provider and any required authority before accepting regulated registration, legal or representation work.",
    },
  },
  {
    ...shared["loan-funding-application-support"],
    image: "/fst-rw-operations.webp",
    title: "Loan, Grant & Funding Application Support",
    seoTitle: "Business Loan, Grant & Funding Support in Rwanda",
    seoDescription: "Business loan, grant, donor and investment-readiness support with cash-flow forecasts, budgets, bankability evidence and application workpacks.",
    introduction: "Business loan, grant and funding applications built around credible evidence.",
    description: "Bankability, loan, grant, donor and investment-readiness support for businesses, cooperatives and programmes.",
    imageAlt: "A funding application file with financial schedules, evidence and delivery milestones",
    offerings: [
      { title: "Loan & bankability preparation", description: "Funding requirement, cash-flow, repayment capacity, records and lender evidence." },
      { title: "Grant & donor applications", description: "Eligibility, project logic, budgets, results framework and supporting documents." },
      { title: "Due diligence & post-award setup", description: "Query responses, conditions, procurement, reporting and control readiness." },
    ],
    outcomes: ["A coherent funding case", "Reconciled schedules", "Evidence mapped to criteria", "Conditions and reporting owners tracked"],
  },
];

const servicesByJurisdiction: Record<JurisdictionCode, JurisdictionService[]> = {
  mt: maltaServices,
  rw: rwandaServices,
};

export function getJurisdictionServices(jurisdiction: JurisdictionCode) {
  return servicesByJurisdiction[jurisdiction];
}

export function getJurisdictionService(jurisdiction: JurisdictionCode, slug: string) {
  return servicesByJurisdiction[jurisdiction].find((service) => service.slug === slug);
}
