import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJurisdiction, marketPath } from "../../../lib/jurisdictions";
import { jurisdictionPageMetadata } from "../../../lib/seo";
import { BreadcrumbJsonLd } from "../../components/JsonLd";
import { PrimaryCta } from "../../components/PrimaryCta";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type PageProps = { params: Promise<{ jurisdiction: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getJurisdiction((await params).jurisdiction);
  return config ? jurisdictionPageMetadata({ jurisdiction: config.code, title: `Businesses & Organisations We Support in ${config.name}`, description: config.serviceArea, path: "/who-we-work-with" }) : {};
}

export default async function JurisdictionAudiencePage({ params }: PageProps) {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) notFound();
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: marketPath(config.code) }, { name: "Who We Help", path: marketPath(config.code, "/who-we-work-with") }]} />
      <SiteHeader jurisdiction={config.code} />
      <section className="client-hero">
        <div className="client-hero-copy"><h1>{config.code === "rw" ? "Finance, tax and governance support for entrepreneurs, cooperatives and NGOs." : "Support for start-ups, SMEs, NGOs and international programmes."}</h1><p>FST matches accounting, tax, audit-readiness, governance, advisory and funding work to the organisation, required deliverable and deadline.</p><div className="client-hero-actions"><PrimaryCta jurisdiction={config.code} className="primary-button" /></div></div>
        <div className="client-hero-visual"><ResponsiveImage src={config.visuals.collaboration} alt="An advisory team working alongside organisational leaders" sizes="(max-width: 900px) 100vw, 60vw" loading="eager" fetchPriority="high" /><aside><strong>Scope, evidence and approval owners in one file.</strong><span>Named deliverables, records, deadlines and review points stay connected.</span></aside></div>
      </section>
      <section className="client-groups section-shell" aria-labelledby="market-client-groups">
        <div className="client-groups-heading"><h2 id="market-client-groups">Choose the organisation profile closest to yours.</h2><p>Each profile shows how FST adapts scope, evidence and professional review to the operating context.</p></div>
        <div className="client-groups-grid">
          {config.audience.map((group, index) => <article className="client-group-card client-group-three-up" key={group.title}><ResponsiveImage src={[config.visuals.consultation, config.visuals.operations, config.visuals.international][index]} alt={`${group.title} reviewing priorities and evidence`} sizes="(max-width: 900px) 100vw, 33vw" loading="lazy" decoding="async" /><div><h3>{group.title}</h3><p>{group.description}</p><ul><li>Named deliverables and deadline</li><li>Required records and review points</li><li>Responsible professional confirmed before work starts</li></ul></div></article>)}
        </div>
      </section>
      <section className="relationship-cta section-shell"><div className="relationship-cta-copy"><p className="eyebrow">Request a scope review</p><h2>Tell us what must be filed, financed, reported, controlled or decided.</h2><p>Include the deadline and the records already available; FST will identify the relevant service and review route.</p><PrimaryCta jurisdiction={config.code} className="primary-button" /></div><ResponsiveImage src={config.visuals.consultation} alt="A private first meeting focused on a business outcome" sizes="(max-width: 900px) 100vw, 45vw" loading="lazy" decoding="async" /></section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
