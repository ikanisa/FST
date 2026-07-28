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
  title: "Expertise",
  description: "Connected management advisory, tax, accounting, corporate, business-planning, finance and funding-application expertise.",
  path: "/services",
});

const services = [
  { title: "Management Advisory, Risk & Controls", slug: "management-consulting", image: "/management-consulting.webp", copy: "Management advisory, strategy, risk management, internal audit, internal controls and performance support.", tone: "violet", icon: Compass },
  { title: "Tax & VAT", slug: "tax-vat", image: "/insights-tax-v2.webp", copy: "VAT, corporate income tax, compliance, return preparation, review and practical tax advisory.", tone: "orange", icon: Receipt },
  { title: "Accounting & Financial Reporting", slug: "accounting-financial-reporting", image: "/accounting-financial-reporting.webp", copy: "Bookkeeping, reconciliations, financial statements, management accounts, projections and payroll.", tone: "blue", icon: Calculator },
  { title: "Corporate & Administrative Services", slug: "corporate-services", image: "/corporate-services.webp", copy: "Company formation, secretarial support, registers, filings, governance and reliable administration.", tone: "green", icon: Buildings },
  { title: "Business Planning & Finance Applications", slug: "business-planning-finance-applications", image: "/who-we-work-with-business-v2.webp", copy: "Business plans, budgets, projections, loan readiness and complete lender-application support.", tone: "rose", icon: ChartLineUp },
  { title: "Funding Application Services", slug: "funding-applications", image: "/funding-application-services.webp", copy: "Full application support across FONDI.eu, Malta Enterprise, Xjenza Malta and connected routes.", tone: "green", icon: HandCoins },
];

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="index-hero image-index-hero services-index-hero">
        <div>
          <p className="eyebrow">Connected expertise</p>
          <h1>One relationship.<br />More of the picture.</h1>
          <p>Our management, tax, accounting, corporate and application specialists work as one team—so advice stays connected to the decisions, risks and opportunities around it.</p>
        </div>
        <img src="/services-overview-hero-v2.webp" alt="A connected team of management, finance, tax and corporate specialists around one table" width="1536" height="1024" loading="eager" fetchPriority="high" />
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
          <p className="section-index">Not sure where to start?</p>
          <h2>Tell us what is changing.</h2>
          <p>We’ll bring the right mix of expertise around your priorities.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <SectionVisual src="/services-cta-v2.webp" alt="A client and multidisciplinary adviser agreeing the right starting point" className="subpage-cta-visual" />
      </section>
      <SiteFooter />
    </main>
  );
}
