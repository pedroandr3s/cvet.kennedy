import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url.replace(/\/$/, ""),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
