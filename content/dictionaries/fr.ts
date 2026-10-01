import type { Dictionary } from "./en";

const fr: Dictionary = {
  meta: {
    siteName: "Dasein",
    title: "Dasein — Ingénierie Data & IA",
    description:
      "Dasein conçoit et industrialise les fondations data et les systèmes IA qui permettent aux entreprises de transformer leurs données, leurs connaissances et leurs outils en systèmes capables de comprendre, raisonner et agir.",
  },

  nav: {
    expertise: "Expertise",
    work: "Réalisations",
    lab: "Lab",
    about: "À propos",
    contact: "Contact",
    cta: "Démarrer un projet",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
    skip: "Aller au contenu",
  },

  navMenu: {
    expertise: {
      explore: "Explorer l’expertise",
      main: [
        { label: "User Augmentation", href: "/expertise/user-augmentation" },
        { label: "Business Applications", href: "/expertise/business-applications" },
        { label: "AI Platform", href: "/expertise/ai-platform" },
      ],
      sideTitle: "Approche",
      side: [
        { label: "Trois verticales", href: "/#verticals" },
        { label: "Toute l’expertise", href: "/expertise" },
      ],
    },
    work: {
      explore: "Explorer les réalisations",
      sideTitle: "Ressources",
      side: [
        { label: "Tous les cas", href: "/work" },
        { label: "Démarrer un projet", href: "/contact" },
      ],
    },
    lab: {
      explore: "Explorer le lab",
      sideTitle: "Lab",
      side: [
        { label: "Axes de recherche", href: "/lab#tracks" },
        { label: "Journal", href: "/lab#log" },
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
        { label: "Expertise", href: "/expertise" },
        { label: "Réalisations", href: "/work" },
        { label: "Lab", href: "/lab" },
      ],
    },
  },

  hero: {
    eyebrow: "Ingénierie Data & IA",
    title: "Nous construisons les systèmes qui font fonctionner l’IA dans l’entreprise.",
    // Same sentence with inline pictograms: {arrow} {stack} {secure}
    titleMarked: "Nous construisons {arrow} les systèmes qui font fonctionner {stack} l’IA dans {secure} l’entreprise.",
    chipLabels: { stack: "Technologies avec lesquelles nous travaillons", secure: "Sécurisé, validé par un humain" },
    lead: "Dasein conçoit et industrialise les fondations data et les systèmes IA qui transforment les données, les connaissances et les outils existants d’une organisation en systèmes capables de comprendre, raisonner et agir.",
    chain: ["Data", "Knowledge", "Intelligence", "Action"],
    primary: "Démarrer un projet",
    secondary: "Explorer le lab",
    intro: "Voici Dasein",
    introRight: "Ingénierie Data & IA",
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
    footer: ["Version 0.1", "Ingénierie Data & IA.", "Tous les systèmes sont opérationnels."],
  },

  featured: {
    label: "À la une",
    kinds: { article: "Article", announcement: "Annonce", case: "Réalisation", lab: "Lab" },
  },

  statement: {
    title: "Nous ne nous limitons pas aux chatbots. Nous construisons les systèmes sur lesquels l’IA fonctionne.",
    points: [
      { name: "Multi-modèles", text: "Mistral, OpenAI, Anthropic, modèles open source — le bon pour chaque contrainte." },
      { name: "Multi-cloud", text: "AWS, Azure, GCP, IBM ou privé : nous construisons sur ce que vous utilisez déjà." },
      { name: "Production d’abord", text: "Identité, permissions, observabilité et gouvernance dès le premier jour." },
    ],
  },

  bigline: ["Six couches.", "Un seul système."],

  trust: {
    label: "Architecture de confiance",
    title: "Quatre garanties, intégrées à chaque système.",
    items: [
      {
        name: "Connecter sans exposer",
        text: "Les agents accèdent aux systèmes via des gateways, des serveurs MCP et des API — jamais avec un accès direct et indifférencié. Chaque appel est filtré, journalisé et révocable.",
      },
      {
        name: "Gouverner l’autonomie",
        text: "Chaque agent a sa propre identité et des droits limités — lire, générer, créer, modifier, supprimer — selon la sensibilité des données et les points de validation.",
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
      "Nous ne partons pas d’une technologie mais d’un portefeuille de cas d’usage — et nous n’industrialisons que ce qui prouve sa valeur.",
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
        text: "Versionnement, observabilité, rollback, maîtrise des coûts — l’AgentOps. Ce qui crée de la valeur passe à l’échelle ; le reste est retiré.",
        deliverables: ["Catalogue et registries d’agents", "Observabilité & audit", "Pratiques AgentOps"],
      },
    ],
  },

  offer: {
    caption:
      "Schéma de l’offre Dasein : l’accompagnement en haut ; au centre, User Augmentation et Business Applications autour de l’AI Platform, avec la gouvernance en son cœur ; en bas, les modes de déploiement.",
    axes: { support: "Accompagner", activate: "Activer", govern: "Gouverner", deploy: "Déployer" },
    support: {
      title: "Accompagnement",
      items: ["Cadrage des cas d’usage", "Mise en place de la gouvernance", "Montée en compétence des équipes"],
    },
    left: { name: "User Augmentation", text: "Des agents pour chaque collaborateur" },
    right: { name: "Business Applications", text: "Des agents dans les processus métiers" },
    core: { name: "AI Platform", text: "Gateway · Registry · Observabilité" },
    inner: { name: "Gouvernance", text: "Identité · Droits · Audit" },
    infra: ["Cloud public", "Cloud souverain", "On-premise", "Air-gapped"],
  },

  verticals: {
    index: "01",
    label: "IA agentique",
    title: "La gouvernance de l’IA se joue sur trois verticales.",
    intro:
      "Un assistant qui résume un document et un agent qui agit dans un ERP n’appellent pas les mêmes règles. Nous structurons l’IA agentique en deux verticales — utilisateurs et métiers — posées sur un socle IT commun qui gouverne tous les agents.",
    buildsLabel: "Ce que nous construisons",
    controlLabel: "Contrôle",
    levels: ["Léger", "Renforcé", "Strict"],
    // Used on the Work page to label each case's autonomy.
    patterns: [
      "Assistant augmenté",
      "Agent outillé",
      "Agent de workflow",
      "Agent autonome supervisé",
      "Orchestration multi-agents",
    ],
    page: {
      back: "Expertise",
      problemLabel: "Le problème",
      buildsLabel: "Ce que nous construisons",
      useCasesLabel: "Cas d’usage types",
      controlLabel: "Gouvernance",
      casesLabel: "Réalisations associées",
      next: "Verticale suivante",
      more: "En savoir plus",
    },
    items: [
      {
        id: "end-users",
        slug: "user-augmentation",
        audience: "Utilisateurs",
        name: "User Augmentation",
        purpose: "L’IA au service de chaque collaborateur.",
        lead: "Donner à chaque collaborateur des agents utiles, simples à créer, et qui agissent avec ses propres droits.",
        problem:
          "Les collaborateurs utilisent déjà l’IA, souvent avec des outils grand public, hors de tout cadre. Les données sortent de l’entreprise, les usages ne sont pas mesurés, et les assistants ne sont reliés à aucun de vos outils.",
        builds: [
          { name: "Interface utilisateur", text: "Un point d’entrée unique pour les collaborateurs, intégré à leurs outils de travail." },
          { name: "Création d’agents simples", text: "Les équipes créent leurs propres assistants à partir de modèles validés, sans développement." },
          { name: "Connecteurs", text: "Accès aux documents, tickets, messageries et référentiels de l’entreprise." },
          { name: "Connexion machine à machine", text: "Les agents échangent avec les applications par API, sans manipulation manuelle." },
          { name: "Propagation d’identité", text: "L’agent agit avec l’identité et les droits de l’utilisateur : il ne voit que ce que la personne a le droit de voir." },
        ],
        useCases: [
          "Synthèses d’incidents et notes de résolution",
          "Préparation de réunions et de comités",
          "Recherche dans la documentation technique",
          "Premiers livrables : comptes rendus, articles de base de connaissance",
        ],
        control: "L’agent agit avec l’identité et les droits de l’utilisateur ; la personne valide.",
        controlPoints: [
          "Des outils validés par l’entreprise plutôt que des outils grand public",
          "Des données classifiées : ce qui peut, ou non, être exposé",
          "Une vérification humaine de chaque sortie",
          "Une charte d’usage et une formation des équipes",
        ],
        level: 1,
      },
      {
        id: "business",
        slug: "business-applications",
        audience: "Métiers",
        name: "Business Applications",
        purpose: "L’IA qui agit dans les processus métiers.",
        lead: "Des agents qui travaillent dans vos processus et vous aident à décider — sous contrôle.",
        problem:
          "Les processus récurrents — tickets, factures, recommandations FinOps, audits — absorbent un temps considérable en tâches répétitives, et la donnée utile pour décider reste enfermée dans les entrepôts et les applications.",
        builds: [
          { name: "Agents autonomes", text: "Des agents qui enchaînent plusieurs étapes d’un processus : lire, analyser, préparer, mettre à jour." },
          { name: "Talk to my data", text: "Interroger en langage naturel les données de Snowflake, Databricks ou des applications métiers, avec les droits de chacun." },
          { name: "Aide à la décision", text: "Des recommandations argumentées et sourcées, prêtes à être validées par un expert." },
          { name: "Isolation des runtimes", text: "Chaque agent s’exécute dans un environnement isolé, limité à son périmètre." },
          { name: "Connecteurs métiers", text: "ERP, CRM, ITSM, outils financiers : les agents agissent dans les applications existantes." },
        ],
        useCases: [
          "Recommandations FinOps et suivi des remédiations",
          "Réconciliation de factures fournisseurs",
          "Rapports d’audit sécurité avant mise en production",
          "Automatisation de tickets ITSM",
        ],
        control: "Runtimes isolés, droits limités, validation humaine aux étapes clés.",
        controlPoints: [
          "Des droits d’accès limités au périmètre de chaque agent",
          "Des sources validées et versionnées",
          "Une validation humaine aux étapes clés",
          "Une traçabilité complète des actions",
        ],
        level: 2,
      },
      {
        id: "it",
        slug: "ai-platform",
        audience: "IT & plateforme",
        name: "AI Platform",
        purpose: "Le socle commun à tous les agents.",
        lead: "Le socle commun qui connecte, sécurise et observe tous vos agents.",
        problem:
          "Sans socle commun, chaque équipe construit ses agents de son côté : clés d’API dispersées, outils exposés sans contrôle, aucune vision des accès, des coûts ou des erreurs. Le passage à l’échelle devient un risque.",
        builds: [
          { name: "Gateway pour tous les agents", text: "Un point de passage unique vers les modèles et les outils : routage, quotas, filtrage, journalisation." },
          { name: "Registry — agents, skills, prompts, tools", text: "Le catalogue versionné de tout ce que vos agents utilisent, serveurs MCP compris." },
          { name: "Observabilité & audit", text: "Chaque exécution est tracée : sources, appels d’outils, versions, validations, coûts." },
          { name: "Agents de code & CI/CD", text: "Des agents dans la chaîne logicielle — tests, documentation, migrations — avec revue avant fusion." },
        ],
        useCases: [
          "Plateforme agentique à l’échelle d’un groupe",
          "Gateway LLM multi-cloud",
          "Catalogue d’agents et de serveurs MCP",
          "Migration applicative assistée",
        ],
        control: "Un point de contrôle unique : identités, accès, traces et versions de chaque agent.",
        controlPoints: [
          "Un point de contrôle unique pour tous les agents",
          "Une identité propre à chaque agent, des droits révocables",
          "Des versions maîtrisées : modèles, prompts, skills",
          "Le retrait d’un agent en une seule opération",
        ],
        level: 3,
      },
    ],
  },

  architecture: {
    index: "02",
    label: "Architecture",
    title: "Une seule chaîne, en production.",
    intro:
      "Faites défiler pour suivre un incident IT à travers un système Dasein. La donnée entre et devient contexte ; un modèle trouve la cause ; un agent prépare la remédiation ; un humain valide ; l’action s’exécute dans un système réel — et chaque étape est tracée.",
    traceTitle: "trace — exemple d’exécution",
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
        text: "Documents et enregistrements deviennent un corpus : analysés, enrichis de métadonnées, découpés, vectorisés et indexés — pour que les modèles travaillent à partir de ce que l’entreprise sait réellement.",
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
        text: "Le bon modèle pour la bonne contrainte : performance, souveraineté, coût. Le contexte est construit, pas déversé — et chaque réponse peut être évaluée.",
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
        text: "Gateways, runtimes, identité, permissions, observabilité et audit rendent la chaîne sûre à exploiter — sur le cloud que l’entreprise utilise déjà.",
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
        text: "Des agents qui agissent sur le système d’information — avec des outils, une mémoire et l’humain dans la boucle.",
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

  workTeaser: {
    index: "05",
    label: "Réalisations",
    title: "Les problèmes que nous savons résoudre.",
    link: "Tous les cas",
  },

  labTeaser: {
    index: "06",
    label: "Lab",
    title: "Engineering + Research.",
    text: "Dasein ne fait pas uniquement de l’intégration. Nous expérimentons de nouvelles formes de systèmes intelligents — systèmes multi-agents, mémoire des agents, runtimes, protocoles d’interaction — et ramenons en production ce qui fonctionne.",
    link: "Entrer dans le lab",
  },

  expertise: {
    indexTitle: "Trois verticales. Une même exigence d’ingénierie.",
    indexIntro:
      "Nous intervenons là où l’IA doit fonctionner pour de vrai : auprès des collaborateurs, dans les processus métiers, et sur le socle qui gouverne tous les agents.",
    foundationsLabel: "Sur quoi nous nous appuyons",
    foundationsTitle: "Quatre socles techniques.",
    more: "En savoir plus",
    label: "Expertise",
    title: "Data, connaissance, intelligence et action — comme un seul système.",
    intro:
      "Nous intervenons sur toute la chaîne, et sur sa mise en œuvre dans l’environnement technologique réel de l’entreprise : cloud, plateformes data, modèles, applications métiers, API et systèmes d’information existants.",
    domains: [
      {
        id: "data-knowledge",
        name: "Data & Knowledge",
        summary:
          "Corpus, data engineering, pipelines, historisation, stockage, recherche, vectorisation, RAG et systèmes de connaissance.",
        text: "Nous construisons les fondations nécessaires à l’exploitation de la donnée, puis transformons données et documents en connaissances exploitables par les systèmes IA — pour que modèles et agents travaillent à partir de la connaissance réelle de l’entreprise, plutôt qu’à partir de leur seule connaissance générale.",
        groups: [
          {
            name: "Fondations",
            items: ["Collecte & ingestion", "Data engineering", "Pipelines", "Structuration & transformation", "Historisation", "Stockage & exposition", "Streaming & événements"],
          },
          {
            name: "Stockage",
            items: ["Data lakes", "Data warehouses", "Lakehouses", "Bases relationnelles", "Bases documentaires", "Bases distribuées", "Bases vectorielles"],
          },
          {
            name: "Connaissance",
            items: ["Constitution de corpus", "Traitement documentaire", "Métadonnées", "Indexation", "Embeddings", "Recherche sémantique", "RAG", "Knowledge bases", "Contexte & mémoire"],
          },
        ],
        stack: ["Snowflake", "Databricks", "Cassandra", "Microsoft Fabric", "PostgreSQL", "pgvector", "Qdrant"],
      },
      {
        id: "ai-models",
        name: "AI & Models",
        summary:
          "LLM, RAG, context engineering, modèles spécialisés, model serving et systèmes d’IA générative.",
        text: "Notre approche est volontairement multi-modèles et multi-fournisseurs. Nous concevons des architectures capables d’intégrer différents modèles selon les contraintes de performance, de sécurité, de souveraineté, de coût et les besoins métiers — y compris des modèles open source déployés sur infrastructure privée lorsque le contexte l’exige.",
        groups: [
          {
            name: "Capacités",
            items: ["LLM", "RAG", "Modèles spécialisés", "Context engineering", "Reasoning", "Model serving", "Évaluation", "Applications d’IA générative"],
          },
        ],
        stack: ["Mistral AI", "OpenAI", "Anthropic", "Google", "Microsoft", "IBM", "Modèles open source"],
      },
      {
        id: "agents-automation",
        name: "Agents & Automation",
        summary:
          "Agents IA, systèmes multi-agents, orchestration, MCP, tools, skills, mémoire et connexion au système d’information.",
        text: "Nous construisons des systèmes capables non seulement de produire de l’information, mais aussi d’interagir avec leur environnement. L’objectif n’est pas une IA isolée du SI, mais une intelligence capable de comprendre et d’utiliser les systèmes existants — de manière contrôlée.",
        groups: [
          {
            name: "Systèmes agentiques",
            items: ["Agents IA", "Systèmes multi-agents", "Orchestration", "Workflows agentiques", "Skills", "Tools", "MCP", "Mémoire", "Gestion d’état", "Human-in-the-loop"],
          },
          {
            name: "Connectés à",
            items: ["ServiceNow", "Snowflake", "Databricks", "ERP", "CRM", "ITSM", "API internes", "Bases de données", "Outils documentaires", "Plateformes métiers"],
          },
        ],
        stack: [],
      },
      {
        id: "ai-infrastructure",
        name: "AI Infrastructure",
        summary:
          "Runtimes, gateways, registries, cloud, sécurité, identité, observabilité et gouvernance.",
        text: "Nous industrialisons les infrastructures nécessaires au fonctionnement de ces systèmes en production, adaptées à l’environnement existant de l’entreprise plutôt que d’imposer une pile unique.",
        groups: [
          {
            name: "Plateforme",
            items: ["AI / LLM gateways", "Agent gateways", "Agent runtimes", "Model serving", "Registries — agents, skills, prompts, tools", "Serveurs MCP"],
          },
          {
            name: "Contrôle",
            items: ["Sécurité", "Identité", "Permissions", "Observabilité", "Évaluation", "Traçabilité", "Gouvernance"],
          },
          {
            name: "Environnements",
            items: ["AWS Bedrock / AgentCore", "Azure AI Foundry / AKS / APIM", "Google Cloud Vertex AI", "IBM watsonx", "Kubernetes / OpenShift", "Infrastructures privées"],
          },
        ],
        stack: ["AWS", "Microsoft Azure", "Google Cloud Platform", "IBM"],
      },
    ],
    approach: {
      title: "Notre approche",
      text: "Nous ne construisons pas des chatbots isolés. Nous construisons les systèmes Data + AI qui permettent à l’intelligence artificielle de fonctionner dans l’environnement réel de l’entreprise — cohérents, sécurisés et industrialisables.",
      points: [
        { name: "Multi-modèles", text: "Aucune dépendance à un modèle ou un fournisseur unique." },
        { name: "Multi-cloud", text: "Des architectures adaptées au cloud que vous utilisez déjà." },
        { name: "Production d’abord", text: "Sécurité, identité, observabilité et gouvernance dès le premier jour." },
      ],
    },
  },

  work: {
    label: "Réalisations",
    title: "Les problèmes que nous savons résoudre.",
    intro:
      "Des problématiques concrètes rencontrées sur le terrain. Une grande partie de nos missions sont confidentielles : les cas sont décrits par le problème et le système construit, plutôt que par le nom du client.",
    problem: "Problème",
    build: "Ce que nous construisons",
    stack: "Stack type",
    confidential: "Anonymisé",
    verticalLabel: "Verticale",
    patternLabel: "Autonomie",
    crossCutting: "Transverse",
  },

  lab: {
    label: "Lab",
    title: "Engineering + Research.",
    intro:
      "Le laboratoire est au cœur de l’identité de Dasein. Nous expérimentons de nouvelles formes de systèmes intelligents, et ramenons ce qui tient la route dans les systèmes que nous construisons pour nos clients.",
    tracksTitle: "Axes de recherche",
    logTitle: "Journal",
    logEmpty:
      "Expériences, démonstrations, publications techniques et projets open source seront publiés ici.",
    status: { active: "Actif", exploring: "Exploration" },
  },

  about: {
    label: "À propos",
    title: "L’IA devient une nouvelle couche du système d’information.",
    paragraphs: [
      "Nous ne considérons pas l’intelligence artificielle comme un produit isolé. Elle devient progressivement une nouvelle couche du système d’information.",
      "Pour fonctionner réellement dans une entreprise, elle doit pouvoir accéder à la donnée, comprendre le contexte, conserver une mémoire, utiliser des outils, interagir avec les systèmes existants et agir dans un cadre sécurisé.",
      "Dasein travaille précisément à cette intersection.",
    ],
    intersection: ["Data", "Software", "AI", "Infrastructure"],
    nameTitle: "Pourquoi « Dasein »",
    nameText:
      "Dasein — « être-là ». Une intelligence qui n’est pas abstraite mais située : présente dans un environnement, consciente de son contexte, capable d’y agir.",
    audienceTitle: "Avec qui nous travaillons",
    audienceText:
      "De grands groupes disposant d’écosystèmes data et cloud complexes, comme des entreprises technologiques qui accélèrent la construction de leurs infrastructures et produits IA.",
    audience: [
      "CTO",
      "CIO",
      "Chief Data Officer",
      "Chief AI Officer",
      "Responsables Data & AI",
      "Responsables architecture",
      "Équipes engineering",
      "Équipes Cloud",
      "Équipes Data",
      "Équipes innovation",
      "Directions métiers portant des projets IA structurants",
    ],
  },

  contact: {
    label: "Contact",
    title: "Dites-nous ce que vous construisez.",
    intro: "Quelques lignes suffisent. Nous revenons vers vous rapidement.",
    name: "Nom",
    company: "Entreprise",
    email: "Email",
    project: "Votre projet",
    projectPlaceholder: "Contexte, systèmes concernés, ce que vous voulez accomplir…",
    submit: "Envoyer",
    sending: "Envoi…",
    success: "Merci — votre message a bien été envoyé. Nous revenons vers vous très vite.",
    error: "Une erreur est survenue. Merci de réessayer dans un instant.",
    invalid: "Merci de remplir tous les champs avec un email valide.",
  },

  articlesPage: {
    label: "Articles",
    readingTime: "min de lecture",
  },

  glossary: {
    label: "Glossaire",
    title: "Les mots de la data et de l’IA, en clair.",
    intro: "Les termes techniques, métiers et de développement employés sur ce site, expliqués simplement.",
  },

  footer: {
    tagline: "Ingénierie Data & IA.",
    rights: "Tous droits réservés.",
    made: "Conçu et développé par Dasein.",
  },
};

export default fr;
