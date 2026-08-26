import { notFound } from "next/navigation";
import { isJurisdiction, jurisdictionCodes } from "../../lib/jurisdictions";

type JurisdictionLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ jurisdiction: string }>;
};

export function generateStaticParams() {
  return jurisdictionCodes.map((jurisdiction) => ({ jurisdiction }));
}

export default async function JurisdictionLayout({ children, params }: JurisdictionLayoutProps) {
  const { jurisdiction } = await params;
  if (!isJurisdiction(jurisdiction)) notFound();
  return children;
}
