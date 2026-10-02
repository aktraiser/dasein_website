import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/covers";
import { Reveal } from "@/components/Reveal";
import { articleIndex } from "@/content/articleIndex";
import { articles, standaloneArticles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
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
    const article = (standaloneArticles[entry.slug] ?? articles[entry.slug])?.[lang];
    return article ? [{ ...entry, lead: article.lead, minutes: readingMinutes(article), updated: article.updated }] : [];
  });
}

function CardGrid({
  items,
  lang,
  readingTime,
}: {
  items: ReturnType<typeof entries>;
  lang: Locale;
  readingTime: string;
}) {
  return (
    <ul className="articles__grid">
      {items.map((entry, i) => (
        <Reveal as="li" key={entry.slug} delay={i * 80}>
          <Link href={`/${lang}${entry.href}`} className="acard">
            <span className="acard__media">
              <Cover cover={entry.cover} lang={lang} />
            </span>
            <span className="acard__meta">
              {entry.topic[lang]} · {entry.minutes} {readingTime}
            </span>
            <span className="acard__title">{entry.title[lang]}</span>
            <span className="acard__lead">{entry.lead}</span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

export default async function ArticlesPage({ params }: PageProps<"/[lang]/articles">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { articlesPage: t } = await getDictionary(lang);
  const all = entries(lang);
  const inDepth = all.filter((entry) => entry.kind === "article");
  const cases = all.filter((entry) => entry.kind === "case");
  const [featured, ...rest] = inDepth;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.label}</p>
          <h1 className="display display--serif xp-title">{t.title}</h1>
          <p className="lead">{t.intro}</p>
        </div>
      </section>

      <div className="container articles">
        <section className="articles__rubric" aria-labelledby="rubric-articles">
          <h2 id="rubric-articles" className="articles__rubric-title">
            {t.rubrics.article} <span>{inDepth.length}</span>
          </h2>
          {featured && (
            <Reveal>
              <Link href={`/${lang}${featured.href}`} className="acard acard--featured">
                <span className="acard__media">
                  <Cover cover={featured.cover} lang={lang} />
                </span>
                <span className="acard__text">
                  <span className="acard__meta">
                    {featured.topic[lang]} · {featured.minutes} {t.readingTime}
                  </span>
                  <span className="acard__title">{featured.title[lang]}</span>
                  <span className="acard__lead">{featured.lead}</span>
                  <span className="acard__more">
                    {t.read} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </Reveal>
          )}
          <CardGrid items={rest} lang={lang} readingTime={t.readingTime} />
        </section>

        <section className="articles__rubric" aria-labelledby="rubric-cases">
          <h2 id="rubric-cases" className="articles__rubric-title">
            {t.rubrics.case} <span>{cases.length}</span>
          </h2>
          <CardGrid items={cases} lang={lang} readingTime={t.readingTime} />
        </section>

        <aside className="articles__glossary">
          <div>
            <h2>{t.glossaryTitle}</h2>
            <p>{t.glossaryText}</p>
          </div>
          <Link href={`/${lang}/glossary`} className="pill pill--ink">
            {t.glossaryLink} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>
    </>
  );
}
