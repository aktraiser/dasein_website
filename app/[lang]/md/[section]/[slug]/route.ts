import { articles } from "@/content/articles";
import { articleSlugs, hasLocale, locales, siteUrl } from "@/lib/i18n";
import { articleToMarkdown, markdownResponse } from "@/lib/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => articleSlugs.map((slug) => ({ lang, section: "articles", slug })));
}

/** Markdown version of an article, served at "/<lang>/<section>/<slug>.md" (see next.config.ts). */
export async function GET(_request: Request, { params }: RouteContext<"/[lang]/md/[section]/[slug]">) {
  const { lang, section, slug } = await params;
  const article = hasLocale(lang) && section === "articles" ? articles[slug]?.[lang] : undefined;
  if (!article || !hasLocale(lang)) return new Response(null, { status: 404 });
  const path = `/${section}/${slug}`;
  return markdownResponse(articleToMarkdown(article, lang, path), `${siteUrl}/${lang}${path}`);
}
