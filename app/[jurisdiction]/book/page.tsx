import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJurisdiction, marketPath } from "../../../lib/jurisdictions";
import { jurisdictionPageMetadata } from "../../../lib/seo";
import { BookingForm } from "../../components/BookingForm";
import { BreadcrumbJsonLd } from "../../components/JsonLd";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";

type PageProps = { params: Promise<{ jurisdiction: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getJurisdiction((await params).jurisdiction);
  return config ? jurisdictionPageMetadata({ jurisdiction: config.code, title: `Book an FST ${config.name} Meeting`, description: `Request a focused FST meeting routed to the ${config.name} desk and scheduled in ${config.timezone}.`, path: "/book" }) : {};
}

export default async function JurisdictionBookPage({ params }: PageProps) {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) notFound();
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: marketPath(config.code) }, { name: "Book a Scope Call", path: marketPath(config.code, "/book") }]} />
      <SiteHeader jurisdiction={config.code} />
      <section className="booking-page section-shell">
        <div className="booking-intro">
          <h1>Request a 30- or 60-minute FST scope call.</h1>
          <p>Choose a time to discuss the required service, deliverable, deadline and records. The request is checked against the {config.name} calendar and working timezone.</p>
          <div className="booking-confirmations"><span>{config.name} route confirmed</span><span>Requested time checked</span><span>Provider and engagement confirmed separately</span></div>
          {config.whatsappUrl && <p className="booking-alternative">Need only a short first answer? <TrackedLink href={config.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">Ask FST on WhatsApp</TrackedLink>.</p>}
        </div>
        <div className="booking-panel"><BookingForm jurisdiction={config.code} /></div>
      </section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
