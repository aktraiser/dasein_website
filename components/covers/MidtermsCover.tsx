import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { vote: string; frozen: string; ballots: string; yes: string; no: string }> = {
  fr: { vote: "Midterms · 3 nov. 2026", frozen: "Permis gelés", ballots: "scrutins locaux pour des restrictions", yes: "restrictions", no: "autres" },
  en: { vote: "Midterms · 3 Nov 2026", frozen: "Permits frozen", ballots: "local ballots for restrictions", yes: "restrictions", no: "other" },
};

// Stage is 160 × 100: the 45 local ballots on data centers, 15 × 3; the 12 that did not vote restrictions stay empty.
const COLS = 15;
const CELL = 7;
const GAP = 2;
const X0 = 14;
const Y0 = 44;
const EMPTY = new Set([3, 9, 14, 17, 22, 26, 30, 33, 36, 40, 42, 44]);

/** Cover for "Data centers : quand la politique devient le risque": 33 of 45 local ballots voted restrictions. */
export function MidtermsCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <div className="cover cover--paper" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          {Array.from({ length: 45 }, (_, i) => (
            <rect
              key={i}
              x={X0 + (i % COLS) * (CELL + GAP)}
              y={Y0 + Math.floor(i / COLS) * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx={1}
              className={`mtcover__cell${EMPTY.has(i) ? "" : " mtcover__cell--yes"}`}
              style={{ animationDelay: `${i * 40}ms` }}
            />
          ))}
        </svg>
        <div className="encover__stats" style={{ left: "9%", top: "12%" }}>
          <span>
            <b>33 / 45</b> {t.ballots}
          </span>
        </div>
        <span className="encover__tag encover__tag--ai" style={{ left: "76%", top: "33%" }}>
          {t.vote}
        </span>
        <span className="encover__tag" style={{ left: "22%", top: "84%" }}>
          {t.frozen}
        </span>
        <span className="mtcover__legend" style={{ left: "62%", top: "84%" }}>
          <i className="mtcover__key mtcover__key--yes" /> {t.yes}
          <i className="mtcover__key" /> {t.no}
        </span>
      </div>
    </div>
  );
}
