import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/site-config";
import { BookingForm } from "../components/BookingForm";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLink } from "../components/TrackedLink";
import { BreadcrumbJsonLd } from "../components/JsonLd";

export const metadata = pageMetadata({
  title: "Book an FST Advisory Meeting",
  description: "Request a focused FST meeting about management, audit, tax, accounting, corporate or consolidated loan and funding application support.",
  path: "/book",
});

export default function BookPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Book a Scope Call", path: "/book" }]} />
      <SiteHeader />
      <section className="booking-page section-shell">
        <div className="booking-intro">
          <p className="eyebrow">FST scheduling desk</p>
          <h1>Request a 30- or 60-minute FST scope call.</h1>
          <p>Choose a time to discuss the required service, deliverable, deadline and records. The selected slot is checked before a calendar invitation and meeting link are created.</p>
          <div className="booking-confirmations">
            <span>Requested slot checked</span>
            <span>Meeting link added when confirmed</span>
            <span>Both parties receive the invitation</span>
          </div>
          <p className="booking-alternative">Need only a short first answer? <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">Ask FST on WhatsApp</TrackedLink>.</p>
        </div>
        <div className="booking-panel"><BookingForm /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
