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
    title: config.code === "rw"
      ? "Accounting, Tax & Business Advisory Services in Rwanda"
      : `Business Advisory & Accounting Services in ${config.name}`,
    description: config.code === "rw"
      ? "Explore bookkeeping, accounting, RRA tax compliance, audit readiness, business setup, management advisory and funding support in Rwanda."
      : `Explore FST management, finance, tax, governance, assurance-readiness and funding support configured for organisations in ${config.name}.`,
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
        <div><h1>{config.code === "rw" ? "Bookkeeping, RRA tax, audit-readiness and business advisory services." : "Accounting, tax, audit, corporate and funding services for Malta."}</h1><p>{config.code === "rw" ? "Choose bookkeeping, financial reporting, RRA tax, RSSB, audit readiness, governance, management or funding support. FST keeps connected work in one controlled plan." : "Choose accounting, reporting, tax, audit, corporate administration, management advisory, funding or contract support with named scope and deliverables."}</p></div>
        <ResponsiveImage src={config.visuals.collaboration} alt="Specialists coordinating connected workstreams" sizes="(max-width: 900px) 100vw, 80vw" loading="eager" fetchPriority="high" />
      </section>
      <section className="services-catalogue-invitation section-shell">
        <div><p className="section-index">Individual services and fees</p><h2>Compare named deliverables and indicative starting fees.</h2></div>
        <div><p>{config.code === "rw" ? "Search RRA, RSSB, bookkeeping, reporting, controls, loan and grant deliverables, then prepare one itemised request." : "Search accounting, tax, audit, corporate, advisory, funding and contract deliverables, then prepare one itemised request."}</p><Link className="primary-button" href={marketPath(config.code, "/services/catalogue")}>Compare services and fees</Link></div>
      </section>
      <section className="services-sector-invitation section-shell">
        <div>
          <h2>{config.code === "rw" ? "Run a pharmacy, shop, restaurant or construction business?" : "Want one package built around how your business operates?"}</h2>
          <p>{config.code === "rw" ? "Choose one package for a pharmacy, a stock-led shop, a restaurant or a construction business." : "Choose one package for a restaurant, self-employed professional, shop or CSP."}</p>
        </div>
        <Link className="primary-button" href={`${marketPath(config.code, "/services/catalogue")}#industry-package-title`}>See business-type packages</Link>
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
        <div className="subpage-cta-copy"><p className="section-index">Scope a deadline or deliverable</p><h2>Tell FST what must be filed, reported, financed or decided.</h2><p>FST will confirm the relevant service, required records, review sequence and responsible professional route.</p><div className="contact-cta-actions"><PrimaryCta jurisdiction={config.code} className="primary-button" /><WhatsAppCta jurisdiction={config.code} /></div></div>
        <SectionVisual src={config.visuals.consultation} alt="An adviser and business owner agreeing the scope of work" className="subpage-cta-visual" />
      </section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
