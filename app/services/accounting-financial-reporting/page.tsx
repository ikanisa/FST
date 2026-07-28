import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Accounting & Financial Reporting",
  description: "Bookkeeping, reconciliations, management accounts, payroll, budgets, projections and financial statement preparation and review.",
  path: "/services/accounting-financial-reporting",
});

export default function AccountingFinancialReportingPage() {
  return <ServicePage
    eyebrow="Accounting & Financial Reporting"
    title="Reliable numbers for everyday decisions."
    lede="Connected bookkeeping, reporting, payroll and finance support—from accurate records through management information and annual financial statements."
    image="/accounting-financial-reporting.webp"
    imageAlt="Accounting professionals reviewing reconciliations and financial statements"
    sectionImages={{
      intro: { src: "/home-expertise-v2.webp", alt: "Accounting and finance professionals connecting reliable records with management decisions" },
      offerings: { src: "/home-capabilities-v2.webp", alt: "Finance workstreams organised around accounting, reporting and payroll responsibilities" },
      outcomes: { src: "/tax-outcomes-v2.webp", alt: "Finance leader reviewing timely management information and financial statements" },
      cta: { src: "/contact-conversation.webp", alt: "Accounting adviser discussing reporting priorities with a business leader" },
    }}
    introduction="Good accounting turns complete records into timely information, clear accountability and financial statements that stand up to review."
    accent="blue"
    services={[
      { title: "Bookkeeping & general ledger", description: "Accurate transaction processing, coding and ledger maintenance tailored to the organisation’s reporting needs." },
      { title: "Bank & balance-sheet reconciliations", description: "Routine reconciliation of bank, receivables, payables and key balance-sheet accounts, with open items followed through." },
      { title: "Accounts payable & receivable", description: "Structured invoicing, supplier processing, collections visibility and control over outstanding balances." },
      { title: "Management accounts", description: "Periodic profit and loss, balance sheet, cash-flow and variance reporting prepared for practical management use." },
      { title: "Financial statement preparation", description: "Preparation of annual financial statements and supporting schedules from a complete, reconciled accounting file." },
      { title: "Financial statement review", description: "Independent review of draft statements, disclosures, consistency and supporting balances before approval or filing." },
      { title: "Budgets & projections", description: "Integrated budgets, forecasts and scenario projections linked to assumptions, operations and decision points." },
      { title: "Cash-flow & working capital", description: "Cash forecasting, working-capital visibility and focused reporting on liquidity drivers and pressure points." },
      { title: "Payroll & FSS support", description: "Payroll processing, employee records and related Malta payroll reporting and compliance support." },
      { title: "Month-end & year-end close", description: "Close calendars, review controls and coordinated schedules that improve speed, completeness and accountability." },
    ]}
    outcomes={["More reliable books and records", "Timelier management information", "Review-ready financial statements", "Better cash and performance visibility"]}
  />;
}
