import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { ArticleViews } from "@/components/ArticleViews";
import { Atlas } from "@/components/Atlas";
import { ArticleVisual } from "@/components/ArticleVisual";
import "./editorial.css";
import { articleIndex } from "@/content/articleIndex";
import { articles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
import { buildAtlas } from "@/lib/atlas";
import { hasLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { readingMinutes } from "@/lib/readingTime";

export async function generateMetadata({ params }: PageProps<"/[lang]/articles">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { articlesPage } = await getDictionary(lang);
  return pageMetadata(lang, "/articles", articlesPage.label, articlesPage.intro);
}

/** Each index entry with its lead and reading time, taken from the full article. */
function entries(lang: Locale) {
  return articleIndex.flatMap((entry) => {
    const article = articles[entry.slug]?.[lang];
    return article ? [{ ...entry, lead: article.lead, minutes: readingMinutes(article), updated: article.updated }] : [];
  });
}

type Card = ReturnType<typeof entries>[number] & { links: { id: string; label: string; href: string }[] };

function CardGrid({
  items,
  lang,
  readingTime,
  linkedTo,
}: {
  items: Card[];
  lang: Locale;
  readingTime: string;
  linkedTo: string;
}) {
  return (
    <ul className="articles__grid">
      {items.map((entry) => (
        <li key={entry.slug} id={`article-${entry.slug}`}>
          <Link href={`/${lang}${entry.href}`} className="acard">
            <span className="acard__media">
              <ArticleVisual cover={entry.cover} lang={lang} />
            </span>
            <span className="acard__title" title={entry.title[lang]}>{entry.title[lang]}</span>
            <span className="acard__meta"><time dateTime={entry.date}>{new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(entry.date))}</time><span>{entry.minutes} {readingTime}</span></span>
          </Link>
          {entry.links.length > 0 && (
            <p className="acard__links">
              {linkedTo}{" "}
              {entry.links.map((link, j) => (
                <Fragment key={link.id}>
                  {j > 0 && " · "}
                  <Link href={link.href}>{link.label}</Link>
                </Fragment>
              ))}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function ArticlesPage({ params }: PageProps<"/[lang]/articles">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { articlesPage: t, offers } = await getDictionary(lang);
  const atlas = buildAtlas(lang, offers, t.readingTime, t.atlas.others);
  const byId = new Map(atlas.nodes.map((node) => [node.id, node]));
  const cards = new Map(entries(lang).map((entry) => [`a:${entry.slug}`, entry]));
  // Each card lists the other articles it is linked to (once, whichever way the
  // link goes); offers are already named at the head of each subject.
  const linksOf = (id: string) =>
    [...new Set(atlas.links.flatMap(({ source, target }) => (source === id ? [target] : target === id ? [source] : [])))]
      .map((other) => byId.get(other)!)
      .filter((node) => node.group !== "offer")
      .map((node) => ({ id: node.id, label: node.short, href: `#article-${node.id.slice(2)}` }));

  return (
    <ArticleViews lang={lang} title={t.title} intro={t.intro} kicker={t.atlas.kicker}
      graph={<Atlas data={atlas} labels={t.atlas} lang={lang} title={t.title} intro={t.intro} />}>
      <div id="list" className="container articles">
        {atlas.clusters.map((cluster) => {
          const items = cluster.ids.flatMap((id) => {
            const entry = cards.get(id);
            return entry ? [{ ...entry, links: linksOf(id) }] : [];
          });
          if (!items.length) return null;
          const offer = cluster.ids.map((id) => byId.get(id)!).find((node) => node.group === "offer");
          return (
            <section key={cluster.name} className="articles__rubric" aria-label={cluster.name}>
              <div className="articles__rubric-head">
                <h2 className="articles__rubric-title">
                  {cluster.name} <span>{items.length}</span>
                </h2>
                {offer && (
                  <Link href={`/${lang}${offer.href}`} className="link">
                    {t.atlas.open.offer}
                  </Link>
                )}
              </div>
              <CardGrid items={items.sort((a, b) => b.date.localeCompare(a.date))} lang={lang} readingTime={t.readingTime} linkedTo={t.atlas.linkedTo} />
            </section>
          );
        })}

        <aside className="articles__glossary">
          <div>
            <h2>{t.glossaryTitle}</h2>
            <p>{t.glossaryText}</p>
          </div>
          <Link href={`/${lang}/glossary`} className="pill pill--ink">
            {t.glossaryLink}
          </Link>
        </aside>
      </div>
    </ArticleViews>
  );
}
