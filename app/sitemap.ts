import type { MetadataRoute } from "next";
import { alternatesFor, locales, routes, siteUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
      alternates: { languages: alternatesFor(locale, route).languages },
    })),
  );
}
