import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How FST collects, uses and protects personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader />
      <article className="legal-page section-shell">
        <header className="legal-hero">
          <div>
            <p className="eyebrow">Data notice</p>
            <h1>How website information is handled.</h1>
            <p>This notice sets out the information FST receives through the site, the purposes for using it and the controls available to you.</p>
            <small>Effective 20 July 2026</small>
          </div>
          <img src="/fst-legal.webp" alt="A structured document review concerning data and website terms" width="1536" height="1024" />
        </header>

        <div className="legal-content">
          <nav aria-label="Privacy policy contents">
            <a href="#information">Information we collect</a>
            <a href="#use">How we use it</a>
            <a href="#sharing">Sharing and transfers</a>
            <a href="#retention">Retention and security</a>
            <a href="#rights">Your choices</a>
            <a href="#contact-privacy">Contact</a>
          </nav>
          <div className="legal-copy">
            <section id="information"><h2>Information we collect</h2><p>We may receive information you provide when you contact us or prepare a meeting invitation, including your name, work email, organisation, selected service, preferred meeting time and any context you choose to share.</p><p>We may also collect limited technical information such as device type, browser, approximate location, referring page and website usage data where analytics or security tools are enabled.</p></section>
            <section id="use"><h2>How we use information</h2><p>We use information to respond to enquiries, arrange meetings, deliver and improve our services, protect the website, meet professional or legal obligations and communicate relevant updates where permitted.</p><p>Depending on the context, processing may be based on your consent, steps taken at your request, performance of a contract, legitimate business interests or compliance with legal obligations.</p></section>
            <section id="sharing"><h2>Sharing and international transfers</h2><p>Information may be shared with FST personnel, professional advisers and carefully selected technology providers that support hosting, communications, analytics and scheduling. We do not sell personal information.</p><p>Where information is transferred across borders, we use appropriate contractual, organisational or legal safeguards suited to the countries involved.</p></section>
            <section id="retention"><h2>Retention and security</h2><p>We retain information only for as long as reasonably needed for the purpose collected, professional record-keeping, dispute management and applicable legal requirements. We use proportionate administrative, technical and organisational safeguards, although no online service can guarantee absolute security.</p></section>
            <section id="rights"><h2>Your choices and rights</h2><p>Depending on applicable law, you may request access, correction, deletion, restriction, portability or objection to certain uses of your information, and may withdraw consent where processing relies on it. You may also contact the relevant data-protection authority.</p></section>
            <section id="cookies"><h2>Cookies and external services</h2><p>The website may use essential storage for core functions and, where enabled, limited analytics. External services such as Google Calendar operate under their own privacy terms when you choose to open them.</p></section>
            <section id="contact-privacy"><h2>Contact and updates</h2><p>For privacy questions or requests, use our <Link href="/contact">contact and booking page</Link>. We may update this policy as our services, technology or legal obligations change; the effective date above shows the latest revision.</p></section>
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
