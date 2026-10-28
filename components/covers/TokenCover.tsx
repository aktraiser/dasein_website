import type { Locale } from "@/lib/i18n";

const T: Record<Locale, { token: string; kwh: string; price: string; time: string; plan: string; elec: string }> = {
  fr: { token: "Token · ÷10 par an", kwh: "kWh · +5 % par an", price: "prix", time: "temps", plan: "le forfait", elec: "d’électricité" },
  en: { token: "Token · ÷10 a year", kwh: "kWh · +5% a year", price: "price", time: "time", plan: "the plan", elec: "of electricity" },
};

// Stage is 160 × 100: the token price collapses while the kilowatt-hour price climbs in steps.
const TOKEN = "M18,14 C34,58 84,74 150,78";
const KWH = "M18,66 H52 V61 H86 V56 H120 V51 H150";

/** Cover for "The token and the kilowatt-hour": two prices heading in opposite directions. */
export function TokenCover({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <div className="cover cover--paper" aria-hidden="true">
      <div className="cover__stage">
        <svg className="cover__wires" viewBox="0 0 160 100">
          <path d="M18,84 H152 M18,84 V12" className="encover__axis" />
          <path d={KWH} className="encover__grid" />
          <path d={TOKEN} className="encover__ai" />
          <path d={TOKEN} className="cover__packet" pathLength={100} />
        </svg>
        <span className="encover__axis-label" style={{ left: "11%", top: "9%" }}>
          {t.price}
        </span>
        <span className="encover__axis-label" style={{ left: "92%", top: "89%" }}>
          {t.time}
        </span>
        <span className="encover__tag encover__tag--ai" style={{ left: "36%", top: "24%" }}>
          {t.token}
        </span>
        <span className="encover__tag" style={{ left: "76%", top: "40%" }}>
          {t.kwh}
        </span>
        <div className="encover__stats" style={{ left: "auto", right: "6%", top: "8%" }}>
          <span>
            <b>500 $</b> {t.plan}
          </span>
          <span>
            <b>7 cents</b> {t.elec}
          </span>
        </div>
      </div>
    </div>
  );
}
