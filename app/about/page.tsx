import { Binoculars } from "@phosphor-icons/react/dist/ssr/Binoculars";
import { CirclesThreePlus } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { SectionVisual } from "../components/SectionVisual";
import { PrimaryCta } from "../components/PrimaryCta";

export const metadata = pageMetadata({ title: "About", description: "A senior-led multidisciplinary advisory firm built around clarity, connection and practical progress.", path: "/about" });

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="subpage-hero accent-green">
        <div className="subpage-copy">
          <p className="eyebrow">About FST</p>
          <h1>Close enough to understand. Experienced enough to challenge.</h1>
          <p>We bring management advisory, risk, tax, accounting, corporate, business-planning, finance and funding-application expertise together around the decisions that shape organisations.</p>
          <PrimaryCta className="primary-button" />
        </div>
        <div className="subpage-image-wrap"><img src="/about-team.webp" alt="A multidisciplinary team of senior advisers in discussion" className="subpage-image" width="1600" height="1000" loading="eager" fetchPriority="high" decoding="async" /></div>
      </section>

      <section className="about-principles section-shell">
        <p className="section-index">What defines us</p>
        <h2>Senior attention. Connected expertise. Straightforward advice.</h2>
        <SectionVisual src="/about-principles-v2.webp" alt="Senior advisers combining close client attention with multidisciplinary expertise" className="about-principles-visual" />
        <div className="principle-grid">
          <article><span className="item-icon principle-icon" aria-hidden="true"><Binoculars size={21} weight="regular" /></span><h3>Start with context</h3><p>We take time to understand the organisation, the people and the decision—not only the immediate task.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><CirclesThreePlus size={21} weight="regular" /></span><h3>Connect the disciplines</h3><p>Management, risk, tax, accounting, corporate, finance and funding perspectives stay joined around the same objective.</p></article>
          <article><span className="item-icon principle-icon" aria-hidden="true"><Target size={21} weight="regular" /></span><h3>Keep progress practical</h3><p>Our work is designed to help leaders act with greater clarity, not to add another layer of complexity.</p></article>
        </div>
      </section>

      <section className="about-story section-shell">
        <div className="about-story-image"><img src="/about-story-v2.webp" alt="A broader advisory team connecting decisions across service boundaries" width="1536" height="1024" loading="lazy" decoding="async" /></div>
        <div><p className="section-index">One firm, broader perspective</p><h2>Built for decisions that cross boundaries.</h2><p>Important decisions rarely fit neatly inside one service line. Reporting affects tax. Strategy changes risk. Ownership shapes governance. Corporate structure influences operations. Plans, finance and funding applications depend on all of them. Our model keeps those perspectives together.</p></div>
      </section>
      <SiteFooter />
    </main>
  );
}
