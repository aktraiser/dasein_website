import type { Locale } from "@/lib/i18n";
import type { Article } from "./articles";

/** "Data centers : quand la politique devient le risque": the 2026 midterms and the AI build-out. */
export const midtermsArticle: Record<Locale, Article> = {
  fr: {
    title: "Data centers : quand la politique devient le risque",
    lead: "Les midterms du 3 novembre 2026 n’ont pas créé les fragilités financières des infrastructures IA. Elles révèlent un risque réglementaire susceptible de les amplifier, au moment où certains développeurs dépendent de financements coûteux et de revenus futurs encore incertains.",
    updated: "Publié le 5 novembre 2026",
    summaryLabel: "En bref",
    summary: [
      "Le Texas, qui porte un quart de la capacité prévue aux États-Unis, a élu une gouverneure favorable à un moratoire, alors que les permis de la TCEQ y sont déjà gelés jusqu’à l’audit d’ERCOT.",
      "Le risque n’est pas l’arrêt mais le retard : les intérêts d’une dette de plus de 500 Md$ courent pendant que les loyers qui devaient les couvrir reculent.",
      "Le ralentissement trie : la capacité déjà raccordée prend de la valeur, les développeurs et neoclouds endettés sans locataire signé portent le risque."
    ],
    blocks: [
      {
        type: "note",
        text: "Sources vérifiées jusqu’au 5 novembre 2026 au soir. Résultats électoraux, cours de bourse et statuts de permis évoluent d’un jour à l’autre. Article rédigé à titre d’information, sans conseil d’investissement."
      },
      {
        type: "p",
        text: "Les démocrates ont pris la Chambre et le Sénat, le Texas a élu une gouverneure favorable à un moratoire, et 33 des 45 scrutins locaux sur les data centers ont voté des restrictions (Engadget)."
      },
      {
        type: "p",
        text: "Dès le lendemain, les marchés ont réévalué les entreprises exposées à la construction des infrastructures IA : Vertiv a perdu 12,9 %, Vistra 13,8 % et Quanta 11,7 % (CNT Trading). D’autres nouvelles ont pesé le même jour, et ces baisses ne mesurent pas à elles seules l’effet du vote. Le risque n’est pas qu’un secteur s’arrête. C’est qu’il ralentisse alors que sa dette, elle, continue de courir."
      },
      {
        type: "p",
        text: "Cet article prolonge « Le mégawatt et le degré » (24 septembre 2026), qui montrait comment l’écart entre la vitesse de l’IA et celle du réseau se comble par le gaz, le contournement du réseau public et la facture envoyée aux ménages. Cette facture, les électeurs viennent de la refuser. Il retrace le choc texan, mesure son ampleur nationale, prend Fermi America comme cas d’école, puis compare la situation à 2007, suit l’onde de choc jusqu’aux fournisseurs européens et montre qui sortirait gagnant du tri."
      },
      {
        type: "related",
        href: "/articles/le-megawatt-et-le-degre",
        label: "À lire d’abord",
        title: "Le mégawatt et le degré",
        text: "L’écart entre la vitesse de l’IA et celle du réseau, et ce qui le comble : le gaz, le contournement du réseau public, la facture des ménages."
      },
      {
        type: "h",
        id: "texas",
        text: "Le Texas, épicentre du basculement"
      },
      {
        type: "p",
        text: "Le marché le plus dynamique des États-Unis vient d’élire des responsables qui veulent le freiner. Gina Hinojosa (D) a battu le gouverneur sortant Greg Abbott, James Talarico (D) a battu Ken Paxton au Sénat, et les démocrates prennent la Chambre du Texas pour la première fois depuis 24 ans (MIT Technology Review). Le Texas porte à lui seul environ un quart de la capacité de data centers prévue aux États-Unis, selon Goldman Sachs (The Next Web)."
      },
      {
        type: "p",
        text: "Le frein était déjà serré avant le vote. Le 21 septembre, Abbott a ordonné à la TCEQ, le régulateur environnemental, de ne délivrer aucun permis aux data centers tant que l’audit d’ERCOT n’est pas terminé (Office of the Governor). La TCEQ a gelé tous les permis air et eau des infrastructures qui alimentent directement des data centers, centrales sur site comprises (Houston Public Media)."
      },
      {
        type: "p",
        text: "Hinojosa veut aller plus loin. Elle qualifiait la pause d’Abbott de « pause électorale » et a fait campagne pour un moratoire (Daily Caller), à prolonger jusqu’à l’adoption de règles plus strictes sur l’IA (CNN). Son moratoire porterait sur les nouveaux permis et exempterait, selon les informations disponibles, les projets déjà en chantier (CNBC). Mais un gouverneur peut surtout retarder des autorisations : un moratoire durable ou une réforme fiscale passent par la loi (SemiAnalysis)."
      },
      {
        type: "figure",
        src: "/articles/midterms/texas-capitol.jpg",
        alt: "Le Capitole du Texas à Austin, bâtiment en granit rose surmonté d’un dôme, sous un ciel bleu",
        caption: "Le Capitole du Texas, à Austin. C’est ici que siège la législature qui devra voter un moratoire durable ou une réforme fiscale : le gouverneur, seul, peut surtout retarder des permis. Photo LoneStarMike, Wikimedia Commons, CC BY 3.0."
      },
      {
        type: "p",
        text: "La carte électorale nuance le choc. Ellis County, en tête des demandes de permis, et les comtés de l’ouest où se concentrent les projets ont voté républicain. Les décisions se partagent entre villes, comtés et État, et les syndicats du BTP qui ont soutenu les démocrates pourraient freiner un moratoire (MIT Technology Review)."
      },
      {
        type: "h",
        id: "vague",
        text: "Une vague nationale et bipartisane"
      },
      {
        type: "p",
        text: "Le rejet dépasse le Texas et traverse les deux partis. Selon un sondage de sortie des urnes de NBC, 56 % des électeurs disent que l’IA et les data centers ont été un facteur décisif ou important de leur vote pour le Congrès (Engadget). Dès mars, Gallup mesurait 71 % d’opposition à un data center IA près de chez soi, plus que pour une centrale nucléaire (Gallup)."
      },
      {
        type: "table",
        head: [
          "Élu ou candidat",
          "État, poste",
          "Position sur les data centers",
          "Résultat"
        ],
        rows: [
          [
            "Sherrod Brown (D)",
            "Ohio, Sénat",
            "Fin des avantages fiscaux, data centers qui paient leur électricité (Fortune)",
            "Élu, +5 points"
          ],
          [
            "Abdul El-Sayed (D)",
            "Michigan, Sénat",
            "Pas de hausse des tarifs, normes strictes (Fortune)",
            "Élu"
          ],
          [
            "Annie Andrews (D)",
            "Caroline du Sud, Sénat",
            "Moratoire de deux ans (TIME)",
            "Élue"
          ],
          [
            "James Talarico (D)",
            "Texas, Sénat",
            "Attaques contre le soutien de Paxton aux data centers (The Hill)",
            "Élu"
          ],
          [
            "Amish Shah (D)",
            "Arizona, Chambre (1re circonscription)",
            "Promet d’empêcher leur construction (TIME)",
            "Élu, course attribuée par l’AP le 5 novembre (KTAR)"
          ],
          [
            "Scott Colom (D)",
            "Mississippi, Sénat",
            "Interdiction temporaire (The Intercept)",
            "Non attribué : Colom en tête de 1 813 voix jeudi soir (Washington Post)"
          ],
          [
            "Mike Rogers (R)",
            "Michigan, Sénat",
            "Moratoire d’un an (Detroit News/Yahoo)",
            "Battu"
          ],
          [
            "Ken Paxton (R)",
            "Texas, Sénat",
            "Plan en quatre points pour freiner la croissance (Fox News)",
            "Battu"
          ]
        ]
      },
      {
        type: "p",
        text: "Les gouverneurs comptent autant que le Congrès. Les démocrates ont gagné le Nevada, la Géorgie, l’Ohio et le Texas sur des promesses de règles plus strictes. À partir de janvier, les États dirigés par des démocrates favorables aux moratoires porteront environ 45 % de la capacité prévue, selon Goldman Sachs (CNN)."
      },
      {
        type: "p",
        text: "Au niveau fédéral, le frein est plus incertain. Bernie Sanders et Alexandria Ocasio-Cortez ont déposé en mars un moratoire fédéral sur les data centers IA (Sanders). Mais les analystes doutent qu’une loi bloquante soit adoptée, Trump pouvant y opposer son veto (Reuters via The Standard)."
      },
      {
        type: "h",
        id: "audit",
        text: "Audit : Stargate et les autres projets texans"
      },
      {
        type: "p",
        text: "Quatre campus en chantier attendent des permis gaz gelés, pour plus de 14 GW : Nexus Hubbard (Anthropic), l’extension de Stargate Abilene, celle de Fermi, et Goodnight (Crusoe pour Google) (Nameplate Report). La TCEQ a aussi suspendu au moins 17 permis d’eaux pluviales et usées sur des sites de data centers (Nameplate Report)."
      },
      {
        type: "table",
        head: [
          "Projet",
          "Développeur, locataire",
          "Comté",
          "Taille",
          "Statut",
          "Exposition au gel"
        ],
        rows: [
          [
            "Fermi Project Matador",
            "Fermi America",
            "Carson",
            "6 GW autorisés, ~5 GW demandés",
            "Phase 1 en chantier",
            "Extension gelée"
          ],
          [
            "GW Ranch",
            "Amazon",
            "Pecos",
            "Centrale de 7,65 GW",
            "En chantier (dcmap.us)",
            "Non documentée"
          ],
          [
            "Nexus Hubbard",
            "Nexus Data Centers, surtout Anthropic",
            "Hill",
            "6,4 GW",
            "En chantier (MIT Technology Review)",
            "Permis gaz gelé"
          ],
          [
            "Stargate Frontier",
            "Vantage, Oracle, OpenAI",
            "Shackelford",
            "1,82 GW",
            "En chantier, livraison prévue au 1er semestre 2027 (stargate.how)",
            "Non documentée"
          ],
          [
            "Stargate Abilene",
            "Crusoe, Oracle, OpenAI",
            "Taylor",
            "~1,2 GW",
            "En partie en service, 42 % livrés au 29 août (stargate.how)",
            "Extension gaz gelée"
          ],
          [
            "Stargate Milam",
            "SB Energy, SoftBank, OpenAI",
            "Milam",
            "1,2 GW",
            "Bail signé, premiers bâtiments en chantier (stargate.how)",
            "Raccordé à ERCOT, donc soumis à l’audit"
          ],
          [
            "Meta El Paso",
            "Meta",
            "El Paso",
            "1 GW",
            "En chantier, mise en service en 2028 (Apollo Technical)",
            "Non documentée"
          ],
          [
            "Crusoe Abilene pour Microsoft",
            "Crusoe, Microsoft",
            "Taylor",
            "900 MW",
            "En chantier, 2027 (Apollo Technical)",
            "Non documentée"
          ],
          [
            "Goodnight",
            "Crusoe, Google",
            "Armstrong",
            "900 MW",
            "En chantier (Apollo Technical)",
            "Permis gaz gelé"
          ]
        ]
      },
      {
        type: "p",
        text: "Les demandes en attente sont d’un autre ordre de grandeur. ERCOT suit 474,7 GW de demandes de raccordement de grosses charges, dont 420,8 GW de data centers, soit plus de cinq fois le pic historique du réseau (POWER Magazine). Seuls 66,4 GW sont provisoirement retenus dans le premier lot d’étude, et 302,2 GW en sont exclus (Forbes)."
      },
      {
        type: "p",
        text: "Une grande partie de cette file est spéculative. BNEF ne suit que 50 GW de projets texans sérieux et prévoit 17 GW installés d’ici 2030 ; l’audit pourrait retarder 49,8 GW et coûter jusqu’à 15 Md$ aux projets (POWER Magazine). ERCOT doit rendre son rapport d’audit le 10 décembre, mais ce rapport ne rouvre rien à lui seul (Nameplate Report)."
      },
      {
        type: "p",
        text: "Les chantiers lancés ont souvent leurs autorisations ; ce sont les projets encore dans la file qui sont bloqués, car ils ne démarrent qu’avec un engagement ferme d’ERCOT (REjournals). Pour Stargate, le risque porte donc surtout sur les extensions et le raccordement, pas sur les bâtiments déjà en construction."
      },
      {
        type: "h",
        id: "fermi",
        text: "Fermi et Project Matador, un cas d’école"
      },
      {
        type: "p",
        text: "La première phase de Matador est autorisée, son extension est gelée. Le campus de Fermi America, près d’Amarillo, vise 11 GW d’électricité privée. La TCEQ lui a accordé le 25 février 2026 un permis Clean Air pour 6 GW au gaz (Fermi via Placera). La demande suivante, environ 5 GW déposés le 27 mars (Barchart), est explicitement prise dans le gel d’Abbott (Texas Dispatch)."
      },
      {
        type: "p",
        text: "Être autonome en énergie ne protège pas. Fermi produit son électricité sur place, avec un complexe de 2,6 GW prévu avec Hillcore (Energy Monitor). Le gel touche pourtant les projets autonomes comme les autres (Forbes)."
      },
      {
        type: "p",
        text: "Washington a accéléré le nucléaire, pas le gaz. Le projet, d’abord baptisé « President Donald J. Trump Advanced Energy and Intelligence Campus » dans sa demande de licence (NRC), est le premier d’un programme pilote de la NRC qui vise à réduire de moitié la durée de l’examen environnemental (NucNet), et la NRC a recommandé à titre préliminaire, le 9 octobre, d’accorder la licence pour quatre réacteurs (Headwaters Wire). Mais ces réacteurs n’arriveraient pas avant 2031-2032 ; d’ici là, Matador tourne au gaz, dont les permis relèvent du Texas, là où Washington n’a pas la main. Le projet conçu pour profiter de l’accélération fédérale bute sur l’échelon local."
      },
      {
        type: "p",
        text: "Le gaz ne manque pas, l’eau si. Le gaz du bassin permien remonte avec le pétrole, même quand il ne vaut rien : faute de gazoducs, son prix au hub de Waha est resté négatif 134 jours d’affilée en 2026 (VanEck). Le goulot n’est donc pas la ressource, mais le permis de la brûler. L’eau, elle, est une contrainte physique : le Panhandle dépend de l’aquifère d’Ogallala, en déclin, et le bassin autour de Matador est classé en stress hydrique extrêmement élevé (Compute Atlas). Fermi promet un circuit fermé pour ses serveurs, mais ses centrales à gaz devront aussi se refroidir, et l’État poursuit désormais les data centers qui ne déclarent pas leur consommation d’eau (Office of the Governor). L’air et l’eau, plus que l’énergie, sont les deux points où la politique a resserré l’étau."
      },
      {
        type: "figure",
        src: "/articles/midterms/permian-iss.jpg",
        alt: "Vue de l’espace d’une plaine quadrillée de pistes et de plateformes de puits, avec une ville au centre et des cercles verts d’irrigation en bas et à droite",
        caption: "Le bassin permien vu de la Station spatiale internationale, autour de Denver City, au sud-ouest de Lubbock. Chaque petit carré clair est une plateforme de puits ; les cercles verts sont des champs irrigués par pivot, qui pompent dans l’aquifère d’Ogallala. Le gaz et l’eau se disputent le même sol. Photo NASA (ISS005-E-9984, 2002), domaine public."
      },
      {
        type: "p",
        text: "Le risque commercial existait avant le vote, et indépendamment de lui. Le bail de 6,5 Md$ sur 15 ans signé avec TensorWave en août (Motley Fool) ne prend effet qu’après des conditions de clôture, dont des garanties et un financement de projet suffisant pour construire. La date de clôture avait déjà été repoussée au 31 octobre (Fermi via Newswire). Elle est passée sans prolongation ni clôture : le bail n’est donc pas en vigueur, même si aucune des deux parties ne l’a résilié (communiqué de Fermi, 3 novembre). AMD a apporté une garantie de crédit pour la phase 1 en octobre (Motley Fool). Rick Perry, cofondateur, a perdu son siège au conseil fin octobre (Texas Tribune). C’est l’accumulation des deux risques, politique et commercial, qui rend Fermi fragile."
      },
      {
        type: "p",
        text: "La bourse a sanctionné les deux à la fois. L’action FRMI a perdu 10,8 % le 4 novembre (MarketBeat), puis environ 15 % le 5 novembre, autour de 1,54 $ (Google Finance). Elle avait déjà perdu 72 % depuis le début de l’année au 2 novembre (Motley Fool). Ses résultats du 12 novembre seront le prochain test."
      },
      {
        type: "h",
        id: "dette",
        text: "La dette, elle, ne s’arrête pas"
      },
      {
        type: "p",
        text: "Plus de 500 Md$ de dette financent déjà les data centers IA, dont environ 200 Md$ en dette privée, selon Bloomberg (TechRadar). Morgan Stanley attend que la dette privée fournisse plus de la moitié des 1 500 Md$ nécessaires d’ici 2028 (Reuters)."
      },
      {
        type: "p",
        text: "Le mécanisme qui rend un ralentissement dangereux :"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Des structures ad hoc.",
            text: "Les projets sont portés par des structures ad hoc (SPV), souvent hors du bilan des grands groupes. Le campus Hyperion de Meta est détenu à 80 % par Blue Owl (TechRadar)."
          },
          {
            term: "2. Des intérêts dès le chantier.",
            text: "Les intérêts courent dès le chantier, mais les remboursements dépendent des loyers futurs."
          },
          {
            term: "3. Un permis gelé.",
            text: "Un permis gelé recule ces loyers sans arrêter les intérêts : le projet coûte plus cher et rapporte plus tard."
          },
          {
            term: "4. Un refinancement.",
            text: "Il faut alors se refinancer, dans un marché qui se ferme."
          }
        ]
      },
      {
        type: "p",
        text: "Ordre de grandeur : un projet de 5 Md$ financé à 8 % supporte environ 33 M$ de charges d’intérêts par mois."
      },
      {
        type: "table",
        head: [
          "Retard",
          "Intérêts courus pendant le retard"
        ],
        rows: [
          [
            "3 mois",
            "100 M$"
          ],
          [
            "6 mois",
            "200 M$"
          ],
          [
            "12 mois",
            "400 M$"
          ]
        ],
        caption: "Simulation illustrative, à capital constant et intérêts simples. Ce ne sont pas les chiffres de Fermi."
      },
      {
        type: "p",
        text: "Ce n’est pas un surcoût net : une partie de ces intérêts aurait couru de toute façon. Le coût du retard tient au décalage des loyers qui devaient les couvrir, et aux frais d’un éventuel refinancement. À l’échelle du Texas, BNEF estime que l’audit pourrait coûter jusqu’à 15 Md$ aux projets (POWER Magazine)."
      },
      {
        type: "p",
        text: "Les prêteurs montrent déjà des signes de tension. La Banque d’Angleterre interroge les banques sur les prêts accordés sans locataire signé (Bloomberg). HSBC cherche à couvrir sa dette data centers par une assurance-crédit (Bloomberg), et le coût de l’assurance contre les défauts de la tech bat des records (Insurance Journal). Selon Morgan Stanley, l’émission de dette liée à l’IA est tombée à 23 Md$ en septembre, moins de la moitié du mois d’août ; la banque cite notamment les doutes sur la rentabilité et l’opposition politique aux data centers (Investing.com)."
      },
      {
        type: "p",
        text: "Le risque remonte jusqu’aux épargnants. La dette privée est financée en partie par des assureurs et des fonds de pension, comme Athene, l’assureur de 470 Md$ contrôlé par Apollo (Deccan Herald)."
      },
      {
        type: "related",
        href: "/articles/le-gigawatt-et-le-dollar",
        label: "À lire aussi",
        title: "Le gigawatt et le dollar",
        text: "Qui finance les gigawatts de l’IA, avec quel argent, et qui porte le risque si les revenus promis n’arrivent pas."
      },
      {
        type: "h",
        id: "2007",
        text: "2007 et 2026 : une analogie de fragilité, pas un précédent"
      },
      {
        type: "p",
        text: "Dans les deux cas, une dette massive repose sur une hypothèse économique qui peut devenir intenable. Avant 2008, c’était la hausse continue des prix immobiliers, qui justifiait des prêts risqués ensuite titrisés ; la hausse des taux n’a fait qu’accélérer les défauts. En 2026, c’est l’arrivée régulière des autorisations et des loyers. Jefferies juge que les data centers reposent sur les engagements futurs des locataires, comme l’immobilier avant 2008 (BigGo Finance)."
      },
      {
        type: "table",
        head: [
          "",
          "Subprimes (2006-2008)",
          "Data centers IA (2026)"
        ],
        rows: [
          [
            "Ce qui fragilise l’hypothèse",
            "Prêts risqués, défauts et titrisation, aggravés par la hausse des taux de la Fed (1 % en 2004, 5,25 % en 2006)",
            "Réglementaire : gel des permis, moratoires, fin des avantages fiscaux"
          ],
          [
            "Rôle des midterms",
            "Nov. 2006 : les démocrates prennent le Congrès, puis gèrent la crise",
            "Nov. 2026 : les élus peuvent eux-mêmes déclencher le ralentissement"
          ],
          [
            "Portée du choc",
            "Toute l’économie, via le coût du crédit",
            "Un secteur et des États ciblés, environ 45 % de la capacité prévue"
          ],
          [
            "Dette hors bilan",
            "Véhicules de titrisation des banques",
            "SPV des hyperscalers et dette privée"
          ],
          [
            "Amplificateur",
            "CDO, CDO de CDO, CDS qu’AIG ne pouvait pas payer",
            "Rien de comparable signalé (The State of AI)"
          ],
          [
            "Actif sous-jacent",
            "Maisons, durables",
            "Data centers conçus pour une génération de puces, vite obsolètes"
          ]
        ]
      },
      {
        type: "p",
        text: "La différence la plus nette est la nature du choc. En 2007, des millions de ménages ont cessé de rembourser, progressivement. En 2026, une seule décision peut bloquer d’un coup des projets de plusieurs milliards : un risque concentré, soudain, et difficile à modéliser pour un prêteur."
      },
      {
        type: "p",
        text: "2007 éclaire la fragilité, sans annoncer une nouvelle crise. Aucune chaîne de contagion comparable à 2008 n’est démontrée. Le stress reste localisé chez les emprunteurs les plus faibles : près de la moitié des obligations de data centers émises en 2026 sont spéculatives (Forbes), et les neoclouds endettés décrochent (voir plus bas). Les grandes banques sont peu concentrées sur les data centers (Chicago Fed) et résistent au test de choc du FMI (FMI)."
      },
      {
        type: "p",
        text: "Si contagion il y a, elle passerait hors des banques : par les SPV, financées à 90 % par la dette (Kansas City Fed), par la dette privée, les assureurs et les fonds de pension, plus illiquides, et par les financements circulaires entre acteurs de l’IA : le FMI a recensé 14 opérations depuis 2023, soit environ 300 Md$ d’actions et 650 Md$ de dette contre 1 400 Md$ de revenus promis (FMI, rapport sur la stabilité financière). L’endettement lié à l’IA a crû d’environ 1,3 point de PIB en trois ans : le parallèle le plus juste est peut-être celui des télécoms de 2000, plus que celui des subprimes (Perspective on Risk)."
      },
      {
        type: "h",
        id: "europe",
        text: "Toute une chaîne industrielle exposée, jusqu’en Europe"
      },
      {
        type: "p",
        text: "Un gigawatt de data center IA représente environ 43 Md$ d’équipement, à 42,7 M$ par MW en 2026. Les serveurs et le réseau en font 85 % : Nvidia, AMD, Dell, Supermicro, TSMC, SK hynix. Le reste va à l’électricité, au froid et au bâtiment, là où les Européens sont forts : Schneider Electric, Legrand, Siemens Energy, Hitachi Energy en Suède, les moteurs mtu, Stulz, Vinci ou Skanska (décompte de BofA Global Research, repris par l’article « Où tournent les modèles, en Europe », 24 octobre 2026)."
      },
      {
        type: "p",
        text: "Les États-Unis remplissent les carnets de commandes. Ils pèsent environ 78 % de la capacité de calcul IA mondiale, contre 5 % pour l’Europe (Bruegel, même article). Plusieurs fournisseurs européens ont agrandi leurs usines en 2025-2026 en citant les data centers, des transformateurs d’Hitachi Energy à Ludvika aux onduleurs de Socomec à Benfeld."
      },
      {
        type: "p",
        text: "La bourse a vendu les fournisseurs dès le 4 novembre :"
      },
      {
        type: "table",
        head: [
          "Valeur",
          "Activité",
          "Mouvement",
          "Source"
        ],
        rows: [
          [
            "Modine",
            "Refroidissement",
            "Environ –24 % en séance",
            "Yahoo Finance"
          ],
          [
            "Sterling Infrastructure",
            "Construction",
            "Environ –19 % en séance",
            "Yahoo Finance"
          ],
          [
            "Vistra",
            "Production d’électricité",
            "–13,8 %",
            "CNT Trading"
          ],
          [
            "Vertiv",
            "Alimentation et froid",
            "–12,9 %",
            "CNT Trading"
          ],
          [
            "Quanta Services",
            "Réseaux électriques",
            "–11,7 %",
            "CNT Trading"
          ],
          [
            "Siemens Energy",
            "Turbines, réseaux",
            "–5,9 %",
            "Ad-hoc News"
          ],
          [
            "Indice des semi-conducteurs (SOX)",
            "Puces",
            "–3,1 %",
            "ChainCatcher"
          ]
        ]
      },
      {
        type: "p",
        text: "L’Europe a mieux résisté. L’Euro Stoxx 50 a gagné près de 2 % le 4 novembre, porté par les banques (XTB). Legrand a même pris 3,4 % le 5 novembre après avoir relevé ses objectifs, en citant la demande des data centers (ADVFN)."
      },
      {
        type: "p",
        text: "Les commandes, elles, n’ont pas encore bougé. Les ventes de Vertiv ont bondi de 61 % au troisième trimestre et ses commandes ont plus que doublé (Yahoo Finance). Pour Trefis, l’essentiel de 2027 est déjà en carnet : seules les nouvelles commandes texanes non signées sont menacées (Trefis). Le vrai test viendra sur les commandes de 2028."
      },
      {
        type: "h",
        id: "amortir",
        text: "Ce qui peut amortir le choc, et quand le saura-t-on"
      },
      {
        type: "p",
        text: "Le scénario central des analystes est un ralentissement, pas un arrêt. Pour BNY Wealth, l’incertitude politique ne fera pas dérailler l’investissement dans l’IA, mais elle peut en décaler le calendrier et en alourdir le coût (Reuters via The Standard)."
      },
      {
        type: "defs",
        items: [
          {
            term: "2027 est largement acquis.",
            text: "Les 20 premiers États prévoient environ 33,8 GW en 2027, dont trois quarts déjà en chantier ; le risque se concentre sur 2028 (ChainCatcher, citant SemiAnalysis)."
          },
          {
            term: "L’argent pousse à construire.",
            text: "Bernstein estime que les projets pèsent 8 % du PIB des États concernés, et que les élus changeront surtout qui paie le réseau, sans arrêter la croissance (Investing.com)."
          },
          {
            term: "Les contre-pouvoirs locaux et syndicaux.",
            text: "Comtés républicains, construction et concurrence avec la Chine peuvent adoucir les promesses une fois au pouvoir (MIT Technology Review)."
          },
          {
            term: "Les plus solides tiendront mieux.",
            text: "Les hyperscalers absorbent des retards ; les développeurs très endettés sans locataire signé, comme Fermi, sont les plus fragiles. Evercore voit des retards de six mois ou plus pour les neoclouds exposés au Texas ou à la Géorgie (CNT Trading)."
          }
        ]
      },
      {
        type: "h3",
        text: "Ce que dit la recherche : la flexibilité, porte de sortie coûteuse"
      },
      {
        type: "p",
        text: "Les travaux récents sur arXiv ne traitent pas du risque politique, mais de la condition technique posée par ERCOT : rester flexible ou produire sa propre électricité."
      },
      {
        type: "defs",
        items: [
          {
            term: "Un gain réel mais limité.",
            text: "Décaler les calculs dans le temps ou entre sites réduit de 3 à 21 % les investissements et coûts du réseau, avec des rendements décroissants quand le report s’allonge (Chen et Zheng, avril 2026)."
          },
          {
            term: "L’entraînement cède moins qu’on ne le croit.",
            text: "Une première mesure systématique montre comment le débit d’un entraînement baisse quand on réduit la puissance des GPU (Colangelo et al., septembre 2026). D’autres auteurs jugent que les études surestiment cette flexibilité, contrainte par les points de sauvegarde (Tong et al., octobre 2026)."
          },
          {
            term: "Un grand site fait monter ses propres prix.",
            text: "Un data center assez grand modifie le prix de l’électricité qu’il paiera, ce qui complique sa planification (Mungo et al., septembre 2026)."
          },
          {
            term: "L’eau se déplace vers les centrales.",
            text: "Le choix du refroidissement transfère une partie de la consommation d’eau vers la production d’électricité, au cœur de l’audit de l’eau texan (Alston et al., septembre 2026)."
          }
        ]
      },
      {
        type: "callout",
        text: "La sortie la plus probable n’est donc ni un oui ni un non, mais des projets autorisés sous conditions de flexibilité, d’eau et de partage des coûts, plus chers et plus lents qu’annoncé."
      },
      {
        type: "h3",
        text: "Les échéances à surveiller"
      },
      {
        type: "defs",
        items: [
          {
            term: "12 novembre 2026",
            text: "Résultats de Fermi, avec des nouvelles sur TensorWave et la demande de 5 GW."
          },
          {
            term: "10 décembre 2026",
            text: "Rapport d’audit d’ERCOT : condition fixée par Abbott pour rouvrir les permis TCEQ (Office of the Governor)."
          },
          {
            term: "Janvier 2027",
            text: "Investiture d’Hinojosa, ouverture de la session législative au Texas et arrivée du nouveau Congrès."
          },
          {
            term: "Commandes 2028 des fournisseurs",
            text: "Premier indicateur concret d’un ralentissement réel."
          }
        ]
      },
      {
        type: "h",
        id: "tri",
        text: "Le tri : pourquoi le ralentissement profite aux plus gros"
      },
      {
        type: "p",
        text: "Un ralentissement ne frappe pas tout le monde : il trie. Si l’offre nouvelle est freinée, la capacité déjà en service prend de la valeur. Pour JPMorgan, c’est ce qui explique l’écart en bourse : les grands groupes qui ont déjà leur capacité en profitent, tandis que les neoclouds financés par la dette empruntent bien plus cher (CNBC)."
      },
      {
        type: "p",
        text: "Ce tri n’est pas né des élections. Gartner prévoit déjà que plus de 80 % des neoclouds cesseront d’opérer en indépendants d’ici 2030, pour des raisons d’abord économiques : rendements insuffisants, pression sur les coûts, modèles peu différenciés (Gartner). Le risque réglementaire peut accélérer ce mouvement ; de combien, aucune donnée ne permet encore de le mesurer."
      },
      {
        type: "p",
        text: "Trois modèles, trois risques. Fermi développe de l’énergie et des bâtiments : son risque tient aux permis, à ses locataires et à son financement. CoreWeave, Nebius et Nscale vendent du calcul : leur risque tient à leur dette, à leurs baux et à la rentabilité de ce calcul. Le choc passe de l’un à l’autre : un promoteur retardé livre en retard un neocloud, qui livre en retard ses clients."
      },
      {
        type: "table",
        head: [
          "Neocloud",
          "Dette et échéances",
          "Signal de fragilité",
          "Dépendance aux clients"
        ],
        rows: [
          [
            "CoreWeave",
            "~35 Md$ de dette et 16,3 Md$ de baux (Bisnow) ; ~4,4 Md$ à rembourser d’ici fin 2026, puis 6,2 Md$ en 2027 (Forbes)",
            "Intérêts attendus de 860 à 940 M$ au 3e trimestre, face à un résultat d’exploitation ajusté visé de 200 à 260 M$ (Yahoo Finance)",
            "Meta, OpenAI, Microsoft, Anthropic"
          ],
          [
            "Nebius",
            "4,3 Md$ de convertibles au 1er trimestre et une première dette garantie de 775 M$ (SEC)",
            "Croissance financée en partie par plus de 9 Md$ d’avances clients attendues en 2026 (SEC)",
            "Deux clients pèsent 26 % et 21 % des revenus du 1er semestre 2026 (SEC)"
          ],
          [
            "Nscale",
            "Financements convertibles et levées en actions",
            "Perte de 1 Md$ au 1er semestre pour 141 M$ de revenus (City AM)",
            "Microsoft et Anthropic ; Microsoft s’est retiré de Loughton (Reuters via BusinessDay)"
          ]
        ],
        caption: "Ces signaux sont de nature différente : ils ne se comparent pas entre eux et ne classent pas le risque de défaut. Pour CoreWeave, le résultat ajusté exclut certaines charges et ne mesure pas la capacité de la trésorerie à payer les intérêts."
      },
      {
        type: "p",
        text: "CoreWeave est solvable à court terme, mais très sensible au calendrier de ses chantiers. Fin juin, il disposait de 15,6 Md$ (5,5 Md$ de trésorerie et 10 Md$ de lignes de crédit non tirées) face à 35,6 Md$ de dette, se disait couvert sur douze mois et respectait ses engagements bancaires (rapport trimestriel, SEC). Son activité dégage déjà de la trésorerie, 3,7 Md$ au premier semestre, mais sa croissance reste financée de l’extérieur, avec 14 Md$ de financements nouveaux sur la même période (Stock Titan, d’après le rapport SEC). Ses lignes de crédit servent surtout à acheter du matériel pour des contrats précis, et environ 10,6 Md$ de dette arrivent à échéance d’ici fin 2027 (Exent, d’après le rapport SEC). Un chantier retardé décale donc ses revenus sans décaler ses échéances ; mesurer l’ampleur de ce risque demanderait de modéliser un campus précis."
      },
      {
        type: "p",
        text: "Les sites raccordés valaient déjà cher avant le vote. Au Texas, Plug Power a vendu son site de Graham à Stream pour 50 M$, plus jusqu’à 26,5 M$ selon la capacité électrique finalement obtenue, sur une référence de 164 MW : le prix dépend explicitement des mégawatts (Cashpian, d’après DatacenterDynamics). Le terrain raccordé vaut en moyenne 584 000 $ par MW dans les grands marchés américains, en hausse de 51 % sur un an (Metro Colo Advisory, d’après Cushman & Wakefield). Le consortium de BlackRock, Microsoft et Nvidia a payé 40 Md$ pour Aligned et ses 6,4 GW actuels et prévus (Aligned). Dès 2025, CoreWeave avait proposé 9 Md$ pour Core Scientific et ses 1,3 GW en présentant l’opération comme un achat de puissance (communiqué de CoreWeave), un rachat qui a échoué faute d’accord des actionnaires. Toutes ces opérations précèdent les élections : elles montrent une prime existante pour les capacités électriques sécurisées, que les restrictions pourraient renforcer, pas une hausse provoquée par le scrutin. Et cette valeur dépend de la localisation, de la puissance réellement disponible et du prix de l’électricité ; un permis ne suit pas toujours la société rachetée."
      },
      {
        type: "p",
        text: "Trois scénarios restent ouverts :"
      },
      {
        type: "table",
        head: [
          "Scénario",
          "Déclencheur",
          "Conséquence dominante"
        ],
        rows: [
          [
            "Rareté durable",
            "Permis, eau, réseau",
            "Les sites existants prennent de la valeur, les grands rachètent"
          ],
          [
            "Surcapacité",
            "Demande inférieure aux investissements, puces plus efficaces",
            "Prix du calcul en baisse, dépréciations pour tous"
          ],
          [
            "Consolidation accélérée",
            "Crédit cher, marges faibles",
            "Rachats et restructurations de neoclouds"
          ]
        ]
      },
      {
        type: "p",
        text: "Le frein politique pousse vers le premier, mais il peut aussi soulager certains neoclouds en faisant monter les loyers du calcul déjà en service. Le deuxième scénario, une surcapacité, toucherait tout le monde, grands compris. Nvidia, qui soutient les neoclouds face aux puces maison des hyperscalers, et un Congrès démocrate attentif à la concentration freineraient aussi une consolidation trop rapide."
      },
      {
        type: "p",
        text: "C’est le précédent des télécoms de 2000 : la fibre construite à crédit a survécu et a été rachetée à bas prix, mais ceux qui l’avaient bâtie ont fait faillite. La différence : la fibre a servi des décennies, un GPU quelques années. Cette fois, ce sont les sites, les raccordements et les permis qui changeraient de mains."
      },
      {
        type: "h",
        id: "conclusion",
        text: "Conclusion : l’acceptation politique ne s’achète pas"
      },
      {
        type: "p",
        text: "L’industrie de l’IA a longtemps traité la capacité de calcul comme une contrainte que le capital suffisait à résoudre : acheter des GPU, construire des centrales, réserver des terrains, lever de la dette."
      },
      {
        type: "callout",
        text: "Les midterms de 2026 rappellent qu’une partie de cette capacité dépend d’une ressource qui ne s’achète pas aussi facilement : l’acceptation politique. Quand elle se retire, les projets peuvent attendre. Les créanciers, eux, n’attendent pas toujours."
      },
      {
        type: "p",
        text: "Le Texas sera le premier test. Les chantiers déjà lancés devraient tenir ; ce sont les extensions, les nouveaux raccordements et les développeurs endettés sans locataire signé qui porteront le risque. Mais le poids exact du scrutin reste inconnu : la fragilité des neoclouds, la prime pour les sites raccordés et le gel des permis lui sont antérieurs. Les midterms n’annoncent pas mécaniquement une consolidation ; elles rendent plus probable un scénario déjà en germe. Ce qui se décidera entre le 10 décembre et la session législative de 2027 dira si l’infrastructure IA est devenue un risque politique durable."
      }
    ],
    sourcesLabel: "Sources",
    sources: [
      {
        label: "Politique et Texas : MIT Technology Review · Office of the Governor · Houston Public Media · Daily Caller · CNN · SemiAnalysis"
      },
      {
        label: "Élections nationales : TIME · Fortune · Engadget · The Intercept · The Hill · Fox News · Sanders"
      },
      {
        label: "Fermi : Placera (communiqué Fermi) · Texas Dispatch · Texas Tribune · MarketBeat"
      },
      {
        label: "Dette : TechRadar · The State of AI · Bloomberg, Banque d’Angleterre · Bloomberg, HSBC · BigGo Finance"
      },
      {
        label: "Marchés et fournisseurs : CNT Trading · Yahoo Finance · Trefis · Investing.com, Bernstein · XTB · ADVFN"
      },
      {
        label: "Chaîne industrielle européenne : BofA Global Research et Bruegel, cités par « Où tournent les modèles, en Europe » (24 octobre 2026)"
      },
      {
        label: "Audit des projets texans : Nameplate Report, permis gelés · Nameplate Report, Weekly Pulse · stargate.how · Apollo Technical · dcmap.us · POWER Magazine, audit · POWER Magazine, BNEF · Forbes, Batch Zero · REjournals"
      },
      {
        label: "Compléments : Fermi via Newswire, report de la clôture TensorWave · CNBC, capacité existante et neoclouds"
      },
      {
        label: "Risque systémique : FMI, GFSR octobre 2026 · Reuters via Yahoo · Chicago Fed · Kansas City Fed · Perspective on Risk · Bisnow · Forbes, obligations spéculatives · Business Insider via AOL · Wall Street Times"
      },
      {
        label: "Neoclouds : CNBC, CoreWeave · Forbes, garanties GPU · Reuters via Egyptian Gazette, Nscale · Asia Business Daily"
      },
      {
        label: "Sources primaires : Gallup, sondage sur les data centers · FMI, rapport sur la stabilité financière d’octobre 2026 · Reuters, la dette des data centers · NRC, dossier Matador · The Next Web, Goldman Sachs"
      },
      {
        label: "Le tri et les neoclouds : Gartner · Nebius, rapports SEC · Motley Fool, CoreWeave · DatacenterDynamics, S&P · Trending Topics · Reuters via BusinessDay, Nscale · Communiqué de Fermi, 3 novembre · Investing.com, Morgan Stanley"
      },
      {
        label: "Liquidité et prix des sites : CoreWeave, rapport trimestriel (SEC) · Exent · Cashpian · Metro Colo Advisory · Communiqué de CoreWeave, Core Scientific · Aligned"
      },
      {
        label: "Résultats électoraux mis à jour : KTAR, Arizona · Washington Post, Mississippi · Stock Titan, flux de trésorerie de CoreWeave"
      }
    ]
  },
  en: {
    title: "Data centers: when politics becomes the risk",
    lead: "The midterms of 3 November 2026 did not create the financial fragilities of AI infrastructure. They reveal a regulatory risk that could amplify them, at a time when some developers depend on expensive financing and on future revenue that is still uncertain.",
    updated: "Published on 5 November 2026",
    summaryLabel: "In brief",
    summary: [
      "Texas, which carries a quarter of planned US capacity, elected a governor who backs a moratorium, while TCEQ permits there are already frozen until the ERCOT audit.",
      "The risk is not a halt but a delay: interest on more than $500bn of debt keeps running while the rents meant to cover it recede.",
      "The slowdown sorts: capacity already connected gains value, while indebted developers and neoclouds without a signed tenant carry the risk."
    ],
    blocks: [
      {
        type: "note",
        text: "Sources checked up to the evening of 5 November 2026. Election results, share prices and permit statuses change from one day to the next. Written for information only, not investment advice."
      },
      {
        type: "p",
        text: "The Democrats took the House and the Senate, Texas elected a governor who backs a moratorium, and 33 of the 45 local ballots on data centers voted for restrictions (Engadget)."
      },
      {
        type: "p",
        text: "The very next day, markets repriced the companies exposed to the build-out of AI infrastructure: Vertiv lost 12.9%, Vistra 13.8% and Quanta 11.7% (CNT Trading). Other news weighed on the same day, and these drops do not on their own measure the effect of the vote. The risk is not that a sector stops. It is that it slows down while its debt keeps running."
      },
      {
        type: "p",
        text: "This article follows on from “The megawatt and the degree” (24 September 2026), which showed how the gap between the speed of AI and the speed of the grid is closed with gas, by bypassing the public grid, and with the bill sent to households. Voters have just refused that bill. It traces the Texas shock, measures its national reach, takes Fermi America as a case study, then compares the situation with 2007, follows the shockwave to European suppliers and shows who would come out ahead of the sorting."
      },
      {
        type: "related",
        href: "/articles/le-megawatt-et-le-degre",
        label: "Read first",
        title: "The megawatt and the degree",
        text: "The gap between the speed of AI and the speed of the grid, and what closes it: gas, bypassing the public grid, the household bill."
      },
      {
        type: "h",
        id: "texas",
        text: "Texas, the epicenter of the shift"
      },
      {
        type: "p",
        text: "The most dynamic market in the United States has just elected officials who want to slow it down. Gina Hinojosa (D) beat incumbent governor Greg Abbott, James Talarico (D) beat Ken Paxton for the Senate, and the Democrats take the Texas House for the first time in 24 years (MIT Technology Review). Texas alone carries about a quarter of the data-center capacity planned in the United States, according to Goldman Sachs (The Next Web)."
      },
      {
        type: "p",
        text: "The brake was already on before the vote. On 21 September, Abbott ordered the TCEQ, the environmental regulator, to issue no permits to data centers until the ERCOT audit is complete (Office of the Governor). The TCEQ froze all air and water permits for infrastructure that directly powers data centers, on-site power plants included (Houston Public Media)."
      },
      {
        type: "p",
        text: "Hinojosa wants to go further. She called Abbott’s pause an “election pause” and campaigned for a moratorium (Daily Caller), to be extended until stricter AI rules are adopted (CNN). Her moratorium would cover new permits and, according to available reports, exempt projects already under construction (CNBC). But a governor can mostly delay approvals: a lasting moratorium or a tax reform has to go through legislation (SemiAnalysis)."
      },
      {
        type: "figure",
        src: "/articles/midterms/texas-capitol.jpg",
        alt: "The Texas State Capitol in Austin, a pink granite building topped by a dome, under a blue sky",
        caption: "The Texas State Capitol in Austin, seat of the legislature. A lasting moratorium or a tax reform would have to pass here: a governor alone can mostly delay permits. Photo LoneStarMike, Wikimedia Commons, CC BY 3.0."
      },
      {
        type: "p",
        text: "The electoral map tempers the shock. Ellis County, which leads in permit applications, and the western counties where projects are concentrated voted Republican. Decisions are split between cities, counties and the state, and the building-trade unions that backed the Democrats could hold back a moratorium (MIT Technology Review)."
      },
      {
        type: "h",
        id: "vague",
        text: "A national, bipartisan wave"
      },
      {
        type: "p",
        text: "The rejection goes beyond Texas and cuts across both parties. According to an NBC exit poll, 56% of voters say AI and data centers were a decisive or important factor in their vote for Congress (Engadget). As early as March, Gallup measured 71% opposition to an AI data center near one’s home, more than for a nuclear plant (Gallup)."
      },
      {
        type: "table",
        head: [
          "Elected or candidate",
          "State, office",
          "Position on data centers",
          "Result"
        ],
        rows: [
          [
            "Sherrod Brown (D)",
            "Ohio, Senate",
            "End tax breaks, make data centers pay for their electricity (Fortune)",
            "Elected, +5 points"
          ],
          [
            "Abdul El-Sayed (D)",
            "Michigan, Senate",
            "No rate increases, strict standards (Fortune)",
            "Elected"
          ],
          [
            "Annie Andrews (D)",
            "South Carolina, Senate",
            "Two-year moratorium (TIME)",
            "Elected"
          ],
          [
            "James Talarico (D)",
            "Texas, Senate",
            "Attacks on Paxton’s support for data centers (The Hill)",
            "Elected"
          ],
          [
            "Amish Shah (D)",
            "Arizona, House (1st district)",
            "Promises to stop them being built (TIME)",
            "Elected, race called by the AP on 5 November (KTAR)"
          ],
          [
            "Scott Colom (D)",
            "Mississippi, Senate",
            "Temporary ban (The Intercept)",
            "Not called: Colom ahead by 1,813 votes on Thursday evening (Washington Post)"
          ],
          [
            "Mike Rogers (R)",
            "Michigan, Senate",
            "One-year moratorium (Detroit News/Yahoo)",
            "Defeated"
          ],
          [
            "Ken Paxton (R)",
            "Texas, Senate",
            "Four-point plan to curb growth (Fox News)",
            "Defeated"
          ]
        ]
      },
      {
        type: "p",
        text: "Governors matter as much as Congress. Democrats won Nevada, Georgia, Ohio and Texas on promises of stricter rules. From January, states led by Democrats who favour moratoriums will carry about 45% of planned capacity, according to Goldman Sachs (CNN)."
      },
      {
        type: "p",
        text: "At the federal level, the brake is less certain. Bernie Sanders and Alexandria Ocasio-Cortez introduced a federal moratorium on AI data centers in March (Sanders). But analysts doubt a blocking law will pass, since Trump could veto it (Reuters via The Standard)."
      },
      {
        type: "h",
        id: "audit",
        text: "Audit: Stargate and the other Texas projects"
      },
      {
        type: "p",
        text: "Four campuses under construction are waiting on frozen gas permits, for more than 14 GW: Nexus Hubbard (Anthropic), the Stargate Abilene expansion, Fermi’s expansion, and Goodnight (Crusoe for Google) (Nameplate Report). The TCEQ has also suspended at least 17 stormwater and wastewater permits on data-center sites (Nameplate Report)."
      },
      {
        type: "table",
        head: [
          "Project",
          "Developer, tenant",
          "County",
          "Size",
          "Status",
          "Exposure to the freeze"
        ],
        rows: [
          [
            "Fermi Project Matador",
            "Fermi America",
            "Carson",
            "6 GW permitted, ~5 GW requested",
            "Phase 1 under construction",
            "Expansion frozen"
          ],
          [
            "GW Ranch",
            "Amazon",
            "Pecos",
            "7.65 GW power plant",
            "Under construction (dcmap.us)",
            "Not documented"
          ],
          [
            "Nexus Hubbard",
            "Nexus Data Centers, mainly Anthropic",
            "Hill",
            "6.4 GW",
            "Under construction (MIT Technology Review)",
            "Gas permit frozen"
          ],
          [
            "Stargate Frontier",
            "Vantage, Oracle, OpenAI",
            "Shackelford",
            "1.82 GW",
            "Under construction, delivery planned for H1 2027 (stargate.how)",
            "Not documented"
          ],
          [
            "Stargate Abilene",
            "Crusoe, Oracle, OpenAI",
            "Taylor",
            "~1.2 GW",
            "Partly in service, 42% delivered as of 29 August (stargate.how)",
            "Gas expansion frozen"
          ],
          [
            "Stargate Milam",
            "SB Energy, SoftBank, OpenAI",
            "Milam",
            "1.2 GW",
            "Lease signed, first buildings under construction (stargate.how)",
            "Connected to ERCOT, so subject to the audit"
          ],
          [
            "Meta El Paso",
            "Meta",
            "El Paso",
            "1 GW",
            "Under construction, in service in 2028 (Apollo Technical)",
            "Not documented"
          ],
          [
            "Crusoe Abilene for Microsoft",
            "Crusoe, Microsoft",
            "Taylor",
            "900 MW",
            "Under construction, 2027 (Apollo Technical)",
            "Not documented"
          ],
          [
            "Goodnight",
            "Crusoe, Google",
            "Armstrong",
            "900 MW",
            "Under construction (Apollo Technical)",
            "Gas permit frozen"
          ]
        ]
      },
      {
        type: "p",
        text: "The pending requests are of another order of magnitude. ERCOT tracks 474.7 GW of large-load interconnection requests, 420.8 GW of them from data centers, more than five times the grid’s all-time peak (POWER Magazine). Only 66.4 GW are provisionally kept in the first study batch, and 302.2 GW are excluded from it (Forbes)."
      },
      {
        type: "p",
        text: "Much of this queue is speculative. BNEF tracks only 50 GW of serious Texas projects and expects 17 GW installed by 2030; the audit could delay 49.8 GW and cost projects up to $15bn (POWER Magazine). ERCOT is due to deliver its audit report on 10 December, but that report does not reopen anything on its own (Nameplate Report)."
      },
      {
        type: "p",
        text: "Projects already under way often have their approvals; it is the projects still in the queue that are blocked, because they only start with a firm commitment from ERCOT (REjournals). For Stargate, the risk therefore lies mainly in the expansions and the grid connection, not in the buildings already under construction."
      },
      {
        type: "h",
        id: "fermi",
        text: "Fermi and Project Matador, a case study"
      },
      {
        type: "p",
        text: "Matador’s first phase is permitted, its expansion is frozen. Fermi America’s campus near Amarillo aims for 11 GW of private power. On 25 February 2026 the TCEQ granted it a Clean Air permit for 6 GW of gas (Fermi via Placera). The next application, about 5 GW filed on 27 March (Barchart), is explicitly caught in Abbott’s freeze (Texas Dispatch)."
      },
      {
        type: "p",
        text: "Being energy-independent is no protection. Fermi generates its electricity on site, with a 2.6 GW complex planned with Hillcore (Energy Monitor). Yet the freeze hits self-powered projects like all the others (Forbes)."
      },
      {
        type: "p",
        text: "Washington sped up nuclear, not gas. The project, first named “President Donald J. Trump Advanced Energy and Intelligence Campus” in its licence application (NRC), is the first in an NRC pilot programme that aims to halve the length of the environmental review (NucNet), and on 9 October the NRC made a preliminary recommendation to license four reactors (Headwaters Wire). But those reactors would not arrive before 2031-2032; until then, Matador runs on gas, whose permits are a Texas matter, where Washington has no say. The project designed to benefit from federal acceleration runs into the local level."
      },
      {
        type: "p",
        text: "Gas is not scarce, water is. Permian Basin gas comes up with the oil, even when it is worth nothing: for lack of pipelines, its price at the Waha hub stayed negative for 134 days in a row in 2026 (VanEck). The bottleneck is not the resource, then, but the permit to burn it. Water, on the other hand, is a physical constraint: the Panhandle depends on the declining Ogallala aquifer, and the basin around Matador is rated as extremely high water stress (Compute Atlas). Fermi promises a closed loop for its servers, but its gas plants will also need cooling, and the state now prosecutes data centers that do not report their water use (Office of the Governor). Air and water, more than energy, are the two points where politics has tightened the vice."
      },
      {
        type: "figure",
        src: "/articles/midterms/permian-iss.jpg",
        alt: "View from space of a plain criss-crossed by tracks and well pads, with a town in the middle and green irrigation circles at the bottom and right",
        caption: "The Permian Basin seen from the International Space Station, around Denver City, south-west of Lubbock. Each small pale square is a well pad; the green circles are centre-pivot irrigated fields, pumping from the Ogallala aquifer. Gas and water compete for the same ground. NASA photo (ISS005-E-9984, 2002), public domain."
      },
      {
        type: "p",
        text: "The commercial risk existed before the vote, and independently of it. The 15-year, $6.5bn lease signed with TensorWave in August (Motley Fool) only takes effect after closing conditions, including guarantees and project financing sufficient to build. The closing date had already been pushed back to 31 October (Fermi via Newswire). It passed with neither an extension nor a closing: the lease is therefore not in force, even though neither party has terminated it (Fermi press release, 3 November). AMD provided a credit guarantee for phase 1 in October (Motley Fool). Rick Perry, a co-founder, lost his board seat at the end of October (Texas Tribune). It is the build-up of both risks, political and commercial, that makes Fermi fragile."
      },
      {
        type: "p",
        text: "The stock market punished both at once. FRMI shares lost 10.8% on 4 November (MarketBeat), then about 15% on 5 November, to around $1.54 (Google Finance). They had already lost 72% year to date as of 2 November (Motley Fool). Its results on 12 November will be the next test."
      },
      {
        type: "h",
        id: "dette",
        text: "The debt does not stop"
      },
      {
        type: "p",
        text: "More than $500bn of debt already finances AI data centers, about $200bn of it private debt, according to Bloomberg (TechRadar). Morgan Stanley expects private debt to provide more than half of the $1.5tn needed by 2028 (Reuters)."
      },
      {
        type: "p",
        text: "The mechanism that makes a slowdown dangerous:"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Special-purpose vehicles.",
            text: "Projects are held by special-purpose vehicles (SPVs), often off the balance sheets of the big groups. Meta’s Hyperion campus is 80% owned by Blue Owl (TechRadar)."
          },
          {
            term: "2. Interest from day one.",
            text: "Interest runs from the construction phase, but repayments depend on future rents."
          },
          {
            term: "3. A frozen permit.",
            text: "A frozen permit pushes those rents back without stopping the interest: the project costs more and earns later."
          },
          {
            term: "4. Refinancing.",
            text: "It then has to refinance, in a market that is closing."
          }
        ]
      },
      {
        type: "p",
        text: "Order of magnitude: a $5bn project financed at 8% carries about $33m of interest charges a month."
      },
      {
        type: "table",
        head: [
          "Delay",
          "Interest accrued during the delay"
        ],
        rows: [
          [
            "3 months",
            "$100m"
          ],
          [
            "6 months",
            "$200m"
          ],
          [
            "12 months",
            "$400m"
          ]
        ],
        caption: "Illustrative simulation, constant principal and simple interest. These are not Fermi’s figures."
      },
      {
        type: "p",
        text: "This is not a net extra cost: some of that interest would have run anyway. The cost of the delay lies in the shift of the rents that were meant to cover it, and in the fees of any refinancing. Across Texas, BNEF estimates the audit could cost projects up to $15bn (POWER Magazine)."
      },
      {
        type: "p",
        text: "Lenders are already showing signs of strain. The Bank of England is questioning banks about loans made without a signed tenant (Bloomberg). HSBC is looking to cover its data-center debt with credit insurance (Bloomberg), and the cost of insuring against tech defaults is hitting records (Insurance Journal). According to Morgan Stanley, AI-related debt issuance fell to $23bn in September, less than half of August; the bank cites doubts about profitability and political opposition to data centers among the reasons (Investing.com)."
      },
      {
        type: "p",
        text: "The risk reaches all the way to savers. Private debt is funded in part by insurers and pension funds, such as Athene, the $470bn insurer controlled by Apollo (Deccan Herald)."
      },
      {
        type: "related",
        href: "/articles/le-gigawatt-et-le-dollar",
        label: "Read also",
        title: "The gigawatt and the dollar",
        text: "Who finances AI’s gigawatts, with whose money, and who carries the risk if the promised revenue does not arrive."
      },
      {
        type: "h",
        id: "2007",
        text: "2007 and 2026: an analogy of fragility, not a precedent"
      },
      {
        type: "p",
        text: "In both cases, massive debt rests on an economic assumption that can become untenable. Before 2008, it was the continuous rise in house prices, which justified risky loans that were then securitised; rising rates only sped up the defaults. In 2026, it is the steady arrival of approvals and rents. Jefferies judges that data centers rest on tenants’ future commitments, like real estate before 2008 (BigGo Finance)."
      },
      {
        type: "table",
        head: [
          "",
          "Subprime (2006-2008)",
          "AI data centers (2026)"
        ],
        rows: [
          [
            "What weakens the assumption",
            "Risky loans, defaults and securitisation, made worse by Fed rate rises (1% in 2004, 5.25% in 2006)",
            "Regulatory: permit freezes, moratoriums, end of tax breaks"
          ],
          [
            "Role of the midterms",
            "Nov. 2006: the Democrats take Congress, then manage the crisis",
            "Nov. 2026: elected officials can themselves trigger the slowdown"
          ],
          [
            "Reach of the shock",
            "The whole economy, through the cost of credit",
            "One sector and targeted states, about 45% of planned capacity"
          ],
          [
            "Off-balance-sheet debt",
            "Banks’ securitisation vehicles",
            "Hyperscalers’ SPVs and private debt"
          ],
          [
            "Amplifier",
            "CDOs, CDOs of CDOs, CDS that AIG could not pay",
            "Nothing comparable reported (The State of AI)"
          ],
          [
            "Underlying asset",
            "Houses, durable",
            "Data centers designed for one generation of chips, quickly obsolete"
          ]
        ]
      },
      {
        type: "p",
        text: "The clearest difference is the nature of the shock. In 2007, millions of households stopped paying, gradually. In 2026, a single decision can block multi-billion projects at a stroke: a risk that is concentrated, sudden, and hard for a lender to model."
      },
      {
        type: "p",
        text: "2007 sheds light on the fragility without heralding a new crisis. No contagion chain comparable to 2008 has been shown. The stress remains localised among the weakest borrowers: nearly half of the data-center bonds issued in 2026 are speculative grade (Forbes), and indebted neoclouds are falling behind (see below). The big banks have little concentration in data centers (Chicago Fed) and withstand the IMF’s stress test (IMF)."
      },
      {
        type: "p",
        text: "If there is contagion, it would run outside the banks: through SPVs, 90% debt-financed (Kansas City Fed), through private debt, insurers and pension funds, which are less liquid, and through circular financing among AI players: the IMF has counted 14 deals since 2023, about $300bn of equity and $650bn of debt against $1.4tn of promised revenue (IMF, Global Financial Stability Report). AI-related borrowing has grown by about 1.3 points of GDP in three years: the fairest parallel may be the telecoms of 2000, more than subprime (Perspective on Risk)."
      },
      {
        type: "h",
        id: "europe",
        text: "A whole industrial chain exposed, all the way to Europe"
      },
      {
        type: "p",
        text: "A gigawatt of AI data center represents about $43bn of equipment, at $42.7m per MW in 2026. Servers and networking make up 85% of it: Nvidia, AMD, Dell, Supermicro, TSMC, SK hynix. The rest goes to power, cooling and buildings, where Europeans are strong: Schneider Electric, Legrand, Siemens Energy, Hitachi Energy in Sweden, mtu engines, Stulz, Vinci or Skanska (BofA Global Research count, cited in the article “Where the models run, in Europe”, 24 October 2026)."
      },
      {
        type: "p",
        text: "The United States fills the order books. It accounts for about 78% of global AI compute capacity, against 5% for Europe (Bruegel, same article). Several European suppliers expanded their factories in 2025-2026 citing data centers, from Hitachi Energy’s transformers in Ludvika to Socomec’s UPS units in Benfeld."
      },
      {
        type: "p",
        text: "The stock market sold off suppliers from 4 November:"
      },
      {
        type: "table",
        head: [
          "Stock",
          "Business",
          "Move",
          "Source"
        ],
        rows: [
          [
            "Modine",
            "Cooling",
            "About –24% intraday",
            "Yahoo Finance"
          ],
          [
            "Sterling Infrastructure",
            "Construction",
            "About –19% intraday",
            "Yahoo Finance"
          ],
          [
            "Vistra",
            "Power generation",
            "–13.8%",
            "CNT Trading"
          ],
          [
            "Vertiv",
            "Power and cooling",
            "–12.9%",
            "CNT Trading"
          ],
          [
            "Quanta Services",
            "Power grids",
            "–11.7%",
            "CNT Trading"
          ],
          [
            "Siemens Energy",
            "Turbines, grids",
            "–5.9%",
            "Ad-hoc News"
          ],
          [
            "Semiconductor index (SOX)",
            "Chips",
            "–3.1%",
            "ChainCatcher"
          ]
        ]
      },
      {
        type: "p",
        text: "Europe held up better. The Euro Stoxx 50 gained nearly 2% on 4 November, lifted by banks (XTB). Legrand even rose 3.4% on 5 November after raising its targets, citing data-center demand (ADVFN)."
      },
      {
        type: "p",
        text: "Orders, for their part, have not moved yet. Vertiv’s sales jumped 61% in the third quarter and its orders more than doubled (Yahoo Finance). For Trefis, most of 2027 is already in the backlog: only new, unsigned Texas orders are at risk (Trefis). The real test will come with 2028 orders."
      },
      {
        type: "h",
        id: "amortir",
        text: "What can cushion the shock, and when we will know"
      },
      {
        type: "p",
        text: "Analysts’ central scenario is a slowdown, not a halt. For BNY Wealth, political uncertainty will not derail AI investment, but it can shift its timing and raise its cost (Reuters via The Standard)."
      },
      {
        type: "defs",
        items: [
          {
            term: "2027 is largely locked in.",
            text: "The top 20 states plan about 33.8 GW in 2027, three quarters of it already under construction; the risk is concentrated on 2028 (ChainCatcher, citing SemiAnalysis)."
          },
          {
            term: "Money pushes to build.",
            text: "Bernstein estimates the projects weigh 8% of the GDP of the states concerned, and that officials will mostly change who pays for the grid, without stopping growth (Investing.com)."
          },
          {
            term: "Local and union counterweights.",
            text: "Republican counties, construction and competition with China can soften the promises once in office (MIT Technology Review)."
          },
          {
            term: "The strongest will hold up better.",
            text: "Hyperscalers absorb delays; heavily indebted developers without a signed tenant, like Fermi, are the most fragile. Evercore sees delays of six months or more for neoclouds exposed to Texas or Georgia (CNT Trading)."
          }
        ]
      },
      {
        type: "h3",
        text: "What research says: flexibility, a costly way out"
      },
      {
        type: "p",
        text: "Recent work on arXiv does not address political risk, but the technical condition set by ERCOT: stay flexible or generate your own power."
      },
      {
        type: "defs",
        items: [
          {
            term: "A real but limited gain.",
            text: "Shifting computation in time or between sites cuts grid investment and costs by 3 to 21%, with diminishing returns as the deferral gets longer (Chen and Zheng, April 2026)."
          },
          {
            term: "Training gives way less than people think.",
            text: "A first systematic measurement shows how training throughput falls when GPU power is reduced (Colangelo et al., September 2026). Other authors argue that studies overestimate this flexibility, which is constrained by checkpoints (Tong et al., October 2026)."
          },
          {
            term: "A large site pushes up its own prices.",
            text: "A large enough data center changes the price of the electricity it will pay, which complicates its planning (Mungo et al., September 2026)."
          },
          {
            term: "Water moves to the power plants.",
            text: "The choice of cooling shifts part of the water use to electricity generation, at the heart of the Texas water audit (Alston et al., September 2026)."
          }
        ]
      },
      {
        type: "callout",
        text: "The most likely outcome is therefore neither a yes nor a no, but projects approved under conditions on flexibility, water and cost sharing, more expensive and slower than announced."
      },
      {
        type: "h3",
        text: "Dates to watch"
      },
      {
        type: "defs",
        items: [
          {
            term: "12 November 2026",
            text: "Fermi’s results, with news on TensorWave and the 5 GW application."
          },
          {
            term: "10 December 2026",
            text: "ERCOT audit report: the condition set by Abbott for reopening TCEQ permits (Office of the Governor)."
          },
          {
            term: "January 2027",
            text: "Hinojosa’s inauguration, the opening of the Texas legislative session and the arrival of the new Congress."
          },
          {
            term: "Suppliers’ 2028 orders",
            text: "The first concrete indicator of a real slowdown."
          }
        ]
      },
      {
        type: "h",
        id: "tri",
        text: "The sorting: why the slowdown favours the biggest"
      },
      {
        type: "p",
        text: "A slowdown does not hit everyone: it sorts. If new supply is held back, capacity already in service gains value. For JPMorgan, that is what explains the gap on the stock market: the big groups that already have their capacity benefit, while debt-financed neoclouds borrow at much higher cost (CNBC)."
      },
      {
        type: "p",
        text: "This sorting was not born of the elections. Gartner already expects more than 80% of neoclouds to stop operating independently by 2030, for mainly economic reasons: insufficient returns, cost pressure, poorly differentiated models (Gartner). Regulatory risk can speed this up; by how much, no data yet allows us to measure."
      },
      {
        type: "p",
        text: "Three models, three risks. Fermi develops energy and buildings: its risk lies in permits, its tenants and its financing. CoreWeave, Nebius and Nscale sell compute: their risk lies in their debt, their leases and the profitability of that compute. The shock passes from one to the other: a delayed developer delivers late to a neocloud, which delivers late to its customers."
      },
      {
        type: "table",
        head: [
          "Neocloud",
          "Debt and maturities",
          "Fragility signal",
          "Customer dependence"
        ],
        rows: [
          [
            "CoreWeave",
            "~$35bn of debt and $16.3bn of leases (Bisnow); ~$4.4bn to repay by end-2026, then $6.2bn in 2027 (Forbes)",
            "Expected interest of $860m to $940m in Q3, against a targeted adjusted operating income of $200m to $260m (Yahoo Finance)",
            "Meta, OpenAI, Microsoft, Anthropic"
          ],
          [
            "Nebius",
            "$4.3bn of convertibles in Q1 and a first secured debt of $775m (SEC)",
            "Growth funded in part by more than $9bn of customer prepayments expected in 2026 (SEC)",
            "Two customers account for 26% and 21% of H1 2026 revenue (SEC)"
          ],
          [
            "Nscale",
            "Convertible financing and equity raises",
            "Loss of $1bn in H1 on $141m of revenue (City AM)",
            "Microsoft and Anthropic; Microsoft pulled out of Loughton (Reuters via BusinessDay)"
          ]
        ],
        caption: "These signals are of different kinds: they cannot be compared with one another and do not rank default risk. For CoreWeave, adjusted income excludes certain charges and does not measure the ability of cash flow to pay the interest."
      },
      {
        type: "p",
        text: "CoreWeave is solvent in the short term, but very sensitive to the timing of its build-outs. At the end of June, it had $15.6bn ($5.5bn in cash and $10bn in undrawn credit lines) against $35.6bn of debt, said it was covered for twelve months and was meeting its bank covenants (quarterly report, SEC). Its operations already generate cash, $3.7bn in the first half, but its growth is still financed externally, with $14bn of new financing over the same period (Stock Titan, from the SEC filing). Its credit lines are mostly used to buy hardware for specific contracts, and about $10.6bn of debt matures by the end of 2027 (Exent, from the SEC filing). A delayed site therefore shifts its revenue without shifting its maturities; measuring the size of that risk would require modelling a specific campus."
      },
      {
        type: "p",
        text: "Connected sites were already expensive before the vote. In Texas, Plug Power sold its Graham site to Stream for $50m, plus up to $26.5m depending on the power capacity finally obtained, on a reference of 164 MW: the price explicitly depends on the megawatts (Cashpian, from DatacenterDynamics). Connected land is worth $584,000 per MW on average in the major US markets, up 51% in a year (Metro Colo Advisory, from Cushman & Wakefield). The consortium of BlackRock, Microsoft and Nvidia paid $40bn for Aligned and its 6.4 GW, current and planned (Aligned). As early as 2025, CoreWeave had offered $9bn for Core Scientific and its 1.3 GW, presenting the deal as a purchase of power (CoreWeave press release), a takeover that failed for lack of shareholder approval. All of these deals predate the elections: they show an existing premium for secured power capacity, which restrictions could strengthen, not a rise caused by the vote. And that value depends on location, on the power actually available and on the price of electricity; a permit does not always follow the company that is bought."
      },
      {
        type: "p",
        text: "Three scenarios remain open:"
      },
      {
        type: "table",
        head: [
          "Scenario",
          "Trigger",
          "Main consequence"
        ],
        rows: [
          [
            "Lasting scarcity",
            "Permits, water, grid",
            "Existing sites gain value, the big players buy"
          ],
          [
            "Overcapacity",
            "Demand below investment, more efficient chips",
            "Compute prices fall, write-downs for everyone"
          ],
          [
            "Accelerated consolidation",
            "Expensive credit, thin margins",
            "Takeovers and restructurings of neoclouds"
          ]
        ]
      },
      {
        type: "p",
        text: "The political brake pushes towards the first, but it can also relieve some neoclouds by raising rents on compute already in service. The second scenario, overcapacity, would hit everyone, the big players included. Nvidia, which backs neoclouds against hyperscalers’ in-house chips, and a Democratic Congress wary of concentration would also hold back consolidation that is too fast."
      },
      {
        type: "p",
        text: "This is the precedent of the telecoms in 2000: fibre built on credit survived and was bought cheaply, but those who had built it went bankrupt. The difference: fibre served for decades, a GPU for a few years. This time, it is the sites, the grid connections and the permits that would change hands."
      },
      {
        type: "h",
        id: "conclusion",
        text: "Conclusion: political acceptance cannot be bought"
      },
      {
        type: "p",
        text: "The AI industry long treated compute capacity as a constraint that capital alone could solve: buy GPUs, build power plants, reserve land, raise debt."
      },
      {
        type: "callout",
        text: "The 2026 midterms are a reminder that part of that capacity depends on a resource that is not so easily bought: political acceptance. When it withdraws, projects can wait. Creditors do not always wait."
      },
      {
        type: "p",
        text: "Texas will be the first test. Projects already under way should hold; it is the expansions, the new grid connections and the indebted developers without a signed tenant that will carry the risk. But the exact weight of the vote remains unknown: the fragility of neoclouds, the premium for connected sites and the permit freeze all predate it. The midterms do not mechanically herald a consolidation; they make a scenario already in the making more likely. What is decided between 10 December and the 2027 legislative session will tell whether AI infrastructure has become a lasting political risk."
      }
    ],
    sourcesLabel: "Sources",
    sources: [
      {
        label: "Politics and Texas: MIT Technology Review · Office of the Governor · Houston Public Media · Daily Caller · CNN · SemiAnalysis"
      },
      {
        label: "National elections: TIME · Fortune · Engadget · The Intercept · The Hill · Fox News · Sanders"
      },
      {
        label: "Fermi: Placera (Fermi press release) · Texas Dispatch · Texas Tribune · MarketBeat"
      },
      {
        label: "Debt: TechRadar · The State of AI · Bloomberg, Bank of England · Bloomberg, HSBC · BigGo Finance"
      },
      {
        label: "Markets and suppliers: CNT Trading · Yahoo Finance · Trefis · Investing.com, Bernstein · XTB · ADVFN"
      },
      {
        label: "European industrial chain: BofA Global Research and Bruegel, cited in “Where the models run, in Europe” (24 October 2026)"
      },
      {
        label: "Audit of Texas projects: Nameplate Report, frozen permits · Nameplate Report, Weekly Pulse · stargate.how · Apollo Technical · dcmap.us · POWER Magazine, audit · POWER Magazine, BNEF · Forbes, Batch Zero · REjournals"
      },
      {
        label: "Additional: Fermi via Newswire, postponement of the TensorWave closing · CNBC, existing capacity and neoclouds"
      },
      {
        label: "Systemic risk: IMF, GFSR October 2026 · Reuters via Yahoo · Chicago Fed · Kansas City Fed · Perspective on Risk · Bisnow · Forbes, speculative-grade bonds · Business Insider via AOL · Wall Street Times"
      },
      {
        label: "Neoclouds: CNBC, CoreWeave · Forbes, GPU collateral · Reuters via Egyptian Gazette, Nscale · Asia Business Daily"
      },
      {
        label: "Primary sources: Gallup, data-center poll · IMF, Global Financial Stability Report, October 2026 · Reuters, data-center debt · NRC, Matador docket · The Next Web, Goldman Sachs"
      },
      {
        label: "The sorting and neoclouds: Gartner · Nebius, SEC filings · Motley Fool, CoreWeave · DatacenterDynamics, S&P · Trending Topics · Reuters via BusinessDay, Nscale · Fermi press release, 3 November · Investing.com, Morgan Stanley"
      },
      {
        label: "Liquidity and site prices: CoreWeave, quarterly report (SEC) · Exent · Cashpian · Metro Colo Advisory · CoreWeave press release, Core Scientific · Aligned"
      },
      {
        label: "Updated election results: KTAR, Arizona · Washington Post, Mississippi · Stock Titan, CoreWeave cash flow"
      }
    ]
  }
};
