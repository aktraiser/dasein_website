import type { Locale } from "@/lib/i18n";
import type { Article } from "./articles";

/**
 * "Le gigawatt et le dollar", the follow-up to "Le mégawatt et le degré" (linked by the
 * "related" card, so not repeated in the sources). The deal graph lives in content/deals.ts.
 */

const SOURCES_FR: Article["sources"] = [
  { label: "Gartner, via The Register, 14 octobre 2026", url: "https://www.theregister.com/on-prem/2026/10/14/the-ai-math-isnt-mathing-as-infrastructure-spending-forecast-to-outstrip-expected-revenue/5302856" },
  { label: "Bain, via The Register, 30 septembre 2026", url: "https://www.theregister.com/ai-and-ml/2026/09/30/ai-market-needs-to-make-6-trillion-a-year-by-2031-to-fund-its-infrastructure-habit/5300175" },
  { label: "OpenAI : 278 Md$ de cash brûlé d’ici 2030 (FT, via Reuters), 19 septembre 2026", url: "https://www.thehindubusinessline.com/info-tech/openai-forecasts-cash-burn-near-280-billion-by-2030/article71483712.ece" },
  { label: "OpenAI : revenu annualisé proche de 50 Md$ (TechCrunch), 8 octobre 2026", url: "https://techcrunch.com/2026/10/08/openais-revenue-is-reportedly-20-billion-less-than-previously-projected/" },
  { label: "Anthropic : 16,8 Md$ au T3 (Motley Fool, d’après le FT), 15 octobre 2026", url: "https://www.fool.com/investing/2026/10/15/anthropic-just-became-the-first-company-in-history-to-reach-this-milestone-here-s-what-it-means-for-ai-stocks/" },
  { label: "Anthropic : rentabilité ajustée (SiliconANGLE), 14 octobre 2026", url: "https://siliconangle.com/2026/10/14/ahead-of-ipo-anthropic-reveals-its-revenue-grow-45-sequentially-to-16-8b-in-q3/" },
  { label: "Anthropic : 518 Md$ d’obligations (projet de prospectus, via Reuters), 30 septembre 2026", url: "https://www.fool.com/investing/2026/09/30/anthropic-plans-to-spend-usd518-billion-on-cloud-and-data-centers-more-than-usd100-billion-is-already-promised-to-amazon/" },
  { label: "Anthropic : levée à 965 Md$ (Motley Fool), 4 septembre 2026", url: "https://www.fool.com/investing/2026/09/04/anthropic-has-already-raised-130-billion-ahead-of/" },
  { label: "Anthropic : valorisation au-delà de 2 000 Md$ (Euronews), 17 septembre 2026", url: "https://www.euronews.com/business/2026/09/17/anthropic-priced-above-2-trillion-as-markets-eagerly-await-ipo-filing" },
  { label: "Anthropic : prévision 2028 (Economic Times), 15 août 2026", url: "https://economictimes.indiatimes.com/markets/us-stocks/news/anthropic-ipo-valuation-hinges-on-190-200-billion-2028-revenue-forecast-sources-say/articleshow/133256367.cms" },
  { label: "Nvidia et les labos qu’il finance (AI News), 27 août 2026", url: "https://www.artificialintelligence-news.com/news/nvidia-circular-financing-ai-labs/" },
  { label: "Inside Google’s $200bn Wall Street finance machine for Anthropic (FT), 4 août 2026", url: "https://www.ft.com/content/549f2e23-5aa2-49c7-9ea6-a9784ab7087c" },
  { label: "Le montage de Google, traduction intégrale du FT (Expansión), 4 août 2026", url: "https://www.expansion.com/economia/financial-times/2026/08/04/6a72017f468aeba62f8b458b.html" },
  { label: "Le montage de Google, traduction intégrale du FT (Folha), 4 août 2026", url: "https://www1.folha.uol.com.br/mercado/2026/08/como-o-google-usou-wall-street-para-bancar-us-200-bi-em-chips-de-ia-para-a-anthropic.shtml" },
  { label: "Broadcom prêtera jusqu’à 42 Md$ à Anthropic, selon le prospectus (CNBC), 1er octobre 2026", url: "https://www.cnbc.com/2026/10/01/broadcom-lending-anthropic-42-billion-chips-reuters.html" },
  { label: "Broadcom : 92 Md$ pour Anthropic et OpenAI (Motley Fool), 13 octobre 2026", url: "https://www.fool.com/investing/2026/10/13/broadcom-is-backing-anthropic-and-openai-with-92-b/" },
  { label: "Prospectus d’introduction en Bourse de SpaceX (formulaire S-1, SEC), 20 mai 2026", url: "https://www.sec.gov/Archives/edgar/data/1181412/000162828026036936/spaceexplorationtechnologi.htm" },
  { label: "Anthropic et SpaceX : accord sur Colossus 1 (CNBC), 6 mai 2026", url: "https://www.cnbc.com/2026/05/06/anthropic-spacex-data-center-capacity.html" },
  { label: "Anthropic loue Colossus 1 à 1,25 Md$ par mois (ActuIA), 21 mai 2026", url: "https://www.actuia.com/actualite/anthropic-loue-colossus-1-a-125-mdmois-sur-un-parc-xai-a-11-de-capacite/" },
  { label: "SpaceX loue Colossus à Anthropic ; Musk pourrait reprendre la capacité (Yahoo Finance), juin 2026", url: "https://finance.yahoo.com/markets/stocks/articles/spacex-rents-colossus-1-data-001018778.html" },
  { label: "Anthropic coupe l’accès de xAI à Claude dans Cursor (Sherwood News), janvier 2026", url: "https://sherwood.news/tech/report-anthropic-cuts-off-xais-access-to-its-models-for-coding/" },
  { label: "Anthropic : jusqu’à 84,5 Md$ d’engagements envers SpaceX (The Information), 29 septembre 2026", url: "https://www.theinformation.com/briefings/anthropic-discloses-84-5-billion-spacex-compute-agreements" },
  { label: "SpaceX double son chiffre d’affaires grâce à Anthropic et Google (TechCrunch), 4 août 2026", url: "https://techcrunch.com/2026/08/04/spacex-doubles-revenues-on-anthropic-and-google-compute-deals-starlink-growth/" },
  { label: "SpaceX, neocloud (The Verge), 4 août 2026", url: "https://www.theverge.com/science/975335/spacex-made-more-money-as-a-neocloud" },
  { label: "OpenAI coupe l’accès de Cursor à ses modèles (CNBC), 29 août 2026", url: "https://www.cnbc.com/2026/08/29/openai-cursor-spacex-model-access.html" },
  { label: "OpenAI : campus de 10 GW en Ohio (SiliconANGLE), 17 août 2026", url: "https://siliconangle.com/2026/08/17/openai-leases-10-gigawatt-ai-data-center-campus-from-softbanks-sb-energy/" },
  { label: "SpaceX : introduction à 135 $ (Motley Fool), 17 juin 2026", url: "https://www.fool.com/investing/2026/06/17/spacex-ipo-priced-at-135-what-it-means-for-investo/" },
  { label: "SpaceX : retour au prix d’introduction (CNBC), 10 août 2026", url: "https://www.cnbc.com/2026/08/10/spacex-spcx-stock-ipo-price.html" },
  { label: "AMD et OpenAI, 6 GW et bons de souscription (Tom’s Hardware), 6 octobre 2025", url: "https://tomshardware.com/tech-industry/openai-and-amd-announce-multibillion-dollar-partnership-amd-to-supply-6-gigawatts-in-chips-openai-could-get-up-to-10-percent-of-amd-shares-in-return" },
  { label: "AMD et Meta, communiqué (formulaire 8-K, SEC), 24 février 2026", url: "https://www.sec.gov/Archives/edgar/data/2488/000000248826000045/pressreleasedatedfebruary2.htm" },
  { label: "AMD investit jusqu’à 5 Md$ dans Anthropic (Bloomberg Law), 22 juillet 2026", url: "https://news.bgov.com/artificial-intelligence/amd-to-invest-up-to-5-billion-in-anthropic-deploy-chips" },
  { label: "Meta loue des TPU à Google (Storyboard18, d’après The Information), 27 février 2026", url: "https://storyboard18.com/digital/meta-signs-multi-billion-dollar-ai-chip-rental-deal-with-google-90907.htm" },
  { label: "Apple et Google, Gemini dans Siri (AppleInsider), 12 janvier 2026", url: "https://appleinsider.com/articles/26/01/12/google-confirms-that-it-wont-get-apple-user-data-in-new-siri-deal" },
  { label: "Apple et Anthropic, négociations pour Siri (AppleInsider, d’après Bloomberg), 30 janvier 2026", url: "https://appleinsider.com/articles/26/01/30/apple-could-have-used-claude-to-power-a-future-siri-but-anthropic-got-greedy" },
  { label: "Google loue 110 000 GPU à SpaceX (DatacenterDynamics), 8 juin 2026", url: "https://www.datacenterdynamics.com/en/news/google-to-pay-920-million-to-spacex-monthly-for-ai-capacity/" },
  { label: "Meta et Nebius, jusqu’à 27 Md$ (DatacenterDynamics), 16 mars 2026", url: "https://www.datacenterdynamics.com/en/news/nebius-secures-up-to-27bn-ai-infrastructure-contract-from-meta/" },
  { label: "Meta et CoreWeave, 21 Md$ de plus (The Next Web), 9 avril 2026", url: "https://thenextweb.com/news/meta-coreweave-21-billion-ai-cloud-deal" },
  { label: "Meta va revendre ses capacités (CNBC), 1er juillet 2026", url: "https://www.cnbc.com/2026/07/01/meta-stock-cloud-ai-compute.html" },
  { label: "CoreWeave et OpenAI, 22,4 Md$ en 2025 (Verdict), 26 septembre 2025", url: "https://www.verdict.co.uk/coreweave-openai-contract-worth-up-to-6-5bn/" },
  { label: "Nvidia investit 2 Md$ dans CoreWeave (Computing), 27 janvier 2026", url: "https://www.computing.co.uk/news/2026/nvidia-invests-2-billion-in-coreweave" },
  { label: "CoreWeave et Anthropic (Pure AI), 13 avril 2026", url: "https://pureai.com/articles/2026/04/13/coreweave-and-anthropic-sign-multi-year-deal.aspx" },
  { label: "Microsoft et Nebius, 17,4 Md$ (DatacenterDynamics), 9 septembre 2025", url: "https://datacenterdynamics.com/en/news/microsoft-to-use-nebius-gpu-data-centers-in-deal-worth-174bn-over-five-years" },
  { label: "Le prêt relais de 40 Md$ de SoftBank pour OpenAI (Japan Times, d’après Bloomberg), 27 juillet 2026", url: "https://www.japantimes.co.jp/business/2026/07/27/companies/softbank-openai-stake-new-lenders/" },
  { label: "Oracle pourrait emprunter 100 Md$ pour OpenAI (DatacenterDynamics), 30 septembre 2025", url: "https://www.datacenterdynamics.com/en/news/oracle-may-need-to-borrow-100bn-for-openai-efforts-says-keybanc-capital-markets/" },
  { label: "La Finlande suspend deux chantiers de Google (Al Jazeera), 7 octobre 2026", url: "https://www.aljazeera.com/news/2026/10/7/finland-orders-halt-to-work-on-google-data-sites-over-environment-concerns" },
  { label: "Muhos et Kajaani : l’ordre de suspension et l’enquête de police (Yle), 8 octobre 2026", url: "https://yle.fi/a/74-20250446" },
  { label: "CoreWeave : obligations près de 15 % (CNBC), 14 octobre 2026", url: "https://www.cnbc.com/2026/10/14/coreweave-stock-bond-yields-ai-debt.html" },
  { label: "Les banques cherchent à se défaire de la dette des data centers (Startup Fortune, d’après le FT et Bloomberg), 14 octobre 2026", url: "https://startupfortune.com/banks-are-now-trying-to-offload-the-ai-data-center-debt-they-just-underwrote/" },
  { label: "OpenAI cherche 30 Md$ à 1 400 Md$ ; revenus nets et bruts ; SB Energy (Reuters, via Hindu BusinessLine), 20 octobre 2026", url: "https://www.thehindubusinessline.com/info-tech/openai-seeks-30-billion-funding-at-14-trillion-valuation-ahead-of-anthropic-ipo/article71603118.ece" },
  { label: "Le risque de crédit de SoftBank au plus haut depuis quatre ans (Bloomberg, titre), 20 octobre 2026", url: "https://www.bloomberg.com/news/articles/2026-10-20/softbank-group-credit-risk-hits-4-year-high-on-ai-funding-strain" },
  { label: "Microsoft se retire du data center de Nscale à Loughton (The Guardian), 18 octobre 2026", url: "https://www.theguardian.com/uk-news/2026/oct/18/microsoft-drops-huge-ai-datacentre-project-in-essex-over-power-supply-concerns" },
  { label: "Nscale : pertes et projet d’introduction (City AM), 19 octobre 2026", url: "https://www.cityam.com/microsoft-pulls-out-of-nscale-deal-for-uks-largest-ai-data-centre/" },
  { label: "Nscale et Anthropic : un nouveau contrat de 45 Md$ en discussion (TechCrunch, d’après Bloomberg), 19 octobre 2026", url: "https://techcrunch.com/2026/10/19/nscale-and-anthropic-are-reportedly-in-talks-for-yet-another-45-billion-compute-deal/" },
];

