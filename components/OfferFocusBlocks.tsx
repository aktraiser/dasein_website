import { OfferArtwork } from "@/components/OfferArtwork";
import type { Locale, OfferSlug } from "@/lib/i18n";

export function OfferFocusBlocks({ features, slug }: {
  features: { title: string; text: string }[]; slug: OfferSlug; lang: Locale;
}) {
  return <div className="offer-focus">
    <div className="offer-focus__items">{features.map((feature, index) =>
      <article key={feature.title}>
        <h3><span className="offer-focus__number" aria-hidden="true">0{index + 1}</span>{feature.title}</h3>
        <p>{feature.text}</p>
      </article>
    )}</div>
    <div className="offer-focus__figure" aria-hidden="true"><div className="offer-focus__art"><OfferArtwork slug={slug} /></div></div>
  </div>;
}
