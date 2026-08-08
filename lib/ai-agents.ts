export type AiAgent = {
  slug: string;
  name: string;
  practice: string;
  role: string;
  description: string;
  introduction: string;
  image: string;
  tone: "blue" | "lilac" | "peach" | "sky" | "rose";
  responsibilities: string[];
  inputs: string[];
  workpackName: string;
  workpackOutputs: string[];
  humanBoundary: string;
};

export const aiAgents: AiAgent[] = [
  {
    slug: "patrick",
    name: "Patrick",
    practice: "Audit & Assurance",
    role: "Audit workpack specialist",
    description:
      "Planning, risk assessment, PBC, workpapers, evidence registers, completion, reporting and QC/EQR support.",
    introduction:
      "Patrick helps FST professionals organise an audit engagement from acceptance and planning through evidence, completion and reporting. His work keeps procedures, findings and review points connected to the underlying source material.",
    image: "/fst-agent-patrick.png",
    tone: "blue",
    responsibilities: [
      "Structure acceptance, planning and risk-assessment workpacks",
      "Maintain PBC requests, evidence registers and review points",
      "Prepare first-pass workpapers and completion schedules",
      "Cross-reference findings to supporting evidence",
      "Assemble reporting and quality-review packs",
    ],
    inputs: ["Engagement scope", "Trial balance and records", "Policies and controls", "Prior findings and evidence"],
    workpackName: "Audit file pack",
    workpackOutputs: ["PBC tracker", "Risk matrix", "Evidence register", "Completion memo"],
    humanBoundary:
      "Patrick does not accept engagements, determine an audit opinion, clear independence, sign reports or communicate conclusions. The responsible authorised professional retains every judgement and approval.",
  },
  {
    slug: "sofia",
    name: "Sofia",
    practice: "Accounting & Finance",
    role: "Accounting and finance operations specialist",
    description:
      "Ledgers, reconciliations, trial-balance review, close packs, management reporting and audit-readiness support.",
    introduction:
      "Sofia helps FST turn transaction records into reconciled, reviewable finance workpacks. She supports recurring close, management reporting and year-end readiness while exceptions remain visible for professional resolution.",
    image: "/fst-agent-sofia.png",
    tone: "lilac",
    responsibilities: [
      "Organise ledger and transaction-review work",
      "Prepare bank, control-account and balance-sheet reconciliations",
      "Run trial-balance and close-readiness checks",
      "Draft management-reporting and variance schedules",
      "Assemble audit-ready supporting files",
    ],
    inputs: ["General ledger", "Bank and supplier records", "Opening balances", "Reporting requirements"],
    workpackName: "Accounting close pack",
    workpackOutputs: ["Reconciliation pack", "Trial-balance review", "Close checklist", "Variance memo"],
    humanBoundary:
      "Sofia does not post unapproved entries, operate client bank accounts, approve financial statements or make management decisions. FST professionals and authorised client personnel review and approve all actions.",
  },
  {
    slug: "matthew",
    name: "Matthew",
    practice: "Malta Tax",
    role: "Malta tax compliance workpack specialist",
    description:
      "Income tax, VAT, EC Sales, Intrastat, FSS, compliance calendars, tax-risk registers and authority-query packs.",
    introduction:
      "Matthew helps FST professionals prepare traceable Malta tax and VAT workpacks. He connects source records, reconciliations, filing requirements and open questions so the responsible person can review the position before submission.",
    image: "/fst-agent-matthew.png",
    tone: "peach",
    responsibilities: [
      "Prepare tax and VAT reconciliation schedules",
      "Maintain filing calendars and information requests",
      "Identify gaps, exceptions and unresolved tax positions",
      "Structure supporting evidence for returns and queries",
      "Draft authority-query and review packs",
    ],
    inputs: ["Accounting records", "Prior returns", "Payroll and transaction data", "Tax correspondence"],
    workpackName: "Tax and VAT evidence pack",
    workpackOutputs: ["VAT schedules", "Tax-risk register", "Filing support pack", "Authority-query draft"],
    humanBoundary:
      "Matthew does not choose a final tax position, approve or file returns, correspond with authorities or give binding advice. The taxpayer and responsible professional retain review, approval and submission authority.",
  },
  {
    slug: "claire",
    name: "Claire",
    practice: "Corporate, Legal & Regulatory",
    role: "Corporate and regulatory workpack specialist",
    description:
      "Company administration, beneficial ownership, AML/CFT, MBR, contracts, GDPR and regulator-facing drafts.",
    introduction:
      "Claire helps FST professionals organise corporate, legal and regulatory source material into controlled workpacks. She keeps ownership records, filing requirements, due-diligence evidence and draft responses connected for professional review.",
    image: "/fst-agent-claire.png",
    tone: "sky",
    responsibilities: [
      "Prepare company-administration and ownership checklists",
      "Structure CDD, EDD and AML/CFT evidence packs",
      "Maintain filing, obligation and approval trackers",
      "Prepare first-pass contract and policy review notes",
      "Draft regulator-facing response packs for review",
    ],
    inputs: ["Corporate records", "Ownership information", "Policies and contracts", "Regulatory correspondence"],
    workpackName: "Corporate and regulatory pack",
    workpackOutputs: ["BO register", "CDD/EDD checklist", "MBR checklist", "Regulator-response draft"],
    humanBoundary:
      "Claire does not give reserved legal advice, approve regulated activity, file corporate changes or communicate with regulators independently. Appropriately authorised professionals and clients retain those decisions and actions.",
  },
  {
    slug: "emma",
    name: "Emma",
    practice: "Insurance & Solvency II",
    role: "Insurance governance and reporting specialist",
    description:
      "ORSA, QRT, SFCR/RSR, DORA, IRRD, IDD, governance, actuarial evidence and MFSA-facing packs.",
    introduction:
      "Emma helps FST professionals structure insurance governance, risk and supervisory reporting work. She connects requirements, evidence, review findings and board actions across Solvency II and related Malta and EU obligations.",
    image: "/fst-agent-emma.png",
    tone: "rose",
    responsibilities: [
      "Prepare ORSA, governance and policy review workpacks",
      "Maintain QRT and narrative-reporting trackers",
      "Cross-reference DORA, IRRD and IDD obligations to evidence",
      "Structure actuarial and control-review support files",
      "Assemble board and MFSA-facing packs for approval",
    ],
    inputs: ["Policies and governance records", "Risk and capital information", "QRT and reporting data", "Board and supervisory correspondence"],
    workpackName: "Insurance regulatory pack",
    workpackOutputs: ["ORSA evidence pack", "QRT tracker", "SFCR/RSR review notes", "Board pack"],
    humanBoundary:
      "Emma does not make actuarial judgements, approve regulatory returns, sign board papers or communicate with the MFSA. Responsible functions, directors and authorised professionals retain review and approval.",
  },
];

export function getAiAgent(slug: string) {
  return aiAgents.find((agent) => agent.slug === slug);
}
