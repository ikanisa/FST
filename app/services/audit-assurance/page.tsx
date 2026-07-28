import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Audit & Assurance Services in Malta",
  description: "Statutory and voluntary audit, assurance, agreed-upon procedures, internal audit, controls, compliance, donor, NGO and project audit services.",
  path: "/services/audit-assurance",
});

export default function AuditAssurancePage() {
  return <ServicePage
    serviceName="Audit & Assurance"
    path="/services/audit-assurance"
    eyebrow="Audit & Assurance"
    title="Independent work that strengthens confidence."
    lede="Risk-led audit and assurance services built around professional judgement, sufficient appropriate evidence, clear reporting and practical follow-through."
    image="/fst-insights.webp"
    imageAlt="An independent audit team reviewing financial evidence and documented conclusions"
    sectionImages={{
      intro: { src: "/fst-accounting.webp", alt: "Financial records and supporting schedules prepared for independent audit" },
      offerings: { src: "/fst-insights.webp", alt: "Audit evidence, risk assessments and conclusions arranged for review" },
      outcomes: { src: "/fst-management.webp", alt: "Auditors and management discussing findings, risks and agreed actions" },
      cta: { src: "/fst-consultation.webp", alt: "A confidential audit scoping discussion with organisational leadership" },
    }}
    introduction="FST scopes each engagement around the reporting framework, intended users, material risks, independence requirements and evidence needed to support a defensible conclusion."
    accent="cobalt"
    professionalNote={{
      title: "Regulated work begins with authority and independence.",
      description: "Statutory audit and other regulated assurance engagements are accepted and performed only where the responsible auditor or audit firm holds the required Malta authorisation. Every engagement remains subject to conflict and independence checks, professional competence, ethical requirements, quality management, evidence availability and formal engagement acceptance.",
    }}
    services={[
      { title: "Statutory financial statement audit", description: "ISA-based audit of annual or consolidated financial statements, including planning, materiality, risk assessment, evidence, completion and an appropriately authorised auditor’s report." },
      { title: "Voluntary financial statement audit", description: "Independent financial statement audit commissioned by owners, lenders, investors, donors or governance bodies where no statutory requirement applies." },
      { title: "Limited assurance & review engagements", description: "Proportionate procedures and reporting that provide limited assurance over specified financial or non-financial information under an agreed reporting framework." },
      { title: "Agreed-upon procedures", description: "Precisely defined procedures over transactions, balances, controls or compliance matters, with factual findings reported to the intended users." },
      { title: "Internal audit", description: "Risk-based plans and focused assignments assessing governance, risk management, controls and operational performance, with tracked corrective actions." },
      { title: "Internal controls assurance", description: "Independent evaluation and testing of control design and operation across financial reporting, operations, compliance and technology-dependent processes." },
      { title: "Operational & process audit", description: "Evidence-led review of workflows, responsibilities, performance, hand-offs, safeguards and root causes affecting economy, efficiency and effectiveness." },
      { title: "Grant, donor & project audit", description: "Audit or assurance over funded-project expenditure, eligibility, procurement, co-financing, outputs and donor-specific reporting requirements." },
      { title: "NGO & voluntary organisation audit", description: "Financial statement, governance, restricted-fund and programme-accountability work adapted to charities, voluntary organisations and mission-led entities." },
      { title: "Compliance & regulatory audit", description: "Independent testing against defined laws, licence conditions, policies, contractual requirements or regulatory frameworks within the agreed scope." },
      { title: "Systems & data audit", description: "Review of access, change management, processing controls, data integrity, interfaces, reconciliations and technology-supported reporting evidence." },
      { title: "Fraud-risk & special-purpose review", description: "Targeted fact-finding, transaction testing and control analysis where suspected irregularities or heightened fraud risks require a carefully defined mandate." },
      { title: "Audit readiness & remediation", description: "Pre-audit diagnostics, working-paper preparation support, balance substantiation, evidence mapping and structured closure of prior findings without assuming management responsibility." },
      { title: "Audit committee & governance reporting", description: "Clear communication of significant risks, findings, judgements, control observations, unresolved matters and action ownership to those charged with governance." },
    ]}
    outcomes={["A conclusion supported by documented evidence", "Clear reporting for the intended users", "Significant risks and findings made visible", "Actions assigned without compromising independence"]}
  />;
}
