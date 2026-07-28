import { Binoculars } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { CirclesThreePlus } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SectionVisual } from "../components/SectionVisual";
import { PrimaryCta } from "../components/PrimaryCta";

export const metadata = pageMetadata({ title: "FST Approach", description: "How FST combines senior attention, connected disciplines and implementation-focused advice.", path: "/about" });

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="subpage-hero accent-green">
        <div className="subpage-copy">
          <p className="eyebrow">The FST approach</p>
          <h1>One question. Every relevant discipline.</h1>
          <p>We assemble management, risk, tax, accounting, corporate, finance and application expertise around the result you need to achieve.</p>
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
        <div><p className="section-index">The connected file</p><h2>No hand-off gaps between the disciplines.</h2><p>A plan affects cash. Cash affects finance. Structure affects tax and governance. Funding rules affect budgets and delivery evidence. FST keeps those links visible, so each workstream strengthens the others.</p></div>
      </section>
      <SiteFooter />
    </main>
  );
}
