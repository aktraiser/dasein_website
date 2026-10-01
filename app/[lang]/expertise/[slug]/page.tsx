import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { glossText, newGlossarySeen } from "@/components/Glossed";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale, verticalSlugs, type Route } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return verticalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/expertise/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { verticals } = await getDictionary(lang);
  const item = verticals.items.find((v) => v.slug === slug);
  if (!item) return {};
  return pageMetadata(lang, `/expertise/${slug}` as Route, item.name, item.lead);
}

export default async function VerticalPage({ params }: PageProps<"/[lang]/expertise/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { verticals } = dict;
  const index = verticals.items.findIndex((v) => v.slug === slug);
  if (index === -1) notFound();
  const item = verticals.items[index];
  const next = verticals.items[(index + 1) % verticals.items.length];
  const t = verticals.page;
  // A vertical can carry a long-form article that replaces the standard sections.
  const article = articles[item.slug]?.[lang];
  const seen = newGlossarySeen();
  const g = (text: string) => glossText(text, lang, seen);

  return (
    <>
      <section className="page-hero vp-hero">
        <div className="container">
          <p className="eyebrow">
            <Link href={`/${lang}/expertise`}>{t.back}</Link>
            <span aria-hidden="true">/</span>
            {String(index + 1).padStart(2, "0")} · {item.audience}
          </p>
          <h1 className={`display display--serif vp-hero__title${article ? " vp-hero__title--article" : ""}`}>
            {article ? article.title : item.name}
          </h1>
          <p className="lead vp-hero__lead">{article ? article.lead : item.lead}</p>
          <p className="vp-hero__level">
            <span className="gov__level" aria-hidden="true">
              {verticals.levels.map((level, i) => (
                <i key={level} data-on={i < item.level} />
              ))}
            </span>
            {verticals.controlLabel} · <strong>{verticals.levels[item.level - 1]}</strong>
            {article && <span className="vp-hero__updated">· {article.updated}</span>}
          </p>
        </div>
      </section>

      <div className="container vp">
        {article ? (
          <ArticleBody article={article} lang={lang} />
        ) : (
          <>
            <Reveal as="section" className="vp__row">
              <h2 className="vp__label">{t.problemLabel}</h2>
              <p className="vp__problem">{g(item.problem)}</p>
            </Reveal>

            <Reveal as="section" className="vp__row">
              <h2 className="vp__label">{t.buildsLabel}</h2>
              <ol className="vp__builds">
                {item.builds.map((build, i) => (
                  <li key={build.name}>
                    <span className="vp__num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{build.name}</h3>
                    <p>{g(build.text)}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal as="section" className="vp__row">
              <h2 className="vp__label">{t.useCasesLabel}</h2>
              <ul className="vp__cases">
                {item.useCases.map((useCase) => (
                  <li key={useCase}>{g(useCase)}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section" className="vp__row">
              <h2 className="vp__label">{t.controlLabel}</h2>
              <div>
                <p className="vp__control">{g(item.control)}</p>
                <ul className="vp__points">
                  {item.controlPoints.map((point) => (
                    <li key={point}>{g(point)}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </>
        )}


        <Link href={`/${lang}/expertise/${next.slug}`} className="vp__next">
          <span className="vp__label">{t.next}</span>
          <span className="vp__next-name">
            {next.name} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </>
  );
}
