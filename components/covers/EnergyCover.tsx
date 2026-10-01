import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { ai: string; grid: string; gap: string; power: string; time: string; elec: string; heat: string }> = {
  fr: { ai: "IA · des jours", grid: "Réseau · des années", gap: "L’écart", power: "MW", time: "temps", elec: "électrique", heat: "thermique" },
  en: { ai: "AI · days", grid: "Grid · years", gap: "The gap", power: "MW", time: "time", elec: "electrical", heat: "thermal" },
};

// Stage is 160 × 100: the AI power curve takes off while grid capacity climbs in steps.
const AI = "M18,80 C70,79 110,62 150,12";
const GRID = "M18,80 H52 V73 H86 V66 H120 V59 H150";
const GAP = `${AI} L150,59 H120 V66 H86 V73 H52 V80 Z`;

/** Cover for "The megawatt and the degree": the speed gap between AI's power demand and the grid. */
export function EnergyCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <div className="cover cover--paper" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          <path d={GAP} className="encover__gap" />
          <path d="M18,84 H152 M18,84 V12" className="encover__axis" />
          <path d={GRID} className="encover__grid" />
          <path d={AI} className="encover__ai" />
          <path d={AI} className="cover__packet" pathLength={100} />
        </svg>
        <span className="encover__axis-label" style={{ left: "11%", top: "9%" }}>
          {t.power}
        </span>
        <span className="encover__axis-label" style={{ left: "92%", top: "89%" }}>
          {t.time}
        </span>
        <span className="encover__tag encover__tag--ai" style={{ left: "70%", top: "12%" }}>
          {t.ai}
        </span>
        <span className="encover__tag" style={{ left: "79%", top: "68%" }}>
          {t.grid}
        </span>
        <span className="encover__gap-label" style={{ left: "80%", top: "49%" }}>
          {t.gap}
        </span>
        <div className="encover__stats">
          <span>
            <b>&gt; 60 MW</b> {t.elec}
          </span>
          <span>
            <b>&gt; 60 MWth</b> {t.heat}
          </span>
        </div>
      </div>
    </div>
  );
}
