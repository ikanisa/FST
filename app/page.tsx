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
    intro: "Senior support for decisions, risk ownership, internal review and operational follow-through.",
    items: [
      "Decision support and operating priorities",
      "Risk ownership and internal audit reviews",
      "Control design and delivery improvement",
    ],
    tone: "lilac",
    icon: Compass,
  },
  {
    title: "Tax & VAT",
    slug: "tax-vat",
    intro: "Malta VAT and corporate tax work built around defensible positions, complete files and dependable deadlines.",
    items: [
      "VAT setup, filings and transaction analysis",
      "Corporate tax calculations and return review",
      "Tax planning, refund files and query support",
    ],
    tone: "peach",
    icon: Receipt,
  },
  {
    title: "Accounting & Financial Reporting",
    slug: "accounting-financial-reporting",
    intro: "Day-to-day finance operations that produce reconciled records, useful reporting and credible year-end files.",
    items: [
      "Ledger maintenance, reconciliations and close",
      "Annual accounts preparation and quality review",
      "Management reporting, payroll and liquidity",
    ],
    tone: "blue",
    icon: Calculator,
  },
  {
    title: "Corporate & Administrative Services",
    slug: "corporate-services",
    intro: "Company records, governance actions and statutory obligations kept current through the full company lifecycle.",
    items: [
      "Entity setup and recurring administration",
      "Secretarial records, registers and submissions",
      "Board actions, ownership updates and deadlines",
    ],
    tone: "sage",
    icon: Buildings,
  },
  {
    title: "Business Planning & Finance Applications",
    slug: "business-planning-finance-applications",
    intro: "Commercial plans and numbers shaped into a finance case that lenders can assess and management can deliver.",
    items: [
      "New business plans and critical plan reviews",
      "Operating budgets, scenarios and cash forecasts",
      "Borrowing readiness and lender submissions",
    ],
    tone: "sand",
    icon: ChartLineUp,
  },
  {
    title: "Funding Application Services",
    slug: "funding-applications",
    intro: "A managed application process from programme fit and project design through evidence, review and award readiness.",
    items: [
      "Current FONDI.eu, Malta Enterprise and Xjenza routes",
      "Project cases, eligible-cost budgets and evidence maps",
      "Quality review, authorised submission and award setup",
    ],
    tone: "sage",
    icon: HandCoins,
  },
];

