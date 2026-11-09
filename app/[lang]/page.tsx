import Link from "next/link";
import { OfferCards } from "@/components/OfferCards";
import { ArticleVisual } from "@/components/ArticleVisual";
import { notFound } from "next/navigation";
import { Stage } from "@/components/home/Stage";
import { NightHeader } from "@/components/home/NightHeader";
import { SentDialog } from "@/components/SentDialog";
import { getDictionary } from "@/content/dictionaries";
import { articleIndex } from "@/content/articleIndex";
import { hasLocale } from "@/lib/i18n";
import "./home.css";
import "./rest.css";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { home } = await getDictionary(lang);
  const { stage, simple } = home;
  const latest = articleIndex.filter(entry => entry.kind === "article")
    .sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const date = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="home home--meaning">
      <SentDialog lang={lang} />
      <NightHeader />
      <Stage data={stage} />
      <div className="home-content">
        <section id="offers" className="practice container" aria-labelledby="practice-title">
          <div className="rest-heading">
            <h2 id="practice-title">{simple.offersTitle}</h2>
          </div>
          <OfferCards offers={simple.offers} lang={lang} />
        </section>

        <section id="journal" className="rest-journal rest-section container" aria-labelledby="journal-title">
          <div className="journal-heading">
            <h2 id="journal-title">{lang === "fr" ? "Derniers articles" : "Latest articles"}</h2>
            <Link href={`/${lang}/articles`}>{lang === "fr" ? "Tout afficher" : "View all"}</Link>
          </div>
          <ul className="rest-journal__list">
            {latest.map(entry => <li key={entry.slug}>
              <Link href={`/${lang}${entry.href}`} data-track="article_open" data-track-article={entry.slug}>
                <div className="journal-photo"><ArticleVisual cover={entry.cover} lang={lang} /></div>
                <h3 title={entry.title[lang]}>{entry.title[lang]}</h3>
                <div className="rest-journal__meta"><span>{entry.topic[lang]}</span><time dateTime={entry.date}>{date.format(new Date(entry.date))}</time></div>
              </Link>
            </li>)}
          </ul>
        </section>

        <section id="conversation" className="meeting meeting--atmosphere" data-night="" aria-labelledby="meeting-title">
          <div className="meaning__atmosphere" aria-hidden="true" />
          <div className="meaning__smoke" aria-hidden="true"><i /><i /></div>
          <div className="meeting__content container">
          <p>{simple.contactText}</p>
          <h2 id="meeting-title">{simple.contactTitle}</h2>
          <Link href={`/${lang}/contact`} data-track="contact_open" data-track-from="meeting">{simple.contactLink}</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
