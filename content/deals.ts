import type { Locale } from "@/lib/i18n";

/**
 * The deal graph of "The gigawatt and the dollar": who invests in, buys
 * compute from, finances, acquires or cuts off whom. Drawn as a scrolling
 * graph (components/DealLoops.tsx) and listed as a register with sources.
 * Amounts are commitments of different kinds and lengths: never add them up.
 */
export type DealKind = "inv" | "calc" | "fin" | "acq" | "rup";
export type DealCat = "lab" | "chip" | "cloud" | "infra" | "fin" | "app";
type T = Record<Locale, string>;

export const DEAL_KINDS: Record<DealKind, T> = {
  inv: { fr: "Investissement", en: "Investment" },
  calc: { fr: "Achat de calcul", en: "Compute purchase" },
  fin: { fr: "Financement ou garantie", en: "Financing or guarantee" },
  acq: { fr: "Rachat", en: "Acquisition" },
  rup: { fr: "Rupture", en: "Cut-off" },
};

export const DEAL_CATS: Record<DealCat, T> = {
  lab: { fr: "Labo", en: "Lab" },
  chip: { fr: "Puces", en: "Chips" },
  cloud: { fr: "Cloud", en: "Cloud" },
  infra: { fr: "Data centers", en: "Data centres" },
  fin: { fr: "Crédit privé", en: "Private credit" },
  app: { fr: "Logiciel et appareils", en: "Software and devices" },
};

export type DealNode = { id: string; name: string; cat: DealCat; x: number; y: number; desc: T };

export const DEAL_NODES: DealNode[] = [
  { id: "anthropic", name: "Anthropic", cat: "lab", x: 430, y: 320, desc: { fr: "Éditeur de Claude. Introduction en Bourse visée autour de 2 000 Md$.", en: "Maker of Claude. IPO targeted at around $2 trillion." } },
  { id: "openai", name: "OpenAI", cat: "lab", x: 650, y: 480, desc: { fr: "Éditeur de ChatGPT. Introduction en Bourse repoussée à 2027.", en: "Maker of ChatGPT. IPO pushed back to 2027." } },
  { id: "spacex", name: "SpaceX · xAI", cat: "lab", x: 720, y: 220, desc: { fr: "A absorbé xAI en février 2026. Loue ses data centers de Memphis à Anthropic et Google.", en: "Absorbed xAI in February 2026. Leases its Memphis data centres to Anthropic and Google." } },
  { id: "cursor", name: "Cursor", cat: "app", x: 900, y: 110, desc: { fr: "Éditeur de code racheté par SpaceX en août 2026. Propose Claude à ses utilisateurs.", en: "Code editor acquired by SpaceX in August 2026. Offers Claude to its users." } },
  { id: "google", name: "Google", cat: "cloud", x: 240, y: 150, desc: { fr: "Conçoit les TPU avec Broadcom. Investisseur, fournisseur et garant d’Anthropic. Fournit Gemini à Apple, loue des TPU à Meta, et loue des GPU Nvidia à SpaceX pour Gemini.", en: "Designs TPUs with Broadcom. Investor in, supplier to and guarantor for Anthropic. Supplies Gemini to Apple, rents TPUs to Meta, and rents Nvidia GPUs from SpaceX for Gemini." } },
  { id: "apple", name: "Apple", cat: "app", x: 330, y: 40, desc: { fr: "Base sa prochaine génération de modèles, dont Siri, sur Gemini. Utilise Claude en interne ; ChatGPT alimente encore certaines fonctions d’Apple Intelligence.", en: "Bases its next generation of models, Siri included, on Gemini. Uses Claude internally; ChatGPT still powers some Apple Intelligence features." } },
  { id: "meta", name: "Meta", cat: "lab", x: 50, y: 470, desc: { fr: "Loue du calcul chez Google, Nebius et CoreWeave, achète jusqu’à 6 GW à AMD, et annonce en juillet 2026 vouloir revendre ses capacités excédentaires.", en: "Rents compute from Google, Nebius and CoreWeave, buys up to 6 GW from AMD, and announced in July 2026 that it wants to resell its spare capacity." } },
  { id: "nebius", name: "Nebius", cat: "infra", x: 55, y: 622, desc: { fr: "Neocloud européen. Clients : Microsoft (17,4 Md$ sur cinq ans) et Meta (jusqu’à 27 Md$).", en: "European neocloud. Customers: Microsoft ($17.4bn over five years) and Meta (up to $27bn)." } },
  { id: "coreweave", name: "CoreWeave", cat: "infra", x: 780, y: 385, desc: { fr: "Neocloud bâti sur du matériel Nvidia, dont Nvidia est aussi actionnaire. Clients : OpenAI (≈22,4 Md$), Meta (≈35 Md$), Anthropic.", en: "Neocloud built on Nvidia hardware, in which Nvidia is also a shareholder. Customers: OpenAI (≈$22.4bn), Meta (≈$35bn), Anthropic." } },
  { id: "amazon", name: "Amazon", cat: "cloud", x: 150, y: 370, desc: { fr: "AWS, premier fournisseur historique de calcul d’Anthropic, et investisseur.", en: "AWS, Anthropic’s first compute supplier, and an investor." } },
  { id: "microsoft", name: "Microsoft", cat: "cloud", x: 360, y: 500, desc: { fr: "Azure. Investisseur d’Anthropic, premier fournisseur cloud d’OpenAI.", en: "Azure. Investor in Anthropic, OpenAI’s main cloud supplier." } },
  { id: "nvidia", name: "Nvidia", cat: "chip", x: 880, y: 575, desc: { fr: "Investit dans ses clients et garantit leur financement. Environ un quart de son activité en 2027 viendrait de labos qu’il finance.", en: "Invests in its customers and guarantees their financing. About a quarter of its 2027 business would come from labs it funds." } },
  { id: "broadcom", name: "Broadcom", cat: "chip", x: 470, y: 80, desc: { fr: "Achète les TPU de Google pour Anthropic, finance et garantit leur location.", en: "Buys Google’s TPUs for Anthropic, and finances and guarantees their lease." } },
  { id: "amd", name: "AMD", cat: "chip", x: 560, y: 635, desc: { fr: "Paie ses clients en actions : bons de souscription sur jusqu’à 160 millions d’actions pour OpenAI comme pour Meta, en échange de 6 GW de commandes chacun. Investit aussi dans Anthropic.", en: "Pays its customers in shares: warrants on up to 160 million shares for OpenAI and for Meta, in exchange for 6 GW of orders each. Also invests in Anthropic." } },
  { id: "credit", name: "Crédit privé", cat: "fin", x: 110, y: 70, desc: { fr: "Apollo, Blackstone et Morgan Stanley, via le véhicule Compute SPV.", en: "Apollo, Blackstone and Morgan Stanley, through the Compute SPV vehicle." } },
  { id: "mineurs", name: "Anciens mineurs", cat: "infra", x: 70, y: 235, desc: { fr: "TeraWulf, Cipher, Hut 8 : d’anciennes fermes de bitcoin devenues data centers pour Anthropic.", en: "TeraWulf, Cipher, Hut 8: former bitcoin farms turned into data centres for Anthropic." } },
  { id: "softbank", name: "SoftBank · SB Energy", cat: "infra", x: 905, y: 390, desc: { fr: "SoftBank s’est engagé à plus de 60 Md$ envers OpenAI, financés en partie par un prêt relais de 40 Md$. Sa filiale SB Energy développe le campus de 10 GW de l’Ohio loué par OpenAI.", en: "SoftBank has committed more than $60bn to OpenAI, partly funded by a $40bn bridge loan. Its subsidiary SB Energy is developing the 10 GW Ohio campus leased by OpenAI." } },
  { id: "lambda", name: "Lambda", cat: "infra", x: 575, y: 185, desc: { fr: "Neocloud dont Nvidia est actionnaire, qui loue des puces Nvidia à Anthropic.", en: "Neocloud in which Nvidia is a shareholder, renting Nvidia chips to Anthropic." } },
  { id: "nscale", name: "Nscale", cat: "infra", x: 275, y: 262, desc: { fr: "Neocloud britannique. Contrat d’infrastructure dédiée avec Anthropic.", en: "British neocloud. Dedicated infrastructure contract with Anthropic." } },
];

