import { pageMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/site-config";
import { BookingForm } from "../components/BookingForm";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { TrackedLink } from "../components/TrackedLink";

export const metadata = pageMetadata({
  title: "Book a meeting",
  description: "Request an FST advisory meeting through Google Calendar and Google Meet.",
  path: "/book",
});

export default function BookPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="booking-page section-shell">
        <div className="booking-intro">
          <p className="eyebrow">Google Calendar · Google Meet</p>
          <h1>Choose a time to make the next decision clearer.</h1>
          <p>Request a 30 or 60-minute advisory conversation. We check the selected time before creating a calendar invitation and Google Meet.</p>
          <div className="booking-confirmations">
            <span>Calendar availability checked</span>
            <span>Google Meet created on confirmation</span>
            <span>Invitation sent to you and FST</span>
          </div>
          <p className="booking-alternative">Prefer a quick message? <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">Contact FST on WhatsApp</TrackedLink>.</p>
        </div>
        <div className="booking-panel"><BookingForm /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
