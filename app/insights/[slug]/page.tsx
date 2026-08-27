import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fieldNotes, getFieldNote } from "../../../lib/field-notes";
import { pageMetadata, siteUrl } from "../../../lib/seo";
import { legalDisclosureReady } from "../../../lib/site-config";
import { BreadcrumbJsonLd, JsonLd } from "../../components/JsonLd";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type FieldNotePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: FieldNotePageProps): Promise<Metadata> {
  const note = getFieldNote((await params).slug);
  if (!note) return {};
  return pageMetadata({
    title: note.slug === "tax-working-file-that-reconciles" ? "Tax Working Files That Reconcile Before Filing" : note.title,
    description: note.description,
    path: `/insights/${note.slug}`,
    image: note.image,
    imageAlt: note.imageAlt,
    imageWidth: 1536,
    imageHeight: 1024,
    openGraphType: "article",
    publishedTime: note.published,
  });
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const note = getFieldNote((await params).slug);
  if (!note) notFound();
  const url = `${siteUrl}/insights/${note.slug}`;

  return (
    <main id="main-content" tabIndex={-1}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: note.title, path: `/insights/${note.slug}` }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: note.title,
        description: note.description,
        datePublished: note.published,
        dateModified: note.published,
        image: `${siteUrl}${note.image}`,
        mainEntityOfPage: url,
        publisher: legalDisclosureReady ? { "@id": `${siteUrl}/#organization` } : undefined,
        isPartOf: { "@id": `${siteUrl}/#website` },
      }} />
      <SiteHeader />
      <article className="field-note-page">
        <header className="field-note-hero section-shell">
          <div>
            <p className="eyebrow">{note.category}</p>
            <h1>{note.title}</h1>
            <p>{note.summary}</p>
            <p className="article-meta"><time dateTime={note.published}>3 August 2026</time> · {note.readingTime}</p>
          </div>
          <ResponsiveImage src={note.image} alt={note.imageAlt} sizes="(max-width: 900px) 100vw, 46vw" loading="eager" fetchPriority="high" decoding="async" />
        </header>
        <div className="field-note-body section-shell">
          <aside>
            <p className="section-index">Use this note</p>
            <p>Adapt the questions and outputs to the organisation, applicable professional requirements and evidence available. This article is general information, not a professional conclusion.</p>
          </aside>
          <div className="field-note-copy">
            {note.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </section>
            ))}
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
