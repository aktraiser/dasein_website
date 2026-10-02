export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

/** English is the reference language of the site. */
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** One page per vertical, under /expertise/<slug>. */
export const verticalSlugs = ["user-augmentation", "business-applications", "ai-platform"] as const;
export type VerticalSlug = (typeof verticalSlugs)[number];

/** Standalone articles, under /articles/<slug>. */
export const articleSlugs = [
  "le-megawatt-et-le-degre",
  "weak-signal-l-acoustics",
  "phaseone10841",
  "mcp",
] as const;

/** Site routes, without locale prefix. Used by navigation, sitemap and hreflang. */
export const routes = [
  "",
  ...verticalSlugs.map((slug) => `/expertise/${slug}` as const),
  "/about",
  "/contact",
  "/glossary",
  "/legal",
  "/articles",
  ...articleSlugs.map((slug) => `/articles/${slug}` as const),
] as const;
export type Route = (typeof routes)[number];

export const localizedPath = (locale: Locale, route: string = "") =>
  `/${locale}${route}`;

/** Canonical + hreflang alternates for a route, and the RSS feed of the language. */
export function alternatesFor(locale: Locale, route: Route) {
  return {
    canonical: `${siteUrl}${localizedPath(locale, route)}`,
    languages: {
      en: `${siteUrl}${localizedPath("en", route)}`,
      fr: `${siteUrl}${localizedPath("fr", route)}`,
      "x-default": `${siteUrl}${localizedPath(defaultLocale, route)}`,
    },
    types: { "application/rss+xml": `${siteUrl}/${locale}/feed.xml` },
  };
}
