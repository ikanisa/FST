import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing use of the FST website and its online features.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <article className="legal-page section-shell">
        <header className="legal-hero legal-hero-terms">
          <div>
            <p className="eyebrow">Site rules</p>
            <h1>The basis on which this site is provided.</h1>
            <p>These provisions apply when you access FST’s website, general information and online meeting features.</p>
            <small>Effective 20 July 2026</small>
          </div>
          <img src="/fst-legal.webp" alt="Professional website terms and engagement documents under review" width="1536" height="1024" />
        </header>

        <div className="legal-content">
          <nav aria-label="Terms of use contents">
            <a href="#acceptance">Acceptance</a>
            <a href="#information-only">Information only</a>
            <a href="#engagements">Professional engagements</a>
            <a href="#acceptable-use">Acceptable use</a>
            <a href="#liability">Responsibility</a>
            <a href="#terms-contact">Contact</a>
          </nav>
          <div className="legal-copy">
            <section id="acceptance"><h2>Acceptance and scope</h2><p>By accessing this website, you agree to these Terms of Use and our <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the website. Additional terms may apply to particular services or professional engagements.</p></section>
            <section id="information-only"><h2>Information, not professional advice</h2><p>Website content is general information only. It is not accounting, tax, legal or other professional advice and should not be relied on as a substitute for advice tailored to your circumstances.</p></section>
            <section id="engagements"><h2>Professional engagements</h2><p>Submitting an enquiry, selecting a meeting time or preparing a calendar invitation does not create a client relationship. A professional engagement begins only when the relevant FST entity and client agree written engagement terms, scope and responsibilities.</p></section>
            <section id="acceptable-use"><h2>Acceptable use</h2><p>You may use this website only for lawful purposes. You must not interfere with its operation, attempt unauthorised access, introduce harmful code, misuse scheduling features, copy content at scale or use the website in a way that infringes another person’s rights.</p></section>
            <section id="intellectual-property"><h2>Intellectual property</h2><p>Unless stated otherwise, FST or its licensors own the website, branding, design and content. You may view and print reasonable extracts for personal or internal business use, but may not reproduce, modify or commercially distribute them without permission.</p></section>
            <section id="external-services"><h2>External links and services</h2><p>The website may link to services operated by others, including Google Calendar. Those services have their own terms and privacy practices. FST is not responsible for their availability or content.</p></section>
            <section id="liability"><h2>Availability and responsibility</h2><p>We aim to keep the website accurate and available but do not guarantee uninterrupted access, completeness or suitability for a particular purpose. To the extent permitted by applicable law, FST is not responsible for loss arising solely from reliance on general website content or from external services.</p></section>
            <section id="changes"><h2>Changes and applicable terms</h2><p>We may update the website and these terms. The effective date above identifies the latest version. Any professional engagement is governed by its signed engagement terms and the law stated there; other website matters remain subject to applicable law.</p></section>
            <section id="terms-contact"><h2>Contact</h2><p>Questions about these terms can be sent through our <Link href="/contact">contact and booking page</Link>.</p></section>
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