/** Names that change with the language (the others are proper nouns). */
export const DEAL_NODE_NAMES: Partial<Record<string, T>> = {
  credit: { fr: "Crédit privé", en: "Private credit" },
  mineurs: { fr: "Anciens mineurs", en: "Former miners" },
};

export const nodeName = (id: string, lang: Locale) =>
  DEAL_NODE_NAMES[id]?.[lang] ?? DEAL_NODES.find((n) => n.id === id)?.name ?? id;

/** "sec" is an official filing, "press" a press article, "secondary" a source citing other media. */
export type SourceStatus = "sec" | "press" | "secondary";
export const SOURCE_STATUS: Record<SourceStatus, T> = {
  sec: { fr: "dépôt SEC", en: "SEC filing" },
  press: { fr: "presse", en: "press" },
  secondary: { fr: "secondaire", en: "secondary" },
};

export const DEAL_SOURCES: Record<string, { label: T; url: string; status: SourceStatus }> = {
  wiki: { label: { fr: "Wikipédia, AI build-out financing", en: "Wikipedia, AI build-out financing" }, url: "https://en.wikipedia.org/wiki/AI_build-out_financing", status: "secondary" },
  semafor: { label: { fr: "Semafor", en: "Semafor" }, url: "https://www.semafor.com/article/11/18/2025/anthropic-agreement-with-nvidia-and-microsoft-raises-ai-circularity-concerns", status: "press" },
  afp: { label: { fr: "AFP, via L’Orient-Le Jour", en: "AFP, via L’Orient-Le Jour" }, url: "https://today.lorientlejour.com/article/1546201/anthropic-loue-pour-35-milliards-de-dollars-de-calcul-nvidia-au-texas.html", status: "press" },
  sherwood: { label: { fr: "Sherwood News", en: "Sherwood News" }, url: "https://sherwood.news/tech/report-anthropic-cuts-off-xais-access-to-its-models-for-coding/", status: "press" },
  aws: { label: { fr: "Projet de prospectus d’Anthropic, via Reuters", en: "Anthropic’s draft prospectus, via Reuters" }, url: "https://www.fool.com/investing/2026/09/30/anthropic-plans-to-spend-usd518-billion-on-cloud-and-data-centers-more-than-usd100-billion-is-already-promised-to-amazon/", status: "press" },
  ft: { label: { fr: "Financial Times, traduit par Expansión", en: "Financial Times, translated by Expansión" }, url: "https://www.expansion.com/economia/financial-times/2026/08/04/6a72017f468aeba62f8b458b.html", status: "press" },
  siecle: { label: { fr: "Siècle Digital, d’après The Information", en: "Siècle Digital, citing The Information" }, url: "https://siecledigital.fr/2026/05/07/anthropic-aurait-accepte-de-verser-200-milliards-de-dollars-a-google-pour-lacces-aux-puces-et-au-cloud/", status: "press" },
  s1: { label: { fr: "Prospectus de SpaceX (S-1)", en: "SpaceX prospectus (S-1)" }, url: "https://www.sec.gov/Archives/edgar/data/1181412/000162828026036936/spaceexplorationtechnologi.htm", status: "sec" },
  cnbcCursor: { label: { fr: "CNBC", en: "CNBC" }, url: "https://www.cnbc.com/2026/08/29/openai-cursor-spacex-model-access.html", status: "press" },
  aiNews: { label: { fr: "AI News, d’après la conférence de résultats de Nvidia", en: "AI News, citing Nvidia’s earnings call" }, url: "https://www.artificialintelligence-news.com/news/nvidia-circular-financing-ai-labs/", status: "press" },
  japantimes: { label: { fr: "Japan Times, d’après Bloomberg", en: "Japan Times, citing Bloomberg" }, url: "https://www.japantimes.co.jp/business/2026/07/27/companies/softbank-openai-stake-new-lenders/", status: "press" },
  ohio: { label: { fr: "SiliconANGLE", en: "SiliconANGLE" }, url: "https://siliconangle.com/2026/08/17/openai-leases-10-gigawatt-ai-data-center-campus-from-softbanks-sb-energy/", status: "press" },
  nscale: { label: { fr: "Prospectus de Nscale (S-1)", en: "Nscale prospectus (S-1)" }, url: "https://www.sec.gov/Archives/edgar/data/0002110365/000119312526395475/ck0002110365-20260918.htm", status: "sec" },
  cnbcAvgo: { label: { fr: "CNBC, d’après le prospectus d’Anthropic", en: "CNBC, citing Anthropic’s prospectus" }, url: "https://www.cnbc.com/2026/10/01/broadcom-lending-anthropic-42-billion-chips-reuters.html", status: "press" },
  foolAvgo: { label: { fr: "Motley Fool", en: "Motley Fool" }, url: "https://www.fool.com/investing/2026/10/13/broadcom-is-backing-anthropic-and-openai-with-92-b/", status: "press" },
  aiweekly: { label: { fr: "AI Weekly, bilan du T2 2026", en: "AI Weekly, Q2 2026 review" }, url: "https://aiweekly.co/editors-blog/ai-companies-funding-each-other-in-circles", status: "secondary" },
  apple: { label: { fr: "AppleInsider", en: "AppleInsider" }, url: "https://appleinsider.com/articles/26/01/12/google-confirms-that-it-wont-get-apple-user-data-in-new-siri-deal", status: "press" },
  meta: { label: { fr: "Storyboard18, d’après The Information", en: "Storyboard18, citing The Information" }, url: "https://storyboard18.com/digital/meta-signs-multi-billion-dollar-ai-chip-rental-deal-with-google-90907.htm", status: "press" },
  dcd: { label: { fr: "DatacenterDynamics, d’après le dépôt de SpaceX", en: "DatacenterDynamics, citing SpaceX’s filing" }, url: "https://www.datacenterdynamics.com/en/news/google-to-pay-920-million-to-spacex-monthly-for-ai-capacity/", status: "press" },
  toms: { label: { fr: "Tom’s Hardware", en: "Tom’s Hardware" }, url: "https://tomshardware.com/tech-industry/openai-and-amd-announce-multibillion-dollar-partnership-amd-to-supply-6-gigawatts-in-chips-openai-could-get-up-to-10-percent-of-amd-shares-in-return", status: "press" },
  amd8k: { label: { fr: "Communiqué d’AMD (formulaire 8-K)", en: "AMD press release (Form 8-K)" }, url: "https://www.sec.gov/Archives/edgar/data/2488/000000248826000045/pressreleasedatedfebruary2.htm", status: "sec" },
  bgov: { label: { fr: "Bloomberg Law", en: "Bloomberg Law" }, url: "https://news.bgov.com/artificial-intelligence/amd-to-invest-up-to-5-billion-in-anthropic-deploy-chips", status: "press" },
  nebius: { label: { fr: "DatacenterDynamics", en: "DatacenterDynamics" }, url: "https://www.datacenterdynamics.com/en/news/nebius-secures-up-to-27bn-ai-infrastructure-contract-from-meta/", status: "press" },
  tnw: { label: { fr: "The Next Web", en: "The Next Web" }, url: "https://thenextweb.com/news/meta-coreweave-21-billion-ai-cloud-deal", status: "press" },
  appleclaude: { label: { fr: "AppleInsider, d’après Bloomberg", en: "AppleInsider, citing Bloomberg" }, url: "https://appleinsider.com/articles/26/01/30/apple-could-have-used-claude-to-power-a-future-siri-but-anthropic-got-greedy", status: "press" },
  verdict: { label: { fr: "Verdict", en: "Verdict" }, url: "https://www.verdict.co.uk/coreweave-openai-contract-worth-up-to-6-5bn/", status: "press" },
  computing: { label: { fr: "Computing", en: "Computing" }, url: "https://www.computing.co.uk/news/2026/nvidia-invests-2-billion-in-coreweave", status: "press" },
  pureai: { label: { fr: "Pure AI", en: "Pure AI" }, url: "https://pureai.com/articles/2026/04/13/coreweave-and-anthropic-sign-multi-year-deal.aspx", status: "press" },
  dcdmsft: { label: { fr: "DatacenterDynamics", en: "DatacenterDynamics" }, url: "https://datacenterdynamics.com/en/news/microsoft-to-use-nebius-gpu-data-centers-in-deal-worth-174bn-over-five-years", status: "press" },
  theinfo: { label: { fr: "The Information", en: "The Information" }, url: "https://www.theinformation.com/briefings/anthropic-discloses-84-5-billion-spacex-compute-agreements", status: "press" },
};

