import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { quota: string; refused: string; load: string; time: string; label: string }> = {
  fr: { quota: "Quota · TPM", refused: "429", load: "requêtes", time: "temps", label: "trop de requêtes" },
  en: { quota: "Quota · TPM", refused: "429", load: "requests", time: "time", label: "too many requests" },
};

// Stage is 160 × 100: bursty traffic crosses the quota ceiling, and the peaks above it are refused.
const TRAFFIC = "M18,72 L30,64 L38,68 L46,46 L54,66 L64,60 L72,32 L80,62 L92,56 L100,22 L108,60 L120,52 L128,44 L136,62 L150,54";
const CEILING = "M18,40 H150";

/** Cover for "Le 429 n’est pas un bug": bursts of requests hitting a quota ceiling. */
export function RateLimitCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <div className="cover cover--paper" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          <path d="M18,84 H152 M18,84 V12" className="encover__axis" />
          <path d={CEILING} className="encover__grid" />
          <path d={TRAFFIC} className="encover__ai" />
          <path d={TRAFFIC} className="cover__packet" pathLength={100} />
        </svg>
        <span className="encover__axis-label" style={{ left: "11%", top: "9%" }}>
          {t.load}
        </span>
        <span className="encover__axis-label" style={{ left: "92%", top: "89%" }}>
          {t.time}
        </span>
        <span className="encover__tag encover__tag--ai" style={{ left: "63%", top: "13%" }}>
          {t.refused}
        </span>
        <span className="encover__tag" style={{ left: "84%", top: "33%" }}>
          {t.quota}
        </span>
        <div className="encover__stats" style={{ left: "auto", right: "6%", top: "60%" }}>
          <span>
            <b>429</b> {t.label}
          </span>
        </div>
      </div>
    </div>
  );
}
