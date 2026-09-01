import { jurisdictionConfig, type JurisdictionCode } from "./jurisdictions";

export const sectorPackageSlugs = [
  "pharmacies",
  "hardware-shops",
  "spare-parts",
  "engineering-practices",
  "restaurants-and-hospitality",
  "restaurants-and-cafes",
  "self-employed",
  "shops",
  "retail-shops",
  "csp-firms",
  "construction-contractors",
] as const;

export type SectorPackageSlug = (typeof sectorPackageSlugs)[number];
export type SectorPackageAccent = "cobalt" | "violet" | "orange" | "blue" | "teal";

export type SectorPackageAddOn = {
  id: string;
  title: string;
  description: string;
};

export type SectorCatalogueEntry = {
  id: "finance-routine" | "sector-control" | "complete-desk";
  title: string;
  description: string;
  bestFor: string;
  from: number;
  setupFrom?: number;
  billingUnit: "month" | "client / month";
  featured?: boolean;
  includes: string[];
  atomicServiceIds: string[];
};

export type SectorPackage = {
  id: string;
  version: string;
  jurisdiction: JurisdictionCode;
  slug: SectorPackageSlug;
  sectorLabel: string;
  title: string;
  heroTitle: string;
  summary: string;
  fitStatement: string;
  monthlyFrom: number;
  setupFrom?: number;
  monthlyUnit: string;
  accent: SectorPackageAccent;
  image: string;
  imageAlt: string;
  atomicServiceIds: string[];
  included: Array<{ title: string; description: string }>;
  limits: Array<{ label: string; value: string }>;
  evidence: string[];
  addOns: SectorPackageAddOn[];
  reviewTriggers: string[];
  boundaries: string[];
  authoritySources: Array<{ label: string; href: string; description: string }>;
  scopeLabels: {
    workload: string;
    entry: string;
    growth: string;
    complex: string;
  };
};

const version = "2026-09-01";

const activePackageSlugsByJurisdiction: Record<JurisdictionCode, readonly SectorPackageSlug[]> = {
  rw: ["pharmacies", "shops", "restaurants-and-hospitality", "engineering-practices"],
  mt: ["restaurants-and-cafes", "self-employed", "retail-shops", "csp-firms"],
};

