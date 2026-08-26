import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Accounting & Financial Reporting Services",
  description: "Bookkeeping, reconciliations, management accounts, payroll, budgets, projections and financial statement preparation and review.",
  path: "/services/accounting-financial-reporting",
});

export default function AccountingFinancialReportingPage() {
  return <ServicePage
    serviceName="Accounting & Financial Reporting"
    path="/services/accounting-financial-reporting"
    eyebrow="Accounting & Financial Reporting"
    title="Make the numbers usable, not merely complete."
    lede="Bookkeeping, close, payroll and reporting support that converts transaction records into management information and review-ready statements."
    image="/fst-accounting.webp"
    imageAlt="An overhead view of accounting records and reconciliations"
    sectionImages={{
      intro: { src: "/fst-collaboration.webp", alt: "Finance colleagues aligning reporting responsibilities" },
      offerings: { src: "/fst-accounting.webp", alt: "Ledgers and reconciliations prepared for reporting" },
      outcomes: { src: "/fst-finance.webp", alt: "A financial model and projections under analytical review" },
      cta: { src: "/fst-consultation.webp", alt: "A finance adviser discussing reporting needs with a business owner" },
    }}
    introduction="FST connects the ledger, close process, reporting pack and forward view so finance work answers management’s real questions."
    accent="blue"
    services={[
      { title: "Bookkeeping & general ledger", description: "Transaction capture, coding and ledger maintenance organised for reliable reporting and traceability." },
      { title: "Bank & balance-sheet reconciliations", description: "Scheduled reconciliation of cash and control accounts, with aged differences assigned and cleared." },
      { title: "Accounts payable & receivable", description: "Invoice, supplier, collection and ageing processes that improve control of amounts due and owed." },
      { title: "Management accounts", description: "Recurring profit-and-loss, balance-sheet, cash-flow and variance packs tailored to management decisions." },
      { title: "Financial statement preparation", description: "Annual statements and supporting schedules produced from a closed, reconciled and documented file." },
      { title: "Financial statement review", description: "Critical review of drafts, disclosures, classifications and supporting balances before approval or filing." },
      { title: "Budgets & projections", description: "Driver-based budgets, rolling forecasts and scenarios connected to operating assumptions." },
      { title: "Cash-flow & working capital", description: "Liquidity forecasts and focused analysis of collections, payments, stock and short-term funding pressure." },
      { title: "Payroll & FSS support", description: "Payroll processing, employee master data and FSS reporting support with review controls." },
      { title: "Month-end & year-end close", description: "Close timetables, account ownership, review evidence and issue logs that make completion repeatable." },
    ]}
    outcomes={["A controlled close process", "Decision-ready reporting packs", "Prepared or reviewed financial statements", "Forward cash and budget visibility"]}
  />;
}
