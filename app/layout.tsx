import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "./globals.css";
import { siteUrl } from "../lib/seo";
import { siteConfig } from "../lib/site-config";
import { AnalyticsConsent } from "./components/AnalyticsConsent";
import { JsonLd } from "./components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FST | Make the next move workable",
    template: "%s | FST",
  },
  description:
    "Management, audit, assurance, tax, accounting, corporate and consolidated loan and funding application support organised around executable outcomes.",
  alternates: { canonical: "/" },
  applicationName: "FST",
  category: "professional services",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
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
    title: "FST | Make the next move workable",
    description:
      "Management, audit, assurance, tax, accounting, corporate and consolidated loan and funding application support organised around executable outcomes.",
    url: "/",
    siteName: "FST",
    locale: "en_MT",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "FST — Make the next move workable.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FST | Make the next move workable",
    description:
      "Management, audit, assurance, tax, accounting, corporate and consolidated loan and funding application support organised around executable outcomes.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: "FST",
        url: `${siteUrl}/`,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/brand/fst-logo.svg`,
        },
        image: `${siteUrl}/og.jpg`,
        description:
          "Management, audit, assurance, tax, accounting, corporate and consolidated loan and funding application support organised around executable outcomes.",
        areaServed: [
          { "@type": "Country", name: "Malta" },
          { "@type": "Place", name: "International" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.whatsappDisplay,
          url: siteConfig.whatsappUrl,
          contactType: "client enquiries",
          availableLanguage: ["English"],
        },
        sameAs: siteConfig.linkedInUrl ? [siteConfig.linkedInUrl] : undefined,
        knowsAbout: [
          "Management advisory and business planning",
          "Risk management",
          "Statutory and voluntary financial statement audit",
          "Assurance and agreed-upon procedures",
          "Internal audit and internal controls assurance",
          "Grant, donor, NGO and project audit",
          "Taxation",
          "Accounting and financial reporting",
          "Payroll",
          "Corporate and administrative services",
          "Loan and funding application support",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "FST",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <AnalyticsConsent />
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
