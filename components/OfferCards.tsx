import Link from "next/link";
import { OfferArtwork } from "@/components/OfferArtwork";
import { offerSlugs, type Locale, type OfferSlug } from "@/lib/i18n";
import "./offer-cards.css";

type Card = {slug:string;name:string;text:string;internal:string};

/** Homepage and offer pages share both content and presentation. */
export function OfferCards({offers,lang,exclude}:{offers:Card[];lang:Locale;exclude?:string}) {
 const visible=offers.filter(offer=>offer.slug!==exclude);
 return <ol className="shared-offer-cards" data-count={visible.length}>{visible.map(offer=><li key={offer.slug}>
  <Link href={`/${lang}/offers/${offer.slug}`} data-track="offer_open" data-track-offer={offer.slug}>
   <span className="shared-offer-cards__number" aria-hidden="true">0{offerSlugs.indexOf(offer.slug as OfferSlug)+1}</span>
   <h3>{offer.name}</h3><span className="shared-offer-cards__internal">{offer.internal}</span>
   <p>{offer.text}</p>
   <div className="shared-offer-cards__art"><OfferArtwork slug={offer.slug as OfferSlug}/></div>
   <span className="shared-offer-cards__discover">{lang === "fr" ? "Découvrir l’offre" : "Explore the offer"}</span>
  </Link>
 </li>)}</ol>;
}
