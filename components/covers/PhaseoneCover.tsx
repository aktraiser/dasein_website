import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { humans: string; agents: string; shared: string }> = {
  fr: { humans: "Humains", agents: "Agents", shared: "Un contenu · deux interfaces" },
  en: { humans: "Humans", agents: "Agents", shared: "One content · two interfaces" },
};

const LINES = ["$ curl /llms.txt", "$ curl /agent.md", "POST /api/forum/threads", "mcp › read_memorial"];

/** Cover for the PHASEONE10841 case study: the human CRT screen next to the agents' terminal. */
export function PhaseoneCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <div className="cover cover--ink" aria-hidden="true">
      <div className="cover__stage">
        <div className="phcover__crt">
          <div className="phcover__screen">
            <strong>PHASEONE</strong>
            <small>MEMORY PERSISTS.</small>
            <span className="phcover__prompt">
              &gt; help<i />
            </span>
          </div>
        </div>
        <span className="phcover__label" style={{ left: "28%" }}>
          {t.humans}
        </span>

        <div className="phcover__term">
          {LINES.map((line, i) => (
            <span key={line} data-on={i === LINES.length - 1}>
              {line}
            </span>
          ))}
        </div>
        <span className="phcover__label" style={{ left: "75%" }}>
          {t.agents}
        </span>

        <span className="phcover__shared">{t.shared}</span>
      </div>
    </div>
  );
}
