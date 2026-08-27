import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import manropeRegularUrl from "@fontsource/manrope/files/manrope-latin-400-normal.woff2?url";
import manropeSemiboldUrl from "@fontsource/manrope/files/manrope-latin-600-normal.woff2?url";
import cormorantMediumUrl from "@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2?url";
import "./globals.css";
import { siteUrl } from "../lib/seo";
import { legalDisclosureReady, siteConfig } from "../lib/site-config";
import { AnalyticsConsent } from "./components/AnalyticsConsent";
import { JsonLd } from "./components/JsonLd";
import { WebMcpRegistrar } from "./webmcp/WebMcpRegistrar";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf7",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const providerData = legalDisclosureReady ? {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: "FST",
    legalName: siteConfig.legalName,
    alternateName: "FST",
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
      { "@type": "Country", name: "Rwanda" },
      { "@type": "Place", name: "International" },
    ],
    address: siteConfig.registeredAddress,
    email: siteConfig.contactEmail,
    identifier: [
      { "@type": "PropertyValue", name: "Company registration", value: siteConfig.companyRegistrationNumber },
      siteConfig.vatNumber ? { "@type": "PropertyValue", name: "VAT number", value: siteConfig.vatNumber } : undefined,
      siteConfig.accountancyBoardRegistration ? { "@type": "PropertyValue", name: "Accountancy Board registration", value: siteConfig.accountancyBoardRegistration } : undefined,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.whatsappDisplay,
      url: siteConfig.whatsappUrl,
      contactType: "client enquiries",
      email: siteConfig.contactEmail,
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
      "Supervised AI-assisted professional workpack preparation",
    ],
  } : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      providerData,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "FST",
        publisher: legalDisclosureReady ? { "@id": `${siteUrl}/#organization` } : undefined,
        inLanguage: ["en-MT", "en-RW"],
      },
    ].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" href={manropeRegularUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={manropeSemiboldUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={cormorantMediumUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <WebMcpRegistrar />
        {children}
        <AnalyticsConsent />
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