/** `d` is the month (YYYY-MM), `f` → `t` the direction, `v` a rough size in $bn for the stroke width. */
export type Deal = { d: string; f: string; t: string; k: DealKind; amt: T; v: number | null; txt: T; s: string };

// The index of each deal is its id: the scroll steps below refer to deals by index.
export const DEALS: Deal[] = [
  /* 0 */ { d: "2023-09", f: "amazon", t: "anthropic", k: "inv", amt: { fr: "jusqu’à 4 Md$", en: "up to $4bn" }, v: 4, txt: { fr: "Investissement d’Amazon. Anthropic s’engage à entraîner ses modèles sur AWS.", en: "Amazon investment. Anthropic commits to training its models on AWS." }, s: "wiki" },
  /* 1 */ { d: "2023-10", f: "google", t: "anthropic", k: "inv", amt: { fr: "jusqu’à 2 Md$", en: "up to $2bn" }, v: 2, txt: { fr: "Investissement de Google. Anthropic utilise ses puces et son cloud.", en: "Google investment. Anthropic uses its chips and its cloud." }, s: "wiki" },
  /* 2 */ { d: "2025-10", f: "openai", t: "microsoft", k: "calc", amt: { fr: "250 Md$", en: "$250bn" }, v: 250, txt: { fr: "Engagement d’OpenAI à acheter des services cloud Azure.", en: "OpenAI commitment to buy Azure cloud services." }, s: "wiki" },
  /* 3 */ { d: "2025-10", f: "amd", t: "openai", k: "inv", amt: { fr: "jusqu’à 160 M d’actions (≈10 %)", en: "up to 160M shares (≈10%)" }, v: null, txt: { fr: "Bons de souscription à 0,01 $ l’action, débloqués par paliers de déploiement et de cours de Bourse.", en: "Warrants at $0.01 a share, unlocked in tranches tied to deployment and share price milestones." }, s: "toms" },
  /* 4 */ { d: "2025-11", f: "microsoft", t: "anthropic", k: "inv", amt: { fr: "jusqu’à 5 Md$", en: "up to $5bn" }, v: 5, txt: { fr: "Investissement de Microsoft, annoncé avec celui de Nvidia (15 Md$ à eux deux).", en: "Microsoft investment, announced alongside Nvidia’s ($15bn between them)." }, s: "semafor" },
  /* 5 */ { d: "2025-11", f: "nvidia", t: "anthropic", k: "inv", amt: { fr: "jusqu’à 10 Md$", en: "up to $10bn" }, v: 10, txt: { fr: "Investissement de Nvidia dans Anthropic.", en: "Nvidia investment in Anthropic." }, s: "afp" },
  /* 6 */ { d: "2025-11", f: "anthropic", t: "microsoft", k: "calc", amt: { fr: "30 Md$", en: "$30bn" }, v: 30, txt: { fr: "Engagement d’Anthropic sur le cloud Azure, en contrepartie.", en: "Anthropic commitment to Azure cloud, in return." }, s: "semafor" },
  /* 7 */ { d: "2026-01", f: "anthropic", t: "spacex", k: "rup", amt: { fr: "sans montant", en: "no amount" }, v: null, txt: { fr: "Anthropic coupe l’accès des ingénieurs de xAI à Claude dans Cursor : ses conditions interdisent d’aider un concurrent.", en: "Anthropic cuts off xAI engineers’ access to Claude in Cursor: its terms forbid helping a competitor." }, s: "sherwood" },
  /* 8 */ { d: "2026-04", f: "anthropic", t: "amazon", k: "calc", amt: { fr: "plus de 100 Md$ sur 10 ans", en: "over $100bn over 10 years" }, v: 100, txt: { fr: "Engagement d’Anthropic sur AWS.", en: "Anthropic commitment to AWS." }, s: "aws" },
  /* 9 */ { d: "2026-04", f: "amazon", t: "anthropic", k: "inv", amt: { fr: "25 Md$ de plus", en: "$25bn more" }, v: 25, txt: { fr: "Nouvel investissement d’Amazon dans Anthropic.", en: "New Amazon investment in Anthropic." }, s: "aiweekly" },
  /* 10 */ { d: "2026-04", f: "broadcom", t: "google", k: "calc", amt: { fr: "128 Md$", en: "$128bn" }, v: 128, txt: { fr: "Broadcom s’engage à acheter 3,5 GW de TPU à Google, destinés à Anthropic (livraisons 2027-2028).", en: "Broadcom commits to buying 3.5 GW of TPUs from Google, destined for Anthropic (deliveries 2027-2028)." }, s: "ft" },
  /* 11 */ { d: "2026-05", f: "anthropic", t: "google", k: "calc", amt: { fr: "200 Md$", en: "$200bn" }, v: 200, txt: { fr: "Engagement d’Anthropic sur les puces et le cloud de Google.", en: "Anthropic commitment to Google’s chips and cloud." }, s: "siecle" },
  /* 12 */ { d: "2026-05", f: "google", t: "anthropic", k: "inv", amt: { fr: "jusqu’à 40 Md$", en: "up to $40bn" }, v: 40, txt: { fr: "Nouvel investissement de Google dans Anthropic.", en: "New Google investment in Anthropic." }, s: "aiweekly" },
  /* 13 */ { d: "2026-05", f: "anthropic", t: "spacex", k: "calc", amt: { fr: "1,25 Md$ par mois", en: "$1.25bn a month" }, v: 45, txt: { fr: "Calcul sur Colossus et Colossus II jusqu’en mai 2029 (≈45 Md$), résiliable par chaque partie avec 90 jours de préavis.", en: "Compute on Colossus and Colossus II until May 2029 (≈$45bn), terminable by either party on 90 days’ notice." }, s: "s1" },
  /* 14 */ { d: "2026-06", f: "google", t: "spacex", k: "calc", amt: { fr: "920 M$ par mois (≈30 Md$)", en: "$920M a month (≈$30bn)" }, v: 30, txt: { fr: "Google loue environ 110 000 GPU sur Colossus d’octobre 2026 à juin 2029, pour répondre à la demande sur Gemini Enterprise ; résiliable par chaque partie avec 90 jours de préavis à partir de 2027.", en: "Google rents about 110,000 GPUs on Colossus from October 2026 to June 2029 to meet demand for Gemini Enterprise; terminable by either party on 90 days’ notice from 2027." }, s: "dcd" },
  /* 15 */ { d: "2026-06", f: "credit", t: "broadcom", k: "calc", amt: { fr: "35 Md$", en: "$35bn" }, v: 35, txt: { fr: "Le véhicule Compute SPV achète environ 1 GW de TPU, soit près d’un million de puces.", en: "The Compute SPV vehicle buys about 1 GW of TPUs, close to a million chips." }, s: "ft" },
  /* 16 */ { d: "2026-06", f: "anthropic", t: "credit", k: "calc", amt: { fr: "loyers", en: "lease payments" }, v: null, txt: { fr: "Anthropic loue ce matériel au véhicule de crédit privé.", en: "Anthropic leases this hardware from the private credit vehicle." }, s: "ft" },
  /* 17 */ { d: "2026-06", f: "broadcom", t: "credit", k: "fin", amt: { fr: "≈30 Md$", en: "≈$30bn" }, v: 30, txt: { fr: "Broadcom garantit les deux tranches supérieures de la dette si Anthropic cesse de payer.", en: "Broadcom guarantees the two senior tranches of the debt if Anthropic stops paying." }, s: "ft" },
  /* 18 */ { d: "2026-08", f: "google", t: "mineurs", k: "fin", amt: { fr: "jusqu’à 44 Md$", en: "up to $44bn" }, v: 44, txt: { fr: "Google garantit les loyers de 10 projets (2,4 GW) ; il ne comptabilise que 815 M$ de passif.", en: "Google guarantees the leases of 10 projects (2.4 GW); it books only $815M of liabilities." }, s: "ft" },
  /* 19 */ { d: "2026-08", f: "anthropic", t: "mineurs", k: "calc", amt: { fr: "non publié", en: "not disclosed" }, v: null, txt: { fr: "Anthropic loue les data centers de TeraWulf, Cipher et Hut 8.", en: "Anthropic leases the data centres of TeraWulf, Cipher and Hut 8." }, s: "ft" },
  /* 20 */ { d: "2026-08", f: "spacex", t: "cursor", k: "acq", amt: { fr: "60 Md$", en: "$60bn" }, v: 60, txt: { fr: "SpaceX finalise le rachat de Cursor le 14 août.", en: "SpaceX completes the acquisition of Cursor on 14 August." }, s: "cnbcCursor" },
  /* 21 */ { d: "2026-08", f: "cursor", t: "anthropic", k: "calc", amt: { fr: "non publié", en: "not disclosed" }, v: null, txt: { fr: "Cursor continue de proposer Claude ; Anthropic promet d’y consacrer plus de calcul.", en: "Cursor keeps offering Claude; Anthropic promises to devote more compute to it." }, s: "cnbcCursor" },
  /* 22 */ { d: "2026-08", f: "openai", t: "cursor", k: "rup", amt: { fr: "sans montant", en: "no amount" }, v: null, txt: { fr: "OpenAI coupe l’accès de Cursor à ses modèles au 12 novembre (environ 5 % du trafic de Cursor).", en: "OpenAI cuts off Cursor’s access to its models from 12 November (about 5% of Cursor’s traffic)." }, s: "cnbcCursor" },
  /* 23 */ { d: "2026-08", f: "nvidia", t: "spacex", k: "inv", amt: { fr: "≈21 Md$", en: "≈$21bn" }, v: 21, txt: { fr: "Participation issue de 10 Md$ investis dans xAI, convertis en actions SpaceX lors du rachat.", en: "Stake from $10bn invested in xAI, converted into SpaceX shares at the merger." }, s: "wiki" },
  /* 24 */ { d: "2026-08", f: "openai", t: "nvidia", k: "calc", amt: { fr: "≈12 GW", en: "≈12 GW" }, v: null, txt: { fr: "Engagements existants et prévus d’OpenAI en puces Nvidia jusqu’en 2030.", en: "OpenAI’s existing and planned commitments to Nvidia chips through 2030." }, s: "aiNews" },
  /* 25 */ { d: "2026-08", f: "openai", t: "softbank", k: "calc", amt: { fr: "bail de 20 ans", en: "20-year lease" }, v: null, txt: { fr: "OpenAI loue un campus de 10 GW dans l’Ohio, développé par SB Energy.", en: "OpenAI leases a 10 GW campus in Ohio, developed by SB Energy." }, s: "ohio" },
  /* 26 */ { d: "2026-08", f: "nvidia", t: "softbank", k: "fin", amt: { fr: "jusqu’à 105 Md$", en: "up to $105bn" }, v: 105, txt: { fr: "Nvidia garantit le financement du campus de l’Ohio loué par OpenAI.", en: "Nvidia guarantees the financing of the Ohio campus leased by OpenAI." }, s: "afp" },
  /* 27 */ { d: "2026-08", f: "anthropic", t: "nscale", k: "calc", amt: { fr: "jusqu’à 44,6 Md$", en: "up to $44.6bn" }, v: 44.6, txt: { fr: "Infrastructure GPU dédiée au campus Monarch, en quatre tranches ; Nscale n’a pas encore de financement ferme.", en: "Dedicated GPU infrastructure at the Monarch campus, in four tranches; Nscale has no firm financing yet." }, s: "nscale" },
  /* 28 */ { d: "2026-09", f: "anthropic", t: "lambda", k: "calc", amt: { fr: "≈35 Md$", en: "≈$35bn" }, v: 35, txt: { fr: "Anthropic loue de la puissance de calcul à Lambda, au Texas.", en: "Anthropic rents compute from Lambda, in Texas." }, s: "afp" },
  /* 29 */ { d: "2026-09", f: "nvidia", t: "lambda", k: "inv", amt: { fr: "participation", en: "equity stake" }, v: null, txt: { fr: "Nvidia est actionnaire de Lambda, qui installe ses puces avant de les louer.", en: "Nvidia is a shareholder in Lambda, which installs its chips before renting them out." }, s: "afp" },
  /* 30 */ { d: "2026-09", f: "anthropic", t: "spacex", k: "calc", amt: { fr: "jusqu’à 84,5 Md$", en: "up to $84.5bn" }, v: 84.5, txt: { fr: "Montant total des engagements envers SpaceX jusqu’en 2029 dans le prospectus d’Anthropic ; l’écart avec les 45 Md$ n’est pas expliqué.", en: "Total commitments to SpaceX through 2029 in Anthropic’s prospectus; the gap with the $45bn is not explained." }, s: "theinfo" },
  /* 31 */ { d: "2026-10", f: "broadcom", t: "anthropic", k: "fin", amt: { fr: "jusqu’à 42 Md$", en: "up to $42bn" }, v: 42, txt: { fr: "Prêt convertible en actions, pour financer environ un tiers des 125,2 Md$ de location de TPU sur cinq ans.", en: "Loan convertible into shares, to fund about a third of the $125.2bn five-year TPU lease." }, s: "cnbcAvgo" },
  /* 32 */ { d: "2026-10", f: "broadcom", t: "openai", k: "fin", amt: { fr: "jusqu’à 50 Md$", en: "up to $50bn" }, v: 50, txt: { fr: "Financement d’achats de puces sur mesure, en discussion.", en: "Financing for custom chip purchases, under discussion." }, s: "foolAvgo" },
  /* 33 */ { d: "2026-01", f: "apple", t: "google", k: "calc", amt: { fr: "≈1 Md$ par an, non confirmé", en: "≈$1bn a year, unconfirmed" }, v: null, txt: { fr: "Partenariat pluriannuel : la prochaine génération de modèles d’Apple, dont Siri, reposera sur Gemini et le cloud de Google.", en: "Multi-year partnership: Apple’s next generation of models, Siri included, will run on Gemini and Google’s cloud." }, s: "apple" },
  /* 34 */ { d: "2026-02", f: "meta", t: "google", k: "calc", amt: { fr: "plusieurs Md$", en: "several $bn" }, v: null, txt: { fr: "Meta loue des TPU de Google sur plusieurs années pour développer ses prochains modèles.", en: "Meta rents Google TPUs over several years to develop its next models." }, s: "meta" },
  /* 35 */ { d: "2025-10", f: "openai", t: "amd", k: "calc", amt: { fr: "6 GW, dizaines de Md$", en: "6 GW, tens of $bn" }, v: 60, txt: { fr: "OpenAI s’engage à déployer 6 GW de puces AMD, à partir d’1 GW de MI450 au second semestre 2026.", en: "OpenAI commits to deploying 6 GW of AMD chips, starting with 1 GW of MI450 in the second half of 2026." }, s: "toms" },
  /* 36 */ { d: "2026-02", f: "meta", t: "amd", k: "calc", amt: { fr: "jusqu’à 6 GW", en: "up to 6 GW" }, v: null, txt: { fr: "Accord pluriannuel pour jusqu’à 6 GW de GPU AMD, premières livraisons au second semestre 2026.", en: "Multi-year agreement for up to 6 GW of AMD GPUs, first deliveries in the second half of 2026." }, s: "amd8k" },
  /* 37 */ { d: "2026-02", f: "amd", t: "meta", k: "inv", amt: { fr: "jusqu’à 160 M d’actions", en: "up to 160M shares" }, v: null, txt: { fr: "Bons de souscription débloqués par paliers, à mesure que les achats de Meta montent vers 6 GW et que le cours d’AMD franchit certains seuils.", en: "Warrants unlocked in tranches as Meta’s purchases climb towards 6 GW and AMD’s share price crosses set thresholds." }, s: "amd8k" },
  /* 38 */ { d: "2026-07", f: "amd", t: "anthropic", k: "inv", amt: { fr: "jusqu’à 5 Md$", en: "up to $5bn" }, v: 5, txt: { fr: "Investissement d’AMD dans Anthropic.", en: "AMD investment in Anthropic." }, s: "bgov" },
  /* 39 */ { d: "2026-07", f: "anthropic", t: "amd", k: "calc", amt: { fr: "jusqu’à 2 GW", en: "up to 2 GW" }, v: null, txt: { fr: "Anthropic achètera jusqu’à 2 GW de puces MI450 à partir du premier semestre 2027.", en: "Anthropic will buy up to 2 GW of MI450 chips from the first half of 2027." }, s: "bgov" },
  /* 40 */ { d: "2026-03", f: "meta", t: "nebius", k: "calc", amt: { fr: "jusqu’à 27 Md$ sur 5 ans", en: "up to $27bn over 5 years" }, v: 27, txt: { fr: "Capacité Nvidia Vera Rubin à partir de 2027, plus l’achat de la capacité que Nebius n’aura pas vendue à d’autres.", en: "Nvidia Vera Rubin capacity from 2027, plus the purchase of any capacity Nebius has not sold to others." }, s: "nebius" },
  /* 41 */ { d: "2026-04", f: "meta", t: "coreweave", k: "calc", amt: { fr: "21 Md$ (≈35 Md$ au total)", en: "$21bn (≈$35bn in total)" }, v: 21, txt: { fr: "Nouvel engagement de 2027 à 2032, après 14,2 Md$ signés en septembre 2025.", en: "New commitment from 2027 to 2032, after $14.2bn signed in September 2025." }, s: "tnw" },
  /* 42 */ { d: "2026-01", f: "apple", t: "anthropic", k: "calc", amt: { fr: "non publié", en: "not disclosed" }, v: null, txt: { fr: "Apple utilise des versions de Claude sur ses propres serveurs. Pour Siri, Anthropic demandait plusieurs milliards par an ; Apple a choisi Gemini.", en: "Apple runs versions of Claude on its own servers. For Siri, Anthropic asked for several billion a year; Apple chose Gemini." }, s: "appleclaude" },
  /* 43 */ { d: "2025-09", f: "openai", t: "coreweave", k: "calc", amt: { fr: "≈22,4 Md$", en: "≈$22.4bn" }, v: 22.4, txt: { fr: "Trois contrats en 2025 : jusqu’à 11,9 Md$ en mars, 4 Md$ en mai et 6,5 Md$ en septembre.", en: "Three contracts in 2025: up to $11.9bn in March, $4bn in May and $6.5bn in September." }, s: "verdict" },
  /* 44 */ { d: "2026-01", f: "nvidia", t: "coreweave", k: "inv", amt: { fr: "2 Md$", en: "$2bn" }, v: 2, txt: { fr: "Nvidia achète des actions CoreWeave à 87,20 $ et l’aide à trouver terrains et électricité pour plus de 5 GW d’ici 2030.", en: "Nvidia buys CoreWeave shares at $87.20 and helps it find land and power for more than 5 GW by 2030." }, s: "computing" },
  /* 45 */ { d: "2025-09", f: "nvidia", t: "coreweave", k: "calc", amt: { fr: "6,3 Md$", en: "$6.3bn" }, v: 6.3, txt: { fr: "Engagement de Nvidia envers CoreWeave annoncé en 2025.", en: "Nvidia commitment to CoreWeave announced in 2025." }, s: "computing" },
  /* 46 */ { d: "2026-01", f: "coreweave", t: "nvidia", k: "calc", amt: { fr: "non publié", en: "not disclosed" }, v: null, txt: { fr: "Toute l’infrastructure de CoreWeave repose sur du matériel Nvidia (Rubin, Vera).", en: "All of CoreWeave’s infrastructure runs on Nvidia hardware (Rubin, Vera)." }, s: "computing" },
  /* 47 */ { d: "2026-04", f: "anthropic", t: "coreweave", k: "calc", amt: { fr: "non publié", en: "not disclosed" }, v: null, txt: { fr: "Accord pluriannuel, capacité mise en service à partir de fin 2026.", en: "Multi-year agreement, capacity coming online from late 2026." }, s: "pureai" },
  /* 48 */ { d: "2025-09", f: "microsoft", t: "nebius", k: "calc", amt: { fr: "17,4 Md$ sur 5 ans", en: "$17.4bn over 5 years" }, v: 17.4, txt: { fr: "Capacité GPU dédiée à Vineland (New Jersey), jusqu’à 19,4 Md$ avec les options.", en: "Dedicated GPU capacity in Vineland (New Jersey), up to $19.4bn with options." }, s: "dcdmsft" },
  /* 49 */ { d: "2026-03", f: "softbank", t: "openai", k: "inv", amt: { fr: "plus de 60 Md$ d’engagements", en: "over $60bn of commitments" }, v: 60, txt: { fr: "Engagements de SoftBank envers OpenAI, financés en partie par un prêt relais de 40 Md$ sur douze mois (≈6,14 %) signé en mars.", en: "SoftBank’s commitments to OpenAI, partly funded by a twelve-month $40bn bridge loan (≈6.14%) signed in March." }, s: "japantimes" },
];

