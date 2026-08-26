import Link from "next/link";
import { Briefcase } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { Calculator } from "@phosphor-icons/react/dist/ssr/Calculator";
import { CirclesThreePlus } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { Ear } from "@phosphor-icons/react/dist/ssr/Ear";
import { GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr/GlobeHemisphereWest";
import { HandCoins } from "@phosphor-icons/react/dist/ssr/HandCoins";
import { Receipt } from "@phosphor-icons/react/dist/ssr/Receipt";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { UsersThree } from "@phosphor-icons/react/dist/ssr/UsersThree";
import { EditorialSlider } from "./components/EditorialSlider";
import { AutomaticMarketRouter } from "./components/AutomaticMarketRouter";
import { PrimaryCta } from "./components/PrimaryCta";
import { SectionVisual } from "./components/SectionVisual";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { ResponsiveImage } from "./components/ResponsiveImage";
import { fieldNotes } from "../lib/field-notes";

const capabilities = [
  {
    title: "Management Advisory, Risk & Controls",
    slug: "management-consulting",
    intro: "Senior support for decisions, business planning, risk ownership, control design and operational follow-through.",
    items: [
      "Business planning, feasibility and operating priorities",
      "Risk ownership, governance and control design",
      "Control design and delivery improvement",
    ],
    tone: "lilac",
    icon: Compass,
  },
  {
    title: "Audit & Assurance",
    slug: "audit-assurance",
    intro: "Independent audit and assurance work built around risk, evidence, professional judgement and clear reporting.",
    items: [
      "Statutory and voluntary financial statement audit",
      "Internal audit, controls and compliance assurance",
      "Grant, donor, NGO and project audit",
    ],
    tone: "sky",
    icon: ShieldCheck,
  },
  {
    title: "Taxation",
    slug: "taxation",
    intro: "Complete tax support across direct, indirect, employment, property, transaction and international tax obligations.",
    items: [
      "Corporate and personal income tax",
      "VAT, payroll, FSS and social security",
      "International, withholding, property and transfer taxes",
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
    tone: "sky",
    icon: Buildings,
  },
  {
    title: "Loan & Funding Application Support",
    slug: "loan-funding-application-support",
    intro: "One controlled financing file for lender applications, public funding routes, financial schedules and supporting evidence.",
    items: [
      "Loan, grant, incentive and innovation-route fit",
      "Applications, financial models, budgets and evidence",
      "Lender or funder queries, approval and award setup",
    ],
    tone: "sand",
    icon: HandCoins,
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <AutomaticMarketRouter />
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Turn ambition into an executable plan.</h1>
          <p className="hero-lede">
            FST brings management, audit, finance, tax, governance and loan and
            funding application support into an accountable programme of work.
          </p>
          <PrimaryCta className="primary-button" />
        </div>

        <div className="hero-visual" aria-label="FST team shaping a client work programme">
          <ResponsiveImage
            className="hero-image"
            src="/fst-hero.webp"
            alt="Advisers standing at a planning wall in a professional office"
            sizes="(max-width: 900px) 100vw, 55vw"
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
          <h2 id="capability-heading">Specialist services.<br /><em>A connected working plan.</em></h2>
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
        <SectionVisual src="/fst-collaboration.webp" alt="Specialists coordinating connected workstreams in a project studio" className="rail-section-visual" />
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
          <div><span className="consulting-label">Assure</span><h3>Audit & assurance assignments</h3><p>Independent, risk-led work tests evidence, reports clear conclusions and keeps significant findings visible.</p></div>
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
          <div><span className="approach-icon" aria-hidden="true"><CirclesThreePlus size={20} weight="regular" /></span><h3>Build the working team</h3><p>Assign only the specialist services needed and keep assumptions consistent across every workstream.</p></div>
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
          {fieldNotes.map((note, index) => (
            <Link href={`/insights/${note.slug}`} key={note.slug} className={`insight-card insight-${index + 1}`}>
              <span>{note.category}</span>
              <h3>{note.title}</h3>
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
