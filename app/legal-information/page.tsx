import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { legalDisclosureReady, siteConfig } from "../../lib/site-config";
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
          <p>FST is a website-facing service name within the IKANISA portfolio. A website request does not itself appoint an auditor, accountant, advocate, company-service provider or other professional.</p>
          <small>Last reviewed 3 August 2026</small>
        </header>

        {!legalDisclosureReady && (
          <aside className="legal-status-warning" aria-labelledby="legal-status-title">
            <h2 id="legal-status-title">Formal provider disclosure is an activation requirement.</h2>
            <p>Verified legal-entity, registration, address and professional-authorisation details have not yet been approved for publication. Until they are displayed here and identified in a written response, do not treat FST as an appointed or authorised provider and do not send confidential records.</p>
          </aside>
        )}

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
            <p>Statutory audit and regulated assurance may proceed only through the Malta-authorised auditor or audit firm identified for the engagement, after independence, conflict, competence and acceptance checks. Company-service-provider and Malta-law reserved activities follow their own authorisation requirements.</p>
            <p>If a responsible professional or authorised entity is not identified in writing, the request remains an initial enquiry and no regulated engagement has been accepted.</p>
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
