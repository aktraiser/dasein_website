import type { Locale } from "@/lib/i18n";
import { TEXAS, TEXAS_BOUNDS, TX_COUNTIES, US_BORDERS, US_LAND, US_STATES } from "./midtermsMapData";

type Loss = "both" | "governor" | "senate" | "house" | "pending";
type Exposure = "frozen" | "audit" | "unknown";

/** What Republicans lost on 3 November 2026, by state (figures from the article). */
const LOSSES: { state: string; abbr: string; loss: Loss }[] = [
  { state: "Texas", abbr: "TX", loss: "both" },
  { state: "Ohio", abbr: "OH", loss: "both" },
  { state: "Nevada", abbr: "NV", loss: "governor" },
  { state: "Georgia", abbr: "GA", loss: "governor" },
  { state: "South Carolina", abbr: "SC", loss: "senate" },
  { state: "Arizona", abbr: "AZ", loss: "house" },
  { state: "Mississippi", abbr: "MS", loss: "pending" },
];

/** Texas projects from the audit table: county, size in GW, exposure to the permit freeze, label placement. */
const PROJECTS: { county: string; name: string; gw: number; exposure: Exposure; dx: number; dy: number; anchor: "start" | "end" }[] = [
  { county: "Carson", name: "Fermi Matador · 6", gw: 6, exposure: "frozen", dx: 8, dy: -3, anchor: "start" },
  { county: "Armstrong", name: "Goodnight · 0,9", gw: 0.9, exposure: "frozen", dx: 8, dy: 6, anchor: "start" },
  { county: "Pecos", name: "GW Ranch · 7,65", gw: 7.65, exposure: "unknown", dx: -9, dy: 12, anchor: "end" },
  { county: "Hill", name: "Nexus Hubbard · 6,4", gw: 6.4, exposure: "frozen", dx: 9, dy: 4, anchor: "start" },
  { county: "Shackelford", name: "Stargate Frontier · 1,82", gw: 1.82, exposure: "unknown", dx: -5, dy: -6, anchor: "end" },
  { county: "Taylor", name: "Abilene ×2 · 2,1", gw: 2.1, exposure: "frozen", dx: -6, dy: 7, anchor: "end" },
  { county: "Milam", name: "Stargate Milam · 1,2", gw: 1.2, exposure: "audit", dx: 6, dy: 6, anchor: "start" },
  { county: "El Paso", name: "Meta · 1", gw: 1, exposure: "unknown", dx: 2, dy: -7, anchor: "start" },
];

const T: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    usTitle: string;
    txTitle: string;
    losses: Record<Loss, string>;
    exposure: Record<Exposure, string>;
    ellis: string;
    size: string;
    stats: { value: string; label: string }[];
    caption: string;
    decimal: (s: string) => string;
  }
> = {
  fr: {
    title: "Ce que les républicains ont perdu, et où sont les data centers",
    subtitle: "Bascules du 3 novembre 2026 et grands projets texans face au gel des permis",
    usTitle: "Postes perdus par les républicains",
    txTitle: "Texas : grands projets en chantier",
    losses: {
      both: "Gouverneur et Sénat",
      governor: "Gouverneur",
      senate: "Sénat",
      house: "Siège à la Chambre",
      pending: "Sénat, non attribué",
    },
    exposure: { frozen: "Permis gaz gelé", audit: "Soumis à l’audit ERCOT", unknown: "Exposition non documentée" },
    ellis: "Ellis, 1er comté en demandes de permis : a voté républicain",
    size: "Taille du disque : capacité en GW",
    stats: [
      { value: "420,8 GW", label: "de demandes de raccordement de data centers chez ERCOT, plus de 5 fois le pic du réseau" },
      { value: "≈ 1/4", label: "de la capacité de data centers prévue aux États-Unis est au Texas" },
      { value: "≈ 45 %", label: "de la capacité prévue sera dans des États dirigés par des démocrates favorables aux moratoires" },
    ],
    caption:
      "Sources : résultats et positions cités dans l’article (MIT Technology Review, Fortune, TIME, KTAR, Washington Post) ; projets : Nameplate Report, stargate.how, Apollo Technical, dcmap.us ; demandes : POWER Magazine ; parts de capacité : Goldman Sachs. Les disques sont placés au centre du comté. Fond de carte : US Census Bureau, domaine public.",
    decimal: (s) => s,
  },
  en: {
    title: "What Republicans lost, and where the data centers are",
    subtitle: "The 3 November 2026 flips, and the big Texas projects facing the permit freeze",
    usTitle: "Offices lost by Republicans",
    txTitle: "Texas: large projects under construction",
    losses: {
      both: "Governor and Senate",
      governor: "Governor",
      senate: "Senate",
      house: "House seat",
      pending: "Senate, not called",
    },
    exposure: { frozen: "Gas permit frozen", audit: "Subject to the ERCOT audit", unknown: "Exposure not documented" },
    ellis: "Ellis, top county for permit applications: voted Republican",
    size: "Disc size: capacity in GW",
    stats: [
      { value: "420.8 GW", label: "of data-center connection requests at ERCOT, more than 5 times the grid’s peak" },
      { value: "≈ 1/4", label: "of planned US data-center capacity is in Texas" },
      { value: "≈ 45%", label: "of planned capacity will be in states led by Democrats who favour moratoriums" },
    ],
    caption:
      "Sources: results and positions cited in the article (MIT Technology Review, Fortune, TIME, KTAR, Washington Post); projects: Nameplate Report, stargate.how, Apollo Technical, dcmap.us; requests: POWER Magazine; capacity shares: Goldman Sachs. Discs sit at the centre of the county. Base map: US Census Bureau, public domain.",
    decimal: (s) => s.replace(/(\d),(\d)/g, "$1.$2"),
  },
};

