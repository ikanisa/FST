import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJurisdiction, marketPath } from "../../../../lib/jurisdictions";
import { getJurisdictionService, getJurisdictionServices } from "../../../../lib/jurisdiction-services";
import { jurisdictionPageMetadata } from "../../../../lib/seo";
import { ServicePage } from "../../../components/ServicePage";

type PageProps = { params: Promise<{ jurisdiction: string; service: string }> };

export function generateStaticParams() {
  return (["mt", "rw"] as const).flatMap((jurisdiction) =>
    getJurisdictionServices(jurisdiction).map((service) => ({ jurisdiction, service: service.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const values = await params;
  const config = getJurisdiction(values.jurisdiction);
  if (!config) return {};
  const service = getJurisdictionService(config.code, values.service);
  if (!service) return {};
  return jurisdictionPageMetadata({
    jurisdiction: config.code,
    title: service.seoTitle || `${service.title} in ${config.name}`,
    description: service.seoDescription || service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function JurisdictionServiceDetailPage({ params }: PageProps) {
  const values = await params;
  const config = getJurisdiction(values.jurisdiction);
  if (!config) notFound();
  const service = getJurisdictionService(config.code, values.service);
  if (!service) notFound();

  return <ServicePage
    jurisdiction={config.code}
    serviceName={service.title}
    path={marketPath(config.code, `/services/${service.slug}`)}
    eyebrow={service.shortTitle}
    title={service.introduction}
    lede={service.description}
    image={service.image}
    imageAlt={service.imageAlt}
    introduction={service.introduction}
    services={service.offerings}
    outcomes={service.outcomes}
    accent={service.accent}
    professionalNote={service.professionalNote}
    sectionImages={{
      intro: { src: "/fst-collaboration.webp", alt: "A multidisciplinary team agreeing the work scope and evidence requirements" },
      offerings: { src: service.image, alt: service.imageAlt },
      outcomes: { src: "/fst-management.webp", alt: "Owners reviewing conclusions, responsibilities and next actions" },
      cta: { src: "/fst-consultation.webp", alt: "A focused first discussion about the required outcome" },
    }}
  />;
}
