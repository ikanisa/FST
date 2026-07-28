import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = pageMetadata({ title: "Field Notes", description: "FST perspectives on management, controls, tax, reporting, finance and funding.", path: "/insights" });

const articles = [
  { category: "Controls in practice", title: "What a useful internal-control review should leave behind", summary: "A field guide to process ownership, testable evidence and actions that management can actually close.", image: "/fst-management.webp", imageAlt: "A controls workshop assigning owners and actions", tone: "violet" },
  { category: "Plans and finance", title: "Stress-testing a business plan before the lender does", summary: "The connections to check across the commercial case, cash forecast, borrowing need and repayment assumptions.", image: "/fst-finance.webp", imageAlt: "A financial model and business plan being stress-tested", tone: "cobalt" },
  { category: "Tax operations", title: "Building a VAT file that reconciles before filing day", summary: "How a repeatable ledger-to-return review can surface missing support and classification issues earlier.", image: "/fst-tax.webp", imageAlt: "A tax specialist reconciling a VAT working file", tone: "orange" },
];

export default function InsightsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="index-hero image-index-hero insights-hero">
        <div><h1>Working notes for decisions in motion.</h1><p>Short, evidence-led perspectives from FST’s management, finance, tax, reporting and funding work.</p></div>
        <img src="/fst-insights.webp" alt="An evidence-led advisory research workspace" width="1536" height="1024" loading="eager" fetchPriority="high" decoding="async" />
      </section>
      <section className="article-grid section-shell">
        {articles.map((article) => (
          <article className={`article-card accent-${article.tone}`} key={article.title}>
            <img src={article.image} alt={article.imageAlt} width="1536" height="1024" loading="lazy" decoding="async" />
            <div><span>{article.category}</span><h2>{article.title}</h2><p>{article.summary}</p></div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
