import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { fieldNotes } from "../../lib/field-notes";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Field Notes for Finance & Leadership",
  description: "Evidence-led FST field notes on internal controls, business planning, tax operations, finance and accountable implementation.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }]} />
      <SiteHeader />
      <section className="insights-index-hero section-shell">
        <p className="eyebrow">FST field notes</p>
        <h1>Working notes for decisions in motion.</h1>
        <p>Practical, evidence-led perspectives on controls, planning, finance and tax operations—written to leave a usable next step.</p>
      </section>
      <section className="article-grid insights-index-grid section-shell" aria-label="Published FST field notes">
        {fieldNotes.map((note) => (
          <article className={`article-card accent-${note.tone}`} key={note.slug}>
            <ResponsiveImage src={note.image} alt={note.imageAlt} sizes="(max-width: 720px) 100vw, 40vw" loading="lazy" decoding="async" />
            <div>
              <span>{note.category}</span>
              <h2>{note.title}</h2>
              <p>{note.summary}</p>
              <p className="article-meta"><time dateTime={note.published}>3 August 2026</time> · {note.readingTime}</p>
              <Link className="text-link" href={`/insights/${note.slug}`}>Read field note</Link>
            </div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