// Same sources, labels in English (the URLs and their order are shared).
const SOURCE_LABELS_EN = [
  "Gartner, via The Register, 14 October 2026",
  "Bain, via The Register, 30 September 2026",
  "OpenAI: $278bn of cash burn by 2030 (FT, via Reuters), 19 September 2026",
  "OpenAI: annualised revenue close to $50bn (TechCrunch), 8 October 2026",
  "Anthropic: $16.8bn in Q3 (Motley Fool, citing the FT), 15 October 2026",
  "Anthropic: adjusted profitability (SiliconANGLE), 14 October 2026",
  "Anthropic: $518bn of obligations (draft prospectus, via Reuters), 30 September 2026",
  "Anthropic: funding round at $965bn (Motley Fool), 4 September 2026",
  "Anthropic: valuation above $2 trillion (Euronews), 17 September 2026",
  "Anthropic: 2028 forecast (Economic Times), 15 August 2026",
  "Nvidia and the labs it funds (AI News), 27 August 2026",
  "Inside Google’s $200bn Wall Street finance machine for Anthropic (FT), 4 August 2026",
  "Google’s set-up, full translation of the FT (Expansión), 4 August 2026",
  "Google’s set-up, full translation of the FT (Folha), 4 August 2026",
  "Broadcom to lend Anthropic up to $42bn, according to the prospectus (CNBC), 1 October 2026",
  "Broadcom: $92bn for Anthropic and OpenAI (Motley Fool), 13 October 2026",
  "SpaceX IPO prospectus (Form S-1, SEC), 20 May 2026",
  "Anthropic and SpaceX: the Colossus 1 deal (CNBC), 6 May 2026",
  "Anthropic leases Colossus 1 for $1.25bn a month (ActuIA), 21 May 2026",
  "SpaceX leases Colossus to Anthropic; Musk could take the capacity back (Yahoo Finance), June 2026",
  "Anthropic cuts off xAI’s access to Claude in Cursor (Sherwood News), January 2026",
  "Anthropic: up to $84.5bn of commitments to SpaceX (The Information), 29 September 2026",
  "SpaceX doubles revenue on Anthropic and Google compute deals (TechCrunch), 4 August 2026",
  "SpaceX, neocloud (The Verge), 4 August 2026",
  "OpenAI cuts off Cursor’s access to its models (CNBC), 29 August 2026",
  "OpenAI: 10 GW campus in Ohio (SiliconANGLE), 17 August 2026",
  "SpaceX: IPO at $135 (Motley Fool), 17 June 2026",
  "SpaceX: back to its IPO price (CNBC), 10 August 2026",
  "AMD and OpenAI, 6 GW and warrants (Tom’s Hardware), 6 October 2025",
  "AMD and Meta, press release (Form 8-K, SEC), 24 February 2026",
  "AMD to invest up to $5bn in Anthropic (Bloomberg Law), 22 July 2026",
  "Meta rents TPUs from Google (Storyboard18, citing The Information), 27 February 2026",
  "Apple and Google, Gemini in Siri (AppleInsider), 12 January 2026",
  "Apple and Anthropic, Siri negotiations (AppleInsider, citing Bloomberg), 30 January 2026",
  "Google rents 110,000 GPUs from SpaceX (DatacenterDynamics), 8 June 2026",
  "Meta and Nebius, up to $27bn (DatacenterDynamics), 16 March 2026",
  "Meta and CoreWeave, $21bn more (The Next Web), 9 April 2026",
  "Meta to resell its capacity (CNBC), 1 July 2026",
  "CoreWeave and OpenAI, $22.4bn in 2025 (Verdict), 26 September 2025",
  "Nvidia invests $2bn in CoreWeave (Computing), 27 January 2026",
  "CoreWeave and Anthropic (Pure AI), 13 April 2026",
  "Microsoft and Nebius, $17.4bn (DatacenterDynamics), 9 September 2025",
  "SoftBank’s $40bn bridge loan for OpenAI (Japan Times, citing Bloomberg), 27 July 2026",
  "Oracle may need to borrow $100bn for OpenAI (DatacenterDynamics), 30 September 2025",
  "Finland halts two Google sites (Al Jazeera), 7 October 2026",
  "Muhos and Kajaani: the halt order and the police inquiry (Yle), 8 October 2026",
  "CoreWeave: bonds near 15% (CNBC), 14 October 2026",
  "Banks try to offload data centre debt (Startup Fortune, citing the FT and Bloomberg), 14 October 2026",
  "OpenAI seeks $30bn at $1.4tn; net and gross revenue; SB Energy (Reuters, via Hindu BusinessLine), 20 October 2026",
  "SoftBank’s credit risk at a four-year high (Bloomberg, headline), 20 October 2026",
  "Microsoft pulls out of Nscale’s Loughton data centre (The Guardian), 18 October 2026",
  "Nscale: losses and IPO plans (City AM), 19 October 2026",
  "Nscale and Anthropic: a new $45bn contract under discussion (TechCrunch, citing Bloomberg), 19 October 2026",
];

