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
    title: config.code === "mt" ? "Service Catalogue & Indicative Fees" : "Rwanda Professional Services & Starting Fees",
    description: `Browse FST ${config.name} management, accounting, tax, governance, assurance-readiness and funding services, then build one coordinated request.`,
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
          <h1>Choose the work. See the starting fee. Build one request.</h1>
          <p>{config.code === "rw" ? "Choose individual professional services or open a sector-specific package menu. Build one coordinated scope request around the work you need." : "Choose individual professional services or open a sector-specific package menu, then build one coordinated scope request."}</p>
          <a className="catalogue-hero-link" href="#catalogue-start">Explore services &amp; industry packages <ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <div className="catalogue-hero-pricing">
          <strong>Clear starting fees.</strong>
          <p>{config.code === "rw" ? "Each minimum fee states the entry scope. The final quote adjusts only for volume, condition of records, complexity, deadline, fieldwork and the responsible professional route." : "Transparent starting fees reflect structured preparation while professional judgement, review and accountability remain human."}</p>
          <small>A catalogue selection is a scope request, not an engagement or offer capable of acceptance.</small>
        </div>
      </section>

      <section className="catalogue-trust-rail section-shell" aria-label="How ordering works">
        <article><b>01</b><div><strong>Build an itemised order</strong><span>Click Add on a package or service. Every selection and displayed starting fee stays together in one order.</span></div></article>
        <article><b>02</b><div><strong>Review it in WhatsApp</strong><span>WhatsApp opens with your itemised selection and displayed total already prepared for you to review and send.</span></div></article>
        <article><b>03</b><div><strong>Receive a confirmed scope</strong><span>FST replies with the records required, deadline, final fee, taxes or official costs and responsible professional before accepting the work.</span></div></article>
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
