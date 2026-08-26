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
      <BreadcrumbJsonLd items={[{ name: "Home", path: marketPath(config.code) }, { name: "Book a Meeting", path: marketPath(config.code, "/book") }]} />
      <SiteHeader jurisdiction={config.code} />
      <section className="booking-page section-shell">
        <div className="booking-intro">
          <h1>Set aside time for the issue in front of you.</h1>
          <p>Request a focused working conversation. The request is routed automatically, checked against the configured calendar and handled in the appropriate working timezone.</p>
          <div className="booking-confirmations"><span>Request route validated</span><span>Requested slot checked</span><span>Responsible provider confirmed separately</span></div>
          {config.whatsappUrl && <p className="booking-alternative">Need a shorter first contact? <TrackedLink href={config.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">Open the FST WhatsApp channel</TrackedLink>.</p>}
        </div>
        <div className="booking-panel"><BookingForm jurisdiction={config.code} /></div>
      </section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
