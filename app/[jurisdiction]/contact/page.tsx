import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJurisdiction, marketPath } from "../../../lib/jurisdictions";
import { jurisdictionPageMetadata, siteUrl } from "../../../lib/seo";
import { BreadcrumbJsonLd, JsonLd } from "../../components/JsonLd";
import { EnquiryForm } from "../../components/EnquiryForm";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";
import { catalogueServices } from "../../../lib/service-catalogue";
import { rwandaCatalogueServices } from "../../../lib/rwanda-catalogue";
import { getSectorCatalogueEntry, getSectorCatalogueTitle, getSectorPackage } from "../../../lib/sector-packages";

type PageProps = {
  params: Promise<{ jurisdiction: string }>;
  searchParams: Promise<{
    services?: string | string[];
    package?: string | string[];
    bundle?: string | string[];
    version?: string | string[];
    locations?: string | string[];
    employees?: string | string[];
    workload?: string | string[];
    records?: string | string[];
    regulatedEvent?: string | string[];
    addons?: string | string[];
    quote?: string | string[];
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getJurisdiction((await params).jurisdiction);
  return config ? jurisdictionPageMetadata({
    jurisdiction: config.code,
    title: config.location ? `Contact FST at ${config.location.name}` : `Contact FST ${config.name}`,
    description: config.location
      ? `Contact FST for management, accounting, tax readiness, governance and funding support at ${config.location.name} or online across ${config.country}.`
      : `Send a controlled enquiry to the FST ${config.name} desk or request a focused working meeting.`,
    path: "/contact",
  }) : {};
}

export default async function JurisdictionContactPage({ params, searchParams }: PageProps) {
  const config = getJurisdiction((await params).jurisdiction);
  if (!config) notFound();
  const query = await searchParams;
  const serviceValue = query.services;
  const requestedServiceIds = (Array.isArray(serviceValue) ? serviceValue.join(",") : serviceValue || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 30);
  const availableServices = config.code === "rw" ? rwandaCatalogueServices : catalogueServices;
  const selectedServices = requestedServiceIds.flatMap((id) => {
    const service = availableServices.find((candidate) => candidate.id === id);
    return service ? [service] : [];
  });
  const initialServiceIds = selectedServices.map((service) => service.id);
  const initialServiceLabels = selectedServices.map((service) => service.title);
  const scalar = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] || "" : value || "";
  const packageItem = getSectorPackage(config.code, scalar(query.package));
  const packageVersionMatches = packageItem && scalar(query.version) === packageItem.version;
  const catalogueEntry = packageVersionMatches ? getSectorCatalogueEntry(packageItem, scalar(query.bundle)) : undefined;
  const requestedAddonIds = scalar(query.addons).split(",").map((value) => value.trim()).filter(Boolean);
  const selectedAddOns = packageVersionMatches ? packageItem.addOns.filter((addOn) => requestedAddonIds.includes(addOn.id)) : [];
  const quoteValue = scalar(query.quote);
  const quoteStatus: "indicative_fit" | "manual_review_required" | "scope_requested" =
    quoteValue === "manual_review_required" || quoteValue === "indicative_fit" ? quoteValue : "scope_requested";
  const packageContext = packageVersionMatches ? {
    id: packageItem.id,
    slug: packageItem.slug,
    version: packageItem.version,
    title: getSectorCatalogueTitle(packageItem),
    catalogueEntryId: catalogueEntry?.id || "",
    catalogueEntryTitle: catalogueEntry?.title || "",
    addonIds: selectedAddOns.map((addOn) => addOn.id),
    addonLabels: selectedAddOns.map((addOn) => addOn.title),
    atomicServiceIds: catalogueEntry ? catalogueEntry.atomicServiceIds : packageItem.atomicServiceIds,
    scopeAnswers: {
      locations: scalar(query.locations).slice(0, 3),
      employees: scalar(query.employees).slice(0, 20),
      workload: scalar(query.workload).slice(0, 20),
      records: scalar(query.records).slice(0, 20),
      regulatedEvent: scalar(query.regulatedEvent) === "yes",
    },
    quoteStatus,
  } : undefined;

  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: marketPath(config.code) }, { name: "Contact", path: marketPath(config.code, "/contact") }]} />
      {config.location && <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${siteUrl}${marketPath(config.code, "/contact")}#contact-page`,
        name: `Contact FST at ${config.location.name}`,
        about: { "@id": `${siteUrl}${marketPath(config.code)}#professional-service` },
      }} />}
      <SiteHeader jurisdiction={config.code} />
      <section className="contact-page section-shell jurisdiction-contact-page">
        <div className="contact-page-intro">
          <h1>Request a scope review for a service, filing or business project.</h1>
          <p>Describe the required deliverable, deadline and records already available. FST will confirm fit, missing information, indicative scope and the responsible delivery route.</p>
          <div className="contact-options" aria-label="Direct contact options">
            {config.whatsappUrl && <TrackedLink href={config.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer"><span>WhatsApp enquiries</span><strong>{config.whatsappDisplay}</strong></TrackedLink>}
            {config.contactEmail && <a href={`mailto:${config.contactEmail}`}><span>Email enquiries</span><strong>{config.contactEmail}</strong></a>}
            {config.location && <a href={config.location.mapUrl} target="_blank" rel="noreferrer"><span>Gżira meeting location</span><strong>{config.location.postalLabel}</strong></a>}
            <div><span>Response and meeting hours</span><strong>Local business hours</strong></div>
          </div>
          <p className="contact-legal-note">Do not send confidential client records through the first-contact form. Read the <a href={marketPath(config.code, "/legal-information")}>legal and provider information</a> first.</p>
          <ResponsiveImage src="/fst-consultation.webp" alt="A private first conversation focused on a business decision" sizes="(max-width: 900px) 100vw, 60vw" loading="lazy" decoding="async" />
        </div>
        <aside className="contact-page-form" aria-labelledby="secure-request-title">
          <p className="eyebrow">Confidential scope enquiry</p>
          <h2 id="secure-request-title">Send the deliverable, deadline and available records.</h2>
          <p>Selected catalogue services and contact details stay attached to the request.</p>
          <EnquiryForm jurisdiction={config.code} initialServiceIds={initialServiceIds} initialServiceLabels={initialServiceLabels} packageContext={packageContext} whatsappUrl={config.whatsappUrl} contactEmail={config.contactEmail} />
        </aside>
      </section>
      <SiteFooter jurisdiction={config.code} />
    </main>
  );
}