const packagesByJurisdiction: Record<JurisdictionCode, SectorPackage[]> = {
  rw: [
    {
      id: "rw-pharmacy-control-desk",
      version,
      jurisdiction: "rw",
      slug: "pharmacies",
      sectorLabel: "Pharmacies",
      title: "Pharmacy Control & Compliance Desk",
      heroTitle: "Keep the books, stock and compliance evidence working together.",
      summary: "A recurring finance and operating-control package for a community pharmacy that needs reconciled records, tax and payroll workpacks, expiry visibility and an inspection-ready evidence file.",
      fitStatement: "Designed for an owner-managed pharmacy with one licensed premises, a manageable stock master and clean digital records.",
      monthlyFrom: 45_000,
      monthlyUnit: "month",
      accent: "cobalt",
      image: "/sector-rw-pharmacy.webp",
      imageAlt: "A community pharmacy team reviewing medicine stock and expiry records",
      atomicServiceIds: ["rw-monthly-bookkeeping", "rw-bank-momo-reconciliation", "rw-monthly-rra-rssb-bundle", "rw-management-accounts"],
      included: [
        { title: "Finance records that reconcile", description: "Bookkeeping, bank and mobile-money reconciliation, supplier balances and a monthly management summary." },
        { title: "Tax and payroll workpacks", description: "EBM-to-sales, VAT, WHT, PAYE and RSSB schedules prepared from the underlying records and routed for approval." },
        { title: "Stock, batch and expiry control", description: "An active-SKU master with batch, expiry, near-expiry, return and disposal exceptions made visible." },
        { title: "Inspection evidence register", description: "Premises, licence, responsible-professional and operating evidence indexed with owner, due date and gap status." },
      ],
      limits: [
        { label: "Premises", value: "1 licensed location" },
        { label: "Finance volume", value: "Up to 100 monthly entries" },
        { label: "Stock master", value: "Up to 500 active SKUs" },
        { label: "Payroll", value: "Up to 10 staff" },
      ],
      evidence: ["TIN and active tax obligations", "EBM sales and purchase records", "Bank and mobile-money statements", "Payroll and RSSB records", "SKU, batch and expiry export", "Current premises and professional evidence"],
      addOns: [
        { id: "licence-readiness", title: "Premises and licence readiness", description: "Renewal, variation or inspection evidence assembled for the responsible professional and authorised route." },
        { id: "physical-stock", title: "Physical stock count", description: "Count plan, controlled sheets, variance analysis and approved adjustments." },
        { id: "cold-chain", title: "Cold-chain evidence review", description: "Temperature, exception and custody evidence indexed without replacing pharmaceutical judgement." },
        { id: "recall-disposal", title: "Recall and disposal workpack", description: "Affected stock, decisions, custody and evidence organised for authorised action." },
        { id: "working-capital", title: "Working-capital finance file", description: "Stock, margin, cash-flow and repayment evidence prepared for lender assessment." },
      ],
      reviewTriggers: ["More than one premises", "Wholesale or importer activity", "Controlled-product or cold-chain issues", "Missing or unreliable stock exports", "A current inspection, licence or enforcement matter"],
      boundaries: ["No dispensing or product-release decision", "No licence or inspection outcome", "No regulator submission without authorised approval", "No prescription or patient health data in first-contact intake"],
      authoritySources: [
        { label: "Medicines regulator", href: "https://monitoring.rwandafda.gov.rw/stakeholders/", description: "Current medicine, premises and stakeholder documents checked when the scope is confirmed." },
        { label: "Pharmacy Council", href: "https://pharmacycouncil.rw/registration-requirements/", description: "Professional registration and practice requirements remain with the authorised professional." },
        { label: "Tax administration", href: "https://www.rra.gov.rw/en/domestic-tax-services", description: "Tax obligations and filing routes are verified against current official guidance." },
      ],
      scopeLabels: { workload: "Active medicine and retail SKUs", entry: "Up to 500", growth: "501–1,000", complex: "More than 1,000" },
    },
    {
      id: "rw-shop-finance-desk",
      version,
      jurisdiction: "rw",
      slug: "shops",
      sectorLabel: "Shops (hardware, spare-parts & more)",
      title: "Shop Finance, Tax & Stock Desk",
      heroTitle: "Know what is selling, what is shrinking and what the records support.",
      summary: "A recurring package for hardware, spare-parts and other stock-led shops that connects bookkeeping, EBM and tax workpacks to stock movement, supplier balances and product-family margin.",
      fitStatement: "Designed for one owner-managed retail branch with clean digital sales, purchase and stock records.",
      monthlyFrom: 35_000,
      monthlyUnit: "month",
      accent: "orange",
      image: "/sector-rw-hardware.webp",
      imageAlt: "Shop owners reviewing stock and sales records in organised retail aisles",
      atomicServiceIds: ["rw-monthly-bookkeeping", "rw-bank-momo-reconciliation", "rw-vat-return", "rw-wht-return", "rw-unified-paye-rssb", "rw-management-accounts"],
      included: [
        { title: "Sales, purchases and cash reconciled", description: "Books, bank and mobile money aligned to EBM sales, purchases, supplier balances and approved exceptions." },
        { title: "VAT, WHT and payroll workpacks", description: "Recurring tax and RSSB schedules prepared from reconciled records with the filing owner confirmed." },
        { title: "Usable product master", description: "SKU, unit of measure, brand, specification, supplier and product-family fields made consistent." },
        { title: "Stock and margin control", description: "Movement, slow stock, shrinkage and gross margin reviewed by product family." },
      ],
      limits: [
        { label: "Branch", value: "1 retail location" },
        { label: "Finance volume", value: "Up to 100 monthly entries" },
        { label: "Stock master", value: "Up to 500 active SKUs" },
        { label: "Payroll", value: "Up to 10 staff" },
      ],
      evidence: ["TIN and registration details", "EBM sales export", "Purchase and supplier records", "Bank and mobile-money statements", "Current SKU and stock export", "Payroll and RSSB records"],
      addOns: [
        { id: "import-landed-cost", title: "Import and landed-cost workpack", description: "Shipment, duty, freight and supplier costs allocated to the relevant stock batch." },
        { id: "product-evidence", title: "Product-evidence remediation", description: "Applicable supplier, standard or conformity evidence indexed and gaps routed for competent action." },
        { id: "physical-stock", title: "Physical stock count", description: "Count plan, sheets, variance analysis and approved adjustment file." },
        { id: "multi-branch", title: "Multi-branch reporting", description: "Branch-level sales, stock, cash and margin controls added after system and volume review." },
        { id: "working-capital", title: "Working-capital finance file", description: "Inventory, margin, cash-flow and repayment evidence prepared for a lender." },
      ],
      reviewTriggers: ["More than one branch", "More than 500 active SKUs", "Import or tender-supply activity", "Missing SKU or stock movement records", "Product-conformity concerns"],
      boundaries: ["No product certification or standards decision", "No customs declaration in the recurring package", "No physical count unless selected", "No filing without taxpayer approval"],
      authoritySources: [
        { label: "Standards authority", href: "https://www.rsb.gov.rw/certifications/system-certification/system-certification-schemes-1", description: "Applicable product and certification routes are checked item by item." },
        { label: "Inspection and consumer authority", href: "https://www.rica.gov.rw/s", description: "Inspection or market-control requirements are escalated when relevant." },
        { label: "Tax administration", href: "https://www.rra.gov.rw/en/domestic-tax-services", description: "EBM, VAT, WHT and filing routes are checked against current guidance." },
      ],
      scopeLabels: { workload: "Active hardware SKUs", entry: "Up to 500", growth: "501–1,000", complex: "More than 1,000" },
    },
    {
      id: "rw-spare-parts-stock-desk",
      version,
      jurisdiction: "rw",
      slug: "spare-parts",
      sectorLabel: "Spare-parts shops",
      title: "Spare Parts Stock & Import Desk",
      heroTitle: "Control part numbers, landed cost and slow stock before cash gets trapped.",
      summary: "A recurring package for spare-parts retailers that connects finance and tax workpacks to part compatibility, import batches, warranty returns and obsolete-stock visibility.",
      fitStatement: "Designed for one branch with a maintainable part-number master, clean purchase records and no customs submission in the recurring scope.",
      monthlyFrom: 40_000,
      monthlyUnit: "month",
      accent: "blue",
      image: "/sector-rw-spare-parts.webp",
      imageAlt: "A spare-parts shop owner checking part records beside organised stock",
      atomicServiceIds: ["rw-monthly-bookkeeping", "rw-bank-momo-reconciliation", "rw-vat-return", "rw-wht-return", "rw-unified-paye-rssb", "rw-management-accounts"],
      included: [
        { title: "Books and tax evidence", description: "Sales, purchases, cash, bank, mobile money, VAT, WHT, payroll and RSSB workpacks tied to the records." },
        { title: "Part and compatibility master", description: "Part number, vehicle compatibility, OEM or aftermarket status and supplier identity organised consistently." },
        { title: "Import-batch landed cost", description: "Supplier, freight, duty and related costs allocated to the stock batch from available documents." },
        { title: "Returns and obsolescence", description: "Warranty, returns, core exchange, slow stock and obsolete inventory made visible." },
      ],
      limits: [
        { label: "Branch", value: "1 retail location" },
        { label: "Finance volume", value: "Up to 100 monthly entries" },
        { label: "Parts master", value: "Up to 750 active part numbers" },
        { label: "Payroll", value: "Up to 10 staff" },
      ],
      evidence: ["TIN and EBM details", "Sales and purchase exports", "Supplier and import documents", "Bank and mobile-money statements", "Part-number and stock export", "Warranty and return records"],
      addOns: [
        { id: "importer-readiness", title: "Importer readiness", description: "Importer, shipment, tax and supporting evidence organised before the authorised customs route." },
        { id: "item-rule-evidence", title: "Item-rule evidence", description: "Safety-critical, tyre, battery, waste or other product-specific evidence mapped to the item." },
        { id: "physical-stock", title: "Physical stock count", description: "Controlled count and variance file for high-value and slow-moving parts." },
        { id: "garage-credit", title: "Garage and trade credit control", description: "Customer limits, ageing, disputes and collection actions organised." },
        { id: "inventory-finance", title: "Inventory-finance file", description: "Stock quality, margin, turnover and cash-flow evidence prepared for lender review." },
      ],
      reviewTriggers: ["More than one branch", "More than 750 part numbers", "High import frequency", "Safety-critical or regulated components", "Unreliable compatibility or landed-cost records"],
      boundaries: ["No universal product-approval conclusion", "No customs submission in the recurring package", "No physical count unless selected", "No lender approval promise"],
      authoritySources: [
        { label: "Inspection and consumer authority", href: "https://www.rica.gov.rw/s", description: "Relevant market, inspection and product controls are checked by item and activity." },
        { label: "Standards authority", href: "https://www.rsb.gov.rw/certifications/system-certification/system-certification-schemes-1", description: "Applicable standards or certification evidence is not assumed across every part." },
        { label: "Tax administration", href: "https://www.rra.gov.rw/en/domestic-tax-services", description: "EBM, VAT, WHT and import-related tax evidence is checked against current routes." },
      ],
      scopeLabels: { workload: "Active part numbers", entry: "Up to 750", growth: "751–1,500", complex: "More than 1,500" },
    },
    {
      id: "rw-engineering-project-desk",
      version,
      jurisdiction: "rw",
      slug: "engineering-practices",
      sectorLabel: "Construction",
      title: "Construction Finance & Project Desk",
      heroTitle: "See project cost, certificates, retention and cash before the next decision.",
      summary: "A project-led finance package for engineers, contractors and technical practices that need books and tax workpacks connected to contracts, BOQs, WIP, variations and collections.",
      fitStatement: "Designed for one entity with up to two active projects, clean remote records and no site verification in the recurring scope.",
      monthlyFrom: 50_000,
      monthlyUnit: "month",
      accent: "violet",
      image: "/sector-rw-engineering.webp",
      imageAlt: "Engineering and finance professionals reviewing plans and project costs",
      atomicServiceIds: ["rw-monthly-bookkeeping", "rw-bank-momo-reconciliation", "rw-unified-paye-rssb", "rw-management-accounts", "rw-budget-cashflow-model"],
      included: [
        { title: "Project-connected books", description: "Bank, mobile money, payroll, tax and subcontractor records coded to the relevant project and approved cost structure." },
        { title: "Contract and BOQ register", description: "Engagement, scope, value, milestones, BOQ or fee basis and responsibility recorded for each active project." },
        { title: "Job cost and WIP", description: "Actual cost, commitments, progress and forecast-to-complete reviewed against the project baseline." },
        { title: "Certificates, retention and collection", description: "Advances, variations, payment certificates, retentions, invoices and collections tracked together." },
      ],
      limits: [
        { label: "Entity", value: "1 operating entity" },
        { label: "Projects", value: "Up to 2 active projects" },
        { label: "Finance volume", value: "Up to 75 monthly entries" },
        { label: "Payroll", value: "Up to 10 staff" },
      ],
      evidence: ["Entity and professional registration evidence", "Signed contracts and BOQs or scopes", "Bank and mobile-money statements", "Payroll, tax and RSSB records", "Certificates, variations and retention schedules", "Supplier and subcontractor records"],
      addOns: [
        { id: "tender-pack", title: "Tender evidence pack", description: "Eligibility, declarations, financial schedules and supporting documents controlled for approval." },
        { id: "bid-model", title: "Bid and cash-flow model", description: "Cost, margin, funding gap and delivery scenarios prepared from the proposed scope." },
        { id: "contract-review", title: "Contract and claim support", description: "Commercial and evidence issues prepared for the competent legal or technical route." },
        { id: "bond-readiness", title: "Bond or guarantee readiness", description: "Facility need, cash impact and supporting evidence prepared for bank assessment." },
        { id: "annual-accounts", title: "Year-end and audit-readiness file", description: "Project balances, WIP, receivables, retentions and supporting schedules prepared for review." },
      ],
      reviewTriggers: ["More than two active projects", "Joint venture or consortium delivery", "Site verification or technical certification", "Disputed variations, claims or retentions", "Tender, licence or professional-status deadline"],
      boundaries: ["No reserved design or engineering conclusion", "No site or quantity certification", "No legal opinion or claim decision", "No licence, tender or bank approval promise"],
      authoritySources: [
        { label: "Professional-law source", href: "https://www.engineersrwanda.rw/documents/ier_documents/1759312897.Law%20on%20the%20Professions%20of%20Architecture%2C%20Engineering%20and%20Quantity%20Surveying%202025-1.pdf", description: "Professional status and reserved work are confirmed before acceptance." },
        { label: "Business registrar", href: "https://org.rdb.rw/business-registration/", description: "Entity and registration evidence is checked through the current official route." },
        { label: "Tax administration", href: "https://www.rra.gov.rw/en/domestic-tax-services", description: "Project tax, payroll and filing workpacks remain approval-controlled." },
      ],
      scopeLabels: { workload: "Active projects", entry: "Up to 2", growth: "3–5", complex: "More than 5" },
    },
    {
      id: "rw-hospitality-finance-desk",
      version,
      jurisdiction: "rw",
      slug: "restaurants-and-hospitality",
      sectorLabel: "Restaurants",
      title: "Restaurant Finance, Tax & Payroll Desk",
      heroTitle: "See daily sales, food cost, payroll and cash in one operating view.",
      summary: "A recurring finance package for restaurants, cafés and small hospitality operators that connects POS and mobile-money sales to EBM, tax, payroll, supplier and margin controls.",
      fitStatement: "Designed for one owner-managed outlet with usable POS or EBM records, clean purchasing evidence and up to ten staff.",
      monthlyFrom: 35_000,
      monthlyUnit: "month",
      accent: "teal",
      image: "/sector-rw-hospitality.webp",
      imageAlt: "Rwandan restaurant staff reviewing sales and supplier records at a service counter",
      atomicServiceIds: ["rw-monthly-bookkeeping", "rw-bank-momo-reconciliation", "rw-vat-return", "rw-wht-return", "rw-unified-paye-rssb", "rw-management-accounts"],
      included: [
        { title: "Daily sales and settlement control", description: "POS, EBM, cash, card and mobile-money takings reconciled to bank and settlement records." },
        { title: "Tax and payroll workpacks", description: "VAT, WHT, PAYE and RSSB schedules prepared from reconciled books for approval." },
        { title: "Food cost and supplier control", description: "Purchases, supplier balances, food cost and gross-margin exceptions reviewed monthly." },
        { title: "Management and administration", description: "Cash-flow, payroll, year-end and company-record priorities kept in one operating calendar." },
      ],
      limits: [
        { label: "Outlet", value: "1 restaurant, café or hospitality location" },
        { label: "Finance volume", value: "Up to 120 monthly entries" },
        { label: "Sales records", value: "1 usable POS or EBM source" },
        { label: "Payroll", value: "Up to 10 staff" },
      ],
      evidence: ["TIN and active tax obligations", "POS, EBM and mobile-money sales records", "Bank and card statements", "Purchase and supplier records", "Payroll and RSSB records", "Current menu or sales-category export"],
      addOns: [
        { id: "multi-outlet", title: "Multi-outlet reporting", description: "Outlet-level sales, cash, purchases, margin and payroll reporting added after systems review." },
        { id: "food-cost", title: "Detailed food-cost model", description: "Menu, recipe, purchase and waste data organised into a practical food-cost and margin view." },
        { id: "catch-up-books", title: "Catch-up bookkeeping", description: "Historical sales, purchases and cash records brought up to date before recurring delivery." },
        { id: "loan-readiness", title: "Equipment or working-capital file", description: "Cash-flow, margin and repayment evidence prepared for lender assessment." },
      ],
      reviewTriggers: ["More than one outlet", "Missing daily sales or settlement records", "Large cash variances", "Historical bookkeeping backlog", "A current tax, labour or authority matter"],
      boundaries: ["No food-safety or operating-licence conclusion", "No physical stock count unless selected", "No filing without taxpayer approval", "No lender or authority approval promise"],
      authoritySources: [
        { label: "Tax administration", href: "https://www.rra.gov.rw/en/domestic-tax-services", description: "EBM, VAT, WHT, payroll and filing routes are checked against the current official requirements." },
        { label: "Business registrar", href: "https://org.rdb.rw/business-registration/", description: "Entity and registration evidence is checked through the official business-registration route." },
      ],
      scopeLabels: { workload: "Monthly finance entries", entry: "Up to 120", growth: "121–250", complex: "More than 250" },
    },
  ],
  mt: [
    {
      id: "mt-restaurant-finance-desk",
      version,
      jurisdiction: "mt",
      slug: "restaurants-and-cafes",
      sectorLabel: "Restaurants",
      title: "Restaurant Finance, VAT & Payroll Desk",
      heroTitle: "Control daily takings, food cost, payroll and cash in one monthly cycle.",
      summary: "A recurring finance package for independent restaurants and cafés that connects POS and delivery-platform sales to VAT, payroll, supplier and margin controls.",
      fitStatement: "Designed for one owner-managed outlet with usable POS, purchase, bank and payroll records.",
      setupFrom: 180,
      monthlyFrom: 150,
      monthlyUnit: "month",
      accent: "orange",
      image: "/sector-mt-restaurants.webp",
      imageAlt: "Restaurant owners reviewing sales and supplier records before opening",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "monthly-payroll", "fss-filings"],
      included: [
        { title: "Daily sales and settlement control", description: "POS, cash, card and delivery-platform settlements reconciled to bank records." },
        { title: "VAT and payroll workpacks", description: "VAT, fiscal-receipt, payroll, FSS and SSC schedules prepared from reconciled records." },
        { title: "Food cost and supplier control", description: "Purchases, suppliers, food cost and gross-margin exceptions reviewed monthly." },
        { title: "Management and administration", description: "Cash-flow, year-end and company-record priorities maintained in one calendar." },
      ],
      limits: [{ label: "Outlet", value: "1 restaurant or café" }, { label: "Finance volume", value: "Up to 120 monthly entries" }, { label: "Sales records", value: "1 usable POS source" }, { label: "Payroll", value: "Up to 8 employees" }],
      evidence: ["VAT and taxpayer details", "POS and fiscal-receipt records", "Bank, card and delivery-platform statements", "Purchases and supplier balances", "Payroll, FSS and SSC records"],
      addOns: [{ id: "multi-outlet", title: "Multi-outlet reporting", description: "Outlet-level sales, cost, cash and payroll reporting added after systems review." }, { id: "food-cost", title: "Menu and food-cost model", description: "Menu, recipe, purchasing and waste records converted into a margin model." }, { id: "catch-up-books", title: "Catch-up bookkeeping", description: "Historical records brought up to date before recurring delivery." }],
      reviewTriggers: ["More than one outlet", "Missing daily sales or settlement records", "Large cash variances", "Historical bookkeeping backlog"],
      boundaries: ["No food-safety or operating-licence conclusion", "No physical stock count unless selected", "No filing without taxpayer approval"],
      authoritySources: [{ label: "Tax administration", href: "https://mtca.gov.mt/", description: "VAT, fiscal-receipt, employer and tax routes are confirmed against current official requirements." }],
      scopeLabels: { workload: "Monthly finance entries", entry: "Up to 120", growth: "121–250", complex: "More than 250" },
    },
    {
      id: "mt-self-employed-finance-desk",
      version,
      jurisdiction: "mt",
      slug: "self-employed",
      sectorLabel: "Self-employed",
      title: "Self-Employed Finance & Tax Desk",
      heroTitle: "Keep income, expenses, VAT and tax reserves under control.",
      summary: "A lean monthly finance package for consultants, freelancers and independent professionals who need clear records, tax workpacks and a practical cash view.",
      fitStatement: "Designed for one individual trade or professional activity with clean bank and invoicing records.",
      setupFrom: 100,
      monthlyFrom: 120,
      monthlyUnit: "month",
      accent: "cobalt",
      image: "/fst-consultation.webp",
      imageAlt: "An independent professional reviewing business records during a consultation",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return"],
      included: [
        { title: "Income and expense records", description: "Invoices, costs and bank activity reconciled to a usable monthly ledger." },
        { title: "VAT and tax workpacks", description: "Applicable VAT and income-tax schedules prepared from the records for approval." },
        { title: "Cash and tax-reserve view", description: "Profit, expected tax and short-term cash commitments made visible." },
        { title: "Year-end and registration calendar", description: "Closing schedules and administrative deadlines kept in one file." },
      ],
      limits: [{ label: "Activity", value: "1 individual trade or profession" }, { label: "Finance volume", value: "Up to 60 monthly entries" }, { label: "Banking", value: "Up to 2 accounts" }, { label: "Payroll", value: "No employees in entry scope" }],
      evidence: ["Taxpayer and VAT registration details", "Sales invoices", "Expense evidence", "Bank and payment statements", "Prior returns or opening balances where applicable"],
      addOns: [{ id: "vat-route", title: "VAT route review", description: "Registration route and evidence prepared for the current facts." }, { id: "year-end", title: "Year-end tax file", description: "Closing schedules and evidence prepared for the annual tax route." }, { id: "first-employee", title: "First-employee setup", description: "Payroll, FSS and SSC workpacks added when the business hires." }],
      reviewTriggers: ["Employees or subcontractor payroll", "Cross-border services", "Incomplete invoices or expense evidence", "Historical backlog"],
      boundaries: ["No personal financial-planning advice", "No legal or professional-practice conclusion", "No filing without taxpayer approval"],
      authoritySources: [{ label: "Tax administration", href: "https://mtca.gov.mt/", description: "Self-employed, VAT and tax routes are checked against current official requirements." }],
      scopeLabels: { workload: "Monthly finance entries", entry: "Up to 60", growth: "61–150", complex: "More than 150" },
    },
    {
      id: "mt-retail-shop-finance-desk",
      version,
      jurisdiction: "mt",
      slug: "retail-shops",
      sectorLabel: "Shops",
      title: "Retail Finance, VAT & Stock Desk",
      heroTitle: "Connect POS takings, suppliers, stock and VAT to one reliable ledger.",
      summary: "A recurring package for independent shops that joins retail bookkeeping, VAT, payroll, supplier balances, stock margin and company administration.",
      fitStatement: "Designed for one retail outlet with usable POS, purchase, bank and stock records.",
      setupFrom: 140,
      monthlyFrom: 135,
      monthlyUnit: "month",
      accent: "blue",
      image: "/sector-mt-hardware.webp",
      imageAlt: "Independent shop owners reviewing product sales and inventory records",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "monthly-payroll", "fss-filings"],
      included: [
        { title: "Retail books and settlements", description: "POS, bank, card, cash and supplier records reconciled monthly." },
        { title: "VAT and payroll workpacks", description: "VAT, fiscal-receipt, payroll, FSS and SSC schedules prepared for approval." },
        { title: "Stock and margin reporting", description: "Purchases, stock movement, slow stock and gross margin reviewed by category." },
        { title: "Audit and administration file", description: "Year-end schedules and company deadlines maintained from the records." },
      ],
      limits: [{ label: "Outlet", value: "1 retail location" }, { label: "Finance volume", value: "Up to 100 monthly entries" }, { label: "Stock master", value: "Up to 500 active SKUs" }, { label: "Payroll", value: "Up to 5 employees" }],
      evidence: ["VAT and taxpayer details", "POS and fiscal-receipt export", "Bank and card statements", "Purchases and supplier records", "Stock export", "Payroll and FSS records"],
      addOns: [{ id: "multi-outlet", title: "Multi-outlet reporting", description: "Outlet-level sales, cash, stock and margin controls added after review." }, { id: "physical-stock", title: "Physical stock count", description: "Count plan, variance analysis and approved adjustment file." }, { id: "cross-border", title: "Cross-border workpack", description: "Applicable Article 12, VIES, Intrastat or EORI evidence added after review." }],
      reviewTriggers: ["More than one outlet", "More than 500 active SKUs", "Importer or intra-EU activity", "Unreliable POS or stock records"],
      boundaries: ["No product-certification conclusion", "No customs declaration in the recurring package", "No physical count unless selected"],
      authoritySources: [{ label: "Tax administration", href: "https://mtca.gov.mt/", description: "VAT, fiscal-receipt, payroll and cross-border routes are checked against current requirements." }],
      scopeLabels: { workload: "Active retail SKUs", entry: "Up to 500", growth: "501–1,000", complex: "More than 1,000" },
    },
    {
      id: "mt-csp-firm-finance-desk",
      version,
      jurisdiction: "mt",
      slug: "csp-firms",
      sectorLabel: "CSPs",
      title: "CSP Accounting, Tax & Compliance Outsourcing",
      heroTitle: "Add controlled production capacity behind every client engagement.",
      summary: "A per-client outsourcing package that gives a CSP scalable production capacity for accounting, tax workpacks, company compliance and regulatory evidence while the CSP retains the client relationship, review and approval.",
      fitStatement: "Designed for a CSP outsourcing repeatable production work for one underlying client with a defined scope, usable records and an internal reviewer.",
      setupFrom: 250,
      monthlyFrom: 200,
      monthlyUnit: "client / month",
      accent: "violet",
      image: "/fst-corporate.webp",
      imageAlt: "A professional services team organising client files and administrative records",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "corporate-tax-return", "annual-return"],
      included: [
        { title: "Client accounting production", description: "Bookkeeping, bank reconciliation and ledger schedules prepared for one named underlying client." },
        { title: "Client tax workpacks", description: "VAT, corporate-tax, payroll, FSS and SSC schedules prepared from reconciled client records." },
        { title: "Management and year-end reporting", description: "Management accounts, cash-flow schedules and an audit-ready year-end file prepared for CSP review." },
        { title: "Company compliance schedules", description: "Annual-return, beneficial-ownership and company-record tasks prepared for authorised review and filing." },
        { title: "Regulatory evidence administration", description: "KYC, AML/CFT and compliance evidence organised without replacing the CSP's regulated judgement or responsibility." },
      ],
      limits: [{ label: "Client scope", value: "1 underlying client entity" }, { label: "Finance volume", value: "Up to 100 monthly entries" }, { label: "Tax profile", value: "1 VAT and income-tax profile" }, { label: "Payroll", value: "Up to 10 employees" }],
      evidence: ["CSP-approved client instruction and scope", "Client registration and tax profile", "Bank, sales, purchase and ledger records", "Payroll, FSS and SSC records", "Prior returns and opening balances", "Company records and compliance calendar"],
      addOns: [{ id: "client-onboarding", title: "Client onboarding and opening balances", description: "Opening records, registrations, prior filings and gaps converted into a controlled start file." }, { id: "portfolio-batch", title: "Portfolio delivery batch", description: "A repeatable intake, production and review workflow priced for multiple underlying clients." }, { id: "year-end", title: "Year-end audit file", description: "Closing balances, tax schedules and supporting evidence prepared for the client auditor." }],
      reviewTriggers: ["Client-money or fiduciary balances", "Multi-jurisdiction or group structure", "Missing or unreliable records", "Overdue filings, investigations or a current supervisory matter"],
      boundaries: ["The CSP retains the client relationship, instruction, review, approval and regulatory responsibility", "No independent engagement with the underlying client unless separately accepted", "No MLRO, legal or regulatory conclusion", "No authority filing without CSP and client approval and the required authorisation"],
      authoritySources: [{ label: "Company-service-provider supervision", href: "https://www.mfsa.mt/our-work/company-service-providers/", description: "The authorised CSP remains responsible for its regulated services, governance and supervisory obligations." }, { label: "Financial intelligence authority", href: "https://fiaumalta.org/", description: "Outsourced evidence preparation does not transfer the subject person's AML/CFT responsibility." }, { label: "Business registry", href: "https://www.mbr.mt/website-pages/annual-filings", description: "Annual-return, beneficial-ownership and company-record schedules follow current filing requirements and remain subject to authorised approval." }],
      scopeLabels: { workload: "Underlying client entities", entry: "1 client", growth: "2–10 clients", complex: "Portfolio batch" },
    },
    {
      id: "mt-construction-finance-desk",
      version,
      jurisdiction: "mt",
      slug: "construction-contractors",
      sectorLabel: "Construction contractors",
      title: "Construction Finance, Tender & Payroll Desk",
      heroTitle: "See project cost, WIP, tender commitments and cash before the next decision.",
      summary: "A project-led package for small contractors that joins project accounting, VAT, payroll, subcontractors, job cost, tender evidence and company administration.",
      fitStatement: "Designed for one contractor with up to two active projects, clean remote records and no technical certification in scope.",
      setupFrom: 220,
      monthlyFrom: 350,
      monthlyUnit: "month",
      accent: "teal",
      image: "/sector-mt-engineering.webp",
      imageAlt: "Construction professionals reviewing plans, tender costs and project records",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "monthly-payroll", "fss-filings"],
      included: [
        { title: "Project-coded accounting", description: "Bank, VAT, payroll, supplier and subcontractor records coded by project." },
        { title: "Job cost, WIP and cash", description: "Costs, commitments, progress, WIP, retention and cash forecast reported monthly." },
        { title: "Tender and bid finance", description: "Eligibility, financial schedules, costing and bid evidence prepared for approval." },
        { title: "Audit and company administration", description: "Year-end schedules, contractor evidence and company deadlines maintained." },
      ],
      limits: [{ label: "Entity", value: "1 operating entity" }, { label: "Projects", value: "Up to 2 active projects" }, { label: "Finance volume", value: "Up to 90 monthly entries" }, { label: "Payroll", value: "Up to 8 employees" }],
      evidence: ["Entity and contractor records", "Contracts, BOQs and tender files", "Bank and VAT records", "Payroll, FSS and subcontractor records", "Certificates, variations and retention schedules"],
      addOns: [{ id: "tender-pack", title: "Tender submission pack", description: "Eligibility, declarations, costing and bid schedules prepared for approval." }, { id: "contractor-licence", title: "Contractor evidence readiness", description: "Applicable activity and licence evidence organised for the responsible route." }, { id: "project-finance", title: "Project-finance file", description: "Cash flow, funding gap and repayment evidence prepared for lender assessment." }],
      reviewTriggers: ["More than two active projects", "Joint venture delivery", "Site verification or valuation", "Disputed claims or retentions", "Urgent tender or licence deadline"],
      boundaries: ["No design, valuation or technical certification", "No statutory, permit or licence submission", "No legal opinion", "No tender or lender approval promise"],
      authoritySources: [{ label: "Construction-industry licensing", href: "https://bca.org.mt/wp-content/uploads/2025/01/SL-623.09-Construction-Industry-Licensing-Regulations.pdf", description: "Applicable contractor activity and licence routes are checked before acceptance." }],
      scopeLabels: { workload: "Active projects", entry: "Up to 2", growth: "3–5", complex: "More than 5" },
    },
    {
      id: "mt-pharmacy-control-desk",
      version,
      jurisdiction: "mt",
      slug: "pharmacies",
      sectorLabel: "Pharmacies",
      title: "Pharmacy Finance & VAT",
      heroTitle: "Keep bookkeeping, VAT and payroll in one controlled finance cycle.",
      summary: "A recurring finance package for a community pharmacy covering bookkeeping, bank and POS reconciliation, VAT and fiscal-receipt controls, payroll, FSS and a monthly finance summary.",
      fitStatement: "Designed for one pharmacy business with clean digital finance records and usable POS, purchase, bank and payroll information.",
      setupFrom: 180,
      monthlyFrom: 300,
      monthlyUnit: "month",
      accent: "cobalt",
      image: "/sector-mt-pharmacy.webp",
      imageAlt: "A community pharmacist reviewing business and finance records",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "monthly-payroll", "fss-filings"],
      included: [
        { title: "Monthly bookkeeping", description: "Sales, purchases, expenses and approved journals recorded from the pharmacy's finance evidence." },
        { title: "Bank, card and POS reconciliation", description: "Bank, card and POS totals reconciled with timing differences and finance exceptions made visible." },
        { title: "VAT and fiscal-receipt controls", description: "VAT and fiscal-receipt workpacks prepared from the available sales, purchase and ledger records for approval." },
        { title: "Payroll, FSS and finance summary", description: "Payroll, FSS and SSC schedules supported by a concise monthly finance and margin summary." },
      ],
      limits: [
        { label: "Business", value: "1 legal entity" },
        { label: "Finance volume", value: "Up to 100 monthly entries" },
        { label: "Sales records", value: "1 usable POS or sales source" },
        { label: "Payroll", value: "Up to 5 employees" },
      ],
      evidence: ["VAT and taxpayer registration details", "POS, fiscal-receipt and purchase records", "Bank and card statements", "Payroll, FSS and SSC records", "Supplier balances and finance ledger", "Prior returns or opening balances where applicable"],
      addOns: [
        { id: "catch-up-books", title: "Catch-up bookkeeping", description: "Historical finance records brought up to date before the recurring monthly cycle starts." },
        { id: "management-accounts", title: "Expanded management accounts", description: "A more detailed monthly profit, balance-sheet and cash-flow pack prepared from the reconciled books." },
        { id: "year-end-file", title: "Year-end accounts workpack", description: "Closing schedules, reconciliations and supporting evidence prepared for the year-end reporting route." },
        { id: "cash-flow", title: "Cash-flow forecast", description: "A short-term cash view prepared from current balances, expected receipts and approved payment assumptions." },
        { id: "tax-query", title: "Tax authority query support", description: "The relevant finance schedules and response evidence prepared for review before submission." },
      ],
      reviewTriggers: ["More than one legal entity", "More than 100 monthly finance entries", "Incomplete POS, bank or purchase records", "Historical bookkeeping backlog", "A current VAT, payroll, tax or year-end deadline"],
      boundaries: ["No medicine-stock, batch or expiry control", "No pharmacy licence, variation or inspection support", "No dispensing or pharmaceutical decision", "No regulator submission or operational compliance service"],
      authoritySources: [
        { label: "Tax administration", href: "https://mtca.gov.mt/", description: "VAT, employer and tax routes are confirmed against the current official requirements before submission." },
      ],
      scopeLabels: { workload: "Monthly finance entries", entry: "Up to 100", growth: "101–250", complex: "More than 250" },
    },
    {
      id: "mt-hardware-stock-desk",
      version,
      jurisdiction: "mt",
      slug: "hardware-shops",
      sectorLabel: "Hardware shops",
      title: "Hardware Stock, VAT & Product Evidence Desk",
      heroTitle: "Connect stock economics to VAT, supplier and product evidence.",
      summary: "A recurring package for hardware retailers that connects books, POS, VAT and FSS workpacks to a usable SKU master, stock margin and role-specific product evidence.",
      fitStatement: "Designed for one branch with clean digital records, a manageable SKU master and no customs declaration or physical count in the recurring scope.",
      setupFrom: 250,
      monthlyFrom: 450,
      monthlyUnit: "month",
      accent: "orange",
      image: "/sector-mt-hardware.webp",
      imageAlt: "A hardware merchant checking stock in an organised shop",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "monthly-payroll", "fss-filings"],
      included: [
        { title: "Books, POS and VAT control", description: "Bank, card, POS, purchases, suppliers, VAT and payroll/FSS schedules reconciled to the records." },
        { title: "Product master", description: "SKU, unit of measure, brand, specification, supplier and product-family fields made consistent." },
        { title: "Stock, shrinkage and margin", description: "Movement, slow stock, variance and gross margin reviewed by product family." },
        { title: "Product and cross-border triggers", description: "Economic-operator role, applicable supplier/conformity evidence and Article 12, VIES, Intrastat or EORI triggers recorded." },
      ],
      limits: [
        { label: "Branch", value: "1 retail location" },
        { label: "Finance volume", value: "Up to 100 monthly entries" },
        { label: "Stock master", value: "Up to 750 active SKUs" },
        { label: "Payroll", value: "Up to 5 employees" },
      ],
      evidence: ["VAT and taxpayer registration details", "POS and fiscal-receipt records", "Purchase and supplier records", "Bank and card statements", "Current SKU and stock export", "Import or intra-EU records where applicable"],
      addOns: [
        { id: "cross-border", title: "EORI, VIES or Intrastat readiness", description: "The relevant cross-border evidence and filing workpack added after role and threshold review." },
        { id: "product-evidence", title: "Product-evidence remediation", description: "Applicable marking, declaration, instruction and supplier evidence indexed; gaps routed for competent action." },
        { id: "physical-stock", title: "Physical stock count", description: "Count plan, controlled sheets, variance analysis and approved adjustments." },
        { id: "multi-branch", title: "Multi-branch reporting", description: "Branch-level sales, stock and margin controls added after a system and volume review." },
        { id: "finance-readiness", title: "Working-capital finance file", description: "Stock quality, margin, cash-flow and repayment evidence prepared for lender assessment." },
      ],
      reviewTriggers: ["More than one branch", "More than 750 active SKUs", "Importer or private-label activity", "Incomplete product or supplier evidence", "Frequent intra-EU or third-country movements"],
      boundaries: ["No blanket CE or Declaration of Performance conclusion", "No product certification", "No customs declaration in the recurring package", "No physical count unless selected"],
      authoritySources: [
        { label: "Construction Products Regulation", href: "https://eur-lex.europa.eu/eli/reg/2024/3110/oj", description: "Applicable distributor, importer and product obligations are determined by item and role." },
        { label: "Importer and distributor guidance", href: "https://single-market-economy.ec.europa.eu/single-market/goods/ce-marking/importers-and-distributors_en", description: "Economic-operator duties are mapped before any conformity claim is made." },
        { label: "Tax and customs routes", href: "https://mtca.gov.mt/customs/business/economic-operators/economic-operators-registration-identification", description: "EORI and customs triggers are kept separate from ordinary recurring finance work." },
      ],
      scopeLabels: { workload: "Active hardware SKUs", entry: "Up to 750", growth: "751–1,500", complex: "More than 1,500" },
    },
    {
      id: "mt-spare-parts-stock-desk",
      version,
      jurisdiction: "mt",
      slug: "spare-parts",
      sectorLabel: "Spare-parts shops",
      title: "Spare Parts Stock & Cross-Border Desk",
      heroTitle: "Make compatibility, landed cost and obsolete stock visible.",
      summary: "A recurring package for spare-parts retailers that connects finance, VAT and FSS workpacks to part compatibility, import batches, warranty returns and cross-border triggers.",
      fitStatement: "Designed for one branch with a maintainable part-number master and no physical count or customs declaration in the recurring scope.",
      setupFrom: 300,
      monthlyFrom: 500,
      monthlyUnit: "month",
      accent: "blue",
      image: "/sector-mt-spare-parts.webp",
      imageAlt: "A spare-parts merchant checking part numbers and supplier records",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "monthly-payroll", "fss-filings"],
      included: [
        { title: "Finance, VAT and FSS workpacks", description: "Books, bank, card, POS, purchases, VAT, payroll and FSS schedules tied back to the records." },
        { title: "Part and compatibility master", description: "Part number, vehicle compatibility, OEM or aftermarket status and supplier identity organised consistently." },
        { title: "Landed cost by purchase batch", description: "Supplier, freight, duty and related costs allocated from available import or intra-EU evidence." },
        { title: "Returns and obsolescence", description: "Warranty, returns, core exchange, slow stock and obsolete inventory made visible." },
      ],
      limits: [
        { label: "Branch", value: "1 retail location" },
        { label: "Finance volume", value: "Up to 100 monthly entries" },
        { label: "Parts master", value: "Up to 1,000 active part numbers" },
        { label: "Payroll", value: "Up to 5 employees" },
      ],
      evidence: ["VAT and taxpayer registration details", "POS and purchase records", "Supplier and import documents", "Bank and card statements", "Part-number and stock export", "Warranty and return records"],
      addOns: [
        { id: "cross-border", title: "EORI, VIES or Intrastat readiness", description: "The applicable cross-border evidence and filing workpack added after role and threshold review." },
        { id: "item-rule-evidence", title: "Item-specific evidence", description: "Battery, tyre, waste, braking or other safety/type-approval triggers mapped to the item." },
        { id: "physical-stock", title: "Physical stock count", description: "Controlled count and variance file for high-value and slow-moving parts." },
        { id: "garage-credit", title: "Garage and trade credit control", description: "Customer limits, ageing, disputes and collection actions organised." },
        { id: "finance-readiness", title: "Inventory-finance file", description: "Stock quality, margin, turnover and cash-flow evidence prepared for lender assessment." },
      ],
      reviewTriggers: ["More than one branch", "More than 1,000 part numbers", "Frequent imports or intra-EU acquisitions", "Safety-critical or regulated components", "Unreliable compatibility or landed-cost data"],
      boundaries: ["No universal component-approval conclusion", "No customs declaration in the recurring package", "No product certification", "No physical count unless selected"],
      authoritySources: [
        { label: "Vehicle general-safety rules", href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02019R2144-20260107", description: "Safety and approval triggers are reviewed by item, not assumed across the stock master." },
        { label: "Vehicle type-approval framework", href: "https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32018R0858", description: "Component and economic-operator responsibilities remain product-specific." },
        { label: "Tax and customs routes", href: "https://mtca.gov.mt/customs/business/economic-operators/economic-operators-registration-identification", description: "EORI and customs triggers are kept separate from recurring finance work." },
      ],
      scopeLabels: { workload: "Active part numbers", entry: "Up to 1,000", growth: "1,001–2,000", complex: "More than 2,000" },
    },
    {
      id: "mt-engineering-project-desk",
      version,
      jurisdiction: "mt",
      slug: "engineering-practices",
      sectorLabel: "Engineering and construction practices",
      title: "Engineering Practice & Project Finance Desk",
      heroTitle: "Connect project cost, WIP, certificates and retention to the books.",
      summary: "A project-led finance package for engineering and construction practices that need VAT, FSS and bookkeeping connected to contracts, BOQs, variations, certificates and collections.",
      fitStatement: "Designed for one entity with up to two active projects, clean remote records and no site verification in the recurring scope.",
      setupFrom: 400,
      monthlyFrom: 650,
      monthlyUnit: "month",
      accent: "violet",
      image: "/sector-mt-engineering.webp",
      imageAlt: "Engineering professionals reviewing project plans and cost records",
      atomicServiceIds: ["monthly-bookkeeping", "management-accounts", "vat-return", "monthly-payroll", "fss-filings"],
      included: [
        { title: "Project-connected finance", description: "Bank, VAT, payroll/FSS, supplier and subcontractor records coded to the relevant project and approved cost structure." },
        { title: "Contract and BOQ register", description: "Engagement, scope, value, milestones, BOQ or fee basis and responsibility recorded for each active project." },
        { title: "Job cost, WIP and forecast", description: "Actual cost, commitments, progress and forecast-to-complete reviewed against the project baseline." },
        { title: "Certificates, retention and collection", description: "Advances, variations, certificates, retentions, invoices and collections tracked together." },
      ],
      limits: [
        { label: "Entity", value: "1 operating entity" },
        { label: "Projects", value: "Up to 2 active projects" },
        { label: "Finance volume", value: "Up to 75 monthly entries" },
        { label: "Payroll", value: "Up to 5 employees" },
      ],
      evidence: ["Entity and professional or contractor evidence", "Signed contracts and BOQs or scopes", "Bank and VAT records", "Payroll, FSS and subcontractor records", "Certificates, variations and retention schedules", "Insurance and tender evidence where applicable"],
      addOns: [
        { id: "professional-evidence", title: "Warrant or practice evidence", description: "The applicable professional route and supporting evidence indexed without replacing the competent body's decision." },
        { id: "contractor-licence", title: "Contractor-licence readiness", description: "Activity, evidence and gaps organised for the applicable construction-industry licence route." },
        { id: "tender-pack", title: "Tender and bid pack", description: "Eligibility, declarations, financial schedules and bid model prepared for approval." },
        { id: "contract-review", title: "Contract review support", description: "Commercial, payment and evidence issues prepared for the competent legal and technical route." },
        { id: "finance-readiness", title: "Project-finance file", description: "Project cash flow, funding gap, repayment and supporting evidence prepared for lender assessment." },
      ],
      reviewTriggers: ["More than two active projects", "Joint venture or consortium delivery", "Site verification, valuation or technical certification", "Disputed variations, claims or retentions", "Warrant, contractor-licence or tender deadline"],
      boundaries: ["No reserved design or professional certification", "No statutory, permit or licence submission", "No valuation or legal opinion", "No lender, tender or authority approval promise"],
      authoritySources: [
        { label: "Engineering warrant", href: "https://www.servizz.gov.mt/en/Services/web-00747", description: "The warranted-professional route is confirmed before reserved work is accepted." },
        { label: "Perit warrant route", href: "https://kamratalperiti.org/profession/how-to-obtain-the-warrant-of-perit/", description: "Architect and civil-engineer practice evidence is kept distinct from ordinary finance support." },
        { label: "Construction-industry licensing", href: "https://bca.org.mt/wp-content/uploads/2025/01/SL-623.09-Construction-Industry-Licensing-Regulations.pdf", description: "Demolition, excavation, piling and construction activities are checked against the current licence route." },
      ],
      scopeLabels: { workload: "Active projects", entry: "Up to 2", growth: "3–5", complex: "More than 5" },
    },
  ],
};

