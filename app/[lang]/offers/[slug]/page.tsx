import Link from "next/link";
import { OfferCards } from "@/components/OfferCards";
import Image from "next/image";
import { notFound } from "next/navigation";
import { offerDesign } from "@/content/offerDesign";
import { OfferArtwork } from "@/components/OfferArtwork";
import { NightHeader } from "@/components/home/NightHeader";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale, offerSlugs, type OfferSlug, type Route } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import "./offers.css";

const PHOTOS: Record<OfferSlug, { src:string; author:string; source:string; alt:{fr:string;en:string} }> = {
  "ways-of-working": { src:"/images/team-context.jpg", author:"Annie Spratt", source:"https://unsplash.com/photos/QckxruozjRg", alt:{fr:"Des collègues échangent autour de leurs ordinateurs.",en:"Colleagues discussing their work around laptops."} },
  solutions: { src:"/images/process-workshop.jpg", author:"Headway", source:"https://unsplash.com/photos/5QgIuuBxKwM", alt:{fr:"Une équipe échange autour d’une table de travail.",en:"A team discussing their work around a table."} },
  engineering: { src:"/images/engineering-work.jpg", author:"Alex Kotliarskyi", source:"https://unsplash.com/photos/ourQHRTE2IM", alt:{fr:"Une personne travaille sur un ordinateur portable.",en:"A person working on a laptop."} },
};

export const dynamicParams = false;
export function generateStaticParams() { return offerSlugs.map(slug => ({ slug })); }
export async function generateMetadata({ params }: PageProps<"/[lang]/offers/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { offers } = await getDictionary(lang);
  const item = offers.items.find(o => o.slug === slug);
  if (!item) return {};
  const design = offerDesign[lang][item.slug as OfferSlug];
  return pageMetadata(lang, `/offers/${slug}` as Route, design.name, design.tagline);
}

export default async function OfferPage({ params }: PageProps<"/[lang]/offers/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const { offers, home } = await getDictionary(lang);
  const base = offers.items.find(o => o.slug === slug);
  if (!base) notFound();
  const item = { ...base, ...offerDesign[lang][base.slug as OfferSlug] };
  const t = offers.page;
  const photo = PHOTOS[item.slug as OfferSlug];
  const contact = `/${lang}/contact?offer=${item.slug}`;
  return <div className="offer-page">
    <NightHeader />
    <section className="offer-opening" data-night="" aria-labelledby="offer-title">
      <div className="offer-opening__light" aria-hidden="true" />
      <div className="container offer-opening__grid">
        <div>
          <p className="offer-eyebrow"><Link href={`/${lang}#offers`}>{t.back}</Link><span>{item.dimension} · {item.internal}</span></p>
          <p className="offer-opening__audience">{item.audience}</p>
          <h1 id="offer-title">{item.name}</h1>
          <p className="offer-opening__lead">{item.tagline}</p>
          <div className="offer-actions"><Link className="offer-button" href={contact}>{item.cta}</Link><Link href="#start">{t.startLabel}</Link></div>
        </div>
        <div className="offer-opening__art" aria-hidden="true"><OfferArtwork slug={item.slug as OfferSlug} /></div>
      </div>
    </section>

    <section className="offer-section offer-simple container" aria-labelledby="offer-problem-title">
      <div className="offer-simple__intro"><div><p className="offer-caption">{lang === "fr" ? "Votre besoin" : "Your need"}</p><h2 id="offer-problem-title">{item.question}</h2><p>{item.situation}</p><p>{item.lead}</p></div>
      <figure><Image src={photo.src} alt={photo.alt[lang]} width={1000} height={667} sizes="(max-width:719px) 90vw, 30vw" /></figure></div>
      <h2 className="offer-caption offer-simple__label">{lang === "fr" ? "Ce que nous faisons" : "What we do"}</h2>
      <div className="offer-simple__answers">{item.features.map(feature => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
      <div className="offer-outcome"><p className="offer-caption">{lang === "fr" ? "Ce que vous obtenez" : "What you get"}</p><p>{item.result}</p></div>
    </section>
    <section id="start" className="offer-section offer-start container" aria-labelledby="offer-start-title">
      <div className="offer-start__intro"><p className="offer-caption">{lang === "fr" ? "Comment démarrer ensemble" : "How we start together"}</p><h2 id="offer-start-title">{item.start.name}</h2><p>{item.start.text}</p></div>
      <div className="offer-start__scope"><p className="offer-caption">{lang === "fr" ? "À l’issue de cette première étape" : "After this first step"}</p><p>{item.start.deliverables}</p><p className="offer-scope-note">{lang === "fr" ? "Périmètre, durée et prix sont définis ensemble avant de commencer." : "Scope, duration and price are agreed together before we start."}</p></div>

    </section>

    <section className="offer-contact" data-night="" aria-labelledby="offer-contact-title"><div className="container"><h2 id="offer-contact-title">{item.closing}</h2><Link className="offer-button" href={contact}>{item.cta}</Link></div></section>
    <nav className="offer-related container" aria-labelledby="offer-related-title">
      <h2 id="offer-related-title">{t.otherOffers}</h2>
      <OfferCards offers={home.simple.offers} lang={lang} exclude={item.slug} />
    </nav>
  </div>;
}
