import type { OfferSlug } from "@/lib/i18n";

/** The same three line illustrations used by the homepage offer cards. */
export function OfferArtwork({ slug }: { slug: OfferSlug; stage?: number }) {
  return <div className={`offer-artwork offer-artwork--${slug}`} aria-hidden="true">
    <svg viewBox="0 0 260 140" fill="none">
      {slug === "ways-of-working" ? <><circle cx="95" cy="70" r="38" stroke="currentColor" /><circle cx="165" cy="70" r="38" stroke="currentColor" /><path d="M112 70h36" stroke="currentColor" /><circle cx="130" cy="70" r="4" fill="currentColor" /></> : slug === "solutions" ? <><rect x="47" y="30" width="65" height="80" rx="5" stroke="currentColor" /><rect x="148" y="30" width="65" height="80" rx="5" stroke="currentColor" /><path d="M112 70h36M62 50h35m-35 14h25m76-14h35m-35 14h25" stroke="currentColor" /></> : <><path d="M130 18 210 58 130 98 50 58 130 18Z" stroke="currentColor" /><path d="m50 78 80 40 80-40M50 98l80 40 80-40" stroke="currentColor" /></>}
    </svg>
  </div>;
}
