import { pageMetadata } from "../../lib/seo";
import { PrimaryCta } from "../components/PrimaryCta";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLink } from "../components/TrackedLink";
import { siteConfig } from "../../lib/site-config";

export const metadata = pageMetadata({ title: "Contact", description: "Contact FST on WhatsApp or book a Google Calendar meeting.", path: "/contact" });

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="contact-page section-shell">
        <div className="contact-page-intro">
          <p className="eyebrow">Start with the issue</p>
          <h1>Tell us what needs to move.</h1>
          <p>Use WhatsApp or the meeting route. We will use the first conversation to identify the right FST service and a practical next step.</p>
          <div className="contact-options" aria-label="Direct contact options">
            <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{siteConfig.whatsappDisplay}</strong></TrackedLink>
          </div>
          <img src="/fst-consultation.webp" alt="A private first conversation with an FST adviser" width="1536" height="1024" loading="lazy" decoding="async" />
        </div>
        <aside className="contact-page-form contact-booking-card" aria-labelledby="contact-booking-title">
          <p className="eyebrow">Schedule a first discussion</p>
          <h2 id="contact-booking-title">Reserve a focused working session.</h2>
          <p>Select the most relevant topic and prepare a calendar invitation for the time you choose.</p>
          <PrimaryCta className="primary-button" />
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