const PAD = 10;
const [[TX_X0, TX_Y0], [TX_X1, TX_Y1]] = TEXAS_BOUNDS;
const TX_VIEW = `${TX_X0 - PAD} ${TX_Y0 - PAD} ${TX_X1 - TX_X0 + 2 * PAD + 40} ${TX_Y1 - TX_Y0 + 2 * PAD}`;
const radius = (gw: number) => 2.4 * Math.sqrt(gw);

/** US map of the Republican losses on 3 November 2026, with a Texas inset of the large data-center projects. */
export function MidtermsMap({ lang }: { lang: Locale }) {
  const t = T[lang];
  const ellis = TX_COUNTIES.Ellis;
  return (
    <figure className="adiag mmap" aria-label={t.title}>
      <p className="mmap__title">{t.title}</p>
      <p className="mmap__subtitle">{t.subtitle}</p>
      <div className="mmap__panels">
        <div className="mmap__panel">
          <p className="mmap__panel-title">{t.usTitle}</p>
          <svg viewBox="0 0 975 610" className="mmap__svg" role="img" aria-label={t.usTitle}>
            <defs>
              <pattern id="mmap-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="7" height="7" className="mmap__hatch-bg" />
                <line x1="0" y1="0" x2="0" y2="7" className="mmap__hatch-line" />
              </pattern>
            </defs>
            <path d={US_LAND} className="mmap__land" />
            {LOSSES.map(({ state, loss }) => (
              <path key={state} d={US_STATES[state].d} className={`mmap__state mmap__state--${loss}`} />
            ))}
            <path d={US_BORDERS} className="mmap__borders" />
            {LOSSES.map(({ state, abbr, loss }) => {
              const [x, y] = US_STATES[state].c;
              return (
                <text key={abbr} x={x} y={y + 6} className={`mmap__abbr${loss === "both" ? " mmap__abbr--on-ink" : ""}`}>
                  {abbr}
                </text>
              );
            })}
          </svg>
          <ul className="mmap__legend">
            {(["both", "governor", "senate", "house", "pending"] as Loss[]).map((loss) => (
              <li key={loss}>
                <span className={`mmap__key mmap__key--${loss}`} aria-hidden="true" />
                {t.losses[loss]}
              </li>
            ))}
          </ul>
        </div>
        <div className="mmap__panel mmap__panel--texas">
          <p className="mmap__panel-title">{t.txTitle}</p>
          <svg viewBox={TX_VIEW} className="mmap__svg" role="img" aria-label={t.txTitle}>
            <path d={TEXAS} className="mmap__texas" />
            <path
              d={`M${ellis[0]},${ellis[1] - 4} l4,4 l-4,4 l-4,-4 Z`}
              className="mmap__ellis"
            />
            {PROJECTS.map((p) => {
              const [x, y] = TX_COUNTIES[p.county];
              return (
                <g key={p.county}>
                  <circle cx={x} cy={y} r={radius(p.gw)} className={`mmap__dot mmap__dot--${p.exposure}`} />
                  <text x={x + p.dx} y={y + p.dy} textAnchor={p.anchor} className="mmap__label">
                    {t.decimal(p.name)}
                  </text>
                </g>
              );
            })}
          </svg>
          <ul className="mmap__legend">
            {(["frozen", "audit", "unknown"] as Exposure[]).map((e) => (
              <li key={e}>
                <span className={`mmap__key mmap__key--dot mmap__key--${e}`} aria-hidden="true" />
                {t.exposure[e]}
              </li>
            ))}
            <li>
              <span className="mmap__key mmap__key--ellis" aria-hidden="true" />
              {t.ellis}
            </li>
            <li className="mmap__legend-note">{t.size}</li>
          </ul>
        </div>
      </div>
      <dl className="mmap__stats">
        {t.stats.map((s) => (
          <div key={s.value}>
            <dt>{s.value}</dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="mmap__caption">{t.caption}</figcaption>
    </figure>
  );
}
