import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/catalogue", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/management-consulting", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/audit-assurance", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/taxation", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/accounting-financial-reporting", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/corporate-services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/loan-funding-application-support", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/who-we-work-with", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/insights", priority: 0.8, changeFrequency: "monthly" as const, lastModified: "2026-08-03" },
    { path: "/insights/useful-internal-control-review", priority: 0.7, changeFrequency: "yearly" as const, lastModified: "2026-08-03" },
    { path: "/insights/stress-testing-business-plan", priority: 0.7, changeFrequency: "yearly" as const, lastModified: "2026-08-03" },
    { path: "/insights/tax-working-file-that-reconciles", priority: 0.7, changeFrequency: "yearly" as const, lastModified: "2026-08-03" },
    { path: "/ai-agent-team", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/legal-information", priority: 0.5, changeFrequency: "monthly" as const, lastModified: "2026-08-03" },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const, lastModified: "2026-08-03" },
    { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const, lastModified: "2026-08-03" },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date("lastModified" in route ? route.lastModified : "2026-07-30"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
