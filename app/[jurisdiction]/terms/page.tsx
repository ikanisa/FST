import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJurisdiction } from "../../../lib/jurisdictions";
import { jurisdictionPageMetadata } from "../../../lib/seo";
import { JurisdictionLegalPage } from "../../components/JurisdictionLegalPage";

type PageProps = { params: Promise<{ jurisdiction: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const config = getJurisdiction((await params).jurisdiction); return config ? jurisdictionPageMetadata({ jurisdiction: config.code, title: `Site Terms · ${config.name}`, description: `Terms for the FST ${config.name} information, catalogue, contact and booking routes.`, path: "/terms" }) : {}; }
export default async function Page({ params }: PageProps) { const config = getJurisdiction((await params).jurisdiction); if (!config) notFound(); return <JurisdictionLegalPage jurisdiction={config.code} kind="terms" />; }
