import Link from "next/link";
import { siteConfig } from "../../lib/site-config";
import { BrandLogo } from "./BrandLogo";
import { PrimaryCta } from "./PrimaryCta";
import { TrackedLink } from "./TrackedLink";
import { jurisdictionConfig, marketPath, type JurisdictionCode } from "../../lib/jurisdictions";

export function SiteFooter({ jurisdiction }: { jurisdiction?: JurisdictionCode } = {}) {
  const config = jurisdiction ? jurisdictionConfig[jurisdiction] : undefined;
  const path = (value: string) => jurisdiction ? marketPath(jurisdiction, value) : value;
  const whatsappUrl = jurisdiction ? config?.whatsappUrl || "" : siteConfig.whatsappUrl;
  const whatsappDisplay = jurisdiction ? config?.whatsappDisplay || "" : siteConfig.whatsappDisplay;

  return (
    <footer className="site-footer">
      <Link className="brand-logo brand-logo-footer" href={jurisdiction ? marketPath(jurisdiction) : "/"} aria-label="Go to the FST homepage">
        <BrandLogo />
      </Link>
      <div className="footer-summary">
        <p>Plans, audits, numbers, obligations and financing work—managed as a practical programme.</p>
      </div>
      <div className="footer-links">
        <nav aria-label="Footer links">
          <Link href={path("/services")}>Services</Link>
          {jurisdiction && <Link href={`${path("/services/catalogue")}#industry-package-title`}>Industry Packages</Link>}
          <Link href={path("/services/catalogue")}>Service Catalogue</Link>
          <Link href={path("/who-we-work-with")}>Organisations</Link>
          <Link href={path("/about")}>Our Approach</Link>
          {!jurisdiction && <Link href="/insights">Insights</Link>}
          {!jurisdiction && <Link href="/ai-agent-team">Meet Our AI Agent Team</Link>}
          <Link href={path("/contact")}>Get in touch</Link>
          <Link href={path("/legal-information")}>Legal information</Link>
          <Link href={path("/privacy")}>Privacy & cookies</Link>
          <Link href={path("/terms")}>Site terms</Link>
        </nav>
        <div className="footer-contact">
          {whatsappUrl && <TrackedLink href={whatsappUrl} event="contact_whatsapp_click" target="_blank" rel="noreferrer">WhatsApp · {whatsappDisplay}</TrackedLink>}
          <PrimaryCta jurisdiction={jurisdiction} />
          {siteConfig.linkedInUrl && <TrackedLink href={siteConfig.linkedInUrl} event="linkedin_click" target="_blank" rel="noreferrer">LinkedIn</TrackedLink>}
        </div>
      </div>
      <small>© 2026 FST. Website requests are non-binding. The contracting provider and responsible professional are confirmed before any engagement starts.</small>
    </footer>
  );
}
