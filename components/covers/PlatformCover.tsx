import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { levels: string[]; blocks: string[]; flows: string }> = {
  fr: {
    levels: ["Utiliser", "Assembler", "Construire"],
    blocks: ["Opérations", "Catalogue", "Gateway", "Gouvernance"],
    flows: "Modèles · Outils · Agents",
  },
  en: {
    levels: ["Use", "Assemble", "Build"],
    blocks: ["Operations", "Catalogue", "Gateway", "Governance"],
    flows: "Models · Tools · Agents",
  },
};

const X = [40, 80, 120];

/** Cover for AI Platform: three team levels plugged into the shared platform slab. */
export function PlatformCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  // Stage is 160 × 100: cards end at y 34, the slab starts at y 52.
  const wires = X.map((x) => `M${x},34 L${x},52`);
  return (
    <div className="cover cover--ink" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          {wires.map((d, i) => (
            <g key={d}>
              <path d={d} className="cover__wire cover__wire--dashed" />
              <path d={d} className="cover__packet" pathLength={100} style={{ animationDelay: `${i * 0.5}s` }} />
            </g>
          ))}
        </svg>

        {t.levels.map((level, i) => (
          <div key={level} className="pfcover__team" style={{ left: `${(X[i] / 160) * 100}%` }}>
            <small>{String(i + 1).padStart(2, "0")}</small>
            <span>{level}</span>
            <div className="pfcover__bars">
              {Array.from({ length: (i + 1) * 2 }, (_, j) => (
                <b key={j} />
              ))}
            </div>
          </div>
        ))}

        <div className="pfcover__slab">
          <span className="pfcover__title">AI Platform</span>
          <div className="pfcover__blocks">
            {t.blocks.map((block) => (
              <span key={block}>{block}</span>
            ))}
          </div>
        </div>
        <span className="pfcover__flows">{t.flows}</span>
      </div>
    </div>
  );
}
