import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * The three offers as cards, like the plans on a product page: who it is for,
 * the problem in the client's words, then the first engagement where a price
 * would stand, and a single action.
 */
export function Offers({ data, lang }: { data: Dictionary["offers"]; lang: Locale }) {
  return (
    <ol className="oplans oplans--three">
      {data.items.map((item, n) => (
        <Reveal as="li" key={item.slug} className="oplan" delay={n * 80}>
          <p className="oplan__label">
            {String(n + 1).padStart(2, "0")} · {item.audience}
          </p>
          <h3 className="oplan__name">{item.name}</h3>
          <p className="oplan__says">{item.says}</p>
          <p className="oplan__text">{item.tagline}</p>

          <div className="oplan__start">
            <p className="oplan__label">{data.startLabel}</p>
            <p className="oplan__entry">{item.start.name}</p>
            <p className="oplan__text">{item.start.text}</p>
          </div>

          <Link href={`/${lang}/offers/${item.slug}`} className="pill pill--ink pill--lg oplan__cta">
            {data.more} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
