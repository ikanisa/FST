import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { Calculator } from "@phosphor-icons/react/dist/ssr/Calculator";
import { ChartBar } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { Checks } from "@phosphor-icons/react/dist/ssr/Checks";
import { ClipboardText } from "@phosphor-icons/react/dist/ssr/ClipboardText";
import { Compass } from "@phosphor-icons/react/dist/ssr/Compass";
import { FileText } from "@phosphor-icons/react/dist/ssr/FileText";
import { FolderSimple } from "@phosphor-icons/react/dist/ssr/FolderSimple";
import { Gauge } from "@phosphor-icons/react/dist/ssr/Gauge";
import { HandCoins } from "@phosphor-icons/react/dist/ssr/HandCoins";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import { Notebook } from "@phosphor-icons/react/dist/ssr/Notebook";
import { Percent } from "@phosphor-icons/react/dist/ssr/Percent";
import { Scales } from "@phosphor-icons/react/dist/ssr/Scales";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { ShieldWarning } from "@phosphor-icons/react/dist/ssr/ShieldWarning";
import { TreeStructure } from "@phosphor-icons/react/dist/ssr/TreeStructure";
import { SectionVisual } from "./SectionVisual";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { PrimaryCta } from "./PrimaryCta";
import { ResponsiveImage } from "./ResponsiveImage";
import { ServiceJsonLd } from "./JsonLd";
import type { JurisdictionCode } from "../../lib/jurisdictions";

type ServicePageProps = {
  jurisdiction?: JurisdictionCode;
  serviceName: string;
  path: string;
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  introduction: string;
  services: Array<{ title: string; description: string }>;
  outcomes: string[];
  accent: "cobalt" | "violet" | "orange" | "rose" | "blue";
  referenceLinks?: Array<{ label: string; href: string; description: string }>;
  professionalNote?: {
    title: string;
    description: string;
  };
  sectionImages: {
    intro: { src: string; alt: string };
    offerings: { src: string; alt: string };
    outcomes: { src: string; alt: string };
    cta: { src: string; alt: string };
  };
};

function iconForService(title: string) {
  const service = title.toLowerCase();

  if (service.includes("financial statement") || service.includes("financial reporting")) return FileText;
  if (service.includes("business-plan") || service.includes("narrative") || service.includes("evidence pack")) return FileText;
  if (service.includes("funding") || service.includes("loan submission") || service.includes("co-financing")) return HandCoins;
  if (service.includes("review") || service.includes("eligibility") || service.includes("readiness")) return MagnifyingGlass;
  if (service.includes("company formation")) return Buildings;
  if (service.includes("corporate administration")) return FolderSimple;
  if (service.includes("secretarial")) return Notebook;
  if (service.includes("governance & compliance") || service === "governance support") return Scales;
  if (service.includes("corporate changes")) return TreeStructure;
  if (service.includes("statutory compliance")) return ClipboardText;
  if (service.includes("financial planning")) return Calculator;
  if (service.includes("wealth structuring")) return TreeStructure;
  if (service.includes("operating model")) return TreeStructure;
  if (service.includes("strategy")) return Compass;
  if (service.includes("risk management")) return ShieldWarning;
  if (service.includes("internal audit")) return MagnifyingGlass;
  if (service.includes("internal controls")) return Checks;
  if (service.includes("performance improvement")) return Gauge;
  if (service.includes("tax advisory")) return Percent;
  if (service.includes("tax compliance")) return ClipboardText;
  if (service === "accounting") return Calculator;
  if (service === "payroll") return ChartBar;
  return ShieldCheck;
}

export function ServicePage({
  jurisdiction,
  serviceName,
  path,
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  introduction,
  services,
  outcomes,
  accent,
  sectionImages,
  referenceLinks,
  professionalNote,
}: ServicePageProps) {
  return (
    <main id="main-content" tabIndex={-1}>
      <ServiceJsonLd
        name={serviceName}
        path={path}
        description={lede}
        services={services}
        jurisdiction={jurisdiction}
      />
      <SiteHeader jurisdiction={jurisdiction} />
      <section className={`subpage-hero accent-${accent}`}>
        <div className="subpage-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{lede}</p>
          <PrimaryCta jurisdiction={jurisdiction} className="primary-button" />
        </div>
        <div className="subpage-image-wrap">
          <ResponsiveImage
            src={image}
            alt={imageAlt}
            className="subpage-image"
            sizes="(max-width: 900px) 100vw, 52vw"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="service-intro section-shell">
        <div className="service-intro-copy">
          <p className="section-index">Scope and purpose</p>
          <h2>{introduction}</h2>
        </div>
        <SectionVisual src={sectionImages.intro.src} alt={sectionImages.intro.alt} className="service-intro-visual" />
      </section>

      {professionalNote && (
        <aside className="service-professional-note section-shell" aria-labelledby="professional-note-title">
          <p className="section-index">Professional requirements</p>
          <div>
            <h2 id="professional-note-title">{professionalNote.title}</h2>
            <p>{professionalNote.description}</p>
          </div>
        </aside>
      )}

      {referenceLinks && (
        <section className="service-references section-shell" aria-labelledby="service-reference-title">
          <div>
            <p className="section-index">Official programme sources</p>
            <h2 id="service-reference-title">Current routes checked before the funding application is shaped.</h2>
          </div>
          <div className="service-reference-links">
            {referenceLinks.map((reference) => (
              <a href={reference.href} target="_blank" rel="noreferrer" key={reference.href}>
                <strong>{reference.label}</strong>
                <span>{reference.description}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="service-offerings-shell section-shell" aria-label={`${title} services`}>
        <SectionVisual src={sectionImages.offerings.src} alt={sectionImages.offerings.alt} className="service-offerings-visual" />
        <div className="service-offerings">
          {services.map((service) => {
            const ServiceIcon = iconForService(service.title);
            return (
              <article key={service.title}>
                <span className="item-icon service-offering-icon" aria-hidden="true"><ServiceIcon size={21} weight="regular" /></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={`service-outcomes section-shell accent-${accent}`}>
        <div>
          <p className="section-index">Expected deliverables and decisions</p>
          <h2>Usable deliverables, source-linked evidence and named review points.</h2>
        </div>
        <ul>
          {outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
        </ul>
        <SectionVisual src={sectionImages.outcomes.src} alt={sectionImages.outcomes.alt} className="service-outcomes-visual" />
      </section>

      <section className="subpage-cta section-shell">
        <div className="subpage-cta-copy">
          <p className="section-index">Request a scope review</p>
          <h2>Send the service, deadline and records already available.</h2>
          <p>FST will confirm the deliverables, information required, review sequence and responsible professional route.</p>
          <PrimaryCta jurisdiction={jurisdiction} className="primary-button" />
        </div>
        <SectionVisual src={sectionImages.cta.src} alt={sectionImages.cta.alt} className="subpage-cta-visual" />
      </section>
      <SiteFooter jurisdiction={jurisdiction} />
    </main>
  );
}
