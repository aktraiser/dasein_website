import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { noise: string; signal: string; card: string; rows: [string, string][] }> = {
  fr: {
    noise: "Bruit",
    signal: "Signal",
    card: "Opportunité qualifiée",
    rows: [
      ["Phase", "appel d’offres"],
      ["Échéance", "T2"],
      ["Budget", "confirmé"],
    ],
  },
  en: {
    noise: "Noise",
    signal: "Signal",
    card: "Qualified opportunity",
    rows: [
      ["Phase", "tender"],
      ["Deadline", "Q2"],
      ["Budget", "confirmed"],
    ],
  },
};

// Noise dots and signal blips inside the radar, as % of the radar's box.
const NOISE: [number, number][] = [
  [22, 30], [35, 18], [62, 22], [74, 40], [28, 62], [44, 78], [70, 70], [58, 50], [18, 48],
  [50, 30], [82, 58], [38, 44], [64, 84], [30, 84], [78, 26], [48, 62], [56, 12], [14, 66],
];
const SIGNAL: [number, number][] = [
  [68, 34], [34, 70], [56, 58],
];

/** Cover for the Weak Signal case study: a radar sweeping noise, a few signals, one qualified card. */
export function WeakSignalCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <div className="cover cover--ink" aria-hidden="true">
      <div className="cover__stage">
        <div className="wscover__radar">
          <span className="wscover__ring" style={{ inset: "0%" }} />
          <span className="wscover__ring" style={{ inset: "17%" }} />
          <span className="wscover__ring" style={{ inset: "34%" }} />
          <span className="wscover__sweep" />
          {NOISE.map(([x, y]) => (
            <i key={`${x}-${y}`} className="wscover__dot" style={{ left: `${x}%`, top: `${y}%` }} />
          ))}
          {SIGNAL.map(([x, y], n) => (
            <b
              key={`${x}-${y}`}
              className="wscover__blip"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${n * 0.7}s` }}
            />
          ))}
        </div>
        <span className="wscover__legend" style={{ left: "8%" }}>
          <i /> {t.noise}
        </span>
        <span className="wscover__legend wscover__legend--signal" style={{ left: "22%" }}>
          <b /> {t.signal}
        </span>
        <div className="wscover__card">
          <span className="wscover__card-title">{t.card}</span>
          {t.rows.map(([k, v]) => (
            <span key={k} className="wscover__row">
              <em>{k}</em>
              {v}
            </span>
          ))}
          <span className="wscover__score">
            <span>Score</span>
            <strong>0,92</strong>
          </span>
          <span className="wscover__bar">
            <span />
          </span>
        </div>
      </div>
    </div>
  );
}
