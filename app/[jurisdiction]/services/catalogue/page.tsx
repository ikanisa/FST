import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { getJurisdiction, marketPath } from "../../../../lib/jurisdictions";
import { catalogueCategories, catalogueServices } from "../../../../lib/service-catalogue";
import { rwandaCatalogueCategories, rwandaCatalogueServices } from "../../../../lib/rwanda-catalogue";
import { jurisdictionPageMetadata, siteUrl } from "../../../../lib/seo";
import { BreadcrumbJsonLd, JsonLd } from "../../../components/JsonLd";
import { ServiceCatalogue } from "../../../components/ServiceCatalogue";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";

type PageProps = { params: Promise<{ jurisdiction: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) return {};
  return jurisdictionPageMetadata({
    jurisdiction: config.code,
    title: config.code === "mt" ? "Malta Service Catalogue & Indicative Fees" : "Rwanda Professional Services & Starting Fees",
    description: config.code === "mt"
      ? "Browse Malta-focused FST management, accounting, tax, governance, assurance-readiness and funding services, then build one coordinated request."
      : "Browse Rwanda-focused FST management, accounting, tax, governance, assurance-readiness and funding services, then build one coordinated request.",
    path: "/services/catalogue",
    image: "/catalogue-og.jpg",
  });
}

export default async function JurisdictionCataloguePage({ params }: PageProps) {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) notFound();
  const services = config.code === "mt" ? catalogueServices : rwandaCatalogueServices;
  const categories = config.code === "mt" ? catalogueCategories : rwandaCatalogueCategories;
  const activeCategories = categories.filter((category) => services.some((service) => service.category === category.id));
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[
        { name: "Home", path: marketPath(config.code) },
        { name: "Services", path: marketPath(config.code, "/services") },
        { name: "Service Catalogue", path: marketPath(config.code, "/services/catalogue") },
      ]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "@id": `${siteUrl}${marketPath(config.code, "/services/catalogue")}#catalogue`,
        name: `FST ${config.name} professional services catalogue`,
        url: `${siteUrl}${marketPath(config.code, "/services/catalogue")}`,
        numberOfItems: services.length,
        itemListElement: activeCategories.map((category) => ({
          "@type": "OfferCatalog",
          name: category.label,
          itemListElement: services.filter((service) => service.category === category.id).map((service) => ({
            "@type": "Offer",
            ...(service.from !== null ? { priceSpecification: { "@type": "PriceSpecification", price: service.from, priceCurrency: config.currency, valueAddedTaxIncluded: false } } : {}),
            itemOffered: { "@type": "Service", name: service.title, description: service.description, areaServed: config.country },
          })),
        })),
      }} />
      <SiteHeader jurisdiction={config.code} />

      <section className="catalogue-hero">
        <div className="catalogue-hero-copy">
          <h1>Compare professional services and starting fees.</h1>
          <p>Select individual services or a business-type package. Your choices stay in one itemised, non-binding request for FST to confirm scope, records, responsibility and final fees.</p>
          <a className="catalogue-hero-link" href="#catalogue-start">Browse packages and individual services <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <div className="catalogue-hero-pricing">
          <strong>Indicative fees before you enquire.</strong>
          <p>{config.code === "rw" ? "Each minimum fee covers the stated entry scope. FST confirms any change for volume, record quality, complexity, deadline, fieldwork or professional requirements before work starts." : "Each fee is a starting point for the stated scope. FST confirms records, timing, final fees and the responsible professional before work starts."}</p>
        </div>
      </section>

      <section className="catalogue-trust-rail section-shell" aria-label="How to prepare a service request">
        <article><b>01</b><div><strong>Add services to one request</strong><span>Use Add to request on each relevant package or individual service.</span></div></article>
        <article><b>02</b><div><strong>Check items and starting total</strong><span>Review every selected item and displayed fee before opening WhatsApp.</span></div></article>
        <article><b>03</b><div><strong>Send for scope confirmation</strong><span>FST confirms required records, timing, final fees, charges and the responsible professional before work starts.</span></div></article>
      </section>

      <div id="catalogue-start">
        <ServiceCatalogue
          jurisdiction={config.code}
          services={services}
          categories={activeCategories}
          currency={config.currency}
          currencyLocale={config.currencyLocale}
          serviceOrderWhatsappUrl={config.serviceOrderWhatsappUrl}
          serviceOrderWhatsappDisplay={config.serviceOrderWhatsappDisplay}
        />
      </div>

      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
