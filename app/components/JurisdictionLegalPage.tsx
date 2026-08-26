import Link from "next/link";
import { jurisdictionConfig, marketPath, type JurisdictionCode } from "../../lib/jurisdictions";
import { siteConfig } from "../../lib/site-config";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export type JurisdictionLegalKind = "legal-information" | "privacy" | "terms";

export function JurisdictionLegalPage({ jurisdiction, kind }: { jurisdiction: JurisdictionCode; kind: JurisdictionLegalKind }) {
  const config = jurisdictionConfig[jurisdiction];

  const content = kind === "privacy" ? {
    title: "Privacy & cookies",
    intro: "This notice explains how the website handles contact, booking, catalogue and analytics data.",
    sections: [
      ["Data we collect", "Contact and booking details you submit, selected services, consent evidence, technical security logs and analytics choices. Do not send special-category or highly confidential records through first-contact forms."],
      ["Why we use it", "To route the request correctly, assess fit, respond, schedule meetings, protect the service, prevent abuse and keep evidence of consent and operational handling."],
      ["Routing and recipients", "Requests are tagged automatically and may be accessed only by configured FST intake personnel and providers needed to operate the service. A separate professional engagement privacy notice applies after acceptance."],
      ["Retention and rights", "Intake records are retained only for the approved operational period, legal obligations and dispute protection. Use the listed contact route to request access, correction, restriction, objection or deletion where applicable."],
      ["Cookies", "Essential storage supports security and form operation. Optional analytics load only after consent and can be refused without losing access to the site."],
    ],
  } : kind === "terms" ? {
    title: "Site terms",
    intro: "These terms apply to the FST information, catalogue, contact and scheduling routes.",
    sections: [
      ["Information only", "Website content is general information and does not create professional advice, an audit conclusion, a legal opinion, a tax position or a funding decision."],
      ["No automatic engagement", "A form submission, catalogue selection, calendar draft or meeting request is non-binding. An engagement starts only after provider identity, authority, conflicts, scope, fee, responsibilities and terms are confirmed in writing."],
      ["User responsibilities", "Provide accurate information, use the service route presented to you and do not upload credentials, identity documents, confidential client files or unlawful content through first-contact surfaces."],
      ["External services", "Calendar, email, WhatsApp and third-party links operate under their own terms and availability. FST does not guarantee an external service or funding outcome."],
      ["Applicable route", "The responsible provider and governing engagement terms are confirmed for each matter. A website route does not by itself identify the contracting legal entity or licensed professional."],
    ],
  } : {
    title: "Legal & professional-provider information",
    intro: `This route separates website ownership, intake, preparation support and regulated professional responsibility.`,
    sections: [
      ["Website operator", siteConfig.legalName ? `${siteConfig.legalName} operates the FST website. Registration and address information is provided below where configured.` : "The website operator's full legal disclosure is published when the required registration and address fields are configured."],
      ["Contracting provider", "The contracting provider is confirmed before work starts. It may differ by service, applicable rules, professional authority and delivery arrangement."],
      ["Professional responsibility", config.operationalNotice],
      ["Supervised AI preparation", "FST may use supervised professional AI agents for research, reconciliation, drafting, evidence indexing and quality checks. Agents do not accept engagements, sign opinions, approve filings or replace accountable human judgement."],
      ["Complaints and concerns", config.contactEmail ? `Request the applicable complaints route through ${config.contactEmail}. The route depends on the service and responsible provider.` : "Use the contact page to request the applicable complaints route. The route depends on the service and responsible provider."],
    ],
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <SiteHeader jurisdiction={jurisdiction} />
      <article className="legal-page section-shell">
        <header className="legal-page-hero"><h1>{content.title}</h1><p>{content.intro}</p></header>
        <div className="legal-copy">
          {content.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
          <section><h2>Related information</h2><p><Link href={marketPath(jurisdiction, "/privacy")}>Privacy & cookies</Link> · <Link href={marketPath(jurisdiction, "/terms")}>Site terms</Link> · <Link href={marketPath(jurisdiction, "/legal-information")}>Provider information</Link> · <Link href={marketPath(jurisdiction, "/contact")}>Contact FST</Link></p></section>
        </div>
      </article>
      <SiteFooter jurisdiction={jurisdiction} />
    </main>
  );
}
