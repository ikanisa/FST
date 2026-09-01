import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { Calculator } from "@phosphor-icons/react/dist/ssr/Calculator";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { HandCoins } from "@phosphor-icons/react/dist/ssr/HandCoins";
import { Receipt } from "@phosphor-icons/react/dist/ssr/Receipt";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { PrimaryCta } from "../components/PrimaryCta";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SectionVisual } from "../components/SectionVisual";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { WhatsAppCta } from "../components/WhatsAppCta";
import { JsonLd } from "../components/JsonLd";
import { getJurisdiction, marketPath } from "../../lib/jurisdictions";
import { getJurisdictionServices } from "../../lib/jurisdiction-services";
import { jurisdictionPageMetadata, siteUrl } from "../../lib/seo";

type JurisdictionPageProps = { params: Promise<{ jurisdiction: string }> };

const serviceIcons = [Compass, ShieldCheck, Receipt, Calculator, Buildings, HandCoins];

export async function generateMetadata({ params }: JurisdictionPageProps): Promise<Metadata> {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) return {};
  return jurisdictionPageMetadata({
    jurisdiction: config.code,
    title: config.seo.homeTitle,
    description: config.seo.homeDescription,
  });
}

export default async function JurisdictionHome({ params }: JurisdictionPageProps) {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) notFound();
  const services = getJurisdictionServices(config.code);
  const locationStructuredData = config.location ? {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}${marketPath(config.code)}#professional-service`,
    name: "FST",
    url: `${siteUrl}${marketPath(config.code)}`,
    image: `${siteUrl}${config.visuals.hero}`,
    description: config.seo.homeDescription,
    telephone: config.whatsappDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.location.streetAddress,
      addressLocality: config.location.addressLocality,
      addressRegion: config.location.addressRegion,
      addressCountry: config.location.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.location.latitude,
      longitude: config.location.longitude,
    },
    hasMap: config.location.mapUrl,
    areaServed: { "@type": "Country", name: config.country },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: config.whatsappDisplay,
      url: config.whatsappUrl,
      contactType: "client enquiries",
      areaServed: config.location.addressCountry,
      availableLanguage: ["English"],
    },
    knowsAbout: config.code === "rw" ? [
      "Bookkeeping and accounting",
      "RRA tax compliance",
      "VAT and EBM reconciliation",
      "PAYE, withholding tax and RSSB schedules",
      "Audit readiness and internal controls",
      "Business setup and corporate governance",
      "Business loan and grant application support",
    ] : undefined,
  } : undefined;

  return (
    <main id="main-content" tabIndex={-1}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}${marketPath(config.code)}#webpage`,
        name: `FST ${config.name}`,
        description: config.seo.homeDescription,
        url: `${siteUrl}${marketPath(config.code)}`,
        inLanguage: config.locale,
        about: { "@type": "Country", name: config.country },
        isPartOf: { "@id": `${siteUrl}/#website` },
      }} />
      {locationStructuredData && <JsonLd data={locationStructuredData} />}
      <SiteHeader jurisdiction={config.code} />

      <section className="hero jurisdiction-hero" id="top">
        <div className="hero-copy">
          <h1>{config.hero.title}</h1>
          <p className="hero-lede">{config.hero.lede}</p>
          <div className="jurisdiction-hero-actions">
            <PrimaryCta jurisdiction={config.code} className="primary-button" />
            <WhatsAppCta jurisdiction={config.code} />
          </div>
        </div>
        <div className="hero-visual" aria-label="FST advisory work">
          <ResponsiveImage
            className="hero-image"
            src={config.visuals.hero}
            alt={config.hero.imageAlt}
            sizes="(max-width: 900px) 100vw, 55vw"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="expertise-section jurisdiction-expertise-section section-shell" aria-labelledby="market-services-title">
        <div className="section-heading section-heading-no-index">
          <h2 id="market-services-title">Accounting, tax, audit, governance and funding support in one delivery plan.</h2>
          <p>Choose the service area closest to the required deliverable. FST keeps related records, review points and professional controls connected.</p>
        </div>
        <SectionVisual src={config.visuals.collaboration} alt="Specialists coordinating connected workstreams around one delivery plan" className="section-banner-visual" />
        <div className="expertise-card-grid expertise-card-grid-compact" aria-label="FST service lines">
          {services.map((service, index) => {
            const ServiceIcon = serviceIcons[index];
            return (
              <Link className={`expertise-card expertise-card-${index % 2 ? "sky" : "lilac"}`} href={marketPath(config.code, `/services/${service.slug}`)} key={service.slug}>
                <div>
                  <span className="expertise-card-heading"><span className="item-icon" aria-hidden="true"><ServiceIcon size={20} weight="regular" /></span></span>
                  <h3>{service.shortTitle}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="text-link">See scope and deliverables</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="audience-section jurisdiction-audience-section section-shell" aria-labelledby="market-audience-title">
        <div className="section-heading compact section-heading-no-index">
          <h2 id="market-audience-title">{config.code === "rw" ? "Support for entrepreneurs, SMEs, cooperatives and NGOs." : "Support for start-ups, SMEs, NGOs and international programmes."}</h2>
        </div>
        <SectionVisual src={config.visuals.operations} alt="Business owners and advisers reviewing operational and financial priorities" className="section-banner-visual" />
        <div className="audience-list">
          {config.audience.map((audience) => <article key={audience.title}><h3>{audience.title}</h3><p>{audience.description}</p></article>)}
        </div>
      </section>

      {config.location && (
        <section className="market-location-section section-shell" aria-labelledby="market-location-title">
          <div className="market-location-copy">
            <p className="eyebrow">{config.location.eyebrow}</p>
            <h2 id="market-location-title">{config.location.headline}</h2>
            <p>{config.location.coverage}</p>
          </div>
          <div className="market-location-card">
            <span>Visit by appointment</span>
            <h3>FST at {config.location.name}</h3>
            <address>{config.location.postalLabel}</address>
            <a href={config.location.mapUrl} target="_blank" rel="noreferrer">View address on Google Maps</a>
          </div>
        </section>
      )}

      <section className="approach-section section-shell" aria-labelledby="market-approach-title">
        <div className="approach-panel">
          <h2 id="market-approach-title">Local rules, source evidence and professional responsibility stay attached to every workstream.</h2>
          <p>Every request carries the applicable rules, currency, records, review points and professional boundary through delivery.</p>
        </div>
        <div className="approach-steps approach-steps-plain">
          <div><h3>Scope in local context</h3><p>Confirm the organisation, decision, applicable rules and evidence before selecting a workstream.</p></div>
          <div><h3>Prepare one controlled file</h3><p>Keep assumptions, records, reviews, approvals and unresolved matters attached to the work.</p></div>
          <div><h3>Confirm responsibility</h3><p>{config.operationalNotice}</p></div>
        </div>
        <SectionVisual src={config.visuals.finance} alt="A delivery plan connecting evidence, review and accountable owners" className="approach-visual" />
      </section>

      <section className="contact-section section-shell" id="contact" aria-labelledby="market-contact-title">
        <div className="contact-copy">
          <h2 id="market-contact-title">Tell us the decision, deadline and records you already have.</h2>
          <p>The first response will confirm the relevant service, missing information, indicative scope and responsible delivery route.</p>
          <SectionVisual src="/fst-consultation.webp" alt="A private first discussion focused on a business decision" className="contact-section-visual" />
        </div>
        <div className="contact-cta-panel">
          <h3>Request a scope review.</h3>
          <p>Choose a scope call or WhatsApp enquiry. FST will confirm fit and professional responsibility before accepting work.</p>
          <div className="contact-cta-actions">
            <PrimaryCta jurisdiction={config.code} className="primary-button" />
            <WhatsAppCta jurisdiction={config.code} />
          </div>
        </div>
      </section>

      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