const SOURCES_EN: Article["sources"] = SOURCES_FR.map((source, i) => ({ label: SOURCE_LABELS_EN[i], url: source.url }));

export const gigawattArticle: Record<Locale, Article> = {
  fr: {
    title: "Le gigawatt et le dollar",
    lead: "L’écart de vitesse entre l’IA et le réseau existe aussi en dollars, et il est comblé de la même façon : avec l’argent des autres.",
    updated: "Publié le 20 octobre 2026",
    summaryLabel: "En bref",
    summary: [
      "En 2026, l’infrastructure IA absorbe environ 1 000 milliards de dollars, quand OpenAI et Anthropic réunis affichent environ 117 milliards de revenus annualisés : à peu près un dollar de revenu pour huit à neuf dollars investis.",
      "L’écart entre gigawatts annoncés et gigawatts en service, le poids du financement par les fournisseurs et l’écart entre valorisations privées et prix d’introduction mesurent tous la même chose : la distance entre une promesse et un actif qui produit.",
      "Nous proposons quatre indicateurs, chiffrés et datés, pour suivre cet écart.",
    ],
    blocks: [
      {
        type: "stats",
        items: [
          { value: "~1 000 Md$", label: "investis dans l’infrastructure IA en 2026, selon Gartner" },
          { value: "~117 Md$", label: "de revenus annualisés pour OpenAI et Anthropic réunis" },
        ],
      },
      {
        type: "related",
        href: "/articles/le-megawatt-et-le-degre",
        label: "Cet article fait suite à",
        title: "Le mégawatt et le degré",
        text: "Pourquoi le vrai danger n’est pas la vitesse de l’IA, mais l’écart entre sa vitesse et celle du réseau.",
      },
      { type: "h", id: "ecart", text: "De l’écart physique à l’écart financier" },
      {
        type: "p",
        text: "Dans « Le mégawatt et le degré », nous avons défendu une thèse : le danger n’est pas la vitesse de l’IA, mais l’écart entre la vitesse à laquelle elle appelle de la puissance et celle à laquelle un réseau peut répondre. Nous y avions laissé un contre-argument en réserve. Si le pipeline des data centers se dégonfle, le danger sera financier avant d’être physique.",
      },
      {
        type: "p",
        text: "Trois semaines plus tard, ce contre-argument est devenu le scénario central. Le 8 octobre, OpenAI a dit à ses investisseurs que son revenu annualisé approchait 50 milliards de dollars, et non 70. Le 14, Gartner a chiffré à plus de 4 000 milliards les dépréciations possibles d’ici 2032. Le 15, Anthropic a annoncé 16,8 milliards de revenu trimestriel et une première rentabilité ajustée, quelques semaines avant une introduction en Bourse visée à environ 2 000 milliards.",
      },
      {
        type: "p",
        text: "Le marché va donc très bien et très mal à la fois. Pour sortir de cette contradiction, nous proposons de suivre quatre indicateurs, comme on suit une file d’attente de raccordement : le ratio capex / revenus, l’écart entre gigawatts annoncés et en service, la part du financement fournisseur, et l’écart entre valorisation privée et prix d’introduction.",
      },

      { type: "h", id: "ratio", text: "1. Le ratio capex / revenus" },
      {
        type: "p",
        text: "En 2026, le secteur investit environ 8,5 dollars dans l’infrastructure pour chaque dollar de revenu que génèrent ses deux principaux labos. C’est le premier indicateur, et le plus brutal.",
      },
      {
        type: "table",
        head: ["Périmètre", "Investissement", "Revenus", "Ratio", "Source"],
        rows: [
          ["Secteur, 2026", "~1 000 Md$ d’infrastructure IA", "~117 Md$ annualisés (OpenAI ~50 + Anthropic ~67)", "~8,5", "Gartner via The Register, TechCrunch"],
          ["OpenAI, 2026-2030", "856 Md$ de calcul et d’infrastructure", "840 Md$ cumulés (hypothèse : ×10 en cinq ans)", "~1,0", "FT via Reuters"],
          ["Anthropic, horizon non précisé", "518 Md$ d’obligations cloud et infrastructure", "~67 Md$ annualisés", "~7,7 années de revenu actuel", "Projet de prospectus via Reuters"],
          ["Secteur, 2027-2030", "revenus nécessaires pour 12 % de ROIC : 8 500 Md$", "revenus attendus : 3 600 Md$", "~2,4", "Gartner via The Register"],
        ],
      },
      { type: "p", text: "Trois lectures s’imposent." },
      {
        type: "p",
        text: "D’abord, le ratio d’OpenAI est le plus parlant parce qu’il vient de sa propre présentation. Même dans son scénario central, ses revenus cumulés ne couvrent pas sa seule facture de calcul, avant salaires et R&D. D’où les 278 milliards de free cash flow négatif qu’il projette.",
      },
      {
        type: "p",
        text: "Ensuite, le ratio sectoriel surestime l’écart. Une partie des revenus de l’IA se loge ailleurs (le cloud des hyperscalers, les licences logicielles, la publicité), et un data center s’amortit sur plusieurs années. Mais même divisé par deux, il reste au-dessus de quatre.",
      },
      {
        type: "p",
        text: "Enfin, les chiffres des deux labos ne se comparent pas directement. Anthropic compte dans son revenu annualisé les ventes faites par ses partenaires cloud ; OpenAI non, et l’accuse de gonfler ainsi ses revenus. Anthropic répond suivre les pratiques comptables établies (Reuters, via Hindu BusinessLine). En additionnant les deux, notre ratio donne donc un ordre de grandeur, pas une mesure exacte. Et la rentabilité « ajustée » d’Anthropic au troisième trimestre n’est pas un résultat net audité.",
      },
      {
        type: "box",
        title: "Ce que nous suivrons",
        text: "Le ratio capex / revenus du secteur, recalculé à chaque publication trimestrielle. Il devra baisser franchement en 2027 pour que l’écart se referme.",
      },

      { type: "h", id: "gigawatts", text: "2. L’écart entre gigawatts annoncés et gigawatts en service" },
      {
        type: "p",
        text: "Un gigawatt annoncé n’est pas un actif : c’est une option. Mi-2026, OpenAI n’avait que 0,3 GW en service sur plus de 9 GW annoncés pour Stargate, soit environ 3 %.",
      },
      {
        type: "bars",
        title: "Chez OpenAI et Anthropic, moins d’un gigawatt annoncé sur dix est en service",
        subtitle: "Part de la capacité annoncée réellement en service, mi-2026",
        items: [
          { name: "Production hors réseau (US)", value: 2.2, label: "2 % · 2 / 90 GW" },
          { name: "OpenAI (Stargate)", value: 3.3, label: "3 % · 0,3 / 9 GW", highlight: true },
          { name: "Anthropic", value: 9.3, label: "9 % · 1,4 / 15 GW", highlight: true },
          { name: "Data centers nord-américains", value: 19.2, label: "19 % · 39 / 203 GW" },
          { name: "xAI (Colossus)", value: 50, label: "50 % · 1 / 2 GW" },
        ],
        caption: "Sources : Epoch AI (Stargate, avril 2026), MeasuredAI (Anthropic, août 2026), Wikipédia et Cleanview (xAI, production hors réseau), Sightline Climate (mai 2026), repris de « Le mégawatt et le degré ». Anthropic loue l’essentiel de sa capacité.",
      },
      {
        type: "p",
        text: "Cet indicateur relie directement les deux articles. Dans le premier, nous citions Sightline : une annonce de data center est une demande d’électricité, pas un engagement de construire. Ici, elle est aussi une demande de financement. Et les annonces continuent de gonfler plus vite que le béton. En août, OpenAI a signé un bail de 20 ans pour un campus de 10 GW en Ohio, développé par SB Energy, la filiale de SoftBank (SiliconANGLE). Nvidia chiffre de son côté à environ 12 GW les engagements existants et prévus d’OpenAI sur ses puces jusqu’en 2030 (AI News).",
      },
      {
        type: "p",
        text: "Une annonce peut aussi buter sur un permis. Le 7 octobre, l’autorité environnementale finlandaise a ordonné à Google de suspendre les travaux préparatoires de deux data centers, à Muhos et à Kajaani : sa filiale avait commencé à défricher sans l’étude d’impact obligatoire, sur plus de 300 hectares de forêt selon l’Association finlandaise pour la protection de la nature. Ces sites font partie des 13 milliards d’euros annoncés en septembre, le plus gros investissement de Google en Europe. Ils restent à l’arrêt jusqu’à la fin des études, et la police a ouvert une enquête préliminaire sur Muhos (Al Jazeera, Yle).",
      },
      {
        type: "p",
        text: "Ou sur le réseau. Le 18 octobre, Microsoft s’est retiré du data center que Nscale prévoyait à Loughton, dans l’Essex, présenté par le gouvernement britannique comme le plus grand du pays, en invoquant l’alimentation électrique (The Guardian, City AM). Nscale, qui a perdu 1 milliard au premier semestre pour 141 millions de revenus, négocie pourtant un deuxième contrat de 45 milliards avec Anthropic, selon Bloomberg (TechCrunch).",
      },
      {
        type: "p",
        text: "L’écart compte pour deux raisons. Côté physique, chaque gigawatt annoncé entre dans une file de raccordement et pèse sur les enchères de capacité, même s’il ne se construit jamais. Côté financier, les valorisations sont calculées sur la capacité promise, alors que les revenus viennent de la capacité installée.",
      },
      {
        type: "p",
        text: "Le cas de xAI montre l’autre face : 50 % de sa capacité annoncée est en service, mais au prix d’une centrale à gaz privée de 1,2 GW. L’écart se ferme vite seulement quand on contourne le réseau.",
      },
      {
        type: "box",
        title: "Ce que nous suivrons",
        text: "La part des gigawatts annoncés réellement en service, par acteur, à chaque point d’étape. Si elle dépasse 30 % chez OpenAI et Anthropic fin 2027, l’écart se referme.",
      },

      { type: "h", id: "fournisseurs", text: "3. La part du financement par les fournisseurs" },
      {
        type: "p",
        text: "Environ un quart de l’activité de Nvidia l’an prochain viendra de labos qu’il finance lui-même : c’est sa directrice financière qui l’a dit aux analystes le 26 août (AI News).",
      },
      {
        type: "p",
        text: "Le mécanisme est simple. Le fournisseur investit dans un labo, ou garantit son crédit. Le labo construit un data center rempli des puces du fournisseur. L’achat devient du chiffre d’affaires pour le fournisseur, qui réinvestit. Nvidia emploie lui-même l’expression de financement circulaire, pour la contester.",
      },
      {
        type: "table",
        head: ["Fournisseur", "Engagement", "Forme", "Statut", "Source"],
        rows: [
          ["Nvidia", "~50 Md$ déjà investis dans les labos", "prises de participation", "réalisé", "AI News"],
          ["Nvidia", "plus de 500 Md$ de capitaux tiers (Apollo, BlackRock, Blackstone, Brookfield, Goldman Sachs, KKR)", "plateformes de financement", "sous réserve d’accords définitifs", "AI News"],
          ["Nvidia", "location garantie d’une partie de la capacité de neoclouds", "plancher de revenus pour leurs prêteurs", "en place", "AI News"],
          ["Broadcom", "42 Md$ de dette senior pour Anthropic, plus 18 Md$ de dette junior", "dette garantie par Broadcom et la valeur résiduelle des puces", "junior conditionnée à la publication des comptes", "Motley Fool"],
          ["Broadcom", "jusqu’à 50 Md$ pour OpenAI", "financement d’achats de puces sur mesure", "en discussion", "Motley Fool"],
        ],
      },
      { type: "h3", text: "Le cas d’école : la machine à 200 milliards de Google" },
      {
        type: "p",
        text: "Le montage le plus abouti n’est pas celui de Nvidia. C’est celui que Google a construit autour d’Anthropic, révélé par le Financial Times le 4 août : environ 200 milliards de dollars de contrats, dont 80 % liés aux puces elles-mêmes, pour fournir plus de 150 milliards de TPU au labo (FT, traduit par Expansión).",
      },
      {
        type: "p",
        text: "Le problème de départ est simple : personne ne voulait porter des dizaines de milliards de puces dans son bilan. Google finance déjà des capex record. Broadcom accepte de racheter le matériel, mais ne veut pas devenir un financier. La solution reprend le modèle que Boeing et GE ont inventé pour vendre avions et moteurs.",
      },
      { type: "diagram", variant: "google-machine" },
      {
        type: "p",
        text: "Chaque acteur porte un morceau du risque : Google les data centers, Broadcom les puces, le crédit privé le financement. Anthropic, lui, ne porte que des loyers.",
      },
      {
        type: "p",
        text: "Le premier lot est passé dans la machine en juin. Un véhicule ad hoc, Compute SPV, monté par Morgan Stanley, a payé 35 milliards pour environ 1 GW de matériel, soit près d’un million de TPU. L’argent vient de trois tranches de dette portées par Apollo et Blackstone. Broadcom garantit les deux tranches supérieures, à hauteur d’environ 30 milliards : si Anthropic cesse de payer et que les puces se revendent mal, c’est Broadcom qui comble le trou.",
      },
      {
        type: "p",
        text: "Le deuxième lot est bien plus gros. En avril, Google a accepté de vendre 3,5 GW de TPU supplémentaires à Broadcom pour Anthropic. Dans ses documents, Broadcom affiche 128 milliards d’engagements d’achat : 55,2 milliards de livraisons sur son exercice 2027, 72,9 milliards sur 2028. Le prospectus d’Anthropic, de son côté, mentionne un engagement de 125,2 milliards sur cinq ans pour louer cette capacité TPU, dont environ un tiers pourrait être financé par un prêt convertible de Broadcom allant jusqu’à 42 milliards (CNBC).",
      },
      { type: "p", text: "Cinq détails rendent ce montage remarquable." },
      {
        type: "defs",
        items: [
          {
            term: "Il explique la carte du premier article.",
            text: "Nous y relevions qu’Anthropic louait d’anciennes fermes de bitcoin (TeraWulf, Cipher, Hut 8) sans comprendre pourquoi. Le FT donne la réponse : c’est Google qui garantit leurs loyers. TeraWulf a été la première, pour un data center de 360 MW dans l’État de New York ; Morgan Stanley a transformé cette garantie en obligation de construction de 3,2 milliards. En échange, Google a reçu des bons de souscription au capital de TeraWulf.",
          },
          {
            term: "Le risque est presque invisible au bilan.",
            text: "Les garanties de Google sur 10 projets (2,4 GW) l’engagent à payer jusqu’à 44 milliards si tous les loyers font défaut. Il les comptabilise pour 815 millions, soit environ 54 fois moins.",
          },
          {
            term: "L’écart du deuxième indicateur réapparaît à l’intérieur même du montage.",
            text: "Google s’est engagé à vendre 4,5 GW de TPU, mais n’a sécurisé que 2,4 GW de data centers pour les accueillir. Un cadre de Google dit au FT que l’équipe passe désormais tout son temps sur l’énergie. Le mégawatt rattrape le dollar.",
          },
          {
            term: "La garantie crée un avantage de coût du capital.",
            text: "Les projets adossés à Google ont emprunté à 7,1 % en moyenne, contre 9,3 % pour les neoclouds construits autour de Nvidia. Jefferies parle d’un désavantage structurel pour l’écosystème Nvidia. Le bilan d’un hyperscaler devient une arme commerciale, comme l’était l’accès au réseau dans le premier article.",
          },
          {
            term: "Le risque est énorme, mais concentré sur un seul client.",
            text: "Les 200 milliards dépendent de la capacité d’Anthropic à payer ses loyers. Le prospectus précise qu’un défaut de paiement pourrait rendre immédiatement exigible une grande partie des engagements de location. Anthropic deviendra en 2027 le premier client de Broadcom, qui vise 115 milliards de revenus IA cette année-là et 230 milliards en 2028.",
          },
        ],
      },
      {
        type: "p",
        text: "Un associé de Rothschild & Co résume le problème auprès de CNBC : le marché fait un pari très concentré sur la capacité de deux entreprises à générer assez de revenus pour rembourser tout ce qui a été financé. Google est à la fois investisseur d’Anthropic, fournisseur de ses puces et garant de ses data centers. Si le client paie, chacun encaisse trois fois. S’il ne paie pas, chacun perd trois fois.",
      },
      {
        type: "p",
        text: "Le point faible tient dans un mot : la garantie. Nvidia défend son exposition en expliquant qu’une puce saisie peut être revendue à un autre client. La dette Broadcom repose en partie sur la valeur résiduelle des puces. Les deux arguments tiennent tant que la demande dépasse l’offre. Ils cèdent ensemble le jour où elle ne la dépasse plus, puisque c’est précisément ce jour-là que la valeur résiduelle s’effondre.",
      },
      {
        type: "p",
        text: "C’est l’équivalent financier de la troisième voie du premier article. L’écart physique était comblé en envoyant la facture aux ménages ; l’écart financier est comblé en reportant le risque sur le fournisseur, puis sur ses prêteurs. Dans les deux cas, celui qui paie n’est pas celui qui décide.",
      },
      {
        type: "box",
        title: "Ce que nous suivrons",
        text: "La part du chiffre d’affaires de Nvidia et de Broadcom liée à des clients qu’ils financent ou garantissent. Si elle dépasse 30 % chez Nvidia, le cycle dépend de lui-même.",
      },

      { type: "h", id: "introduction", text: "4. Le prix d’introduction face aux valorisations privées" },
      {
        type: "p",
        text: "Anthropic vise une introduction autour de 2 000 milliards de dollars, soit plus du double de sa dernière valorisation privée de 965 milliards, fixée au printemps. L’introduction en Bourse est le moment où le marché public dit s’il paie la même promesse que les investisseurs privés.",
      },
      {
        type: "table",
        head: ["Entreprise", "Dernière valorisation privée", "Valorisation visée", "Prime", "Multiple du revenu annualisé"],
        rows: [
          ["Anthropic", "965 Md$ (levée de 65 Md$, printemps 2026)", "~2 000 Md$, introduction visée en novembre", "×2,1", "~30× (67 Md$)"],
          ["OpenAI", "852 Md$ (levée de 122 Md$, mars 2026)", "~1 200 Md$ en discussion, introduction repoussée à 2027", "×1,4", "~24× (~50 Md$)"],
        ],
        caption: "Sources : Motley Fool, Euronews, FT via Reuters, TechCrunch.",
      },
      {
        type: "p",
        text: "Ces multiples ne se justifient que par la croissance à venir. La valorisation d’Anthropic repose sur une prévision de 190 à 200 milliards de revenus en 2028 (Economic Times). Celle d’OpenAI, sur un revenu multiplié par dix d’ici 2030. Le prix d’introduction mesure donc la confiance du marché dans la fermeture de l’écart décrit aux indicateurs 1 et 2.",
      },
      {
        type: "p",
        text: "Il existe déjà un précédent cette année. SpaceX, qui intègre désormais xAI, s’est introduit en juin à 135 dollars par action, pour une valorisation d’environ 1 770 milliards (Motley Fool). L’action a gagné 19 % le premier jour, puis est tombée jusqu’à 108,27 dollars en juillet, environ 20 % sous son prix d’introduction. Elle n’est repassée au-dessus que le 10 août, après un trimestre meilleur que prévu (CNBC). Entre-temps, la fin de la première période de blocage a libéré 911 millions d’actions, plus que les 639 millions vendues lors de l’introduction.",
      },
      {
        type: "p",
        text: "Le premier test public d’une valorisation géante liée à l’IA a donc montré deux choses : le marché suit au départ, puis il redemande des preuves trimestre après trimestre.",
      },
      {
        type: "box",
        title: "Ce que nous suivrons",
        text: "L’écart entre le prix d’introduction d’Anthropic, puis d’OpenAI, et leur dernière valorisation privée, ainsi que le cours six mois après. Une action durablement sous son prix d’introduction serait le signal que le marché public refuse de financer l’écart.",
      },

      { type: "h", id: "boucle", text: "La boucle : quatre indicateurs, une seule question" },
      {
        type: "p",
        text: "Les quatre indicateurs mesurent la même distance, celle entre une promesse et un actif qui produit du revenu. Ils se tiennent les uns les autres.",
      },
      {
        type: "p",
        text: "Le ratio capex / revenus est élevé parce que les investissements anticipent une capacité qui n’existe pas encore. Cette capacité reste en partie théorique, ce que montre l’écart entre gigawatts annoncés et en service. Elle est financée en partie par les fournisseurs, dont la garantie dépend de la valeur des puces. Et la valeur des puces dépend d’une demande que l’introduction en Bourse doit justifier. Si un maillon cède, les trois autres se resserrent en même temps.",
      },
      {
        type: "p",
        text: "Le premier article opposait deux horloges, celle de l’IA en jours et celle du réseau en années. La finance en ajoute une troisième, qui tombe entre les deux :",
      },
      {
        type: "defs",
        items: [
          { term: "Les puces", text: "s’amortissent en 2 à 4 ans." },
          { term: "Le cash d’OpenAI", text: "levé en mars, serait épuisé d’ici 2028." },
          { term: "Les revenus", text: "qui justifient les valorisations sont attendus pour 2028 (Anthropic) et 2030 (OpenAI)." },
          { term: "Le réseau", text: "demande environ 5 ans entre une demande de raccordement et sa mise en service." },
        ],
      },
      {
        type: "p",
        text: "Une puce peut donc être obsolète avant que le réseau ait livré les mégawatts qui l’alimentent, et avant que les revenus aient remboursé son prix. C’est le mécanisme des dépréciations que décrit Gartner.",
      },
      {
        type: "p",
        text: "Cette horloge financière accélère. Le rendement des obligations américaines à 10 ans a atteint 5,30 % en octobre, un record depuis 2002 : emprunter pour construire coûte plus cher. L’assurance contre un défaut d’Oracle est revenue à son prix de 2009. Et les banques qui ont financé les data centers cherchent à transférer une partie de ces prêts à d’autres investisseurs, parce qu’elles approchent de leurs plafonds d’exposition à l’IA : un prêt de construction de 38 milliards, pour des sites loués à Oracle, ne trouve pas preneur depuis six mois (Startup Fortune, d’après le FT et Bloomberg).",
      },
      {
        type: "p",
        text: "Reste la question qui reliait déjà le premier article : qui porte le risque ? Ce ne sont pas les labos seuls. Anthropic, qui ne possède ni bâtiment ni sous-station, a reporté l’essentiel de ses actifs sur AWS, Google, d’anciennes fermes de bitcoin et désormais la dette Broadcom. OpenAI l’a reporté sur Oracle, SoftBank et Nvidia. Gartner estime que 80 % des neoclouds ne survivront pas en indépendants après 2030. Dans les deux articles, l’écart est comblé par ceux qui n’ont pas pris la décision.",
      },
      { type: "deals" },
      {
        type: "p",
        text: "Tous les acteurs sont à la fois fournisseurs, clients, créanciers ou garants les uns des autres. SpaceX est le cas extrême : bailleur d’Anthropic, client d’Anthropic via Cursor, et concurrent sur le code.",
      },
      { type: "h3", text: "OpenAI : le risque porté par Oracle et SoftBank" },
      {
        type: "p",
        text: "Le cas d’OpenAI est moins sophistiqué, mais plus concentré. OpenAI construit peu lui-même : il s’engage, et d’autres empruntent. Oracle a signé avec lui un contrat de cloud évalué à 300 milliards sur cinq ans à partir de 2027. Selon KeyBanc, Oracle pourrait devoir emprunter jusqu’à 100 milliards en quatre ans pour le servir, alors que sa dette à long terme atteignait déjà 82,2 milliards fin août 2025 (DatacenterDynamics).",
      },
      {
        type: "p",
        text: "SoftBank est l’autre bilan exposé, et il s’expose à crédit. Ses engagements envers OpenAI dépassent 60 milliards. Pour les tenir, il a signé en mars un prêt relais de 40 milliards sur douze mois, à environ 6,14 % d’intérêt, l’un des plus gros jamais montés en Asie-Pacifique ; selon Bloomberg, certains banquiers s’inquiétaient de son exposition à OpenAI (Japan Times). Sa filiale SB Energy développe en plus le campus de 10 GW de l’Ohio loué par OpenAI, dont Nvidia garantit le financement jusqu’à 105 milliards.",
      },
      {
        type: "p",
        text: "La boucle est complète : SoftBank emprunte pour investir dans OpenAI, qui lui loue ensuite un campus. Si les revenus d’OpenAI déçoivent, la valeur de la participation et les loyers baissent en même temps, alors que le prêt, lui, reste dû.",
      },
      {
        type: "p",
        text: "Ce maillon montre déjà des signes de tension. SB Energy a retiré ou suspendu son introduction en Bourse (Reuters, via Hindu BusinessLine), et Bloomberg titrait le 20 octobre sur un risque de crédit de SoftBank au plus haut depuis quatre ans (Bloomberg). Dans le même temps, OpenAI cherche à lever environ 30 milliards à plus de 1 400 milliards de valorisation, avec SoftBank parmi les participants pressentis, avant que les comptes d’Anthropic ne deviennent publics.",
      },
      {
        type: "p",
        text: "S’y ajoutent environ 22,4 milliards de contrats avec CoreWeave, 6 GW de puces AMD et 250 milliards promis à Microsoft. OpenAI construit peu ; Oracle et SoftBank empruntent pour lui.",
      },

      { type: "h", id: "conclusion", text: "Conclusion : quand le béton prend du retard, c’est la dette qui attend" },
      {
        type: "p",
        text: "Le premier article mesurait un écart physique : l’IA promet des gigawatts que le réseau mettra des années à livrer. Celui-ci mesure son double financier : le marché paie aujourd’hui une capacité qui n’existera que demain. Les dépenses du secteur représentent environ huit fois et demie ses revenus. Chez OpenAI et Anthropic, moins d’un gigawatt annoncé sur dix est en service. Et une part croissante de l’argent qui circule entre les labos, leurs fournisseurs et leurs financeurs revient à son point de départ.",
      },
      {
        type: "p",
        text: "Ces chiffres ne disent pas que l’IA ne vaut rien. Les revenus sont réels et montent vite. Ils disent que trois horloges ne tournent pas à la même vitesse : la dette arrive à échéance avant les revenus, et les puces sont amorties avant que le réseau ne les alimente. Ils disent aussi que ceux qui promettent ne sont pas ceux qui paieront si le calendrier glisse. Les labos louent ; Oracle, SoftBank, CoreWeave et les banques empruntent ; et au bout de la chaîne, ce sont les investisseurs des introductions en Bourse qui achèteront la promesse.",
      },
      {
        type: "p",
        text: "En octobre, les premiers signes sont apparus là où nous les attendions. Les maillons les plus endettés ont cédé les premiers, le crédit a renchéri, et deux chantiers se sont arrêtés en Europe, l’un sur un permis, l’autre sur le réseau. Ce n’est pas une rupture. C’est la preuve que les deux écarts n’en font qu’un : quand le béton prend du retard, c’est la dette qui attend.",
      },
      { type: "h3", text: "Ouverture : le test de novembre, et la question européenne" },
      {
        type: "p",
        text: "L’introduction en Bourse d’Anthropic, attendue à la mi-novembre, sera le premier vrai test. Pour la première fois, un grand laboratoire publiera des comptes audités : son résultat net, l’échéancier de ses engagements, la manière dont il compte ses revenus. Le marché devra alors fixer un prix, non plus sur une présentation aux investisseurs, mais sur des chiffres vérifiables. OpenAI, lui, cherche à lever 30 milliards avant que cette comparaison ne devienne possible.",
      },
      {
        type: "p",
        text: "Reste une question que ces deux articles n’ont fait qu’effleurer : celle de l’Europe. Les deux chantiers arrêtés en octobre, celui de Google en Finlande et celui de Nscale dans l’Essex, montrent un continent qui accueille l’infrastructure de l’IA sans la posséder, et qui se heurte aux mêmes murs physiques. Si l’Europe veut ses propres modèles, elle devra entrer dans la même course, avec les mêmes trois horloges. Pourra-t-elle le faire sans reproduire les mêmes boucles ? Ce sera l’objet de notre prochain article.",
      },

      { type: "h", id: "registre", text: "Annexe : le registre des accords" },
      {
        type: "note",
        text: "Les accords du graphe, avec leur source. Montants tels qu’annoncés ou rapportés, de natures et de durées différentes : nous ne les additionnons pas. « Dépôt SEC » signale un document officiel, « presse » un article de presse, « secondaire » une source qui cite d’autres médias.",
      },
      { type: "deal-register" },
    ],
    sourcesLabel: "Sources principales",
    sources: SOURCES_FR,
  },

  en: {
    title: "The gigawatt and the dollar",
    lead: "The speed gap between AI and the grid also exists in dollars, and it is bridged the same way: with other people’s money.",
    updated: "Published on 20 October 2026",
    summaryLabel: "In brief",
    summary: [
      "In 2026, AI infrastructure absorbs about $1 trillion, while OpenAI and Anthropic together report about $117 billion of annualised revenue: roughly one dollar of revenue for every eight or nine dollars invested.",
      "The gap between announced and operating gigawatts, the weight of supplier financing and the gap between private valuations and IPO prices all measure the same thing: the distance between a promise and an asset that produces.",
      "We propose four indicators, quantified and dated, to track this gap.",
    ],
    blocks: [
      {
        type: "stats",
        items: [
          { value: "~$1tn", label: "invested in AI infrastructure in 2026, according to Gartner" },
          { value: "~$117bn", label: "of annualised revenue for OpenAI and Anthropic combined" },
        ],
      },
      {
        type: "related",
        href: "/articles/le-megawatt-et-le-degre",
        label: "This article follows",
        title: "The megawatt and the degree",
        text: "Why the real danger is not the speed of AI, but the gap between its speed and the grid’s.",
      },
      { type: "h", id: "ecart", text: "From the physical gap to the financial gap" },
      {
        type: "p",
        text: "In “The megawatt and the degree”, we argued one thesis: the danger is not the speed of AI, but the gap between how fast it calls for power and how fast a grid can respond. We had held one counter-argument in reserve. If the data centre pipeline deflates, the danger will be financial before it is physical.",
      },
      {
        type: "p",
        text: "Three weeks later, that counter-argument has become the central scenario. On 8 October, OpenAI told its investors that its annualised revenue was approaching $50 billion, not $70 billion. On the 14th, Gartner put possible write-downs at more than $4 trillion by 2032. On the 15th, Anthropic announced $16.8 billion of quarterly revenue and its first adjusted profit, a few weeks before an IPO targeted at around $2 trillion.",
      },
      {
        type: "p",
        text: "So the market is doing very well and very badly at the same time. To get out of this contradiction, we propose tracking four indicators, the way one tracks a grid connection queue: the capex-to-revenue ratio, the gap between announced and operating gigawatts, the share of supplier financing, and the gap between private valuation and IPO price.",
      },

      { type: "h", id: "ratio", text: "1. The capex-to-revenue ratio" },
      {
        type: "p",
        text: "In 2026, the sector invests about $8.50 in infrastructure for every dollar of revenue its two main labs generate. This is the first indicator, and the bluntest.",
      },
      {
        type: "table",
        head: ["Scope", "Investment", "Revenue", "Ratio", "Source"],
        rows: [
          ["Sector, 2026", "~$1tn of AI infrastructure", "~$117bn annualised (OpenAI ~50 + Anthropic ~67)", "~8.5", "Gartner via The Register, TechCrunch"],
          ["OpenAI, 2026-2030", "$856bn of compute and infrastructure", "$840bn cumulative (assumption: ×10 in five years)", "~1.0", "FT via Reuters"],
          ["Anthropic, no stated horizon", "$518bn of cloud and infrastructure obligations", "~$67bn annualised", "~7.7 years of current revenue", "Draft prospectus via Reuters"],
          ["Sector, 2027-2030", "revenue needed for a 12% ROIC: $8.5tn", "expected revenue: $3.6tn", "~2.4", "Gartner via The Register"],
        ],
      },
      { type: "p", text: "Three readings stand out." },
      {
        type: "p",
        text: "First, OpenAI’s ratio is the most telling because it comes from its own presentation. Even in its base case, its cumulative revenue does not cover its compute bill alone, before salaries and R&D. Hence the $278 billion of negative free cash flow it projects.",
      },
      {
        type: "p",
        text: "Second, the sector ratio overstates the gap. Part of AI’s revenue sits elsewhere (hyperscaler cloud, software licences, advertising), and a data centre is depreciated over several years. But even halved, it stays above four.",
      },
      {
        type: "p",
        text: "Third, the two labs’ figures are not directly comparable. Anthropic counts sales made by its cloud partners in its annualised revenue; OpenAI does not, and accuses it of inflating its revenue this way. Anthropic replies that it follows established accounting practice (Reuters, via Hindu BusinessLine). Adding the two together, our ratio therefore gives an order of magnitude, not an exact measure. And Anthropic’s “adjusted” third-quarter profit is not an audited net result.",
      },
      {
        type: "box",
        title: "What we will track",
        text: "The sector’s capex-to-revenue ratio, recalculated at every quarterly report. It will have to fall sharply in 2027 for the gap to close.",
      },

      { type: "h", id: "gigawatts", text: "2. The gap between announced and operating gigawatts" },
      {
        type: "p",
        text: "An announced gigawatt is not an asset: it is an option. In mid-2026, OpenAI had only 0.3 GW in operation out of more than 9 GW announced for Stargate, about 3%.",
      },
      {
        type: "bars",
        title: "At OpenAI and Anthropic, fewer than one announced gigawatt in ten is in operation",
        subtitle: "Share of announced capacity actually in operation, mid-2026",
        items: [
          { name: "Off-grid generation (US)", value: 2.2, label: "2% · 2 / 90 GW" },
          { name: "OpenAI (Stargate)", value: 3.3, label: "3% · 0.3 / 9 GW", highlight: true },
          { name: "Anthropic", value: 9.3, label: "9% · 1.4 / 15 GW", highlight: true },
          { name: "North American data centres", value: 19.2, label: "19% · 39 / 203 GW" },
          { name: "xAI (Colossus)", value: 50, label: "50% · 1 / 2 GW" },
        ],
        caption: "Sources: Epoch AI (Stargate, April 2026), MeasuredAI (Anthropic, August 2026), Wikipedia and Cleanview (xAI, off-grid generation), Sightline Climate (May 2026), as cited in “The megawatt and the degree”. Anthropic leases most of its capacity.",
      },
      {
        type: "p",
        text: "This indicator links the two articles directly. In the first, we quoted Sightline: a data centre announcement is a request for electricity, not a commitment to build. Here, it is also a request for financing. And announcements keep swelling faster than concrete. In August, OpenAI signed a 20-year lease for a 10 GW campus in Ohio, developed by SB Energy, SoftBank’s subsidiary (SiliconANGLE). Nvidia, for its part, puts OpenAI’s existing and planned commitments to its chips through 2030 at about 12 GW (AI News).",
      },
      {
        type: "p",
        text: "An announcement can also run into a permit. On 7 October, the Finnish environmental authority ordered Google to suspend preparatory work on two data centres, in Muhos and Kajaani: its subsidiary had started clearing land without the mandatory impact assessment, over more than 300 hectares of forest according to the Finnish Association for Nature Conservation. These sites are part of the €13 billion announced in September, Google’s largest investment in Europe. They remain halted until the assessments are complete, and the police have opened a preliminary investigation into Muhos (Al Jazeera, Yle).",
      },
      {
        type: "p",
        text: "Or on the grid. On 18 October, Microsoft pulled out of the data centre Nscale was planning in Loughton, Essex, presented by the British government as the country’s largest, citing the power supply (The Guardian, City AM). Nscale, which lost $1 billion in the first half on $141 million of revenue, is nonetheless negotiating a second $45 billion contract with Anthropic, according to Bloomberg (TechCrunch).",
      },
      {
        type: "p",
        text: "The gap matters for two reasons. On the physical side, every announced gigawatt enters a connection queue and weighs on capacity auctions, even if it is never built. On the financial side, valuations are calculated on promised capacity, while revenue comes from installed capacity.",
      },
      {
        type: "p",
        text: "The case of xAI shows the other side: 50% of its announced capacity is in operation, but at the cost of a private 1.2 GW gas plant. The gap only closes quickly when you bypass the grid.",
      },
      {
        type: "box",
        title: "What we will track",
        text: "The share of announced gigawatts actually in operation, per player, at each checkpoint. If it exceeds 30% at OpenAI and Anthropic by the end of 2027, the gap is closing.",
      },

      { type: "h", id: "fournisseurs", text: "3. The share of supplier financing" },
      {
        type: "p",
        text: "About a quarter of Nvidia’s business next year will come from labs it funds itself: its chief financial officer told analysts so on 26 August (AI News).",
      },
      {
        type: "p",
        text: "The mechanism is simple. The supplier invests in a lab, or guarantees its credit. The lab builds a data centre full of the supplier’s chips. The purchase becomes revenue for the supplier, which reinvests. Nvidia itself uses the phrase circular financing, in order to dispute it.",
      },
      {
        type: "table",
        head: ["Supplier", "Commitment", "Form", "Status", "Source"],
        rows: [
          ["Nvidia", "~$50bn already invested in labs", "equity stakes", "done", "AI News"],
          ["Nvidia", "over $500bn of third-party capital (Apollo, BlackRock, Blackstone, Brookfield, Goldman Sachs, KKR)", "financing platforms", "subject to definitive agreements", "AI News"],
          ["Nvidia", "guaranteed lease of part of neoclouds’ capacity", "revenue floor for their lenders", "in place", "AI News"],
          ["Broadcom", "$42bn of senior debt for Anthropic, plus $18bn of junior debt", "debt backed by Broadcom and the chips’ residual value", "junior debt conditional on published accounts", "Motley Fool"],
          ["Broadcom", "up to $50bn for OpenAI", "financing for custom chip purchases", "under discussion", "Motley Fool"],
        ],
      },
      { type: "h3", text: "The textbook case: Google’s $200 billion machine" },
      {
        type: "p",
        text: "The most elaborate set-up is not Nvidia’s. It is the one Google has built around Anthropic, revealed by the Financial Times on 4 August: about $200 billion of contracts, 80% of them tied to the chips themselves, to supply more than $150 billion of TPUs to the lab (FT, translated by Expansión).",
      },
      {
        type: "p",
        text: "The starting problem is simple: nobody wanted to carry tens of billions of chips on their balance sheet. Google is already funding record capex. Broadcom agrees to buy the hardware, but does not want to become a financier. The solution borrows the model Boeing and GE invented to sell aircraft and engines.",
      },
      { type: "diagram", variant: "google-machine" },
      {
        type: "p",
        text: "Each player carries a piece of the risk: Google the data centres, Broadcom the chips, private credit the financing. Anthropic carries only the lease payments.",
      },
      {
        type: "p",
        text: "The first batch went through the machine in June. A special-purpose vehicle, Compute SPV, set up by Morgan Stanley, paid $35 billion for about 1 GW of hardware, close to a million TPUs. The money comes from three tranches of debt held by Apollo and Blackstone. Broadcom guarantees the two senior tranches, for about $30 billion: if Anthropic stops paying and the chips resell poorly, Broadcom fills the hole.",
      },
      {
        type: "p",
        text: "The second batch is much bigger. In April, Google agreed to sell another 3.5 GW of TPUs to Broadcom for Anthropic. In its filings, Broadcom shows $128 billion of purchase commitments: $55.2 billion of deliveries in its 2027 fiscal year, $72.9 billion in 2028. Anthropic’s prospectus, for its part, mentions a $125.2 billion five-year commitment to lease this TPU capacity, about a third of which could be funded by a Broadcom convertible loan of up to $42 billion (CNBC).",
      },
      { type: "p", text: "Five details make this set-up remarkable." },
      {
        type: "defs",
        items: [
          {
            term: "It explains the map in the first article.",
            text: "We noted there that Anthropic was leasing former bitcoin farms (TeraWulf, Cipher, Hut 8) without understanding why. The FT gives the answer: Google guarantees their leases. TeraWulf was the first, for a 360 MW data centre in New York State; Morgan Stanley turned that guarantee into a $3.2 billion construction bond. In exchange, Google received warrants on TeraWulf’s equity.",
          },
          {
            term: "The risk is almost invisible on the balance sheet.",
            text: "Google’s guarantees on 10 projects (2.4 GW) commit it to paying up to $44 billion if all the leases default. It books them at $815 million, about 54 times less.",
          },
          {
            term: "The gap from the second indicator reappears inside the set-up itself.",
            text: "Google has committed to selling 4.5 GW of TPUs, but has secured only 2.4 GW of data centres to house them. A Google executive told the FT that the team now spends all its time on energy. The megawatt catches up with the dollar.",
          },
          {
            term: "The guarantee creates a cost-of-capital advantage.",
            text: "Projects backed by Google borrowed at 7.1% on average, against 9.3% for neoclouds built around Nvidia. Jefferies speaks of a structural disadvantage for the Nvidia ecosystem. A hyperscaler’s balance sheet becomes a commercial weapon, as grid access was in the first article.",
          },
          {
            term: "The risk is huge, but concentrated on a single customer.",
            text: "The $200 billion depends on Anthropic’s ability to pay its leases. The prospectus states that a payment default could make a large part of the lease commitments immediately due. In 2027, Anthropic will become Broadcom’s largest customer; Broadcom is targeting $115 billion of AI revenue that year and $230 billion in 2028.",
          },
        ],
      },
      {
        type: "p",
        text: "A partner at Rothschild & Co sums up the problem to CNBC: the market is making a very concentrated bet on the ability of two companies to generate enough revenue to repay everything that has been financed. Google is at once Anthropic’s investor, the supplier of its chips and the guarantor of its data centres. If the customer pays, each of them gets paid three times. If it does not, each of them loses three times.",
      },
      {
        type: "p",
        text: "The weak point comes down to one word: the guarantee. Nvidia defends its exposure by explaining that a repossessed chip can be resold to another customer. Broadcom’s debt rests partly on the chips’ residual value. Both arguments hold as long as demand exceeds supply. They give way together on the day it no longer does, since that is precisely the day residual value collapses.",
      },
      {
        type: "p",
        text: "This is the financial equivalent of the third route in the first article. The physical gap was bridged by sending the bill to households; the financial gap is bridged by shifting the risk onto the supplier, then onto its lenders. In both cases, the one who pays is not the one who decides.",
      },
      {
        type: "box",
        title: "What we will track",
        text: "The share of Nvidia’s and Broadcom’s revenue tied to customers they finance or guarantee. If it exceeds 30% at Nvidia, the cycle depends on itself.",
      },

      { type: "h", id: "introduction", text: "4. The IPO price against private valuations" },
      {
        type: "p",
        text: "Anthropic is targeting an IPO at around $2 trillion, more than double its last private valuation of $965 billion, set in the spring. The IPO is the moment the public market says whether it will pay for the same promise as private investors.",
      },
      {
        type: "table",
        head: ["Company", "Last private valuation", "Target valuation", "Premium", "Multiple of annualised revenue"],
        rows: [
          ["Anthropic", "$965bn ($65bn round, spring 2026)", "~$2tn, IPO targeted for November", "×2.1", "~30× ($67bn)"],
          ["OpenAI", "$852bn ($122bn round, March 2026)", "~$1.2tn under discussion, IPO pushed back to 2027", "×1.4", "~24× (~$50bn)"],
        ],
        caption: "Sources: Motley Fool, Euronews, FT via Reuters, TechCrunch.",
      },
      {
        type: "p",
        text: "These multiples are justified only by future growth. Anthropic’s valuation rests on a forecast of $190 to $200 billion of revenue in 2028 (Economic Times). OpenAI’s, on revenue multiplied by ten by 2030. The IPO price therefore measures the market’s confidence that the gap described in indicators 1 and 2 will close.",
      },
      {
        type: "p",
        text: "There is already a precedent this year. SpaceX, which now includes xAI, went public in June at $135 a share, for a valuation of about $1.77 trillion (Motley Fool). The stock gained 19% on the first day, then fell as low as $108.27 in July, about 20% below its IPO price. It only climbed back above on 10 August, after a better-than-expected quarter (CNBC). In the meantime, the end of the first lock-up period released 911 million shares, more than the 639 million sold in the IPO.",
      },
      {
        type: "p",
        text: "The first public test of a giant AI-linked valuation thus showed two things: the market goes along at first, then asks for proof again quarter after quarter.",
      },
      {
        type: "box",
        title: "What we will track",
        text: "The gap between the IPO price of Anthropic, then OpenAI, and their last private valuation, as well as the share price six months later. A stock lastingly below its IPO price would signal that the public market refuses to finance the gap.",
      },

      { type: "h", id: "boucle", text: "The loop: four indicators, one question" },
      {
        type: "p",
        text: "The four indicators measure the same distance, the one between a promise and an asset that produces revenue. They hold each other up.",
      },
      {
        type: "p",
        text: "The capex-to-revenue ratio is high because investment anticipates capacity that does not exist yet. That capacity remains partly theoretical, as the gap between announced and operating gigawatts shows. It is partly financed by suppliers, whose guarantee depends on the value of the chips. And the value of the chips depends on demand that the IPO has to justify. If one link gives way, the other three tighten at the same time.",
      },
      {
        type: "p",
        text: "The first article set two clocks against each other, AI’s in days and the grid’s in years. Finance adds a third, which falls between the two:",
      },
      {
        type: "defs",
        items: [
          { term: "Chips", text: "are depreciated over 2 to 4 years." },
          { term: "OpenAI’s cash", text: "raised in March, would run out by 2028." },
          { term: "The revenue", text: "that justifies the valuations is expected in 2028 (Anthropic) and 2030 (OpenAI)." },
          { term: "The grid", text: "takes about 5 years between a connection request and commissioning." },
        ],
      },
      {
        type: "p",
        text: "So a chip can be obsolete before the grid has delivered the megawatts that power it, and before revenue has paid back its price. This is the write-down mechanism Gartner describes.",
      },
      {
        type: "p",
        text: "This financial clock is speeding up. The yield on 10-year US Treasuries reached 5.30% in October, the highest since 2002: borrowing to build costs more. Insurance against an Oracle default is back to its 2009 price. And the banks that financed the data centres are trying to pass some of those loans on to other investors, because they are nearing their exposure limits on AI: a $38 billion construction loan, for sites leased to Oracle, has found no taker for six months (Startup Fortune, citing the FT and Bloomberg).",
      },
      {
        type: "p",
        text: "That leaves the question that already ran through the first article: who carries the risk? Not the labs alone. Anthropic, which owns neither buildings nor substations, has shifted most of its assets onto AWS, Google, former bitcoin farms and now Broadcom’s debt. OpenAI has shifted it onto Oracle, SoftBank and Nvidia. Gartner estimates that 80% of neoclouds will not survive as independents after 2030. In both articles, the gap is bridged by those who did not make the decision.",
      },
      { type: "deals" },
      {
        type: "p",
        text: "Every player is at once a supplier, customer, creditor or guarantor of the others. SpaceX is the extreme case: Anthropic’s landlord, Anthropic’s customer through Cursor, and a competitor in code.",
      },
      { type: "h3", text: "OpenAI: the risk carried by Oracle and SoftBank" },
      {
        type: "p",
        text: "OpenAI’s case is less sophisticated, but more concentrated. OpenAI builds little itself: it commits, and others borrow. Oracle has signed a cloud contract with it valued at $300 billion over five years from 2027. According to KeyBanc, Oracle could need to borrow up to $100 billion over four years to serve it, when its long-term debt already stood at $82.2 billion at the end of August 2025 (DatacenterDynamics).",
      },
      {
        type: "p",
        text: "SoftBank is the other exposed balance sheet, and it is exposed on credit. Its commitments to OpenAI exceed $60 billion. To meet them, it signed a twelve-month $40 billion bridge loan in March, at about 6.14% interest, one of the largest ever arranged in Asia-Pacific; according to Bloomberg, some bankers were worried about its exposure to OpenAI (Japan Times). Its subsidiary SB Energy is also developing the 10 GW Ohio campus leased by OpenAI, whose financing Nvidia guarantees up to $105 billion.",
      },
      {
        type: "p",
        text: "The loop is complete: SoftBank borrows to invest in OpenAI, which then leases a campus from it. If OpenAI’s revenue disappoints, the value of the stake and the rents fall together, while the loan remains due.",
      },
      {
        type: "p",
        text: "This link is already showing signs of strain. SB Energy has withdrawn or suspended its IPO (Reuters, via Hindu BusinessLine), and on 20 October Bloomberg reported SoftBank’s credit risk at a four-year high (Bloomberg). Meanwhile, OpenAI is seeking to raise about $30 billion at a valuation of more than $1.4 trillion, with SoftBank among the expected participants, before Anthropic’s accounts become public.",
      },
      {
        type: "p",
        text: "On top of that come about $22.4 billion of contracts with CoreWeave, 6 GW of AMD chips and $250 billion promised to Microsoft. OpenAI builds little; Oracle and SoftBank borrow for it.",
      },

      { type: "h", id: "conclusion", text: "Conclusion: when the concrete runs late, the debt waits" },
      {
        type: "p",
        text: "The first article measured a physical gap: AI promises gigawatts that the grid will take years to deliver. This one measures its financial double: the market is paying today for capacity that will only exist tomorrow. The sector’s spending is about eight and a half times its revenue. At OpenAI and Anthropic, fewer than one announced gigawatt in ten is in operation. And a growing share of the money flowing between the labs, their suppliers and their financiers comes back to where it started.",
      },
      {
        type: "p",
        text: "These figures do not say that AI is worthless. The revenue is real and rising fast. They say that three clocks do not run at the same speed: debt falls due before the revenue arrives, and chips are depreciated before the grid powers them. They also say that those who make the promises are not those who will pay if the schedule slips. The labs rent; Oracle, SoftBank, CoreWeave and the banks borrow; and at the end of the chain, IPO investors will be the ones buying the promise.",
      },
      {
        type: "p",
        text: "In October, the first signs appeared where we expected them. The most indebted links gave way first, credit became more expensive, and two sites stopped in Europe, one over a permit, the other over the grid. This is not a break. It is proof that the two gaps are one: when the concrete runs late, the debt waits.",
      },
      { type: "h3", text: "Looking ahead: the November test, and the European question" },
      {
        type: "p",
        text: "Anthropic’s IPO, expected in mid-November, will be the first real test. For the first time, a major lab will publish audited accounts: its net result, the schedule of its commitments, the way it counts its revenue. The market will then have to set a price, no longer on an investor presentation, but on verifiable figures. OpenAI, for its part, is trying to raise $30 billion before that comparison becomes possible.",
      },
      {
        type: "p",
        text: "One question remains that these two articles have only touched on: Europe. The two sites halted in October, Google’s in Finland and Nscale’s in Essex, show a continent that hosts AI infrastructure without owning it, and that runs into the same physical walls. If Europe wants its own models, it will have to enter the same race, with the same three clocks. Can it do so without reproducing the same loops? That will be the subject of our next article.",
      },

      { type: "h", id: "registre", text: "Appendix: the deal register" },
      {
        type: "note",
        text: "The deals in the graph, with their source. Amounts as announced or reported, of different kinds and lengths: we do not add them up. “SEC filing” marks an official document, “press” a press article, “secondary” a source citing other media.",
      },
      { type: "deal-register" },
    ],
    sourcesLabel: "Main sources",
    sources: SOURCES_EN,
  },
};
