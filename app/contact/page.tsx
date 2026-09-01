import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { PrimaryCta } from "../components/PrimaryCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLink } from "../components/TrackedLink";
import { siteConfig } from "../../lib/site-config";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { BreadcrumbJsonLd } from "../components/JsonLd";

export const metadata = pageMetadata({ title: "Contact FST Advisory", description: "Contact FST on WhatsApp or book a focused meeting about management, audit, tax, accounting, corporate, loan or funding application support.", path: "/contact" });

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <SiteHeader />
      <section className="contact-page section-shell">
        <div className="contact-page-intro">
          <p className="eyebrow">Service and project enquiries</p>
          <h1>Request a scope review for a service, filing or business project.</h1>
          <p>Describe the required deliverable, deadline and records already available. FST will confirm fit, missing information and the responsible delivery route.</p>
          <div className="contact-options" aria-label="Direct contact options">
            <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer"><span>WhatsApp · general enquiries</span><strong>{siteConfig.whatsappDisplay}</strong></TrackedLink>
            {siteConfig.contactEmail && <a href={`mailto:${siteConfig.contactEmail}`}><span>Email enquiries</span><strong>{siteConfig.contactEmail}</strong></a>}
            {siteConfig.registeredAddress && <div><span>Registered address</span><strong>{siteConfig.registeredAddress}</strong></div>}
          </div>
          <p className="contact-legal-note">Catalogue requests use a separate service-request channel at {siteConfig.serviceOrderWhatsappDisplay}. See <Link href="/legal-information">legal and professional-provider information</Link> before sending confidential material.</p>
          <ResponsiveImage src="/fst-consultation.webp" alt="A private first conversation with an FST adviser" sizes="(max-width: 900px) 100vw, 60vw" loading="lazy" decoding="async" />
        </div>
        <aside className="contact-page-form contact-booking-card" aria-labelledby="contact-booking-title">
          <p className="eyebrow">Book a scope call</p>
          <h2 id="contact-booking-title">Discuss the required service, deadline and available records.</h2>
          <p>Select the closest service topic and prepare a calendar invitation for the time you choose.</p>
          <PrimaryCta className="primary-button" />
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
