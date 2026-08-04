import Link from "next/link";
import { siteConfig } from "../../lib/site-config";
import { BrandLogo } from "./BrandLogo";
import { PrimaryCta } from "./PrimaryCta";
import { TrackedLink } from "./TrackedLink";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="brand-logo brand-logo-footer" href="/" aria-label="Go to the FST homepage">
        <BrandLogo />
      </Link>
      <div className="footer-summary">
        <p>Plans, audits, numbers, obligations and financing work—managed as a practical programme.</p>
        <span>{siteConfig.serviceArea}</span>
      </div>
      <div className="footer-links">
        <nav aria-label="Footer links">
          <Link href="/services">Services</Link>
          <Link href="/services/catalogue">Service Catalogue</Link>
          <Link href="/who-we-work-with">Organisations</Link>
          <Link href="/about">Our Approach</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/ai-agent-team">Meet Our AI Agent Team</Link>
          <Link href="/contact">Get in touch</Link>
          <Link href="/legal-information">Legal information</Link>
          <Link href="/privacy">Privacy & cookies</Link>
          <Link href="/terms">Site terms</Link>
        </nav>
        <div className="footer-contact">
          <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">WhatsApp · {siteConfig.whatsappDisplay}</TrackedLink>
          <PrimaryCta />
          {siteConfig.linkedInUrl && <TrackedLink href={siteConfig.linkedInUrl} event="linkedin_click" target="_blank" rel="noreferrer">LinkedIn</TrackedLink>}
        </div>
      </div>
      <small>© 2026 FST. Website requests are non-binding. The contracting provider and responsible professional are confirmed before any engagement starts.</small>
    </footer>
  );
}
