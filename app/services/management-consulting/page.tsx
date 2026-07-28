import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({ title: "Management Advisory, Risk & Controls", description: "Management advisory, strategy, risk management, internal audit, internal controls, governance and performance improvement.", path: "/services/management-consulting" });

export default function ManagementConsultingPage() {
  return <ServicePage
    eyebrow="Management Advisory, Risk & Controls"
    title="Turn complexity into practical progress."
    lede="Senior support for management decisions, strategy, risk management, internal audit, internal controls and operational improvement."
    image="/management-consulting.webp"
    imageAlt="Management consultants and executives discussing strategy and risk"
    sectionImages={{
      intro: { src: "/consulting-intro-v2.webp", alt: "Leadership team mapping strategic priorities with a senior consultant" },
      offerings: { src: "/consulting-offerings-v2.webp", alt: "Consultants facilitating a risk, controls and transformation working session" },
      outcomes: { src: "/consulting-outcomes-v2.webp", alt: "Executive team reviewing an improved operating model and delivery plan" },
      cta: { src: "/consulting-cta-v2.webp", alt: "Senior consultant in a focused one-to-one discussion with a business leader" },
    }}
    introduction="We connect management priorities with the governance, risk insight, controls and operating discipline needed to deliver them."
    accent="violet"
    services={[
      { title: "Management advisory", description: "Senior, practical support for complex decisions, priorities, performance challenges and implementation choices." },
      { title: "Strategy & transformation", description: "Clear strategic choices, practical operating models and focused support from intent through delivery." },
      { title: "Operating model design", description: "Roles, responsibilities, processes and ways of working aligned to strategy, scale and delivery." },
      { title: "Risk management", description: "Proportionate frameworks, risk appetite and reporting that connect risk to real business decisions." },
      { title: "Internal audit", description: "Risk-based internal audit planning and reviews that provide useful insight, recommendations and follow-up for management." },
      { title: "Internal controls", description: "Control design, documentation, testing and remediation that strengthen accountability and performance." },
      { title: "Governance & compliance", description: "Governance arrangements and compliance programmes aligned with obligations and organisational reality." },
      { title: "Performance improvement", description: "Process, information and accountability improvements that help teams operate with greater clarity." },
      { title: "Policies & procedures", description: "Clear, usable policies, procedures and responsibility maps that support consistent execution and control." },
    ]}
    outcomes={["Sharper priorities and decisions", "Stronger risk and control visibility", "More practical governance", "Change that teams can sustain"]}
  />;
}
