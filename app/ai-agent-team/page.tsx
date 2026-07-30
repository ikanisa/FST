import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { FileMagnifyingGlass } from "@phosphor-icons/react/dist/ssr/FileMagnifyingGlass";
import { FolderOpen } from "@phosphor-icons/react/dist/ssr/FolderOpen";
import { Lightning } from "@phosphor-icons/react/dist/ssr/Lightning";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { NotePencil } from "@phosphor-icons/react/dist/ssr/NotePencil";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { UserFocus } from "@phosphor-icons/react/dist/ssr/UserFocus";
import { pageMetadata, siteUrl } from "../../lib/seo";
import { siteConfig } from "../../lib/site-config";
import { BreadcrumbJsonLd, JsonLd } from "../components/JsonLd";
import { PrimaryCta } from "../components/PrimaryCta";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLink } from "../components/TrackedLink";

export const metadata = pageMetadata({
  title: "Meet Our AI Agent Team",
  description:
    "Meet the supervised IKANISA AI agents FST uses to prepare source-linked audit, accounting, Malta tax, corporate, regulatory and insurance workpacks.",
  path: "/ai-agent-team",
});

const pressures = [
  {
    title: "More capacity for client work",
    description:
      "Our specialist agents organise documents, clean data, prepare schedules and produce first drafts so FST professionals can focus on judgement and client decisions.",
    icon: Lightning,
  },
  {
    title: "Clearer evidence by design",
    description:
      "We use AI to index sources, flag gaps, cross-reference schedules and maintain visible review trails across audit, tax, corporate, insurance and regulatory work.",
    icon: FileMagnifyingGlass,
  },
  {
    title: "Faster, controlled delivery",
    description:
      "FST professionals define the scope, supervise each agent, resolve exceptions and approve every output before it is relied on, communicated or submitted.",
    icon: Buildings,
  },
];

const operatingSteps = [
  {
    title: "Frame the task",
    description:
      "The objective, scope, deadline, source material and required outputs are defined before preparation begins.",
    icon: NotePencil,
  },
  {
    title: "Prepare the workpack",
    description:
      "The relevant agent organises sources, prepares schedules and drafts the structured first version.",
    icon: FolderOpen,
  },
  {
    title: "Professional review",
    description:
      "An FST professional checks the evidence, challenges assumptions, resolves gaps and applies judgement.",
    icon: MagnifyingGlass,
  },
  {
    title: "Approve and act",
    description:
      "The authorised professional or client approves what may be used, filed, communicated or acted upon.",
    icon: CheckCircle,
  },
];

const agents = [
  {
    name: "Patrick",
    practice: "Audit & Assurance",
    description:
      "Planning, risk assessment, PBC, workpapers, evidence registers, completion, reporting and QC/EQR support.",
    image: "/fst-agent-patrick.png",
    href: "https://ikanisa.com/professional-agents/patrick",
  },
  {
    name: "Sofia",
    practice: "Accounting & Finance",
    description:
      "Ledgers, reconciliations, trial-balance review, close packs, management reporting and audit-readiness support.",
    image: "/fst-agent-sofia.png",
    href: "https://ikanisa.com/professional-agents/sofia",
  },
  {
    name: "Matthew",
    practice: "Malta Tax",
    description:
      "Income tax, VAT, EC Sales, Intrastat, FSS, compliance calendars, tax-risk registers and authority-query packs.",
    image: "/fst-agent-matthew.png",
    href: "https://ikanisa.com/professional-agents/matthew",
  },
  {
    name: "Claire",
    practice: "Corporate, Legal & Regulatory",
    description:
      "Company administration, beneficial ownership, AML/CFT, MBR, contracts, GDPR and regulator-facing drafts.",
    image: "/fst-agent-claire.png",
    href: "https://ikanisa.com/professional-agents/claire",
  },
  {
    name: "Emma",
    practice: "Insurance & Solvency II",
    description:
      "ORSA, QRT, SFCR/RSR, DORA, IRRD, IDD, governance, actuarial evidence and MFSA-facing packs.",
    image: "/fst-agent-emma.png",
    href: "https://ikanisa.com/professional-agents/emma",
  },
];

