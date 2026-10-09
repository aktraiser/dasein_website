import { articleIndex } from "@/content/articleIndex";
import { articles, standaloneArticles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale, locales, siteUrl } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** RSS 2.0 feed of the articles, one per language. */
export async function GET(_request: Request, { params }: RouteContext<"/[lang]/feed.xml">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response(null, { status: 404 });
  const dict = await getDictionary(lang);
  const self = `${siteUrl}/${lang}/feed.xml`;

  const items = [...articleIndex]
    .sort((a, b) => b.date.localeCompare(a.date))
    .flatMap((entry) => {
      const article = (standaloneArticles[entry.slug] ?? articles[entry.slug])?.[lang];
      if (!article) return [];
      const url = `${siteUrl}/${lang}${entry.href}`;
      return [
        `<item>
      <title>${escape(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <category>${escape(entry.topic[lang])}</category>
      <description>${escape(article.lead)}</description>
    </item>`,
      ];
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dasein | ${escape(dict.articlesPage.label)}</title>
    <link>${siteUrl}/${lang}/articles</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${escape(dict.articlesPage.intro)}</description>
    <language>${lang}</language>
    ${items.join("\n    ")}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
