import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/covers";
import { MockWindow } from "@/components/MockWindow";
import { Reveal } from "@/components/Reveal";
import { articleIndex, type ArticleCover } from "@/content/articleIndex";
import { articles } from "@/content/articles";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale, offerSlugs, type OfferSlug, type Route } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

/** The illustration shown under each offer's hero, borrowed from its main article. */
const COVERS: Record<OfferSlug, ArticleCover> = {
  "ways-of-working": "user-augmentation",
  solutions: "business",
  engineering: "platform",
};

export function generateStaticParams() {
  return offerSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/offers/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { offers } = await getDictionary(lang);
  const item = offers.items.find((o) => o.slug === slug);
  if (!item) return {};
  return pageMetadata(lang, `/offers/${slug}` as Route, item.name, item.tagline);
}

/**
 * An offer, laid out like a product page (after openai.com/codex): a centred
 * hero with two actions and a large visual, what we do in alternating rows,
 * the first engagement as cards, how it runs, a dark band for technical
 * readers, and a closing call to action.
 */
export default async function OfferPage({ params }: PageProps<"/[lang]/offers/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const { offers } = await getDictionary(lang);
  const index = offers.items.findIndex((o) => o.slug === slug);
  if (index === -1) notFound();
  const item = offers.items[index];
  const others = offers.items.filter((o) => o !== item);
  const t = offers.page;
  const contact = `/${lang}/contact?offer=${item.slug}`;
  // The articles and case studies the offer draws on.
  const reading = item.related.flatMap((ref) => {
    const entry = articleIndex.find((e) => e.slug === ref);
    return entry && articles[ref]?.[lang] ? [entry] : [];
  });

  return (
    <>
      <section className="ohero">
        <div className="container ohero__inner">
          <p className="ohero__badge" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="ohero__eyebrow">
            <Link href={`/${lang}#offers`}>{t.back}</Link>
            <span aria-hidden="true">·</span>
            {item.internal}
          </p>
          <h1 className="ohero__title">{item.name}</h1>
          <p className="ohero__lead">{item.tagline}</p>
          <p className="oactions">
            <Link href={contact} className="pill pill--ink pill--lg">
              {item.cta} <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="#start" className="pill pill--ghost pill--lg">
              {t.secondaryCta}
            </Link>
          </p>
        </div>
        <div className="container">
          <div className="ostage ostage--hero">
            <div className="owin">
              <p className="mockwin__bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{item.internal}</span>
              </p>
              <div className="owin__body">
                <Cover cover={COVERS[item.slug as OfferSlug]} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {item.figures.length > 0 && (
        <section className="oproof">
          <div className="container">
            <p className="oproof__label">{t.proofLabel}</p>
            <dl className="oproof__stats">
              {item.figures.map((figure) => (
                <div key={figure.value}>
                  <dt>{figure.value}</dt>
                  <dd>{figure.label}</dd>
                </div>
              ))}
            </dl>
            <p className="oproof__note">{item.figuresNote}</p>
          </div>
        </section>
      )}

      <section className="osection">
        <div className="container">
          <Reveal className="ohead">
            <h2>{t.whatLabel}</h2>
            <p>{item.lead}</p>
          </Reveal>
          <div className="ofeats">
            {item.features.map((feature, i) => (
              <Reveal key={feature.title} className={`ofeat${i % 2 ? " ofeat--flip" : ""}`}>
                <div className="ofeat__text">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
                <div className="ostage">
                  <MockWindow title={feature.window} rows={feature.rows} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="oresult">
        <Reveal className="container">
          <p className="oresult__label">{t.resultLabel}</p>
          <p className="oresult__text">{item.result}</p>
        </Reveal>
      </section>

      <section id="start" className="osection">
        <div className="container">
          <Reveal className="ohead">
            <h2>{t.startLabel}</h2>
          </Reveal>
          <div className="oplans">
            <Reveal as="article" className="oplan oplan--main">
              <p className="oplan__label">{t.entryLabel}</p>
              <h3 className="oplan__name">{item.start.name}</h3>
              <p className="oplan__text">{item.start.text}</p>
              <p className="oplan__label">{t.deliverablesLabel}</p>
              <p className="oplan__text">{item.start.deliverables}</p>
              <Link href={contact} className="pill pill--ink pill--lg oplan__cta">
                {item.cta} <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>
            <Reveal as="article" className="oplan" delay={80}>
              <p className="oplan__label">{t.nextLabel}</p>
              <h3 className="oplan__name">{item.nextName}</h3>
              <p className="oplan__text">{item.next}</p>
              <Link href={contact} className="pill pill--ghost pill--lg oplan__cta">
                {t.talk}
              </Link>
            </Reveal>
          </div>
          <p className="oplans__note">{t.scopeNote}</p>
        </div>
      </section>

      <section className="osection">
        <div className="container">
          <Reveal className="ohead">
            <h2>{t.howLabel}</h2>
          </Reveal>
          <ol className="osteps">
            {item.start.steps.map((step, i) => (
              <Reveal as="li" key={step.name} className="ocard" delay={i * 60}>
                <span className="osteps__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="oscope">
            <Reveal className="ocard">
              <h3>{t.conditionsLabel}</h3>
              <ul className="olist">
                {item.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="ocard" delay={80}>
              <h3>{t.excludedLabel}</h3>
              <ul className="olist olist--out">
                {item.excluded.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="odark">
        <div className="container">
          <Reveal className="ohead">
            <h2>{t.technicalLabel}</h2>
            <p>{item.technical}</p>
          </Reveal>
          {reading.length > 0 && (
            <div className="oread">
              {reading.map((entry) => (
                <Link key={entry.slug} href={`/${lang}${entry.href}`} className="oread__card">
                  <span className="oread__media">
                    <Cover cover={entry.cover} lang={lang} />
                  </span>
                  <span className="oread__body">
                    <span className="oread__kind">{t.kinds[entry.kind]}</span>
                    <strong>{entry.title[lang]}</strong>
                    <span className="pill pill--paper">
                      {t.read} <span className="arrow" aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="oclose">
        <div className="container">
          <Reveal className="ohead">
            <h2>{item.closing}</h2>
            <p>{t.closingText}</p>
          </Reveal>
          <p className="oactions">
            <Link href={contact} className="pill pill--ink pill--lg">
              {item.cta} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </p>
          <p className="oother__label">{t.otherOffers}</p>
          <div className="oother">
            {others.map((other) => (
              <Link key={other.slug} href={`/${lang}/offers/${other.slug}`} className="ocard oother__card">
                <span className="oother__audience">{other.audience}</span>
                <strong>{other.name}</strong>
                <span>{other.tagline}</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
