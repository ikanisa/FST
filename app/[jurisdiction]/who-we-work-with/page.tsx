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
      <BreadcrumbJsonLd items={[{ name: "Home", path: marketPath(config.code) }, { name: "Organisations", path: marketPath(config.code, "/who-we-work-with") }]} />
      <SiteHeader jurisdiction={config.code} />
      <section className="client-hero">
        <div className="client-hero-copy"><h1>Support matched to the pressure you are under.</h1><p>The service mix changes with the organisation and decision. The working method stays consistent: establish the outcome, join the evidence and agree the route forward.</p><div className="client-hero-actions"><PrimaryCta jurisdiction={config.code} className="primary-button" /></div></div>
        <div className="client-hero-visual"><ResponsiveImage src={config.visuals.collaboration} alt="An advisory team working alongside organisational leaders" sizes="(max-width: 900px) 100vw, 60vw" loading="eager" fetchPriority="high" /><aside><strong>A joined-up working file.</strong><span>A shared objective, named owners and reviewable evidence.</span></aside></div>
      </section>
      <section className="client-groups section-shell" aria-labelledby="market-client-groups">
        <div className="client-groups-heading"><h2 id="market-client-groups">Built for the organisations carrying delivery.</h2><p>Each route is scoped around the organisation, the decision and the evidence required.</p></div>
        <div className="client-groups-grid">
          {config.audience.map((group, index) => <article className="client-group-card client-group-three-up" key={group.title}><ResponsiveImage src={[config.visuals.consultation, config.visuals.operations, config.visuals.international][index]} alt={`${group.title} reviewing priorities and evidence`} sizes="(max-width: 900px) 100vw, 33vw" loading="lazy" decoding="async" /><div><h3>{group.title}</h3><p>{group.description}</p><ul><li>Scope built around the actual decision</li><li>Evidence and approvals kept visible</li><li>Responsible delivery route confirmed</li></ul></div></article>)}
        </div>
      </section>
      <section className="relationship-cta section-shell"><div className="relationship-cta-copy"><p className="eyebrow">Begin with the decision</p><h2>Describe the outcome, not the service code.</h2><p>Tell us what must be decided, financed, filed, controlled or delivered.</p><PrimaryCta jurisdiction={config.code} className="primary-button" /></div><ResponsiveImage src={config.visuals.consultation} alt="A private first meeting focused on a business outcome" sizes="(max-width: 900px) 100vw, 45vw" loading="lazy" decoding="async" /></section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
