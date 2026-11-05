import type { Locale } from "@/lib/i18n";
import type { Article } from "./articles";

/** "Le 429 n’est pas un bug": governing inference capacity at AWS, Microsoft and Google. */
export const rateLimitArticle: Record<Locale, Article> = {
  fr: {
    title: "Le 429 n’est pas un bug : gouverner la capacité d’inférence chez AWS, Microsoft et Google",
    lead: "Le code « trop de requêtes » cache le plus souvent une allocation que personne n’a décidée. Comment gouverner une capacité de calcul rare, partagée et chère : qui décide, selon quelles règles, à quel prix, avec quels risques et quels indicateurs.",
    updated: "Publié le 3 novembre 2026",
    summaryLabel: "En bref",
    summary: [
      "Un 429 vient d’une limite de débit, d’un plafond de dépense ou de la capacité disponible, chez le fournisseur comme dans votre propre plateforme, et le code seul ne dit pas laquelle.",
      "Le rate limiting des LLM est devenu un marché : le débit garanti s’achète, la priorité se paie, la patience est récompensée, et la résidence des données se négocie contre le débit.",
      "Gouverner la capacité d’inférence, c’est nommer les décideurs, écrire des règles d’allocation, suivre un budget, évaluer les risques et disposer d’une plateforme qui applique tout cela."
    ],
    blocks: [
      {
        type: "note",
        text: "Sources vérifiées entre le 23 octobre et le 5 novembre 2026. Noms de modèles, paliers, quotas, prix et textes réglementaires évoluent vite : vérifiez la documentation citée avant toute décision."
      },
      {
        type: "p",
        text: "Quand une application d’IA générative appelle un modèle chez AWS, Microsoft ou Google, la réponse peut être un refus : le code HTTP 429, « trop de requêtes ». Le plus souvent, rien n’est cassé : ce refus vient d’une limite de débit, d’un plafond de dépense ou de la capacité disponible, chez le fournisseur comme dans votre propre plateforme, et le code seul ne dit pas laquelle. Derrière ce code se cache une question de direction : la capacité de calcul est rare, partagée et chère, et une entreprise qui ne formalise pas sa répartition laisse les usages se départager au moment de la saturation."
      },
      {
        type: "p",
        text: "Cet article s’adresse aux DSI, aux responsables de plateforme et d’architecture, à la FinOps et aux fonctions risques. Il explique d’où viennent les 429, puis propose de quoi gouverner la capacité d’inférence : qui décide, selon quelles règles, à quel prix, avec quels risques et quels indicateurs. Le détail technique et le diagnostic sont en annexes."
      },
      {
        type: "h",
        id: "incident",
        text: "Un incident, pour commencer"
      },
      {
        type: "note",
        text: "Scénario fictif, construit pour illustrer les mécanismes décrits dans cet article."
      },
      {
        type: "p",
        text: "Un lundi, à 9 h 05, l’assistant interne d’une entreprise répond « service momentanément indisponible » à une partie des collaborateurs. Pourtant, le tableau de bord indique que le modèle n’utilise que 40 % du volume de texte autorisé par minute. Le réflexe de l’équipe : demander au fournisseur une limite plus haute. Elle n’en a pas besoin."
      },
      {
        type: "p",
        text: "Les journaux techniques racontent autre chose. Depuis 9 h, un traitement automatique de documents envoie ses demandes par paquets de plusieurs dizaines dans la même seconde. Chaque demande est courte, donc le volume de texte reste faible. Mais le fournisseur limite aussi le nombre de demandes par seconde, et chaque paquet dépasse cette limite. Or l’assistant et le traitement de documents passent par le même accès au modèle : les questions des collaborateurs qui tombent pendant ces secondes-là sont refusées. L’application réessaie aussitôt, la bibliothèque logicielle réessaie à son tour, et ces tentatives s’ajoutent les unes aux autres. Enfin, l’assistant affiche proprement un message d’erreur au lieu de planter : vu de la supervision technique, tout semble normal."
      },
      {
        type: "p",
        text: "La correction tient en quatre gestes, sans rien demander au fournisseur : faire patienter le traitement de documents dans une file, réserver une part de la capacité à l’assistant, limiter le nombre total de nouvelles tentatives en respectant le délai indiqué par le fournisseur (Retry-After), et suivre les refus selon leur origine. Mais ces gestes supposent une décision que personne n’avait prise : lequel des deux usages doit passer en premier quand la capacité manque. C’est cette décision, et toutes celles qui l’entourent, que cet article appelle gouverner la capacité d’inférence."
      },
      {
        type: "h",
        id: "essentiel",
        text: "L’essentiel en sept idées"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Le rate limiting des LLM n’est plus un garde-fou technique, c’est un marché.",
            text: "La rareté du calcul est physique, sa répartition est commerciale : le débit garanti s’achète, la priorité se paie, la patience est récompensée."
          },
          {
            term: "2. Un 429 est souvent le symptôme d’une allocation que personne n’a décidée.",
            text: "Avant de demander plus de quota, il faut savoir qui consomme quoi, par quel chemin, et qui aurait dû passer en premier."
          },
          {
            term: "3. Le quota ne voit pas ce que vous voyez.",
            text: "Chez AWS sur bedrock-runtime, et chez Microsoft au moins pour les PTU, il juge une estimation qui inclut le plafond de sortie demandé ; en paiement au token, la facture porte sur les tokens réellement traités, en PTU sur la capacité déployée. Les métriques de consommation ne suffisent donc pas à expliquer les refus."
          },
          {
            term: "4. Gouverner commence par nommer les décideurs.",
            text: "Qui classe un usage, qui fixe ses planchers et ses plafonds, qui ouvre un abonnement, qui réserve de la capacité, qui autorise un flux hors de l’UE."
          },
          {
            term: "5. Réserver de la capacité est un engagement financier, pas seulement une recherche de remise.",
            text: "Elle se paie qu’elle serve ou non ; la décision relève de la finance, sur dossier."
          },
          {
            term: "6. La dépendance à un fournisseur, un modèle ou une région est un risque d’entreprise.",
            text: "Pour les entités financières, DORA en fait une obligation : registre des accords, évaluation de la concentration, stratégie de sortie testée."
          },
          {
            term: "7. Le fournisseur gère la rareté physique, à vous de gérer la vôtre.",
            text: "Avec les agents, une demande devient des dizaines d’appels : budgets par exécution, classes de criticité et indicateurs suivis par la direction protègent les usages critiques quand la capacité baisse."
          }
        ]
      },
      {
        type: "h",
        id: "direction",
        text: "Pourquoi c’est devenu un sujet de direction"
      },
      {
        type: "p",
        text: "En 2026, les fournisseurs ne cachent plus que la capacité est rationnée. Fin juin, le Financial Times rapportait que Google avait plafonné l’usage de Gemini par Meta, faute de pouvoir livrer la capacité demandée ; d’autres clients auraient été touchés, dans une moindre mesure (Rappler/Reuters). Côté AWS, Matt Garman estimait en mai que l’offre resterait contrainte (Handelsblatt). Quand l’un des plus gros clients de Google se fait plafonner, aucun quota n’est acquis."
      },
      {
        type: "p",
        text: "Une rareté physique, une répartition commerciale. La contrainte est d’abord matérielle : GPU, mémoire, réseau, refroidissement et surtout électricité. Un datacenter IA se monte en quelques mois ; un raccordement au réseau électrique prend en moyenne cinq ans aux États-Unis. L’Europe ne pèse qu’environ 5 % de la capacité de calcul IA mondiale, contre près de 80 % pour les États-Unis, et cette capacité européenne sert surtout l’inférence (article compagnon). Mais la façon de répartir cette capacité entre clients, d’en fixer les priorités et les prix reste une décision commerciale. Les quotas, les paliers et les 429 de capacité traduisent les deux à la fois."
      },
      {
        type: "p",
        text: "Pour une entreprise, le rate limiting touche quatre enjeux à la fois :"
      },
      {
        type: "defs",
        items: [
          {
            term: "Disponibilité.",
            text: "Un assistant, un agent ou une chaîne de traitement qui reçoit des 429 peut tomber en panne pour l’utilisateur, même si rien n’est « cassé », à moins qu’une file, une reprise ou une dégradation n’absorbe le refus. Sur une plateforme bien dimensionnée, ces refus restent rares, mais ils tombent en rafales, sur quelques minutes et souvent sur les plus petits déploiements."
          },
          {
            term: "Coût.",
            text: "Chaque fournisseur vend désormais plusieurs prix pour le même modèle : prioritaire, standard, différé, réservé. Mal choisir, c’est payer la capacité qu’on n’utilise pas, ou subir des refus sur ce qu’on a payé."
          },
          {
            term: "Conformité.",
            text: "Le levier le plus efficace pour gagner du débit consiste à laisser le fournisseur traiter vos données ailleurs. Le débit et la résidence des données se négocient l’un contre l’autre."
          },
          {
            term: "Équité interne.",
            text: "Un quota fournisseur est partagé par toutes les applications qui l’utilisent. Sans répartition, l’application la plus bruyante décide pour les autres."
          }
        ]
      },
      {
        type: "p",
        text: "Le rate limiting est donc une décision d’architecture et de gouvernance, pas un paramètre de SDK. Le fournisseur gère une rareté physique ; l’entreprise, elle, gère une rareté organisationnelle : décider quelles applications et quels agents doivent continuer à fonctionner quand la capacité manque."
      },
      {
        type: "p",
        text: "Ce que cet article apporte. Pris séparément, les mécanismes du rate limiting sont déjà documentés, souvent par des éditeurs de passerelles (Requesty, TrueFoundry, Palo Alto Networks) ou des plateformes (Palantir), et la FinOps Foundation traite le choix entre capacité partagée et réservée. Ce qui manque, c’est le lien entre la mécanique et la décision : c’est ce lien que cet article construit."
      },
      {
        type: "related",
        href: "/articles/le-gigawatt-et-le-dollar",
        label: "À lire aussi",
        title: "Le gigawatt et le dollar",
        text: "L’écart de vitesse entre l’IA et le réseau existe aussi en dollars, et il est comblé de la même façon : avec l’argent des autres."
      },
      {
        type: "h",
        id: "mecanisme",
        text: "Comprendre le mécanisme"
      },
      {
        type: "p",
        text: "Admission contre facturation. C’est le point le plus important et le moins compris. Chez AWS (bedrock-runtime), le fournisseur décide d’accepter une requête à son arrivée, sur une estimation : taille du prompt plus plafond de génération demandé (max_tokens). Il facture après, sur la consommation réelle. Une requête qui demande 4 000 tokens de sortie et en produit 200 a d’abord bloqué du quota pour 4 000 (AWS, comptage des tokens) ; la documentation Dev Proxy de Microsoft donne le même exemple pour Azure (Microsoft, limites de débit des LLM dans Dev Proxy). Conséquence : les métriques de tokens facturés ne suffisent pas à expliquer un 429."
      },
      {
        type: "compare",
        columns: [
          {
            title: "À l’admission : une estimation",
            items: [
              {
                value: "prompt",
                label: "la taille de la demande"
              },
              {
                value: "+ 4 000",
                label: "le plafond de sortie demandé (max_tokens), bloqué dans le quota"
              }
            ]
          },
          {
            title: "À la facturation : le réel",
            items: [
              {
                value: "prompt",
                label: "la même demande"
              },
              {
                value: "+ 200",
                label: "les tokens réellement produits, seuls facturés"
              }
            ]
          }
        ],
        caption: "Le cas où l’admission repose sur une estimation, comme chez AWS sur bedrock-runtime. L’annexe A détaille les variantes."
      },
      {
        type: "p",
        text: "La règle n’est pas universelle. L’API Anthropic en direct ne compte en sortie que les tokens réellement générés : un max_tokens élevé n’y réduit pas la limite (Claude Platform, limites de débit). Chez Microsoft, les pages officielles se contredisent pour les déploiements Standard : la documentation Dev Proxy inclut max_tokens dans l’estimation (Microsoft, limites de débit des LLM dans Dev Proxy), la page de gestion des quotas ne compte que les tokens réels (Microsoft, gestion du quota) ; pour les PTU, l’estimation l’inclut avant d’être régularisée. Google ne documente pas son rôle. Le comptage dépend du fournisseur, de l’endpoint et du type de déploiement : baisser max_tokens n’est un remède que là où il entre dans l’estimation, et un test simple le vérifie."
      },
      {
        type: "p",
        text: "Les unités."
      },
      {
        type: "defs",
        items: [
          {
            term: "TPM (tokens par minute) :",
            text: "la limite qui mord en premier pour les LLM. Elle compte entrée et sortie, parfois séparément, parfois avec un multiplicateur sur la sortie."
          },
          {
            term: "RPM (requêtes par minute) :",
            text: "en recul. AWS l’a supprimée pour une partie de ses modèles, Microsoft la dérive mécaniquement du TPM. Elle reste déterminante pour les modèles annexes (images, OCR), souvent plafonnés à quelques dizaines de requêtes par minute."
          },
          {
            term: "Unités de capacité :",
            text: "chez Microsoft, on n’attribue pas des TPM mais des unités, converties en TPM et RPM selon un ratio propre à chaque modèle."
          }
        ]
      },
      {
        type: "p",
        text: "Les fenêtres. Une limite « par minute » est souvent contrôlée sur 1 à 10 secondes. Microsoft le documente : un déploiement à 600 RPM peut refuser des requêtes dès qu’il en reçoit plus de 10 dans la même seconde. De même, une limite de 500 requêtes par 10 secondes n’autorise pas une rafale de 3 000 en une seconde, même si elle équivaut à 3 000 par minute."
      },
      {
        type: "p",
        text: "Deux familles de 429. Le 429 de quota dit que vous avez dépassé votre allocation. Le 429 de capacité dit que le pool partagé est saturé, quel que soit votre quota. Les confondre mène au mauvais remède : demander une hausse de quota quand le problème est la contention."
      },
      {
        type: "p",
        text: "Le 429 n’est pas toujours l’erreur dominante. Sur le trafic d’avril 2026 de la passerelle Requesty, 65,8 % des erreurs renvoyées par les fournisseurs étaient des 429, contre 19,4 % de 400 et moins de 5 % d’erreurs serveur (Requesty). Mais c’est la mesure d’une passerelle qui mutualise de nombreux clients, souvent près de leurs limites. Sur une plateforme d’entreprise aux déploiements largement dimensionnés, le terrain montre souvent l’inverse : des 429 rares, concentrés sur quelques minutes et quelques petits déploiements, noyés dans des erreurs de requête bien plus nombreuses. Avant de bâtir une stratégie anti-429, il faut mesurer sa propre répartition des erreurs."
      },
      {
        type: "h",
        id: "niveaux",
        text: "Les sept niveaux : des facteurs à examiner, pas des étapes"
      },
      {
        type: "p",
        text: "Sept facteurs peuvent limiter une requête LLM. Ce ne sont pas sept étapes successives qui émettraient chacune leur 429 : on y trouve des composants, des règles, des paramètres d’allocation et une contrainte physique, chacun avec sa propre unité. Ils ne sont pas tous de même nature et se rangent en trois familles : les mécanismes de contrôle du trafic (niveaux 1 à 4 : votre code, votre limiteur, votre passerelle, le quota du fournisseur), les politiques d’allocation de capacité (niveaux 5 et 6 : le niveau de service et le périmètre géographique, que vous choisissez et que le fournisseur applique) et la contrainte physique du fournisseur (niveau 7). C’est la grille de lecture du reste de cet article."
      },
      {
        type: "diagram",
        variant: "seven-levels"
      },
      {
        type: "table",
        head: [
          "Niveau",
          "Qui le contrôle",
          "Unité",
          "Ce qui casse",
          "Levier"
        ],
        rows: [
          [
            "1. Instance applicative",
            "Vous (code)",
            "Requêtes HTTP",
            "Se multiplie avec le nombre d’instances ; ignore la taille des prompts",
            "Passer au niveau 2 dès qu’il y a plus d’une instance"
          ],
          [
            "2. Limiteur distribué",
            "Vous (Redis ou équivalent)",
            "Requêtes ou tokens",
            "Compter en requêtes alors que le fournisseur compte en tokens",
            "Compter en tokens pondérés, sortie comprise"
          ],
          [
            "3. Gateway",
            "Vous ou votre plateforme",
            "Tokens par clé, budgets",
            "Compteurs séparés par passerelle ; chemins qui la contournent",
            "Budgets par consommateur, routage entre backends"
          ],
          [
            "4. Quota fournisseur",
            "Fournisseur, ajustable",
            "TPM / RPM par modèle, compte ou abonnement",
            "Comptage propre au service et au déploiement, parfois sur estimation (max_tokens compris)",
            "Dimensionner max_tokens, demander une hausse justifiée"
          ],
          [
            "5. Niveau de service",
            "Vous choisissez, le fournisseur applique",
            "Standard, Priority, Flex, réservé",
            "Priorité plus basse en cas de forte demande",
            "Un niveau par type de flux"
          ],
          [
            "6. Périmètre géographique",
            "Vous choisissez",
            "Région, zone, global",
            "Capacité et services disponibles",
            "Le levier régional"
          ],
          [
            "7. Capacité physique",
            "Fournisseur seul",
            "GPU, temps de calcul",
            "Contention du pool partagé",
            "Capacité réservée, multi-fournisseur"
          ]
        ]
      },
      {
        type: "p",
        text: "Les niveaux 1 et 3 donnent un faux sentiment de contrôle. Le limiteur intégré de LangChain ne vaut que pour un processus et ne compte que des requêtes (LangChain, rate limiters) ; la politique llm-token-limit d’Azure API Management compte séparément sur chaque passerelle (Azure, politique llm-token-limit). Dans les deux cas, plusieurs instances multiplient le budget, et une gateway ne protège que le trafic qui passe par elle."
      },
      {
        type: "h",
        id: "fournisseurs",
        text: "Ce qui change d’un fournisseur à l’autre"
      },
      {
        type: "p",
        text: "Les trois fournisseurs partagent ces mécanismes, mais les appliquent différemment. Le tableau ne garde que les différences qui changent une décision ; le détail par fournisseur, endpoints, coefficients et options payantes, est en annexe A."
      },
      {
        type: "table",
        head: [
          "Critère",
          "AWS Bedrock",
          "Microsoft Foundry",
          "Google Agent Platform"
        ],
        rows: [
          [
            "Périmètre du quota",
            "Compte, modèle, région source",
            "Abonnement, modèle, type de déploiement",
            "Organisation, modèle"
          ],
          [
            "Ce que vous réglez",
            "Rien par déploiement : des quotas de compte",
            "Des unités de capacité par déploiement",
            "Rien en Standard : votre palier dépend de votre dépense"
          ],
          [
            "Unité principale",
            "TPM entrée + sortie (runtime) ; entrée et sortie séparées (mantle)",
            "TPM, RPM dérivé",
            "Seuil de priorité en TPM"
          ],
          [
            "Rôle de max_tokens",
            "Réservé à l’admission, remboursé en fin de requête",
            "Documentation contradictoire en Standard ; compté puis régularisé en PTU",
            "Non détaillé dans la doc"
          ],
          [
            "Piège de comptage",
            "Burndown de ×5 à ×15 sur la sortie, selon le modèle",
            "Fenêtres RPM de 1 à 10 s",
            "Pics à la seconde limités"
          ],
          [
            "Montée en charge",
            "Demande de hausse (priorisée si usage réel)",
            "Quota tiers automatiques",
            "Usage tiers sur 30 jours de dépense"
          ],
          [
            "Capacité réservée",
            "Reserved tier, Provisioned Throughput",
            "PTU",
            "Provisioned Throughput (GSU)"
          ],
          [
            "Priorité payante",
            "Priority (+75 %), selon le modèle",
            "Priority processing",
            "Priority PayGo"
          ],
          [
            "Option économique",
            "Flex (-50 %), Batch, selon le modèle",
            "Flex processing, Batch",
            "Flex PayGo (~-50 %), Batch"
          ],
          [
            "Routage multi-région",
            "Profils géographiques et globaux",
            "Déploiements Global et Data Zone",
            "Endpoint global"
          ]
        ]
      },
      {
        type: "h",
        id: "region",
        text: "Le levier régional, et le prix de la résidence"
      },
      {
        type: "p",
        text: "Le périmètre géographique est le levier de débit le moins cher : il n’ajoute pas de frais de routage, et chez AWS le profil global coûte même environ 10 % de moins que les profils géographiques. Il se paie en contrôle sur l’endroit où vos prompts sont traités. Les trois fournisseurs proposent la même échelle : une région, une zone (UE, US), le monde. Plus on monte, plus on a en général de capacité, selon le modèle et l’offre ; plus on descend, plus la conformité est simple."
      },
      {
        type: "p",
        text: "Microsoft le formule sans détour : Global offre les quotas par défaut les plus élevés et reçoit les nouveaux modèles en premier ; les types régionaux arrivent en dernier, sans date garantie, et dépendent de la capacité libérée par les anciens modèles (Microsoft, types de déploiement). La raison est matérielle : mutualiser plusieurs régions permet d’utiliser les GPU libres où qu’ils soient."
      },
      {
        type: "table",
        head: [
          "Barreau",
          "AWS Bedrock",
          "Microsoft Foundry",
          "Google Agent Platform"
        ],
        rows: [
          [
            "Région",
            "Appel mono-région",
            "Standard, Regional Provisioned",
            "Endpoint régional"
          ],
          [
            "Zone UE",
            "Profil eu. : destinations européennes, qui dépendent de la région source",
            "Data Zone EU : traité dans l’EU Data Boundary",
            "Endpoint multi-région UE"
          ],
          [
            "Monde",
            "Profil global. : toutes les régions commerciales",
            "Global Standard, Global Provisioned",
            "Endpoint global"
          ],
          [
            "Liste des régions",
            "Figée : tout ajout donne un nouvel identifiant de profil",
            "Microsoft peut ajouter des régions à une zone sans préavis",
            "Garanties publiées modèle par modèle"
          ],
          [
            "Piège spécifique",
            "Une SCP qui bloque une destination fait échouer la requête",
            "L’EU Data Boundary peut inclure la Norvège et la Suisse",
            "Hors régions listées, aucune garantie de lieu de traitement"
          ]
        ],
        caption: "Sources : AWS, profils géographiques ; Microsoft, types de déploiement ; Google, résidence des données."
      },
      {
        type: "p",
        text: "La zone UE est souvent un bon compromis pour une entreprise européenne, selon ses obligations de résidence et la disponibilité des modèles : plus de capacité sans sortir les données de la zone, à condition de vérifier ce qu’elle couvre : la Norvège et la Suisse dans l’EU Data Boundary de Microsoft, des destinations qui varient selon la région source chez AWS. Chez Microsoft, le quota y est mis en commun pour toute la zone ; chez AWS, la liste des régions d’un profil eu. ne change jamais sans nouvel identifiant."
      },
      {
        type: "p",
        text: "Le prix de la résidence se paie surtout en services. Priority, Flex ou Batch disparaissent souvent en zone UE ou en région : les leviers anti-429 vivent surtout dans le mode global. Le détail par fournisseur, et les cas de Sweden Central et des modèles sans profil européen, sont en annexe C."
      },
      {
        type: "p",
        text: "Deux avertissements. Le routage multi-région augmente le débit, pas la résilience : Microsoft précise qu’une interruption de la région primaire affecte tout le trafic qui y était routé. Et résidence n’est pas souveraineté : l’AWS European Sovereign Cloud, ouvert en janvier 2026 avec Bedrock, offre un cran de plus, au prix d’un pool de capacité isolé et d’un catalogue plus étroit (AWS, European Sovereign Cloud)."
      },
      {
        type: "h",
        id: "decideurs",
        text: "Qui décide de quoi"
      },
      {
        type: "p",
        text: "Sans gouvernance explicite, la capacité d’inférence n’a pas de propriétaire. L’équipe plateforme crée les déploiements, chaque projet demande des hausses de quota au fil de l’eau, la finance découvre la facture après coup, et personne n’arbitre quand deux usages veulent la même capacité au même moment. Le premier geste de gouvernance consiste à nommer qui décide de quoi."
      },
      {
        type: "table",
        head: [
          "Décision",
          "Qui propose",
          "Qui décide",
          "Sur quelle base"
        ],
        rows: [
          [
            "Classer un usage : critique, courant ou différé",
            "Le métier qui porte l’usage",
            "Le responsable de la plateforme IA, avec le métier",
            "L’impact d’une indisponibilité, l’objectif de service"
          ],
          [
            "Fixer le plancher et le plafond d’une application",
            "L’équipe plateforme",
            "Le responsable de la plateforme ; la direction en cas de conflit entre métiers",
            "La consommation mesurée, la criticité"
          ],
          [
            "Demander une hausse de quota, ouvrir un abonnement ou un compte",
            "L’équipe plateforme",
            "Le responsable de la plateforme, la finance informée",
            "Les vérifications de l’annexe F, le coût de suivi d’une enveloppe de plus"
          ],
          [
            "Réserver de la capacité (PTU, Reserved tier, GSU)",
            "L’équipe plateforme et la FinOps",
            "La finance, sur dossier",
            "Le taux d’utilisation prévu, la durée d’engagement, les alternatives"
          ],
          [
            "Autoriser un flux hors de la zone UE",
            "Le métier",
            "La direction habilitée, après avis du DPO et de la conformité",
            "La nature des données, les obligations de résidence"
          ],
          [
            "Ajouter un fournisseur ou un modèle",
            "L’architecture",
            "Le comité IA, avec les achats et les risques",
            "La substituabilité, la concentration, le coût de sortie"
          ],
          [
            "Fixer les budgets des agents",
            "Le métier et l’équipe plateforme",
            "Le responsable de la plateforme",
            "Le coût par exécution, la criticité"
          ]
        ]
      },
      {
        type: "p",
        text: "Les intitulés changent d’une organisation à l’autre ; ce tableau est une proposition de l’auteur, pas une norme. Ce qui compte, c’est que chaque décision ait un décideur unique et une règle écrite, et que la plateforme sache l’appliquer. Une règle que personne n’a écrite s’applique quand même : c’est l’application la plus bruyante qui la fixe, au moment de la saturation."
      },
      {
        type: "p",
        text: "L’exemple des abonnements supplémentaires. Ouvrir un abonnement ou un compte de plus est souvent le moyen le plus rapide de gagner du débit, puisque chacun apporte sa propre enveloppe de quota (voir « Les moyens »). Décidé par la plateforme, c’est un levier. Laissé à chaque projet, ce geste multiplie les enveloppes à suivre, les clés à protéger et les factures à rapprocher, sans que personne ne sache quelle capacité l’entreprise détient réellement."
      },
      {
        type: "h",
        id: "allocation",
        text: "Les règles d’allocation : qui passe en premier"
      },
      {
        type: "p",
        text: "Une fois les décideurs nommés, il leur faut des règles. Le fournisseur répartit une capacité rare selon les siennes ; l’entreprise doit décider quels usages passent en premier. Aucune organisation ne peut laisser chaque application décider seule de ce qu’elle consomme."
      },
      {
        type: "p",
        text: "Dans le pool partagé, le trafic Standard passe après la capacité réservée par contrat et après le trafic prioritaire ; au-delà, les règles d’allocation des fournisseurs ne sont pas publiques. Ce qui reste prévisible, c’est ce que vous achetez et ce que vous répartissez vous-même. Gouverner, concrètement, c’est poser quatre règles :"
      },
      {
        type: "defs",
        items: [
          {
            term: "Des classes de criticité,",
            text: "chacune associée à un niveau de service fournisseur : critique (capacité réservée, Priority), courant (Standard), différé (Flex, Batch)."
          },
          {
            term: "Des planchers et des plafonds par application.",
            text: "Un plancher réserve à une application critique une part de l’enveloppe, dans la limite de la capacité que le fournisseur livre réellement ; un plafond empêche une application secondaire de tout consommer."
          },
          {
            term: "La résidence comme attribut du flux, pas de toute la plateforme.",
            text: "Seuls les flux qui l’exigent restent en zone UE ; les autres peuvent profiter du mode global et de ses leviers."
          },
          {
            term: "Des engagements internes.",
            text: "Chaque classe a son objectif de disponibilité et de latence, et la plateforme mesure qu’elle le tient."
          }
        ]
      },
      {
        type: "p",
        text: "Palantir documente un modèle proche, à trois niveaux : l’enveloppe globale par modèle, des limites par projet et des limites par utilisateur. Son exemple rend concret le plancher : sur une enveloppe d’un million de TPM, une application de production peut réserver 250 000 TPM, qu’elle consomme en premier, avant de puiser dans les 750 000 partagés ; 20 % de l’enveloppe restent par ailleurs réservés aux requêtes interactives, les traitements par lots ne pouvant dépasser 80 % (Palantir, gestion de la capacité LLM)."
      },
      {
        type: "p",
        text: "L’objectif n’est pas de faire passer le plus de requêtes possible, mais de protéger les usages critiques dans la capacité effectivement disponible, avec des objectifs de service et des mécanismes de repli, même quand tous partagent le même quota. C’est une allocation gouvernée de la capacité d’inférence, et elle ne dépend d’aucun fournisseur."
      },
      {
        type: "h",
        id: "argent",
        text: "L’argent : réserver ou payer à l’usage"
      },
      {
        type: "p",
        text: "La capacité d’inférence s’achète de trois façons : au token, avec une dépense variable et sans garantie ; en capacité réservée, avec une dépense fixe ; avec des options de priorité ou de décote (Priority, Flex, Batch), qui changent le prix d’un token selon l’urgence. Le choix entre elles n’est pas un réglage technique : c’est une décision d’investissement."
      },
      {
        type: "p",
        text: "Réserver, c’est s’engager. La FinOps Foundation parle d’un « engagement stratégique plutôt que d’un simple mécanisme de remise » : la capacité réservée se paie en continu, qu’elle serve ou non (FinOps Foundation, options de capacité GenAI). Dans l’exemple chiffré de Microsoft, avec les hypothèses de prix retenues, PTU et paiement au token coûtent à peu près autant à pleine utilisation, et le PTU revient plus cher par token en dessous (annexe B). Le seuil de rentabilité doit être recalculé pour le modèle, le contrat et la charge réels. La FinOps Foundation cite même une offre réservée dont le prix au token dépasse de 67 % celui du standard à pleine utilisation : on la prend pour un engagement de latence ou de disponibilité, pas pour économiser."
      },
      {
        type: "p",
        text: "Quatre questions avant de réserver :"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Le trafic est-il régulier ?",
            text: "Une charge stable et élevée rentabilise une réservation ; des rafales la laissent inutilisée la plupart du temps."
          },
          {
            term: "2. L’usage exige-t-il un engagement de service ?",
            text: "Si un usage critique ne supporte ni refus ni latence variable, la réservation se justifie même plus chère."
          },
          {
            term: "3. Combien de temps le modèle restera-t-il le bon ?",
            text: "Chez AWS, une réservation est liée à un modèle ; chez Google, à un éditeur, et elle ne se réduit pas ; chez Microsoft, des PTU peuvent rester sans déploiement si la capacité manque pour le nouveau modèle (même source)."
          },
          {
            term: "4. Qui porte la capacité inutilisée ?",
            text: "La FinOps Foundation fait de la capacité allouée et inutilisée « la forme de gaspillage la plus courante ». Sans propriétaire, elle n’apparaît nulle part."
          }
        ]
      },
      {
        type: "p",
        text: "Rendre la consommation visible, puis la refacturer. Un quota partagé est un bien commun : sans visibilité par métier, chacun consomme sans coût apparent. La première étape est de montrer à chaque métier ce qu’il consomme, en tokens, en euros et en capacité réservée détenue pour lui. La refacturation vient ensuite, quand les règles d’allocation sont stables. Elle suppose que chaque appel porte l’identité de son consommateur, ce que seule une passerelle couvrant toutes les routes garantit."
      },
      {
        type: "p",
        text: "Un plafond de débit n’est pas un plafond de dépense. En avril, un développeur a signalé sur le forum Google une facture de 54 000 € en 13 heures, causée par une clé non restreinte utilisée pour appeler Gemini (forum Google AI). Certains fournisseurs proposent un plafond mensuel, comme l’API Anthropic en direct, qui renvoie alors un 429 sans délai de reprise (annexe F). Ailleurs, il faut des budgets et des alertes de dépense posés par l’entreprise, par métier et par clé."
      },
      {
        type: "h",
        id: "risque",
        text: "Le risque : concentration, réversibilité, résidence"
      },
      {
        type: "p",
        text: "Quand un assistant ou un agent devient indispensable à un métier, sa dépendance à un fournisseur, à un modèle et à une région devient un risque d’entreprise. Le 429 en est le signe le plus visible : il montre ce qui se passe quand la seule capacité disponible se dérobe."
      },
      {
        type: "table",
        head: [
          "Risque",
          "Le signal",
          "La parade"
        ],
        rows: [
          [
            "Concentration sur un fournisseur",
            "Tous les usages critiques chez le même",
            "Un second fournisseur testé pour ces usages, et un routeur capable d’y basculer"
          ],
          [
            "Concentration sur un modèle",
            "Aucun modèle de remplacement évalué",
            "Un modèle de repli validé par usage critique, avec ses propres tests de qualité"
          ],
          [
            "Concentration sur une région",
            "Tout le trafic dans une région, parfois la seule à proposer le modèle (annexe C)",
            "Une zone UE ou une seconde région, après vérification du catalogue"
          ],
          [
            "Verrouillage contractuel",
            "Une réservation longue, liée à un modèle ou à un éditeur",
            "Des engagements courts et une couverture partielle"
          ],
          [
            "Dispersion",
            "Des abonnements, comptes et clés ouverts projet par projet",
            "Un inventaire central ; l’ouverture décidée par la plateforme"
          ]
        ]
      },
      {
        type: "p",
        text: "La réversibilité a un coût qu’il faut payer avant l’incident. Changer de modèle ou de fournisseur ne se fait pas en un jour : prompts, évaluations, formats d’appel et réservations sont souvent propres à un modèle. Un repli qui n’a jamais été testé n’en est pas un. Rappelons aussi que le routage multi-région augmente le débit, pas la résilience : une panne de la région primaire touche tout le trafic qui y était routé."
      },
      {
        type: "p",
        text: "Pour la finance, c’est une obligation. Le règlement DORA s’applique aux entités financières de l’UE depuis le 17 janvier 2025 (CSSF). Il leur impose un registre de tous les accords portant sur des services informatiques, et, pour les services qui soutiennent des fonctions critiques ou importantes, des stratégies de sortie documentées et testées (DORA, article 28). Avant de contracter, elles doivent aussi évaluer le risque de concentration, notamment quand les services ne sont pas facilement substituables ou quand plusieurs accords de ce type sont passés avec le même prestataire (DORA, article 29). Un assistant qui soutient une fonction critique et ne repose que sur un modèle, chez un fournisseur, entre dans ce cadre ; hors du secteur financier, la même grille reste une bonne discipline."
      },
      {
        type: "p",
        text: "La résidence est un arbitrage, pas un absolu. Exiger un traitement dans l’UE pour tous les flux fait perdre des leviers anti-429 (Priority, Flex, parfois des modèles entiers ; annexe C). Exiger le mode global pour tous les flux peut violer les obligations de certains. La décision se prend flux par flux par le responsable habilité, après avis de la conformité et du DPO lorsque des données personnelles sont concernées ; la plateforme l’applique comme une contrainte de routage."
      },
      {
        type: "h",
        id: "agents",
        text: "Les agents : le budget d’exécution comme règle d’entreprise"
      },
      {
        type: "p",
        text: "Avec un agent, l’unité qui compte n’est plus la requête mais l’exécution. Prenons une demande qui déclenche un agent principal, lequel délègue à trois agents spécialisés qui font chacun cinq appels au modèle : cela fait 16 appels pour une seule demande. Si chaque appel refusé est retenté deux fois, le pire cas monte à 48. Dix utilisateurs simultanés suffisent alors à envoyer plusieurs centaines d’appels en rafale sur le même quota, alors que le trafic « utilisateur » paraît modeste."
      },
      {
        type: "p",
        text: "Ce n’est pas théorique. HiveMind décrit des agents de code lancés en parallèle sur la même API qui échouent alors que la capacité suffisait en séquentiel (arXiv 2604.17111). Les reprises non coordonnées aggravent la contention qu’elles cherchent à contourner."
      },
      {
        type: "p",
        text: "Le contrôle doit donc porter sur l’exécution entière. Les valeurs ci-dessous sont des ordres de grandeur à ajuster, pas des recommandations mesurées."
      },
      {
        type: "table",
        head: [
          "Contrôle",
          "Exemple",
          "Ce qu’il évite"
        ],
        rows: [
          [
            "Budget de tokens par exécution",
            "100 000 tokens par workflow",
            "Une boucle qui épuise le quota de tous"
          ],
          [
            "Profondeur de délégation",
            "5 niveaux au plus",
            "Des agents qui se délèguent sans fin"
          ],
          [
            "Parallélisme",
            "4 sous-agents simultanés",
            "Une rafale qui sature le pool"
          ],
          [
            "Budget de reprises",
            "3 reprises cumulées par exécution",
            "Des retries qui se multiplient à chaque niveau"
          ],
          [
            "Priorité métier",
            "Un agent de service client passe avant un traitement documentaire",
            "Qu’un traitement de fond bloque un usage critique"
          ],
          [
            "Budget monétaire",
            "2 € par exécution",
            "Une dérive de coût invisible dans les quotas"
          ],
          [
            "Délai",
            "Arrêt après 60 secondes",
            "Une exécution qui monopolise la capacité"
          ]
        ]
      },
      {
        type: "p",
        text: "Où appliquer ces bornes. La passerelle voit chaque appel, mais pas l’arbre d’exécution qui les relie. Les bornes par exécution vivent donc dans le runtime des agents. Pour que la passerelle puisse les vérifier ou les compléter, chaque appel doit porter un identifiant d’exécution propagé de bout en bout : c’est lui qui permet d’additionner les tokens d’une même demande, de couper une exécution qui dépasse son budget et de relier un 429 à l’agent qui l’a provoqué."
      },
      {
        type: "p",
        text: "Dégrader plutôt qu’échouer. Quand le budget est atteint ou que le fournisseur refuse, un agent peut basculer vers un modèle plus léger, réduire sa profondeur, mettre une sous-tâche en file différée ou rendre une réponse partielle signalée comme telle. Ces choix se décident à l’avance, par classe de criticité, pas au moment de l’incident. Et la supervision doit suivre l’exécution métier, pas seulement le transport (annexe E, erreur n° 12)."
      },
      {
        type: "h",
        id: "piloter",
        text: "Piloter : ce que la direction doit voir"
      },
      {
        type: "p",
        text: "Une politique d’allocation qui n’est pas mesurée n’existe que sur le papier. Six indicateurs suffisent pour qu’un comité sache si elle tient."
      },
      {
        type: "table",
        head: [
          "Indicateur",
          "Ce qu’il dit",
          "Ce qu’il ne dit pas"
        ],
        rows: [
          [
            "Taux de refus par classe de criticité, et par origine (application, passerelle, fournisseur)",
            "Si les usages critiques sont protégés",
            "La cause d’un refus : c’est le rôle du diagnostic (annexe F)"
          ],
          [
            "Respect des objectifs de service par classe : disponibilité, latence",
            "Si les engagements internes sont tenus",
            "Si l’objectif était le bon"
          ],
          [
            "Capacité détenue face à la capacité consommée : alloué, réservé, consommé",
            "Le gaspillage et la marge",
            "Une saturation : un quota alloué à 100 % peut être peu utilisé"
          ],
          [
            "Dépense par métier et par usage, coût par exécution d’agent",
            "Qui consomme quoi, et à quel prix",
            "La valeur créée par cette dépense"
          ],
          [
            "Répartition du trafic par fournisseur, modèle et région",
            "Le niveau de concentration",
            "La capacité réelle de basculer : seul un test le prouve"
          ],
          [
            "Part du trafic qui contourne la passerelle",
            "La couverture réelle de la politique",
            "Ce que fait ce trafic"
          ]
        ]
      },
      {
        type: "p",
        text: "Une grille de maturité. Elle sert à situer une organisation et à choisir la prochaine étape ; c’est une proposition de l’auteur, sans enquête qui la mesure."
      },
      {
        type: "table",
        head: [
          "Niveau",
          "Ce qu’on observe"
        ],
        rows: [
          [
            "1. Subie",
            "Chaque projet crée ses déploiements ; les 429 se découvrent en production, la facture après coup"
          ],
          [
            "2. Visible",
            "Consommation et refus mesurés par application et par origine ; inventaire des abonnements, comptes et clés"
          ],
          [
            "3. Allouée",
            "Classes de criticité, planchers et plafonds, budgets par application et par agent, appliqués par la passerelle"
          ],
          [
            "4. Arbitrée",
            "Décideurs nommés, réservations décidées sur dossier, résidence choisie flux par flux, revue régulière"
          ],
          [
            "5. Résiliente",
            "Un repli testé par usage critique, une stratégie de sortie, des objectifs de service suivis par la direction"
          ]
        ]
      },
      {
        type: "p",
        text: "L’incident d’ouverture illustre les améliorations qu’une organisation peut engager en interne, sans rien demander à son fournisseur : rendre la consommation visible, fixer des priorités et appliquer des budgets, soit le passage du niveau 1 au niveau 3."
      },
      {
        type: "h",
        id: "plateforme",
        text: "Les moyens : une plateforme qui applique la politique"
      },
      {
        type: "p",
        text: "Les règles qui précèdent ne valent que si la plateforme sait les appliquer, et un compteur devant un endpoint n’y suffit pas. Une plateforme qui résiste aux 429 enchaîne cinq fonctions : identifier et budgéter à la passerelle, admettre selon une estimation fidèle à celle du fournisseur, ordonner les flux par criticité, router vers le bon modèle, la bonne région ou le bon fournisseur, et observer chaque refus à son origine. Pour les agents, une sixième fonction vit dans le runtime : borner l’exécution entière."
      },
      {
        type: "diagram",
        variant: "admission-chain"
      },
      {
        type: "p",
        text: "Qui contrôle quoi."
      },
      {
        type: "table",
        head: [
          "Composant",
          "Ce qu’il contrôle",
          "Ce qu’il ne voit pas"
        ],
        rows: [
          [
            "Passerelle IA",
            "Identité, budget par consommateur, toutes les routes, journal des refus",
            "L’exécution complète d’un agent ; l’état du pool du fournisseur"
          ],
          [
            "Contrôle d’admission",
            "Tokens pondérés comme chez le fournisseur (burndown, max_tokens), concurrence, budget monétaire",
            "La criticité métier, si personne ne la déclare"
          ],
          [
            "Ordonnanceur",
            "L’ordre de passage entre flux critiques, standard et différés",
            "Ce qui se passe une fois la requête envoyée"
          ],
          [
            "Routeur",
            "Modèle, région, fournisseur, débordement, dégradation",
            "Les règles de résidence, sauf si elles sont codées comme contrainte"
          ],
          [
            "Runtime d’agents",
            "Budget par exécution, profondeur, parallélisme, reprises, délai",
            "Le trafic des autres applications"
          ],
          [
            "Observabilité",
            "429 par origine, estimé contre facturé, retries, file d’attente",
            "Rien d’exploitable sans identifiant de requête et d’exécution propagé"
          ]
        ]
      },
      {
        type: "p",
        text: "Le quota fournisseur fixe une enveloppe d’usage et des règles d’admission ; il ne dit rien de la répartition entre vos applications. C’est à vous de la construire. Une politique complète, par consommateur et par modèle, répond à dix questions :"
      },
      {
        type: "table",
        head: [
          "Élément",
          "Question"
        ],
        rows: [
          [
            "Identité",
            "Quelle identité authentifiée porte le quota ?"
          ],
          [
            "Environnement",
            "Dev, recette et production partagent-ils le même quota fournisseur ?"
          ],
          [
            "Cible",
            "Quel déploiement ou profil, dans quelle région ?"
          ],
          [
            "Requêtes",
            "Combien d’appels par fenêtre ?"
          ],
          [
            "Tokens",
            "Quel budget, pondéré comme le fournisseur le pondère ?"
          ],
          [
            "Concurrence",
            "Combien d’appels simultanés au maximum ?"
          ],
          [
            "File d’attente",
            "Combien d’appels en attente, et combien de temps au plus ?"
          ],
          [
            "Reprises",
            "Combien de tentatives, sur quelle durée totale, pour quelles erreurs ?"
          ],
          [
            "Dégradation",
            "Que se passe-t-il si le service de comptage tombe : on ouvre ou on ferme ?"
          ],
          [
            "Cohérence",
            "La somme des budgets reste-t-elle sous le plafond fournisseur, avec une marge ?"
          ]
        ]
      },
      {
        type: "p",
        text: "Les principes de mise en œuvre."
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Un compteur partagé entre réplicas et entre passerelles.",
            text: "Un compteur local multiplie le budget par le nombre de réplicas (annexe E, erreur n° 4) ; il faut un service de comptage externe, souvent adossé à Redis."
          },
          {
            term: "2. Couvrir tous les chemins.",
            text: "Soit tout passe par la gateway, soit le service de comptage est aussi consulté par les appels directs. La clé de répartition doit intégrer le compte, la région source, le modèle et le mode d’inférence."
          },
          {
            term: "3. Borner la concurrence, pas seulement le débit.",
            text: "En streaming, les tokens ne sont connus qu’à la fin : un budget compté après coup ne garantit pas le non-dépassement. La concurrence bornée et, si nécessaire, la réservation préalable avec régularisation complètent le dispositif."
          },
          {
            term: "4. Retenter proprement.",
            text: "Respecter Retry-After et retry-after-ms avec la bonne unité ; sinon backoff exponentiel avec jitter. Borner le nombre et la durée totale des tentatives, en tenant compte des retries du SDK. Ne jamais rejouer une erreur déterministe."
          },
          {
            term: "5. Exploiter le cache de prompt.",
            text: "Chez AWS, les lectures en cache ne comptent pas dans le quota de bedrock-runtime ; chez Microsoft, elles réduisent le dimensionnement PTU. Ailleurs, la documentation parle surtout de facturation : vérifiez par fournisseur, modèle et mode de déploiement."
          },
          {
            term: "6. Séparer les environnements, et au besoin les abonnements.",
            text: "Des déploiements distincts séparent déjà les compteurs : chez Microsoft, un quota de 240 000 TPM réparti en deux déploiements de 120 000 TPM donne deux limites indépendantes (Microsoft Learn, gérer le quota dans Foundry). Des abonnements ou des comptes distincts séparent en plus les enveloppes de quota et la gouvernance, et chacun apporte la sienne : un levier possible pour gagner du débit, chez Microsoft comme chez AWS, à condition de reporter en production les hausses obtenues en recette (AWS Builder Center, gérer les quotas Bedrock à grande échelle). Chez Google, multiplier les projets d’une même organisation ne multiplie pas son seuil Standard PayGo. Aucun de ces cloisonnements n’isole la capacité physique du fournisseur, et chaque abonnement de plus est un quota à suivre, que la passerelle doit savoir localiser."
          }
        ]
      },
      {
        type: "h",
        id: "limites",
        text: "Limites de cette analyse"
      },
      {
        type: "list",
        items: [
          "Les chiffres de capacité et de burndown changent à chaque modèle, de même que la disponibilité de Priority et Flex chez AWS. Ceux cités ici valent à la date indiquée en tête : relisez chaque fiche avant de bâtir une stratégie dessus.",
          "Les taux de 429. Les chiffres des forums sont des témoignages ; la seule mesure publique trouvée vient d’une passerelle (Requesty), sur son propre trafic. Aucun fournisseur ne publie son taux de refus.",
          "Les douze erreurs de terrain décrivent des schémas récurrents. Nous n’avons trouvé aucune enquête mesurant leur fréquence ; le seul chiffre proche vient de HiveMind : sur banc d’essai et sous forte contention, des agents non coordonnés échouent dans 72 à 100 % des cas, bien plus que dans le cas réel qui ouvre l’étude (3 agents sur 11).",
          "Les trois travaux de recherche cités sont des prépublications arXiv ; leurs fiches ne mentionnent pas d’acceptation par une conférence ou une revue.",
          "La capacité IA réelle des hyperscalers en Europe. Aucun des trois ne publie les puces installées par région ; la part de 5 % citée plus haut est un plancher, pas un chiffre exact, et ne mesure pas la capacité accessible par API. L’article compagnon détaille ce que l’on sait du parc européen.",
          "Les règles d’allocation des fournisseurs. La façon dont un fournisseur arbitre entre capacité réservée, trafic prioritaire et Standard n’est pas publique, pas plus que la part de calcul louée ou détenue par chaque laboratoire.",
          "Les bornes proposées pour les agents sont des ordres de grandeur d’illustration, pas des valeurs mesurées.",
          "Le cadre de gouvernance proposé (droits de décision, règles, indicateurs, grille de maturité) est celui de l’auteur. Il s’appuie sur les pratiques documentées par Palantir et la FinOps Foundation et sur le texte de DORA, mais aucune enquête n’en mesure l’effet. Il ne constitue pas un avis juridique sur l’application de DORA à une organisation donnée."
        ]
      },
      {
        type: "p",
        text: "Et cette lecture peut être démentie. Si les fournisseurs reviennent à des quotas fixes et garantis, si les 429 de capacité deviennent rares sans capacité réservée, ou si l’écart entre Global et zone UE disparaît, alors le rationnement était conjoncturel, et une partie de cet article avec."
      },
      {
        type: "h",
        id: "conclusion",
        text: "Conclusion : on ne gère pas un quota, on gère une allocation"
      },
      {
        type: "p",
        text: "En un an, AWS, Microsoft et Google ont fait du rate limiting un marché de la capacité GPU. La rareté est physique, sa répartition est commerciale : le débit garanti s’achète, la priorité se paie, la patience est récompensée, l’historique de dépense influence le seuil de priorité et la géographie le plafond."
      },
      {
        type: "p",
        text: "Mais le marché n’est que la moitié du problème. L’autre moitié est chez soi : une capacité que personne ne possède, des abonnements ouverts au fil de l’eau, des réservations que personne ne suit, des agents qui transforment une demande en dizaines d’appels. La question n’est plus « combien de TPM ? » mais « qui décide de la répartition, selon quelles règles, à quel prix, avec quels risques, et comment le sait-on ? »."
      },
      {
        type: "callout",
        text: "Y répondre demande des décideurs nommés, une politique d’allocation écrite, un budget suivi, des risques évalués, et une plateforme qui admet, ordonne, route et observe pour appliquer tout cela. Tant que la capacité reste rare, le 429 sera un élément de conception et de gouvernance, pas une anomalie. Les organisations qui l’auront compris auront des applications plus fiables, une dépense plus prévisible et des choix plus faciles à défendre devant une direction financière, un DPO ou un régulateur."
      },
      {
        type: "h",
        id: "annexe-a",
        text: "Annexe A : le détail par fournisseur"
      },
      {
        type: "h3",
        text: "AWS Bedrock : deux endpoints, deux comptabilités"
      },
      {
        type: "p",
        text: "bedrock-runtime (InvokeModel, Converse) applique des quotas par modèle et par région : un TPM mono-région, un TPM cross-region et un plafond journalier. Le TPM additionne entrée et sortie dans un seul compteur, partagé entre toutes les API qui appellent le même modèle. Deux routes, deux applications ou deux identités IAM dans le même compte consomment donc le même quota. Le RPM n’existe plus que pour certains modèles (AWS, quotas bedrock-runtime)."
      },
      {
        type: "p",
        text: "bedrock-mantle, qui sert les API compatibles OpenAI et Anthropic Messages, sépare un quota d’entrée et un quota de sortie, sans RPM. À l’arrivée, Bedrock additionne les tokens d’entrée et le max_tokens demandé ; s’il dépasse le quota d’entrée, le refus est immédiat. Si le quota de sortie s’épuise pendant la génération, la réponse est coupée (AWS, quotas bedrock-mantle)."
      },
      {
        type: "p",
        text: "Le burndown est le piège principal. Sur bedrock-runtime, un token de sortie consomme plusieurs tokens de quota selon le modèle : 5 pour les Claude 4.7 et antérieurs, 10 pour Claude Opus 5.5, Sonnet 5, Opus 5 et Fable 5.1, 15 pour les Claude 4.8, alors que la facture compte 1 pour 1. Formule officielle : entrée + écritures en cache + (sortie × taux de burndown) (AWS, comptage des tokens). Une somme brute entrée + sortie ne reproduit donc pas la consommation du quota."
      },
      {
        type: "p",
        text: "Le taux varie d’un modèle à l’autre : sur bedrock-runtime, la fiche de GPT-5.6 Sol indique un burndown de 10, un token de sortie consommant 10 tokens de quota (fiche GPT-5.6 Sol)."
      },
      {
        type: "p",
        text: "Le cross-region est le levier de débit natif : un profil géographique (eu.) ou global (global.) route la requête vers une région de destination disponible, avec un quota distinct. Attention : l’endpoint d’entrée ne dit rien du lieu de traitement. Une requête qui entre par une région européenne avec un profil global. peut être traitée hors d’Europe. Et une seule région de destination bloquée par une SCP fait échouer la requête (AWS, inférence cross-region)."
      },
      {
        type: "p",
        text: "Les service tiers se choisissent par requête via service_tier (AWS, service tiers) :"
      },
      {
        type: "defs",
        items: [
          {
            term: "Reserved :",
            text: "TPM d’entrée et de sortie garantis sur 1 ou 3 mois, débordement automatique vers Standard, cible de 99,5 % de disponibilité."
          },
          {
            term: "Priority :",
            text: "traitement prioritaire, facturé 75 % plus cher que Standard."
          },
          {
            term: "Standard :",
            text: "le comportement par défaut."
          },
          {
            term: "Flex :",
            text: "50 % moins cher, dépriorisé en période de forte demande."
          }
        ]
      },
      {
        type: "p",
        text: "Priority, Standard et Flex partagent le même quota on-demand. Les hausses de quota vont en priorité aux clients qui consomment déjà leur allocation, et aucune n’est accordée sur un modèle en fin de vie."
      },
      {
        type: "p",
        text: "Attention : ces niveaux n’existent pas pour tous les modèles. La prise en charge dépend du modèle, pas de la région, et se lit fiche par fiche. Au 23 octobre 2026, Claude Sonnet 5.5 n’ouvre que le niveau Standard (fiche Claude Sonnet 5.5) et GPT-5.6 Sol exclut Priority et Flex (fiche GPT-5.6 Sol), alors que Nova Pro et Grok 4.6 proposent les deux (Nova Pro, Grok 4.6). Sur ces quatre fiches, les leviers de priorité de Bedrock concernent des modèles secondaires plutôt que les modèles phares."
      },
      {
        type: "h3",
        text: "Microsoft Foundry : le quota comme budget à répartir"
      },
      {
        type: "p",
        text: "Chez Microsoft, le quota est un stock d’unités de capacité que vous distribuez vous-même entre vos déploiements. Chaque unité donne un nombre de TPM et de RPM qui dépend du modèle ; le RPM n’est pas réglable indépendamment (Microsoft, gestion du quota). Deux conséquences pratiques :"
      },
      {
        type: "defs",
        items: [
          {
            term: "Alloué n’est pas consommé.",
            text: "Un quota alloué à 100 % bloque la création de capacité, pas le trafic (voir l’erreur n° 1 en annexe E)."
          },
          {
            term: "Les pools ne sont pas interchangeables.",
            text: "Le quota d’un modèle en Global Standard ne s’ajoute pas à celui du même modèle en Data Zone. Une marge dans un type de déploiement n’est pas une réserve pour l’autre."
          }
        ]
      },
      {
        type: "p",
        text: "Spécificité Azure : les refus comptent aussi. Les requêtes rejetées s’ajoutent au compteur de la minute, ce qui rend dangereux les retries sans délai."
      },
      {
        type: "p",
        text: "Le 429 « invisible » est documenté. Les déploiements Standard partagent un pool commun ; quand la demande approche la capacité, le service peut abaisser temporairement la limite effective d’un déploiement. Le signal est l’en-tête x-ratelimit-limit-tokens : s’il est inférieur au TPM configuré, un ajustement est en cours, qui se résorbe en général en quelques heures."
      },
      {
        type: "p",
        text: "Les quota tiers automatisent la montée en charge. Sept paliers existent, du Free Tier au Tier 6. Le passage au palier supérieur est automatique quand l’usage bute sur la limite, en tenant compte de la relation commerciale et de l’historique de paiement. En pratique, certaines entreprises n’attendent pas le palier suivant : elles ouvrent des abonnements supplémentaires, chacun avec son propre quota (voir « Qui décide de quoi » et « Les moyens »). Depuis le 7 mai 2026, pour les modèles concernés, le quota bascule au niveau de l’abonnement : un pool unique pour toutes les régions en Global Standard, un pool par zone en Data Zone (Microsoft, quotas et limites)."
      },
      {
        type: "p",
        text: "Les options payantes :"
      },
      {
        type: "defs",
        items: [
          {
            term: "PTU :",
            text: "capacité dédiée facturée à l’heure. 429 immédiat dès 100 % d’utilisation, avec retry-after-ms ; Microsoft le présente comme un signal de régulation, pas comme une panne (Microsoft, démarrer avec les PTU)."
          },
          {
            term: "Spillover :",
            text: "le débordement d’un déploiement PTU saturé part vers un déploiement Standard de la même ressource."
          },
          {
            term: "Priority processing :",
            text: "par déploiement ou par requête, en Global Standard et Data Zone US uniquement (Microsoft, Priority processing)."
          },
          {
            term: "Flex processing :",
            text: "50 % moins cher, en Global Standard uniquement, sans retour automatique vers Standard (Microsoft, Flex processing)."
          }
        ]
      },
      {
        type: "h3",
        text: "Google Agent Platform (ex-Vertex AI) : un seuil de priorité, une capacité variable"
      },
      {
        type: "p",
        text: "Depuis Google Cloud Next, le 22 avril 2026, Vertex AI s’appelle Gemini Enterprise Agent Platform (Google, notes de version d’Agent Platform). L’API reste aiplatform.googleapis.com. Google est le fournisseur qui a le plus franchement abandonné le quota fixe par projet."
      },
      {
        type: "p",
        text: "Dynamic Shared Quota et usage tiers. En Standard PayGo, la capacité d’un modèle est mutualisée entre tous les clients. Chaque organisation reçoit un seuil de débit prioritaire fixé par son palier, lui-même calculé sur sa dépense des 30 derniers jours. Ce seuil n’est pas une capacité réservée : en forte contention, des 429 restent possibles en dessous. Au-delà, le trafic peut déborder en best effort. Exemple de la doc : une organisation en Tier 3 bénéficie d’un seuil de 10 millions de TPM sur Gemini 2.5 Flash (Google, Dynamic Shared Quota)."
      },
      {
        type: "p",
        text: "Conséquence : en Standard PayGo, un 429 signale le plus souvent une contention temporaire plutôt qu’un quota atteint ; d’autres modèles et le Provisioned Throughput ont leurs propres limites. Dans un fil plus ancien des forums de Google, des clients payants rapportaient 10 à 15 % de 429 sur 24 heures, jusqu’à 45 % en pointe, sur Gemini 2.0 Flash, un modèle aujourd’hui dépassé (forum Google Cloud)."
      },
      {
        type: "p",
        text: "Les options de consommation forment une échelle claire (Google, options de consommation) :"
      },
      {
        type: "defs",
        items: [
          {
            term: "Provisioned Throughput :",
            text: "capacité réservée en GSU, seule option isolée du pool partagé."
          },
          {
            term: "Priority PayGo :",
            text: "un en-tête suffit, facturé au tarif premium. Base au niveau organisation : 10 M TPM par modèle Pro, 50 M TPM par modèle Flash (Google, Priority PayGo)."
          },
          {
            term: "Standard PayGo :",
            text: "DSQ et usage tiers."
          },
          {
            term: "Flex PayGo :",
            text: "environ 50 % moins cher, pour les traitements qui tolèrent latence et refus."
          },
          {
            term: "Batch :",
            text: "asynchrone, délai de l’ordre de 24 heures."
          }
        ]
      },
      {
        type: "p",
        text: "Google recommande une approche hybride : capacité réservée pour le temps réel critique, Priority pour le trafic fluctuant, Standard pour le reste, Flex et Batch pour l’hors-ligne. Son premier levier anti-429 est l’endpoint global, qui répartit les requêtes sur plusieurs régions (Google Cloud, réduire les erreurs 429)."
      },
      {
        type: "h",
        id: "annexe-b",
        text: "Annexe B : débit garanti, ce que le fournisseur doit absorber et comment l’auditer"
      },
      {
        type: "p",
        text: "Avec une capacité réservée, le fournisseur s’engage à absorber un débit. Mais chacun le mesure dans sa propre unité et convertit vos tokens selon son propre barème. Auditer, c’est recalculer votre consommation avec ce barème et la confronter aux métriques du fournisseur."
      },
      {
        type: "table",
        head: [
          "Critère",
          "AWS Bedrock (Reserved tier)",
          "Microsoft Foundry (PTU)",
          "Google Agent Platform (GSU)"
        ],
        rows: [
          [
            "Unité achetée",
            "TPM d’entrée et TPM de sortie, réservés séparément",
            "PTU, utilisable sur tout modèle supporté",
            "GSU, débit en tokens par seconde propre à chaque modèle"
          ],
          [
            "Minimum",
            "100 000 TPM entrée et 10 000 TPM sortie",
            "15 PTU (Global, Data Zone), 25 à 50 (Regional)",
            "Selon le modèle"
          ],
          [
            "Pondération de la sortie",
            "Sortie réservée à part",
            "1 token de sortie = 8 d’entrée (gpt-5, gpt-5.2), 6 (gpt-5.5), 4 (gpt-4.1)",
            "Burndown par modalité : 1 token texte de sortie = 4 sur gemini-2.0-flash"
          ],
          [
            "Cache de prompt",
            "Les écritures en cache comptent dans le TPM réservé",
            "Lectures en cache déduites (pondérées pour GPT-6)",
            "Lectures en cache réduites"
          ],
          [
            "Fenêtre de contrôle",
            "Par minute",
            "Leaky bucket, 429 à 100 % d’utilisation",
            "120 s pour 1 GSU, 30 s pour 25 GSU, 5 s pour 250 GSU (gemini-2.5-flash)"
          ],
          [
            "Engagement",
            "1 ou 3 mois, prix fixe par 1 000 TPM",
            "Horaire, ou réservation 1 mois ou 1 an",
            "Commande ferme"
          ],
          [
            "Promesse de service",
            "99,5 % de disponibilité visée",
            "Latence : 99 % des requêtes au-dessus de 50 tokens/s (gpt-5), 80 (gpt-5-mini) ; cible publiée, que Microsoft calcule en p50 sur 5 minutes",
            "Isolation du pool partagé"
          ],
          [
            "Au-delà du réservé",
            "Débordement vers Standard",
            "Spillover vers Standard (optionnel)",
            "Débordement vers Standard ou Priority"
          ]
        ],
        caption: "Sources : AWS, service tiers ; Microsoft, dimensionnement PTU ; Google, calcul du PT ; Google, usage du PT."
      },
      {
        type: "p",
        text: "Deux exemples tirés des docs. Chez Microsoft, 1 000 requêtes par minute de 200 tokens d’entrée et 20 de sortie sur gpt-5.2 donnent 360 000 TPM normalisés (200 000 + 8 × 20 000), soit 110 PTU ; avec 50 % de cache, 80 suffisent. Chez Google, 10 requêtes par seconde sur gemini-2.0-flash représentent 57 000 tokens ajustés par seconde, soit 17 GSU."
      },
      {
        type: "p",
        text: "Les pièges du contrat."
      },
      {
        type: "defs",
        items: [
          {
            term: "Réservation n’est pas capacité.",
            text: "Chez Microsoft, une réservation est une remise sur le compteur, pas une garantie de GPU : on crée d’abord le déploiement, on achète ensuite la réservation (Microsoft, provisioned throughput)."
          },
          {
            term: "La capacité non consommée est perdue.",
            text: "Dans l’exemple chiffré de Microsoft, qui repose sur un prix illustratif, PTU et paiement au token coûtent à peu près autant à pleine utilisation ; en dessous, le PTU revient plus cher par token. Microsoft précise que ce calcul ne garantit pas le coût réel : le seuil de rentabilité se recalcule pour le modèle, le contrat et la charge."
          },
          {
            term: "La promesse de latence est une médiane.",
            text: "La cible Microsoft est calculée en p50 par fenêtre de 5 minutes. Elle ne couvre ni la queue de distribution ni le temps jusqu’au premier token."
          }
        ]
      },
      {
        type: "p",
        text: "Grille d’audit en cinq contrôles."
      },
      {
        type: "defs",
        items: [
          {
            term: "1.",
            text: "Recalculer la consommation normalisée à partir de vos logs et du barème publié, puis comparer au compteur du fournisseur : Provisioned-managed Utilization V2 (Azure), EstimatedTPMQuotaUsage (AWS), consumed_token_throughput face à dedicated_gsu_limit (Google)."
          },
          {
            term: "2.",
            text: "Vérifier où le trafic a vraiment été servi : trafficType chez Google, service_tier dans la réponse chez Azure, dimension ResolvedServiceTier chez AWS."
          },
          {
            term: "3.",
            text: "Mesurer la latence promise : métrique Tokens per Second chez Azure, TimeToFirstToken chez AWS (AWS, mars 2026)."
          },
          {
            term: "4.",
            text: "Suivre le taux d’utilisation payé, heure par heure, et réduire la réservation sous le seuil de rentabilité."
          },
          {
            term: "5.",
            text: "Distinguer disponibilité et performance dans le contrat. Un SLA de disponibilité ne couvre pas un débit dégradé."
          }
        ]
      },
      {
        type: "p",
        text: "Point d’attention : EstimatedTPMQuotaUsage intègre le burndown et les écritures en cache, mais pas la réservation initiale liée à max_tokens (AWS, métriques TTFT et quota). Un refus peut donc survenir alors que la métrique reste sous le quota."
      },
      {
        type: "h",
        id: "annexe-c",
        text: "Annexe C : résidence, les leviers perdus fournisseur par fournisseur"
      },
      {
        type: "p",
        text: "Le vrai prix de la résidence : moins de services, pas seulement moins de modèles. Les leviers anti-429 vivent surtout dans le mode Global."
      },
      {
        type: "table",
        head: [
          "Levier",
          "Microsoft Foundry",
          "Google Agent Platform",
          "AWS Bedrock"
        ],
        rows: [
          [
            "Priority",
            "Global Standard ou Data Zone US uniquement ; ni Data Zone EU, ni régional",
            "Endpoints global, us et eu en général ; certains modèles en global seulement",
            "Selon le modèle, pas la région : absent sur Claude Sonnet 5.5 et GPT-5.6 Sol, présent sur Nova Pro et Grok 4.6"
          ],
          [
            "Flex",
            "Global Standard uniquement",
            "Modèles en preview : endpoint global uniquement",
            "Même règle : absent sur Claude Sonnet 5.5 et GPT-5.6 Sol"
          ],
          [
            "Batch",
            "Global Batch (monde) ou Data Zone Batch (UE)",
            "Indisponible via l’endpoint global",
            "Batch inference, quotas propres"
          ],
          [
            "Capacité réservée",
            "PTU Global, Data Zone ou Regional",
            "Pour Claude : endpoints régionaux uniquement",
            "Reserved tier ou Provisioned Throughput"
          ],
          [
            "Surcoût de la résidence",
            "Pas de surcoût affiché, mais moins d’options",
            "Claude en endpoint régional : +10 %",
            "Profil global environ 10 % moins cher que les profils géographiques"
          ]
        ],
        caption: "Sources : Microsoft, Priority ; Microsoft, Flex ; Google, Flex PayGo ; Anthropic, Claude sur Vertex."
      },
      {
        type: "p",
        text: "Le cas Sweden Central. Azure compte une dizaine de régions européennes, mais Sweden Central concentre le catalogue et reste parfois la seule option, notamment pour les modèles affinés (Microsoft, modèles vendus par Azure). Microsoft n’explique pas pourquoi ; il met seulement en avant l’électricité abondante et décarbonée de la Suède. Tout concentrer sur cette région, c’est aussi créer un point de défaillance unique."
      },
      {
        type: "p",
        text: "Le piège inverse existe chez AWS. Claude Sonnet 5.5 dispose d’un profil géographique eu. sur Bedrock ; GPT-5.6 Sol, non : sa fiche ne propose qu’un profil us. et un profil global.. Pour l’appeler depuis Francfort ou Paris sur bedrock-runtime, il faut passer par le profil global, sans garantie de traitement en Europe (fiche GPT-5.6 Sol). Avant de choisir un modèle, il faut donc vérifier non seulement où il est disponible, mais par quel type de profil."
      },
      {
        type: "h",
        id: "annexe-d",
        text: "Annexe D : ce que dit la recherche"
      },
      {
        type: "p",
        text: "Trois travaux récents éclairent directement l’architecture proposée. Ce sont des prépublications arXiv ; leurs fiches ne mentionnent pas encore d’acceptation par une conférence ou une revue."
      },
      {
        type: "defs",
        items: [
          {
            term: "Les agents, côté client.",
            text: "HiveMind part d’un cas concret : 3 agents de code sur 11, lancés en parallèle sur la même API, ont échoué alors que la capacité suffisait en séquentiel. Le proxy proposé applique admission, backpressure, disjoncteur, budget de tokens et files prioritaires, soit l’essentiel de l’architecture décrite plus haut (arXiv 2604.17111)."
          },
          {
            term: "L’équité en latence, pas seulement en débit.",
            text: "Une équipe incluant Matei Zaharia et Scott Shenker montre que les politiques actuelles égalisent le débit des clients sans garantir la latence par token ; leur système FairInference borne cet écart (arXiv 2609.18112). C’est un argument pour des classes de criticité plutôt qu’un simple partage du débit."
          },
          {
            term: "L’isolation dans les passerelles.",
            text: "KeyPooling montre que des passerelles qui mutualisent les clés fournisseur peuvent faire partager le cache de prompt entre clients (arXiv 2608.17485) : une passerelle doit répartir la capacité sans casser l’isolation."
          }
        ]
      },
      {
        type: "h",
        id: "annexe-e",
        text: "Annexe E : douze erreurs à rechercher avant de demander plus de quota"
      },
      {
        type: "p",
        text: "Les docs des fournisseurs décrivent les niveaux 4 à 7. Mais quand on ouvre le capot d’une plateforme IA d’entreprise, plusieurs fragilités se trouvent aux niveaux 1 à 3, chez soi. En voici douze, regroupées par famille."
      },
      {
        type: "h3",
        text: "Mal lire les chiffres"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Confondre allocation et consommation.",
            text: "Un quota alloué à 100 % dit qu’on ne peut plus créer de capacité, pas que le trafic sature. Une plateforme peut avoir plusieurs modèles presque entièrement alloués tout en affichant un taux de refus quasi nul. À l’inverse, une ressource de secours peut n’avoir aucun trafic visible pendant des jours : ce n’est ni une preuve d’inutilité, ni un feu vert pour la supprimer."
          },
          {
            term: "2. Chercher le goulot au mauvais endroit.",
            text: "On surveille le grand modèle de texte, et les refus arrivent ailleurs : sur un modèle d’OCR, d’image ou d’embeddings, plafonné à quelques dizaines de requêtes par minute. Un lot de documents envoyé d’un coup suffit à le saturer. Le bon réflexe est une file d’attente et une concurrence bornée pour ces modèles annexes, pas une hausse générale des quotas."
          },
          {
            term: "3. Classer toutes les erreurs en rate limiting.",
            text: "Les 400, 408, 499, 500 et 503 ne sont pas des 429. Une erreur de paramètre ou de traduction de format est déterministe : la rejouer ne fait qu’ajouter du trafic."
          }
        ]
      },
      {
        type: "h3",
        text: "Des compteurs qui ne comptent pas ce qu’on croit"
      },
      {
        type: "defs",
        items: [
          {
            term: "4. Des compteurs par processus.",
            text: "Un middleware qui stocke ses compteurs en mémoire donne à chaque pod son propre budget. Deux réplicas réglés à N requêtes par minute en acceptent 2N ; un redémarrage remet tout à zéro."
          },
          {
            term: "5. Des fenêtres fixes qui doublent les rafales.",
            text: "Un compteur remis à zéro à la minute laisse passer un plein quota juste avant la frontière, puis un autre juste après. On peut ainsi accepter près du double de la limite en quelques millisecondes. Les algorithmes à fenêtre glissante ou à seau de jetons évitent cet effet."
          },
          {
            term: "6. Une identité mal choisie.",
            text: "Une limite clée sur l’adresse IP voit souvent celle du proxy : tous les utilisateurs partagent alors le même compteur. Une limite clée sur un en-tête fourni par le client se contourne en changeant l’en-tête. La clé d’un quota doit être une identité authentifiée."
          },
          {
            term: "7. Un quota vérifié après coup.",
            text: "Beaucoup de quotas par utilisateur lisent la consommation passée avant d’autoriser un appel, sans réserver les tokens de l’appel en cours. Dix appels simultanés passent tous sous le seuil avant que le premier soit comptabilisé. Et si l’écriture du journal de consommation échoue en silence, la consommation est sous-estimée ensuite."
          }
        ]
      },
      {
        type: "h3",
        text: "Des protections qui se retournent contre soi"
      },
      {
        type: "defs",
        items: [
          {
            term: "8. Les sondes de santé dans le quota.",
            text: "Si le limiteur s’applique à tous les chemins, la route de santé peut recevoir un 429 quand le compteur est saturé. Selon la configuration, l’orchestrateur peut alors considérer le service comme malade. Les sondes techniques doivent sortir du quota métier."
          },
          {
            term: "9. Un 429 local muet.",
            text: "Un refus sans Retry-After ni code d’erreur distinct ne dit ni quand réessayer, ni si le refus vient de l’application, de la gateway ou du fournisseur."
          },
          {
            term: "10. Des retries implicites.",
            text: "Quand le code ne fixe ni nombre de tentatives, ni durée totale, ni plafond de sortie, ce sont les valeurs par défaut du SDK qui décident, et elles changent avec les versions. Un retry sur un flux déjà partiellement envoyé, ou sur une opération à effets de bord, peut dupliquer le travail."
          }
        ]
      },
      {
        type: "h3",
        text: "Des chemins que personne ne voit"
      },
      {
        type: "defs",
        items: [
          {
            term: "11. Des appels qui contournent la gateway.",
            text: "Il suffit d’un client configuré pour appeler directement l’endpoint privé du fournisseur, ou d’une route « native » qui transmet le corps sans le décoder, pour qu’une politique posée uniquement sur la gateway ne voie pas tout le trafic. Or tous ces chemins consomment le même quota fournisseur."
          },
          {
            term: "12. Une supervision qui mélange tout.",
            text: "Une alerte sur « plus de N erreurs 4xx en cinq minutes » au niveau du cluster ne dit ni quel modèle, ni quelle cause, ni quel niveau a refusé. Pire, une application qui transforme proprement un 429 en message d’indisponibilité dans un flux de streaming fait disparaître l’incident de la supervision HTTP : le statut initial reste 200."
          }
        ]
      },
      {
        type: "h",
        id: "annexe-f",
        text: "Annexe F : diagnostiquer un 429, identifier le niveau avant d’agir"
      },
      {
        type: "p",
        text: "Un 429 n’est pas une cause, c’est un symptôme. Avant tout remède, il faut savoir quel niveau l’a émis."
      },
      {
        type: "table",
        head: [
          "Ce qu’on observe",
          "Niveau probable",
          "Ce qu’il faut regarder",
          "Remède"
        ],
        rows: [
          [
            "429 sans en-tête fournisseur, message de votre application",
            "1 ou 2",
            "Logs applicatifs, clé du compteur",
            "Corriger la clé, partager le compteur"
          ],
          [
            "429 avec un en-tête ou un message de la gateway",
            "3",
            "Politique de la gateway, budget du consommateur",
            "Revoir le budget, vérifier le partage des compteurs"
          ],
          [
            "429 avec x-ratelimit-remaining-tokens à zéro",
            "4",
            "Estimation à l’admission, max_tokens, rafales",
            "Baisser max_tokens là où il compte, lisser, puis seulement demander une hausse"
          ],
          [
            "429 alors que les métriques de tokens sont basses",
            "4",
            "Taille des prompts, max_tokens, fenêtres courtes",
            "Mesurer l’estimé, pas le facturé"
          ],
          [
            "x-ratelimit-limit-tokens inférieur au quota configuré",
            "7",
            "Ajustement temporaire du fournisseur",
            "Retry avec délai, débordement, capacité réservée"
          ],
          [
            "429 en rafales à heure fixe, tous clients confondus",
            "7",
            "Contention du pool partagé",
            "Écarter d’abord les traitements planifiés et les rafales internes ; puis endpoint global ou zone, Priority, multi-fournisseur"
          ],
          [
            "429 sur un déploiement réservé",
            "5",
            "Utilisation à 100 %",
            "Spillover, redimensionnement"
          ],
          [
            "429 sur un seul modèle annexe",
            "4",
            "Plafond en requêtes de ce modèle",
            "File d’attente et concurrence bornée"
          ],
          [
            "429 sans retry-after, code enforced_spend_limit_reached (API Anthropic en direct)",
            "4",
            "Plafond de dépense mensuel du palier",
            "Ne pas retenter : passer au palier supérieur, ou attendre le 1er du mois suivant"
          ]
        ]
      },
      {
        type: "p",
        text: "Ce qu’il faut toujours collecter : le message d’erreur exact, les en-têtes (Retry-After, retry-after-ms, x-ratelimit-*), l’identifiant de requête du fournisseur, le niveau de service effectivement appliqué et le nombre de tentatives déjà faites. Les métriques agrégées à la minute disent quand ; seuls ces éléments disent pourquoi."
      },
      {
        type: "p",
        text: "Trois pièges de mesure. Ne pas additionner une série globale et ses sous-séries par modèle. Ne pas lire une absence de série comme une absence de trafic. Et se souvenir que les retries gonflent le nombre de refus : chez AWS, la métrique Invocations exclut les requêtes refusées, comptées à part."
      },
      {
        type: "box",
        title: "Avant de demander plus de quota ou d’ouvrir un abonnement de plus",
        text: "Vérifier que les refus viennent bien du niveau 4 ; que max_tokens est dimensionné sur les réponses réelles ; que le trafic est lissé et la concurrence bornée ; qu’aucune application ne consomme le budget des autres ; et que le modèle n’est pas en fin de vie, sans quoi la hausse sera refusée."
      }
    ],
    sourcesLabel: "Sources",
    sources: [
      {
        label: "AWS : quotas bedrock-runtime"
      },
      {
        label: "AWS : quotas bedrock-mantle"
      },
      {
        label: "AWS : comptage des tokens et burndown"
      },
      {
        label: "AWS : service tiers"
      },
      {
        label: "AWS : inférence cross-region"
      },
      {
        label: "AWS : profils géographiques"
      },
      {
        label: "AWS : métriques TTFT et quota"
      },
      {
        label: "AWS Builder Center : gérer les quotas Bedrock à grande échelle"
      },
      {
        label: "AWS : European Sovereign Cloud"
      },
      {
        label: "Microsoft : quotas et limites"
      },
      {
        label: "Microsoft : gestion du quota"
      },
      {
        label: "Microsoft : limites de débit des LLM dans Dev Proxy"
      },
      {
        label: "Microsoft : types de déploiement"
      },
      {
        label: "Microsoft : provisioned throughput"
      },
      {
        label: "Microsoft : dimensionnement PTU"
      },
      {
        label: "Microsoft : Priority processing"
      },
      {
        label: "Microsoft : Flex processing"
      },
      {
        label: "Microsoft : politique APIM llm-token-limit"
      },
      {
        label: "Google : Dynamic Shared Quota"
      },
      {
        label: "Google : options de consommation"
      },
      {
        label: "Google : Priority PayGo"
      },
      {
        label: "Google : Flex PayGo"
      },
      {
        label: "Google : calcul du Provisioned Throughput"
      },
      {
        label: "Google : résidence des données"
      },
      {
        label: "Google Cloud : réduire les erreurs 429"
      },
      {
        label: "Google : notes de version d’Agent Platform"
      },
      {
        label: "LangChain : rate limiters"
      },
      {
        label: "Anthropic : Claude sur Vertex"
      },
      {
        label: "Claude Platform : limites de débit"
      },
      {
        label: "Rappler/Reuters, d’après le Financial Times : Google limite l’usage de Gemini par Meta"
      },
      {
        label: "Handelsblatt : Matt Garman"
      },
      {
        label: "Requesty : répartition des codes d’erreur (avril 2026)"
      },
      {
        label: "Forum Google AI : pic de facturation Gemini"
      },
      {
        label: "Forum Google Cloud : taux de 429 sur Gemini 2.0 Flash"
      },
      {
        label: "HiveMind (arXiv 2604.17111)"
      },
      {
        label: "FairInference (arXiv 2609.18112)"
      },
      {
        label: "KeyPooling (arXiv 2608.17485)"
      },
      {
        label: "Bruegel : Policy Brief 18/2026 sur le déficit de calcul IA européen"
      },
      {
        label: "Europe2031.ai : Compute Forecast"
      },
      {
        label: "AIE : Energy and AI (synthèse)"
      },
      {
        label: "Palantir : gestion de la capacité LLM"
      },
      {
        label: "Requesty : 429 Too Many Requests, causes et remèdes (mis à jour le 29 septembre 2026)"
      },
      {
        label: "TrueFoundry : limitation de débit dans une AI Gateway (mis à jour le 12 octobre 2026)"
      },
      {
        label: "Palo Alto Networks : Rate Limiting for LLM Applications and Agents"
      },
      {
        label: "FinOps Foundation : Navigating GenAI Capacity Options (mis à jour le 4 février 2026)"
      },
      {
        label: "FinOps Foundation : FinOps for AI"
      },
      {
        label: "DORA : article 28"
      },
      {
        label: "DORA : article 29"
      },
      {
        label: "CSSF : TIC et cyber-risque pour les entités DORA"
      }
    ]
  },
  en: {
    title: "A 429 is not a bug: governing inference capacity at AWS, Microsoft and Google",
    lead: "The “too many requests” code most often hides an allocation nobody decided. How to govern scarce, shared and expensive compute capacity: who decides, by which rules, at what price, with which risks and which indicators.",
    updated: "Published 3 November 2026",
    summaryLabel: "In short",
    summary: [
      "A 429 comes from a rate limit, a spending cap or available capacity, at the provider or in your own platform, and the code alone does not tell you which.",
      "LLM rate limiting has become a market: guaranteed throughput is bought, priority is paid for, patience is rewarded, and data residency is traded against throughput.",
      "Governing inference capacity means naming the decision-makers, writing allocation rules, tracking a budget, assessing risks and having a platform that enforces all of it."
    ],
    blocks: [
      {
        type: "note",
        text: "Sources checked between 23 October and 5 November 2026. Model names, tiers, quotas, prices and regulations change quickly: check the cited documentation before any decision."
      },
      {
        type: "p",
        text: "When a generative AI application calls a model at AWS, Microsoft or Google, the answer can be a refusal: HTTP code 429, “too many requests”. Most of the time nothing is broken: the refusal comes from a rate limit, a spending cap or available capacity, at the provider or in your own platform, and the code alone does not say which. Behind the code lies a management question: compute capacity is scarce, shared and expensive, and a company that does not formalise how it is shared lets its uses fight it out at the moment of saturation."
      },
      {
        type: "p",
        text: "This article is written for CIOs, platform and architecture leads, FinOps and risk functions. It explains where 429s come from, then offers what is needed to govern inference capacity: who decides, by which rules, at what price, with which risks and which indicators. The technical detail and the diagnosis are in the appendices."
      },
      {
        type: "h",
        id: "incident",
        text: "An incident, to begin with"
      },
      {
        type: "note",
        text: "A fictional scenario, built to illustrate the mechanisms described in this article."
      },
      {
        type: "p",
        text: "One Monday at 9:05, a company’s internal assistant answers “service temporarily unavailable” to some of its employees. Yet the dashboard shows the model using only 40% of the text volume allowed per minute. The team’s reflex: ask the provider for a higher limit. It does not need one."
      },
      {
        type: "p",
        text: "The technical logs tell another story. Since 9:00, an automated document job has been sending its requests in batches of several dozen within the same second. Each request is short, so the text volume stays low. But the provider also limits the number of requests per second, and each batch exceeds that limit. And the assistant and the document job go through the same access to the model: employees’ questions that arrive during those seconds are refused. The application retries at once, the software library retries in turn, and the attempts pile up. Finally, the assistant cleanly displays an error message instead of crashing: seen from technical monitoring, everything looks normal."
      },
      {
        type: "p",
        text: "The fix comes down to four moves, without asking the provider for anything: make the document job wait in a queue, reserve part of the capacity for the assistant, cap the total number of retries while respecting the delay indicated by the provider (Retry-After), and track refusals by origin. But these moves assume a decision nobody had made: which of the two uses should go first when capacity runs short. That decision, and all those around it, is what this article calls governing inference capacity."
      },
      {
        type: "h",
        id: "essentiel",
        text: "The essentials in seven ideas"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. LLM rate limiting is no longer a technical safeguard, it is a market.",
            text: "The scarcity of compute is physical, its allocation is commercial: guaranteed throughput is bought, priority is paid for, patience is rewarded."
          },
          {
            term: "2. A 429 is often the symptom of an allocation nobody decided.",
            text: "Before asking for more quota, you need to know who consumes what, by which path, and who should have gone first."
          },
          {
            term: "3. The quota does not see what you see.",
            text: "At AWS on bedrock-runtime, and at Microsoft at least for PTUs, it judges an estimate that includes the requested output cap; with pay-per-token, the bill covers the tokens actually processed, with PTUs the deployed capacity. Consumption metrics are therefore not enough to explain refusals."
          },
          {
            term: "4. Governing starts with naming the decision-makers.",
            text: "Who classifies a use, who sets its floors and ceilings, who opens a subscription, who reserves capacity, who authorises a flow outside the EU."
          },
          {
            term: "5. Reserving capacity is a financial commitment, not just a search for a discount.",
            text: "It is paid for whether it is used or not; the decision belongs to finance, on a business case."
          },
          {
            term: "6. Dependence on a provider, a model or a region is an enterprise risk.",
            text: "For financial entities, DORA makes it an obligation: a register of arrangements, a concentration assessment, a tested exit strategy."
          },
          {
            term: "7. The provider manages physical scarcity, you have to manage yours.",
            text: "With agents, one request becomes dozens of calls: per-run budgets, criticality classes and indicators followed by management protect critical uses when capacity drops."
          }
        ]
      },
      {
        type: "h",
        id: "direction",
        text: "Why this has become a management issue"
      },
      {
        type: "p",
        text: "In 2026, providers no longer hide that capacity is rationed. In late June, the Financial Times reported that Google had capped Meta’s use of Gemini because it could not deliver the capacity requested; other customers were reportedly affected to a lesser degree (Rappler/Reuters). On the AWS side, Matt Garman said in May that supply would remain constrained (Handelsblatt). When one of Google’s largest customers gets capped, no quota can be taken for granted."
      },
      {
        type: "p",
        text: "Physical scarcity, commercial allocation. The constraint is first material: GPUs, memory, network, cooling and above all electricity. An AI data center can be built in a few months; a grid connection takes five years on average in the United States. Europe accounts for only about 5% of the world’s AI compute capacity, against nearly 80% for the United States, and that European capacity mostly serves inference (companion article). But how this capacity is shared between customers, and how its priorities and prices are set, remains a commercial decision. Quotas, tiers and capacity 429s express both at once."
      },
      {
        type: "p",
        text: "For a company, rate limiting touches four stakes at once:"
      },
      {
        type: "defs",
        items: [
          {
            term: "Availability.",
            text: "An assistant, an agent or a processing chain that receives 429s can fail for the user even though nothing is “broken”, unless a queue, a retry or a degraded mode absorbs the refusal. On a well-sized platform these refusals remain rare, but they come in bursts, over a few minutes and often on the smallest deployments."
          },
          {
            term: "Cost.",
            text: "Every provider now sells several prices for the same model: priority, standard, deferred, reserved. Choosing badly means paying for capacity you do not use, or suffering refusals on what you paid for."
          },
          {
            term: "Compliance.",
            text: "The most effective lever for gaining throughput is to let the provider process your data elsewhere. Throughput and data residency are traded against each other."
          },
          {
            term: "Internal fairness.",
            text: "A provider quota is shared by every application that uses it. Without an allocation, the noisiest application decides for the others."
          }
        ]
      },
      {
        type: "p",
        text: "Rate limiting is therefore an architecture and governance decision, not an SDK setting. The provider manages a physical scarcity; the company manages an organisational one: deciding which applications and which agents must keep running when capacity runs short."
      },
      {
        type: "p",
        text: "What this article adds. Taken separately, the mechanisms of rate limiting are already documented, often by gateway vendors (Requesty, TrueFoundry, Palo Alto Networks) or platforms (Palantir), and the FinOps Foundation covers the choice between shared and reserved capacity. What is missing is the link between the mechanics and the decision: that link is what this article builds."
      },
      {
        type: "related",
        href: "/articles/le-gigawatt-et-le-dollar",
        label: "Read also",
        title: "The gigawatt and the dollar",
        text: "The speed gap between AI and the grid also exists in dollars, and it is bridged the same way: with other people’s money."
      },
      {
        type: "h",
        id: "mecanisme",
        text: "Understanding the mechanism"
      },
      {
        type: "p",
        text: "Admission versus billing. This is the most important and least understood point. At AWS (bedrock-runtime), the provider decides whether to accept a request on arrival, based on an estimate: prompt size plus the requested generation cap (max_tokens). It bills afterwards, on actual consumption. A request that asks for 4,000 output tokens and produces 200 has first locked quota for 4,000 (AWS, token counting); Microsoft’s Dev Proxy documentation gives the same example for Azure (Microsoft, LLM rate limits in Dev Proxy). Consequence: billed-token metrics are not enough to explain a 429."
      },
      {
        type: "compare",
        columns: [
          {
            title: "At admission: an estimate",
            items: [
              {
                value: "prompt",
                label: "the size of the request"
              },
              {
                value: "+ 4,000",
                label: "the requested output cap (max_tokens), locked in the quota"
              }
            ]
          },
          {
            title: "At billing: the actual",
            items: [
              {
                value: "prompt",
                label: "the same request"
              },
              {
                value: "+ 200",
                label: "the tokens actually produced, the only ones billed"
              }
            ]
          }
        ],
        caption: "The case where admission relies on an estimate, as at AWS on bedrock-runtime. Appendix A details the variants."
      },
      {
        type: "p",
        text: "The rule is not universal. The Anthropic API used directly counts only the output tokens actually generated: a high max_tokens does not reduce the limit there (Claude Platform, rate limits). At Microsoft, the official pages contradict each other for Standard deployments: the Dev Proxy documentation includes max_tokens in the estimate (Microsoft, LLM rate limits in Dev Proxy), the quota management page counts only actual tokens (Microsoft, quota management); for PTUs, the estimate includes it before being reconciled. Google does not document its role. Counting depends on the provider, the endpoint and the deployment type: lowering max_tokens is a remedy only where it enters the estimate, and a simple test will tell you."
      },
      {
        type: "p",
        text: "The units."
      },
      {
        type: "defs",
        items: [
          {
            term: "TPM (tokens per minute):",
            text: "the limit that bites first for LLMs. It counts input and output, sometimes separately, sometimes with a multiplier on output."
          },
          {
            term: "RPM (requests per minute):",
            text: "in decline. AWS has removed it for some of its models, Microsoft derives it mechanically from TPM. It remains decisive for ancillary models (images, OCR), often capped at a few dozen requests per minute."
          },
          {
            term: "Capacity units:",
            text: "at Microsoft, you do not allocate TPM but units, converted into TPM and RPM according to a ratio specific to each model."
          }
        ]
      },
      {
        type: "p",
        text: "The windows. A “per minute” limit is often enforced over 1 to 10 seconds. Microsoft documents it: a deployment at 600 RPM can refuse requests as soon as it receives more than 10 in the same second. Likewise, a limit of 500 requests per 10 seconds does not allow a burst of 3,000 in one second, even though it is equivalent to 3,000 per minute."
      },
      {
        type: "p",
        text: "Two families of 429. A quota 429 says you have exceeded your allocation. A capacity 429 says the shared pool is saturated, whatever your quota. Confusing them leads to the wrong remedy: asking for a quota increase when the problem is contention."
      },
      {
        type: "p",
        text: "The 429 is not always the dominant error. In the April 2026 traffic of the Requesty gateway, 65.8% of errors returned by providers were 429s, against 19.4% of 400s and less than 5% of server errors (Requesty). But that is the measurement of a gateway pooling many customers, often close to their limits. On an enterprise platform with generously sized deployments, the field often shows the opposite: rare 429s, concentrated over a few minutes and a few small deployments, buried among far more numerous request errors. Before building an anti-429 strategy, measure your own error breakdown."
      },
      {
        type: "h",
        id: "niveaux",
        text: "The seven levels: factors to examine, not steps"
      },
      {
        type: "p",
        text: "Seven factors can limit an LLM request. They are not seven successive steps each issuing its own 429: they include components, rules, allocation parameters and a physical constraint, each with its own unit. They are not all of the same nature and fall into three families: traffic control mechanisms (levels 1 to 4: your code, your limiter, your gateway, the provider quota), capacity allocation policies (levels 5 and 6: the service tier and the geographic scope, which you choose and the provider applies) and the provider’s physical constraint (level 7). This is the reading grid for the rest of the article."
      },
      {
        type: "diagram",
        variant: "seven-levels"
      },
      {
        type: "table",
        head: [
          "Level",
          "Who controls it",
          "Unit",
          "What breaks",
          "Lever"
        ],
        rows: [
          [
            "1. Application instance",
            "You (code)",
            "HTTP requests",
            "Multiplies with the number of instances; ignores prompt size",
            "Move to level 2 as soon as there is more than one instance"
          ],
          [
            "2. Distributed limiter",
            "You (Redis or equivalent)",
            "Requests or tokens",
            "Counting in requests when the provider counts in tokens",
            "Count in weighted tokens, output included"
          ],
          [
            "3. Gateway",
            "You or your platform",
            "Tokens per key, budgets",
            "Separate counters per gateway; paths that bypass it",
            "Budgets per consumer, routing between backends"
          ],
          [
            "4. Provider quota",
            "Provider, adjustable",
            "TPM / RPM per model, account or subscription",
            "Counting specific to the service and deployment, sometimes on an estimate (max_tokens included)",
            "Size max_tokens, request a justified increase"
          ],
          [
            "5. Service tier",
            "You choose, the provider applies",
            "Standard, Priority, Flex, reserved",
            "Lower priority under heavy demand",
            "One tier per type of flow"
          ],
          [
            "6. Geographic scope",
            "You choose",
            "Region, zone, global",
            "Available capacity and services",
            "The regional lever"
          ],
          [
            "7. Physical capacity",
            "Provider only",
            "GPUs, compute time",
            "Contention in the shared pool",
            "Reserved capacity, multi-provider"
          ]
        ]
      },
      {
        type: "p",
        text: "Levels 1 and 3 give a false sense of control. LangChain’s built-in limiter only applies to one process and only counts requests (LangChain, rate limiters); the llm-token-limit policy of Azure API Management counts separately on each gateway (Azure, llm-token-limit policy). In both cases, several instances multiply the budget, and a gateway only protects the traffic that goes through it."
      },
      {
        type: "h",
        id: "fournisseurs",
        text: "What changes from one provider to another"
      },
      {
        type: "p",
        text: "The three providers share these mechanisms but apply them differently. The table keeps only the differences that change a decision; the per-provider detail, endpoints, coefficients and paid options, is in appendix A."
      },
      {
        type: "table",
        head: [
          "Criterion",
          "AWS Bedrock",
          "Microsoft Foundry",
          "Google Agent Platform"
        ],
        rows: [
          [
            "Quota scope",
            "Account, model, source region",
            "Subscription, model, deployment type",
            "Organisation, model"
          ],
          [
            "What you set",
            "Nothing per deployment: account quotas",
            "Capacity units per deployment",
            "Nothing in Standard: your tier depends on your spend"
          ],
          [
            "Main unit",
            "TPM input + output (runtime); input and output separate (mantle)",
            "TPM, derived RPM",
            "Priority threshold in TPM"
          ],
          [
            "Role of max_tokens",
            "Reserved at admission, refunded at the end of the request",
            "Contradictory documentation in Standard; counted then reconciled in PTU",
            "Not detailed in the docs"
          ],
          [
            "Counting trap",
            "Burndown of ×5 to ×15 on output, depending on the model",
            "RPM windows of 1 to 10 s",
            "Per-second peaks limited"
          ],
          [
            "Scaling up",
            "Increase request (prioritised if usage is real)",
            "Automatic quota tiers",
            "Usage tiers on 30 days of spend"
          ],
          [
            "Reserved capacity",
            "Reserved tier, Provisioned Throughput",
            "PTU",
            "Provisioned Throughput (GSU)"
          ],
          [
            "Paid priority",
            "Priority (+75%), depending on the model",
            "Priority processing",
            "Priority PayGo"
          ],
          [
            "Economy option",
            "Flex (-50%), Batch, depending on the model",
            "Flex processing, Batch",
            "Flex PayGo (~-50%), Batch"
          ],
          [
            "Multi-region routing",
            "Geographic and global profiles",
            "Global and Data Zone deployments",
            "Global endpoint"
          ]
        ]
      },
      {
        type: "h",
        id: "region",
        text: "The regional lever, and the price of residency"
      },
      {
        type: "p",
        text: "Geographic scope is the cheapest throughput lever: it adds no routing fees, and at AWS the global profile even costs about 10% less than geographic profiles. It is paid for in control over where your prompts are processed. All three providers offer the same ladder: a region, a zone (EU, US), the world. The higher you go, the more capacity you generally get, depending on the model and the offer; the lower you go, the simpler compliance becomes."
      },
      {
        type: "p",
        text: "Microsoft puts it bluntly: Global offers the highest default quotas and receives new models first; regional types come last, with no guaranteed date, and depend on capacity freed up by older models (Microsoft, deployment types). The reason is material: pooling several regions makes it possible to use free GPUs wherever they are."
      },
      {
        type: "table",
        head: [
          "Rung",
          "AWS Bedrock",
          "Microsoft Foundry",
          "Google Agent Platform"
        ],
        rows: [
          [
            "Region",
            "Single-region call",
            "Standard, Regional Provisioned",
            "Regional endpoint"
          ],
          [
            "EU zone",
            "eu. profile: European destinations, which depend on the source region",
            "Data Zone EU: processed within the EU Data Boundary",
            "EU multi-region endpoint"
          ],
          [
            "World",
            "global. profile: all commercial regions",
            "Global Standard, Global Provisioned",
            "Global endpoint"
          ],
          [
            "List of regions",
            "Frozen: any addition gives a new profile identifier",
            "Microsoft can add regions to a zone without notice",
            "Guarantees published model by model"
          ],
          [
            "Specific trap",
            "An SCP blocking one destination makes the request fail",
            "The EU Data Boundary may include Norway and Switzerland",
            "Outside the listed regions, no guarantee of processing location"
          ]
        ],
        caption: "Sources: AWS, geographic profiles; Microsoft, deployment types; Google, data residency."
      },
      {
        type: "p",
        text: "The EU zone is often a good compromise for a European company, depending on its residency obligations and model availability: more capacity without taking data out of the zone, provided you check what it covers: Norway and Switzerland in Microsoft’s EU Data Boundary, destinations that vary with the source region at AWS. At Microsoft, the quota is pooled for the whole zone; at AWS, the list of regions in an eu. profile never changes without a new identifier."
      },
      {
        type: "p",
        text: "The price of residency is paid mostly in services. Priority, Flex or Batch often disappear in the EU zone or in a region: anti-429 levers live mostly in global mode. The per-provider detail, and the cases of Sweden Central and of models without a European profile, are in appendix C."
      },
      {
        type: "p",
        text: "Two warnings. Multi-region routing increases throughput, not resilience: Microsoft states that an outage of the primary region affects all traffic routed there. And residency is not sovereignty: the AWS European Sovereign Cloud, opened in January 2026 with Bedrock, offers one more step, at the cost of an isolated capacity pool and a narrower catalogue (AWS, European Sovereign Cloud)."
      },
      {
        type: "h",
        id: "decideurs",
        text: "Who decides what"
      },
      {
        type: "p",
        text: "Without explicit governance, inference capacity has no owner. The platform team creates deployments, each project requests quota increases as it goes, finance discovers the bill afterwards, and nobody arbitrates when two uses want the same capacity at the same time. The first act of governance is to name who decides what."
      },
      {
        type: "table",
        head: [
          "Decision",
          "Who proposes",
          "Who decides",
          "On what basis"
        ],
        rows: [
          [
            "Classify a use: critical, standard or deferred",
            "The business owner of the use",
            "The AI platform lead, with the business",
            "The impact of an outage, the service objective"
          ],
          [
            "Set an application’s floor and ceiling",
            "The platform team",
            "The platform lead; management in case of conflict between business units",
            "Measured consumption, criticality"
          ],
          [
            "Request a quota increase, open a subscription or an account",
            "The platform team",
            "The platform lead, with finance informed",
            "The checks in appendix F, the cost of tracking one more envelope"
          ],
          [
            "Reserve capacity (PTU, Reserved tier, GSU)",
            "The platform team and FinOps",
            "Finance, on a business case",
            "Expected utilisation, commitment length, alternatives"
          ],
          [
            "Authorise a flow outside the EU zone",
            "The business",
            "Authorised management, after advice from the DPO and compliance",
            "The nature of the data, residency obligations"
          ],
          [
            "Add a provider or a model",
            "Architecture",
            "The AI committee, with procurement and risk",
            "Substitutability, concentration, exit cost"
          ],
          [
            "Set agent budgets",
            "The business and the platform team",
            "The platform lead",
            "Cost per run, criticality"
          ]
        ]
      },
      {
        type: "p",
        text: "Titles vary from one organisation to another; this table is the author’s proposal, not a standard. What matters is that each decision has a single decision-maker and a written rule, and that the platform can enforce it. A rule nobody wrote applies anyway: the noisiest application sets it, at the moment of saturation."
      },
      {
        type: "p",
        text: "The example of extra subscriptions. Opening one more subscription or account is often the fastest way to gain throughput, since each brings its own quota envelope (see “The means”). Decided by the platform, it is a lever. Left to each project, it multiplies the envelopes to track, the keys to protect and the bills to reconcile, without anyone knowing how much capacity the company actually holds."
      },
      {
        type: "h",
        id: "allocation",
        text: "Allocation rules: who goes first"
      },
      {
        type: "p",
        text: "Once the decision-makers are named, they need rules. The provider allocates scarce capacity by its own rules; the company must decide which uses go first. No organisation can let each application decide alone what it consumes."
      },
      {
        type: "p",
        text: "In the shared pool, Standard traffic comes after contractually reserved capacity and after priority traffic; beyond that, providers’ allocation rules are not public. What remains predictable is what you buy and what you allocate yourself. Governing, in practice, means setting four rules:"
      },
      {
        type: "defs",
        items: [
          {
            term: "Criticality classes,",
            text: "each tied to a provider service tier: critical (reserved capacity, Priority), standard (Standard), deferred (Flex, Batch)."
          },
          {
            term: "Floors and ceilings per application.",
            text: "A floor reserves part of the envelope for a critical application, within the capacity the provider actually delivers; a ceiling stops a secondary application from consuming everything."
          },
          {
            term: "Residency as an attribute of the flow, not of the whole platform.",
            text: "Only the flows that require it stay in the EU zone; the others can benefit from global mode and its levers."
          },
          {
            term: "Internal commitments.",
            text: "Each class has its availability and latency objective, and the platform measures whether it is met."
          }
        ]
      },
      {
        type: "p",
        text: "Palantir documents a similar model, with three levels: the overall envelope per model, limits per project and limits per user. Its example makes the floor concrete: on an envelope of one million TPM, a production application can reserve 250,000 TPM, which it consumes first, before drawing on the 750,000 shared; 20% of the envelope also stays reserved for interactive requests, batch jobs being unable to exceed 80% (Palantir, LLM capacity management)."
      },
      {
        type: "p",
        text: "The goal is not to push as many requests through as possible, but to protect critical uses within the capacity actually available, with service objectives and fallback mechanisms, even when everyone shares the same quota. This is a governed allocation of inference capacity, and it does not depend on any provider."
      },
      {
        type: "h",
        id: "argent",
        text: "Money: reserve or pay as you go"
      },
      {
        type: "p",
        text: "Inference capacity can be bought in three ways: per token, with variable spend and no guarantee; as reserved capacity, with fixed spend; with priority or discount options (Priority, Flex, Batch), which change the price of a token according to urgency. Choosing between them is not a technical setting: it is an investment decision."
      },
      {
        type: "p",
        text: "Reserving means committing. The FinOps Foundation speaks of “a strategic commitment rather than a simple discount mechanism”: reserved capacity is paid for continuously, whether it is used or not (FinOps Foundation, GenAI capacity options). In Microsoft’s worked example, with the price assumptions used, PTU and pay-per-token cost roughly the same at full utilisation, and PTU is more expensive per token below that (appendix B). The break-even point must be recalculated for the actual model, contract and load. The FinOps Foundation even cites a reserved offer whose price per token is 67% above standard at full utilisation: you take it for a latency or availability commitment, not to save money."
      },
      {
        type: "p",
        text: "Four questions before reserving:"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Is the traffic steady?",
            text: "A stable, high load makes a reservation pay off; bursts leave it unused most of the time."
          },
          {
            term: "2. Does the use require a service commitment?",
            text: "If a critical use can tolerate neither refusals nor variable latency, a reservation is justified even at a higher price."
          },
          {
            term: "3. How long will the model remain the right one?",
            text: "At AWS, a reservation is tied to a model; at Google, to a publisher, and it cannot be reduced; at Microsoft, PTUs can remain without a deployment if capacity is lacking for the new model (same source)."
          },
          {
            term: "4. Who carries unused capacity?",
            text: "The FinOps Foundation calls allocated but unused capacity “the most common form of waste”. Without an owner, it appears nowhere."
          }
        ]
      },
      {
        type: "p",
        text: "Make consumption visible, then charge it back. A shared quota is a common good: without visibility per business unit, everyone consumes at no apparent cost. The first step is to show each business unit what it consumes, in tokens, in euros and in reserved capacity held for it. Chargeback comes next, once the allocation rules are stable. It requires every call to carry the identity of its consumer, which only a gateway covering all routes can guarantee."
      },
      {
        type: "p",
        text: "A throughput cap is not a spending cap. In April, a developer reported on the Google forum a bill of €54,000 in 13 hours, caused by an unrestricted key used to call Gemini (Google AI forum). Some providers offer a monthly cap, like the Anthropic API used directly, which then returns a 429 with no retry delay (appendix F). Elsewhere, the company must set its own budgets and spending alerts, per business unit and per key."
      },
      {
        type: "h",
        id: "risque",
        text: "Risk: concentration, reversibility, residency"
      },
      {
        type: "p",
        text: "When an assistant or an agent becomes indispensable to a business unit, its dependence on a provider, a model and a region becomes an enterprise risk. The 429 is its most visible sign: it shows what happens when the only available capacity gives way."
      },
      {
        type: "table",
        head: [
          "Risk",
          "The signal",
          "The countermeasure"
        ],
        rows: [
          [
            "Concentration on a provider",
            "All critical uses at the same one",
            "A second provider tested for these uses, and a router able to switch to it"
          ],
          [
            "Concentration on a model",
            "No replacement model evaluated",
            "A fallback model validated per critical use, with its own quality tests"
          ],
          [
            "Concentration on a region",
            "All traffic in one region, sometimes the only one offering the model (appendix C)",
            "An EU zone or a second region, after checking the catalogue"
          ],
          [
            "Contractual lock-in",
            "A long reservation, tied to a model or a publisher",
            "Short commitments and partial coverage"
          ],
          [
            "Sprawl",
            "Subscriptions, accounts and keys opened project by project",
            "A central inventory; opening decided by the platform"
          ]
        ]
      },
      {
        type: "p",
        text: "Reversibility has a cost that must be paid before the incident. Changing model or provider does not happen in a day: prompts, evaluations, call formats and reservations are often specific to one model. A fallback that has never been tested is not one. Remember too that multi-region routing increases throughput, not resilience: an outage of the primary region hits all the traffic routed there."
      },
      {
        type: "p",
        text: "For finance, it is an obligation. The DORA regulation has applied to EU financial entities since 17 January 2025 (CSSF). It requires them to keep a register of all arrangements covering ICT services and, for services supporting critical or important functions, documented and tested exit strategies (DORA, article 28). Before contracting, they must also assess concentration risk, notably when services are not easily substitutable or when several such arrangements are made with the same provider (DORA, article 29). An assistant that supports a critical function and relies on a single model at a single provider falls within this framework; outside the financial sector, the same grid remains good discipline."
      },
      {
        type: "p",
        text: "Residency is a trade-off, not an absolute. Requiring EU processing for every flow loses anti-429 levers (Priority, Flex, sometimes entire models; appendix C). Requiring global mode for every flow can breach the obligations of some. The decision is taken flow by flow by the authorised manager, after advice from compliance and from the DPO where personal data is involved; the platform enforces it as a routing constraint."
      },
      {
        type: "h",
        id: "agents",
        text: "Agents: the run budget as an enterprise rule"
      },
      {
        type: "p",
        text: "With an agent, the unit that counts is no longer the request but the run. Take a request that triggers a main agent, which delegates to three specialised agents each making five calls to the model: that is 16 calls for a single request. If each refused call is retried twice, the worst case rises to 48. Ten simultaneous users are then enough to send several hundred calls in a burst on the same quota, while “user” traffic looks modest."
      },
      {
        type: "p",
        text: "This is not theoretical. HiveMind describes coding agents launched in parallel on the same API that fail even though capacity was sufficient sequentially (arXiv 2604.17111). Uncoordinated retries worsen the contention they try to get around."
      },
      {
        type: "p",
        text: "Control must therefore cover the whole run. The values below are orders of magnitude to adjust, not measured recommendations."
      },
      {
        type: "table",
        head: [
          "Control",
          "Example",
          "What it prevents"
        ],
        rows: [
          [
            "Token budget per run",
            "100,000 tokens per workflow",
            "A loop that exhausts everyone’s quota"
          ],
          [
            "Delegation depth",
            "5 levels at most",
            "Agents delegating to each other endlessly"
          ],
          [
            "Parallelism",
            "4 simultaneous sub-agents",
            "A burst that saturates the pool"
          ],
          [
            "Retry budget",
            "3 cumulative retries per run",
            "Retries multiplying at each level"
          ],
          [
            "Business priority",
            "A customer-service agent goes before a document job",
            "A background job blocking a critical use"
          ],
          [
            "Monetary budget",
            "€2 per run",
            "A cost drift invisible in the quotas"
          ],
          [
            "Timeout",
            "Stop after 60 seconds",
            "A run that monopolises capacity"
          ]
        ]
      },
      {
        type: "p",
        text: "Where to enforce these bounds. The gateway sees each call, but not the execution tree that connects them. Per-run bounds therefore live in the agent runtime. For the gateway to check or complement them, each call must carry a run identifier propagated end to end: it is what makes it possible to add up the tokens of one request, cut a run that exceeds its budget, and link a 429 to the agent that caused it."
      },
      {
        type: "p",
        text: "Degrade rather than fail. When the budget is reached or the provider refuses, an agent can switch to a lighter model, reduce its depth, put a sub-task in a deferred queue or return a partial answer flagged as such. These choices are decided in advance, by criticality class, not at the moment of the incident. And monitoring must follow the business run, not only the transport (appendix E, error no. 12)."
      },
      {
        type: "h",
        id: "piloter",
        text: "Steering: what management needs to see"
      },
      {
        type: "p",
        text: "An allocation policy that is not measured exists only on paper. Six indicators are enough for a committee to know whether it holds."
      },
      {
        type: "table",
        head: [
          "Indicator",
          "What it tells you",
          "What it does not tell you"
        ],
        rows: [
          [
            "Refusal rate per criticality class, and by origin (application, gateway, provider)",
            "Whether critical uses are protected",
            "The cause of a refusal: that is the job of the diagnosis (appendix F)"
          ],
          [
            "Service objectives met per class: availability, latency",
            "Whether internal commitments are kept",
            "Whether the objective was the right one"
          ],
          [
            "Capacity held versus capacity consumed: allocated, reserved, consumed",
            "Waste and headroom",
            "Saturation: a quota allocated at 100% can be lightly used"
          ],
          [
            "Spend per business unit and per use, cost per agent run",
            "Who consumes what, and at what price",
            "The value created by that spend"
          ],
          [
            "Traffic split by provider, model and region",
            "The level of concentration",
            "The real ability to switch: only a test proves it"
          ],
          [
            "Share of traffic bypassing the gateway",
            "The real coverage of the policy",
            "What that traffic does"
          ]
        ]
      },
      {
        type: "p",
        text: "A maturity grid. It helps place an organisation and choose the next step; it is the author’s proposal, with no survey measuring it."
      },
      {
        type: "table",
        head: [
          "Level",
          "What you observe"
        ],
        rows: [
          [
            "1. Endured",
            "Each project creates its own deployments; 429s are discovered in production, the bill afterwards"
          ],
          [
            "2. Visible",
            "Consumption and refusals measured per application and by origin; inventory of subscriptions, accounts and keys"
          ],
          [
            "3. Allocated",
            "Criticality classes, floors and ceilings, budgets per application and per agent, enforced by the gateway"
          ],
          [
            "4. Arbitrated",
            "Named decision-makers, reservations decided on a business case, residency chosen flow by flow, regular review"
          ],
          [
            "5. Resilient",
            "A tested fallback per critical use, an exit strategy, service objectives followed by management"
          ]
        ]
      },
      {
        type: "p",
        text: "The opening incident illustrates the improvements an organisation can make internally, without asking its provider for anything: making consumption visible, setting priorities and enforcing budgets, in other words moving from level 1 to level 3."
      },
      {
        type: "h",
        id: "plateforme",
        text: "The means: a platform that enforces the policy"
      },
      {
        type: "p",
        text: "The rules above are only worth something if the platform can enforce them, and a counter in front of an endpoint is not enough. A platform that withstands 429s chains five functions: identify and budget at the gateway, admit according to an estimate faithful to the provider’s, order flows by criticality, route to the right model, region or provider, and observe each refusal at its origin. For agents, a sixth function lives in the runtime: bounding the whole run."
      },
      {
        type: "diagram",
        variant: "admission-chain"
      },
      {
        type: "p",
        text: "Who controls what."
      },
      {
        type: "table",
        head: [
          "Component",
          "What it controls",
          "What it does not see"
        ],
        rows: [
          [
            "AI gateway",
            "Identity, budget per consumer, all routes, refusal log",
            "An agent’s complete run; the state of the provider’s pool"
          ],
          [
            "Admission control",
            "Tokens weighted as the provider weights them (burndown, max_tokens), concurrency, monetary budget",
            "Business criticality, if nobody declares it"
          ],
          [
            "Scheduler",
            "The order between critical, standard and deferred flows",
            "What happens once the request is sent"
          ],
          [
            "Router",
            "Model, region, provider, overflow, degradation",
            "Residency rules, unless they are coded as a constraint"
          ],
          [
            "Agent runtime",
            "Budget per run, depth, parallelism, retries, timeout",
            "Other applications’ traffic"
          ],
          [
            "Observability",
            "429s by origin, estimated versus billed, retries, queue",
            "Nothing usable without a propagated request and run identifier"
          ]
        ]
      },
      {
        type: "p",
        text: "The provider quota sets a usage envelope and admission rules; it says nothing about the allocation between your applications. That is yours to build. A complete policy, per consumer and per model, answers ten questions:"
      },
      {
        type: "table",
        head: [
          "Element",
          "Question"
        ],
        rows: [
          [
            "Identity",
            "Which authenticated identity carries the quota?"
          ],
          [
            "Environment",
            "Do dev, staging and production share the same provider quota?"
          ],
          [
            "Target",
            "Which deployment or profile, in which region?"
          ],
          [
            "Requests",
            "How many calls per window?"
          ],
          [
            "Tokens",
            "Which budget, weighted as the provider weights it?"
          ],
          [
            "Concurrency",
            "How many simultaneous calls at most?"
          ],
          [
            "Queue",
            "How many calls waiting, and for how long at most?"
          ],
          [
            "Retries",
            "How many attempts, over what total duration, for which errors?"
          ],
          [
            "Degradation",
            "What happens if the counting service goes down: fail open or fail closed?"
          ],
          [
            "Consistency",
            "Does the sum of budgets stay under the provider ceiling, with a margin?"
          ]
        ]
      },
      {
        type: "p",
        text: "Implementation principles."
      },
      {
        type: "defs",
        items: [
          {
            term: "1. A counter shared across replicas and gateways.",
            text: "A local counter multiplies the budget by the number of replicas (appendix E, error no. 4); you need an external counting service, often backed by Redis."
          },
          {
            term: "2. Cover every path.",
            text: "Either everything goes through the gateway, or the counting service is also consulted by direct calls. The allocation key must include the account, the source region, the model and the inference mode."
          },
          {
            term: "3. Bound concurrency, not just throughput.",
            text: "In streaming, tokens are only known at the end: a budget counted afterwards does not guarantee it will not be exceeded. Bounded concurrency and, if needed, prior reservation with reconciliation complete the setup."
          },
          {
            term: "4. Retry properly.",
            text: "Respect Retry-After and retry-after-ms with the right unit; otherwise exponential backoff with jitter. Bound the number and total duration of attempts, taking the SDK’s retries into account. Never replay a deterministic error."
          },
          {
            term: "5. Use the prompt cache.",
            text: "At AWS, cache reads do not count in the bedrock-runtime quota; at Microsoft, they reduce PTU sizing. Elsewhere, the documentation talks mostly about billing: check per provider, model and deployment mode."
          },
          {
            term: "6. Separate environments, and subscriptions if needed.",
            text: "Separate deployments already separate counters: at Microsoft, a quota of 240,000 TPM split into two deployments of 120,000 TPM gives two independent limits (Microsoft Learn, managing quota in Foundry). Separate subscriptions or accounts also separate quota envelopes and governance, and each brings its own: a possible lever for gaining throughput, at Microsoft as at AWS, provided increases obtained in staging are carried over to production (AWS Builder Center, managing Bedrock quotas at scale). At Google, multiplying projects within one organisation does not multiply its Standard PayGo threshold. None of these partitions isolates the provider’s physical capacity, and each extra subscription is one more quota to track, which the gateway must be able to locate."
          }
        ]
      },
      {
        type: "h",
        id: "limites",
        text: "Limits of this analysis"
      },
      {
        type: "list",
        items: [
          "Capacity and burndown figures change with every model, as does the availability of Priority and Flex at AWS. Those cited here hold at the date given at the top: reread each model card before building a strategy on them.",
          "429 rates. Forum figures are testimonies; the only public measurement found comes from a gateway (Requesty), on its own traffic. No provider publishes its refusal rate.",
          "The twelve field errors describe recurring patterns. We found no survey measuring their frequency; the only related figure comes from HiveMind: on a test bench and under heavy contention, uncoordinated agents fail in 72 to 100% of cases, far more than in the real case that opens the study (3 agents out of 11).",
          "The three research papers cited are arXiv preprints; their records do not mention acceptance by a conference or a journal.",
          "Hyperscalers’ real AI capacity in Europe. None of the three publishes the chips installed per region; the 5% share cited above is a floor, not an exact figure, and does not measure the capacity accessible through an API. The companion article details what is known about the European fleet.",
          "Providers’ allocation rules. How a provider arbitrates between reserved capacity, priority traffic and Standard is not public, nor is the share of compute rented or owned by each lab.",
          "The bounds proposed for agents are illustrative orders of magnitude, not measured values.",
          "The proposed governance framework (decision rights, rules, indicators, maturity grid) is the author’s. It draws on practices documented by Palantir and the FinOps Foundation and on the text of DORA, but no survey measures its effect. It is not legal advice on how DORA applies to a given organisation."
        ]
      },
      {
        type: "p",
        text: "And this reading can be proven wrong. If providers return to fixed, guaranteed quotas, if capacity 429s become rare without reserved capacity, or if the gap between Global and the EU zone disappears, then the rationing was cyclical, and part of this article with it."
      },
      {
        type: "h",
        id: "conclusion",
        text: "Conclusion: you do not manage a quota, you manage an allocation"
      },
      {
        type: "p",
        text: "In one year, AWS, Microsoft and Google have turned rate limiting into a market for GPU capacity. The scarcity is physical, its allocation is commercial: guaranteed throughput is bought, priority is paid for, patience is rewarded, spending history influences the priority threshold and geography the ceiling."
      },
      {
        type: "p",
        text: "But the market is only half the problem. The other half is at home: capacity nobody owns, subscriptions opened as things go, reservations nobody tracks, agents that turn one request into dozens of calls. The question is no longer “how many TPM?” but “who decides the allocation, by which rules, at what price, with which risks, and how do we know?”."
      },
      {
        type: "callout",
        text: "Answering it takes named decision-makers, a written allocation policy, a tracked budget, assessed risks, and a platform that admits, orders, routes and observes to enforce all of it. As long as capacity remains scarce, the 429 will be a design and governance element, not an anomaly. The organisations that understand this will have more reliable applications, more predictable spend and choices that are easier to defend before a finance department, a DPO or a regulator."
      },
      {
        type: "h",
        id: "annexe-a",
        text: "Appendix A: per-provider detail"
      },
      {
        type: "h3",
        text: "AWS Bedrock: two endpoints, two ledgers"
      },
      {
        type: "p",
        text: "bedrock-runtime (InvokeModel, Converse) applies quotas per model and per region: a single-region TPM, a cross-region TPM and a daily cap. The TPM adds input and output in a single counter, shared by all the APIs calling the same model. Two routes, two applications or two IAM identities in the same account therefore consume the same quota. RPM now exists only for some models (AWS, bedrock-runtime quotas)."
      },
      {
        type: "p",
        text: "bedrock-mantle, which serves the OpenAI-compatible and Anthropic Messages APIs, separates an input quota and an output quota, with no RPM. On arrival, Bedrock adds the input tokens and the requested max_tokens; if that exceeds the input quota, the refusal is immediate. If the output quota runs out during generation, the response is cut off (AWS, bedrock-mantle quotas)."
      },
      {
        type: "p",
        text: "Burndown is the main trap. On bedrock-runtime, one output token consumes several quota tokens depending on the model: 5 for Claude 4.7 and earlier, 10 for Claude Opus 5.5, Sonnet 5, Opus 5 and Fable 5.1, 15 for Claude 4.8, while the bill counts 1 for 1. Official formula: input + cache writes + (output × burndown rate) (AWS, token counting). A raw input + output sum therefore does not reproduce quota consumption."
      },
      {
        type: "p",
        text: "The rate varies from one model to another: on bedrock-runtime, the GPT-5.6 Sol model card gives a burndown of 10, one output token consuming 10 quota tokens (GPT-5.6 Sol model card)."
      },
      {
        type: "p",
        text: "Cross-region is the native throughput lever: a geographic (eu.) or global (global.) profile routes the request to an available destination region, with a separate quota. Beware: the entry endpoint says nothing about where processing happens. A request entering through a European region with a global. profile can be processed outside Europe. And a single destination region blocked by an SCP makes the request fail (AWS, cross-region inference)."
      },
      {
        type: "p",
        text: "Service tiers are chosen per request via service_tier (AWS, service tiers):"
      },
      {
        type: "defs",
        items: [
          {
            term: "Reserved:",
            text: "input and output TPM guaranteed over 1 or 3 months, automatic overflow to Standard, 99.5% availability target."
          },
          {
            term: "Priority:",
            text: "priority processing, billed 75% more than Standard."
          },
          {
            term: "Standard:",
            text: "the default behaviour."
          },
          {
            term: "Flex:",
            text: "50% cheaper, deprioritised during periods of heavy demand."
          }
        ]
      },
      {
        type: "p",
        text: "Priority, Standard and Flex share the same on-demand quota. Quota increases go first to customers who already consume their allocation, and none is granted on an end-of-life model."
      },
      {
        type: "p",
        text: "Beware: these tiers do not exist for every model. Support depends on the model, not the region, and is read card by card. As of 23 October 2026, Claude Sonnet 5.5 offers only the Standard tier (Claude Sonnet 5.5 model card) and GPT-5.6 Sol excludes Priority and Flex (GPT-5.6 Sol model card), while Nova Pro and Grok 4.6 offer both (Nova Pro, Grok 4.6). On these four cards, Bedrock’s priority levers concern secondary models rather than flagship models."
      },
      {
        type: "h3",
        text: "Microsoft Foundry: quota as a budget to allocate"
      },
      {
        type: "p",
        text: "At Microsoft, the quota is a stock of capacity units that you distribute yourself between your deployments. Each unit gives a number of TPM and RPM that depends on the model; RPM cannot be set independently (Microsoft, quota management). Two practical consequences:"
      },
      {
        type: "defs",
        items: [
          {
            term: "Allocated is not consumed.",
            text: "A quota allocated at 100% blocks the creation of capacity, not traffic (see error no. 1 in appendix E)."
          },
          {
            term: "Pools are not interchangeable.",
            text: "The quota for a model in Global Standard does not add to that of the same model in Data Zone. Headroom in one deployment type is not a reserve for the other."
          }
        ]
      },
      {
        type: "p",
        text: "An Azure specificity: refusals count too. Rejected requests are added to the minute’s counter, which makes retries without delay dangerous."
      },
      {
        type: "p",
        text: "The “invisible” 429 is documented. Standard deployments share a common pool; when demand approaches capacity, the service can temporarily lower a deployment’s effective limit. The signal is the x-ratelimit-limit-tokens header: if it is lower than the configured TPM, an adjustment is under way, which usually clears within a few hours."
      },
      {
        type: "p",
        text: "Quota tiers automate scaling up. Seven tiers exist, from Free Tier to Tier 6. Moving up a tier is automatic when usage hits the limit, taking into account the commercial relationship and payment history. In practice, some companies do not wait for the next tier: they open extra subscriptions, each with its own quota (see “Who decides what” and “The means”). Since 7 May 2026, for the models concerned, the quota has moved to the subscription level: a single pool for all regions in Global Standard, one pool per zone in Data Zone (Microsoft, quotas and limits)."
      },
      {
        type: "p",
        text: "The paid options:"
      },
      {
        type: "defs",
        items: [
          {
            term: "PTU:",
            text: "dedicated capacity billed by the hour. Immediate 429 at 100% utilisation, with retry-after-ms; Microsoft presents it as a throttling signal, not an outage (Microsoft, getting started with PTUs)."
          },
          {
            term: "Spillover:",
            text: "the overflow of a saturated PTU deployment goes to a Standard deployment of the same resource."
          },
          {
            term: "Priority processing:",
            text: "per deployment or per request, in Global Standard and Data Zone US only (Microsoft, Priority processing)."
          },
          {
            term: "Flex processing:",
            text: "50% cheaper, in Global Standard only, with no automatic fallback to Standard (Microsoft, Flex processing)."
          }
        ]
      },
      {
        type: "h3",
        text: "Google Agent Platform (formerly Vertex AI): a priority threshold, a variable capacity"
      },
      {
        type: "p",
        text: "Since Google Cloud Next on 22 April 2026, Vertex AI has been called Gemini Enterprise Agent Platform (Google, Agent Platform release notes). The API remains aiplatform.googleapis.com. Google is the provider that has most clearly abandoned the fixed per-project quota."
      },
      {
        type: "p",
        text: "Dynamic Shared Quota and usage tiers. In Standard PayGo, a model’s capacity is pooled between all customers. Each organisation receives a priority throughput threshold set by its tier, itself calculated on its spend over the last 30 days. This threshold is not reserved capacity: under heavy contention, 429s remain possible below it. Above it, traffic can overflow on a best-effort basis. Example from the docs: an organisation in Tier 3 gets a threshold of 10 million TPM on Gemini 2.5 Flash (Google, Dynamic Shared Quota)."
      },
      {
        type: "p",
        text: "Consequence: in Standard PayGo, a 429 most often signals temporary contention rather than a quota reached; other models and Provisioned Throughput have their own limits. In an older Google forum thread, paying customers reported 10 to 15% of 429s over 24 hours, up to 45% at peak, on Gemini 2.0 Flash, a model now superseded (Google Cloud forum)."
      },
      {
        type: "p",
        text: "The consumption options form a clear ladder (Google, consumption options):"
      },
      {
        type: "defs",
        items: [
          {
            term: "Provisioned Throughput:",
            text: "capacity reserved in GSUs, the only option isolated from the shared pool."
          },
          {
            term: "Priority PayGo:",
            text: "a header is enough, billed at the premium rate. Baseline at organisation level: 10M TPM per Pro model, 50M TPM per Flash model (Google, Priority PayGo)."
          },
          {
            term: "Standard PayGo:",
            text: "DSQ and usage tiers."
          },
          {
            term: "Flex PayGo:",
            text: "about 50% cheaper, for jobs that tolerate latency and refusals."
          },
          {
            term: "Batch:",
            text: "asynchronous, with a delay on the order of 24 hours."
          }
        ]
      },
      {
        type: "p",
        text: "Google recommends a hybrid approach: reserved capacity for critical real time, Priority for fluctuating traffic, Standard for the rest, Flex and Batch for offline work. Its first anti-429 lever is the global endpoint, which spreads requests over several regions (Google Cloud, reducing 429 errors)."
      },
      {
        type: "h",
        id: "annexe-b",
        text: "Appendix B: guaranteed throughput, what the provider must absorb and how to audit it"
      },
      {
        type: "p",
        text: "With reserved capacity, the provider commits to absorbing a throughput. But each measures it in its own unit and converts your tokens according to its own scale. Auditing means recalculating your consumption with that scale and comparing it with the provider’s metrics."
      },
      {
        type: "table",
        head: [
          "Criterion",
          "AWS Bedrock (Reserved tier)",
          "Microsoft Foundry (PTU)",
          "Google Agent Platform (GSU)"
        ],
        rows: [
          [
            "Unit purchased",
            "Input TPM and output TPM, reserved separately",
            "PTU, usable on any supported model",
            "GSU, a throughput in tokens per second specific to each model"
          ],
          [
            "Minimum",
            "100,000 input TPM and 10,000 output TPM",
            "15 PTU (Global, Data Zone), 25 to 50 (Regional)",
            "Depending on the model"
          ],
          [
            "Output weighting",
            "Output reserved separately",
            "1 output token = 8 input (gpt-5, gpt-5.2), 6 (gpt-5.5), 4 (gpt-4.1)",
            "Burndown by modality: 1 text output token = 4 on gemini-2.0-flash"
          ],
          [
            "Prompt cache",
            "Cache writes count in the reserved TPM",
            "Cache reads deducted (weighted for GPT-6)",
            "Cache reads reduced"
          ],
          [
            "Enforcement window",
            "Per minute",
            "Leaky bucket, 429 at 100% utilisation",
            "120 s for 1 GSU, 30 s for 25 GSU, 5 s for 250 GSU (gemini-2.5-flash)"
          ],
          [
            "Commitment",
            "1 or 3 months, fixed price per 1,000 TPM",
            "Hourly, or a 1-month or 1-year reservation",
            "Firm order"
          ],
          [
            "Service promise",
            "99.5% availability target",
            "Latency: 99% of requests above 50 tokens/s (gpt-5), 80 (gpt-5-mini); a published target, which Microsoft calculates as a p50 over 5 minutes",
            "Isolation from the shared pool"
          ],
          [
            "Beyond the reserved amount",
            "Overflow to Standard",
            "Spillover to Standard (optional)",
            "Overflow to Standard or Priority"
          ]
        ],
        caption: "Sources: AWS, service tiers; Microsoft, PTU sizing; Google, PT calculation; Google, PT usage."
      },
      {
        type: "p",
        text: "Two examples from the docs. At Microsoft, 1,000 requests per minute of 200 input tokens and 20 output tokens on gpt-5.2 give 360,000 normalised TPM (200,000 + 8 × 20,000), or 110 PTU; with 50% caching, 80 are enough. At Google, 10 requests per second on gemini-2.0-flash represent 57,000 adjusted tokens per second, or 17 GSU."
      },
      {
        type: "p",
        text: "The contract’s traps."
      },
      {
        type: "defs",
        items: [
          {
            term: "A reservation is not capacity.",
            text: "At Microsoft, a reservation is a discount on the meter, not a GPU guarantee: you create the deployment first, then buy the reservation (Microsoft, provisioned throughput)."
          },
          {
            term: "Unconsumed capacity is lost.",
            text: "In Microsoft’s worked example, which relies on an illustrative price, PTU and pay-per-token cost roughly the same at full utilisation; below that, PTU is more expensive per token. Microsoft states that this calculation does not guarantee the real cost: the break-even point must be recalculated for the model, the contract and the load."
          },
          {
            term: "The latency promise is a median.",
            text: "Microsoft’s target is calculated as a p50 per 5-minute window. It covers neither the tail of the distribution nor the time to first token."
          }
        ]
      },
      {
        type: "p",
        text: "An audit grid in five checks."
      },
      {
        type: "defs",
        items: [
          {
            term: "1.",
            text: "Recalculate normalised consumption from your logs and the published scale, then compare with the provider’s counter: Provisioned-managed Utilization V2 (Azure), EstimatedTPMQuotaUsage (AWS), consumed_token_throughput against dedicated_gsu_limit (Google)."
          },
          {
            term: "2.",
            text: "Check where the traffic was actually served: trafficType at Google, service_tier in the response at Azure, the ResolvedServiceTier dimension at AWS."
          },
          {
            term: "3.",
            text: "Measure the promised latency: the Tokens per Second metric at Azure, TimeToFirstToken at AWS (AWS, March 2026)."
          },
          {
            term: "4.",
            text: "Track the paid utilisation rate, hour by hour, and reduce the reservation below the break-even point."
          },
          {
            term: "5.",
            text: "Distinguish availability and performance in the contract. An availability SLA does not cover degraded throughput."
          }
        ]
      },
      {
        type: "p",
        text: "A point of attention: EstimatedTPMQuotaUsage includes burndown and cache writes, but not the initial reservation linked to max_tokens (AWS, TTFT and quota metrics). A refusal can therefore occur while the metric stays under the quota."
      },
      {
        type: "h",
        id: "annexe-c",
        text: "Appendix C: residency, the levers lost provider by provider"
      },
      {
        type: "p",
        text: "The real price of residency: fewer services, not just fewer models. Anti-429 levers live mostly in Global mode."
      },
      {
        type: "table",
        head: [
          "Lever",
          "Microsoft Foundry",
          "Google Agent Platform",
          "AWS Bedrock"
        ],
        rows: [
          [
            "Priority",
            "Global Standard or Data Zone US only; neither Data Zone EU nor regional",
            "Global, us and eu endpoints in general; some models in global only",
            "Depends on the model, not the region: absent on Claude Sonnet 5.5 and GPT-5.6 Sol, present on Nova Pro and Grok 4.6"
          ],
          [
            "Flex",
            "Global Standard only",
            "Preview models: global endpoint only",
            "Same rule: absent on Claude Sonnet 5.5 and GPT-5.6 Sol"
          ],
          [
            "Batch",
            "Global Batch (world) or Data Zone Batch (EU)",
            "Unavailable through the global endpoint",
            "Batch inference, with its own quotas"
          ],
          [
            "Reserved capacity",
            "Global, Data Zone or Regional PTU",
            "For Claude: regional endpoints only",
            "Reserved tier or Provisioned Throughput"
          ],
          [
            "Cost of residency",
            "No stated premium, but fewer options",
            "Claude on a regional endpoint: +10%",
            "Global profile about 10% cheaper than geographic profiles"
          ]
        ],
        caption: "Sources: Microsoft, Priority; Microsoft, Flex; Google, Flex PayGo; Anthropic, Claude on Vertex."
      },
      {
        type: "p",
        text: "The Sweden Central case. Azure has about ten European regions, but Sweden Central concentrates the catalogue and is sometimes the only option, notably for fine-tuned models (Microsoft, models sold by Azure). Microsoft does not explain why; it only highlights Sweden’s abundant, low-carbon electricity. Concentrating everything on this region also creates a single point of failure."
      },
      {
        type: "p",
        text: "The opposite trap exists at AWS. Claude Sonnet 5.5 has an eu. geographic profile on Bedrock; GPT-5.6 Sol does not: its card offers only a us. profile and a global. profile. To call it from Frankfurt or Paris on bedrock-runtime, you have to go through the global profile, with no guarantee of processing in Europe (GPT-5.6 Sol model card). Before choosing a model, you therefore need to check not only where it is available, but through which type of profile."
      },
      {
        type: "h",
        id: "annexe-d",
        text: "Appendix D: what the research says"
      },
      {
        type: "p",
        text: "Three recent papers shed direct light on the proposed architecture. They are arXiv preprints; their records do not yet mention acceptance by a conference or a journal."
      },
      {
        type: "defs",
        items: [
          {
            term: "Agents, on the client side.",
            text: "HiveMind starts from a concrete case: 3 coding agents out of 11, launched in parallel on the same API, failed even though capacity was sufficient sequentially. The proposed proxy applies admission, backpressure, a circuit breaker, a token budget and priority queues, which is the core of the architecture described above (arXiv 2604.17111)."
          },
          {
            term: "Fairness in latency, not just throughput.",
            text: "A team including Matei Zaharia and Scott Shenker shows that current policies equalise customers’ throughput without guaranteeing per-token latency; their FairInference system bounds that gap (arXiv 2609.18112). It is an argument for criticality classes rather than a simple throughput split."
          },
          {
            term: "Isolation in gateways.",
            text: "KeyPooling shows that gateways pooling provider keys can make customers share the prompt cache (arXiv 2608.17485): a gateway must allocate capacity without breaking isolation."
          }
        ]
      },
      {
        type: "h",
        id: "annexe-e",
        text: "Appendix E: twelve errors to look for before asking for more quota"
      },
      {
        type: "p",
        text: "Provider docs describe levels 4 to 7. But when you open the hood of an enterprise AI platform, several weaknesses sit at levels 1 to 3, at home. Here are twelve, grouped by family."
      },
      {
        type: "h3",
        text: "Misreading the numbers"
      },
      {
        type: "defs",
        items: [
          {
            term: "1. Confusing allocation and consumption.",
            text: "A quota allocated at 100% says you can no longer create capacity, not that traffic is saturated. A platform can have several models almost fully allocated while showing a near-zero refusal rate. Conversely, a backup resource can show no visible traffic for days: that is neither proof that it is useless nor a green light to delete it."
          },
          {
            term: "2. Looking for the bottleneck in the wrong place.",
            text: "You watch the large text model, and the refusals come from elsewhere: an OCR, image or embeddings model capped at a few dozen requests per minute. A batch of documents sent all at once is enough to saturate it. The right reflex is a queue and bounded concurrency for these ancillary models, not a general quota increase."
          },
          {
            term: "3. Classifying every error as rate limiting.",
            text: "400, 408, 499, 500 and 503 are not 429s. A parameter or format-translation error is deterministic: replaying it only adds traffic."
          }
        ]
      },
      {
        type: "h3",
        text: "Counters that do not count what you think"
      },
      {
        type: "defs",
        items: [
          {
            term: "4. Per-process counters.",
            text: "A middleware that stores its counters in memory gives each pod its own budget. Two replicas set to N requests per minute accept 2N; a restart resets everything to zero."
          },
          {
            term: "5. Fixed windows that double bursts.",
            text: "A counter reset every minute lets a full quota through just before the boundary, then another just after. You can thus accept nearly double the limit within a few milliseconds. Sliding-window or token-bucket algorithms avoid this effect."
          },
          {
            term: "6. A badly chosen identity.",
            text: "A limit keyed on the IP address often sees the proxy’s: all users then share the same counter. A limit keyed on a client-supplied header is bypassed by changing the header. A quota’s key must be an authenticated identity."
          },
          {
            term: "7. A quota checked after the fact.",
            text: "Many per-user quotas read past consumption before authorising a call, without reserving the tokens of the call in progress. Ten simultaneous calls all pass under the threshold before the first is counted. And if writing the consumption log fails silently, consumption is underestimated afterwards."
          }
        ]
      },
      {
        type: "h3",
        text: "Protections that turn against you"
      },
      {
        type: "defs",
        items: [
          {
            term: "8. Health probes inside the quota.",
            text: "If the limiter applies to every path, the health route can receive a 429 when the counter is saturated. Depending on the configuration, the orchestrator may then consider the service unhealthy. Technical probes must be taken out of the business quota."
          },
          {
            term: "9. A silent local 429.",
            text: "A refusal with no Retry-After and no distinct error code says neither when to retry nor whether the refusal comes from the application, the gateway or the provider."
          },
          {
            term: "10. Implicit retries.",
            text: "When the code sets neither a number of attempts, nor a total duration, nor an output cap, the SDK’s defaults decide, and they change between versions. A retry on a stream already partly sent, or on an operation with side effects, can duplicate work."
          }
        ]
      },
      {
        type: "h3",
        text: "Paths nobody sees"
      },
      {
        type: "defs",
        items: [
          {
            term: "11. Calls that bypass the gateway.",
            text: "All it takes is a client configured to call the provider’s private endpoint directly, or a “native” route that passes the body through without decoding it, for a policy set only on the gateway to miss part of the traffic. Yet all these paths consume the same provider quota."
          },
          {
            term: "12. Monitoring that mixes everything.",
            text: "An alert on “more than N 4xx errors in five minutes” at cluster level says neither which model, nor which cause, nor which level refused. Worse, an application that cleanly turns a 429 into an unavailability message inside a stream makes the incident disappear from HTTP monitoring: the initial status remains 200."
          }
        ]
      },
      {
        type: "h",
        id: "annexe-f",
        text: "Appendix F: diagnosing a 429, identify the level before acting"
      },
      {
        type: "p",
        text: "A 429 is not a cause, it is a symptom. Before any remedy, you need to know which level issued it."
      },
      {
        type: "table",
        head: [
          "What you observe",
          "Probable level",
          "What to look at",
          "Remedy"
        ],
        rows: [
          [
            "429 with no provider header, a message from your application",
            "1 or 2",
            "Application logs, the counter’s key",
            "Fix the key, share the counter"
          ],
          [
            "429 with a gateway header or message",
            "3",
            "Gateway policy, the consumer’s budget",
            "Review the budget, check counter sharing"
          ],
          [
            "429 with x-ratelimit-remaining-tokens at zero",
            "4",
            "Admission estimate, max_tokens, bursts",
            "Lower max_tokens where it counts, smooth traffic, and only then request an increase"
          ],
          [
            "429 while token metrics are low",
            "4",
            "Prompt size, max_tokens, short windows",
            "Measure the estimate, not the billed amount"
          ],
          [
            "x-ratelimit-limit-tokens lower than the configured quota",
            "7",
            "Temporary adjustment by the provider",
            "Retry with delay, overflow, reserved capacity"
          ],
          [
            "429 in bursts at a fixed time, across all customers",
            "7",
            "Contention in the shared pool",
            "First rule out scheduled jobs and internal bursts; then global endpoint or zone, Priority, multi-provider"
          ],
          [
            "429 on a reserved deployment",
            "5",
            "Utilisation at 100%",
            "Spillover, resizing"
          ],
          [
            "429 on a single ancillary model",
            "4",
            "That model’s request cap",
            "Queue and bounded concurrency"
          ],
          [
            "429 with no retry-after, code enforced_spend_limit_reached (Anthropic API used directly)",
            "4",
            "The tier’s monthly spending cap",
            "Do not retry: move to the next tier, or wait until the 1st of the following month"
          ]
        ]
      },
      {
        type: "p",
        text: "What to always collect: the exact error message, the headers (Retry-After, retry-after-ms, x-ratelimit-*), the provider’s request identifier, the service tier actually applied and the number of attempts already made. Metrics aggregated per minute tell you when; only these elements tell you why."
      },
      {
        type: "p",
        text: "Three measurement traps. Do not add a global series to its per-model sub-series. Do not read the absence of a series as the absence of traffic. And remember that retries inflate the number of refusals: at AWS, the Invocations metric excludes refused requests, which are counted separately."
      },
      {
        type: "box",
        title: "Before asking for more quota or opening one more subscription",
        text: "Check that the refusals really come from level 4; that max_tokens is sized on real responses; that traffic is smoothed and concurrency bounded; that no application consumes the others’ budget; and that the model is not end-of-life, otherwise the increase will be refused."
      }
    ],
    sourcesLabel: "Sources",
    sources: [
      {
        label: "AWS: bedrock-runtime quotas"
      },
      {
        label: "AWS: bedrock-mantle quotas"
      },
      {
        label: "AWS: token counting and burndown"
      },
      {
        label: "AWS: service tiers"
      },
      {
        label: "AWS: cross-region inference"
      },
      {
        label: "AWS: geographic profiles"
      },
      {
        label: "AWS: TTFT and quota metrics"
      },
      {
        label: "AWS Builder Center: managing Bedrock quotas at scale"
      },
      {
        label: "AWS: European Sovereign Cloud"
      },
      {
        label: "Microsoft: quotas and limits"
      },
      {
        label: "Microsoft: quota management"
      },
      {
        label: "Microsoft: LLM rate limits in Dev Proxy"
      },
      {
        label: "Microsoft: deployment types"
      },
      {
        label: "Microsoft: provisioned throughput"
      },
      {
        label: "Microsoft: PTU sizing"
      },
      {
        label: "Microsoft: Priority processing"
      },
      {
        label: "Microsoft: Flex processing"
      },
      {
        label: "Microsoft: APIM llm-token-limit policy"
      },
      {
        label: "Google: Dynamic Shared Quota"
      },
      {
        label: "Google: consumption options"
      },
      {
        label: "Google: Priority PayGo"
      },
      {
        label: "Google: Flex PayGo"
      },
      {
        label: "Google: Provisioned Throughput calculation"
      },
      {
        label: "Google: data residency"
      },
      {
        label: "Google Cloud: reducing 429 errors"
      },
      {
        label: "Google: Agent Platform release notes"
      },
      {
        label: "LangChain: rate limiters"
      },
      {
        label: "Anthropic: Claude on Vertex"
      },
      {
        label: "Claude Platform: rate limits"
      },
      {
        label: "Rappler/Reuters, citing the Financial Times: Google limits Meta’s use of Gemini"
      },
      {
        label: "Handelsblatt: Matt Garman"
      },
      {
        label: "Requesty: error code breakdown (April 2026)"
      },
      {
        label: "Google AI forum: Gemini billing spike"
      },
      {
        label: "Google Cloud forum: 429 rates on Gemini 2.0 Flash"
      },
      {
        label: "HiveMind (arXiv 2604.17111)"
      },
      {
        label: "FairInference (arXiv 2609.18112)"
      },
      {
        label: "KeyPooling (arXiv 2608.17485)"
      },
      {
        label: "Bruegel: Policy Brief 18/2026 on Europe’s AI compute gap"
      },
      {
        label: "Europe2031.ai: Compute Forecast"
      },
      {
        label: "IEA: Energy and AI (summary)"
      },
      {
        label: "Palantir: LLM capacity management"
      },
      {
        label: "Requesty: 429 Too Many Requests, causes and fixes (updated 29 September 2026)"
      },
      {
        label: "TrueFoundry: rate limiting in an AI Gateway (updated 12 October 2026)"
      },
      {
        label: "Palo Alto Networks: Rate Limiting for LLM Applications and Agents"
      },
      {
        label: "FinOps Foundation: Navigating GenAI Capacity Options (updated 4 February 2026)"
      },
      {
        label: "FinOps Foundation: FinOps for AI"
      },
      {
        label: "DORA: article 28"
      },
      {
        label: "DORA: article 29"
      },
      {
        label: "CSSF: ICT and cyber risk for DORA entities"
      }
    ]
  }
};
