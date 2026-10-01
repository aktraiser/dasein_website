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
      match: ["registry", "registre"],
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
];

export const glossaryById = new Map(glossary.map((entry) => [entry.id, entry]));
