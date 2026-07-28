import Link from "next/link";
import { siteConfig } from "../../lib/site-config";
import { PrimaryCta } from "./PrimaryCta";
import { TrackedLink } from "./TrackedLink";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark footer-mark" href="/">FST</Link>
      <div className="footer-summary">
        <p>Management, finance, tax, corporate and application expertise—connected around what comes next.</p>
        <span>{siteConfig.serviceArea}</span>
      </div>
      <div className="footer-links">
        <nav aria-label="Footer">
          <Link href="/services">Expertise</Link>
          <Link href="/who-we-work-with">Who we work with</Link>
          <Link href="/about">About</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <div className="footer-contact">
          <span>{siteConfig.email}</span>
          <TrackedLink href={`tel:${siteConfig.phoneE164}`} event="contact_phone_click">{siteConfig.phoneDisplay}</TrackedLink>
          <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">WhatsApp</TrackedLink>
          <PrimaryCta />
          {siteConfig.linkedInUrl && <TrackedLink href={siteConfig.linkedInUrl} event="linkedin_click" target="_blank" rel="noreferrer">LinkedIn</TrackedLink>}
        </div>
      </div>
      <small>© 2026 FST. All rights reserved. International advisory services; meetings online and by appointment.</small>
    </footer>
  );
}
