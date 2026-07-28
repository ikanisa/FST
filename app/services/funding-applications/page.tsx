import { pageMetadata } from "../../../lib/seo";
import { ServicePage } from "../../components/ServicePage";

export const metadata = pageMetadata({
  title: "Funding Application Services",
  description: "End-to-end Malta funding application support across FONDI.eu, Malta Enterprise and Xjenza Malta programmes.",
  path: "/services/funding-applications",
});

export default function FundingApplicationsPage() {
  return <ServicePage
    eyebrow="Funding Application Services"
    title="Convert an eligible project into a complete application."
    lede="Full application support for relevant FONDI.eu, Malta Enterprise and Xjenza Malta routes—from call screening through approved human submission."
    image="/funding-application-services.webp"
    imageAlt="Funding adviser and business leaders reviewing a complete application strategy"
    sectionImages={{
      intro: { src: "/funding-intro-v2.webp", alt: "Funding specialist mapping official routes and eligibility with a business owner" },
      offerings: { src: "/funding-offerings-v2.webp", alt: "Multidisciplinary team assembling narrative, budget, compliance and evidence workstreams" },
      outcomes: { src: "/funding-outcomes-v2.webp", alt: "Business leaders reviewing a coherent and complete funding application pack" },
      cta: { src: "/funding-cta-v2.webp", alt: "Funding adviser listening closely during a confidential first consultation" },
    }}
    introduction="FST builds one controlled application file in which the call rules, project design, budget, claims and attachments can be checked against each other."
    accent="green"
    referenceLinks={[
      { label: "FONDI.eu", href: "https://fondi.eu/what-funding-is-available/", description: "EU and cohesion-funded calls, official guidance, application documents and beneficiary requirements." },
      { label: "Malta Enterprise", href: "https://maltaenterprise.com/support", description: "Enterprise incentives, tax credits, repayable finance, business development and innovation support." },
      { label: "Xjenza Malta", href: "https://xjenzamalta.mt/media/open-funding-schemes/", description: "Current research, innovation, digital, commercialisation and collaboration funding schemes." },
    ]}
    services={[
      { title: "Funding opportunity scan", description: "Live review of suitable calls and schemes from the named official Malta funding sources." },
      { title: "Route fit & eligibility", description: "Documented screening of applicant, activity, timing, sector, costs, aid rules and threshold conditions." },
      { title: "Project concept & design", description: "Objectives, work packages, milestones, outputs, outcomes, indicators, delivery roles and implementation logic." },
      { title: "Application narrative & forms", description: "Drafting or review of responses and forms mapped to the scheme criteria, limits and available evidence." },
      { title: "Business plan & annexes", description: "Market rationale, operating model, delivery capacity, sustainability case and route-specific annex preparation." },
      { title: "Budget & co-financing", description: "Eligible-cost budget, aid intensity, own contribution, quotations, cash flow and cross-document consistency checks." },
      { title: "State aid & double-funding checks", description: "Prior and pending aid mapping, de minimis or applicable aid treatment, cost separation and conflict checks." },
      { title: "Evidence & attachment pack", description: "A compliance matrix and indexed set of declarations, accounts, tax records, quotations, CVs and other proof." },
      { title: "Submission-readiness review", description: "Final portal, completeness and consistency check; the authorised human keeps approval and submission control." },
      { title: "Post-award support", description: "Implementation file setup, procurement evidence, milestones, claims, reports and change-control support." },
    ]}
    outcomes={["A documented route decision", "A scored narrative and eligible budget", "A complete attachment register", "Explicit human approval before submission"]}
  />;
}
