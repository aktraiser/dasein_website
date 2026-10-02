import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { Cover } from "@/components/covers";
import { articleIndex } from "@/content/articleIndex";
import { standaloneArticles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
import { articleSlugs, hasLocale, type Route } from "@/lib/i18n";
import { articleJsonLd, jsonLdScript } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/articles/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const article = standaloneArticles[slug]?.[lang];
  const entry = articleIndex.find((item) => item.slug === slug);
  if (!article) return {};
  return pageMetadata(lang, `/articles/${slug}` as Route, article.title, article.lead, {
    type: "article",
    publishedTime: entry?.date,
    section: entry?.topic[lang],
  });
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/articles/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const article = standaloneArticles[slug]?.[lang];
  if (!article) notFound();
  const { articlesPage } = await getDictionary(lang);
  const entry = articleIndex.find((item) => item.slug === slug);
  const cover = entry?.cover;
  const jsonLd = entry
    ? articleJsonLd({
        lang,
        path: `/articles/${slug}`,
        article,
        date: entry.date,
        section: { label: articlesPage.label, path: "/articles" },
        sectionLabel: entry.topic[lang],
      })
    : null;

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />}
      <section className="page-hero vp-hero">
        <div className="container">
          <p className="eyebrow">
            <Link href={`/${lang}/articles`}>{articlesPage.label}</Link>
            <span aria-hidden="true">/</span>
            {articleIndex.find((entry) => entry.slug === slug)?.topic[lang]}
          </p>
          <h1 className="display display--serif vp-hero__title vp-hero__title--article">{article.title}</h1>
          <p className="lead vp-hero__lead">{article.lead}</p>
          <p className="vp-hero__level">
            <span className="vp-hero__updated">{article.updated}</span>
          </p>
          {cover && (
            <div className="article-cover">
              <Cover cover={cover} lang={lang} />
            </div>
          )}
        </div>
      </section>

      <div className="container vp">
        <ArticleBody article={article} lang={lang} path={`/articles/${slug}`} />
      </div>
    </>
  );
}
