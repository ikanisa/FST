import Link from "next/link";
import { PrimaryCta } from "./components/PrimaryCta";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <section className="not-found section-shell">
        <p className="eyebrow">404 · Route unavailable</p>
        <h1>That address does not lead to an FST page.</h1>
        <p>Check the link, return to the main page or arrange a call if you were looking for a specific service.</p>
        <div className="not-found-actions">
          <PrimaryCta className="primary-button" />
          <Link className="text-link" href="/">Open the main page</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