const workpacks = [
  {
    practice: "Audit & Assurance",
    name: "Audit file pack",
    agent: "Patrick",
    outputs: ["PBC tracker", "Risk matrix", "Evidence register", "Completion memo"],
  },
  {
    practice: "Accounting & Finance",
    name: "Accounting close pack",
    agent: "Sofia",
    outputs: ["Reconciliation pack", "Trial-balance review", "Close checklist", "Variance memo"],
  },
  {
    practice: "Malta Tax",
    name: "Tax and VAT evidence pack",
    agent: "Matthew",
    outputs: ["VAT schedules", "Tax-risk register", "Filing support pack", "Authority-query draft"],
  },
  {
    practice: "Corporate, Legal & Regulatory",
    name: "Corporate and regulatory pack",
    agent: "Claire",
    outputs: ["BO register", "CDD/EDD checklist", "MBR checklist", "Regulator-response draft"],
  },
  {
    practice: "Insurance & Solvency II",
    name: "Insurance regulatory pack",
    agent: "Emma",
    outputs: ["ORSA evidence pack", "QRT tracker", "SFCR/RSR review notes", "Board pack"],
  },
];

const controlPoints = [
  "A named task, purpose and professional owner",
  "Source-linked outputs and visible evidence gaps",
  "Review before reliance, communication or external action",
  "Client confidentiality and controlled information handling",
  "Final judgement, approval and accountability remain human",
];

