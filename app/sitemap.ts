import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/packages", priority: 0.9 },
    { path: "/commercial-cleaning", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/request-a-quote", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
