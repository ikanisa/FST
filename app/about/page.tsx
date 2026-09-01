import Link from "next/link";
import { Binoculars } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { CirclesThreePlus } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SectionVisual } from "../components/SectionVisual";
import { PrimaryCta } from "../components/PrimaryCta";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { fieldNotes } from "../../lib/field-notes";
import { siteConfig } from "../../lib/site-config";

export const metadata = pageMetadata({ title: "How FST Scopes, Prepares and Reviews Work", description: "How FST scopes multidisciplinary professional services, controls evidence and confirms professional review and approval responsibilities.", path: "/about" });

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "How FST Works", path: "/about" }]} />
      <SiteHeader />
      <section className="subpage-hero accent-cobalt">
        <div className="subpage-copy">
          <p className="eyebrow">Scope, evidence and review</p>
          <h1>How FST scopes, prepares and reviews multidisciplinary work.</h1>
          <p>FST matches each request to defined accounting, tax, audit, governance, advisory or funding deliverables, required evidence and the responsible professional route.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <div className="subpage-image-wrap"><ResponsiveImage src="/fst-collaboration.webp" alt="A multidisciplinary FST team working through a client priority" className="subpage-image" sizes="(max-width: 900px) 100vw, 52vw" loading="eager" fetchPriority="high" decoding="async" /></div>
      </section>

      <section className="about-principles section-shell">
        <p className="section-index">From enquiry to reviewed deliverable</p>
        <h2>Define the scope, control the evidence and confirm each approval owner.</h2>
        <SectionVisual src="/fst-management.webp" alt="A facilitated workshop connecting evidence, owners and next actions" className="about-principles-visual" />
        <div className="principle-grid">
          <article><span className="item-icon principle-icon" aria-hidden="true"><Binoculars size={21} weight="regular" /></span><h3>Read the whole situation</h3><p>We establish the decision, constraints, owners and available evidence before proposing a workstream.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><CirclesThreePlus size={21} weight="regular" /></span><h3>Work across boundaries</h3><p>The plan keeps audit, tax, reporting, controls, corporate requirements and financing dependencies in one view.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><Target size={21} weight="regular" /></span><h3>Leave an executable route</h3><p>Outputs identify what must happen, who owns it, what evidence is needed and how progress will be reviewed.</p></article>
        </div>
      </section>

      <section className="about-story section-shell">
        <div className="about-story-image"><ResponsiveImage src="/fst-international.webp" alt="An international programme team coordinating delivery and accountability" sizes="(max-width: 720px) 100vw, 50vw" loading="lazy" decoding="async" /></div>
        <div><p className="section-index">The connected file</p><h2>No hand-off gaps between services.</h2><p>A plan affects cash. Cash affects finance. Structure affects tax and governance. Funding rules affect budgets and delivery evidence. FST keeps those links visible, so each workstream strengthens the others.</p><p>{siteConfig.portfolioRelationship} The contracting provider and responsible professional remain identified separately for each engagement.</p><Link className="text-link" href="/legal-information">How responsibility is assigned</Link></div>
      </section>

      <section className="combined-field-notes section-shell" id="field-notes" aria-labelledby="field-notes-title">
        <div className="combined-field-notes-heading">
          <p className="section-index">Field notes</p>
          <h2 id="field-notes-title">Working notes for decisions in motion.</h2>
          <p>Short, evidence-led perspectives drawn from FST’s management, audit, finance, tax, reporting and funding work.</p>
        </div>
        <div className="article-grid">
          {fieldNotes.map((article) => (
            <article className={`article-card accent-${article.tone}`} key={article.slug}>
              <ResponsiveImage src={article.image} alt={article.imageAlt} sizes="(max-width: 720px) 100vw, 33vw" loading="lazy" decoding="async" />
              <div><span>{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><Link className="text-link" href={`/insights/${article.slug}`}>Read field note</Link></div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
