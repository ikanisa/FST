import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://fst.ikanisa.com").replace(/\/$/, "");

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/og.jpg",
  imageAlt = "FST — Make the next move workable.",
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} | FST`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: "FST",
      locale: "en_MT",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, type: "image/jpeg", alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
