import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { PrimaryCta } from "../components/PrimaryCta";

export const metadata = pageMetadata({
  title: "Organisations",
  description: "Senior-led management, risk, tax, accounting, corporate, business-planning, loan application and funding application support.",
  path: "/who-we-work-with",
});

const clientGroups = [
  {
    title: "Operating businesses & leadership",
    copy: "We help management teams organise growth, performance, finance and control priorities into a programme with accountable owners.",
    image: "/fst-operations.webp",
    alt: "An operating team coordinating performance and delivery priorities",
    priorities: ["Strategy and management support", "Risk, internal audit and controls", "Reporting, tax and working capital"],
    className: "client-group-business",
  },
  {
    title: "Owners, founders & finance teams",
    copy: "FST joins the plan, numbers, corporate record and funding evidence when a major investment or financing decision is ahead.",
    image: "/fst-finance.webp",
    alt: "Finance and business-planning evidence prepared for an owner decision",
    priorities: ["Business plan preparation or review", "Budgets, projections and loan application support", "Corporate administration and tax"],
    className: "client-group-owners",
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
          <img src="/fst-collaboration.webp" alt="A diverse advisory team working alongside organisational leaders" width="1536" height="1024" loading="eager" fetchPriority="high" decoding="async" />
          <aside>
            <strong>A joined-up working file.</strong>
            <span>A shared objective, named owners and evidence that can be reviewed.</span>
          </aside>
        </div>
      </section>

      <section className="client-groups section-shell" aria-labelledby="client-groups-title">
        <div className="client-groups-heading">
          <h2 id="client-groups-title">Where connected support matters.</h2>
          <p>We scope the support around the decision and keep dependencies visible from the first review to the final action.</p>
        </div>
        <div className="client-groups-grid">
          {clientGroups.map((group) => (
            <article className={`client-group-card ${group.className}`} key={group.title}>
              <img src={group.image} alt={group.alt} width="1536" height="1024" loading="lazy" decoding="async" />
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
        <img src="/fst-consultation.webp" alt="A private first meeting focused on a business outcome" width="1536" height="1024" loading="lazy" decoding="async" />
      </section>

      <SiteFooter />
    </main>
  );
}
