import { Binoculars } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { CirclesThreePlus } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SectionVisual } from "../components/SectionVisual";
import { PrimaryCta } from "../components/PrimaryCta";

export const metadata = pageMetadata({ title: "Our Approach", description: "How FST combines senior attention, connected expertise and implementation-focused advice, with evidence-led field notes for management and finance.", path: "/about" });

const fieldNotes = [
  { category: "Controls in practice", title: "What a useful internal-control review should leave behind", summary: "A field guide to process ownership, testable evidence and actions that management can actually close.", image: "/fst-management.webp", imageAlt: "A controls workshop assigning owners and actions", tone: "violet" },
  { category: "Planning & management", title: "Stress-testing a business plan before implementation", summary: "The connections to check across the commercial case, operating milestones, cash forecast, resources and management assumptions.", image: "/fst-finance.webp", imageAlt: "A financial model and business plan being stress-tested", tone: "cobalt" },
  { category: "Tax operations", title: "Building a tax working file that reconciles before filing day", summary: "How a repeatable ledger-to-return review can surface missing support, classification issues and tax exposures earlier.", image: "/fst-tax.webp", imageAlt: "A tax specialist reconciling a working file", tone: "orange" },
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="subpage-hero accent-cobalt">
        <div className="subpage-copy">
          <p className="eyebrow">The FST approach</p>
          <h1>Your question. The relevant expertise.</h1>
          <p>We assemble management, risk, tax, accounting, corporate, finance and funding expertise around the result you need to achieve.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <div className="subpage-image-wrap"><img src="/fst-collaboration.webp" alt="A multidisciplinary FST team working through a client priority" className="subpage-image" width="1536" height="1024" loading="eager" fetchPriority="high" decoding="async" /></div>
      </section>

      <section className="about-principles section-shell">
        <p className="section-index">How the work runs</p>
        <h2>Understand the setting. Join the evidence. Move the decision.</h2>
        <SectionVisual src="/fst-management.webp" alt="A facilitated workshop connecting evidence, owners and next actions" className="about-principles-visual" />
        <div className="principle-grid">
          <article><span className="item-icon principle-icon" aria-hidden="true"><Binoculars size={21} weight="regular" /></span><h3>Read the whole situation</h3><p>We establish the decision, constraints, owners and available evidence before proposing a workstream.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><CirclesThreePlus size={21} weight="regular" /></span><h3>Work across boundaries</h3><p>The plan keeps tax, reporting, controls, corporate requirements, finance and funding dependencies in one view.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><Target size={21} weight="regular" /></span><h3>Leave an executable route</h3><p>Outputs identify what must happen, who owns it, what evidence is needed and how progress will be reviewed.</p></article>
        </div>
      </section>

      <section className="about-story section-shell">
        <div className="about-story-image"><img src="/fst-international.webp" alt="An international programme team coordinating delivery and accountability" width="1536" height="1024" loading="lazy" decoding="async" /></div>
        <div><p className="section-index">The connected file</p><h2>No hand-off gaps between services.</h2><p>A plan affects cash. Cash affects finance. Structure affects tax and governance. Funding rules affect budgets and delivery evidence. FST keeps those links visible, so each workstream strengthens the others.</p></div>
      </section>

      <section className="combined-field-notes section-shell" id="field-notes" aria-labelledby="field-notes-title">
        <div className="combined-field-notes-heading">
          <p className="section-index">Field notes</p>
          <h2 id="field-notes-title">Working notes for decisions in motion.</h2>
          <p>Short, evidence-led perspectives drawn from FST’s management, finance, tax, reporting and funding work.</p>
        </div>
        <div className="article-grid">
          {fieldNotes.map((article) => (
            <article className={`article-card accent-${article.tone}`} key={article.title}>
              <img src={article.image} alt={article.imageAlt} width="1536" height="1024" loading="lazy" decoding="async" />
              <div><span>{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p></div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
