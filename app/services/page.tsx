import Link from "next/link";
import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { Calculator } from "@phosphor-icons/react/dist/ssr/Calculator";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { HandCoins } from "@phosphor-icons/react/dist/ssr/HandCoins";
import { Receipt } from "@phosphor-icons/react/dist/ssr/Receipt";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SectionVisual } from "../components/SectionVisual";
import { PrimaryCta } from "../components/PrimaryCta";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { BreadcrumbJsonLd } from "../components/JsonLd";

export const metadata = pageMetadata({
  title: "Advisory Services",
  description: "Explore FST management, audit, assurance, tax, accounting, corporate administration and funding support, or compare individual services and indicative fees.",
  path: "/services",
});

const services = [
  { title: "Management Advisory, Risk & Controls", slug: "management-consulting", image: "/fst-management.webp", copy: "Business planning, strategy, decision support, risk management, control design and hands-on management follow-through.", tone: "violet", icon: Compass },
  { title: "Audit & Assurance", slug: "audit-assurance", image: "/fst-insights.webp", copy: "Statutory and voluntary audit, assurance, agreed-upon procedures, internal audit, controls, compliance, donor, NGO and project audit work.", tone: "cobalt", icon: ShieldCheck },
  { title: "Taxation", slug: "taxation", image: "/fst-tax.webp", copy: "Complete tax support covering corporate and personal income tax, VAT, payroll and FSS, social security, withholding, property, transfer and international tax.", tone: "orange", icon: Receipt },
  { title: "Accounting & Financial Reporting", slug: "accounting-financial-reporting", image: "/fst-accounting.webp", copy: "Finance records, close, reporting, payroll and forward-looking information prepared for management use.", tone: "blue", icon: Calculator },
  { title: "Corporate & Administrative Services", slug: "corporate-services", image: "/fst-corporate.webp", copy: "Company records, governance actions, statutory filings and recurring administration kept orderly and current.", tone: "cobalt", icon: Buildings },
  { title: "Loan & Funding Application Support", slug: "loan-funding-application-support", image: "/fst-finance.webp", copy: "One complete financing file for bank lending, FONDI.eu, Malta Enterprise, Xjenza Malta and connected funding routes.", tone: "rose", icon: HandCoins },
];

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <SiteHeader />
      <section className="index-hero image-index-hero services-index-hero">
        <div>
          <h1>Accounting, tax, audit, corporate and funding services.</h1>
          <p>Choose a defined service area for reporting, compliance, governance, management decisions, contracts or financing, with scope and deliverables kept in one controlled plan.</p>
        </div>
        <ResponsiveImage src="/fst-collaboration.webp" alt="FST specialists coordinating workstreams in an open project studio" sizes="(max-width: 900px) 100vw, 80vw" loading="eager" fetchPriority="high" />
      </section>
      <section className="services-catalogue-invitation section-shell">
        <div>
          <p className="section-index">Individual services and fees</p>
          <h2>Compare named deliverables and indicative starting fees.</h2>
        </div>
        <div>
          <p>Search accounting, tax, audit, corporate, advisory, funding and contract deliverables, then prepare one itemised request.</p>
          <Link className="primary-button" href="/services/catalogue">Compare services and fees</Link>
        </div>
      </section>
      <section className="service-index-grid section-shell" aria-label="Our services">
        {services.map((service) => {
          const ServiceIcon = service.icon;
          return (
            <Link className={`service-index-card accent-${service.tone}`} href={`/services/${service.slug}`} key={service.slug}>
              <ResponsiveImage src={service.image} alt={`${service.title} advisers at work`} sizes="(max-width: 720px) 100vw, 50vw" loading="lazy" decoding="async" />
              <div>
                <span className={`item-icon service-index-icon ${service.tone}`} aria-hidden="true"><ServiceIcon size={21} weight="regular" /></span>
                <h2>{service.title}</h2>
                <p>{service.copy}</p>
              </div>
            </Link>
          );
        })}
      </section>
      <section className="subpage-cta section-shell">
        <div className="subpage-cta-copy">
          <p className="section-index">Scope a deadline or deliverable</p>
          <h2>Tell FST what must be filed, reported, financed or decided.</h2>
          <p>FST will confirm the relevant service, required records, review sequence and responsible professional route.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <SectionVisual src="/fst-consultation.webp" alt="A business owner and adviser agreeing the scope of a new engagement" className="subpage-cta-visual" />
      </section>
      <SiteFooter />
    </main>
  );
}
