import Link from "next/link";
import { siteConfig } from "../../lib/site-config";
import { PrimaryCta } from "./PrimaryCta";
import { TrackedLink } from "./TrackedLink";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark footer-mark" href="/">FST</Link>
      <div className="footer-summary">
        <p>Plans, numbers, obligations and funding work—managed as a practical programme.</p>
        <span>{siteConfig.serviceArea}</span>
      </div>
      <div className="footer-links">
        <nav aria-label="Footer links">
          <Link href="/services">Services</Link>
          <Link href="/who-we-work-with">Organisations</Link>
          <Link href="/about">Our approach</Link>
          <Link href="/insights">Field notes</Link>
          <Link href="/contact">Get in touch</Link>
          <Link href="/privacy">Data notice</Link>
          <Link href="/terms">Site rules</Link>
        </nav>
        <div className="footer-contact">
          <TrackedLink href={siteConfig.whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">WhatsApp · {siteConfig.whatsappDisplay}</TrackedLink>
          <PrimaryCta />
          {siteConfig.linkedInUrl && <TrackedLink href={siteConfig.linkedInUrl} event="linkedin_click" target="_blank" rel="noreferrer">LinkedIn</TrackedLink>}
        </div>
      </div>
      <small>© 2026 FST. Advisory support delivered online and by prior appointment.</small>
    </footer>
  );
}
