import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Agentic AI in three columns: two verticals (end users, business teams) and
 * the common IT platform that governs every agent. Each shows what we build
 * and how tight the control is (light → reinforced → strict).
 */
export function Verticals({ data, lang }: { data: Dictionary["verticals"]; lang: Locale }) {
  return (
    <ol className="vlist">
      {data.items.map((item, n) => (
        <Reveal as="li" key={item.id} className="vlist__item" delay={n * 80}>
          <p className="vlist__top">
            <span>{String(n + 1).padStart(2, "0")}</span>
            {item.audience}
          </p>
          <h3 className="vlist__name">{item.name}</h3>
          <p className="vlist__purpose">{item.purpose}</p>

          <div className="gov">
            <p className="gov__label">{data.buildsLabel}</p>
            <ul className="gov__builds">
              {item.builds.map((build) => (
                <li key={build.name}>{build.name}</li>
              ))}
            </ul>
          </div>

          <div className="gov gov--control">
            <p className="gov__label">{data.controlLabel}</p>
            <p className="gov__levelline">
              <span className="gov__level" aria-hidden="true">
                {data.levels.map((level, i) => (
                  <i key={level} data-on={i < item.level} />
                ))}
              </span>
              <strong>{data.levels[item.level - 1]}</strong>
            </p>
            <p className="gov__detail">{item.control}</p>
          </div>

          <Link href={`/${lang}/expertise/${item.slug}`} className="link">
            {data.page.more} <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