type SectorCatalogueEntryDefinition = Omit<SectorCatalogueEntry, "atomicServiceIds">;

const catalogueEntriesByPackageId: Record<string, SectorCatalogueEntryDefinition[]> = {
  "rw-pharmacy-control-desk": [
    {
      id: "finance-routine",
      title: "Pharmacy Finance, Tax & Administration",
      description: "A monthly package joining pharmacy bookkeeping, statutory workpacks, management reporting, audit-ready records and company administration.",
      bestFor: "A pharmacy that needs one dependable finance and administrative cycle.",
      from: 25_000,
      billingUnit: "month",
      includes: ["Monthly bookkeeping and bank/mobile-money reconciliation", "EBM, VAT, WHT, PAYE and RSSB workpacks", "Management accounts, cash-flow and margin reporting", "Audit-ready schedules and year-end accounts file", "RDB company records and administrative compliance calendar"],
    },
    {
      id: "sector-control",
      title: "Medicine Stock & Evidence",
      description: "The pharmacy-specific stock, expiry and premises-evidence control layer without the finance routine.",
      bestFor: "A pharmacy with accounting support but weak medicine-stock and inspection evidence.",
      from: 20_000,
      billingUnit: "month",
      includes: ["Medicine and retail SKU master", "Batch and expiry register", "Near-expiry and slow-stock exceptions", "Returns, recall and disposal register", "Licence and inspection evidence calendar"],
    },
    {
      id: "complete-desk",
      title: "Complete Pharmacy Desk",
      description: "One controlled monthly cycle joining finance, tax, payroll, medicine stock and premises evidence.",
      bestFor: "An owner-managed pharmacy that wants one coordinated operating package.",
      from: 45_000,
      billingUnit: "month",
      featured: true,
      includes: ["Everything in Pharmacy Finance & Tax", "Everything in Medicine Stock & Evidence", "Supplier and stock exception review", "Monthly management and margin view", "One coordinated evidence-gap register"],
    },
  ],
  "rw-shop-finance-desk": [
    {
      id: "finance-routine",
      title: "Shop Finance, Tax & Stock",
      description: "A monthly package for hardware, spare-parts and other stock-led shops, joining retail accounting, statutory workpacks, inventory reporting, audit readiness and administration.",
      bestFor: "A shop that needs its finance, supplier, stock and compliance records managed together.",
      from: 20_000,
      billingUnit: "month",
      includes: ["Retail bookkeeping and bank/mobile-money reconciliation", "EBM, VAT, WHT, PAYE and RSSB workpacks", "Supplier, stock movement, landed-cost and gross-margin reporting", "Audit-ready controls and year-end accounts file", "RDB company records and administrative compliance calendar"],
    },
    {
      id: "sector-control",
      title: "Stock, Margin & Product Control",
      description: "The sector-specific inventory layer for product master quality, stock movement and margin visibility.",
      bestFor: "A shop whose accounting is covered but whose SKU and stock information is unreliable.",
      from: 15_000,
      billingUnit: "month",
      includes: ["SKU and unit-of-measure master", "Brand, specification and supplier fields", "Stock movement and slow-stock review", "Shrinkage and variance register", "Product-family gross-margin view"],
    },
    {
      id: "complete-desk",
      title: "Complete Hardware Desk",
      description: "A joined retail-finance and inventory-control cycle built for a hardware merchant.",
      bestFor: "An owner-managed shop that needs both statutory routine and usable stock economics.",
      from: 35_000,
      billingUnit: "month",
      featured: true,
      includes: ["Everything in Hardware Finance & Tax", "Everything in Stock, Margin & Product Control", "Supplier evidence index", "Cash and margin exception review", "One monthly control summary"],
    },
  ],
  "rw-spare-parts-stock-desk": [
    {
      id: "finance-routine",
      title: "Spare-Parts Finance, Tax & Administration",
      description: "A monthly package joining parts-retail accounting, statutory workpacks, landed-cost reporting, audit readiness and company administration.",
      bestFor: "A parts retailer that needs finance, import-cost and compliance records managed together.",
      from: 20_000,
      billingUnit: "month",
      includes: ["Parts-retail bookkeeping and bank/mobile-money reconciliation", "EBM, VAT, WHT, PAYE and RSSB schedules", "Landed-cost, supplier and inventory-finance reporting", "Audit-ready controls and year-end accounts file", "RDB company records and administrative compliance calendar"],
    },
    {
      id: "sector-control",
      title: "Parts, Landed Cost & Returns",
      description: "The parts-specific stock layer for compatibility, import cost, warranty and obsolescence.",
      bestFor: "A retailer whose finance is covered but whose part and import records need control.",
      from: 20_000,
      billingUnit: "month",
      includes: ["Part-number and compatibility master", "OEM and aftermarket status", "Import-batch landed-cost schedule", "Warranty, return and core-exchange register", "Slow and obsolete stock view"],
    },
    {
      id: "complete-desk",
      title: "Complete Spare-Parts Desk",
      description: "One monthly cycle connecting finance and tax to the actual economics of a parts inventory.",
      bestFor: "A parts merchant that needs books, import cost and stock quality managed together.",
      from: 40_000,
      billingUnit: "month",
      featured: true,
      includes: ["Everything in Spare-Parts Finance & Tax", "Everything in Parts, Landed Cost & Returns", "Supplier and import evidence register", "Stock-turn and margin exceptions", "One monthly control summary"],
    },
  ],
  "rw-engineering-project-desk": [
    {
      id: "finance-routine",
      title: "Construction Finance, Tender & Administration",
      description: "A monthly package joining project accounting, statutory workpacks, commercial reporting, tender preparation and company administration.",
      bestFor: "An engineering or construction practice that needs finance and bid evidence controlled together.",
      from: 25_000,
      billingUnit: "month",
      includes: ["Project-coded accounting and bank/mobile-money reconciliation", "VAT, WHT, PAYE, RSSB and subcontractor schedules", "BOQ/job-cost, WIP, cash-flow and receivables reporting", "Tender preparation, bid finance and funding-readiness workpack", "Audit-ready year-end and RDB company-administration file"],
    },
    {
      id: "sector-control",
      title: "Project Cost & Contract Control",
      description: "The project-specific control layer for BOQs, cost, WIP, variations, certificates and retention.",
      bestFor: "A practice with accounting support but weak project-commercial information.",
      from: 25_000,
      billingUnit: "month",
      includes: ["Contract, scope and BOQ register", "Job cost and commitment schedule", "Work-in-progress and forecast-to-complete", "Variation and certificate tracker", "Retention, billing and collection schedule"],
    },
    {
      id: "complete-desk",
      title: "Complete Project Finance Desk",
      description: "One coordinated finance and project-control cycle for a small technical practice.",
      bestFor: "A practice that needs project delivery and cash decisions in the same monthly view.",
      from: 50_000,
      billingUnit: "month",
      featured: true,
      includes: ["Everything in Practice Finance & Payroll", "Everything in Project Cost & Contract Control", "Project cash-runway view", "Receivable and retention priorities", "One management decision pack"],
    },
  ],
  "rw-hospitality-finance-desk": [
    {
      id: "finance-routine",
      title: "Restaurant Finance, Tax & Payroll",
      description: "One monthly package for sales settlements, EBM and tax, payroll, food-cost reporting, audit readiness and business administration.",
      bestFor: "A restaurant, café or small hospitality outlet that needs one dependable finance cycle.",
      from: 20_000,
      billingUnit: "month",
      includes: [
        "POS, cash, card and mobile-money bookkeeping and reconciliation",
        "EBM, VAT, WHT, PAYE and RSSB workpacks",
        "Supplier, food-cost, gross-margin and cash-flow reporting",
        "Audit-ready schedules and year-end accounts file",
        "RDB company records and administrative compliance calendar",
      ],
    },
  ],
  "mt-restaurant-finance-desk": [
    {
      id: "finance-routine",
      title: "Restaurant Finance, VAT & Payroll",
      description: "A monthly package for an independent restaurant or café, built around daily takings, supplier costs, payroll and cash.",
      bestFor: "One owner-managed food-service outlet with usable POS and bank records.",
      from: 150,
      setupFrom: 180,
      billingUnit: "month",
      includes: [
        "POS, cash, card and delivery-platform bookkeeping and reconciliation",
        "VAT, fiscal-receipt, payroll, FSS and SSC workpacks",
        "Supplier, food-cost, gross-margin and cash-flow reporting",
        "Audit-ready schedules and year-end accounts file",
        "Company records and administrative compliance calendar",
      ],
    },
  ],
  "mt-self-employed-finance-desk": [
    {
      id: "finance-routine",
      title: "Self-Employed Finance & Tax",
      description: "A lean monthly package for an independent professional's income, costs, tax position and cash decisions.",
      bestFor: "A consultant, freelancer or independent professional with one activity and clean records.",
      from: 120,
      setupFrom: 100,
      billingUnit: "month",
      includes: [
        "Income, expense and bank bookkeeping and reconciliation",
        "Applicable VAT and income-tax workpacks",
        "Profit, cash-flow and tax-reserve reporting",
        "Year-end schedules and accountant hand-off file",
        "Registration and administrative deadline calendar",
      ],
    },
  ],
  "mt-retail-shop-finance-desk": [
    {
      id: "finance-routine",
      title: "Retail Finance, VAT & Stock",
      description: "A monthly package for an independent shop's POS settlements, suppliers, stock margin, payroll and statutory cycle.",
      bestFor: "One retail outlet with usable POS, purchase, bank and stock records.",
      from: 135,
      setupFrom: 140,
      billingUnit: "month",
      includes: [
        "Retail bookkeeping and bank, card, cash and POS reconciliation",
        "VAT, fiscal-receipt, payroll, FSS and SSC workpacks",
        "Supplier, stock movement and gross-margin reporting",
        "Audit-ready controls and year-end accounts file",
        "Company records and administrative compliance calendar",
      ],
    },
  ],
  "mt-csp-firm-finance-desk": [
    {
      id: "finance-routine",
      title: "Accounting, Tax & Compliance Outsourcing",
      description: "Per-client accounting, tax and regulatory-compliance production for CSPs that need scalable delivery capacity.",
      bestFor: "A CSP outsourcing repeatable production work for one underlying client with usable records and an internal reviewer.",
      from: 200,
      setupFrom: 250,
      billingUnit: "client / month",
      includes: [
        "Client-level bookkeeping and bank reconciliation",
        "VAT, corporate-tax, payroll, FSS and SSC workpacks",
        "Management accounts, cash-flow and year-end reporting",
        "MBR annual-return, beneficial-ownership and company-record schedules",
        "Regulatory, KYC and AML/CFT evidence administration for CSP review",
      ],
    },
  ],
  "mt-construction-finance-desk": [
    {
      id: "finance-routine",
      title: "Construction Finance, Tender & Payroll",
      description: "A project-led monthly package for a small contractor's books, job cost, payroll, tenders and company administration.",
      bestFor: "A contractor with up to two active projects and usable project records.",
      from: 350,
      setupFrom: 220,
      billingUnit: "month",
      includes: [
        "Project-coded accounting and bank reconciliation",
        "VAT, payroll, FSS and subcontractor tax workpacks",
        "Job-cost, WIP, retention, receivables and cash-flow reporting",
        "Tender preparation, bid finance and audit-readiness file",
        "Contractor records and company-administration calendar",
      ],
    },
  ],
  "mt-pharmacy-control-desk": [
    {
      id: "finance-routine",
      title: "Pharmacy Finance, Tax & Administration",
      description: "A monthly package joining pharmacy bookkeeping, VAT and payroll, management reporting, audit-ready records and company administration.",
      bestFor: "A pharmacy that needs one dependable finance and administrative cycle.",
      from: 300,
      setupFrom: 180,
      billingUnit: "month",
      includes: ["Monthly bookkeeping and bank/card/POS reconciliation", "VAT, fiscal-receipt, payroll, FSS and SSC workpacks", "Management accounts, cash-flow and margin reporting", "Audit-ready schedules and year-end accounts file", "Company secretarial and administrative compliance calendar"],
    },
  ],
  "mt-hardware-stock-desk": [
    {
      id: "finance-routine",
      title: "Hardware Finance, Tax & Administration",
      description: "A monthly package joining retail accounting, statutory workpacks, inventory finance, audit readiness and company administration.",
      bestFor: "A hardware shop that needs its finance, supplier and compliance records managed together.",
      from: 250,
      setupFrom: 140,
      billingUnit: "month",
      includes: ["Retail bookkeeping and bank/card/POS reconciliation", "VAT, fiscal-receipt, payroll, FSS and SSC workpacks", "Supplier, inventory-finance and gross-margin reporting", "Audit-ready controls and year-end accounts file", "Company secretarial and administrative compliance calendar"],
    },
    {
      id: "sector-control",
      title: "Stock, Margin & Product Evidence",
      description: "The hardware-specific inventory layer for product data, stock economics and applicable supplier evidence.",
      bestFor: "A shop whose accounting is covered but whose SKU, margin or product evidence is weak.",
      from: 200,
      setupFrom: 120,
      billingUnit: "month",
      includes: ["SKU and unit-of-measure master", "Brand, specification and supplier fields", "Stock movement, slow stock and shrinkage", "Product-family gross-margin view", "Applicable product-evidence and cross-border triggers"],
    },
    {
      id: "complete-desk",
      title: "Complete Hardware Desk",
      description: "A joined finance, VAT and inventory-control cycle built for a hardware merchant.",
      bestFor: "An owner-managed merchant that needs statutory routine and stock economics together.",
      from: 450,
      setupFrom: 250,
      billingUnit: "month",
      featured: true,
      includes: ["Everything in Hardware Finance & VAT", "Everything in Stock, Margin & Product Evidence", "Supplier evidence index", "Cash and margin exception review", "One monthly control summary"],
    },
  ],
  "mt-spare-parts-stock-desk": [
    {
      id: "finance-routine",
      title: "Spare-Parts Finance, Tax & Administration",
      description: "A monthly package joining parts-retail accounting, statutory workpacks, landed-cost reporting, audit readiness and company administration.",
      bestFor: "A parts retailer that needs finance, cross-border cost and compliance records managed together.",
      from: 250,
      setupFrom: 150,
      billingUnit: "month",
      includes: ["Parts-retail bookkeeping and bank/card/POS reconciliation", "VAT, payroll and cross-border tax schedules", "Landed-cost, supplier and inventory-finance reporting", "Audit-ready controls and year-end accounts file", "Company secretarial and administrative compliance calendar"],
    },
    {
      id: "sector-control",
      title: "Parts, Landed Cost & Returns",
      description: "The parts-specific layer for compatibility, cross-border cost, warranty and obsolescence.",
      bestFor: "A retailer whose finance is covered but whose part and import records need control.",
      from: 250,
      setupFrom: 150,
      billingUnit: "month",
      includes: ["Part-number and compatibility master", "OEM and aftermarket status", "Import or intra-EU landed-cost schedule", "Warranty, return and core-exchange register", "Slow and obsolete stock view"],
    },
    {
      id: "complete-desk",
      title: "Complete Spare-Parts Desk",
      description: "One monthly cycle connecting finance and VAT to the actual economics of a parts inventory.",
      bestFor: "A parts merchant that needs books, cross-border cost and stock quality together.",
      from: 500,
      setupFrom: 300,
      billingUnit: "month",
      featured: true,
      includes: ["Everything in Spare-Parts Finance & VAT", "Everything in Parts, Landed Cost & Returns", "Supplier and cross-border evidence register", "Stock-turn and margin exceptions", "One monthly control summary"],
    },
  ],
  "mt-engineering-project-desk": [
    {
      id: "finance-routine",
      title: "Engineering Finance, Tender & Administration",
      description: "A monthly package joining project accounting, statutory workpacks, commercial reporting, tender preparation and company administration.",
      bestFor: "An engineering or construction practice that needs finance and bid evidence controlled together.",
      from: 300,
      setupFrom: 180,
      billingUnit: "month",
      includes: ["Project-coded accounting and bank reconciliation", "VAT, payroll, FSS and subcontractor tax schedules", "Job-cost, WIP, cash-flow and receivables reporting", "Tender preparation, bid finance and eligibility workpack", "Audit-ready year-end and company-administration file"],
    },
    {
      id: "sector-control",
      title: "Project Cost & Contract Control",
      description: "The project-specific layer for BOQs, cost, WIP, variations, certificates and retention.",
      bestFor: "A practice with accounting support but weak project-commercial information.",
      from: 350,
      setupFrom: 220,
      billingUnit: "month",
      includes: ["Contract, scope and BOQ register", "Job cost and commitment schedule", "Work-in-progress and forecast-to-complete", "Variation and certificate tracker", "Retention, billing and collection schedule"],
    },
    {
      id: "complete-desk",
      title: "Complete Project Finance Desk",
      description: "One coordinated finance and project-control cycle for a small technical practice.",
      bestFor: "A practice that needs project delivery and cash decisions in the same monthly view.",
      from: 650,
      setupFrom: 400,
      billingUnit: "month",
      featured: true,
      includes: ["Everything in Practice Finance, VAT & Payroll", "Everything in Project Cost & Contract Control", "Project cash-runway view", "Receivable and retention priorities", "One management decision pack"],
    },
  ],
};

