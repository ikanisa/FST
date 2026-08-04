import { siteUrl } from "../../lib/seo";
import { legalDisclosureReady } from "../../lib/site-config";

type JsonLdProps = {
  data: Record<string, unknown>;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

function serialize(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.path}`,
        })),
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  path,
  description,
  services,
}: {
  name: string;
  path: string;
  description: string;
  services: Array<{ title: string; description: string }>;
}) {
  const url = `${siteUrl}${path}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name, path },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name,
          url,
          description,
          provider: legalDisclosureReady ? { "@id": `${siteUrl}/#organization` } : undefined,
          areaServed: [
            { "@type": "Country", name: "Malta" },
            { "@type": "Place", name: "International" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${name} services`,
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.title,
                description: service.description,
              },
            })),
          },
        }}
      />
    </>
  );
}
