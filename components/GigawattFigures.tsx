import { DEAL_KINDS, DEAL_SOURCES, DEALS, SOURCE_STATUS, dealMonth, nodeName, registerRows } from "@/content/deals";
import type { Locale } from "@/lib/i18n";

/** Figures of "The gigawatt and the dollar" that are not the scrolling graph. */

const MACHINE: Record<
  Locale,
  {
    title: string;
    sub: string;
    label: string;
    verbs: [string, string, string];
    google: string[];
    broadcom: string[];
    spv: string[];
    anthropic: string[];
    dc: string[];
    googleGuar: [string, string, string];
    broadcomGuar: [string, string];
    host: string;
    legendFlow: string;
    legendGuar: string;
    caption: string;
  }
> = {
  fr: {
    title: "Google, Broadcom et Wall Street portent les puces d’Anthropic",
    sub: "Environ 200 Md$ de contrats, dont 80 % liés aux puces",
    label: "Chaîne de financement des TPU d’Anthropic : Google vend, Broadcom revend, un véhicule de crédit privé loue à Anthropic ; Google et Broadcom garantissent",
    verbs: ["vend", "revend", "loue"],
    google: ["Google", "conçoit les TPU", "avec Broadcom", "vend 4,5 GW"],
    broadcom: ["Broadcom", "rachète les TPU", "128 Md$ d’achats", "sur 2027-2028"],
    spv: ["Compute SPV", "monté par Morgan Stanley", "dette Apollo, Blackstone", "35 Md$ pour ~1 GW"],
    anthropic: ["Anthropic", "loue les puces", "125,2 Md$ sur 5 ans", "paie les loyers"],
    dc: ["Data centers", "TeraWulf, Cipher,", "Hut 8 : anciens", "mineurs de bitcoin"],
    googleGuar: ["garantit les loyers", "jusqu’à 44 Md$,", "815 M$ au bilan"],
    broadcomGuar: ["garantit ~30 Md$ sur 35", "si Anthropic ne paie pas"],
    host: "hébergent les puces : 2,4 GW sécurisés pour 4,5 GW vendus",
    legendFlow: "flux de puces et de capacité",
    legendGuar: "garantie : le risque reporté sur un tiers",
    caption: "Sources : Financial Times, 4 août 2026 (traductions Expansión et Folha) ; prospectus d’Anthropic, via CNBC, 1er octobre 2026.",
  },
  en: {
    title: "Google, Broadcom and Wall Street carry Anthropic’s chips",
    sub: "About $200bn of contracts, 80% of them tied to the chips",
    label: "Financing chain for Anthropic’s TPUs: Google sells, Broadcom resells, a private credit vehicle leases to Anthropic; Google and Broadcom guarantee",
    verbs: ["sells", "resells", "leases"],
    google: ["Google", "designs the TPUs", "with Broadcom", "sells 4.5 GW"],
    broadcom: ["Broadcom", "buys the TPUs", "$128bn of purchases", "over 2027-2028"],
    spv: ["Compute SPV", "set up by Morgan Stanley", "Apollo, Blackstone debt", "$35bn for ~1 GW"],
    anthropic: ["Anthropic", "leases the chips", "$125.2bn over 5 years", "pays the rent"],
    dc: ["Data centres", "TeraWulf, Cipher,", "Hut 8: former", "bitcoin miners"],
    googleGuar: ["guarantees the leases", "up to $44bn,", "$815M on its books"],
    broadcomGuar: ["guarantees ~$30bn of 35", "if Anthropic does not pay"],
    host: "host the chips: 2.4 GW secured for 4.5 GW sold",
    legendFlow: "flow of chips and capacity",
    legendGuar: "guarantee: the risk shifted onto a third party",
    caption: "Sources: Financial Times, 4 August 2026 (Expansión and Folha translations); Anthropic’s prospectus, via CNBC, 1 October 2026.",
  },
};

function Box({ x, y, lines, accent }: { x: number; y: number; lines: string[]; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width="150" height="88" rx="2" className={accent ? "gmdiag__box gmdiag__box--accent" : "gmdiag__box"} />
      {lines.map((line, i) => (
        <text key={i} x={x + 75} y={y + 24 + i * 16 + (i > 0 ? 2 : 0)} textAnchor="middle" className={i === 0 ? "gmdiag__name" : undefined}>
          {line}
        </text>
      ))}
    </g>
  );
}

