import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { PrimaryCta } from "../components/PrimaryCta";

export const metadata = pageMetadata({
  title: "Who we work with",
  description: "Senior-led management, risk, tax, accounting, corporate, business-planning, finance and funding-application advice.",
  path: "/who-we-work-with",
});

const clientGroups = [
  {
    title: "Businesses & leadership teams",
    copy: "From ambitious owner-managed businesses to established groups, we help leaders strengthen confidence, navigate change and turn priorities into practical progress.",
    image: "/who-we-work-with-business-v2.webp",
    alt: "Business owners and a senior adviser reviewing a growth and governance plan",
    priorities: ["Growth and transformation", "Governance, internal audit and controls", "Finance, funding, reporting and tax"],
    className: "client-group-business",
  },
  {
    title: "Owners & finance teams",
    copy: "We connect governance, structuring, reporting, tax, business planning and finance perspectives around ownership priorities and long-term business decisions.",
    image: "/who-we-work-with-owners-v2.webp",
    alt: "Business owners and a finance adviser discussing long-term organisational priorities",
    priorities: ["Ownership and succession", "Governance and structuring", "Finance and funding applications"],
    className: "client-group-owners",
  },
  {
    title: "International organisations & institutions",
    copy: "For organisations working across borders or under heightened accountability, we bring local attention and multidisciplinary support to reporting, governance and delivery.",
    image: "/who-we-work-with-organisations-v2.webp",
    alt: "International organisation leaders reviewing governance and reporting priorities",
    priorities: ["Cross-border operations", "Reporting and accountability", "Risk and regulatory change"],
    className: "client-group-organisations",
  },
];

export default function WhoWeWorkWithPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />

      <section className="client-hero">
        <div className="client-hero-copy">
          <p className="eyebrow">Who we work with</p>
          <h1>Advice shaped around your reality.</h1>
          <p>Different organisations face different pressures. We start with your context, connect the right expertise and stay focused on the decisions that matter.</p>
          <div className="client-hero-actions">
            <PrimaryCta className="primary-button" />
          </div>
        </div>
        <div className="client-hero-visual">
          <img src="/who-we-work-with-hero-v2.webp" alt="A diverse group of senior business leaders in a strategic advisory conversation" width="1536" height="1024" loading="eager" fetchPriority="high" decoding="async" />
          <aside>
            <strong>One standard of care.</strong>
            <span>Senior attention, connected thinking and clear next steps.</span>
          </aside>
        </div>
      </section>

      <section className="client-groups section-shell" aria-labelledby="client-groups-title">
        <div className="client-groups-heading">
          <h2 id="client-groups-title">Different starting points. The same commitment to clarity.</h2>
          <p>Our best work begins with a close understanding of where you are, what is changing and what a useful outcome looks like.</p>
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
          <p className="eyebrow">The right place to begin</p>
          <h2 id="relationship-title">Tell us what is changing.</h2>
          <p>You do not need to know which service comes first. Share the decision, risk or opportunity in front of you and we’ll bring the right perspective to the table.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <img src="/who-we-work-with-cta-v2.webp" alt="A senior adviser listening closely during a private first meeting" width="1536" height="1024" loading="lazy" decoding="async" />
      </section>

      <SiteFooter />
    </main>
  );
}