export default function AiAgentTeamPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Meet Our AI Agent Team", path: "/ai-agent-team" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${siteUrl}/ai-agent-team#webpage`,
          name: "Meet Our AI Agent Team",
          url: `${siteUrl}/ai-agent-team`,
          description:
            "How FST uses supervised IKANISA AI agents to prepare professional workpacks for human review and approval.",
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: {
            "@type": "Thing",
            name: "Supervised AI-assisted professional-services delivery",
          },
          mentions: {
            "@type": "ItemList",
            itemListElement: agents.map((agent, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "SoftwareApplication",
                name: agent.name,
                applicationCategory: agent.practice,
                url: agent.href,
              },
            })),
          },
        }}
      />
      <SiteHeader />

      <section className="ai-team-hero" aria-labelledby="ai-team-title">
        <div className="ai-team-hero-copy">
          <h1 id="ai-team-title">Meet our AI agent team.</h1>
          <p>
            FST combines experienced professionals with IKANISA&apos;s
            specialist AI agents to prepare clearer evidence, stronger
            workpacks and faster first drafts—while people keep every
            judgement and approval.
          </p>
          <PrimaryCta className="primary-button" />
        </div>
        <div className="ai-team-hero-media">
          <ResponsiveImage
            src="/fst-ai-team.webp"
            alt="FST professionals reviewing a structured evidence pack together in Malta"
            sizes="(max-width: 900px) 100vw, 56vw"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="ai-pressure section-shell" aria-labelledby="ai-pressure-title">
        <h2 id="ai-pressure-title">
          FST uses supervised AI to increase capacity, strengthen evidence and
          keep professional judgement in human hands.
        </h2>
        <div className="ai-pressure-grid">
          {pressures.map((pressure) => {
            const PressureIcon = pressure.icon;
            return (
              <article key={pressure.title}>
                <span className="ai-line-icon" aria-hidden="true">
                  <PressureIcon size={24} weight="regular" />
                </span>
                <h3>{pressure.title}</h3>
                <p>{pressure.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ai-operating section-shell" aria-labelledby="ai-operating-title">
        <div className="ai-section-heading">
          <h2 id="ai-operating-title">Agents prepare. Professionals approve.</h2>
          <p>
            The agent team is a supervised preparation layer inside FST&apos;s
            service delivery—not a substitute for professional responsibility.
          </p>
        </div>
        <div className="ai-operating-steps">
          {operatingSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <article key={step.title}>
                <span className="ai-step-icon" aria-hidden="true">
                  <StepIcon size={25} weight="regular" />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < operatingSteps.length - 1 && (
                  <ArrowRight className="ai-step-arrow" size={18} aria-hidden="true" />
                )}
              </article>
            );
          })}
        </div>
        <div className="ai-control-panel">
          <div>
            <ShieldCheck size={38} weight="regular" aria-hidden="true" />
            <h3>Supervision is the operating model.</h3>
          </div>
          <ul>
            {controlPoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
      </section>

      <section className="ai-agents section-shell" aria-labelledby="ai-agents-title">
        <div className="ai-section-heading">
          <h2 id="ai-agents-title">Meet the team behind the workpacks.</h2>
          <p>
            Each IKANISA agent is focused on a professional workflow family.
            FST selects the relevant agent, defines the work and reviews the
            result in the context of your engagement.
          </p>
        </div>
        <div className="ai-agent-list">
          {agents.map((agent) => (
            <article className="ai-agent-row" key={agent.name}>
              <img src={agent.image} alt={`${agent.name}, IKANISA ${agent.practice} AI agent`} width="128" height="128" loading="lazy" decoding="async" />
              <div>
                <span>{agent.practice}</span>
                <h3>{agent.name}</h3>
                <p>{agent.description}</p>
              </div>
              <a href={agent.href} target="_blank" rel="noreferrer" aria-label={`View ${agent.name} on IKANISA`}>
                View on IKANISA
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-workpacks section-shell" aria-labelledby="ai-workpacks-title">
        <div className="ai-section-heading">
          <h2 id="ai-workpacks-title">
            Structured workpacks for the work that slows teams down.
          </h2>
          <p>
            Outputs are prepared for review, with source trails, assumptions,
            exceptions and missing information kept visible.
          </p>
        </div>
        <div className="ai-workpack-list">
          {workpacks.map((workpack) => (
            <article key={workpack.name}>
              <div className="ai-workpack-practice">
                <span>{workpack.practice}</span>
                <strong>{workpack.agent}</strong>
              </div>
              <h3>{workpack.name}</h3>
              <ul>
                {workpack.outputs.map((output) => <li key={output}>{output}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-accountability section-shell" aria-labelledby="ai-accountability-title">
        <div className="ai-accountability-copy">
          <UserFocus size={40} weight="regular" aria-hidden="true" />
          <h2 id="ai-accountability-title">
            AI supports the work. People remain accountable.
          </h2>
          <p>
            The agents do not sign reports, issue opinions, approve filings,
            contact clients or authorities, change client systems or take
            external action on their own. FST professionals and authorised
            clients decide what is complete, appropriate and ready to use.
          </p>
        </div>
        <ol className="ai-evidence-flow" aria-label="FST evidence and approval flow">
          <li><strong>Source material</strong><span>Files, information and context</span></li>
          <li><strong>Agent-prepared workpack</strong><span>Structured first version with visible gaps</span></li>
          <li><strong>FST professional review</strong><span>Evidence checked and judgement applied</span></li>
          <li><strong>Approved action</strong><span>Client or authorised professional decides</span></li>
        </ol>
      </section>

      <section className="ai-team-cta section-shell" aria-labelledby="ai-team-cta-title">
        <div>
          <h2 id="ai-team-cta-title">Bring us the task, deadline and source material.</h2>
          <p>
            FST will define the right workpack, assemble the relevant expertise
            and agree the review and approval responsibilities before work starts.
          </p>
        </div>
        <div className="ai-team-cta-actions">
          <PrimaryCta className="primary-button" />
          <TrackedLink
            href={siteConfig.whatsappUrl}
            event="contact_whatsapp_click"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp FST
            <ArrowRight size={16} weight="regular" aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
