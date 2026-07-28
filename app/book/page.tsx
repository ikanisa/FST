import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/site-config";
import { BookingForm } from "../components/BookingForm";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLink } from "../components/TrackedLink";
import { BreadcrumbJsonLd } from "../components/JsonLd";

export const metadata = pageMetadata({
  title: "Book an FST Advisory Meeting",
  description: "Request a focused FST advisory meeting about management, tax, accounting, corporate, loan application or funding application support.",
  path: "/book",
});

export default function BookPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Book a Meeting", path: "/book" }]} />
      <SiteHeader />
      <section className="booking-page section-shell">
        <div className="booking-intro">
          <p className="eyebrow">FST scheduling desk</p>
          <h1>Set aside time for the issue in front of you.</h1>
          <p>Request a focused working conversation. The selected duration and slot are checked before a calendar invitation and meeting link are created.</p>
          <div className="booking-confirmations">
            <span>Requested slot checked</span>
            <span>Meeting link added when confirmed</span>
            <span>Both parties receive the invitation</span>
          </div>
          <p className="booking-alternative">Need a shorter first contact? <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">Open the FST WhatsApp channel</TrackedLink>.</p>
        </div>
        <div className="booking-panel"><BookingForm /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
