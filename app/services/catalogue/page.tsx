import { ArrowDown } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ClockCountdown } from "@phosphor-icons/react/dist/ssr/ClockCountdown";
import { CurrencyEur } from "@phosphor-icons/react/dist/ssr/CurrencyEur";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { pageMetadata, siteUrl } from "../../../lib/seo";
import { legalDisclosureReady } from "../../../lib/site-config";
import { catalogueCategories, catalogueServices } from "../../../lib/service-catalogue";
import { BreadcrumbJsonLd, JsonLd } from "../../components/JsonLd";
import { ServiceCatalogue } from "../../components/ServiceCatalogue";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Service Catalogue & Indicative Fees",
  description: "Compare FST audit, accounting, tax, payroll, corporate, management, funding and contract services, then build one coordinated service request.",
  path: "/services/catalogue",
  image: "/catalogue-og.jpg",
  imageAlt: "FST professional services and indicative starting fees.",
});

export default function ServiceCataloguePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Service Catalogue", path: "/services/catalogue" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          "@id": `${siteUrl}/services/catalogue#catalogue`,
          name: "FST professional services catalogue",
          url: `${siteUrl}/services/catalogue`,
          numberOfItems: catalogueServices.length,
          itemListElement: catalogueCategories.map((category) => ({
            "@type": "OfferCatalog",
            name: category.label,
            itemListElement: catalogueServices
              .filter((service) => service.category === category.id)
              .map((service) => ({
                "@type": "Offer",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  price: service.from,
                  priceCurrency: "EUR",
                  valueAddedTaxIncluded: false,
                },
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.description,
                  provider: legalDisclosureReady ? { "@id": `${siteUrl}/#organization` } : undefined,
                },
              })),
          })),
        }}
      />
      <SiteHeader />

      <section className="catalogue-hero">
        <div className="catalogue-hero-copy">
          <h1>Compare professional services and indicative starting fees.</h1>
          <p>Select accounting, tax, audit, company administration, advisory, funding or contract services. Your choices stay in one itemised, non-binding request for scope confirmation.</p>
          <a className="catalogue-hero-link" href="#catalogue-start">
            Browse {catalogueServices.length} named services <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="catalogue-hero-pricing">
          <strong>Indicative fees before you enquire.</strong>
          <p>Each fee is a starting point for the stated scope. FST confirms records, timing, final fees and the responsible professional before work starts.</p>
          <small>Final fees depend on complexity, volume, records, deadlines and professional acceptance.</small>
        </div>
      </section>

      <section className="catalogue-trust-rail section-shell" aria-label="How catalogue pricing works">
        <article>
          <CurrencyEur size={24} aria-hidden="true" />
          <div><strong>Starting fees and exclusions</strong><span>EUR, excluding VAT, official fees and third-party costs unless stated.</span></div>
        </article>
        <article>
          <ClockCountdown size={24} aria-hidden="true" />
          <div><strong>Scope confirmation before work</strong><span>FST confirms fit, inputs, timetable and a fixed quote before work starts.</span></div>
        </article>
        <article>
          <ShieldCheck size={24} aria-hidden="true" />
          <div><strong>Professional review and approval</strong><span>Regulated work remains subject to authority, independence and human approval.</span></div>
        </article>
      </section>

      <div id="catalogue-start">
        <ServiceCatalogue />
      </div>

      <section className="catalogue-method section-shell">
        <div>
          <p className="section-index">How pricing works</p>
          <h2>Efficiency changes the fee, not the responsibility.</h2>
        </div>
        <div className="catalogue-method-copy">
          <p>FST uses specialised professional AI agents for structured research, reconciliation, drafting, evidence indexing and quality checks. A responsible professional still controls scope, material judgements, client approvals and regulated outputs.</p>
          <dl>
            <div><dt>Included</dt><dd>Initial scope check, information request, agreed deliverable and one ordinary clarification round.</dd></div>
            <div><dt>Quoted separately</dt><dd>Urgency, incomplete records, multilingual work, unusual transactions, travel, official fees and third-party specialists.</dd></div>
            <div><dt>Never automatic</dt><dd>External filing, legal notice, audit opinion, tax return, funding submission or other professional submission without recorded human approval.</dd></div>
          </dl>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
