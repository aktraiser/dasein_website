import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * The offer on one picture: support on top, the two verticals on a band with the
 * shared AI Platform (and governance at its core) in the middle, deployment targets below.
 * Each block names who it serves (people, IT, processes); flows run through the platform.
 */
export function OfferMap({ data, lang }: { data: Dictionary["offer"]; lang: Locale }) {
  const href = (slug: string) => `/${lang}/expertise/${slug}`;
  return (
    <Reveal as="figure" className="offer">
      <figcaption className="sr-only">{data.caption}</figcaption>

      <div className="offer__row">
        <span className="offer__axis">{data.axes.support}</span>
        <Link href={`/${lang}/about#role`} className="offer__support">
          <strong>{data.support.title}</strong>
          <span>{data.support.items.join(" | ")}</span>
        </Link>
      </div>

      <div className="offer__row offer__row--band">
        <span className="offer__axis">{data.axes.activate}</span>
        <span className="offer__axis offer__axis--low">{data.axes.govern}</span>
        <div className="offer__band">
          <Link href={href("user-augmentation")} className="offer__side">
            <em className="offer__who">{data.audience.left}</em>
            <strong>{data.left.name}</strong>
            <span>{data.left.text}</span>
          </Link>
          <span className="offer__wire" aria-hidden="true" />
          <Link href={href("ai-platform")} className="offer__core">
            <em className="offer__who">{data.audience.core}</em>
            <strong>{data.core.name}</strong>
            <span>{data.core.text}</span>
            <span className="offer__inner">
              <strong>{data.inner.name}</strong>
              <span>{data.inner.text}</span>
            </span>
          </Link>
          <span className="offer__wire" aria-hidden="true" />
          <Link href={href("business-applications")} className="offer__side offer__side--right">
            <em className="offer__who">{data.audience.right}</em>
            <strong>{data.right.name}</strong>
            <span>{data.right.text}</span>
          </Link>
        </div>
      </div>

      <div className="offer__row">
        <span className="offer__axis">{data.axes.deploy}</span>
        <p className="offer__infra">
          <span aria-hidden="true">←</span>
          {data.infra.join(" | ")}
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </Reveal>
  );
}