const catalogueTitles: Record<SectorPackageSlug, string> = {
  pharmacies: "Pharmacy service package",
  "hardware-shops": "Hardware shop service package",
  "spare-parts": "Spare-parts shop service package",
  "engineering-practices": "Engineering & construction service package",
  "restaurants-and-hospitality": "Restaurant & hospitality service package",
  "restaurants-and-cafes": "Restaurant & café service package",
  "self-employed": "Self-employed professional service package",
  shops: "Shop service package",
  "retail-shops": "Retail shop service package",
  "csp-firms": "CSP firm service package",
  "construction-contractors": "Construction contractor service package",
};

export function getSectorPackages(jurisdiction: JurisdictionCode) {
  const activeSlugs = activePackageSlugsByJurisdiction[jurisdiction];
  const packagesBySlug = new Map(packagesByJurisdiction[jurisdiction].map((item) => [item.slug, item]));
  return activeSlugs.map((slug) => packagesBySlug.get(slug)).filter((item): item is SectorPackage => Boolean(item));
}

export function getSectorPackage(jurisdiction: JurisdictionCode, slug: string) {
  return getSectorPackages(jurisdiction).find((item) => item.slug === slug);
}

export function getSectorPackageById(jurisdiction: JurisdictionCode, id: string) {
  return getSectorPackages(jurisdiction).find((item) => item.id === id);
}

