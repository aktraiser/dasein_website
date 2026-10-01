import type { Locale } from "@/lib/i18n";

const TOOLS = [
  { logo: "servicenow.svg", y: 24, wide: true },
  { logo: "salesforce.svg", y: 50 },
  { logo: "datadog.svg", y: 76 },
];

const T: Record<Locale, { front: string; ask: string; agents: string[]; rights: string }> = {
  fr: { front: "Front IA", ask: "Résume l’incident 4812", agents: ["Synthèse", "Recherche", "Rédaction"], rights: "Avec vos droits" },
  en: { front: "AI front end", ask: "Summarise incident 4812", agents: ["Summary", "Search", "Writing"], rights: "With your rights" },
};

function Person() {
  return (
    <svg viewBox="0 0 24 24" className="cover__person">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

/** Cover for User Augmentation: a chat front end with its agents, wired to tools through identity badges. */
export function UserAugmentationCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  // Stage is 160 × 100. Wires leave the window's right edge and reach the tool tiles.
  const wires = TOOLS.map((tool) => `M92.8,50 C110,50 110,${tool.y} 128.8,${tool.y}`);
  return (
    <div className="cover cover--accent" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          {wires.map((d, i) => (
            <g key={d}>
              <path d={d} className="cover__wire" />
              <path d={d} className="cover__packet" pathLength={100} style={{ animationDelay: `${i * 0.6}s` }} />
            </g>
          ))}
        </svg>

        <div className="uacover__window">
          <div className="uacover__bar">
            <i />
            <i />
            <i />
            <span>{t.front}</span>
          </div>
          <div className="uacover__body">
            <span className="uacover__ask">{t.ask}</span>
            <span className="uacover__answer">
              <b />
              <b />
              <b />
            </span>
            <div className="uacover__agents">
              {t.agents.map((agent, i) => (
                <span key={agent} data-on={i === 0}>
                  {agent}
                </span>
              ))}
            </div>
          </div>
        </div>

        {TOOLS.map((tool) => (
          <span key={tool.logo} className="cover__badge" style={{ left: "68.9%", top: `${25 + tool.y / 2}%` }}>
            <Person />
          </span>
        ))}
        {TOOLS.map((tool) => (
          <span
            key={`t${tool.logo}`}
            className={`cover__tile${tool.wide ? " cover__tile--wide" : ""}`}
            style={{ left: "86%", top: `${tool.y}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${tool.logo}`} alt="" />
          </span>
        ))}
        <span className="cover__label cover__label--right cover__label--ink">{t.rights}</span>
      </div>
    </div>
  );
}
