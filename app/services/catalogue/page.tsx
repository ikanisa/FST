import { ArrowDown } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ClockCountdown } from "@phosphor-icons/react/dist/ssr/ClockCountdown";
import { CurrencyEur } from "@phosphor-icons/react/dist/ssr/CurrencyEur";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { pageMetadata, siteUrl } from "../../../lib/seo";
import { catalogueCategories, catalogueServices } from "../../../lib/service-catalogue";
import { BreadcrumbJsonLd, JsonLd } from "../../components/JsonLd";
import { ServiceCatalogue } from "../../components/ServiceCatalogue";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Service Catalogue & Indicative Fees",
  description: "Compare FST audit, accounting, tax, payroll, corporate, management, funding and contract services, then build one coordinated order enquiry.",
  path: "/services/catalogue",
  image: "/catalogue-og.jpg",
  imageAlt: "FST Service Catalogue — choose the work, see the starting fee.",
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
                  provider: { "@id": `${siteUrl}/#organization` },
                },
              })),
          })),
        }}
      />
      <SiteHeader />

      <section className="catalogue-hero">
        <div className="catalogue-hero-copy">
          <p className="eyebrow">FST service catalogue <span>·</span> Indicative fees</p>
          <h1>Choose the work. See the starting fee. Build one order.</h1>
          <p>Browse individual services across audit, accounting, tax, company administration, management, funding and contracts. Add everything you need, then send one coordinated brief.</p>
          <a className="catalogue-hero-link" href="#catalogue-start">
            Explore {catalogueServices.length} services <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="catalogue-hero-pricing">
          <span className="catalogue-hero-kicker">AI-enabled professional delivery</span>
          <strong>≈50% less</strong>
          <p>Our standard starting fees are designed around roughly half the conventional full-service benchmark for comparable routine scope.</p>
          <small>Final fees depend on complexity, volume, records, deadlines and professional acceptance.</small>
        </div>
      </section>

      <section className="catalogue-trust-rail section-shell" aria-label="How catalogue pricing works">
        <article>
          <CurrencyEur size={24} aria-hidden="true" />
          <div><strong>Clear “From” fees</strong><span>EUR, excluding VAT, official fees and third-party costs unless stated.</span></div>
        </article>
        <article>
          <ClockCountdown size={24} aria-hidden="true" />
          <div><strong>Free scope check</strong><span>We confirm fit, inputs, timetable and a fixed quote before work starts.</span></div>
        </article>
        <article>
          <ShieldCheck size={24} aria-hidden="true" />
          <div><strong>Professional control</strong><span>Regulated work remains subject to authority, independence and human approval.</span></div>
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

      <section className="catalogue-boundaries section-shell" aria-labelledby="catalogue-boundaries-title">
        <div>
          <p className="section-index">Professional boundaries</p>
          <h2 id="catalogue-boundaries-title">The right authority stays attached to the work.</h2>
        </div>
        <div className="catalogue-boundary-list">
          {catalogueCategories.map((category) => (
            "regulatedNote" in category ? (
              <article key={category.id}>
                <strong>{category.label}</strong>
                <p>{category.regulatedNote}</p>
              </article>
            ) : null
          ))}
        </div>
      </section>

      <section className="catalogue-disclaimer section-shell">
        <p><strong>Indicative fee notice.</strong> Prices are starting points for straightforward work with complete information and are not offers capable of acceptance. VAT, registry charges, disbursements and third-party fees are excluded unless expressly stated. FST confirms the responsible professional, engagement terms and fixed quote after reviewing scope. The ≈50% comparison is a pricing design target against comparable conventional delivery, not a guarantee against every market provider or every engagement.</p>
      </section>

      <SiteFooter />
    </main>
  );
}
