import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({ title: "Management Advisory, Risk & Controls", description: "Management advisory, business planning, strategy, risk management, internal audit, internal controls, governance and performance improvement.", path: "/services/management-consulting" });

export default function ManagementConsultingPage() {
  return <ServicePage
    eyebrow="Management Advisory, Risk & Controls"
    title="Build an organisation that can decide and deliver."
    lede="Hands-on support for leaders strengthening business planning, strategy, performance, governance, risk management, internal audit and internal controls."
    image="/fst-management.webp"
    imageAlt="A leadership workshop mapping actions and operating priorities"
    sectionImages={{
      intro: { src: "/fst-collaboration.webp", alt: "Advisers and managers working through a delivery challenge" },
      offerings: { src: "/fst-management.webp", alt: "A facilitated management, risk and controls workshop" },
      outcomes: { src: "/fst-insights.webp", alt: "An evidence-led advisory workspace with priorities under review" },
      cta: { src: "/fst-consultation.webp", alt: "A private consultation between an adviser and business owner" },
    }}
    introduction="FST turns management questions and business plans into an owned programme of decisions, safeguards and measurable action."
    accent="violet"
    services={[
      { title: "Management support", description: "Structured decision support, issue resolution and implementation guidance for boards, owners and leadership teams." },
      { title: "Business planning & feasibility", description: "Commercial objectives, market evidence, operating requirements, management capability, milestones, risks and financial viability brought into one executable plan." },
      { title: "Business-plan preparation", description: "Full preparation of new business plans that connect the opportunity, operating model, delivery roadmap, resources and financial case." },
      { title: "Business-plan review", description: "Independent challenge of an existing plan’s evidence, assumptions, internal logic, feasibility, risks and implementation readiness." },
      { title: "Budgeting, projections & scenarios", description: "Operating and capital budgets, linked financial projections, cash requirements, sensitivities and scenarios aligned with the management plan." },
      { title: "Strategy & transformation", description: "Strategic choices translated into initiatives, milestones, owners and an operating cadence teams can use." },
      { title: "Operating model design", description: "Practical redesign of roles, decision rights, workflows and management information for the next stage of growth." },
      { title: "Risk management", description: "Risk identification, appetite, assessment, treatment and reporting built into planning and everyday decisions." },
      { title: "Internal audit", description: "Risk-based plans, focused reviews, clear findings and tracked actions that give management useful assurance." },
      { title: "Internal controls", description: "Process walkthroughs, control design, documentation, testing, gap remediation and control-owner coaching." },
      { title: "Governance & compliance", description: "Committees, delegations, reporting lines and compliance responsibilities made proportionate and workable." },
      { title: "Performance improvement", description: "Root-cause analysis, process redesign, indicators and accountability routines that lift delivery performance." },
      { title: "Policies & procedures", description: "Usable policies, standard procedures, matrices and control evidence designed around how work is actually done." },
    ]}
    outcomes={["An executable business and management plan", "Decisions with named owners", "Visible risks and tested controls", "An operating rhythm that holds"]}
  />;
}
