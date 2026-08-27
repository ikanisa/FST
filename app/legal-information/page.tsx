import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/site-config";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Legal & Professional Information",
  description: "Legal-provider, contact and professional-authorisation information for FST website requests and regulated professional engagements.",
  path: "/legal-information",
});

const disclosures = [
  ["Legal name", siteConfig.legalName],
  ["Company registration", siteConfig.companyRegistrationNumber],
  ["VAT number", siteConfig.vatNumber],
  ["Registered address", siteConfig.registeredAddress],
  ["Formal contact", siteConfig.contactEmail],
  ["Complaints contact", siteConfig.complaintsEmail],
  ["Accountancy Board registration", siteConfig.accountancyBoardRegistration],
  ["Responsible principal", siteConfig.responsiblePrincipal],
  ["Principal warrant", siteConfig.principalWarrantNumber],
].filter((entry): entry is [string, string] => Boolean(entry[1]));

export default function LegalInformationPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Legal information", path: "/legal-information" }]} />
      <SiteHeader />
      <article className="legal-page section-shell">
        <header className="legal-page-hero">
          <p className="eyebrow">Legal and professional information</p>
          <h1>Know who is responsible before work starts.</h1>
          <p>FST is the professional-services brand of {siteConfig.legalName} within the IKANISA portfolio. Accounting, tax, management advisory and related services are available as described across the website.</p>
          <small>Last reviewed 27 August 2026</small>
        </header>

        {disclosures.length > 0 && (
          <section className="legal-disclosure" aria-labelledby="published-details-title">
            <h2 id="published-details-title">Published provider details</h2>
            <dl>
              {disclosures.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </section>
        )}

        <div className="legal-copy">
          <section>
            <h2>FST and IKANISA</h2>
            <p>{siteConfig.portfolioRelationship} This relationship does not transfer professional judgement, signing authority or client approval to an AI agent.</p>
          </section>
          <section>
            <h2>Regulated work</h2>
            <p>All services published on this website are authorised FST service lines. Statutory audit, regulated assurance, company-service-provider and reserved legal work are delivered through the applicable authorised or warranted professional or firm, with the responsible provider identified in the engagement.</p>
            <p>Accounting, tax and management-advisory services are provided by FST. Independence, conflict, competence and formal engagement-acceptance checks are applied where required by the service.</p>
          </section>
          <section>
            <h2>Requests, prices and engagements</h2>
            <p>Catalogue selections and meeting requests are non-binding requests for scope review. Indicative starting fees are not offers capable of acceptance. Work starts only after the provider, responsible professional, scope, fee, responsibilities and engagement terms are confirmed in writing.</p>
          </section>
          <section>
            <h2>Questions or complaints</h2>
            <p>{siteConfig.complaintsEmail ? <>Send a formal complaint to <a href={`mailto:${siteConfig.complaintsEmail}`}>{siteConfig.complaintsEmail}</a>.</> : <>Use the <Link href="/contact">contact page</Link> to request the applicable complaints route. The route depends on the service and responsible provider.</>}</p>
          </section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
