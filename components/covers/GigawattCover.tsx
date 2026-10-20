import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { capex: string; revenue: string; gap: string; money: string; time: string; invested: string; earned: string; bigCapex: string; bigRevenue: string }> = {
  fr: { capex: "Capex · 2026", revenue: "Revenus des labos", gap: "×8,5", money: "Md$", time: "temps", invested: "investis", earned: "de revenus", bigCapex: "1 000 Md$", bigRevenue: "117 Md$" },
  en: { capex: "Capex · 2026", revenue: "Lab revenue", gap: "×8.5", money: "$bn", time: "time", invested: "invested", earned: "of revenue", bigCapex: "$1tn", bigRevenue: "$117bn" },
};

// Stage is 160 × 100: investment takes off while the labs' revenue climbs slowly; the gap between them is shaded.
const CAPEX = "M18,80 C66,78 108,58 150,14";
const REVENUE = "M18,80 C70,79 110,74 150,66";
const GAP = `${CAPEX} L150,66 C110,74 70,79 18,80 Z`;

/** Cover for "The gigawatt and the dollar": the gap between what AI infrastructure costs and what it earns. */
export function GigawattCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <div className="cover cover--paper" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          <path d={GAP} className="encover__gap" />
          <path d="M18,84 H152 M18,84 V12" className="encover__axis" />
          <path d={REVENUE} className="encover__grid" />
          <path d={CAPEX} className="encover__ai" />
          <path d={CAPEX} className="cover__packet" pathLength={100} />
        </svg>
        <span className="encover__axis-label" style={{ left: "11%", top: "9%" }}>
          {t.money}
        </span>
        <span className="encover__axis-label" style={{ left: "92%", top: "89%" }}>
          {t.time}
        </span>
        <span className="encover__tag encover__tag--ai" style={{ left: "72%", top: "12%" }}>
          {t.capex}
        </span>
        <span className="encover__tag" style={{ left: "78%", top: "76%" }}>
          {t.revenue}
        </span>
        <span className="encover__gap-label" style={{ left: "82%", top: "52%" }}>
          {t.gap}
        </span>
        <div className="encover__stats">
          <span>
            <b>{t.bigCapex}</b> {t.invested}
          </span>
          <span>
            <b>{t.bigRevenue}</b> {t.earned}
          </span>
        </div>
      </div>
    </div>
  );
}
