import type { Article } from "@/content/articles";
import { siteUrl, type Locale } from "./i18n";

/** schema.org Article + BreadcrumbList for an article page. */
export function articleJsonLd({
  lang,
  path,
  article,
  date,
  section,
  sectionLabel,
}: {
  lang: Locale;
  /** Path without the locale, e.g. "/articles/mcp". */
  path: string;
  article: Article;
  date: string;
  section: { label: string; path: string };
  sectionLabel?: string;
}) {
  const url = `${siteUrl}/${lang}${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.lead,
      inLanguage: lang,
      datePublished: date,
      dateModified: date,
      url,
      mainEntityOfPage: url,
      image: `${url}/opengraph-image`,
      articleSection: sectionLabel,
      author: { "@type": "Organization", name: "Dasein", url: siteUrl },
      publisher: {
        "@type": "Organization",
        name: "Dasein",
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}/brand/dasein-512.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Dasein", item: `${siteUrl}/${lang}` },
        { "@type": "ListItem", position: 2, name: section.label, item: `${siteUrl}/${lang}${section.path}` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];
}

/**
 * Script tag payload. Several nodes are wrapped in one "@graph" object with a
 * single "@context" (a bare top-level array breaks some JSON-LD readers).
 */
export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  const graph = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data.map((node) => {
          const { ["@context"]: _context, ...rest } = node;
          void _context;
          return rest;
        }),
      }
    : data;
  return { __html: JSON.stringify(graph).replace(/</g, "\\u003c") };
}
