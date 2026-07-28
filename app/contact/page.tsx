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
          <p className="eyebrow">Contact FST</p>
          <h1>Choose the right way to connect.</h1>
          <p>Call, use the official WhatsApp contact, or book a focused Google Meet conversation through our native Calendar flow.</p>
          <div className="contact-options" aria-label="Direct contact options">
            <div className="contact-option-static"><span>Email</span><strong>{siteConfig.email}</strong></div>
            <TrackedLink href={`tel:${siteConfig.phoneE164}`} event="contact_phone_click"><span>Call</span><strong>{siteConfig.phoneDisplay}</strong></TrackedLink>
            <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>Message our team</strong></TrackedLink>
          </div>
          <img src="/contact-conversation.webp" alt="A senior adviser listening carefully during a client conversation" width="1600" height="1000" loading="lazy" decoding="async" />
        </div>
        <aside className="contact-page-form contact-booking-card" aria-labelledby="contact-booking-title">
          <p className="eyebrow">Book a Meeting</p>
          <h2 id="contact-booking-title">Choose a time that works.</h2>
          <p>The booking flow checks availability, creates Google Meet and sends the invitation to FST’s approved scheduling contacts.</p>
          <PrimaryCta className="primary-button" />
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
