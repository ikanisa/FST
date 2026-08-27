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
import Link from "next/link";
import { aiAgents } from "../../lib/ai-agents";
import { jurisdictionConfig, marketPath, type JurisdictionCode } from "../../lib/jurisdictions";
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
    "Meet the supervised IKANISA AI agents FST uses to prepare source-linked audit, accounting, tax, corporate, regulatory and insurance workpacks.",
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

const controlPoints = [
  "A named task, purpose and professional owner",
  "Source-linked outputs and visible evidence gaps",
  "Review before reliance, communication or external action",
  "Client confidentiality and controlled information handling",
  "Final judgement, approval and accountability remain human",
];

export function AiAgentTeamContent({ jurisdiction }: { jurisdiction?: JurisdictionCode } = {}) {
  const path = (value: string) => jurisdiction ? marketPath(jurisdiction, value) : value;
  const teamPath = path("/ai-agent-team");
  const whatsappUrl = jurisdiction ? jurisdictionConfig[jurisdiction].whatsappUrl : siteConfig.whatsappUrl;

  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: jurisdiction ? marketPath(jurisdiction) : "/" },
          { name: "Meet Our AI Agent Team", path: teamPath },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${siteUrl}${teamPath}#webpage`,
          name: "Meet Our AI Agent Team",
          url: `${siteUrl}${teamPath}`,
          description:
            "How FST uses supervised IKANISA AI agents to prepare professional workpacks for human review and approval.",
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: {
            "@type": "Thing",
            name: "Supervised AI-assisted professional-services delivery",
          },
          mentions: {
            "@type": "ItemList",
            itemListElement: aiAgents.map((agent, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "SoftwareApplication",
                name: agent.name,
                applicationCategory: agent.practice,
                url: `${siteUrl}${teamPath}/${agent.slug}`,
              },
            })),
          },
        }}
      />
      <SiteHeader jurisdiction={jurisdiction} />

      <section className="ai-team-hero" aria-labelledby="ai-team-title">
        <div className="ai-team-hero-copy">
          <h1 id="ai-team-title">Meet our AI agent team.</h1>
          <p>
            FST combines experienced professionals with IKANISA&apos;s
            specialist AI agents to prepare clearer evidence, stronger
            workpacks and faster first drafts—while people keep every
            judgement and approval.
          </p>
          <PrimaryCta jurisdiction={jurisdiction} className="primary-button" />
        </div>
        <div className="ai-team-hero-media">
          <ResponsiveImage
            src="/fst-ai-team.webp"
            alt="FST professionals reviewing a structured evidence pack together"
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
          <h2 id="ai-agents-title">Meet the team and the workpacks they prepare.</h2>
          <p>
            Each IKANISA agent is focused on a professional workflow family.
            See the structured outputs each one prepares before FST reviews the
            evidence, resolves exceptions and approves the result.
          </p>
        </div>
        <div className="ai-agent-list">
          {aiAgents.map((agent) => (
            <article className="ai-agent-row" key={agent.name}>
              <img src={agent.image} alt={`${agent.name}, FST ${agent.practice} AI agent`} width="128" height="128" loading="lazy" decoding="async" />
              <div className="ai-agent-details">
                <div className="ai-agent-intro">
                  <div>
                    <span>{agent.practice}</span>
                    <h3>{agent.name}</h3>
                  </div>
                  <Link href={`${teamPath}/${agent.slug}`} aria-label={`Meet ${agent.name} on FST`}>
                    Meet {agent.name}
                    <ArrowRight size={16} weight="regular" aria-hidden="true" />
                  </Link>
                </div>
                <p>{agent.description}</p>
                <div className="ai-agent-workpack">
                  <div>
                    <span>Prepared workpack</span>
                    <strong>{agent.workpackName}</strong>
                  </div>
                  <ul aria-label={`${agent.name} workpack outputs`}>
                    {agent.workpackOutputs.map((output) => <li key={output}>{output}</li>)}
                  </ul>
                </div>
              </div>
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
          <PrimaryCta jurisdiction={jurisdiction} className="primary-button" />
          <TrackedLink
            href={whatsappUrl}
            event="contact_whatsapp_click"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp FST
            <ArrowRight size={16} weight="regular" aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>

      <SiteFooter jurisdiction={jurisdiction} />
    </main>
  );
}

export default function AiAgentTeamPage() {
  return <AiAgentTeamContent />;
}
