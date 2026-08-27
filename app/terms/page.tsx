import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Website Terms of Use",
  description: "Terms governing use of the FST website, general information, meeting requests and non-binding professional-service enquiries.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Website terms", path: "/terms" }]} />
      <SiteHeader />
      <article className="legal-page section-shell">
        <header className="legal-page-hero">
          <p className="eyebrow">Website terms</p>
          <h1>A request is not an engagement.</h1>
          <p>These terms govern access to the FST website, its general content, meeting requests and catalogue request builder. Signed engagement terms govern professional work.</p>
          <small>Effective 3 August 2026</small>
        </header>
        <div className="legal-copy">
          <section><h2>Website information</h2><p>Website content is general information, not accounting, audit, tax, legal, investment or other professional advice. Do not rely on it as a substitute for advice based on your facts.</p></section>
          <section><h2>No client relationship</h2><p>Viewing the site, selecting services, sending a WhatsApp request or requesting a meeting does not create a client relationship or reserve professional capacity. An engagement begins only when the legal provider, responsible professional, scope, fee, responsibilities and written terms have been agreed.</p></section>
          <section><h2>Authorised services</h2><p>All services published on this website are authorised FST service lines. Where a service requires a specific professional warrant or regulated firm, FST delivers it through the applicable authorised provider identified for the engagement.</p></section>
          <section><h2>Indicative fees</h2><p>Catalogue prices are starting points for straightforward work with complete information. They exclude VAT, official charges, disbursements and third-party costs unless stated. A final quote follows scope and acceptance review.</p></section>
          <section><h2>Acceptable use</h2><p>Use the website lawfully. Do not interfere with its operation, attempt unauthorised access, introduce harmful code, misuse scheduling controls, harvest content or submit information you are not authorised to share.</p></section>
          <section><h2>Intellectual property</h2><p>Unless stated otherwise, FST or its licensors own the website branding, design and content. Reasonable internal reference is permitted; reproduction or commercial distribution requires permission.</p></section>
          <section><h2>External services</h2><p>WhatsApp, Google Calendar and other external services have their own availability, terms and privacy practices. Opening those services is your choice.</p></section>
          <section><h2>Availability and responsibility</h2><p>The website may change and may occasionally be unavailable. Nothing here excludes responsibility that cannot lawfully be excluded. Professional responsibility is governed by the applicable engagement and professional rules.</p></section>
          <section><h2>Contact</h2><p>See <Link href="/legal-information">legal and professional information</Link>, the <Link href="/privacy">privacy notice</Link> or use the <Link href="/contact">contact route</Link>.</p></section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
