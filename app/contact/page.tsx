import { pageMetadata } from "../../lib/seo";
import { PrimaryCta } from "../components/PrimaryCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLink } from "../components/TrackedLink";
import { siteConfig } from "../../lib/site-config";

export const metadata = pageMetadata({ title: "Contact", description: "Contact FST by phone or WhatsApp, or book a Google Calendar meeting.", path: "/contact" });

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="contact-page section-shell">
        <div className="contact-page-intro">
          <p className="eyebrow">Start with the issue</p>
          <h1>Tell us what needs to move.</h1>
          <p>Use email, phone, WhatsApp or the meeting route. We will use the first conversation to identify the right FST discipline and a practical next step.</p>
          <div className="contact-options" aria-label="Direct contact options">
            <div className="contact-option-static"><span>Write</span><strong>{siteConfig.email}</strong></div>
            <TrackedLink href={`tel:${siteConfig.phoneE164}`} event="contact_phone_click"><span>Speak</span><strong>{siteConfig.phoneDisplay}</strong></TrackedLink>
            <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer"><span>Message</span><strong>Open FST WhatsApp</strong></TrackedLink>
          </div>
          <img src="/fst-consultation.webp" alt="A private first conversation with an FST adviser" width="1536" height="1024" loading="lazy" decoding="async" />
        </div>
        <aside className="contact-page-form contact-booking-card" aria-labelledby="contact-booking-title">
          <p className="eyebrow">Schedule a first discussion</p>
          <h2 id="contact-booking-title">Reserve a focused 45 minutes.</h2>
          <p>Select the most relevant topic and prepare a calendar invitation for the time you choose.</p>
          <PrimaryCta className="primary-button" />
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
