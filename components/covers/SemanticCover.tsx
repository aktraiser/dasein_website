import type { Locale } from "@/lib/i18n";

const RAW = [
  { text: "84721", y: 30 },
  { text: "S02", y: 52 },
  { text: "SPT-01", y: 74 },
];

const T: Record<Locale, { data: string; concepts: string; hub: string; nodes: string[] }> = {
  fr: { data: "Données", concepts: "Concepts", hub: "Sens", nodes: ["Épisode", "Saison 2", "Sport"] },
  en: { data: "Data", concepts: "Concepts", hub: "Meaning", nodes: ["Episode", "Season 2", "Sport"] },
};

/**
 * Cover for the semantics article: raw values on the left, the business concepts
 * they stand for on the right, joined through one shared meaning.
 */
export function SemanticCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  // Stage is 160 × 100: raw values sit at 16% of the width, concepts at 84%, the hub in the middle.
  const left = RAW.map((raw) => `M38,${raw.y} C54,${raw.y} 56,52 68,52`);
  const right = RAW.map((raw) => `M92,52 C104,52 106,${raw.y} 120,${raw.y}`);
  return (
    <div className="cover cover--paper" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          {[...left, ...right].map((d, i) => (
            <g key={d}>
              <path d={d} className="cover__wire" />
              <path d={d} className="cover__packet" pathLength={100} style={{ animationDelay: `${(i * 0.4) % 2.4}s` }} />
            </g>
          ))}
        </svg>

        <span className="cover__label cover__label--ink" style={{ left: "4%" }}>
          {t.data}
        </span>
        <span className="cover__label cover__label--ink cover__label--right">{t.concepts}</span>

        {RAW.map((raw) => (
          <span key={raw.text} className="smcover__raw" style={{ left: "16%", top: `${raw.y}%` }}>
            {raw.text}
          </span>
        ))}
        <span className="smcover__hub">{t.hub}</span>
        {t.nodes.map((node, i) => (
          <span key={node} className="smcover__node" style={{ left: "84%", top: `${RAW[i].y}%` }}>
            {node}
          </span>
        ))}
      </div>
    </div>
  );
}
