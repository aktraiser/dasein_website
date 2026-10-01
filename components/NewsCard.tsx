import Link from "next/link";
import type { NewsItem, NewsVisual } from "@/content/news";
import type { Locale } from "@/lib/i18n";
import { McpCover } from "./covers/McpCover";
import { FloatingChips } from "./FloatingChips";
import { DitherField } from "./os/DitherField";

const SHIELD = "M20 5.5 31 9.6v9.1c0 7.4-4.6 13-11 15.8-6.4-2.8-11-8.4-11-15.8V9.6z";
const CHECK = "M14.6 20.2l3.9 3.9 7.2-7.6";

function Visual({ visual, lang }: { visual: NewsVisual; lang: Locale }) {
  switch (visual) {
    case "mcp":
      return (
        <div className="card__media card__media--ink">
          <McpCover lang={lang} />
        </div>
      );
    case "chips":
      return (
        <div className="card__media card__media--ink">
          <FloatingChips />
        </div>
      );
    case "flow":
      return (
        <div className="card__media card__media--ink card__media--flow" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/snowflake.svg" alt="" />
          <span className="card__wire" />
          <span className="card__agent">
            <svg viewBox="0 0 40 40">
              <path d={SHIELD} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
              <path d={CHECK} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="card__wire" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/servicenow.svg" alt="" data-wide="true" />
        </div>
      );
    case "dither":
      return (
        <div className="card__media">
          <DitherField variant="blobs" />
        </div>
      );
    case "steps":
      return (
        <div className="card__media card__media--steps" aria-hidden="true">
          {["01", "02", "03", "04"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      );
    case "shield":
      return (
        <div className="card__media card__media--shield" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path className="card__shield" d={SHIELD} pathLength={1} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path className="card__check" d={CHECK} pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
  }
}

/** One article / announcement card: visual, title, "Kind · meta" line. */
export function NewsCard({
  item,
  lang,
  kindLabel,
  main = false,
}: {
  item: NewsItem;
  lang: Locale;
  kindLabel: string;
  main?: boolean;
}) {
  const external = /^https?:\/\//.test(item.href);
  const href = external ? item.href : `/${lang}${item.href.startsWith("/#") ? item.href.slice(1) : item.href}`;
  const content = item.content[lang];
  const Title = main ? "h2" : "h3";

  return (
    <Link href={href} className={`card${main ? " card--main" : ""}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <Visual visual={item.visual} lang={lang} />
      <Title className="card__title">{content.title}</Title>
      <p className="card__meta">
        {kindLabel} · {content.meta}
      </p>
    </Link>
  );
}
