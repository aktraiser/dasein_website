import type { Dictionary } from "./en";

const fr: Dictionary = {
  meta: {
    siteName: "Dasein",
    title: "Dasein : agents IA au travail",
    description:
      "Dasein aide les entreprises à travailler avec des agents IA : méthodes d’équipe, automatisation des processus et déploiement à grande échelle, sous contrôle.",
  },

  nav: {
    offers: "Offres",
    articles: "Articles",
    about: "À propos",
    contact: "Contact",
    cta: "Nous contacter",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
    skip: "Aller au contenu",
  },

  navMenu: {
    offers: {
      explore: "Explorer les offres",
      main: [
        { label: "Travailler avec l’IA", href: "/offers/ways-of-working" },
        { label: "Automatiser votre activité", href: "/offers/solutions" },
        { label: "Déployer l’IA à grande échelle", href: "/offers/engineering" },
      ],
      sideTitle: "Vue d’ensemble",
      side: [
        { label: "Les trois offres", href: "/#offers" },
      ],
    },
    about: {
      explore: "À propos de Dasein",
      main: [
        { label: "Notre vision", href: "/about" },
        { label: "Pourquoi « Dasein »", href: "/about#name" },
        { label: "Avec qui nous travaillons", href: "/about#audience" },
        { label: "Contact", href: "/contact" },
      ],
      sideTitle: "Société",
      side: [
        { label: "Offres", href: "/#offers" },
      ],
    },
  },

  hero: {
    eyebrow: "Agents IA au travail",
    title: "Nous travaillons avec des agents IA tous les jours. Nous mettons les vôtres au travail.",
    // Same sentence with inline pictograms: {arrow} {stack} {secure}
    titleMarked: "Nous travaillons avec des agents IA {stack} tous les jours. Nous mettons {arrow} les vôtres {secure} au travail.",
    chipLabels: { stack: "Technologies avec lesquelles nous travaillons", secure: "Sécurisé, validé par un humain" },
    lead: "Des méthodes de vos équipes jusqu’aux systèmes en production, avec des agents qui restent sous votre contrôle.",
    chain: ["Méthodes", "Processus", "Plateformes"],
    primary: "Nous contacter",
    secondary: "Voir les offres",
    intro: "Voici Dasein",
    introRight: "Agents IA au travail",
    inboxTitle: "inbox.app",
    inboxHead: "UN PROJET ?",
    inboxText: "Dites-nous ce que vous construisez.",
    inboxButton: "Démarrer la conversation",
    chainTitle: "chain.sys",
    runLabel: "run",
    runs: [
      {
        name: "incident-it",
        vertical: "Métiers",
        steps: ["14k événements log · CMDB", "2 incidents similaires + runbook", "cause : quota disque atteint", "validé ✓ runbook #42 exécuté"],
        approval: "en attente de l’astreinte",
      },
      {
        name: "migration-legacy",
        vertical: "IT",
        steps: ["dépôt legacy · 84k lignes", "37 interfaces cartographiées", "plan de migration · 12 PR", "revue ✓ PR #118 fusionnée"],
        approval: "en attente de revue de code",
      },
      {
        name: "synthese-incident",
        vertical: "Utilisateurs",
        steps: ["ticket + 3 pièces jointes", "cas similaires + articles KB", "synthèse & note de résolution", "relu ✓ note publiée"],
        approval: "en attente de relecture",
      },
    ],
    traceTitle: "trace.log",
  },

  os: {
    title: "Dasein.OS",
    stackTitle: "architecture.3d",
    stackSteps: [
      "ingestion logs & CMDB",
      "recherche d’incidents similaires",
      "raisonnement · cause trouvée",
      "l’agent prépare la remédiation",
      "en attente de validation humaine",
      "runbook exécuté dans l’ITSM",
      "tracé & audité",
    ],
    stackHint: "glisser pour pivoter",
    clockTitle: "Horloge 1.0",
    footerTitle: "Dasein",
    footer: ["Version 0.1", "Agents IA au travail.", "Tous les systèmes sont opérationnels."],
  },

  home: {
    stage: {
      label: "Entre l’intention et l’action, il y a le sens",
      scrollLabel: "Découvrir la suite",
      opening: "Entre l’intention",
      middle: "et l’action,",
      ending: "il y a le",
      meaning: "sens.",
      intro: "Dasein conçoit des relations plus simples entre les personnes et l’intelligence artificielle.",
      contact: "Parlons ensemble",
      offers: "Ce que nous faisons",
      human: "Une intention humaine",
      machine: "Des possibilités nouvelles",
    },
    simple: {
      systemsTitle: "Notre atelier, à ciel ouvert.",
      workTitle: "Des idées devenues concrètes.",
      journalTitle: "Prendre le temps de comprendre.",
      projectDetails: "À propos du projet",
      readCase: "Lire le retour d’expérience",
      readArticle: "Lire l’article",
      relationLabel: "La relation avant l’outil",
      relationTitle: "Vous donnez le sens. L’IA ouvre des possibles.",
      relationText: "Nous aidons vos équipes à travailler avec l’IA et construisons les systèmes qui rendent cette collaboration possible.",
      relationSteps: [
        ["L’intention", "Vous apportez le contexte et ce qui compte."],
        ["Le dialogue", "L’IA propose. Vous explorez et ajustez."],
        ["L’action", "Vous choisissez ce qui devient réel."],
      ],
      offersLabel: "Notre pratique",
      offersTitle: "Trois manières d’avancer.",
      offers: [
        { slug: "ways-of-working", name: "Travailler avec l’IA", text: "Trouver la place de l’IA dans le travail de votre équipe.", internal: "AI Ways of Working" },
        { slug: "solutions", name: "Construire une solution", text: "Construire un agent ou un outil utile à votre activité.", internal: "AI Solutions Studio" },
        { slug: "engineering", name: "Concevoir l’architecture", text: "Concevoir les fondations techniques de vos systèmes IA.", internal: "AI Architecture & Engineering" },
      ],
      explore: "Ce que nous construisons et partageons",
      systemsLabel: "Dans notre atelier",
      discover: "Notre station de veille et de recherche. Un outil interne.",
      gatebot: "Un assistant sur WhatsApp, en préparation.",
      workLabel: "Réalisations et publications",
      journalLabel: "Journal",
      allArticles: "Ouvrir le journal",
      maker: "AI Maker, notre projet éditorial.",
      contactTitle: "Qu’aimeriez-vous faire ?",
      contactText: "Partons de là.",
      contactLink: "Entrer en conversation",
    },
    position: {
      label: "Notre position",
      title: ["Nous concevons ce qui se passe", "entre", "l’humain et l’intelligence artificielle."],
      text: [
        "Dasein explore et construit de nouvelles formes de collaboration entre les personnes, leurs connaissances et les agents IA.",
        "De la manière de travailler aux systèmes qui permettent d’agir, nous réunissons expérience humaine, conception et ingénierie.",
      ],
    },
    offers: {
      label: "Nos interventions",
      title: "Trois formes d’intervention.",
      intro: "Indépendantes et complémentaires, elles commencent toutes par une première mission courte.",
      resultLabel: "Résultat",
      more: "Voir l’offre",
      items: [
        {
          slug: "ways-of-working",
          name: "Transformer le travail",
          internal: "AI Ways of Working",
          text: [
            "Quand les agents peuvent chercher, analyser, produire et agir, les méthodes de travail changent.",
            "Nous concevons avec les personnes leurs environnements agentiques : outils, skills, connaissances, mémoire, délégation, supervision et création.",
          ],
          result: "Un environnement de travail réellement utilisable et une méthode adaptée aux activités de l’équipe.",
        },
        {
          slug: "solutions",
          name: "Construire des systèmes",
          internal: "AI Solutions Studio",
          text: [
            "Transformer des intentions et des besoins métier en systèmes opérationnels.",
            "Nous développons des agents et des processus connectés aux outils, aux données et aux règles de l’organisation.",
          ],
          result: "Un cas d’usage fonctionnel et mesurable, avec des actions contrôlées.",
        },
        {
          slug: "engineering",
          name: "Architecturer l’intelligence",
          internal: "AI Architecture & Engineering",
          text: [
            "L’intelligence artificielle devient une composante des systèmes d’entreprise.",
            "Nous concevons les architectures permettant aux agents d’accéder aux connaissances, d’utiliser les outils, de respecter les identités et les droits, et d’agir avec traçabilité.",
          ],
          result: "Des fondations permettant de construire, sécuriser et faire évoluer les systèmes IA.",
        },
      ],
    },
    systems: {
      label: "Nos propres systèmes",
      title: "Nous construisons aussi nos propres systèmes.",
      intro: "Nous travaillons chaque jour avec les agents que nous construisons. Deux d’entre eux, présentés tels qu’ils sont.",
      items: [
        {
          name: "Discover",
          state: "live",
          status: "Actif en interne · non commercialisé",
          role: "Notre station de veille et de recherche.",
          text: "Elle collecte et relie de nombreuses sources d’information pour soutenir nos analyses et nos publications.",
          spec: [
            ["Fonction", "Veille et recherche"],
            ["Sert à", "Nos analyses et notre journal"],
            ["Accès", "Interne"],
          ],
        },
        {
          name: "Gatebot",
          state: "soon",
          status: "En préparation",
          role: "Notre assistant personnel sur WhatsApp, pour les indépendants et les dirigeants de TPE.",
          text: "Il suit les sujets en cours et vise à réaliser des actions avec l’accord de son utilisateur.",
          spec: [
            ["Canal", "WhatsApp"],
            ["Pour", "Indépendants, dirigeants de TPE"],
            ["Principe", "Agir avec l’accord de l’utilisateur"],
            ["Ouverture", "Une fois ses critères de fiabilité et de sécurité validés"],
          ],
        },
      ],
    },
    proofs: {
      label: "Réalisations",
      title: "Ce que nous avons fait.",
      intro: "Chaque entrée précise sa nature : projet client, expérimentation interne ou publication technique.",
      kinds: { client: "Projet client", internal: "Expérimentation interne", publication: "Publication technique" },
      items: [
        {
          slug: "weak-signal-l-acoustics",
          kind: "client",
          name: "Weak Signal",
          text: "Un pipeline agentique qui lit l’actualité, qualifie les opportunités et les transmet à la bonne équipe commerciale.",
          meta: "Avec L-Acoustics · livré en décembre 2025",
        },
        {
          slug: "phaseone10841",
          kind: "internal",
          name: "PHASEONE10841",
          text: "Un mémorial documentaire ouvert aux agents IA : deux interfaces pour un même contenu, un serveur MCP, des règles d’accès.",
          meta: "phaseone10841.fr",
        },
        {
          slug: "mcp",
          kind: "publication",
          name: "MCP",
          text: "Le protocole, ses limites, et ce qu’il faut autour.",
          meta: "Plateforme IA",
        },
        {
          slug: "ai-platform",
          kind: "publication",
          name: "AI Platform",
          text: "Le socle commun qui permet à chaque équipe de construire ses agents.",
          meta: "Architecture",
        },
      ],
    },
    journal: {
      label: "Journal",
      title: "Observer, chercher, écrire.",
      intro: "Des articles techniques et des analyses, préparés avec l’appui de Discover. Chaque source est vérifiée avant publication.",
      editorial: "Également : AI Maker, notre projet éditorial.",
      all: "Tous les articles",
    },
    meet: {
      label: "La rencontre",
      question: "Qu’est-ce que l’intelligence artificielle pourrait changer dans votre manière de travailler ?",
      offers: "Découvrir nos interventions",
      contact: "Nous parler de votre projet",
    },
  },

  bigline: ["Six couches.", "Un seul système."],

  trust: {
    label: "Architecture de confiance",
    title: "Quatre garanties, intégrées à chaque système.",
    items: [
      {
        name: "Connecter sans exposer",
        text: "Les agents accèdent aux systèmes via des gateways, des serveurs MCP et des API, jamais avec un accès direct et indifférencié. Chaque appel est filtré, journalisé et révocable.",
      },
      {
        name: "Gouverner l’autonomie",
        text: "Chaque agent a sa propre identité et des droits limités (lire, générer, créer, modifier, supprimer) selon la sensibilité des données et les points de validation.",
      },
      {
        name: "Observer, tracer, auditer",
        text: "Sources, appels d’outils, versions, validations humaines : chaque exécution peut être reconstituée, expliquée et, si besoin, interrompue.",
      },
      {
        name: "Gérer le cycle de vie",
        text: "Agents, skills, prompts et modèles sont versionnés, testés sur leurs comportements, déployés progressivement et retirés quand ils ne créent plus de valeur.",
      },
    ],
  },

  method: {
    index: "02",
    label: "Méthode",
    title: "De l’expérimentation à la production, étape par étape.",
    intro:
      "Nous ne partons pas d’une technologie mais d’un portefeuille de cas d’usage, et nous n’industrialisons que ce qui prouve sa valeur.",
    deliverablesLabel: "Livrables",
    steps: [
      {
        file: "01_map.exe",
        name: "Cartographier & prioriser",
        text: "Nous cartographions les cas d’usage avec les sponsors métiers et les classons par valeur × faisabilité : quick wins, cas structurants, cas exploratoires. Make ou Buy, au cas par cas.",
        deliverables: ["Portefeuille de cas d’usage", "Matrice valeur × faisabilité", "Niveau d’autonomie et de contrôle par cas"],
      },
      {
        file: "02_design.exe",
        name: "Concevoir l’architecture de confiance",
        text: "Quelles données, quels outils, quels droits, quels points de validation. Les agents ont leur propre identité et passent par des gateways et MCP, pas directement dans les systèmes.",
        deliverables: ["Architecture cible", "Modèle d’identité et de droits des agents", "Points de validation humaine"],
      },
      {
        file: "03_pilot.exe",
        name: "Construire & piloter",
        text: "Un premier agent sur un périmètre restreint, avec de vrais utilisateurs, mesuré dès le premier jour : temps gagné, qualité, erreurs, adoption.",
        deliverables: ["Pilote en conditions réelles", "Jeux d’évaluation", "Indicateurs de valeur"],
      },
      {
        file: "04_run.exe",
        name: "Industrialiser & exploiter",
        text: "Versionnement, observabilité, rollback, maîtrise des coûts : l’AgentOps. Ce qui crée de la valeur passe à l’échelle ; le reste est retiré.",
        deliverables: ["Catalogue et registries d’agents", "Observabilité & audit", "Pratiques AgentOps"],
      },
    ],
  },

  offers: {
    label: "Offres",
    title: "Trois façons de travailler avec nous.",
    intro: "Chaque offre part d’un problème que vous connaissez et commence par une première mission courte, au périmètre défini. Elles sont indépendantes et se complètent.",
    resultLabel: "À la fin, vous avez",
    startLabel: "Pour commencer",
    more: "Voir l’offre",
    page: {
      back: "Offres",
      secondaryCta: "Comment ça se passe",
      whatLabel: "Ce que nous faisons",
      resultLabel: "À la fin, vous avez",
      proofLabel: "Ce que nous avons fait",
      startLabel: "Pour commencer",
      entryLabel: "Première mission",
      nextLabel: "Ensuite",
      deliverablesLabel: "Livrables",
      scopeNote: "Durée et prix sont fixés ensemble, selon votre périmètre.",
      talk: "En parler",
      howLabel: "Comment ça se passe",
      conditionsLabel: "Ce qu’il faut pour réussir",
      excludedLabel: "Hors périmètre",
      technicalLabel: "Pour les équipes techniques",
      readingLabel: "À lire",
      read: "Lire",
      closingText: "Quelques lignes suffisent : votre contexte et ce que vous voulez accomplir. Nous revenons vers vous rapidement.",
      otherOffers: "Les autres offres",
      kinds: { article: "Article", case: "Retour d’expérience" },
    },
    items: [
      {
        slug: "ways-of-working",
        name: "Travailler avec l’IA",
        internal: "AI Ways of Working",
        audience: "Équipes et dirigeants",
        says: "« Mes équipes utilisent ChatGPT, chacun dans son coin. »",
        tagline: "Vos équipes utilisent déjà l’IA. Donnons-leur les bons outils et une méthode commune.",
        lead: "Nous partons des tâches de votre équipe pour configurer ses outils IA, préparer des méthodes réutilisables et apprendre à déléguer un travail, le vérifier et partager ce qui fonctionne.",
        result: "Une équipe pilote qui travaille avec ses agents : un environnement configuré, des skills partagés et une méthode commune pour déléguer et vérifier.",
        figures: [],
        figuresNote: "",
        features: [
          {
            title: "Un environnement configuré pour chaque personne",
            text: "Claude, ChatGPT ou Gemini, connectés aux outils autorisés de l’équipe, avec des skills écrits pour vos métiers.",
            window: "espace-equipe",
            rows: [
              { label: "Assistant · messagerie, agenda, documents", status: "connecté", tone: "ok" },
              { label: "Skill · synthèse de réunion", status: "actif", tone: "ok" },
              { label: "Skill · relecture de contrat", status: "actif", tone: "ok" },
              { label: "Skill · veille concurrents", status: "en test", tone: "wait" },
            ],
          },
          {
            title: "Une méthode commune pour déléguer",
            text: "Ce qu’on confie à un agent, ce qu’on vérifie, ce qu’on garde : des règles simples, partagées par toute l’équipe.",
            window: "methode.md",
            rows: [
              { label: "Brouillon de compte rendu", status: "déléguer", tone: "ok" },
              { label: "Chiffres d’un devis", status: "vérifier", tone: "wait" },
              { label: "Décision pour un client", status: "garder", tone: "off" },
            ],
          },
          {
            title: "Des données qui restent sous contrôle",
            text: "Une charte d’usage et un classement clair : ce qui peut être confié à un agent, et ce qui ne le peut pas.",
            window: "regles-donnees",
            rows: [
              { label: "Documents publics", status: "autorisé", tone: "ok" },
              { label: "Documents internes", status: "outils validés seulement", tone: "ok" },
              { label: "Données clients", status: "sur validation", tone: "wait" },
              { label: "Données RH", status: "exclu", tone: "off" },
            ],
          },
        ],
        start: {
          name: "Pilote d’équipe",
          text: "Une équipe réduite, un environnement, quelques skills, un atelier.",
          steps: [
            {
              name: "Diagnostic",
              text: "Qui utilise quoi, pour quelles tâches, avec quelles données.",
            },
            {
              name: "Configuration",
              text: "Un environnement de travail : outils, skills, connexions autorisées.",
            },
            {
              name: "Atelier méthode",
              text: "Confier un travail à un agent, le vérifier, partager ce qui marche.",
            },
          ],
          deliverables: "L’environnement en place, un guide d’équipe, trois à cinq skills métier.",
        },
        nextName: "Déploiement d’équipe",
        next: "Généralisation à toute l’équipe, base de connaissances partagée, gouvernance des droits et des données, accompagnement dans la durée. Ateliers dirigeants, formations d’équipe et formation de référents complètent l’offre.",
        conditions: [
          "Un sponsor qui porte le projet : dirigeant ou directeur métier.",
          "Une équipe pilote volontaire, disponible pour l’atelier.",
          "Des outils et des données autorisés par votre sécurité avant de commencer.",
        ],
        excluded: [
          "Le déploiement à toute l’équipe, qui vient ensuite.",
          "Le développement d’outils sur mesure.",
          "Le support après la livraison.",
        ],
        technical: "Configuration de Claude, Codex ou Gemini ; skills et bibliothèques de prompts partagées ; mémoire et base de connaissances ; connecteurs MCP vers les outils de l’équipe ; règles de délégation et de supervision ; charte d’usage et classement des données qui peuvent, ou non, être confiées à un agent.",
        related: ["user-augmentation"],
        cta: "Préparer un pilote d’équipe",
        closing: "Commencez avec une équipe pilote.",
      },
      {
        slug: "solutions",
        name: "Automatiser votre activité",
        internal: "AI Solutions Studio",
        audience: "Directions métier et opérations",
        says: "« On perd des heures sur des tâches répétitives. »",
        tagline: "Confiez à un agent les tâches qui se répètent, et gardez la main sur ce qui compte.",
        lead: "Documents, emails, dossiers, factures : une partie de votre activité se répète tous les jours. Nous construisons un agent qui prend ces tâches en charge, connecté à vos outils, et qui vous demande validation aux étapes qui comptent.",
        result: "Un premier processus automatisé et testé sur vos données, un bilan avant/après et une mise en production sur un périmètre restreint lorsque les prérequis sont réunis.",
        figures: [
          { value: "×5", label: "articles traités chaque jour" },
          { value: "×10", label: "plus rapide pour qualifier une opportunité" },
          { value: "−58 %", label: "de faux positifs" },
        ],
        figuresNote: "Weak Signal, avec L-Acoustics : un pipeline agentique qui lit l’actualité, qualifie les opportunités et les transmet à la bonne équipe commerciale.",
        features: [
          {
            title: "Un agent connecté à vos outils",
            text: "Il lit les documents, les emails ou les dossiers là où ils arrivent, et prépare le travail dans vos applications.",
            window: "agent-factures",
            rows: [
              { label: "Factures reçues", status: "lues", tone: "ok" },
              { label: "Rapprochées avec les commandes", status: "fait", tone: "ok" },
              { label: "Écarts détectés", status: "à vérifier", tone: "wait" },
            ],
          },
          {
            title: "Votre validation aux étapes qui comptent",
            text: "L’agent prépare, une personne valide. Rien n’est écrit dans vos systèmes sans accord, et chaque action est tracée.",
            window: "validation",
            rows: [
              { label: "Écart fournisseur", status: "en attente de validation", tone: "wait" },
              { label: "Avoir préparé", status: "prêt", tone: "ok" },
              { label: "Paiement", status: "bloqué jusqu’à validation", tone: "off" },
            ],
          },
          {
            title: "Un résultat mesuré",
            text: "Temps passé, erreurs, délais : mesurés avant et après, pour décider d’étendre, d’ajuster ou d’arrêter.",
            window: "bilan",
            rows: [
              { label: "Temps de traitement · avant / après", status: "mesuré", tone: "ok" },
              { label: "Erreurs · avant / après", status: "mesuré", tone: "ok" },
              { label: "Processus suivant", status: "à décider", tone: "wait" },
            ],
          },
        ],
        start: {
          name: "Sprint sur un processus",
          text: "Un cas, choisi avec vous, mené jusqu’à la production.",
          steps: [
            {
              name: "Prérequis",
              text: "La première semaine, nous vérifions les accès, les données, la sécurité et la disponibilité d’un responsable métier, et nous choisissons le processus.",
            },
            { name: "Mesure de départ", text: "Temps passé, erreurs, délais : l’avant, chiffré." },
            {
              name: "Construction",
              text: "L’agent est construit et testé sur vos données, avec de vrais utilisateurs.",
            },
            {
              name: "Mise en production",
              text: "Sur un périmètre restreint, si les prérequis sont réunis ; sinon, elle fait l’objet d’une mission séparée.",
            },
            { name: "Bilan", text: "L’après, mesuré, et la décision : étendre, ajuster ou arrêter." },
          ],
          deliverables: "Le processus automatisé, le bilan avant/après, la liste des processus suivants.",
        },
        nextName: "Processus suivants",
        next: "D’autres processus, un par un. Quand les agents se multiplient, un socle commun pour les gérer : c’est la troisième offre.",
        conditions: [
          "Un responsable métier disponible chaque semaine.",
          "Des accès autorisés aux systèmes concernés.",
          "Des données exploitables.",
          "Une définition partagée du résultat attendu et de sa mesure.",
        ],
        excluded: [
          "La refonte de vos outils existants.",
          "La reprise de données historiques.",
          "L’exploitation après le sprint, qui fait l’objet d’un contrat séparé.",
        ],
        technical: "Agent principal et sous-agents ; traitement documentaire (extraction, classement, rédaction) ; workflows ; intégrations API et MCP ; validation humaine, plafonds et masquage des données ; jeux d’évaluation et indicateurs de valeur.",
        related: ["weak-signal-l-acoustics", "business-applications"],
        cta: "Proposer un processus à automatiser",
        closing: "Commencez par un processus.",
      },
      {
        slug: "engineering",
        name: "Déployer l’IA à grande échelle",
        internal: "AI Architecture & Engineering",
        audience: "DSI, CTO, architectes",
        says: "« Chaque équipe lance son projet IA, personne ne contrôle rien. »",
        tagline: "Un socle commun pour que chaque équipe construise ses agents, sans multiplier les risques.",
        lead: "Plusieurs équipes construisent déjà des agents. Sans socle commun, les accès, les coûts et les risques se multiplient. Nous concevons et mettons en place l’architecture qui permet à vos agents de fonctionner avec vos systèmes, vos règles de sécurité et vos exigences de contrôle, sur le cloud que vous utilisez déjà.",
        result: "Une architecture cible à faire valider avec vos équipes sécurité, un modèle d’identité et de droits des agents, et un plan de déploiement.",
        figures: [],
        figuresNote: "",
        features: [
          {
            title: "Un point de passage pour tous les agents",
            text: "Des gateways pour les modèles, les outils MCP et les agents : chaque appel est filtré, journalisé et révocable.",
            window: "gateway",
            rows: [
              { label: "llm-gateway · eu-west", status: "actif", tone: "ok" },
              { label: "mcp · ticketing", status: "lecture seule", tone: "ok" },
              { label: "mcp · erp", status: "écriture sur validation", tone: "wait" },
              { label: "Clé d’API personnelle", status: "refusée", tone: "off" },
            ],
          },
          {
            title: "Une identité et des droits par agent",
            text: "Chaque agent agit avec sa propre identité ou celle de l’utilisateur, jamais avec plus de droits que nécessaire.",
            window: "agents",
            rows: [
              { label: "agent-support", status: "lire · rédiger", tone: "ok" },
              { label: "agent-finops", status: "lire · recommander", tone: "ok" },
              { label: "agent-factures", status: "écrire après validation", tone: "wait" },
            ],
          },
          {
            title: "Coûts, traces et versions sous contrôle",
            text: "Chaque exécution est tracée, attribuée à une équipe et versionnée. Un agent se retire en une seule opération.",
            window: "observabilite",
            rows: [
              { label: "Coût par équipe", status: "suivi", tone: "ok" },
              { label: "Traces d’exécution", status: "conservées", tone: "ok" },
              { label: "agent-legacy v2", status: "retiré", tone: "off" },
            ],
          },
        ],
        start: {
          name: "Revue d’architecture",
          text: "Un état des lieux et une architecture cible, avant de construire.",
          steps: [
            { name: "État des lieux", text: "Agents existants, accès, flux de données, coûts." },
            {
              name: "Écarts",
              text: "Ce qui s’écarte de vos exigences de sécurité et de conformité.",
            },
            {
              name: "Architecture cible",
              text: "Le socle à mettre en place et la feuille de route pour y aller.",
            },
          ],
          deliverables: "Une architecture de référence, un modèle d’identité et de droits des agents, un plan de déploiement.",
        },
        nextName: "Construction de la plateforme",
        next: "La construction et l’exploitation de la plateforme, puis les agents métier qui s’appuient dessus.",
        conditions: [
          "Un interlocuteur côté DSI ou architecture.",
          "L’accès à la documentation d’architecture et aux politiques de sécurité.",
          "Des entretiens avec les équipes qui construisent déjà des agents.",
        ],
        excluded: [
          "La construction de la plateforme, qui vient ensuite.",
          "Un audit de sécurité formel ou une certification.",
        ],
        technical: "Gateways LLM, MCP et agents ; identité propre à chaque agent et propagation de l’identité de l’utilisateur ; catalogue d’agents, d’outils et de skills ; observabilité, évaluation et suivi des coûts ; versionnement et retour arrière ; déploiement en cloud public, cloud souverain, sur site ou déconnecté ; socle data et sémantique.",
        related: ["ai-platform", "mcp", "couche-semantique", "phaseone10841"],
        cta: "Demander une revue d’architecture",
        closing: "Commencez par une revue d’architecture.",
      },
    ],
  },

  architecture: {
    index: "02",
    label: "Architecture",
    title: "Une seule chaîne, en production.",
    intro:
      "Faites défiler pour suivre un incident IT à travers un système Dasein. La donnée entre et devient contexte ; un modèle trouve la cause ; un agent prépare la remédiation ; un humain valide ; l’action s’exécute dans un système réel, et chaque étape est tracée.",
    traceTitle: "trace : exemple d’exécution",
    layers: [
      {
        id: "data",
        name: "Data",
        stack: ["Snowflake", "Databricks", "Cassandra"],
        title: "La donnée entre dans le système.",
        text: "Ingestion, pipelines, transformation et historisation. Flux et batchs arrivent dans des lakehouses, des entrepôts et des bases opérationnelles, structurés pour être fiables en aval.",
        trace: [
          "ingest   cloudwatch/logs  14 213 events → bronze.events",
          "join     cmdb.services  app=billing-api  owner=team-pay",
          "snapshot history.incidents  scd2  ✓",
        ],
      },
      {
        id: "knowledge",
        name: "Knowledge",
        stack: ["Corpus", "Search", "Vector", "RAG"],
        title: "La donnée devient connaissance.",
        text: "Documents et enregistrements deviennent un corpus : analysés, enrichis de métadonnées, découpés, vectorisés et indexés, pour que les modèles travaillent à partir de ce que l’entreprise sait réellement.",
        trace: [
          "index    runbooks + kb_articles  1 184 docs",
          "embed    pgvector.ops_idx  dim=1024",
          "search   hybrid  top_k=8  → 2 similar incidents",
        ],
      },
      {
        id: "intelligence",
        name: "Intelligence",
        stack: ["Mistral", "OpenAI", "Anthropic", "Models"],
        title: "Un modèle raisonne sur le contexte.",
        text: "Le bon modèle pour la bonne contrainte : performance, souveraineté, coût. Le contexte est construit, pas déversé, et chaque réponse peut être évaluée.",
        trace: [
          "route    model=mistral-large  reason=sovereignty",
          "context  8 passages + 2 incidents + metrics",
          "reason   root cause: disk quota on vol-billing-02",
        ],
      },
      {
        id: "agents",
        name: "Agent runtime",
        stack: ["Agents", "Memory", "Skills", "MCP", "Tools"],
        title: "Un agent décide et appelle un outil.",
        text: "Les agents gèrent un état et une mémoire, utilisent des skills et des outils via MCP, et font appel à un humain lorsque la politique l’exige.",
        trace: [
          "agent    ops-investigator@v3  step 3/5",
          "tool     mcp://servicenow/update_incident  (write)",
          "guard    scope=write:itsm  → approval requested",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        stack: ["ServiceNow", "APIs", "Applications", "SI"],
        title: "Validée, puis exécutée dans un système réel.",
        text: "L’agent a préparé la correction ; l’ingénieur d’astreinte l’a validée. Le résultat n’est pas un message de chat : un ticket mis à jour, un runbook exécuté, dans les outils que l’entreprise utilise déjà.",
        trace: [
          "human    approved by on-call engineer  ✓",
          "itsm     INC0048213 updated  remediation attached",
          "runbook  #42 executed  quota +20%  ✓",
        ],
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        stack: ["AWS", "Azure", "GCP", "IBM"],
        title: "Tout est gouverné et observé.",
        text: "Gateways, runtimes, identité, permissions, observabilité et audit rendent la chaîne sûre à exploiter, sur le cloud que l’entreprise utilise déjà.",
        trace: [
          "gateway  llm-gw.eu-west  p95=410ms",
          "otel     span=agent.run  cost=€0.014",
          "audit    agent=svc-ops-investigator  approver=on-call  ✓",
        ],
      },
    ],
  },

  pillars: {
    index: "02",
    label: "Ce que nous construisons",
    title: "Quatre couches, conçues ensemble.",
    intro:
      "La plupart des projets IA s’arrêtent entre la démo et la production. Le problème est rarement le modèle : c’est la donnée, le contexte, l’intégration et l’infrastructure autour.",
    items: [
      {
        name: "Data & Knowledge",
        file: "data.sys",
        keywords: ["Corpus", "Pipelines", "Historisation", "Storage", "Search", "Vector", "Knowledge"],
        text: "Les fondations : de l’ingestion aux bases vectorielles, pour que les systèmes IA travaillent sur une donnée fiable et bien structurée.",
      },
      {
        name: "AI & Models",
        file: "models.sys",
        keywords: ["LLM", "RAG", "Models", "Context", "Reasoning", "Evaluation"],
        text: "Des couches d’intelligence multi-modèles et multi-fournisseurs, avec context engineering et évaluation intégrés.",
      },
      {
        name: "Agents & Automation",
        file: "agents.sys",
        keywords: ["Agents", "Multi-agent", "MCP", "Tools", "Skills", "Memory", "Orchestration"],
        text: "Des agents qui agissent sur le système d’information, avec des outils, une mémoire et l’humain dans la boucle.",
      },
      {
        name: "AI Infrastructure",
        file: "infra.sys",
        keywords: ["Runtime", "Gateway", "Cloud", "Security", "Identity", "Observability", "Governance"],
        text: "La couche de production : gateways, runtimes, registries, sécurité et gouvernance, sur tous les clouds.",
      },
    ],
  },

  ecosystem: {
    index: "03",
    label: "Écosystème",
    title: "À travers les écosystèmes, sans s’enfermer dans un seul.",
    intro:
      "Dasein n’est attaché à aucun modèle, cloud ou framework. Notre travail consiste à faire fonctionner ces briques ensemble dans une architecture cohérente et sécurisée. Choisissez un système pour voir le chemin qu’il emprunte.",
    groups: [
      { name: "Data", items: ["Snowflake", "Databricks", "Cassandra", "Fabric", "PostgreSQL", "Qdrant"] },
      { name: "AI", items: ["Mistral AI", "OpenAI", "Anthropic", "Google", "Microsoft", "Open models"] },
      { name: "Agentic", items: ["MCP", "Tools", "Skills", "Runtimes", "Gateways", "Registries"] },
      { name: "Enterprise", items: ["ServiceNow", "ERP", "CRM", "ITSM", "Internal APIs"] },
      { name: "Cloud", items: ["AWS", "Azure", "GCP", "IBM"] },
    ],
    routes: [
      {
        name: "Assistant documentaire souverain",
        path: ["Azure", "PostgreSQL", "Mistral AI", "MCP", "Internal APIs"],
      },
      {
        name: "Agent d’opérations IT",
        path: ["AWS", "Snowflake", "Anthropic", "Runtimes", "ServiceNow"],
      },
      {
        name: "Copilote analytique",
        path: ["GCP", "Databricks", "Google", "Tools", "CRM"],
      },
      {
        name: "Plateforme de modèles privée",
        path: ["IBM", "Cassandra", "Open models", "Gateways", "ERP"],
      },
    ],
  },

  about: {
    label: "À propos",
    visionLabel: "Notre vision",
    title: "L’IA n’est pas un produit. C’est une nouvelle couche du système d’information, et elle se gouverne.",
    lead: "Pour fonctionner dans une entreprise, l’IA doit accéder à la donnée, comprendre le contexte, utiliser des outils, agir dans les systèmes existants, et rester sous contrôle. Dasein travaille à cette intersection.",
    beliefsLabel: "Ce que nous croyons",
    beliefs: [
      {
        title: "L’IA devient une couche du système d’information.",
        text: "Pas un outil de plus à côté des autres : une couche qui lit vos données, utilise vos applications et agit dans vos processus. Elle se conçoit avec la même exigence que le reste du SI.",
      },
      {
        title: "La valeur se joue dans la gouvernance, pas dans le front.",
        text: "L’interface de chat s’achète. Ce qui fait la différence, c’est ce qu’il y a derrière : qui peut faire quoi, avec quelles données, à quel coût, et avec quelle trace.",
        link: { label: "User Augmentation", href: "/articles/user-augmentation" },
      },
      {
        title: "Un agent agit toujours avec les droits de quelqu’un.",
        text: "Identité propagée, droits délégués, validation humaine avant d’écrire : un agent ne doit jamais voir ou faire plus que la personne pour qui il travaille.",
        link: { label: "MCP", href: "/articles/mcp" },
      },
      {
        title: "Un socle commun plutôt que cent projets isolés.",
        text: "Gateways, catalogue, observabilité, standards : mis en commun une fois, ils permettent à chaque équipe d’avancer vite sans réinventer la sécurité.",
        link: { label: "AI Platform", href: "/articles/ai-platform" },
      },
      {
        title: "Le plus simple qui fonctionne.",
        text: "Un workflow avant un agent, un agent avant plusieurs. On ajoute de la complexité quand le problème l’exige, pas parce que la technologie le permet.",
        link: { label: "Business Applications", href: "/articles/business-applications" },
      },
      {
        title: "L’IA a un poids physique.",
        text: "Derrière chaque modèle, il y a des mégawatts, de la chaleur et de l’eau. Choisir le bon modèle, mesurer, dimensionner au juste besoin fait partie du travail d’ingénieur.",
        link: { label: "Le mégawatt et le degré", href: "/articles/le-megawatt-et-le-degre" },
      },
    ],
    beliefMore: "Lire :",
    roleLabel: "Notre rôle",
    roleTitle: "Nous aidons à mettre en place. Vos équipes gardent la main.",
    role: [
      { title: "Cadrer", text: "Choisir les cas d’usage qui valent l’effort, le niveau de contrôle de chacun et l’architecture qui les porte." },
      { title: "Construire", text: "Mettre en place avec vos équipes les agents, le socle et la gouvernance, dans vos environnements et avec vos outils." },
      { title: "Transmettre", text: "Documenter, expliquer, former : nos articles et notre glossaire suivent la même règle, des sources, des limites, pas de jargon." },
    ],
    intersection: ["Data", "Software", "AI", "Infrastructure"],
    nameTitle: "Pourquoi « Dasein »",
    nameText:
      "Dasein : « être-là ». Une intelligence qui n’est pas abstraite mais située : présente dans un environnement, consciente de son contexte, capable d’y agir.",
    audienceTitle: "Avec qui nous travaillons",
    audienceText:
      "Des grands groupes aux PME : des équipes qui veulent travailler avec des agents IA, des directions métier qui veulent automatiser, et des DSI qui doivent déployer l’IA à grande échelle sans perdre le contrôle.",
    clients: [
      { name: "TF1", logo: "tf1.svg" },
      { name: "Safran", logo: "safran.svg" },
      { name: "Icade", logo: "icade.jpg" },
      { name: "L-Acoustics", logo: "l-acoustics-stacked.svg" },
    ],
    audience: [
      {
        title: "Directions",
        items: ["Dirigeants de PME et d’ETI", "COMEX", "CODIR", "Directions métier", "CTO", "DSI et systèmes d’information"],
      },
      {
        title: "Équipes",
        items: ["Opérations", "Produit", "Data center", "Réseau", "Cloud", "Data", "Cybersécurité"],
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Parlons de votre projet.",
    intro: "Quelques lignes suffisent : votre contexte, les systèmes concernés, ce que vous voulez accomplir. Nous revenons vers vous rapidement.",
    name: "Nom",
    company: "Entreprise",
    email: "Email",
    topic: "Sujet",
    topicNone: "Choisir un sujet (facultatif)",
    topics: {
      "ways-of-working": "Travailler avec l’IA",
      solutions: "Automatiser votre activité",
      engineering: "Déployer l’IA à grande échelle",
      other: "Autre chose",
    },
    project: "Votre projet",
    projectPlaceholder: "Contexte, systèmes concernés, ce que vous voulez accomplir…",
    submit: "Envoyer",
    sending: "Envoi…",
    success: "Merci, votre message a bien été envoyé. Nous revenons vers vous très vite.",
    error: "Une erreur est survenue. Merci de réessayer dans un instant.",
    invalid: "Merci de remplir tous les champs avec un email valide.",
  },

  articlesPage: {
    label: "Articles",
    readingTime: "min de lecture",
    title: "L’IA, en pratique.",
    intro:
      "Usages, architecture, énergie : nos analyses et nos retours d’expérience pour éclairer vos décisions.",
    glossaryTitle: "Un mot vous échappe ?",
    glossaryText: "Tous les termes techniques et métiers employés dans ces articles sont expliqués simplement dans le glossaire.",
    glossaryLink: "Ouvrir le glossaire",
    atlas: {
      kicker: "Le journal Dasein",
      intro:
        "Chaque point est un article ou une offre ; chaque trait, un lien entre eux. Survolez pour voir les liens, cliquez pour ouvrir.",
      groups: { article: "Articles de fond", case: "Retours d’expérience", offer: "Offres" },
      groupText: {
        article: "Des analyses sourcées sur l’IA en entreprise.",
        case: "Ce que nous avons construit, et ce que nous en avons appris.",
        offer: "Les trois façons de travailler avec nous.",
      },
      stats: { articles: "articles", words: "mots", minutes: "min de lecture", links: "liens" },
      open: {
        article: "Lire l’article",
        case: "Lire le retour d’expérience",
        offer: "Voir l’offre",
      },
      linked: "Liens",
      linkedTo: "Relié à :",
      others: "Autres sujets",
      search: "Chercher un article ou une offre",
      reset: "Recentrer",
      close: "Fermer",
      toList: "Voir la liste",
      loading: "Dessin de la carte…",
      unsupported: "La carte a besoin de WebGL, indisponible ici. Tous les articles sont listés juste en dessous.",
      mapLabel: "Carte des articles et des offres, reliés entre eux",
    },
  },

  glossary: {
    label: "Glossaire",
    title: "Les mots de la data et de l’IA, en clair.",
    intro: "Les termes techniques, métiers et de développement employés sur ce site, expliqués simplement.",
  },

  footer: {
    tagline: "Agents IA au travail, sous contrôle.",
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
    made: "Conçu et développé par Dasein.",
  },
};

export default fr;