export function getSectorCatalogueTitle(item: SectorPackage) {
  return catalogueTitles[item.slug];
}

export function getSectorCatalogueEntries(item: SectorPackage): SectorCatalogueEntry[] {
  return (catalogueEntriesByPackageId[item.id] || []).slice(0, 1).map((entry) => ({
    ...entry,
    atomicServiceIds: entry.id === "sector-control" ? [] : item.atomicServiceIds,
  }));
}

export function getSectorCatalogueEntry(item: SectorPackage, entryId: string) {
  return getSectorCatalogueEntries(item).find((entry) => entry.id === entryId);
}

export function formatSectorPackagePrice(item: SectorPackage, value = item.monthlyFrom) {
  const config = jurisdictionConfig[item.jurisdiction];
  return new Intl.NumberFormat(config.currencyLocale, {
    style: "currency",
    currency: config.currency,
    currencyDisplay: config.currency === "RWF" ? "code" : "symbol",
    maximumFractionDigits: 0,
  }).format(value).replace("RWF ", "RWF ");
}

export function publicSectorPackage(item: SectorPackage) {
  const catalogueEntries = getSectorCatalogueEntries(item);
  const primaryEntry = catalogueEntries[0];
  const monthlyFrom = primaryEntry?.from ?? item.monthlyFrom;
  const setupFrom = primaryEntry?.setupFrom ?? item.setupFrom;
  return {
    id: item.id,
    version: item.version,
    jurisdiction: item.jurisdiction,
    slug: item.slug,
    sectorLabel: item.sectorLabel,
    title: primaryEntry?.title ?? item.title,
    heroTitle: item.heroTitle,
    summary: primaryEntry?.description ?? item.summary,
    fitStatement: primaryEntry?.bestFor ?? item.fitStatement,
    catalogueTitle: getSectorCatalogueTitle(item),
    catalogueEntries,
    currency: jurisdictionConfig[item.jurisdiction].currency,
    setupFrom,
    monthlyFrom,
    monthlyPriceLabel: `From ${formatSectorPackagePrice(item, monthlyFrom)} / ${item.monthlyUnit}`,
    setupPriceLabel: setupFrom ? `Setup from ${formatSectorPackagePrice(item, setupFrom)}` : undefined,
    monthlyUnit: item.monthlyUnit,
    atomicServiceIds: item.atomicServiceIds,
    included: primaryEntry
      ? primaryEntry.includes.map((title) => ({ title, description: "Included in the published industry package." }))
      : item.included,
    limits: item.limits,
    evidence: item.evidence,
    addOns: item.addOns,
    reviewTriggers: item.reviewTriggers,
    boundaries: item.boundaries,
    authoritySources: item.authoritySources,
    officialCostsExcluded: true,
    quoteStatus: "indicative_only" as const,
  };
}