const insights = [
  {
    category: "Controls in practice",
    title: "When a control is worth keeping—and when it is only adding delay",
  },
  {
    category: "Planning & delivery",
    title: "A business plan is only credible when the operating milestones agree",
  },
  {
    category: "Finance operations",
    title: "The monthly evidence routine that makes year-end work easier",
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Turn ambition into an executable plan.</h1>
          <p className="hero-lede">
            FST brings business planning, finance, tax, governance and funding
            applications into one accountable programme of work.
          </p>
          <PrimaryCta className="primary-button" />
        </div>

        <div className="hero-visual" aria-label="FST team shaping a client work programme">
          <img
            className="hero-image"
            src="/fst-hero.webp"
            alt="Four advisers standing at a planning wall in a Malta office"
            width={1536}
            height={1024}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <aside className="promise-card" aria-label="How FST works">
            <p className="promise-title">From open question<br />to owned action.</p>
            <span className="promise-rule" aria-hidden="true" />
            <ul>
              <li>Commercially grounded</li>
              <li>Evidence ready</li>
              <li>Delivery minded</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="capability-rail" id="expertise" aria-labelledby="capability-heading">
        <div className="rail-intro">
          <h2 id="capability-heading">Six disciplines.<br /><em>One working plan.</em></h2>
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
        <SectionVisual src="/fst-collaboration.webp" alt="Five specialists coordinating multiple workstreams in one studio" className="rail-section-visual" />
      </section>

      <section className="expertise-section section-shell" aria-labelledby="expertise-title">
        <div className="section-heading section-heading-no-index">
          <h2 id="expertise-title">Specialists who stay in the same room.</h2>
          <p>Each workstream has a clear purpose, but the assumptions, deadlines and evidence are managed together.</p>
        </div>
        <SectionVisual src="/fst-accounting.webp" alt="An organised finance workspace connecting records, reports and decisions" className="section-banner-visual" />
        <div className="expertise-card-grid" aria-label="FST service lines">
          {capabilities.map((capability) => {
            const CapabilityIcon = capability.icon;
            return (
              <article className={`expertise-card expertise-card-${capability.tone}`} key={capability.title}>
                <div>
                  <span className="expertise-card-heading">
                    <span className={`item-icon ${capability.tone}`} aria-hidden="true"><CapabilityIcon size={20} weight="regular" /></span>
                    <span className="expertise-card-label">Service line</span>
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
          <h2 id="consulting-title">Build the organisation that can deliver.</h2>
          <p>
            FST helps management expose weak points, assign ownership and improve
            the operating routines behind performance.
          </p>
        </div>
        <SectionVisual src="/fst-management.webp" alt="A facilitator and leadership team mapping controls on a glass wall" className="consulting-visual" />
        <div className="consulting-grid">
          <div><span className="consulting-label">Review</span><h3>Internal audit assignments</h3><p>Targeted reviews test how work actually happens, surface exposure and track agreed corrective action.</p></div>
          <div><span className="consulting-label">Govern</span><h3>Risk and control ownership</h3><p>Practical frameworks give each material risk an owner, response, indicator and reporting route.</p></div>
          <div><span className="consulting-label">Improve</span><h3>Operating model redesign</h3><p>Roles, hand-offs and decision rights are rebuilt around the result the organisation must deliver.</p></div>
          <div><span className="consulting-label">Execute</span><h3>Management follow-through</h3><p>Implementation support keeps actions visible, sequenced and connected to useful management information.</p></div>
        </div>
      </section>

      <section className="audience-section section-shell" id="who-we-work-with" aria-labelledby="audience-title">
        <div className="section-heading compact section-heading-no-index">
          <h2 id="audience-title">Built around the people carrying the decision.</h2>
        </div>
        <SectionVisual src="/fst-operations.webp" alt="A business owner and adviser reviewing operations on a production floor" className="section-banner-visual" />
        <div className="audience-list">
          <article><span className="item-icon audience-icon" aria-hidden="true"><Briefcase size={21} weight="regular" /></span><h3>Growing and established businesses</h3><p>Support for leaders managing scale, finance pressure, operating change and recurring obligations.</p></article>
          <article><span className="item-icon audience-icon" aria-hidden="true"><UsersThree size={21} weight="regular" /></span><h3>Founders, owners and finance functions</h3><p>A working partner for planning, reporting, borrowing decisions and governance actions.</p></article>
          <article><span className="item-icon audience-icon" aria-hidden="true"><GlobeHemisphereWest size={21} weight="regular" /></span><h3>Institutions and international programmes</h3><p>Structured support where local execution, evidence and cross-border accountability must align.</p></article>
        </div>
      </section>

      <section className="approach-section section-shell" id="about" aria-labelledby="approach-title">
        <div className="approach-panel">
          <h2 id="approach-title">Start with the decision.<br />Finish with an owner and a deadline.</h2>
          <p>Every engagement is organised around the work that must be completed, the evidence required and the people responsible.</p>
        </div>
        <div className="approach-steps">
          <div><span className="approach-icon" aria-hidden="true"><Ear size={20} weight="regular" /></span><h3>Frame the brief</h3><p>Define the decision, constraints, deadline and minimum evidence before work expands.</p></div>
          <div><span className="approach-icon" aria-hidden="true"><CirclesThreePlus size={20} weight="regular" /></span><h3>Build the working team</h3><p>Assign only the disciplines needed and keep assumptions consistent across every workstream.</p></div>
          <div><span className="approach-icon" aria-hidden="true"><Target size={20} weight="regular" /></span><h3>Stay through delivery</h3><p>Track actions, answer review points and leave management with a usable operating file.</p></div>
        </div>
        <SectionVisual src="/fst-finance.webp" alt="A founder and adviser shaping a delivery plan at an easel" className="approach-visual" />
      </section>

      <section className="insights-section section-shell" id="insights" aria-labelledby="insights-title">
        <div className="section-heading compact section-heading-no-index">
          <h2 id="insights-title">Working notes for finance and leadership.</h2>
        </div>
        <SectionVisual src="/fst-insights.webp" alt="An evidence-led advisory research workspace with organised notes and schedules" className="section-banner-visual" />
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
          <p className="section-index light">Arrange a working session</p>
          <h2 id="contact-title">Bring the decision—not a perfect brief.</h2>
          <p>Choose a time, identify the issue and tell us the deadline. FST will use the first session to define the right next piece of work.</p>
          <SectionVisual src="/fst-consultation.webp" alt="A private first conversation between a senior adviser and business owner" className="contact-section-visual" />
        </div>
        <div className="contact-cta-panel">
          <p className="eyebrow">Calendar-led scheduling</p>
          <h3>Select a slot and receive the meeting details.</h3>
          <p>The requested time is checked before an invitation is prepared for you and the authorised FST contact.</p>
          <PrimaryCta className="primary-button" />
        </div>
      </section>
      <EditorialSlider />
      <SiteFooter />
    </main>
  );
}
