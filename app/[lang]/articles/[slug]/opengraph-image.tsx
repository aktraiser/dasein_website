import { articleIndex } from "@/content/articleIndex";
import { standaloneArticles } from "@/content/articles";
import { hasLocale } from "@/lib/i18n";
import { articleOgImage, ogSize } from "@/lib/ogImage";
import { readingMinutes } from "@/lib/readingTime";

export const alt = "Dasein — Article";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const article = standaloneArticles[slug]?.[lang];
  const entry = articleIndex.find((item) => item.slug === slug);
  return articleOgImage({
    title: article?.title ?? "Dasein",
    topic: entry?.topic[lang] ?? "Article",
    meta: article ? `${readingMinutes(article)} min · dasein` : "dasein",
  });
}
