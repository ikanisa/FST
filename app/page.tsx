import Link from "next/link";
import { Briefcase } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { Calculator } from "@phosphor-icons/react/dist/ssr/Calculator";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { CirclesThreePlus } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { Ear } from "@phosphor-icons/react/dist/ssr/Ear";
import { GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereWest";
import { HandCoins } from "@phosphor-icons/react/dist/ssr/HandCoins";
import { Receipt } from "@phosphor-icons/react/dist/ssr/Receipt";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { UsersThree } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { EditorialSlider } from "./components/EditorialSlider";
import { PrimaryCta } from "./components/PrimaryCta";
import { SectionVisual } from "./components/SectionVisual";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const capabilities = [
  {
    title: "Management Advisory, Risk & Controls",
    slug: "management-consulting",
    intro: "Practical management support that strengthens decisions, risk visibility and organisational performance.",
    items: [
      "Management advisory and strategy",
      "Risk management and internal audit",
      "Internal controls and performance improvement",
    ],
    tone: "lilac",
    icon: Compass,
  },
  {
    title: "Tax & VAT",
    slug: "tax-vat",
    intro: "Clear, connected support for Malta VAT, corporate income tax and recurring tax obligations.",
    items: [
      "VAT registration, returns and advisory",
      "Corporate income tax preparation and review",
      "Tax planning, refunds and authority support",
    ],
    tone: "peach",
    icon: Receipt,
  },
  {
    title: "Accounting & Financial Reporting",
    slug: "accounting-financial-reporting",
    intro: "Reliable finance operations and reporting from bookkeeping through annual financial statements.",
    items: [
      "Bookkeeping, reconciliations and close",
      "Financial statement preparation and review",
      "Management accounts, payroll and cash flow",
    ],
    tone: "blue",
    icon: Calculator,
  },
  {
    title: "Corporate & Administrative Services",
    slug: "corporate-services",
    intro: "Thoughtful structures, reliable records and dependable administration across the business lifecycle.",
    items: [
      "Company formation and corporate administration",
      "Company secretarial, registers and filings",
      "Board, ownership and administrative support",
    ],
    tone: "sage",
    icon: Buildings,
  },
  {
    title: "Business Planning & Finance Applications",
    slug: "business-planning-finance-applications",
    intro: "Credible plans, projections, budgets and finance applications built around the decision at hand.",
    items: [
      "Business-plan preparation and review",
      "Budgets, cash flow and financial projections",
      "Loan readiness and application support",
    ],
    tone: "sand",
    icon: ChartLineUp,
  },
  {
    title: "Funding Application Services",
    slug: "funding-applications",
    intro: "End-to-end Malta funding applications grounded in route fit, official guidance and complete evidence.",
    items: [
      "FONDI.eu, Malta Enterprise and Xjenza Malta",
      "Narratives, budgets and compliance matrices",
      "Submission readiness and post-award support",
    ],
    tone: "sage",
    icon: HandCoins,
  },
];

const insights = [
  {
    category: "Risk & governance",
    title: "Making risk management useful at the speed of decisions",
  },
  {
    category: "Management consulting",
    title: "From strategy to execution: creating momentum without adding complexity",
  },
  {
    category: "Tax & reporting",
    title: "Building a connected finance calendar that reduces surprises",
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Strategy <span>·</span> Structure <span>·</span> Compliance</p>
          <h1>Clarity for what comes next.</h1>
          <p className="hero-lede">
            Integrated management advisory, risk, tax, accounting, corporate,
            business-planning and funding support for organisations and leadership teams.
          </p>
          <PrimaryCta className="primary-button" />
        </div>

        <div className="hero-visual" aria-label="Advisers in a strategic discussion">
          <img
            className="hero-image"
            src="/advisory-team.webp"
            alt="Three senior advisers discussing a client brief around a table"
            width={1672}
            height={941}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <aside className="promise-card" aria-label="Our client promise">
            <p className="promise-title">A partner for today.<br />Prepared for tomorrow.</p>
            <span className="promise-rule" aria-hidden="true" />
            <ul>
              <li>Senior-led perspective</li>
              <li>Connected specialist support</li>
              <li>Clear, practical next steps</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="capability-rail" id="expertise" aria-labelledby="capability-heading">
        <div className="rail-intro">
          <h2 id="capability-heading">One advisory relationship.<br /><em>Many connected capabilities.</em></h2>
        </div>
        <div className="rail-list">
          {capabilities.map((capability) => {
            const CapabilityIcon = capability.icon;
            return (
              <Link href={`/services/${capability.slug}`} key={capability.title}>
                <span className={`rail-icon ${capability.tone}`} aria-hidden="true"><CapabilityIcon size={20} weight="regular" /></span>
                <span>{capability.title}</span>
              </Link>
            );
          })}
        </div>
        <SectionVisual src="/home-capabilities-v2.webp" alt="Many connected advisory workstreams brought together around one client table" className="rail-section-visual" />
      </section>

      <section className="expertise-section section-shell" aria-labelledby="expertise-title">
        <div className="section-heading section-heading-no-index">
          <h2 id="expertise-title">The right perspective, at the right moment.</h2>
          <p>Our specialists work as one team—bringing management, finance, tax, corporate and application expertise around the decisions that shape your organisation.</p>
        </div>
        <SectionVisual src="/home-expertise-v2.webp" alt="Management, finance, tax and corporate professionals collaborating on a shared client decision" className="section-banner-visual" />
        <div className="expertise-card-grid" aria-label="Connected expertise">
          {capabilities.map((capability) => {
            const CapabilityIcon = capability.icon;
            return (
              <article className={`expertise-card expertise-card-${capability.tone}`} key={capability.title}>
                <div>
                  <span className="expertise-card-heading">
                    <span className={`item-icon ${capability.tone}`} aria-hidden="true"><CapabilityIcon size={20} weight="regular" /></span>
                    <span className="expertise-card-label">Core expertise</span>
                  </span>
                  <h3>{capability.title}</h3>
                  <p>{capability.intro}</p>
                </div>
                <ul>
                  {capability.items.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="consulting-section section-shell" aria-labelledby="consulting-title">
        <div className="consulting-copy">
          <h2 id="consulting-title">Better decisions. Stronger organisations.</h2>
          <p>
            We help leaders see risk clearly, strengthen the way work gets done and
            move from strategy to measurable action with confidence.
          </p>
        </div>
        <SectionVisual src="/home-consulting-v2.webp" alt="A senior consultant facilitating a risk and transformation workshop" className="consulting-visual" />
        <div className="consulting-grid">
          <div><span className="consulting-label">Controls</span><h3>Internal audit & controls</h3><p>Risk-based internal audit, practical controls and clear accountability that improve how the organisation operates.</p></div>
          <div><span className="consulting-label">Change</span><h3>Strategy & transformation</h3><p>Clear choices, practical operating models and focused delivery support from intent to execution.</p></div>
          <div><span className="consulting-label">Risk</span><h3>Risk & compliance</h3><p>Proportionate frameworks that connect governance, regulatory expectations and business priorities.</p></div>
          <div><span className="consulting-label">Performance</span><h3>Performance improvement</h3><p>Sharper processes, better management information and practical change that teams can sustain.</p></div>
        </div>
      </section>

      <section className="audience-section section-shell" id="who-we-work-with" aria-labelledby="audience-title">
        <div className="section-heading compact section-heading-no-index">
          <h2 id="audience-title">Advice shaped around your reality.</h2>
        </div>
        <SectionVisual src="/home-audience-v2.webp" alt="Business leaders, finance teams and international decision-makers in a focused advisory conversation" className="section-banner-visual" />
        <div className="audience-list">
          <article><span className="item-icon audience-icon" aria-hidden="true"><Briefcase size={21} weight="regular" /></span><h3>Businesses & leadership teams</h3><p>From growing enterprises to established groups navigating change, reporting and risk.</p></article>
          <article><span className="item-icon audience-icon" aria-hidden="true"><UsersThree size={21} weight="regular" /></span><h3>Owners & finance teams</h3><p>Connected support for ownership, governance, reporting and long-term business priorities.</p></article>
          <article><span className="item-icon audience-icon" aria-hidden="true"><GlobeHemisphereWest size={21} weight="regular" /></span><h3>International organisations</h3><p>Local attention and multidisciplinary support for organisations operating across borders.</p></article>
        </div>
      </section>

      <section className="approach-section section-shell" id="about" aria-labelledby="approach-title">
        <div className="approach-panel">
          <h2 id="approach-title">Close enough to understand.<br />Experienced enough to challenge.</h2>
          <p>We bring the focus of a senior adviser, the range of a multidisciplinary team and a straightforward way of working.</p>
        </div>
        <div className="approach-steps">
          <div><span className="approach-icon" aria-hidden="true"><Ear size={20} weight="regular" /></span><h3>Listen closely</h3><p>We start with context, priorities and the decisions that genuinely matter.</p></div>
          <div><span className="approach-icon" aria-hidden="true"><CirclesThreePlus size={20} weight="regular" /></span><h3>Connect the expertise</h3><p>We assemble the right mix of management, tax, accounting, corporate and application specialists.</p></div>
          <div><span className="approach-icon" aria-hidden="true"><Target size={20} weight="regular" /></span><h3>Make progress practical</h3><p>We turn analysis into clear actions, accountable delivery and useful outcomes.</p></div>
        </div>
        <SectionVisual src="/home-approach-v2.webp" alt="A senior adviser listening closely before guiding a practical next step" className="approach-visual" />
      </section>

      <section className="insights-section section-shell" id="insights" aria-labelledby="insights-title">
        <div className="section-heading compact section-heading-no-index">
          <h2 id="insights-title">Useful thinking for consequential decisions.</h2>
        </div>
        <SectionVisual src="/home-insights-v2.webp" alt="Advisers reviewing research, risk signals and emerging business ideas" className="section-banner-visual" />
        <div className="insight-grid">
          {insights.map((insight, index) => (
            <Link href="/insights" key={insight.title} className={`insight-card insight-${index + 1}`}>
              <span>{insight.category}</span>
              <h3>{insight.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
        <div className="contact-copy">
          <p className="section-index light">Book a consultation</p>
          <h2 id="contact-title">A focused conversation, at a time that works.</h2>
          <p>Select a convenient time and the expertise you need. Your calendar invitation is prepared instantly for a private video meeting.</p>
          <SectionVisual src="/home-contact-v2.webp" alt="A calm first conversation between a senior adviser and a prospective client" className="contact-section-visual" />
        </div>
        <div className="contact-cta-panel">
          <p className="eyebrow">Google Calendar & Meet</p>
          <h3>Choose a time and confirm in one secure flow.</h3>
          <p>Availability is checked before the invitation is created for you and FST’s approved scheduling contacts.</p>
          <PrimaryCta className="primary-button" />
        </div>
      </section>
      <EditorialSlider />
      <SiteFooter />
    </main>
  );
}
