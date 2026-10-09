import { articleIndex } from "@/content/articleIndex";
import { articles, standaloneArticles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
import { locales, siteUrl, type Locale } from "@/lib/i18n";

const HEADINGS: Record<Locale, { offer: string; articles: string; cases: string; more: string; glossary: string; contact: string; vision: string }> = {
  en: { offer: "Offer", articles: "Articles (English)", cases: "Case studies (English)", more: "More", glossary: "Glossary", contact: "Contact", vision: "Our vision" },
  fr: { offer: "Offre", articles: "Articles (français)", cases: "Retours d’expérience (français)", more: "Autres pages", glossary: "Glossaire", contact: "Contact", vision: "Notre vision" },
};

/**
 * llms.txt (https://llmstxt.org): tells AI agents who Dasein is and where the
 * content worth reading is, with a Markdown version of every article.
 */
export async function GET() {
  const en = await getDictionary("en");
  const parts = [
    "# Dasein",
    `> ${en.meta.description}`,
    "Dasein is a French Data & AI engineering company. It helps organisations put agentic AI into production: agents for employees (User Augmentation), agents inside business processes (Business Applications), and the shared platform that governs them all (AI Platform), on top of a data and semantic foundation. The site is published in English and French; every article below links to a Markdown version.",
  ];

  for (const lang of locales) {
    const dict = lang === "en" ? en : await getDictionary(lang);
    const t = HEADINGS[lang];
    const line = (entry: (typeof articleIndex)[number]) => {
      const article = (standaloneArticles[entry.slug] ?? articles[entry.slug])?.[lang];
      return `- [${entry.title[lang]}](${siteUrl}/${lang}${entry.href}.md)${article ? `: ${article.lead}` : ""}`;
    };
    if (lang === "en") {
      parts.push(
        `## ${t.offer}`,
        dict.verticals.items.map((item) => `- [${item.name}](${siteUrl}/${lang}/expertise/${item.slug}.md): ${item.lead}`).join("\n"),
      );
    }
    parts.push(
      `## ${t.articles}`,
      articleIndex.filter((entry) => entry.kind === "article").map(line).join("\n"),
      `## ${t.cases}`,
      articleIndex.filter((entry) => entry.kind === "case").map(line).join("\n"),
    );
  }

  const t = HEADINGS.en;
  parts.push(
    "## Optional",
    [
      `- [${t.glossary}](${siteUrl}/en/glossary.md): plain-language definitions of the data and AI terms used on the site`,
      `- [Glossaire](${siteUrl}/fr/glossary.md): les mêmes définitions, en français`,
      `- [${t.vision}](${siteUrl}/en/about): what Dasein believes and how it works with clients`,
      `- [${t.contact}](${siteUrl}/en/contact): contact@dasein-ai.com`,
    ].join("\n"),
  );

  return new Response(`${parts.join("\n\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
