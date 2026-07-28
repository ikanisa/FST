import Link from "next/link";
import { PrimaryCta } from "./components/PrimaryCta";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="not-found section-shell">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This page is no longer in view.</h1>
        <p>The link may have moved, or the address may be incomplete. Return to FST or start a conversation with our team.</p>
        <div className="not-found-actions">
          <PrimaryCta className="primary-button" />
          <Link className="text-link" href="/">Return home</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
