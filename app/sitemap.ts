import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/management-consulting", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/taxation", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/accounting-financial-reporting", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/corporate-services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/loan-application-support", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/funding-applications", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/who-we-work-with", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date("2026-07-28"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
