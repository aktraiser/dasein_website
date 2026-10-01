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
    articles: "Articles",
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
        { label: "Expertise", href: "/#verticals" },
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
    secondary: "Lire nos articles",
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
    kinds: { article: "Article", announcement: "Annonce", case: "Réalisation" },
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
    buildsLabel: "Ce que nous mettons en place",
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
      more: "Lire l’article",
    },
    items: [
      {
        id: "end-users",
        slug: "user-augmentation",
        audience: "Utilisateurs",
        name: "User Augmentation",
        purpose: "Des agents pour chaque collaborateur, avec ses propres droits.",
        lead: "Donner à chaque collaborateur des agents utiles, simples à créer, et qui agissent avec ses propres droits.",
        problem:
          "Les collaborateurs utilisent déjà l’IA, souvent avec des outils grand public, hors de tout cadre. Les données sortent de l’entreprise, les usages ne sont pas mesurés, et les assistants ne sont reliés à aucun de vos outils.",
        builds: [
          { name: "Choix et intégration du front IA", text: "Un front du marché, souverain ou open source, intégré à vos outils." },
          { name: "Agents déclaratifs", text: "Des agents décrits en YAML : relus, versionnés, validés avant publication." },
          { name: "Connexions MCP gouvernées", text: "Un catalogue de serveurs MCP validés, ouverts par groupe." },
          { name: "Propagation d’identité", text: "L’agent agit avec les droits de l’utilisateur, pas plus." },
          { name: "Skills et prompts partagés", text: "Des savoir-faire réutilisables, gérés comme une bibliothèque." },
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
        purpose: "Des agents qui travaillent dans vos processus, sous contrôle.",
        lead: "Des agents qui travaillent dans vos processus et vous aident à décider — sous contrôle.",
        problem:
          "Les processus récurrents — tickets, factures, recommandations FinOps, audits — absorbent un temps considérable en tâches répétitives, et la donnée utile pour décider reste enfermée dans les entrepôts et les applications.",
        builds: [
          { name: "Agent principal et sous-agents", text: "Un agent qui planifie et délègue, plutôt qu’un agent qui fait tout." },
          { name: "Talk to my data", text: "Interroger vos données en langage courant, avec les droits de chacun." },
          { name: "Aide à la décision", text: "Des recommandations sourcées, validées par un expert." },
          { name: "Middlewares de contrôle", text: "Validation humaine, plafonds, masquage des données, branchés sur la boucle de l’agent." },
          { name: "Runtimes isolés", text: "Chaque agent dans son environnement, limité à son périmètre." },
        ],
        useCases: [
          "Recommandations FinOps et suivi des remédiations",
          "Réconciliation de factures fournisseurs",
          "Rapports d’audit sécurité avant mise en production",
          "Automatisation de tickets ITSM",
        ],
        control: "Droits limités par agent, runtimes isolés, validation humaine avant toute écriture.",
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
        purpose: "Le socle commun qui connecte, sécurise et observe tous les agents.",
        lead: "Le socle commun qui connecte, sécurise et observe tous vos agents.",
        problem:
          "Sans socle commun, chaque équipe construit ses agents de son côté : clés d’API dispersées, outils exposés sans contrôle, aucune vision des accès, des coûts ou des erreurs. Le passage à l’échelle devient un risque.",
        builds: [
          { name: "Gateways LLM, MCP et agents", text: "Un point de passage par type de flux, avec ses propres règles." },
          { name: "Catalogue d’agents, d’outils et de skills", text: "Ce qui est validé, réutilisable par toutes les équipes." },
          { name: "Observabilité, évaluation et coûts", text: "Chaque exécution tracée, mesurée, attribuée à une équipe." },
          { name: "Standards et centre d’excellence", text: "Les règles communes et les modèles validés, pour un modèle fédéré." },
        ],
        useCases: [
          "Plateforme agentique à l’échelle d’un groupe",
          "Gateway LLM multi-cloud",
          "Catalogue d’agents et de serveurs MCP",
          "Migration applicative assistée",
        ],
        control: "Un point de contrôle unique pour toutes les équipes : identités, accès, coûts, traces et versions.",
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
        link: { label: "User Augmentation", href: "/expertise/user-augmentation" },
      },
      {
        title: "Un agent agit toujours avec les droits de quelqu’un.",
        text: "Identité propagée, droits délégués, validation humaine avant d’écrire : un agent ne doit jamais voir ou faire plus que la personne pour qui il travaille.",
        link: { label: "MCP", href: "/articles/mcp" },
      },
      {
        title: "Un socle commun plutôt que cent projets isolés.",
        text: "Gateways, catalogue, observabilité, standards : mis en commun une fois, ils permettent à chaque équipe d’avancer vite sans réinventer la sécurité.",
        link: { label: "AI Platform", href: "/expertise/ai-platform" },
      },
      {
        title: "Le plus simple qui fonctionne.",
        text: "Un workflow avant un agent, un agent avant plusieurs. On ajoute de la complexité quand le problème l’exige, pas parce que la technologie le permet.",
        link: { label: "Business Applications", href: "/expertise/business-applications" },
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
      "Dasein — « être-là ». Une intelligence qui n’est pas abstraite mais située : présente dans un environnement, consciente de son contexte, capable d’y agir.",
    audienceTitle: "Avec qui nous travaillons",
    audienceText:
      "De grands groupes disposant d’écosystèmes data et cloud complexes, comme des entreprises technologiques qui accélèrent la construction de leurs infrastructures et produits IA.",
    clients: [
      { name: "TF1", logo: "tf1.svg" },
      { name: "Safran", logo: "safran.svg" },
      { name: "Icade", logo: "icade.jpg" },
      { name: "L-Acoustics", logo: "l-acoustics.svg" },
    ],
    audience: [
      {
        title: "Directions",
        items: ["COMEX", "CODIR", "CTO", "DSI et systèmes d’information"],
      },
      {
        title: "Équipes",
        items: ["Produit", "Data center", "Réseau", "Cloud", "Data", "Cybersécurité"],
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
    title: "Comprendre l’IA en entreprise, sans jargon.",
    intro:
      "Des articles de fond, sourcés, pour comprendre comment on met des agents au travail dans une entreprise : ce que ça change, ce qui coince, et comment le gouverner.",
    read: "Lire l’article",
    glossaryTitle: "Un mot vous échappe ?",
    glossaryText: "Tous les termes techniques et métiers employés dans ces articles sont expliqués simplement dans le glossaire.",
    glossaryLink: "Ouvrir le glossaire",
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
