import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Binoculars } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { CirclesThreePlus } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { getJurisdiction, marketPath } from "../../../lib/jurisdictions";
import { jurisdictionPageMetadata } from "../../../lib/seo";
import { BreadcrumbJsonLd } from "../../components/JsonLd";
import { PrimaryCta } from "../../components/PrimaryCta";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { SectionVisual } from "../../components/SectionVisual";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type PageProps = { params: Promise<{ jurisdiction: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getJurisdiction((await params).jurisdiction);
  return config ? jurisdictionPageMetadata({ jurisdiction: config.code, title: `The FST Approach in ${config.name}`, description: `How FST scopes, prepares, reviews and controls multidisciplinary professional-services work in ${config.name}.`, path: "/about" }) : {};
}

export default async function JurisdictionAboutPage({ params }: PageProps) {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) notFound();
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: marketPath(config.code) }, { name: "Our Approach", path: marketPath(config.code, "/about") }]} />
      <SiteHeader jurisdiction={config.code} />
      <section className="subpage-hero accent-cobalt">
        <div className="subpage-copy"><h1>Your question. The relevant expertise. One accountable route.</h1><p>We assemble management, finance, tax, governance, assurance-readiness and funding expertise around the result, evidence and professional responsibility required.</p><PrimaryCta jurisdiction={config.code} className="primary-button" /></div>
        <div className="subpage-image-wrap"><ResponsiveImage src={config.visuals.collaboration} alt="A multidisciplinary team working through a client priority" className="subpage-image" sizes="(max-width: 900px) 100vw, 52vw" loading="eager" fetchPriority="high" decoding="async" /></div>
      </section>
      <section className="about-principles section-shell">
        <p className="section-index">How the work runs</p><h2>Understand the setting. Join the evidence. Move the decision.</h2>
        <SectionVisual src={config.visuals.management} alt="A workshop connecting evidence, owners and next actions" className="about-principles-visual" />
        <div className="principle-grid">
          <article><span className="item-icon principle-icon" aria-hidden="true"><Binoculars size={21} /></span><h3>Route automatically</h3><p>The applicable service, pricing, contact and professional controls are attached before content or workflow decisions are made.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><CirclesThreePlus size={21} /></span><h3>Keep one controlled file</h3><p>Assumptions, records, sources, reviews, approvals and unresolved matters remain connected through delivery.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><Target size={21} /></span><h3>Leave an executable route</h3><p>Outputs identify the owner, deadline, evidence, professional boundary and next review point.</p></article>
        </div>
      </section>
      <section className="about-story section-shell">
        <div className="about-story-image"><ResponsiveImage src={config.visuals.international} alt="A cross-functional team coordinating delivery and accountability" sizes="(max-width: 720px) 100vw, 50vw" loading="lazy" decoding="async" /></div>
        <div><p className="section-index">Delivery governance</p><h2>Shared standards without cross-route leakage.</h2><p>FST reuses its design system, security controls and delivery methods. Services, claims, pricing, legal text, contacts, calendars and evidence expectations remain owned by the active route.</p><p>{config.operationalNotice}</p></div>
      </section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
