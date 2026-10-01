import type { Metadata } from "next";
import { alternatesFor, type Locale, type Route } from "./i18n";

type Options = {
  /** "article" adds the publication date and section to Open Graph. */
  type?: "website" | "article";
  publishedTime?: string;
  section?: string;
};

/**
 * Title, description, canonical + hreflang, and a complete Open Graph block.
 * Open Graph is not merged with the layout's, so the site-wide fields are set
 * here too.
 */
export function pageMetadata(
  lang: Locale,
  route: Route,
  title: string,
  description: string,
  options: Options = {},
): Metadata {
  const alternates = alternatesFor(lang, route);
  const common = {
    title: `${title} — Dasein`,
    description,
    url: alternates.canonical,
    siteName: "Dasein",
    locale: lang === "fr" ? "fr_FR" : "en_US",
    alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
  };
  // Articles get their own share image from their opengraph-image file; other
  // pages fall back to the site-wide one (it is not inherited once openGraph is set).
  const siteImage = [{ url: `/${lang}/opengraph-image`, width: 1200, height: 630, alt: "Dasein" }];
  return {
    title,
    description,
    alternates,
    openGraph:
      options.type === "article"
        ? { ...common, type: "article", publishedTime: options.publishedTime, section: options.section }
        : { ...common, type: "website", images: siteImage },
  };
}
