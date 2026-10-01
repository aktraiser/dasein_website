import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { invoices: string; main: string; plan: [string, boolean][]; subs: string[]; approval: string }> = {
  fr: {
    invoices: "Factures",
    main: "Agent principal",
    plan: [
      ["Lire", true],
      ["Rapprocher", true],
      ["Valider", false],
    ],
    subs: ["Rapprochement", "Litiges", "Paiements"],
    approval: "Validation humaine",
  },
  en: {
    invoices: "Invoices",
    main: "Main agent",
    plan: [
      ["Read", true],
      ["Match", true],
      ["Approve", false],
    ],
    subs: ["Matching", "Disputes", "Payments"],
    approval: "Human approval",
  },
};

const SUB_X = [54.4, 80, 105.6];

/** Cover for Business Applications: invoices → main agent with its plan → subagents, human approval, ERP. */
export function BusinessCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  // Stage is 160 × 100.
  const wires = [
    "M35.2,50 C47,50 47,34 59.2,34",
    "M100.8,34 L121.6,34",
    "M131.2,43.6 L131.2,60.4",
    ...SUB_X.map((x) => `M80,54 C80,63 ${x},62 ${x},71.2`),
  ];
  return (
    <div className="cover cover--paper" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          {wires.map((d, i) => (
            <g key={d}>
              <path d={d} className="cover__wire" />
              <path d={d} className="cover__packet" pathLength={100} style={{ animationDelay: `${i * 0.45}s` }} />
            </g>
          ))}
        </svg>

        <div className="bacover__docs">
          {[0, 1, 2].map((i) => (
            <span key={i} className="bacover__doc" style={{ transform: `translate(${i * 9}%, ${i * -7}%) rotate(${(i - 1) * 5}deg)` }}>
              <b />
              <b />
              <b />
              <em>€</em>
            </span>
          ))}
          <small>{t.invoices}</small>
        </div>

        <div className="bacover__main">
          <span className="bacover__main-title">{t.main}</span>
          {t.plan.map(([step, done]) => (
            <span key={step} className="bacover__step" data-done={done}>
              <i />
              {step}
            </span>
          ))}
        </div>

        <span className="cover__hook" style={{ left: "69.4%", top: "34%" }} />

        <span className="bacover__approval">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <small className="bacover__approval-label">{t.approval}</small>
        <span className="bacover__erp">ERP</span>

        {t.subs.map((sub, i) => (
          <span key={sub} className="bacover__sub" style={{ left: `${(SUB_X[i] / 160) * 100}%` }}>
            <small>{sub}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
