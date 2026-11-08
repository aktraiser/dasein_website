import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/NewsCard";
import { HeroTitle } from "@/components/HeroTitle";
import { CharStrip, Crop } from "@/components/os/Crop";
import { DitherField } from "@/components/os/DitherField";
import { Reveal } from "@/components/Reveal";
import { Offers } from "@/components/Offers";
import { SectionHead } from "@/components/SectionHead";
import { SentDialog } from "@/components/SentDialog";
import { getDictionary } from "@/content/dictionaries";
import { news } from "@/content/news";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { hero } = dict;
  const mainNews = news.find((item) => item.featured) ?? news[0];
  const sideNews = news.filter((item) => item !== mainNews);

  return (
    <>
      <SentDialog lang={lang} />
      {/* Hero ------------------------------------------------------------ */}
      <section className="hero">
        <div className="hero__sky">
          <DitherField variant="sky" />
          <Crop className="container hero__title">
            <p className="hero__intro">
              <span>{hero.intro}</span>
              <span className="hero__dots" aria-hidden="true" />
              <span>{hero.introRight}</span>
            </p>
            <HeroTitle
              marked={hero.titleMarked}
              contactHref={`/${lang}/contact`}
              labels={hero.chipLabels}
            />
            <p className="lead center">{hero.lead}</p>
            <p className="hero__links">
              <Link href={`/${lang}/contact`} className="biglink">
                {hero.primary}
              </Link>
              <Link href={`/${lang}#offers`} className="biglink">
                {hero.secondary}
              </Link>
            </p>
          </Crop>
        </div>
        <CharStrip seed={7} className="hero__strip" />
      </section>

      {/* The three offers, each starting from the client's problem ------- */}
      <section id="offers" className="section">
        <div className="container">
          <SectionHead label={dict.offers.label} title={dict.offers.title}>
            {dict.offers.intro}
          </SectionHead>
          <Offers data={dict.offers} lang={lang} />
        </div>
      </section>

      {/* Statement --------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <Crop className="statement">
            <Reveal as="h2" className="display display--center display--serif">
              {dict.statement.title}
            </Reveal>
          </Crop>
          <div className="columns">
            {dict.statement.points.map((point, i) => (
              <Reveal key={point.name} className="columns__item" delay={i * 80}>
                <p className="label">{point.name}</p>
                <p>{point.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured grid (after openai.com) -------------------------------- */}
      <section id="featured" className="section featured">
        <div className="container">
          <p className="eyebrow featured__label">{dict.featured.label}</p>
          <div className="featured__grid">
            {/* Left: the featured article (sticky on desktop). Right: the others, scrolling. */}
            <div className="featured__main">
              <NewsCard item={mainNews} lang={lang} kindLabel={dict.featured.kinds[mainNews.kind]} main />
            </div>
            <div className="featured__side">
              {sideNews.map((item) => (
                <NewsCard key={item.slug} item={item} lang={lang} kindLabel={dict.featured.kinds[item.kind]} />
              ))}
            </div>
          </div>

        </div>
      </section>

    </>
  );
}
