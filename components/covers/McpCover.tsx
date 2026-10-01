import type { Locale } from "@/lib/i18n";

const AGENTS = [
  { logo: "claude.svg", y: 28 },
  { logo: "openai.svg", y: 50 },
  { logo: "mistralai.svg", y: 72 },
];
const TOOLS = [
  { logo: "servicenow.svg", y: 20, wide: true },
  { logo: "salesforce.svg", y: 40 },
  { logo: "snowflake.svg", y: 60 },
  { logo: "databricks.svg", y: 80 },
];

const LABELS: Record<
  Locale,
  { agents: string; tools: string; gateway: string }
> = {
  fr: { agents: "Agents", tools: "Outils et données", gateway: "Gateway" },
  en: { agents: "Agents", tools: "Tools and data", gateway: "Gateway" },
};

/**
 * Cover for the MCP article: agents on the left, company tools on the right,
 * all plugged into one MCP connector wrapped by the gateway ring, with data
 * packets running along the wires. Positions are percentages of the frame.
 */
export function McpCover({ lang }: { lang: Locale }) {
  const t = LABELS[lang];
  // Stage is 160 × 100: tiles sit at 14% / 86% of the width, the hub spans 40–60%.
  const left = AGENTS.map((a) => `M32,${a.y} C46,${a.y} 50,50 64,50`);
  const right = TOOLS.map(
    (tool) => `M96,50 C110,50 114,${tool.y} 129.2,${tool.y}`,
  );

  return (
    <div className="mcpcover" aria-hidden="true">
      <div className="mcpcover__stage">
        <svg className="mcpcover__wires" viewBox="0 0 160 100">
          {[...left, ...right].map((d, i) => (
            <g key={d}>
              <path d={d} className="mcpcover__wire" />
              <path
                d={d}
                className="mcpcover__packet"
                pathLength={100}
                style={{
                  animationDelay: `${(i * 0.37) % 2}s`,
                  animationDirection: i < left.length ? "normal" : "reverse",
                }}
              />
            </g>
          ))}
        </svg>

        <span className="mcpcover__label mcpcover__label--left">
          {t.agents}
        </span>
        <span className="mcpcover__label mcpcover__label--right">
          {t.tools}
        </span>

        {AGENTS.map((a) => (
          <span
            key={a.logo}
            className="mcpcover__tile"
            style={{ left: "14%", top: `${a.y}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${a.logo}`} alt="" />
          </span>
        ))}
        {TOOLS.map((tool) => (
          <span
            key={tool.logo}
            className={`mcpcover__tile mcpcover__tile--tool${tool.wide ? " mcpcover__tile--wide" : ""}`}
            style={{ left: "86%", top: `${tool.y}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${tool.logo}`} alt="" />
          </span>
        ))}

        <span className="mcpcover__ring">
          <span className="mcpcover__ring-label">{t.gateway}</span>
        </span>
        <span className="mcpcover__hub">
          <svg viewBox="0 0 24 24" className="mcpcover__plug">
            <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" />
          </svg>
          <strong>MCP</strong>
          <small>Model Context Protocol</small>
        </span>
      </div>
    </div>
  );
}
