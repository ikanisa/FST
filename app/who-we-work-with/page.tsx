import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { PrimaryCta } from "../components/PrimaryCta";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { BreadcrumbJsonLd } from "../components/JsonLd";

export const metadata = pageMetadata({
  title: "Businesses & Organisations We Support",
  description: "Senior-led support for start-ups, self-employed professionals, SMEs, established businesses, NGOs, voluntary organisations and international programmes.",
  path: "/who-we-work-with",
});

const clientGroups = [
  {
    title: "Start-ups & self-employed professionals",
    copy: "FST helps founders, sole traders and independent professionals turn an idea or growing activity into a workable business, tax and finance setup.",
    image: "/fst-consultation.webp",
    alt: "A founder discussing business setup and growth priorities with an adviser",
    priorities: ["Business planning and feasibility", "Tax, VAT and accounting setup", "Loan and funding application support"],
    className: "client-group-startups",
  },
  {
    title: "SMEs & growing businesses",
    copy: "We help small and medium-sized businesses organise growth, management information, tax, finance and control priorities around accountable owners.",
    image: "/fst-operations.webp",
    alt: "An SME leadership team coordinating operational and financial priorities",
    priorities: ["Management and business planning", "Accounting, tax and working capital", "Risk, internal controls and performance"],
    className: "client-group-smes",
  },
  {
    title: "Established businesses & finance teams",
    copy: "FST joins management, finance, tax, governance and transaction evidence when a major decision, change programme or financing requirement is ahead.",
    image: "/fst-finance.webp",
    alt: "A finance team preparing management and lender evidence for a major decision",
    priorities: ["Management advisory and transformation", "Reporting, taxation and corporate administration", "Loan and funding application support"],
    className: "client-group-established",
  },
  {
    title: "NGOs, voluntary & community organisations",
    copy: "We support mission-led organisations with proportionate governance, funding applications, budgets, controls, reporting and accountable programme delivery.",
    image: "/fst-collaboration.webp",
    alt: "A voluntary organisation team reviewing programme delivery and accountability",
    priorities: ["Governance, policies and internal controls", "Funding applications and grant budgets", "Financial reporting and programme accountability"],
    className: "client-group-nonprofits",
  },
  {
    title: "International programmes & institutions",
    copy: "For cross-border or accountability-intensive work, we provide a locally attentive team for governance, reporting, funding and delivery evidence.",
    image: "/fst-international.webp",
    alt: "An international programme team reviewing delivery and reporting evidence",
    priorities: ["Programme delivery and management support", "Financial reporting and accountability", "Funding application support and post-award files"],
    className: "client-group-organisations",
  },
];

export default function WhoWeWorkWithPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Organisations", path: "/who-we-work-with" }]} />
      <SiteHeader />

      <section className="client-hero">
        <div className="client-hero-copy">
          <p className="eyebrow">Organisations we support</p>
          <h1>Support matched to the pressure you are under.</h1>
          <p>The service mix changes with the situation. The working method stays consistent: establish the decision, join the evidence and agree the route forward.</p>
          <div className="client-hero-actions">
            <PrimaryCta className="primary-button" />
          </div>
        </div>
        <div className="client-hero-visual">
          <ResponsiveImage src="/fst-collaboration.webp" alt="A diverse advisory team working alongside organisational leaders" sizes="(max-width: 900px) 100vw, 60vw" loading="eager" fetchPriority="high" decoding="async" />
          <aside>
            <strong>A joined-up working file.</strong>
            <span>A shared objective, named owners and evidence that can be reviewed.</span>
          </aside>
        </div>
      </section>

      <section className="client-groups section-shell" aria-labelledby="client-groups-title">
        <div className="client-groups-heading">
          <h2 id="client-groups-title">Support for organisations at every stage.</h2>
          <p>We scope the work around the organisation, the decision and the evidence required—from first setup and growth to funded programmes and institutional accountability.</p>
        </div>
        <div className="client-groups-grid">
          {clientGroups.map((group) => (
            <article className={`client-group-card ${group.className}`} key={group.title}>
              <ResponsiveImage src={group.image} alt={group.alt} sizes="(max-width: 720px) 100vw, 50vw" loading="lazy" decoding="async" />
              <div>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <ul aria-label={`Typical priorities for ${group.title}`}>
                  {group.priorities.map((priority) => <li key={priority}>{priority}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relationship-cta section-shell" aria-labelledby="relationship-title">
        <div className="relationship-cta-copy">
          <p className="eyebrow">Begin with the decision</p>
          <h2 id="relationship-title">Describe the outcome, not the service code.</h2>
          <p>Tell us what must be decided, financed, filed, controlled or delivered. We will map the relevant FST workstreams around it.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <ResponsiveImage src="/fst-consultation.webp" alt="A private first meeting focused on a business outcome" sizes="(max-width: 900px) 100vw, 45vw" loading="lazy" decoding="async" />
      </section>

      <SiteFooter />
    </main>
  );
}
