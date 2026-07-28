import Link from "next/link";
import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { Calculator } from "@phosphor-icons/react/dist/ssr/Calculator";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { HandCoins } from "@phosphor-icons/react/dist/ssr/HandCoins";
import { Receipt } from "@phosphor-icons/react/dist/ssr/Receipt";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SectionVisual } from "../components/SectionVisual";
import { PrimaryCta } from "../components/PrimaryCta";

export const metadata = pageMetadata({
  title: "Services",
  description: "FST services covering management, risk, tax, accounting, corporate administration, loan application support and funding application support.",
  path: "/services",
});

const services = [
  { title: "Management Advisory, Risk & Controls", slug: "management-consulting", image: "/fst-management.webp", copy: "Business planning, strategy, decision support, risk management, internal audit, control improvement and hands-on management follow-through.", tone: "violet", icon: Compass },
  { title: "Taxation", slug: "tax-vat", image: "/fst-tax.webp", copy: "Complete Malta tax support covering corporate and personal income tax, VAT, payroll and FSS, social security, withholding, property, transfer and international tax.", tone: "orange", icon: Receipt },
  { title: "Accounting & Financial Reporting", slug: "accounting-financial-reporting", image: "/fst-accounting.webp", copy: "Finance records, close, reporting, payroll and forward-looking information prepared for management use.", tone: "blue", icon: Calculator },
  { title: "Corporate & Administrative Services", slug: "corporate-services", image: "/fst-corporate.webp", copy: "Company records, governance actions, statutory filings and recurring administration kept orderly and current.", tone: "cobalt", icon: Buildings },
  { title: "Loan Application Support", slug: "business-planning-finance-applications", image: "/fst-finance.webp", copy: "Borrowing needs, financial schedules, application forms and evidence organised into a complete lender-ready file.", tone: "rose", icon: ChartLineUp },
  { title: "Funding Application Support", slug: "funding-applications", image: "/funding-application-services.webp", copy: "Full funding application support across FONDI.eu, Malta Enterprise, Xjenza Malta and connected routes.", tone: "cobalt", icon: HandCoins },
];

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="index-hero image-index-hero services-index-hero">
        <div>
          <h1>Build the right team around the work.</h1>
          <p>FST combines recurring finance and compliance services with focused advisory, loan application support and funding application support—without separating the commercial story from the evidence behind it.</p>
        </div>
        <img src="/fst-collaboration.webp" alt="FST specialists coordinating workstreams in an open project studio" width="1536" height="1024" loading="eager" fetchPriority="high" />
      </section>
      <section className="service-index-grid section-shell" aria-label="Our services">
        {services.map((service) => {
          const ServiceIcon = service.icon;
          return (
            <Link className={`service-index-card accent-${service.tone}`} href={`/services/${service.slug}`} key={service.slug}>
              <img src={service.image} alt={`${service.title} advisers at work`} width="1600" height="1000" loading="lazy" decoding="async" />
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
          <p className="section-index">A practical first step</p>
          <h2>Start with the outcome and the deadline.</h2>
          <p>FST will map the specialist support, information and sequence required to get there.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <SectionVisual src="/fst-consultation.webp" alt="A business owner and adviser agreeing the scope of a new engagement" className="subpage-cta-visual" />
      </section>
      <SiteFooter />
    </main>
  );
}
