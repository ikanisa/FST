import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://fst.ikanisa.com").replace(/\/$/, "");

function imageContentType(image: string) {
  if (image.endsWith(".webp")) return "image/webp";
  if (image.endsWith(".png")) return "image/png";
  return "image/jpeg";
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  openGraphType?: "website" | "article";
  publishedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/og.jpg",
  imageAlt = "FST — Make the next move workable.",
  imageWidth = 1200,
  imageHeight = 630,
  openGraphType = "website",
  publishedTime,
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
    openGraph: openGraphType === "article" ? {
      title: socialTitle,
      description,
      url: path,
      siteName: "FST",
      locale: "en_MT",
      type: "article",
      publishedTime,
      modifiedTime: publishedTime,
      images: [{ url: image, width: imageWidth, height: imageHeight, type: imageContentType(image), alt: imageAlt }],
    } : {
      title: socialTitle,
      description,
      url: path,
      siteName: "FST",
      locale: "en_MT",
      type: "website",
      images: [{ url: image, width: imageWidth, height: imageHeight, type: imageContentType(image), alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
