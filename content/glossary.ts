import type { Locale } from "@/lib/i18n";

/**
 * Plain-language definitions of the technical, business and dev terms used on the site.
 * `match` lists the forms looked up in the text (longest forms win, case-insensitive);
 * the first occurrence on a page gets an inline definition.
 */
export type GlossaryEntry = {
  id: string;
} & Record<Locale, { name: string; def: string; match: string[] }>;

export const glossary: GlossaryEntry[] = [
  {
    id: "agent",
    fr: {
      name: "Agent",
      def: "Un programme qui utilise un modèle d’IA pour accomplir une tâche : il lit des informations, appelle des outils et propose ou exécute des actions.",
      match: ["agents", "agent"],
    },
    en: {
      name: "Agent",
      def: "A program that uses an AI model to carry out a task: it reads information, calls tools and suggests or performs actions.",
      match: ["agents", "agent"],
    },
  },
  {
    id: "agentic-ai",
    fr: {
      name: "IA agentique",
      def: "Une IA qui ne se contente pas de répondre : elle enchaîne des étapes et agit dans des outils pour atteindre un objectif.",
      match: ["IA agentique", "agentique"],
    },
    en: {
      name: "Agentic AI",
      def: "AI that does more than answer: it chains steps together and acts in tools to reach a goal.",
      match: ["agentic AI", "agentic"],
    },
  },
  {
    id: "declarative-agent",
    fr: {
      name: "Agent déclaratif",
      def: "Un agent décrit dans un fichier de configuration (rôle, instructions, modèle, outils, droits) plutôt que programmé. On peut le relire, le valider et le versionner.",
      match: ["agents déclaratifs", "agent déclaratif"],
    },
    en: {
      name: "Declarative agent",
      def: "An agent described in a configuration file (role, instructions, model, tools, rights) instead of being coded. It can be reviewed, approved and versioned.",
      match: ["declarative agents", "declarative agent"],
    },
  },
  {
    id: "front-end",
    fr: {
      name: "Front",
      def: "L’interface dans laquelle les collaborateurs utilisent l’IA : fenêtre de conversation, liste d’assistants, documents à joindre.",
      match: ["front"],
    },
    en: {
      name: "Front end",
      def: "The interface where employees use AI: chat window, list of assistants, documents to attach.",
      match: ["front end", "front-end"],
    },
  },
  {
    id: "saas",
    fr: {
      name: "SaaS",
      def: "Software as a Service : un logiciel utilisé en ligne, hébergé et maintenu par l’éditeur, payé par abonnement.",
      match: ["SaaS"],
    },
    en: {
      name: "SaaS",
      def: "Software as a Service: software used online, hosted and maintained by the vendor, paid by subscription.",
      match: ["SaaS"],
    },
  },
  {
    id: "open-source",
    fr: {
      name: "Open source",
      def: "Un logiciel dont le code est public et réutilisable selon une licence. On peut l’auditer, l’héberger soi-même et le modifier.",
      match: ["open source"],
    },
    en: {
      name: "Open source",
      def: "Software whose code is public and reusable under a licence. It can be audited, self-hosted and modified.",
      match: ["open source", "open-source"],
    },
  },
  {
    id: "self-hosted",
    fr: {
      name: "Auto-hébergé",
      def: "Le logiciel tourne sur l’infrastructure de l’entreprise (ses serveurs ou son cloud) et non chez l’éditeur. Les données restent chez vous.",
      match: ["auto-hébergée", "auto-hébergé", "auto-hébergés"],
    },
    en: {
      name: "Self-hosted",
      def: "The software runs on the company’s own infrastructure (its servers or cloud), not at the vendor’s. Data stays with you.",
      match: ["self-hosted"],
    },
  },
  {
    id: "sovereignty",
    fr: {
      name: "Souveraineté",
      def: "La capacité à garder la maîtrise de ses données et de ses outils : hébergement en Europe, droit applicable, absence de dépendance à un fournisseur étranger.",
      match: ["souveraineté", "souveraines", "souverains", "souveraine", "souverain"],
    },
    en: {
      name: "Sovereignty",
      def: "Keeping control of your data and tools: hosting in Europe, applicable law, no dependency on a foreign provider.",
      match: ["sovereignty", "sovereign"],
    },
  },
  {
    id: "no-code",
    fr: {
      name: "Sans code (no-code)",
      def: "Créer un outil avec une interface graphique, sans écrire de programme.",
      match: ["sans code", "no-code", "sans développement"],
    },
    en: {
      name: "No-code",
      def: "Building a tool through a graphical interface, without writing a program.",
      match: ["no-code", "without development"],
    },
  },
  {
    id: "sso",
    fr: {
      name: "SSO",
      def: "Single Sign-On : une seule connexion, avec le compte de l’entreprise, pour accéder à tous les outils.",
      match: ["SSO"],
    },
    en: {
      name: "SSO",
      def: "Single Sign-On: one login, with the company account, to access every tool.",
      match: ["SSO"],
    },
  },
  {
    id: "mcp",
    fr: {
      name: "MCP (Model Context Protocol)",
      def: "Le standard ouvert qui permet à un agent d’utiliser des outils et des données : lire des tickets, chercher dans des documents, consulter un CRM.",
      match: ["Model Context Protocol", "MCP"],
    },
    en: {
      name: "MCP (Model Context Protocol)",
      def: "The open standard that lets an agent use tools and data: read tickets, search documents, query a CRM.",
      match: ["Model Context Protocol", "MCP"],
    },
  },
  {
    id: "mcp-server",
    fr: {
      name: "Serveur MCP",
      def: "Le petit service qui expose un outil (une application, une base documentaire) aux agents via le protocole MCP.",
      match: ["serveurs MCP", "serveur MCP"],
    },
    en: {
      name: "MCP server",
      def: "The small service that exposes a tool (an application, a document base) to agents through the MCP protocol.",
      match: ["MCP servers", "MCP server"],
    },
  },
  {
    id: "connector",
    fr: {
      name: "Connecteur",
      def: "Le lien entre un agent et une application de l’entreprise (messagerie, tickets, CRM, ERP), qui lui permet d’y lire ou d’y écrire.",
      match: ["connecteurs", "connecteur"],
    },
    en: {
      name: "Connector",
      def: "The link between an agent and a company application (email, tickets, CRM, ERP) that lets it read or write there.",
      match: ["connectors", "connector"],
    },
  },
  {
    id: "yaml",
    fr: {
      name: "YAML",
      def: "Un format de fichier texte lisible par un humain, très utilisé pour écrire des configurations.",
      match: ["YAML"],
    },
    en: {
      name: "YAML",
      def: "A human-readable text file format, widely used to write configuration.",
      match: ["YAML"],
    },
  },
  {
    id: "manifest",
    fr: {
      name: "Manifeste",
      def: "Le fichier qui décrit une application ou un agent : son nom, ses capacités, ses permissions.",
      match: ["manifeste"],
    },
    en: {
      name: "Manifest",
      def: "The file describing an application or an agent: its name, capabilities and permissions.",
      match: ["manifest"],
    },
  },
  {
    id: "versioning",
    fr: {
      name: "Versionner",
      def: "Conserver chaque modification d’un fichier avec son auteur et sa date, pour pouvoir comparer, relire et revenir en arrière.",
      match: ["versionner", "versionnées", "versionnés", "versionnée", "versionné"],
    },
    en: {
      name: "Versioning",
      def: "Keeping every change to a file with its author and date, so you can compare, review and roll back.",
      match: ["versioned", "versioning", "version-controlled"],
    },
  },
  {
    id: "identity-propagation",
    fr: {
      name: "Propagation d’identité",
      def: "L’agent agit au nom de la personne qui l’utilise, avec ses droits : il ne voit que ce qu’elle a le droit de voir.",
      match: ["propagation d’identité", "propagation d'identité"],
    },
    en: {
      name: "Identity propagation",
      def: "The agent acts on behalf of the person using it, with their rights: it only sees what they are allowed to see.",
      match: ["identity propagation"],
    },
  },
  {
    id: "machine-to-machine",
    fr: {
      name: "Machine à machine",
      def: "Deux applications échangent directement, sans utilisateur, avec un compte technique. Réservé aux données que tout le monde peut voir.",
      match: ["machine à machine"],
    },
    en: {
      name: "Machine to machine",
      def: "Two applications talk directly, with no user involved, using a technical account. Reserved for data everyone may see.",
      match: ["machine to machine", "machine-to-machine"],
    },
  },
  {
    id: "service-account",
    fr: {
      name: "Compte de service",
      def: "Un compte technique, qui n’appartient à aucune personne, utilisé par une application pour se connecter à une autre.",
      match: ["comptes de service", "compte de service"],
    },
    en: {
      name: "Service account",
      def: "A technical account, owned by no person, used by one application to connect to another.",
      match: ["service accounts", "service account"],
    },
  },
  {
    id: "oauth",
    fr: {
      name: "OAuth 2.1",
      def: "Le standard qui permet de donner à une application un accès limité à un service, sans lui confier son mot de passe.",
      match: ["OAuth 2.1", "OAuth"],
    },
    en: {
      name: "OAuth 2.1",
      def: "The standard for giving an application limited access to a service without handing over your password.",
      match: ["OAuth 2.1", "OAuth"],
    },
  },
  {
    id: "enterprise-managed-authorization",
    fr: {
      name: "Enterprise-Managed Authorization",
      def: "Extension de MCP où c’est l’annuaire de l’entreprise qui autorise l’agent à agir au nom de l’utilisateur : c’est la propagation d’identité.",
      match: ["Enterprise-Managed Authorization"],
    },
    en: {
      name: "Enterprise-Managed Authorization",
      def: "MCP extension where the company directory authorises the agent to act on the user’s behalf: this is identity propagation.",
      match: ["Enterprise-Managed Authorization"],
    },
  },
  {
    id: "client-credentials",
    fr: {
      name: "Client Credentials",
      def: "Extension de MCP où l’agent se connecte avec ses propres identifiants techniques : c’est le mode machine à machine.",
      match: ["Client Credentials"],
    },
    en: {
      name: "Client Credentials",
      def: "MCP extension where the agent connects with its own technical credentials: this is the machine-to-machine mode.",
      match: ["Client Credentials"],
    },
  },
  {
    id: "delegated-rights",
    fr: {
      name: "Délégation de droits",
      def: "L’utilisateur confie à l’agent une partie seulement de ses droits : un périmètre précis, une durée limitée, révocable à tout moment.",
      match: ["délégation de droits", "droits délégués"],
    },
    en: {
      name: "Delegated rights",
      def: "The user hands the agent only part of their rights: a precise scope, a limited time, revocable at any moment.",
      match: ["delegated rights", "rights delegation"],
    },
  },
  {
    id: "skill",
    fr: {
      name: "Skill",
      def: "Un savoir-faire réutilisable pour un agent : un dossier d’instructions, de modèles et parfois de scripts, chargé seulement quand il en a besoin.",
      match: ["skills", "skill"],
    },
    en: {
      name: "Skill",
      def: "A reusable know-how for an agent: a folder of instructions, templates and sometimes scripts, loaded only when needed.",
      match: ["skills", "skill"],
    },
  },
  {
    id: "prompt",
    fr: {
      name: "Prompt",
      def: "Les instructions écrites données au modèle d’IA pour orienter sa réponse.",
      match: ["prompts", "prompt"],
    },
    en: {
      name: "Prompt",
      def: "The written instructions given to the AI model to steer its answer.",
      match: ["prompts", "prompt"],
    },
  },
  {
    id: "llm",
    fr: {
      name: "LLM",
      def: "Large Language Model : un grand modèle de langage, comme ceux de Mistral, OpenAI ou Anthropic, capable de comprendre et de produire du texte.",
      match: ["LLM"],
    },
    en: {
      name: "LLM",
      def: "Large Language Model: a model such as those from Mistral, OpenAI or Anthropic, able to understand and produce text.",
      match: ["LLM"],
    },
  },
  {
    id: "llm-gateway",
    fr: {
      name: "Gateway LLM",
      def: "Le point de passage unique de tous les appels aux modèles : choix du modèle, quotas, coûts, filtrage et journalisation.",
      match: ["gateways LLM", "gateway LLM"],
    },
    en: {
      name: "LLM gateway",
      def: "The single checkpoint for every call to a model: model choice, quotas, cost, filtering and logging.",
      match: ["LLM gateways", "LLM gateway"],
    },
  },
  {
    id: "gateway",
    fr: {
      name: "Gateway",
      def: "Un point de passage unique, placé devant des services, qui contrôle tout ce qui entre et sort : identité, droits, quotas, journalisation.",
      match: ["gateways", "gateway"],
    },
    en: {
      name: "Gateway",
      def: "A single checkpoint placed in front of services, controlling everything that goes in and out: identity, rights, quotas, logging.",
      match: ["gateways", "gateway"],
    },
  },
  {
    id: "mcp-gateway",
    fr: {
      name: "Gateway MCP",
      def: "Le passage obligé entre les agents et les serveurs MCP : authentification, droits par outil, limites d’appels, filtrage et journalisation.",
      match: ["gateway MCP"],
    },
    en: {
      name: "MCP gateway",
      def: "The mandatory path between agents and MCP servers: authentication, per-tool rights, rate limits, filtering and logging.",
      match: ["MCP gateway"],
    },
  },
  {
    id: "registry",
    fr: {
      name: "Registry",
      def: "Le catalogue central et versionné de tout ce que les agents utilisent : agents, skills, prompts, outils et serveurs MCP.",
      match: ["registry"],
    },
    en: {
      name: "Registry",
      def: "The central, versioned catalogue of everything agents use: agents, skills, prompts, tools and MCP servers.",
      match: ["registry"],
    },
  },
  {
    id: "api",
    fr: {
      name: "API",
      def: "L’interface qui permet à deux logiciels d’échanger des données de façon automatique.",
      match: ["API"],
    },
    en: {
      name: "API",
      def: "The interface that lets two pieces of software exchange data automatically.",
      match: ["API"],
    },
  },
  {
    id: "crm",
    fr: {
      name: "CRM",
      def: "Le logiciel de gestion de la relation client : contacts, opportunités, historique des échanges (Salesforce, par exemple).",
      match: ["CRM"],
    },
    en: {
      name: "CRM",
      def: "Customer relationship management software: contacts, opportunities, interaction history (Salesforce, for example).",
      match: ["CRM"],
    },
  },
  {
    id: "erp",
    fr: {
      name: "ERP",
      def: "Le progiciel de gestion de l’entreprise : finance, achats, stocks, production.",
      match: ["ERP"],
    },
    en: {
      name: "ERP",
      def: "Enterprise resource planning software: finance, purchasing, inventory, production.",
      match: ["ERP"],
    },
  },
  {
    id: "itsm",
    fr: {
      name: "ITSM",
      def: "La gestion des services informatiques : tickets, incidents, demandes et changements (ServiceNow, par exemple).",
      match: ["ITSM"],
    },
    en: {
      name: "ITSM",
      def: "IT service management: tickets, incidents, requests and changes (ServiceNow, for example).",
      match: ["ITSM"],
    },
  },
  {
    id: "directory",
    fr: {
      name: "Annuaire d’entreprise",
      def: "La base qui recense les collaborateurs, leurs groupes et leurs droits (Microsoft Entra ID, Okta…).",
      match: ["annuaire d’entreprise", "annuaire d'entreprise", "annuaire"],
    },
    en: {
      name: "Corporate directory",
      def: "The system listing employees, their groups and their rights (Microsoft Entra ID, Okta…).",
      match: ["corporate directory", "company directory", "directory"],
    },
  },
  {
    id: "conditional-access",
    fr: {
      name: "Accès conditionnel",
      def: "Des règles qui autorisent ou bloquent un accès selon le contexte : appareil, lieu, niveau de risque.",
      match: ["accès conditionnel"],
    },
    en: {
      name: "Conditional access",
      def: "Rules that allow or block access depending on context: device, location, risk level.",
      match: ["conditional access"],
    },
  },
  {
    id: "audit-log",
    fr: {
      name: "Journal d’audit",
      def: "L’historique de qui a fait quoi, quand et avec quelles données. Il permet de contrôler et d’expliquer chaque action.",
      match: ["journal d’audit", "journal d'audit", "traçabilité"],
    },
    en: {
      name: "Audit log",
      def: "The record of who did what, when and with which data. It lets you check and explain every action.",
      match: ["audit log", "audit trail", "traceability"],
    },
  },
  {
    id: "human-approval",
    fr: {
      name: "Validation humaine",
      def: "Une personne relit et approuve avant que l’action de l’agent ne soit exécutée (en anglais : human in the loop).",
      match: ["validation humaine", "validé par un humain", "validée par un humain"],
    },
    en: {
      name: "Human approval",
      def: "A person reviews and approves before the agent’s action is carried out (also called human in the loop).",
      match: ["human approval", "human validation", "human-approved", "human in the loop"],
    },
  },
  {
    id: "knowledge-base",
    fr: {
      name: "Base de connaissance",
      def: "L’ensemble des documents de référence que l’agent peut consulter pour répondre : procédures, documentation, historiques.",
      match: ["bases de connaissance", "base de connaissance", "base documentaire"],
    },
    en: {
      name: "Knowledge base",
      def: "The reference documents an agent can look up to answer: procedures, documentation, history.",
      match: ["knowledge bases", "knowledge base", "document base"],
    },
  },
  {
    id: "rag",
    fr: {
      name: "RAG",
      def: "Retrieval-Augmented Generation : le modèle va d’abord chercher les bons passages dans vos documents, puis rédige sa réponse à partir d’eux, en citant ses sources.",
      match: ["RAG"],
    },
    en: {
      name: "RAG",
      def: "Retrieval-Augmented Generation: the model first retrieves the right passages from your documents, then writes its answer from them, citing sources.",
      match: ["RAG"],
    },
  },
  {
    id: "chargeback",
    fr: {
      name: "Refacturation",
      def: "Attribuer à chaque équipe le coût réel de son usage de l’IA, pour piloter le budget.",
      match: ["refacturation"],
    },
    en: {
      name: "Rebilling",
      def: "Charging each team the real cost of its AI usage, to manage the budget.",
      match: ["rebilling", "chargeback"],
    },
  },
  {
    id: "guardrails",
    fr: {
      name: "Garde-fous",
      def: "Des contrôles automatiques qui bloquent les usages risqués : fuite de données sensibles, contenus interdits, actions hors périmètre.",
      match: ["garde-fous"],
    },
    en: {
      name: "Guardrails",
      def: "Automatic checks that block risky use: sensitive data leaks, forbidden content, out-of-scope actions.",
      match: ["guardrails"],
    },
  },
  {
    id: "evaluation",
    fr: {
      name: "Évaluation",
      def: "Tester un agent sur une série de cas connus pour mesurer la qualité de ses réponses avant de le mettre à jour.",
      match: ["évaluation"],
    },
    en: {
      name: "Evaluation",
      def: "Testing an agent on a set of known cases to measure the quality of its answers before updating it.",
      match: ["evaluation", "evals"],
    },
  },
  {
    id: "observability",
    fr: {
      name: "Observabilité",
      def: "Voir ce qui se passe à l’intérieur des agents : chaque exécution, ses sources, ses appels d’outils, ses erreurs et ses coûts.",
      match: ["observabilité"],
    },
    en: {
      name: "Observability",
      def: "Seeing what happens inside agents: every run, its sources, tool calls, errors and costs.",
      match: ["observability"],
    },
  },
  {
    id: "runtime",
    fr: {
      name: "Runtime isolé",
      def: "L’environnement dans lequel un agent s’exécute, séparé des autres et limité à son périmètre, pour contenir les erreurs et les abus.",
      match: ["isolation des runtimes", "runtimes isolés", "runtimes", "runtime"],
    },
    en: {
      name: "Isolated runtime",
      def: "The environment an agent runs in, separated from others and limited to its scope, to contain errors and misuse.",
      match: ["runtime isolation", "isolated runtimes", "runtimes", "runtime"],
    },
  },
  {
    id: "talk-to-my-data",
    fr: {
      name: "Talk to my data",
      def: "Poser des questions en langage courant sur ses données (ventes, coûts, stocks) et obtenir des réponses chiffrées et sourcées.",
      match: ["Talk to my data"],
    },
    en: {
      name: "Talk to my data",
      def: "Asking questions in everyday language about your data (sales, costs, stock) and getting sourced, quantified answers.",
      match: ["Talk to my data"],
    },
  },
  {
    id: "finops",
    fr: {
      name: "FinOps",
      def: "La discipline qui pilote et optimise les dépenses cloud, en associant finance, achats et équipes techniques.",
      match: ["FinOps"],
    },
    en: {
      name: "FinOps",
      def: "The practice of managing and optimising cloud spending, bringing finance, procurement and engineering together.",
      match: ["FinOps"],
    },
  },
  {
    id: "ci-cd",
    fr: {
      name: "CI/CD",
      def: "Intégration et déploiement continus : la chaîne automatique qui teste, valide et met en production le code.",
      match: ["CI/CD"],
    },
    en: {
      name: "CI/CD",
      def: "Continuous integration and delivery: the automated chain that tests, approves and ships code.",
      match: ["CI/CD"],
    },
  },
  {
    id: "a2a",
    fr: {
      name: "A2A (Agent2Agent)",
      def: "Le protocole ouvert qui permet à des agents de communiquer entre eux et de se répartir le travail. MCP relie un agent à un outil ; A2A relie deux agents.",
      match: ["A2A"],
    },
    en: {
      name: "A2A (Agent2Agent)",
      def: "The open protocol that lets agents talk to each other and share work. MCP links an agent to a tool; A2A links two agents.",
      match: ["A2A"],
    },
  },
  {
    id: "prompt-injection",
    fr: {
      name: "Injection de prompt",
      def: "Des instructions cachées dans un contenu (document, e-mail, ticket) que l’agent lit et risque de suivre comme si elles venaient de l’utilisateur.",
      match: ["injection de prompt"],
    },
    en: {
      name: "Prompt injection",
      def: "Instructions hidden in content (a document, email, ticket) that the agent reads and may follow as if they came from the user.",
      match: ["prompt injection"],
    },
  },
  {
    id: "token",
    fr: {
      name: "Token (jeton)",
      def: "Deux sens. Pour un modèle : un morceau de mot, l’unité qui mesure le texte traité et donc le coût. En sécurité : une clé temporaire qui prouve un droit d’accès.",
      match: ["tokens", "token", "jetons", "jeton"],
    },
    en: {
      name: "Token",
      def: "Two meanings. For a model: a piece of a word, the unit that measures processed text and therefore cost. In security: a temporary key proving an access right.",
      match: ["tokens", "token"],
    },
  },
  {
    id: "stateless",
    fr: {
      name: "Sans état (stateless)",
      def: "Un service qui ne garde pas de mémoire entre deux requêtes : chaque appel se suffit à lui-même, ce qui permet de le répartir facilement sur plusieurs serveurs.",
      match: ["sans état", "stateless"],
    },
    en: {
      name: "Stateless",
      def: "A service that keeps no memory between requests: each call stands alone, so it can easily be spread across several servers.",
      match: ["stateless"],
    },
  },
  {
    id: "load-balancer",
    fr: {
      name: "Répartiteur de charge",
      def: "Le composant qui distribue les requêtes entre plusieurs serveurs pour tenir la charge et éviter les pannes.",
      match: ["répartiteurs de charge", "répartiteur de charge"],
    },
    en: {
      name: "Load balancer",
      def: "The component that spreads requests across several servers to handle load and avoid outages.",
      match: ["load balancers", "load balancer"],
    },
  },
  {
    id: "api-management",
    fr: {
      name: "Gestion d’API",
      def: "La plateforme qui publie, sécurise, documente et surveille les API d’une entreprise (MuleSoft, Kong, Azure API Management…).",
      match: ["plateforme de gestion d’API", "gestion d’API", "gestion d'API"],
    },
    en: {
      name: "API management",
      def: "The platform that publishes, secures, documents and monitors a company’s APIs (MuleSoft, Kong, Azure API Management…).",
      match: ["API management platform", "API management"],
    },
  },
  {
    id: "rest",
    fr: {
      name: "REST",
      def: "Le style d’API le plus répandu sur le web : on échange des données via des adresses et des verbes simples (lire, créer, modifier, supprimer).",
      match: ["REST"],
    },
    en: {
      name: "REST",
      def: "The most common style of web API: data is exchanged through addresses and simple verbs (read, create, update, delete).",
      match: ["REST"],
    },
  },
  {
    id: "orchestration",
    fr: {
      name: "Orchestration",
      def: "Coordonner plusieurs agents et outils pour mener un processus de bout en bout : qui fait quoi, dans quel ordre, avec quels contrôles.",
      match: ["orchestration", "orchestrateur", "orchestrer"],
    },
    en: {
      name: "Orchestration",
      def: "Coordinating several agents and tools to run an end-to-end process: who does what, in which order, with which checks.",
      match: ["orchestration", "orchestrator", "orchestrate"],
    },
  },
  {
    id: "deterministic",
    fr: {
      name: "Déterministe",
      def: "Qui produit toujours le même résultat pour la même entrée. Un flux classique est déterministe ; un agent qui décide seul ne l’est pas.",
      match: ["déterministe"],
    },
    en: {
      name: "Deterministic",
      def: "Always producing the same result for the same input. A classic flow is deterministic; an agent deciding on its own is not.",
      match: ["deterministic"],
    },
  },
  {
    id: "zero-trust",
    fr: {
      name: "Zero Trust",
      def: "Un modèle de sécurité où rien n’est considéré comme fiable par défaut : chaque accès est vérifié, même à l’intérieur du réseau.",
      match: ["Zero Trust"],
    },
    en: {
      name: "Zero Trust",
      def: "A security model where nothing is trusted by default: every access is checked, even inside the network.",
      match: ["Zero Trust"],
    },
  },
  {
    id: "container",
    fr: {
      name: "Conteneur",
      def: "Un paquet isolé qui contient une application et tout ce qu’il lui faut pour tourner, à l’identique sur n’importe quel serveur.",
      match: ["conteneurs", "conteneur"],
    },
    en: {
      name: "Container",
      def: "An isolated package holding an application and everything it needs to run, identically on any server.",
      match: ["containers", "container"],
    },
  },
  {
    id: "kubernetes",
    fr: {
      name: "Kubernetes",
      def: "La plateforme open source de référence pour faire tourner et gérer des conteneurs à grande échelle.",
      match: ["Kubernetes"],
    },
    en: {
      name: "Kubernetes",
      def: "The leading open-source platform for running and managing containers at scale.",
      match: ["Kubernetes"],
    },
  },
  {
    id: "reverse-proxy",
    fr: {
      name: "Reverse proxy",
      def: "Un serveur placé devant d’autres serveurs, qui reçoit toutes les requêtes et les redirige en appliquant des règles.",
      match: ["reverse proxy", "proxys", "proxy"],
    },
    en: {
      name: "Reverse proxy",
      def: "A server placed in front of others that receives every request and forwards it while applying rules.",
      match: ["reverse proxy", "proxies", "proxy"],
    },
  },
  {
    id: "ag-ui",
    fr: {
      name: "AG-UI",
      def: "Le protocole ouvert qui relie un agent à l’application que voit l’utilisateur : réponses en direct, actions visibles, demandes de validation.",
      match: ["AG-UI"],
    },
    en: {
      name: "AG-UI",
      def: "The open protocol connecting an agent to the application the user sees: live answers, visible actions, approval requests.",
      match: ["AG-UI"],
    },
  },
  {
    id: "agent-card",
    fr: {
      name: "Carte d’agent",
      def: "Un petit fichier publié par un agent A2A qui décrit ce qu’il sait faire, où le joindre et comment s’authentifier.",
      match: ["cartes d’agent", "carte d’agent", "carte d'agent"],
    },
    en: {
      name: "Agent card",
      def: "A small file published by an A2A agent describing what it can do, where to reach it and how to authenticate.",
      match: ["agent cards", "agent card"],
    },
  },
  {
    id: "workflow",
    fr: {
      name: "Workflow",
      def: "Un enchaînement d’étapes défini à l’avance. Certaines étapes peuvent être confiées à un modèle d’IA, mais l’ordre reste fixé.",
      match: ["workflows", "workflow"],
    },
    en: {
      name: "Workflow",
      def: "A sequence of steps defined in advance. Some steps can be handed to an AI model, but the order stays fixed.",
      match: ["workflows", "workflow"],
    },
  },
  {
    id: "framework",
    fr: {
      name: "Framework",
      def: "Une boîte à outils de développement qui fournit la structure d’une application ; pour les agents : LangGraph, Strands, CrewAI…",
      match: ["frameworks", "framework"],
    },
    en: {
      name: "Framework",
      def: "A development toolkit that provides an application’s structure; for agents: LangGraph, Strands, CrewAI…",
      match: ["frameworks", "framework"],
    },
  },
  {
    id: "purchase-order",
    fr: {
      name: "Bon de commande",
      def: "Le document qui formalise un achat auprès d’un fournisseur : articles, quantités, prix. La facture doit lui correspondre.",
      match: ["bons de commande", "bon de commande"],
    },
    en: {
      name: "Purchase order",
      def: "The document formalising a purchase from a supplier: items, quantities, prices. The invoice must match it.",
      match: ["purchase orders", "purchase order"],
    },
  },
  {
    id: "accounts-payable",
    fr: {
      name: "Comptabilité fournisseurs",
      def: "Le service qui reçoit, contrôle et paie les factures des fournisseurs.",
      match: ["comptabilité fournisseurs"],
    },
    en: {
      name: "Accounts payable",
      def: "The function that receives, checks and pays supplier invoices.",
      match: ["accounts payable"],
    },
  },
  {
    id: "middleware",
    fr: {
      name: "Middleware",
      def: "Un composant qui s’intercale dans la boucle d’un agent (avant ou après le modèle, autour d’un outil) pour ajouter un contrôle sans modifier l’agent lui-même.",
      match: ["middlewares", "middleware"],
    },
    en: {
      name: "Middleware",
      def: "A component that slots into an agent’s loop (before or after the model, around a tool) to add a control without changing the agent itself.",
      match: ["middleware"],
    },
  },
  {
    id: "hook",
    fr: {
      name: "Hook",
      def: "Un point d’accroche où l’on peut exécuter son propre code à un moment précis : avant un appel d’outil, après une réponse, à l’arrêt d’un agent.",
      match: ["hooks", "hook"],
    },
    en: {
      name: "Hook",
      def: "A point where you can run your own code at a precise moment: before a tool call, after an answer, when an agent stops.",
      match: ["hooks", "hook"],
    },
  },
  {
    id: "deep-agent",
    fr: {
      name: "Deep Agents",
      def: "Une bibliothèque open source de LangChain : un agent principal qui planifie, prend des notes dans un système de fichiers et délègue à des sous-agents.",
      match: ["Deep Agents"],
    },
    en: {
      name: "Deep Agents",
      def: "An open-source LangChain library: a main agent that plans, takes notes in a file system and delegates to subagents.",
      match: ["Deep Agents"],
    },
  },
  {
    id: "subagent",
    fr: {
      name: "Sous-agent",
      def: "Un agent appelé par un agent principal pour une tâche précise, avec son propre contexte ; il rend un résultat, l’agent principal décide.",
      match: ["sous-agents", "sous-agent"],
    },
    en: {
      name: "Subagent",
      def: "An agent called by a main agent for a precise task, with its own context; it returns a result, the main agent decides.",
      match: ["subagents", "subagent"],
    },
  },
  {
    id: "system-prompt",
    fr: {
      name: "Prompt système",
      def: "Les instructions permanentes données à un agent : son rôle, ses règles, sa façon de travailler.",
      match: ["prompt système"],
    },
    en: {
      name: "System prompt",
      def: "The standing instructions given to an agent: its role, its rules, how it works.",
      match: ["system prompt"],
    },
  },
  {
    id: "llmops",
    fr: {
      name: "LLMOps",
      def: "Les pratiques et outils pour exploiter des modèles de langage en production : déploiement, versions, suivi de la qualité, des coûts et des incidents.",
      match: ["LLMOps"],
    },
    en: {
      name: "LLMOps",
      def: "The practices and tools for running language models in production: deployment, versions, quality, cost and incident tracking.",
      match: ["LLMOps"],
    },
  },
  {
    id: "coe",
    fr: {
      name: "Centre d’excellence",
      def: "Une petite équipe transverse qui définit les standards, valide les modèles, porte le cadre d’IA responsable et outille les autres équipes.",
      match: ["centre d’excellence", "centre d'excellence"],
    },
    en: {
      name: "Centre of excellence",
      def: "A small cross-functional team that sets standards, approves models, owns the responsible AI framework and equips other teams.",
      match: ["centre of excellence", "center of excellence"],
    },
  },
  {
    id: "federated-model",
    fr: {
      name: "Modèle fédéré",
      def: "Une organisation où les équipes métiers construisent leurs propres cas d’usage sur un socle commun opéré par une équipe plateforme.",
      match: ["modèle fédéré"],
    },
    en: {
      name: "Federated model",
      def: "An organisation where business teams build their own use cases on a shared foundation run by a platform team.",
      match: ["federated model"],
    },
  },
  {
    id: "token-exchange",
    fr: {
      name: "Échange de jeton",
      def: "La gateway échange le jeton de l’utilisateur contre un nouveau jeton, émis pour un service précis et avec des droits réduits (standard OAuth, RFC 8693, aussi appelé « on-behalf-of »).",
      match: ["échange de jeton"],
    },
    en: {
      name: "Token exchange",
      def: "The gateway swaps the user’s token for a new one, issued for a specific service with reduced rights (OAuth standard, RFC 8693, also called “on-behalf-of”).",
      match: ["token exchange"],
    },
  },
  {
    id: "idp",
    fr: {
      name: "Fournisseur d’identité",
      def: "Le service qui authentifie les utilisateurs et émet leurs jetons d’accès (Microsoft Entra ID, Okta, Keycloak…).",
      match: ["fournisseurs d’identité", "fournisseur d’identité", "fournisseur d'identité"],
    },
    en: {
      name: "Identity provider",
      def: "The service that authenticates users and issues their access tokens (Microsoft Entra ID, Okta, Keycloak…).",
      match: ["identity providers", "identity provider"],
    },
  },
  {
    id: "embeddings",
    fr: {
      name: "Embeddings",
      def: "Une représentation d’un texte ou d’une image sous forme de nombres, qui permet de retrouver des contenus proches par le sens.",
      match: ["embeddings"],
    },
    en: {
      name: "Embeddings",
      def: "A numeric representation of text or images that lets you find content close in meaning.",
      match: ["embeddings"],
    },
  },
  {
    id: "interface-contract",
    fr: {
      name: "Contrat d’interface",
      def: "L’engagement stable entre la plateforme et les applications : ce qui est offert, comment l’appeler, avec quelles garanties, sans exposer l’organisation interne.",
      match: ["contrat d’interface", "contrat d'interface"],
    },
    en: {
      name: "Interface contract",
      def: "The stable commitment between the platform and applications: what is offered, how to call it, with which guarantees, without exposing internals.",
      match: ["interface contract"],
    },
  },
  {
    id: "data-center",
    fr: {
      name: "Data center",
      def: "Un bâtiment qui héberge des serveurs, du stockage et du réseau, alimenté en électricité et refroidi en continu, jour et nuit.",
      match: ["data centers", "data center"],
    },
    en: {
      name: "Data center",
      def: "A building that hosts servers, storage and networking, powered and cooled continuously, day and night.",
      match: ["data centers", "data center"],
    },
  },
  {
    id: "megawatt",
    fr: {
      name: "Mégawatt (MW)",
      def: "Une unité de puissance : ce qu’il faut fournir à chaque instant. 1 MW = 1 000 kW. À ne pas confondre avec le mégawattheure, qui mesure une quantité d’énergie consommée dans le temps.",
      match: ["mégawatts", "mégawatt"],
    },
    en: {
      name: "Megawatt (MW)",
      def: "A unit of power: what must be supplied at every instant. 1 MW = 1,000 kW. Not to be confused with the megawatt-hour, which measures an amount of energy used over time.",
      match: ["megawatts", "megawatt"],
    },
  },
  {
    id: "watt-hour",
    fr: {
      name: "Wattheure (Wh, kWh, TWh)",
      def: "Une unité d’énergie : une puissance maintenue pendant une durée. 1 kWh = 1 000 W pendant une heure ; 1 TWh = un milliard de kWh.",
      match: ["kilowattheures", "kilowattheure", "wattheures", "wattheure"],
    },
    en: {
      name: "Watt-hour (Wh, kWh, TWh)",
      def: "A unit of energy: a power sustained over time. 1 kWh = 1,000 W for one hour; 1 TWh = a billion kWh.",
      match: ["kilowatt-hours", "kilowatt-hour", "watt-hours", "watt-hour"],
    },
  },
  {
    id: "pue",
    fr: {
      name: "PUE",
      def: "Power Usage Effectiveness : l’énergie totale d’un data center divisée par celle qui arrive aux serveurs. 1,0 serait parfait ; 1,5 veut dire 50 % d’énergie en plus pour le refroidissement et les pertes.",
      match: ["PUE"],
    },
    en: {
      name: "PUE",
      def: "Power Usage Effectiveness: a data center’s total energy divided by the energy reaching the servers. 1.0 would be perfect; 1.5 means 50% extra energy for cooling and losses.",
      match: ["PUE"],
    },
  },
  {
    id: "wue",
    fr: {
      name: "WUE",
      def: "Water Usage Effectiveness : les litres d’eau consommés par kilowattheure informatique.",
      match: ["WUE"],
    },
    en: {
      name: "WUE",
      def: "Water Usage Effectiveness: litres of water consumed per IT kilowatt-hour.",
      match: ["WUE"],
    },
  },
  {
    id: "rack",
    fr: {
      name: "Rack",
      def: "L’armoire normalisée qui accueille les serveurs : 60 cm de large, environ deux mètres de haut. Sa puissance se mesure en kilowatts.",
      match: ["racks", "rack"],
    },
    en: {
      name: "Rack",
      def: "The standard cabinet that holds servers: 60 cm wide, about two metres tall. Its power is measured in kilowatts.",
      match: ["racks", "rack"],
    },
  },
  {
    id: "gpu",
    fr: {
      name: "GPU",
      def: "Processeur graphique : la puce de calcul massivement parallèle utilisée pour entraîner et faire tourner les modèles d’IA. C’est elle qui consomme et chauffe le plus.",
      match: ["GPU"],
    },
    en: {
      name: "GPU",
      def: "Graphics processing unit: the massively parallel chip used to train and run AI models. It is what draws and heats the most.",
      match: ["GPUs", "GPU"],
    },
  },
  {
    id: "free-cooling",
    fr: {
      name: "Free cooling",
      def: "Refroidir un data center avec l’air extérieur plutôt qu’avec une machine frigorifique. Possible seulement quand il fait assez frais et sec.",
      match: ["free cooling"],
    },
    en: {
      name: "Free cooling",
      def: "Cooling a data center with outside air rather than a refrigeration machine. Only possible when it is cool and dry enough.",
      match: ["free cooling", "free-cooling"],
    },
  },
  {
    id: "liquid-cooling",
    fr: {
      name: "Refroidissement liquide",
      def: "Évacuer la chaleur des puces avec un liquide plutôt qu’avec de l’air : plaques froides sur les puces (direct-to-chip) ou serveurs plongés dans un fluide (immersion).",
      match: ["refroidissement liquide", "direct-to-chip"],
    },
    en: {
      name: "Liquid cooling",
      def: "Removing chip heat with a liquid rather than air: cold plates on the chips (direct-to-chip) or servers immersed in a fluid (immersion).",
      match: ["liquid cooling", "liquid-cooling", "direct-to-chip"],
    },
  },
  {
    id: "dry-cooler",
    fr: {
      name: "Aérorefroidisseur (dry cooler)",
      def: "Un échangeur qui refroidit un liquide avec l’air extérieur, sans évaporer d’eau. Il consomme un peu plus d’électricité qu’une tour évaporative.",
      match: ["aérorefroidisseurs", "aérorefroidisseur", "dry cooler"],
    },
    en: {
      name: "Dry cooler",
      def: "A heat exchanger that cools a liquid with outside air, without evaporating water. It uses a bit more electricity than an evaporative tower.",
      match: ["dry coolers", "dry cooler"],
    },
  },
  {
    id: "cdu",
    fr: {
      name: "CDU",
      def: "Coolant Distribution Unit : l’unité qui sépare et échange la chaleur entre la boucle de liquide des puces et la boucle d’eau du bâtiment.",
      match: ["CDU"],
    },
    en: {
      name: "CDU",
      def: "Coolant Distribution Unit: the unit that separates and exchanges heat between the chips’ liquid loop and the building’s water loop.",
      match: ["CDU"],
    },
  },
  {
    id: "generator",
    fr: {
      name: "Groupe électrogène",
      def: "Un moteur, souvent diesel, qui produit de l’électricité de secours en cas de coupure du réseau. Sa puissance thermique dépasse sa puissance électrique.",
      match: ["groupes électrogènes", "groupe électrogène"],
    },
    en: {
      name: "Backup generator",
      def: "An engine, often diesel, that produces emergency electricity when the grid fails. Its thermal power exceeds its electrical output.",
      match: ["backup generators", "backup generator", "generators"],
    },
  },
  {
    id: "waste-heat",
    fr: {
      name: "Chaleur fatale",
      def: "La chaleur produite par une activité et rejetée sans être utilisée. Celle des data centers peut chauffer des logements.",
      match: ["chaleur fatale"],
    },
    en: {
      name: "Waste heat",
      def: "Heat produced by an activity and released without being used. Data-center heat can warm homes.",
      match: ["waste heat"],
    },
  },
  {
    id: "hyperscale",
    fr: {
      name: "Hyperscale",
      def: "Les très grands data centers des géants du cloud (AWS, Microsoft, Google, Meta), qui se comptent en dizaines ou centaines de mégawatts.",
      match: ["hyperscale"],
    },
    en: {
      name: "Hyperscale",
      def: "The very large data centers of cloud giants (AWS, Microsoft, Google, Meta), sized in tens or hundreds of megawatts.",
      match: ["hyperscale"],
    },
  },
  {
    id: "queue",
    fr: {
      name: "File d’attente de raccordement",
      def: "La liste des projets (centrales, stockage, gros consommateurs) qui attendent d’être raccordés au réseau de transport d’électricité.",
      match: ["file d’attente"],
    },
    en: {
      name: "Interconnection queue",
      def: "The list of projects (power plants, storage, large consumers) waiting to be connected to the transmission grid.",
      match: ["queue"],
    },
  },
  {
    id: "behind-the-meter",
    fr: {
      name: "Derrière le compteur",
      def: "Une production d’électricité installée sur le site du consommateur, hors réseau public : turbines, moteurs, piles à combustible.",
      match: ["derrière le compteur"],
    },
    en: {
      name: "Behind the meter",
      def: "Electricity generation installed on the consumer’s own site, off the public grid: turbines, engines, fuel cells.",
      match: ["behind-the-meter", "behind the meter"],
    },
  },
  {
    id: "combined-cycle",
    fr: {
      name: "Cycle combiné",
      def: "Une centrale à gaz qui récupère la chaleur de ses turbines pour produire davantage d’électricité. C’est la technologie gaz la plus efficace.",
      match: ["cycle combiné"],
    },
    en: {
      name: "Combined cycle",
      def: "A gas plant that recovers heat from its turbines to produce more electricity. It is the most efficient gas technology.",
      match: ["combined-cycle", "combined cycle"],
    },
  },
  {
    id: "pjm",
    fr: {
      name: "PJM",
      def: "Le plus grand gestionnaire de réseau et marché d’électricité des États-Unis (Virginie et douze autres États). Ses enchères de capacité paient la puissance disponible aux heures de pointe.",
      match: ["PJM"],
    },
    en: {
      name: "PJM",
      def: "The largest grid operator and electricity market in the United States (Virginia and twelve other states). Its capacity auctions pay for power available at peak times.",
      match: ["PJM"],
    },
  },
  {
    id: "jevons",
    fr: {
      name: "Paradoxe de Jevons",
      def: "Quand une ressource devient plus efficace à utiliser, on l’utilise davantage, et la consommation totale peut augmenter.",
      match: ["paradoxe de Jevons"],
    },
    en: {
      name: "Jevons paradox",
      def: "When a resource becomes more efficient to use, people use more of it, and total consumption can rise.",
      match: ["Jevons paradox"],
    },
  },
  {
    id: "impact-assessment",
    fr: {
      name: "Étude d’impact",
      def: "Le dossier qui évalue les effets d’un projet sur l’environnement (eau, air, bruit, biodiversité), obligatoire au-delà de certains seuils.",
      match: ["étude d’impact environnemental", "étude d’impact"],
    },
    en: {
      name: "Impact assessment",
      def: "The file that assesses a project’s effects on the environment (water, air, noise, biodiversity), mandatory above certain thresholds.",
      match: ["environmental impact assessment", "impact assessment"],
    },
  },
  {
    id: "refere",
    fr: {
      name: "Juge des référés",
      def: "Le juge qui statue en urgence, par exemple pour suspendre une décision en attendant le jugement sur le fond.",
      match: ["juge des référés"],
    },
    en: {
      name: "Urgent-procedure judge",
      def: "The judge who rules urgently, for example to suspend a decision pending a ruling on the merits.",
      match: ["urgent applications", "urgent-procedure judge"],
    },
  },
  {
    id: "icpe",
    fr: {
      name: "Installation classée",
      def: "Une installation industrielle qui présente des risques ou des nuisances et qui est soumise à une réglementation environnementale renforcée (ICPE en France).",
      match: ["installation classée"],
    },
    en: {
      name: "Classified installation",
      def: "An industrial facility that presents risks or nuisances and is subject to stricter environmental rules (ICPE in France).",
      match: ["classified installation"],
    },
  },
  {
    id: "dew-point",
    fr: {
      name: "Point de rosée",
      def: "La température à laquelle l’humidité de l’air se condense. Plus il est haut, plus l’air est humide et difficile à utiliser pour refroidir.",
      match: ["point de rosée"],
    },
    en: {
      name: "Dew point",
      def: "The temperature at which moisture in the air condenses. The higher it is, the more humid the air and the harder it is to use for cooling.",
      match: ["dew point"],
    },
  },
  {
    id: "heat-island",
    fr: {
      name: "Îlot de chaleur urbain",
      def: "Une zone bâtie plus chaude que la campagne alentour, parce que le béton et les activités humaines stockent et rejettent de la chaleur.",
      match: ["îlots de chaleur urbains", "îlot de chaleur urbain"],
    },
    en: {
      name: "Urban heat island",
      def: "A built-up area warmer than the surrounding countryside, because concrete and human activity store and release heat.",
      match: ["urban heat islands", "urban heat island"],
    },
  },
  {
    id: "preprint",
    fr: {
      name: "Preprint",
      def: "Un article scientifique publié avant d’avoir été relu par des pairs. Ses résultats sont à prendre avec prudence.",
      match: ["preprint"],
    },
    en: {
      name: "Preprint",
      def: "A scientific paper published before peer review. Its results should be read with caution.",
      match: ["preprint"],
    },
  },
  {
    id: "llms-txt",
    fr: {
      name: "llms.txt",
      def: "Un fichier placé à la racine d’un site, qui en donne la carte en une page pour les modèles de langage : ce qu’il contient et où le lire.",
      match: ["llms.txt"],
    },
    en: {
      name: "llms.txt",
      def: "A file at the root of a website that gives language models a one-page map of it: what it contains and where to read it.",
      match: ["llms.txt"],
    },
  },
  {
    id: "idempotency",
    fr: {
      name: "Clé d’idempotence",
      def: "Un identifiant joint à une requête d’écriture : si la même requête est envoyée deux fois, elle ne produit qu’un seul effet, sans doublon.",
      match: ["clé d’idempotence", "idempotente", "idempotentes"],
    },
    en: {
      name: "Idempotency key",
      def: "An identifier attached to a write request: if the same request is sent twice, it has a single effect, with no duplicate.",
      match: ["idempotency key", "idempotent"],
    },
  },
  {
    id: "microvm",
    fr: {
      name: "MicroVM",
      def: "Une machine virtuelle très légère, qui démarre en une fraction de seconde et isole un programme du reste du serveur (Firecracker, par exemple).",
      match: ["microVMs", "microVM"],
    },
    en: {
      name: "MicroVM",
      def: "A very lightweight virtual machine that starts in a fraction of a second and isolates a program from the rest of the server (Firecracker, for example).",
      match: ["microVMs", "microVM"],
    },
  },
  {
    id: "sandbox",
    fr: {
      name: "Sandbox",
      def: "Un environnement isolé où l’on exécute du code sans risque pour le reste du système : ce qui s’y passe ne peut pas en sortir.",
      match: ["sandbox"],
    },
    en: {
      name: "Sandbox",
      def: "An isolated environment where code runs without risk to the rest of the system: what happens inside cannot get out.",
      match: ["sandbox"],
    },
  },
  {
    id: "csrf",
    fr: {
      name: "CSRF",
      def: "Une attaque qui pousse un navigateur à envoyer une requête à l’insu de l’utilisateur. Un jeton CSRF dans chaque formulaire l’empêche.",
      match: ["CSRF"],
    },
    en: {
      name: "CSRF",
      def: "An attack that makes a browser send a request without the user knowing. A CSRF token in each form prevents it.",
      match: ["CSRF"],
    },
  },
  {
    id: "json",
    fr: {
      name: "JSON",
      def: "Un format de texte simple pour échanger des données structurées entre programmes.",
      match: ["JSON"],
    },
    en: {
      name: "JSON",
      def: "A simple text format for exchanging structured data between programs.",
      match: ["JSON"],
    },
  },
  {
    id: "markdown",
    fr: {
      name: "Markdown",
      def: "Un format de texte lisible tel quel, avec une syntaxe légère pour les titres, listes et liens. Idéal pour les humains comme pour les modèles.",
      match: ["Markdown"],
    },
    en: {
      name: "Markdown",
      def: "A text format readable as is, with a light syntax for headings, lists and links. Ideal for humans and models alike.",
      match: ["Markdown"],
    },
  },
  {
    id: "shell",
    fr: {
      name: "Shell",
      def: "L’interface en ligne de commande d’un système : on y tape des commandes pour lire des fichiers, lancer des programmes, etc.",
      match: ["shell"],
    },
    en: {
      name: "Shell",
      def: "A system’s command-line interface: you type commands to read files, run programs and so on.",
      match: ["shell"],
    },
  },
  {
    id: "veille",
    fr: {
      name: "Veille",
      def: "Le suivi régulier de l’actualité d’un marché pour repérer des projets, des concurrents ou des tendances.",
      match: ["veille"],
    },
    en: {
      name: "Market monitoring",
      def: "Regularly following the news of a market to spot projects, competitors or trends.",
      match: ["market monitoring"],
    },
  },
  {
    id: "scoring",
    fr: {
      name: "Scoring",
      def: "Attribuer une note à un élément selon des critères définis, pour le classer ou décider s’il mérite d’être traité.",
      match: ["scoring"],
    },
    en: {
      name: "Scoring",
      def: "Giving an item a score against defined criteria, to rank it or decide whether it deserves attention.",
      match: ["scoring"],
    },
  },
  {
    id: "false-positive",
    fr: {
      name: "Faux positif",
      def: "Un résultat signalé à tort comme pertinent : ici, un article remonté comme opportunité alors qu’il n’en est pas une.",
      match: ["faux positifs", "faux positif"],
    },
    en: {
      name: "False positive",
      def: "A result wrongly flagged as relevant: here, an article raised as an opportunity when it is not one.",
      match: ["false positives", "false positive"],
    },
  },
  {
    id: "dedup",
    fr: {
      name: "Déduplication",
      def: "Repérer et écarter les doublons, par exemple deux articles qui parlent du même projet.",
      match: ["déduplication", "dédupliquées"],
    },
    en: {
      name: "Deduplication",
      def: "Spotting and removing duplicates, for example two articles about the same project.",
      match: ["deduplication", "deduplicated"],
    },
  },
  {
    id: "semantic-similarity",
    fr: {
      name: "Similarité sémantique",
      def: "Une mesure de proximité de sens entre deux textes, même quand ils n’emploient pas les mêmes mots.",
      match: ["similarité sémantique"],
    },
    en: {
      name: "Semantic similarity",
      def: "A measure of how close two texts are in meaning, even when they use different words.",
      match: ["semantic similarity"],
    },
  },
  {
    id: "lakehouse",
    fr: {
      name: "Lakehouse",
      def: "Un espace de stockage qui garde les données brutes en grand volume tout en permettant de les interroger comme une base.",
      match: ["Lakehouse"],
    },
    en: {
      name: "Lakehouse",
      def: "A storage space that keeps large volumes of raw data while letting you query it like a database.",
      match: ["Lakehouse"],
    },
  },
  {
    id: "warehouse",
    fr: {
      name: "Entrepôt de données",
      def: "Une base organisée pour l’analyse : des données nettoyées, reliées et prêtes pour les tableaux de bord.",
      match: ["entrepôt de données", "Warehouse"],
    },
    en: {
      name: "Data warehouse",
      def: "A database organised for analysis: cleaned, linked data ready for dashboards.",
      match: ["data warehouse", "Warehouse"],
    },
  },
  {
    id: "fabric",
    fr: {
      name: "Microsoft Fabric",
      def: "La plateforme data de Microsoft qui réunit stockage, transformation, analyse et tableaux de bord Power BI.",
      match: ["Microsoft Fabric"],
    },
    en: {
      name: "Microsoft Fabric",
      def: "Microsoft’s data platform bringing together storage, transformation, analysis and Power BI dashboards.",
      match: ["Microsoft Fabric"],
    },
  },
  {
    id: "power-bi",
    fr: {
      name: "Power BI",
      def: "L’outil de tableaux de bord et de visualisation de données de Microsoft.",
      match: ["Power BI"],
    },
    en: {
      name: "Power BI",
      def: "Microsoft’s dashboard and data visualisation tool.",
      match: ["Power BI"],
    },
  },
  {
    id: "azure-functions",
    fr: {
      name: "Azure Functions",
      def: "Un service de Microsoft Azure qui exécute du code à la demande, sans gérer de serveur.",
      match: ["Azure Functions"],
    },
    en: {
      name: "Azure Functions",
      def: "A Microsoft Azure service that runs code on demand, without managing servers.",
      match: ["Azure Functions"],
    },
  },
  {
    id: "ai-search",
    fr: {
      name: "Azure AI Search",
      def: "Le moteur de recherche de Microsoft Azure, qui indexe des documents pour les retrouver par mots-clés ou par sens.",
      match: ["Azure AI Search"],
    },
    en: {
      name: "Azure AI Search",
      def: "Microsoft Azure’s search engine, which indexes documents so they can be found by keyword or by meaning.",
      match: ["Azure AI Search"],
    },
  },
  {
    id: "semantic-layer",
    fr: {
      name: "Couche sémantique",
      def: "L’endroit où les indicateurs et les notions de l’entreprise sont définis une seule fois, au-dessus des tables, pour que tous les outils et tous les agents obtiennent les mêmes réponses.",
      match: ["couche sémantique", "couches sémantiques", "socle sémantique"],
    },
    en: {
      name: "Semantic layer",
      def: "The place where the company’s metrics and notions are defined once, on top of the tables, so that every tool and every agent gets the same answers.",
      match: ["semantic layer", "semantic layers", "semantic foundation"],
    },
  },
  {
    id: "ontology",
    fr: {
      name: "Ontologie",
      def: "Une description structurée des objets d’un métier, de leurs relations et de leurs règles, écrite pour être lue par une machine.",
      match: ["ontologies", "ontologie"],
    },
    en: {
      name: "Ontology",
      def: "A structured description of the objects of a business, their relationships and their rules, written to be read by a machine.",
      match: ["ontologies", "ontology"],
    },
  },
  {
    id: "knowledge-graph",
    fr: {
      name: "Graphe de connaissances",
      def: "Une représentation des informations sous forme d’objets reliés entre eux, qui permet de passer de l’un à l’autre : d’un épisode à son programme, d’un client à ses contrats.",
      match: ["graphe de connaissances", "graphes de connaissances"],
    },
    en: {
      name: "Knowledge graph",
      def: "A way of representing information as connected objects, so you can move from one to the next: from an episode to its programme, from a customer to their contracts.",
      match: ["knowledge graph", "knowledge graphs"],
    },
  },
  {
    id: "reference-data",
    fr: {
      name: "Référentiel",
      def: "La liste de référence d’un type d’objet dans l’entreprise (clients, produits, sites), que tous les systèmes sont censés partager.",
      match: ["référentiels", "référentiel"],
    },
    en: {
      name: "Reference data",
      def: "The reference list for one type of object in the company (customers, products, sites), which every system is meant to share.",
      match: ["reference data"],
    },
  },
  {
    id: "metadata",
    fr: {
      name: "Métadonnées",
      def: "Les informations qui décrivent une donnée : son nom, son origine, son propriétaire, sa définition, son niveau de sensibilité.",
      match: ["métadonnées", "métadonnée"],
    },
    en: {
      name: "Metadata",
      def: "The information that describes a piece of data: its name, origin, owner, definition and sensitivity level.",
      match: ["metadata"],
    },
  },
  {
    id: "business-glossary",
    fr: {
      name: "Glossaire métier",
      def: "La liste des termes employés par l’entreprise, avec une définition validée par les équipes qui les utilisent.",
      match: ["glossaire métier", "glossaires métier"],
    },
    en: {
      name: "Business glossary",
      def: "The list of terms the company uses, each with a definition approved by the teams that use them.",
      match: ["business glossary", "business glossaries"],
    },
  },
];

export const glossaryById = new Map(glossary.map((entry) => [entry.id, entry]));
