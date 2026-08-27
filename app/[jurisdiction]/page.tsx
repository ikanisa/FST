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
    title: config.code === "rw" ? "Professional Services in Rwanda" : `FST ${config.name} | Make the next move workable`,
    description: config.code === "rw"
      ? "FST provides management, accounting, tax readiness, governance and funding support from Norrsken House Kigali to organisations across Rwanda."
      : config.hero.lede,
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
  } : undefined;

  return (
    <main id="main-content" tabIndex={-1}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}${marketPath(config.code)}#webpage`,
        name: `FST ${config.name}`,
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
          <h2 id="market-services-title">One working plan. The right workstreams.</h2>
          <p>Shared FST delivery standards sit underneath services, terminology, evidence and professional controls selected automatically for the request.</p>
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
                <span className="text-link">View service</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="audience-section jurisdiction-audience-section section-shell" aria-labelledby="market-audience-title">
        <div className="section-heading compact section-heading-no-index">
          <h2 id="market-audience-title">Built around organisations carrying the decision.</h2>
        </div>
        <SectionVisual src={config.visuals.operations} alt="Business owners and advisers reviewing operational and financial priorities" className="section-banner-visual" />
        <div className="audience-list">
          {config.audience.map((audience) => <article key={audience.title}><h3>{audience.title}</h3><p>{audience.description}</p></article>)}
        </div>
      </section>

      {config.location && (
        <section className="market-location-section section-shell" aria-labelledby="market-location-title">
          <div className="market-location-copy">
            <p className="eyebrow">Kigali office · nationwide service</p>
            <h2 id="market-location-title">Meet us at Norrsken House or work with us from anywhere in Rwanda.</h2>
            <p>{config.location.coverage}</p>
          </div>
          <div className="market-location-card">
            <span>Visit by appointment</span>
            <h3>{config.location.name}</h3>
            <address>{config.location.postalLabel}</address>
            <a href={config.location.mapUrl} target="_blank" rel="noreferrer">View address on Google Maps</a>
          </div>
        </section>
      )}

      <section className="approach-section section-shell" aria-labelledby="market-approach-title">
        <div className="approach-panel">
          <h2 id="market-approach-title">Context is part of the work—not a label added at the end.</h2>
          <p>Every request carries the applicable rules, currency, operational destination and professional boundary through the complete workflow.</p>
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
          <h2 id="market-contact-title">Bring the decision—not a perfect brief.</h2>
          <p>Choose a route, identify the issue and tell us the deadline. The first response will confirm fit, scope and the responsible delivery route.</p>
          <SectionVisual src="/fst-consultation.webp" alt="A private first discussion focused on a business decision" className="contact-section-visual" />
        </div>
        <div className="contact-cta-panel">
          <h3>Start with the issue in front of you.</h3>
          <p>Requests are routed automatically to the configured intake, scheduling and professional-review path.</p>
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
