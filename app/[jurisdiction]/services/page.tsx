import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJurisdiction, marketPath } from "../../../lib/jurisdictions";
import { getJurisdictionServices } from "../../../lib/jurisdiction-services";
import { jurisdictionPageMetadata } from "../../../lib/seo";
import { BreadcrumbJsonLd } from "../../components/JsonLd";
import { PrimaryCta } from "../../components/PrimaryCta";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { SectionVisual } from "../../components/SectionVisual";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { WhatsAppCta } from "../../components/WhatsAppCta";

type PageProps = { params: Promise<{ jurisdiction: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) return {};
  return jurisdictionPageMetadata({
    jurisdiction: config.code,
    title: `Professional Services in ${config.name}`,
    description: `Explore FST management, finance, tax, governance, assurance-readiness and funding support configured for organisations in ${config.name}.`,
    path: "/services",
  });
}

export default async function JurisdictionServicesPage({ params }: PageProps) {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) notFound();
  const services = getJurisdictionServices(config.code);

  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: marketPath(config.code) }, { name: "Services", path: marketPath(config.code, "/services") }]} />
      <SiteHeader jurisdiction={config.code} />
      <section className="index-hero image-index-hero services-index-hero">
        <div><h1>Build the right team around the work.</h1><p>Choose the workstream closest to the outcome. FST keeps finance, management, evidence, compliance and funding dependencies in one controlled plan.</p></div>
        <ResponsiveImage src={config.visuals.collaboration} alt="Specialists coordinating connected workstreams" sizes="(max-width: 900px) 100vw, 80vw" loading="eager" fetchPriority="high" />
      </section>
      <section className="services-catalogue-invitation section-shell">
        <div><p className="section-index">Need one specific service?</p><h2>Compare services and indicative starting fees.</h2></div>
        <div><p>{config.code === "rw" ? "Search practical RRA, RSSB, accounting, governance, loan and grant workpacks, then send one coordinated request." : "Search the catalogue, combine work items and send one coordinated request."}</p><Link className="primary-button" href={marketPath(config.code, "/services/catalogue")}>Browse the Service Catalogue</Link></div>
      </section>
      <section className="services-sector-invitation section-shell">
        <div>
          <h2>{config.code === "rw" ? "Run a pharmacy, shop, restaurant or construction business?" : "Want one package built around how your business operates?"}</h2>
          <p>{config.code === "rw" ? "Choose one package for a pharmacy, a stock-led shop, a restaurant or a construction business." : "Choose one package for a restaurant, self-employed professional, shop or CSP."}</p>
        </div>
        <Link className="primary-button" href={`${marketPath(config.code, "/services/catalogue")}#industry-package-title`}>Explore industry packages</Link>
      </section>
      <section className="service-index-grid section-shell" aria-label="FST services">
        {services.map((service) => (
          <Link className={`service-index-card accent-${service.accent}`} href={marketPath(config.code, `/services/${service.slug}`)} key={service.slug}>
            <ResponsiveImage src={service.image} alt={service.imageAlt} sizes="(max-width: 720px) 100vw, 50vw" loading="lazy" decoding="async" />
            <div><h2>{service.title}</h2><p>{service.description}</p></div>
          </Link>
        ))}
      </section>
      <section className="subpage-cta section-shell">
        <div className="subpage-cta-copy"><p className="section-index">A practical first step</p><h2>Start with the outcome and the deadline.</h2><p>FST will map the information, specialist review and approval sequence required for the work.</p><div className="contact-cta-actions"><PrimaryCta jurisdiction={config.code} className="primary-button" /><WhatsAppCta jurisdiction={config.code} /></div></div>
        <SectionVisual src={config.visuals.consultation} alt="An adviser and business owner agreeing the scope of work" className="subpage-cta-visual" />
      </section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
