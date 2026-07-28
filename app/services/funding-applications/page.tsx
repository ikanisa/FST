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
    title="From funding opportunity to review-ready application."
    lede="End-to-end support across FONDI.eu, Malta Enterprise and Xjenza Malta routes—grounded in current official guidance, eligibility and evidence."
    image="/funding-application-services.webp"
    imageAlt="Funding adviser and business leaders reviewing a complete application strategy"
    sectionImages={{
      intro: { src: "/funding-intro-v2.webp", alt: "Funding specialist mapping official routes and eligibility with a business owner" },
      offerings: { src: "/funding-offerings-v2.webp", alt: "Multidisciplinary team assembling narrative, budget, compliance and evidence workstreams" },
      outcomes: { src: "/funding-outcomes-v2.webp", alt: "Business leaders reviewing a coherent and complete funding application pack" },
      cta: { src: "/funding-cta-v2.webp", alt: "Funding adviser listening closely during a confidential first consultation" },
    }}
    introduction="A strong application begins with the right route, an eligible project and a source-backed case in which the narrative, budget and evidence all agree."
    accent="green"
    referenceLinks={[
      { label: "FONDI.eu", href: "https://fondi.eu/what-funding-is-available/", description: "EU and cohesion-funded calls, official guidance, application documents and beneficiary requirements." },
      { label: "Malta Enterprise", href: "https://maltaenterprise.com/support", description: "Enterprise incentives, tax credits, repayable finance, business development and innovation support." },
      { label: "Xjenza Malta", href: "https://xjenzamalta.mt/media/open-funding-schemes/", description: "Current research, innovation, digital, commercialisation and collaboration funding schemes." },
    ]}
    services={[
      { title: "Funding opportunity scan", description: "Current-source review of relevant FONDI.eu, Malta Enterprise, Xjenza Malta and connected Malta funding routes." },
      { title: "Route fit & eligibility", description: "Applicant, activity, timing, state-aid, sector, cost and funding-route assessment before drafting begins." },
      { title: "Project concept & design", description: "Clear objectives, work packages, milestones, outputs, outcomes, indicators, delivery model and implementation plan." },
      { title: "Application narrative & forms", description: "Preparation or review of official forms and narrative responses aligned to the scoring criteria and source evidence." },
      { title: "Business plan & annexes", description: "Commercial case, market need, operating model, management capacity, sustainability and route-specific supporting annexes." },
      { title: "Budget & co-financing", description: "Eligible-cost model, aid intensity, own contribution, quotations, cash flow, assumptions and narrative cross-checks." },
      { title: "State aid & double-funding checks", description: "De minimis or other aid mapping, prior and pending support review, cost separation and conflict controls." },
      { title: "Evidence & attachment pack", description: "Compliance matrix, evidence register, declarations, accounts, tax status, quotations, CVs and attachment tracking." },
      { title: "Submission-readiness review", description: "Final completeness, consistency and portal-readiness review, with submission retained for the authorised human." },
      { title: "Post-award support", description: "Implementation files, milestones, procurement records, claim support, reporting calendars and change-control assistance." },
    ]}
    outcomes={["A better-matched funding route", "A coherent narrative and budget", "A complete evidence-led application pack", "Clear human approval and submission control"]}
  />;
}
