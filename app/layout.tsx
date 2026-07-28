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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FST | Make the next move workable",
    template: "%s | FST",
  },
  description:
    "Management, risk, tax, accounting, corporate, loan application support and funding application support organised around executable outcomes.",
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
  openGraph: {
    title: "FST | Make the next move workable",
    description:
      "Management, risk, tax, accounting, corporate, loan application support and funding application support organised around executable outcomes.",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "FST — Make the next move workable.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FST | Make the next move workable",
    description:
      "Management, risk, tax, accounting, corporate, loan application support and funding application support organised around executable outcomes.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "FST",
    url: siteUrl,
    logo: `${siteUrl}/brand/fst-logo.svg`,
    image: `${siteUrl}/og.jpg`,
    description:
      "Management, risk, tax, accounting, corporate, loan application support and funding application support organised around executable outcomes.",
    areaServed: "International",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: siteConfig.linkedInUrl ? [siteConfig.linkedInUrl] : undefined,
    knowsAbout: [
      "Management advisory and business planning",
      "Risk management",
      "Internal audit and internal controls",
      "Taxation",
      "Accounting and financial reporting",
      "Payroll",
      "Corporate and administrative services",
      "Loan application support",
      "Funding application support",
    ],
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <AnalyticsConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
