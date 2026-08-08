import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { FileMagnifyingGlass } from "@phosphor-icons/react/dist/ssr/FileMagnifyingGlass";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { aiAgents, getAiAgent } from "../../../lib/ai-agents";
import { pageMetadata, siteUrl } from "../../../lib/seo";
import { BreadcrumbJsonLd, JsonLd } from "../../components/JsonLd";
import { PrimaryCta } from "../../components/PrimaryCta";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type AgentPageProps = { params: Promise<{ agent: string }> };

export function generateStaticParams() {
  return aiAgents.map((agent) => ({ agent: agent.slug }));
}

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { agent: slug } = await params;
  const agent = getAiAgent(slug);
  if (!agent) return {};
  return pageMetadata({
    title: `${agent.name} — ${agent.role}`,
    description: `${agent.name} supports FST's supervised ${agent.practice.toLowerCase()} workpacks. See responsibilities, inputs, outputs and the human approval boundary.`,
    path: `/ai-agent-team/${agent.slug}`,
    image: agent.image,
    imageAlt: `${agent.name}, FST ${agent.practice} AI agent`,
  });
}

export default async function AgentProfilePage({ params }: AgentPageProps) {
  const { agent: slug } = await params;
  const agent = getAiAgent(slug);
  if (!agent) notFound();

  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "AI Agent Team", path: "/ai-agent-team" },
          { name: agent.name, path: `/ai-agent-team/${agent.slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${siteUrl}/ai-agent-team/${agent.slug}#webpage`,
          name: `${agent.name} — ${agent.role}`,
          url: `${siteUrl}/ai-agent-team/${agent.slug}`,
          description: agent.introduction,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: {
            "@type": "SoftwareApplication",
            name: agent.name,
            applicationCategory: agent.practice,
            operatingSystem: "FST supervised professional-services workflow",
          },
        }}
      />
      <SiteHeader />

      <section className={`agent-profile-hero agent-profile-${agent.tone}`}>
        <div className="agent-profile-hero-copy">
          <Link className="agent-profile-back" href="/ai-agent-team">
            <ArrowLeft size={16} aria-hidden="true" /> Back to the agent team
          </Link>
          <p className="eyebrow">FST supervised AI agent · {agent.practice}</p>
          <h1>{agent.name}</h1>
          <h2>{agent.role}</h2>
          <p>{agent.introduction}</p>
          <PrimaryCta className="primary-button" />
        </div>
        <div className="agent-profile-portrait">
          <img src={agent.image} alt={`${agent.name}, FST ${agent.practice} AI agent`} width="512" height="512" fetchPriority="high" />
          <div>
            <span>Prepared inside FST</span>
            <strong>Reviewed and approved by people</strong>
          </div>
        </div>
      </section>

      <section className="agent-profile-scope section-shell" aria-labelledby="agent-scope-title">
        <div>
          <p className="section-index">Working scope</p>
          <h2 id="agent-scope-title">What {agent.name} prepares.</h2>
          <p>{agent.description}</p>
        </div>
        <ul>
          {agent.responsibilities.map((responsibility) => (
            <li key={responsibility}><CheckCircle size={20} weight="regular" aria-hidden="true" />{responsibility}</li>
          ))}
        </ul>
      </section>

      <section className="agent-profile-work section-shell" aria-labelledby="agent-workpack-title">
        <div className="agent-profile-inputs">
          <FileMagnifyingGlass size={34} weight="regular" aria-hidden="true" />
          <p className="section-index">Typical inputs</p>
          <h2>Start with controlled source material.</h2>
          <ul>{agent.inputs.map((input) => <li key={input}>{input}</li>)}</ul>
        </div>
        <div className="agent-profile-output">
          <p className="section-index">Prepared workpack</p>
          <h2 id="agent-workpack-title">{agent.workpackName}</h2>
          <ul>{agent.workpackOutputs.map((output) => <li key={output}>{output}</li>)}</ul>
        </div>
      </section>

      <section className="agent-profile-boundary section-shell" aria-labelledby="agent-boundary-title">
        <ShieldCheck size={42} weight="regular" aria-hidden="true" />
        <div>
          <p className="section-index">Human approval boundary</p>
          <h2 id="agent-boundary-title">Preparation is automated. Accountability is not.</h2>
          <p>{agent.humanBoundary}</p>
        </div>
      </section>

      <section className="agent-profile-next section-shell" aria-labelledby="agent-next-title">
        <div>
          <h2 id="agent-next-title">Put {agent.name} to work inside an FST engagement.</h2>
          <p>Bring the task, deadline and available source material. FST will define the workpack, supervision and approval responsibilities before preparation starts.</p>
        </div>
        <div>
          <PrimaryCta className="primary-button" />
          <Link href="/ai-agent-team">Meet the full agent team <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