/**
 * The scroll steps, in reading order. `deals` lists the deals lit at that step,
 * or "all" (overview) or "loops" (the closed loops). In the text, [kind:word]
 * highlights a word in the colour of a deal kind.
 */
/** `year` is the year the step starts in, shown on the timeline rail (none for the overview and the summary). */
export type DealStep = {
  deals: number[] | "all" | "loops";
  year?: number;
  when: T;
  title: T;
  text: Record<Locale, string[]>;
  /** Shown under the text, for a step whose facts are not deals of the register. */
  sources?: { label: string; url: string }[];
};

export const DEAL_STEPS: DealStep[] = [
  {
    deals: "all",
    when: { fr: "Vue d’ensemble", en: "Overview" },
    title: { fr: "{deals} accords, {nodes} acteurs", en: "{deals} deals, {nodes} players" },
    text: {
      fr: ["Chaque flèche va de celui qui [inv:investit], [calc:achète du calcul], [fin:finance ou garantit], [acq:rachète] ou [rup:coupe], vers celui qui reçoit. Les montants sont des engagements de natures différentes : nous ne les additionnons pas."],
      en: ["Each arrow runs from the one who [inv:invests], [calc:buys compute], [fin:finances or guarantees], [acq:acquires] or [rup:cuts off], to the one on the receiving end. The amounts are commitments of different kinds: we do not add them up."],
    },
  },
  {
    deals: [0, 1],
    year: 2023,
    when: { fr: "Septembre – octobre 2023", en: "September – October 2023" },
    title: { fr: "Deux paris", en: "Two bets" },
    text: {
      fr: ["Amazon [inv:investit] jusqu’à 4 milliards dans Anthropic, Google jusqu’à 2 milliards. En échange, Anthropic entraîne ses modèles sur leurs clouds : une partie de l’argent investi revient en achats de calcul."],
      en: ["Amazon [inv:invests] up to $4 billion in Anthropic, Google up to $2 billion. In exchange, Anthropic trains its models on their clouds: part of the money invested comes back as compute purchases."],
    },
  },
  {
    deals: [43, 45, 46, 48, 44],
    year: 2025,
    when: { fr: "Septembre 2025 – janvier 2026", en: "September 2025 – January 2026" },
    title: { fr: "Les neoclouds, bailleurs adossés à Nvidia", en: "Neoclouds, landlords backed by Nvidia" },
    text: {
      fr: [
        "Les labos louent aussi chez de nouveaux acteurs spécialisés. OpenAI [calc:signe] environ 22,4 milliards de contrats avec CoreWeave en 2025 ; Microsoft [calc:loue] 17,4 milliards de capacité sur cinq ans à Nebius.",
        "CoreWeave achète ses puces à Nvidia, qui s’est aussi [calc:engagé] pour 6,3 milliards auprès de lui et en est [inv:actionnaire] (2 milliards de plus en janvier 2026). Première boucle chez un fournisseur de puces : Nvidia ⇄ CoreWeave.",
      ],
      en: [
        "The labs also rent from new specialist players. OpenAI [calc:signs] about $22.4 billion of contracts with CoreWeave in 2025; Microsoft [calc:rents] $17.4 billion of capacity over five years from Nebius.",
        "CoreWeave buys its chips from Nvidia, which has also [calc:committed] $6.3 billion to it and is a [inv:shareholder] ($2 billion more in January 2026). The first loop at a chip supplier: Nvidia ⇄ CoreWeave.",
      ],
    },
  },
  {
    deals: [2, 3, 4, 5, 6, 35],
    year: 2025,
    when: { fr: "Octobre – novembre 2025", en: "October – November 2025" },
    title: { fr: "Le modèle se généralise", en: "The model spreads" },
    text: {
      fr: [
        "Microsoft et Nvidia [inv:investissent] ensemble jusqu’à 15 milliards dans Anthropic, qui [calc:s’engage] en retour sur 30 milliards de cloud Azure.",
        "Côté OpenAI : 250 milliards d’[calc:achats] promis à Microsoft. AMD invente une variante : OpenAI [calc:commande] 6 GW de ses puces, et AMD lui [inv:offre] en échange des bons sur jusqu’à 160 millions de ses actions, environ 10 % de l’entreprise.",
      ],
      en: [
        "Microsoft and Nvidia together [inv:invest] up to $15 billion in Anthropic, which [calc:commits] $30 billion to Azure cloud in return.",
        "On the OpenAI side: $250 billion of [calc:purchases] promised to Microsoft. AMD invents a variant: OpenAI [calc:orders] 6 GW of its chips, and AMD [inv:gives] it warrants on up to 160 million of its shares in return, about 10% of the company.",
      ],
    },
  },
  {
    deals: [7],
    year: 2026,
    when: { fr: "Janvier 2026", en: "January 2026" },
    title: { fr: "Premier accroc", en: "First snag" },
    text: {
      fr: ["Anthropic [rup:coupe] l’accès des ingénieurs de xAI à Claude, qu’ils utilisaient dans l’éditeur de code Cursor : ses conditions interdisent d’aider un concurrent. Retenez Cursor, il revient plus loin."],
      en: ["Anthropic [rup:cuts off] xAI engineers’ access to Claude, which they were using in the Cursor code editor: its terms forbid helping a competitor. Remember Cursor, it comes back later."],
    },
  },
  {
    deals: [33, 34, 42],
    year: 2026,
    when: { fr: "Janvier – février 2026", en: "January – February 2026" },
    title: { fr: "Google vend aussi son modèle et ses puces", en: "Google also sells its model and its chips" },
    text: {
      fr: [
        "Apple [calc:choisit] Gemini et annonce que sa prochaine génération de modèles, dont Siri, reposera sur ce modèle : un partenariat pluriannuel dont le prix n’est pas public, environ 1 milliard par an selon la presse. Un mois plus tard, Meta [calc:loue] des TPU de Google pour plusieurs milliards.",
        "Apple avait aussi négocié avec Anthropic pour Siri. Selon Bloomberg, Anthropic demandait plusieurs milliards par an ; Apple [calc:utilise] toutefois Claude en interne.",
      ],
      en: [
        "Apple [calc:chooses] Gemini and announces that its next generation of models, Siri included, will be built on it: a multi-year partnership whose price is not public, about $1 billion a year according to the press. A month later, Meta [calc:rents] Google TPUs for several billion.",
        "Apple had also negotiated with Anthropic for Siri. According to Bloomberg, Anthropic asked for several billion a year; Apple still [calc:uses] Claude internally.",
      ],
    },
  },
  {
    deals: [36, 37, 38, 39],
    year: 2026,
    when: { fr: "Février – juillet 2026", en: "February – July 2026" },
    title: { fr: "AMD paie ses clients en actions", en: "AMD pays its customers in shares" },
    text: {
      fr: [
        "AMD rejoue sa recette avec Meta : jusqu’à 6 GW de [calc:commandes], et de nouveau des bons sur jusqu’à 160 millions d’actions [inv:offerts] en échange. En juillet, il [inv:investit] jusqu’à 5 milliards dans Anthropic, qui lui [calc:achètera] jusqu’à 2 GW de puces.",
        "La valeur de ces bons dépend du cours d’AMD, qui dépend lui-même des commandes qu’ils rémunèrent.",
      ],
      en: [
        "AMD repeats its recipe with Meta: up to 6 GW of [calc:orders], and once again warrants on up to 160 million shares [inv:given] in return. In July, it [inv:invests] up to $5 billion in Anthropic, which [calc:will buy] up to 2 GW of its chips.",
        "The value of these warrants depends on AMD’s share price, which itself depends on the orders they reward.",
      ],
    },
  },
  {
    deals: [40, 41, 47],
    year: 2026,
    when: { fr: "Mars – juillet 2026", en: "March – July 2026" },
    title: { fr: "Meta, de locataire à loueur", en: "Meta, from tenant to landlord" },
    text: {
      fr: ["Meta [calc:loue] jusqu’à 27 milliards de capacité chez Nebius et porte ses engagements chez CoreWeave à environ 35 milliards. Le même mois, Anthropic [calc:signe] à son tour avec CoreWeave. En juillet, Meta annonce vouloir revendre ses capacités excédentaires, comme SpaceX. Le jour de l’annonce, les actions de CoreWeave et Nebius perdent environ 12 %."],
      en: ["Meta [calc:rents] up to $27 billion of capacity from Nebius and raises its commitments to CoreWeave to about $35 billion. The same month, Anthropic [calc:signs] with CoreWeave too. In July, Meta announces that it wants to resell its spare capacity, like SpaceX. On the day of the announcement, CoreWeave and Nebius shares lose about 12%."],
    },
  },
  {
    deals: [8, 9, 11, 12],
    year: 2026,
    when: { fr: "Avril – mai 2026", en: "April – May 2026" },
    title: { fr: "Changement d’échelle", en: "A change of scale" },
    text: {
      fr: [
        "Anthropic [calc:promet] plus de 100 milliards à AWS sur dix ans, et 200 milliards à Google. Amazon [inv:réinvestit] 25 milliards, Google jusqu’à 40.",
        "Les deux premières boucles se ferment : l’argent de Google et d’Amazon leur revient en commandes.",
      ],
      en: [
        "Anthropic [calc:promises] more than $100 billion to AWS over ten years, and $200 billion to Google. Amazon [inv:reinvests] $25 billion, Google up to $40 billion.",
        "The first two loops close: Google’s and Amazon’s money comes back to them as orders.",
      ],
    },
  },
  {
    deals: [10, 15, 16, 17, 18, 19],
    year: 2026,
    when: { fr: "Avril – août 2026", en: "April – August 2026" },
    title: { fr: "La machine de Google", en: "Google’s machine" },
    text: {
      fr: [
        "Broadcom [calc:achète] 128 milliards de TPU à Google, destinés à Anthropic. Un véhicule de crédit privé (Apollo, Blackstone, Morgan Stanley) en [calc:rachète] un premier lot de 35 milliards et le [calc:loue] à Anthropic. Broadcom [fin:garantit] environ 30 milliards de cette dette.",
        "Il faut aussi des bâtiments. Google [fin:garantit] jusqu’à 44 milliards de loyers d’anciennes fermes de bitcoin, TeraWulf, Cipher et Hut 8, qu’Anthropic [calc:loue]. Au bilan de Google, ce risque pèse 815 millions.",
      ],
      en: [
        "Broadcom [calc:buys] $128 billion of TPUs from Google, destined for Anthropic. A private credit vehicle (Apollo, Blackstone, Morgan Stanley) [calc:buys] a first $35 billion batch and [calc:leases] it to Anthropic. Broadcom [fin:guarantees] about $30 billion of that debt.",
        "Buildings are needed too. Google [fin:guarantees] up to $44 billion of leases on former bitcoin farms, TeraWulf, Cipher and Hut 8, which Anthropic [calc:rents]. On Google’s balance sheet, that risk weighs $815 million.",
      ],
    },
  },
  {
    deals: [13, 14, 30],
    year: 2026,
    when: { fr: "Mai – septembre 2026", en: "May – September 2026" },
    title: { fr: "Le rival devient bailleur", en: "The rival becomes the landlord" },
    text: {
      fr: [
        "Anthropic [calc:loue] les data centers de Memphis que xAI, absorbé par SpaceX, avait construits pour Grok : 1,25 milliard par mois jusqu’en 2029, jusqu’à 84,5 milliards au total, résiliable des deux côtés avec 90 jours de préavis.",
        "Quelques semaines plus tôt, un mémo interne de xAI jugeait « manifestement faible » l’utilisation de ses GPU. Malgré ces loyers, la division IA de SpaceX a perdu 1,5 milliard au deuxième trimestre. Et les turbines à gaz installées à Memphis pour Grok alimentent désormais Claude.",
        "Google y [calc:loue] aussi 110 000 GPU Nvidia, pour 920 millions par mois (environ 30 milliards jusqu’en 2029), afin de servir Gemini Enterprise. Google vend donc ses propres puces à ses concurrents, et loue celles de Nvidia chez un concurrent pour son propre modèle.",
      ],
      en: [
        "Anthropic [calc:leases] the Memphis data centres that xAI, now part of SpaceX, had built for Grok: $1.25 billion a month until 2029, up to $84.5 billion in total, terminable by either side on 90 days’ notice.",
        "A few weeks earlier, an internal xAI memo had called the use of its GPUs “clearly low”. Despite these rents, SpaceX’s AI division lost $1.5 billion in the second quarter. And the gas turbines installed in Memphis for Grok now power Claude.",
        "Google also [calc:rents] 110,000 Nvidia GPUs there, for $920 million a month (about $30 billion until 2029), to serve Gemini Enterprise. So Google sells its own chips to its competitors, and rents Nvidia’s from a competitor for its own model.",
      ],
    },
  },
  {
    deals: [20, 21, 22],
    year: 2026,
    when: { fr: "Août 2026", en: "August 2026" },
    title: { fr: "La boucle la plus étrange", en: "The strangest loop" },
    text: {
      fr: [
        "SpaceX [acq:rachète] Cursor pour 60 milliards. OpenAI [rup:coupe] l’accès de Cursor à ses modèles. Anthropic, lui, continue d’y [calc:vendre] Claude.",
        "SpaceX paie donc Anthropic pour Claude, pendant qu’Anthropic paie SpaceX pour ses GPU.",
      ],
      en: [
        "SpaceX [acq:acquires] Cursor for $60 billion. OpenAI [rup:cuts off] Cursor’s access to its models. Anthropic keeps [calc:selling] Claude there.",
        "So SpaceX pays Anthropic for Claude, while Anthropic pays SpaceX for its GPUs.",
      ],
    },
  },
  {
    deals: [23, 24, 25, 26, 49],
    year: 2026,
    when: { fr: "Août 2026", en: "August 2026" },
    title: { fr: "OpenAI et Nvidia", en: "OpenAI and Nvidia" },
    text: {
      fr: [
        "OpenAI [calc:s’engage] sur environ 12 GW de puces Nvidia et [calc:loue] pour 20 ans un campus de 10 GW dans l’Ohio, développé par SB Energy. Nvidia en [fin:garantit] le financement, jusqu’à 105 milliards.",
        "Nvidia détient aussi environ 21 milliards d’actions SpaceX, issues de son [inv:investissement] dans xAI.",
        "Pour tenir plus de 60 milliards d’engagements envers OpenAI, SoftBank [inv:investit] à crédit : un prêt relais de 40 milliards sur douze mois, signé en mars. OpenAI lui loue ensuite le campus de l’Ohio : la boucle se ferme.",
      ],
      en: [
        "OpenAI [calc:commits] to about 12 GW of Nvidia chips and [calc:leases] a 10 GW campus in Ohio for 20 years, developed by SB Energy. Nvidia [fin:guarantees] its financing, up to $105 billion.",
        "Nvidia also holds about $21 billion of SpaceX shares, from its [inv:investment] in xAI.",
        "To meet more than $60 billion of commitments to OpenAI, SoftBank [inv:invests] on credit: a twelve-month $40 billion bridge loan, signed in March. OpenAI then leases the Ohio campus from it: the loop closes.",
      ],
    },
  },
  {
    deals: [27, 28, 29],
    year: 2026,
    when: { fr: "Août – septembre 2026", en: "August – September 2026" },
    title: { fr: "D’autres bailleurs", en: "Other landlords" },
    text: {
      fr: ["Anthropic [calc:loue] jusqu’à 44,6 milliards chez Nscale et environ 35 milliards chez Lambda, un neocloud dont Nvidia est [inv:actionnaire]. Nscale indique ne pas encore avoir de financement ferme pour ce contrat."],
      en: ["Anthropic [calc:rents] up to $44.6 billion from Nscale and about $35 billion from Lambda, a neocloud in which Nvidia is a [inv:shareholder]. Nscale says it does not yet have firm financing for this contract."],
    },
  },
  {
    deals: [31, 32],
    year: 2026,
    when: { fr: "Octobre 2026", en: "October 2026" },
    title: { fr: "Le fournisseur devient banquier", en: "The supplier becomes the banker" },
    text: {
      fr: ["Broadcom [fin:prête] jusqu’à 42 milliards à Anthropic, convertibles en actions, pour louer des puces Broadcom. Il discute jusqu’à 50 milliards de [fin:financement] pour OpenAI."],
      en: ["Broadcom [fin:lends] up to $42 billion to Anthropic, convertible into shares, to lease Broadcom chips. It is discussing up to $50 billion of [fin:financing] for OpenAI."],
    },
  },
  {
    deals: [43, 44, 45, 46, 47, 25, 26, 49],
    year: 2026,
    when: { fr: "14 – 20 octobre 2026", en: "14 – 20 October 2026" },
    title: { fr: "Le crédit se tend", en: "Credit tightens" },
    text: {
      fr: [
        "Les maillons les plus endettés cèdent les premiers. Le 14 octobre, l’action CoreWeave perd 15,5 % et ses obligations rapportent près de 15 %, le rendement d’un emprunteur jugé risqué. Sa dette approche 50 milliards ; Nvidia, son fournisseur, en est actionnaire.",
        "Côté OpenAI, SB Energy retire ou suspend son introduction en Bourse, et le risque de crédit de SoftBank atteint son plus haut depuis quatre ans.",
      ],
      en: [
        "The most indebted links give way first. On 14 October, CoreWeave’s share price falls 15.5% and its bonds yield close to 15%, the yield of a borrower seen as risky. Its debt is approaching $50 billion; Nvidia, its supplier, is a shareholder.",
        "On the OpenAI side, SB Energy withdraws or suspends its IPO, and SoftBank’s credit risk hits its highest in four years.",
      ],
    },
    sources: [
      { label: "CNBC", url: "https://www.cnbc.com/2026/10/14/coreweave-stock-bond-yields-ai-debt.html" },
      { label: "Reuters", url: "https://www.thehindubusinessline.com/info-tech/openai-seeks-30-billion-funding-at-14-trillion-valuation-ahead-of-anthropic-ipo/article71603118.ece" },
      { label: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-10-20/softbank-group-credit-risk-hits-4-year-high-on-ai-funding-strain" },
    ],
  },
  {
    deals: "loops",
    when: { fr: "Bilan", en: "Summary" },
    title: { fr: "{loops} boucles fermées", en: "{loops} closed loops" },
    text: {
      fr: ["Dans chacune, l’argent versé par un acteur lui revient, directement ou en passant par un tiers. Si un maillon cesse de payer, le revenu de l’autre disparaît en même temps."],
      en: ["In each one, the money a player pays out comes back to it, directly or through a third party. If one link stops paying, the other’s revenue disappears at the same time."],
    },
  },
];

/** Closed loops of two or three players along money flows (cut-offs excluded). */
export function findLoops() {
  const flows = DEALS.map((deal, id) => ({ ...deal, id })).filter((deal) => deal.k !== "rup");
  const out: Record<string, typeof flows> = {};
  for (const deal of flows) (out[deal.f] ??= []).push(deal);
  const loops: { nodes: string[]; deals: number[] }[] = [];
  const seen = new Set<string>();
  for (const a in out)
    for (const e1 of out[a]) {
      const b = e1.t;
      for (const e2 of out[b] ?? []) {
        if (e2.t === a) {
          const key = [a, b].sort().join("|");
          if (seen.has(key)) continue;
          seen.add(key);
          const both = flows.filter((d) => (d.f === a && d.t === b) || (d.f === b && d.t === a));
          loops.push({ nodes: [a, b], deals: both.map((d) => d.id) });
        } else if (e2.t !== b) {
          const c = e2.t;
          for (const e3 of out[c] ?? []) {
            if (e3.t !== a) continue;
            const key = [a, b, c].sort().join("|");
            if (seen.has(key)) continue;
            seen.add(key);
            loops.push({ nodes: [a, b, c], deals: [e1.id, e2.id, e3.id] });
          }
        }
      }
    }
  return loops;
}

const MONTHS: Record<Locale, string[]> = {
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export const dealMonth = (ym: string, lang: Locale) => `${MONTHS[lang][Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`;

/** Deal indices for the register, newest first (ties keep their original order). */
export const registerRows = () => DEALS.map((_, i) => i).sort((a, b) => DEALS[b].d.localeCompare(DEALS[a].d) || a - b);