/** Google's machine: who sells, resells, leases and guarantees Anthropic's TPUs. */
export function GoogleMachineDiagram({ lang }: { lang: Locale }) {
  const t = MACHINE[lang];
  return (
    <figure className="adiag gmdiag">
      <p className="gmdiag__title">{t.title}</p>
      <p className="gmdiag__sub">{t.sub}</p>
      <div className="gmdiag__scroll">
        <svg viewBox="0 0 760 410" role="img" aria-label={t.label}>
          <defs>
            <marker id="gm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" className="gmdiag__tip" />
            </marker>
            <marker id="gm-guar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" className="gmdiag__tip gmdiag__tip--guar" />
            </marker>
          </defs>
          <g className="gmdiag__flow">
            <path d="M174 120H204" markerEnd="url(#gm-arrow)" />
            <path d="M354 120H384" markerEnd="url(#gm-arrow)" />
            <path d="M534 120H564" markerEnd="url(#gm-arrow)" />
            <path d="M174 300H639V164" markerEnd="url(#gm-arrow)" />
          </g>
          <g className="gmdiag__guar">
            <path d="M99 164V256" markerEnd="url(#gm-guar)" />
            <path d="M279 164V196H459V164" markerEnd="url(#gm-guar)" />
          </g>
          <g className="gmdiag__muted" textAnchor="middle">
            <text x="189" y="66">{t.verbs[0]}</text>
            <text x="369" y="66">{t.verbs[1]}</text>
            <text x="549" y="66">{t.verbs[2]}</text>
          </g>
          <Box x={24} y={76} lines={t.google} />
          <Box x={204} y={76} lines={t.broadcom} />
          <Box x={384} y={76} lines={t.spv} />
          <Box x={564} y={76} lines={t.anthropic} accent />
          <Box x={24} y={256} lines={t.dc} />
          <text x="109" y="206">{t.googleGuar[0]}</text>
          <text x="109" y="222" className="gmdiag__muted">
            {t.googleGuar[1]}
          </text>
          <text x="109" y="238" className="gmdiag__muted">
            {t.googleGuar[2]}
          </text>
          <text x="369" y="216" textAnchor="middle">
            {t.broadcomGuar[0]}
          </text>
          <text x="369" y="232" textAnchor="middle" className="gmdiag__muted">
            {t.broadcomGuar[1]}
          </text>
          <text x="406" y="290" textAnchor="middle" className="gmdiag__muted">
            {t.host}
          </text>
          <g className="gmdiag__muted">
            <line x1="24" y1="386" x2="56" y2="386" className="gmdiag__legend-flow" />
            <text x="64" y="390">{t.legendFlow}</text>
            <line x1="300" y1="386" x2="332" y2="386" className="gmdiag__legend-guar" />
            <text x="340" y="390">{t.legendGuar}</text>
          </g>
        </svg>
      </div>
      <figcaption>{t.caption}</figcaption>
    </figure>
  );
}

const REGISTER_HEAD: Record<Locale, string[]> = {
  fr: ["Date", "De → Vers", "Type", "Montant", "Ce que dit l’accord", "Source"],
  en: ["Date", "From → To", "Type", "Amount", "What the deal says", "Source"],
};

/** Every deal of the graph with its source, newest first. */
export function DealRegister({ lang }: { lang: Locale }) {
  return (
    <div className="article__tablewrap deals-register">
      <table className="article__table">
        <thead>
          <tr>
            {REGISTER_HEAD[lang].map((cell) => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registerRows().map((i) => {
            const deal = DEALS[i];
            const source = DEAL_SOURCES[deal.s];
            return (
              <tr key={i}>
                <td className="deals-register__num">{dealMonth(deal.d, lang)}</td>
                <th>
                  {nodeName(deal.f, lang)} → {nodeName(deal.t, lang)}
                </th>
                <td>
                  <span className={`deals-register__tag deals-register__tag--${deal.k}`}>{DEAL_KINDS[deal.k][lang]}</span>
                </td>
                <td className="deals-register__num">{deal.amt[lang]}</td>
                <td>{deal.txt[lang]}</td>
                <td>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label[lang]}
                    <span className="sr-only">{lang === "fr" ? " (nouvel onglet)" : " (opens in a new tab)"}</span>
                  </a>
                  <span className={`deals-register__status deals-register__status--${source.status}`}>
                    {SOURCE_STATUS[source.status][lang]}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
