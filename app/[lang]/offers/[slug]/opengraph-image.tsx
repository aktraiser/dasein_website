import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { articleOgImage, ogSize } from "@/lib/ogImage";

export const alt = "Dasein | Offer";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = hasLocale(raw) ? raw : "en";
  const { offers } = await getDictionary(lang);
  const item = offers.items.find((o) => o.slug === slug);
  return articleOgImage({
    title: item?.name ?? "Dasein",
    topic: offers.label,
    meta: item ? `${item.start.name} · dasein` : "dasein",
  });
}
