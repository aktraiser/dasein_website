import { articles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { articleOgImage, ogSize } from "@/lib/ogImage";
import { readingMinutes } from "@/lib/readingTime";

export const alt = "Dasein — Expertise";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const { verticals } = await getDictionary(lang);
  const item = verticals.items.find((v) => v.slug === slug);
  const article = articles[slug]?.[lang];
  return articleOgImage({
    title: article?.title ?? item?.name ?? "Dasein",
    topic: item?.name ?? "Expertise",
    meta: article ? `${readingMinutes(article)} min · dasein` : "dasein",
  });
}
