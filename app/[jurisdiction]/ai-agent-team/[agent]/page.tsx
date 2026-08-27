import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentProfileContent } from "../../../ai-agent-team/[agent]/page";
import { aiAgents, getAiAgent } from "../../../../lib/ai-agents";
import { pageMetadata } from "../../../../lib/seo";

type MaltaAgentProfilePageProps = {
  params: Promise<{ jurisdiction: string; agent: string }>;
};

export function generateStaticParams() {
  return aiAgents.map((agent) => ({ jurisdiction: "mt", agent: agent.slug }));
}

export async function generateMetadata({ params }: MaltaAgentProfilePageProps): Promise<Metadata> {
  const { jurisdiction, agent: slug } = await params;
  const agent = jurisdiction === "mt" ? getAiAgent(slug) : undefined;
  if (!agent) return {};
  return pageMetadata({
    title: `${agent.name} — ${agent.practice} AI Agent for Malta`,
    description: `${agent.name} supports FST's supervised Malta ${agent.practice.toLowerCase()} workpacks. See responsibilities, inputs, outputs and the human approval boundary.`,
    path: `/mt/ai-agent-team/${agent.slug}`,
    image: agent.image,
    imageAlt: `${agent.name}, FST ${agent.practice} AI agent`,
  });
}

export default async function MaltaAgentProfilePage({ params }: MaltaAgentProfilePageProps) {
  const { jurisdiction, agent: slug } = await params;
  const agent = jurisdiction === "mt" ? getAiAgent(slug) : undefined;
  if (!agent) notFound();
  return <AgentProfileContent agent={agent} jurisdiction="mt" />;
}
