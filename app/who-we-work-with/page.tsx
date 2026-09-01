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
    priorities: ["Management and business planning", "Accounting, tax and working capital", "Audit, risk, internal controls and performance"],
    className: "client-group-smes",
  },
  {
    title: "Established businesses & finance teams",
    copy: "FST joins management, audit, finance, tax, governance and transaction evidence when a major decision, change programme or financing requirement is ahead.",
    image: "/fst-finance.webp",
    alt: "A finance team preparing management and lender evidence for a major decision",
    priorities: ["Management advisory and transformation", "Audit, reporting, taxation and corporate administration", "Loan and funding application support"],
    className: "client-group-established",
  },
  {
    title: "NGOs, voluntary & community organisations",
    copy: "We support mission-led organisations with proportionate governance, funding applications, budgets, controls, reporting and accountable programme delivery.",
    image: "/fst-collaboration.webp",
    alt: "A voluntary organisation team reviewing programme delivery and accountability",
    priorities: ["Governance, internal audit and controls", "Loan and funding applications with grant budgets", "Project audit, financial reporting and accountability"],
    className: "client-group-nonprofits",
  },
  {
    title: "International programmes & institutions",
    copy: "For cross-border or accountability-intensive work, we provide a locally attentive team for governance, reporting, funding and delivery evidence.",
    image: "/fst-international.webp",
    alt: "An international programme team reviewing delivery and reporting evidence",
    priorities: ["Programme delivery and management support", "Donor, project and compliance audit", "Funding application support and post-award files"],
    className: "client-group-organisations",
  },
];

export default function WhoWeWorkWithPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Who We Help", path: "/who-we-work-with" }]} />
      <SiteHeader />

      <section className="client-hero">
        <div className="client-hero-copy">
          <p className="eyebrow">Clients and organisations</p>
          <h1>Support for founders, SMEs, finance teams, NGOs and programmes.</h1>
          <p>FST matches accounting, tax, audit, governance, advisory and funding work to the organisation, required deliverable and deadline.</p>
          <div className="client-hero-actions">
            <PrimaryCta className="primary-button" />
          </div>
        </div>
        <div className="client-hero-visual">
          <ResponsiveImage src="/fst-collaboration.webp" alt="A diverse advisory team working alongside organisational leaders" sizes="(max-width: 900px) 100vw, 60vw" loading="eager" fetchPriority="high" decoding="async" />
          <aside>
            <strong>Scope, evidence and approval owners in one file.</strong>
            <span>Named deliverables, records, deadlines and review points stay connected.</span>
          </aside>
        </div>
      </section>

      <section className="client-groups section-shell" aria-labelledby="client-groups-title">
        <div className="client-groups-heading">
          <h2 id="client-groups-title">Choose the organisation profile closest to yours.</h2>
          <p>Each profile shows the services and evidence priorities most often required at that stage.</p>
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
          <p className="eyebrow">Request a scope review</p>
          <h2 id="relationship-title">Tell us what must be filed, financed, reported, controlled or decided.</h2>
          <p>Include the deadline and records already available; FST will identify the relevant service and review route.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <ResponsiveImage src="/fst-consultation.webp" alt="A private first meeting focused on a business outcome" sizes="(max-width: 900px) 100vw, 45vw" loading="lazy" decoding="async" />
      </section>

      <SiteFooter />
    </main>
  );
}
