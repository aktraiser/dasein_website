import type { MetadataRoute } from "next";
import { articleIndex } from "@/content/articleIndex";
import { alternatesFor, locales, routes, siteUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    routes.map((route) => {
      const article = articleIndex.find((entry) => entry.href === route);
      return {
        url: `${siteUrl}/${locale}${route}`,
        lastModified: article ? new Date(article.date) : now,
        changeFrequency: article ? ("yearly" as const) : ("monthly" as const),
        priority: route === "" ? 1 : article ? 0.8 : 0.6,
        alternates: { languages: alternatesFor(locale, route).languages },
      };
    }),
  );
}
