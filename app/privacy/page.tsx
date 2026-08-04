import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { legalDisclosureReady, siteConfig } from "../../lib/site-config";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Privacy & Cookie Notice",
  description: "How FST handles website enquiries, meeting requests, service selections, optional analytics and associated personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Privacy & cookies", path: "/privacy" }]} />
      <SiteHeader />
      <article className="legal-page section-shell">
        <header className="legal-page-hero">
          <p className="eyebrow">Privacy and cookies</p>
          <h1>Use only the information needed for a first response.</h1>
          <p>This notice explains the current FST website data flow. Do not send confidential records, identity documents, payment credentials, health information or special-category data through a website form or WhatsApp enquiry.</p>
          <small>Effective 3 August 2026</small>
        </header>

        {!legalDisclosureReady && (
          <aside className="legal-status-warning" aria-labelledby="privacy-controller-title">
            <h2 id="privacy-controller-title">Controller disclosure is awaiting approved legal details.</h2>
            <p>The public legal name, registered address and formal privacy email are not yet configured. Until they appear on the <Link href="/legal-information">legal-information page</Link>, limit any request to basic contact and scheduling details.</p>
          </aside>
        )}

        <div className="legal-copy">
          <section id="controller"><h2>Controller and contact</h2><p>{siteConfig.legalName ? <>{siteConfig.legalName} is identified as the controller for the website data described here. {siteConfig.registeredAddress && <>Its registered address is {siteConfig.registeredAddress}. </>}{siteConfig.contactEmail && <>Privacy requests may be sent to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</>}</> : <>FST is the website-facing service name. The responsible legal operator must be published on the <Link href="/legal-information">legal-information page</Link> before this notice is treated as a complete controller disclosure.</>}</p></section>
          <section id="information"><h2>Information collected</h2><p>The booking route may collect your name, business email, organisation, requested time, meeting duration and the context you choose to provide. The catalogue keeps selected services in the browser while building a WhatsApp request. Hosting and security systems may process IP address, device, browser, request and diagnostic information.</p></section>
          <section id="purposes"><h2>Purposes and lawful bases</h2><p>Information is used to respond to a request, assess service fit, arrange a meeting, protect the website, prevent misuse and meet applicable legal or professional obligations. Depending on the request, processing may be necessary to take steps at your request, based on legitimate interests in operating a secure enquiry channel, based on consent for optional analytics, or required by law.</p></section>
          <section id="recipients"><h2>Recipients and external services</h2><p>Cloudflare supports hosting, security and performance. Google services may process scheduling information when a calendar invitation or meeting is created. WhatsApp and Meta process information when you choose to open or send a WhatsApp request. Google Analytics is loaded only when configured and after the visitor permits optional measurement.</p></section>
          <section id="transfers"><h2>International transfers</h2><p>Some technology providers may process information outside Malta or the EEA. The responsible operator must use the safeguards required for the provider and transfer involved. External services also apply their own privacy terms.</p></section>
          <section id="retention"><h2>Retention and security</h2><p>Initial enquiry information should be kept only while it is needed to respond, manage reasonable follow-up, protect the service or meet a legal requirement. If a request becomes an engagement, the written engagement and applicable professional obligations determine the longer record-retention period. Access should remain limited to people and providers who need it.</p></section>
          <section id="cookies"><h2>Cookies and local storage</h2><p>The website uses browser local storage to remember an analytics choice. Optional Google Analytics loads only after permission when a measurement identifier is configured. Essential hosting, security and network measurement may operate independently of that optional analytics choice.</p></section>
          <section id="rights"><h2>Your rights</h2><p>Subject to applicable law, you may request access, correction, erasure, restriction, portability or object to processing, and may withdraw consent where consent is the basis. You may also complain to Malta’s <a href="https://idpc.org.mt/" target="_blank" rel="noreferrer">Information and Data Protection Commissioner</a>.</p></section>
          <section id="updates"><h2>Updates and contact</h2><p>This notice will be updated when approved controller details, providers or data flows change. Use the <Link href="/contact">contact page</Link> for a current privacy contact route.</p></section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
