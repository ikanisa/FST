import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiAgentTeamContent } from "../../ai-agent-team/page";
import { pageMetadata } from "../../../lib/seo";

type MaltaAgentTeamPageProps = { params: Promise<{ jurisdiction: string }> };

export async function generateMetadata({ params }: MaltaAgentTeamPageProps): Promise<Metadata> {
  if ((await params).jurisdiction !== "mt") return {};
  return pageMetadata({
    title: "AI Agent Team for Malta Professional Work",
    description:
      "Meet the supervised IKANISA AI agents FST uses for source-linked Malta audit, accounting, tax, corporate, regulatory and insurance workpacks.",
    path: "/mt/ai-agent-team",
  });
}

export default async function MaltaAgentTeamPage({ params }: MaltaAgentTeamPageProps) {
  if ((await params).jurisdiction !== "mt") notFound();
  return <AiAgentTeamContent jurisdiction="mt" />;
}
