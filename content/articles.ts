import type { Locale } from "@/lib/i18n";

/**
 * Long-form articles attached to an expertise page (one per vertical).
 * Content is written as blocks so it stays easy to edit and to translate.
 * A "figure" whose image file is missing from /public is skipped at build time.
 * A table can show logos in its first column: `logos[i]` lists the files
 * (in /public/logos) for row i.
 */
export type Block =
  | { type: "h"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "defs"; items: { term: string; text: string }[] }
  | { type: "code"; caption: string; text: string }
  | { type: "table"; head: string[]; rows: string[][]; logos?: string[][] }
  | { type: "figure"; src: string; alt: string; caption: string }
  | { type: "callout"; text: string }
  /** A card linking to another page of the site (path without the locale). */
  | { type: "related"; href: string; label: string; title: string; text: string }
  /**
   * "governance" (default): the User Augmentation chain; "mcp": the layers around MCP;
   * "patterns": multi-agent coordination patterns; "protocols": AG-UI / MCP / A2A;
   * "hooks": where middleware plugs into the agent loop; "platform": the AI Platform blocks and
   * the three ways teams use it; "federated": platform team vs application teams;
   * "usecases": the three families of use cases; "auth": user → gateways → MCP identity chain;
   * "gateways": LLM, MCP and agent gateways.
   */
  | {
      type: "diagram";
      variant?:
        | "governance"
        | "mcp"
        | "patterns"
        | "protocols"
        | "hooks"
        | "platform"
        | "federated"
        | "usecases"
        | "auth"
        | "gateways";
    };

export type Article = {
  title: string;
  lead: string;
  updated: string;
  summaryLabel: string;
  summary: string[];
  blocks: Block[];
  sourcesLabel: string;
  sources: { label: string; url: string }[];
};

const AGENT_YAML_FR = `agent: synthese-incidents
description: Résume un incident et propose une note de résolution
modele: mistral-large            # appel routé par la gateway LLM
instructions: prompts/synthese-incident.md
skills:
  - redaction-note-resolution
outils:
  - mcp: servicenow
    authentification: propagation-identite   # agit avec les droits de l’utilisateur
    droits: [incident.lecture]
  - mcp: base-documentaire
    authentification: machine-a-machine      # compte de service, lecture seule
    droits: [documents.lecture]
acces:
  groupes: [support-n2]
validation-humaine:
  requise-pour: [ecriture]`;

const AGENT_YAML_EN = `agent: incident-summary
description: Summarises an incident and drafts a resolution note
model: mistral-large             # call routed through the LLM gateway
instructions: prompts/incident-summary.md
skills:
  - write-resolution-note
tools:
  - mcp: servicenow
    auth: identity-propagation   # acts with the user’s own rights
    scopes: [incident.read]
  - mcp: document-base
    auth: machine-to-machine     # service account, read only
    scopes: [documents.read]
access:
  groups: [support-l2]
human-approval:
  required-for: [write]`;

const SOURCES = [
  { label: "Prisme.ai — product overview", url: "https://docs.prisme.ai/products/overview" },
  { label: "Open WebUI", url: "https://github.com/open-webui/open-webui" },
  { label: "LibreChat", url: "https://github.com/danny-avila/LibreChat" },
  { label: "Mistral — Le Chat Enterprise", url: "https://mistral.ai/news/le-chat-enterprise/" },
  { label: "Microsoft — declarative agent manifest", url: "https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/declarative-agent-manifest-1.6" },
  { label: "MCP — authorization specification", url: "https://modelcontextprotocol.io/specification/draft/basic/authorization" },
  { label: "MCP — Enterprise-Managed Authorization", url: "https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization" },
  { label: "Anthropic — Agent Skills", url: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview" },
  { label: "Claude — organisation-wide MCP connectors", url: "https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization" },
  { label: "OpenAI — MCP apps in ChatGPT", url: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt" },
];

const MCP_SOURCES = [
  { label: "MCP — specification (2026-07-28)", url: "https://modelcontextprotocol.io/specification/2026-07-28" },
  { label: "MCP — changelog 2026-07-28 (stateless protocol)", url: "https://modelcontextprotocol.io/specification/2026-07-28/changelog" },
  { label: "MCP — security best practices", url: "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices" },
  { label: "MCP — authorization", url: "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization" },
  { label: "IETF — RFC 8693, OAuth 2.0 Token Exchange", url: "https://datatracker.ietf.org/doc/html/rfc8693" },
  { label: "Microsoft — OAuth 2.0 on-behalf-of flow", url: "https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow" },
  { label: "MCP — 2026 roadmap", url: "https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/" },
  { label: "MCP Registry — preview announcement", url: "https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/" },
  { label: "Anthropic — MCP donated to the Agentic AI Foundation", url: "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation" },
  { label: "Anthropic — advanced tool use (tool search)", url: "https://www.anthropic.com/engineering/advanced-tool-use" },
  { label: "Anthropic — code execution with MCP", url: "https://www.anthropic.com/engineering/code-execution-with-mcp" },
  { label: "Invariant Labs — tool poisoning attacks", url: "https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks" },
  { label: "Simon Willison — MCP and prompt injection", url: "https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/" },
  { label: "Koi Security — malicious postmark-mcp package", url: "https://koi.ai/blog/postmark-mcp-npm-malicious-backdoor-email-theft" },
  { label: "A2A — specification", url: "https://a2a-protocol.org/latest/specification/" },
  { label: "AG-UI — introduction", url: "https://docs.ag-ui.com/introduction" },
  { label: "Linux Foundation — Agent2Agent (A2A) project", url: "https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents" },
  { label: "MuleSoft — Agent Fabric", url: "https://www.mulesoft.com/ai/agent-fabric" },
  { label: "Kong — AI MCP Proxy", url: "https://developer.konghq.com/plugins/ai-mcp-proxy/" },
  { label: "Azure API Management — MCP servers", url: "https://learn.microsoft.com/azure/api-management/mcp-server-overview" },
  { label: "AWS — Bedrock AgentCore Gateway", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html" },
  { label: "Cloudflare — MCP server portals", url: "https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals" },
  { label: "Gravitee — Agent Mesh", url: "https://documentation.gravitee.io/apim/agent-mesh" },
  { label: "LiteLLM — MCP gateway", url: "https://docs.litellm.ai/docs/mcp" },
  { label: "IBM — ContextForge", url: "https://github.com/IBM/mcp-context-forge" },
  { label: "Docker — MCP Gateway", url: "https://docs.docker.com/ai/mcp-catalog-and-toolkit/mcp-gateway/" },
  { label: "Microsoft — MCP Gateway", url: "https://github.com/microsoft/mcp-gateway" },
];

const INVOICE_AGENT_FR = `agent: assistant-factures-fournisseurs
outils:
  # le périmètre de départ
  - lire-facture
  - rapprocher-commande
  - signaler-ecart
  - proposer-validation
  # ajoutés au fil des mois
  - ouvrir-litige
  - relancer-fournisseur
  - consulter-paiements
  - planifier-paiement
  - chercher-politique-achats
  - mettre-a-jour-fournisseur
  - generer-reporting
  # ...`;

const INVOICE_AGENT_EN = `agent: supplier-invoice-assistant
tools:
  # the starting scope
  - read-invoice
  - match-purchase-order
  - flag-discrepancy
  - propose-approval
  # added over the months
  - open-dispute
  - chase-supplier
  - check-payments
  - schedule-payment
  - search-purchasing-policy
  - update-supplier
  - generate-reporting
  # ...`;

const BUSINESS_SOURCES = [
  { label: "Anthropic — Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents" },
  { label: "Anthropic — How we built our multi-agent research system", url: "https://www.anthropic.com/engineering/multi-agent-research-system" },
  { label: "Anthropic — advanced tool use (tool search)", url: "https://www.anthropic.com/engineering/advanced-tool-use" },
  { label: "Microsoft — AI agent orchestration patterns", url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns" },
  { label: "Strands Agents — multi-agent patterns", url: "https://strandsagents.com/docs/user-guide/sdk/multi-agent/multi-agent-patterns/" },
  { label: "Strands Agents — agents as tools", url: "https://strandsagents.com/docs/user-guide/sdk/multi-agent/agents-as-tools/" },
  { label: "Strands Agents — swarm", url: "https://strandsagents.com/docs/user-guide/sdk/multi-agent/swarm/" },
  { label: "Strands Agents — graph", url: "https://strandsagents.com/docs/user-guide/sdk/multi-agent/graph/" },
  { label: "Strands Agents — workflow", url: "https://strandsagents.com/docs/user-guide/sdk/multi-agent/workflow/" },
  { label: "A2A — specification", url: "https://a2a-protocol.org/latest/specification/" },
  { label: "LangChain — Deep Agents", url: "https://www.langchain.com/blog/deep-agents" },
  { label: "LangChain — Deep Agents documentation", url: "https://docs.langchain.com/oss/python/deepagents/overview" },
  { label: "LangChain — Deep Agents harness", url: "https://docs.langchain.com/oss/python/deepagents/harness" },
  { label: "LangChain — LangChain and LangGraph 1.0", url: "https://www.langchain.com/blog/langchain-langgraph-1dot0" },
  { label: "LangChain — built-in middleware", url: "https://docs.langchain.com/oss/python/langchain/middleware/built-in" },
  { label: "LangChain — custom middleware (hooks)", url: "https://docs.langchain.com/oss/python/langchain/middleware/custom" },
  { label: "Claude Agent SDK — hooks", url: "https://code.claude.com/docs/en/agent-sdk/hooks" },
  { label: "OpenAI Agents SDK — guardrails", url: "https://openai.github.io/openai-agents-python/guardrails/" },
  { label: "OpenAI Agents SDK — lifecycle hooks", url: "https://openai.github.io/openai-agents-python/ref/lifecycle/" },
  { label: "Strands Agents — hooks", url: "https://strandsagents.com/docs/user-guide/concepts/agents/hooks/" },
  { label: "Google ADK — callbacks", url: "https://adk.dev/callbacks/" },
  { label: "Cognition — Don’t build multi-agents", url: "https://cognition.com/blog/dont-build-multi-agents" },
  { label: "LangChain — How and when to build multi-agent systems", url: "https://blog.langchain.com/how-and-when-to-build-multi-agent-systems" },
];

const PLATFORM_SOURCES = [
  { label: "AWS — Generative AI operating models in enterprise organizations", url: "https://aws.amazon.com/blogs/machine-learning/generative-ai-operating-models-in-enterprise-organizations-with-amazon-bedrock/" },
  { label: "AWS — Build a multi-tenant generative AI environment for your enterprise", url: "https://aws.amazon.com/blogs/machine-learning/build-a-multi-tenant-generative-ai-environment-for-your-enterprise-on-aws/" },
  { label: "AWS — Bedrock AgentCore overview", url: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html" },
  { label: "Microsoft — AI gateway capabilities in Azure API Management", url: "https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities" },
  { label: "Microsoft — Use a gateway in front of model deployments", url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/azure-openai-gateway-multi-backend" },
  { label: "Microsoft — Establish an AI Center of Excellence", url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai/center-of-excellence" },
  { label: "Google Cloud — Agentic AI architecture guides", url: "https://docs.cloud.google.com/architecture/agentic-ai-overview" },
];

/** Articles that stand on their own, published under /articles/<slug>. */
export const standaloneArticles: Partial<Record<string, Record<Locale, Article>>> = {
  mcp: {
    fr: {
      title: "MCP\u00a0: le protocole qui branche vos systèmes sur les agents, ses limites, et ce qu’il faut autour",
      lead: "MCP est devenu le standard pour connecter les agents aux outils de l’entreprise. Mais le protocole ne s’occupe ni du catalogue, ni des droits fins, ni de l’audit, ni des coûts : c’est le rôle du socle commun.",
      updated: "Mis à jour le 1er octobre 2026",
      summaryLabel: "En bref",
      summary: [
        "MCP standardise la connexion entre un agent et un outil : une API devient utilisable par n’importe quel agent compatible.",
        "Le protocole laisse volontairement de côté la sécurité opérationnelle, le catalogue, l’audit et les coûts.",
        "Dasein aide à mettre en place le socle qui les apporte : registry, gateways, politiques et observabilité, en s’appuyant sur ce que vous avez déjà.",
      ],
      blocks: [
        { type: "h", id: "mcp", text: "1. MCP en deux minutes" },
        {
          type: "p",
          text: "MCP (Model Context Protocol) est un protocole ouvert qui décrit comment un agent découvre et utilise des outils. D’un côté, un « serveur MCP » expose les capacités d’une application : lire un ticket, chercher un client, créer une commande. De l’autre, l’agent se connecte à ce serveur et sait immédiatement ce qu’il peut faire, sans développement spécifique.",
        },
        {
          type: "defs",
          items: [
            { term: "Outils", text: "Des actions que l’agent peut déclencher : rechercher, lire, créer, mettre à jour." },
            { term: "Ressources", text: "Des données que l’agent peut consulter pour se faire un contexte : documents, fiches, historiques." },
            { term: "Prompts", text: "Des modèles d’instructions prêts à l’emploi, proposés par le serveur." },
          ],
        },
        {
          type: "p",
          text: "Créé par Anthropic en novembre 2024, MCP a été confié en décembre 2025 à l’Agentic AI Foundation, une fondation hébergée par la Linux Foundation et soutenue par OpenAI, Google, Microsoft et AWS. La version de juillet 2026 rend le protocole sans état, ce qui facilite enfin son déploiement derrière des répartiteurs de charge.",
        },
        {
          type: "callout",
          text: "MCP fait pour les agents ce que les API REST ont fait pour les applications : une manière commune de se brancher. Pas une manière commune de se gouverner.",
        },

        { type: "h", id: "interet", text: "2. Pourquoi tout le monde s’y met" },
        {
          type: "list",
          items: [
            "Une API existante peut être exposée en serveur MCP : elle devient utilisable par tous les agents compatibles.",
            "Le même connecteur sert à plusieurs fronts et plusieurs agents : on ne refait pas l’intégration pour chaque outil.",
            "Les grands assistants du marché (ChatGPT, Claude, Copilot, Le Chat, Gemini) savent déjà s’y connecter.",
            "Les entreprises qui ont déjà une plateforme de gestion d’API partent avec une longueur d’avance : leurs API sont documentées, sécurisées et cataloguées.",
          ],
        },

        { type: "h", id: "cas-usage", text: "3. Ce qu’on en fait : trois familles de cas d’usage" },
        {
          type: "p",
          text: "Une fois les systèmes exposés en serveurs MCP, les cas d’usage se rangent presque tous dans trois familles. Elles s’appuient sur les mêmes serveurs et le même socle : seul le cas d’usage change, et c’est ce qui rend l’investissement rentable.",
        },
        { type: "diagram", variant: "usecases" },

        { type: "h", id: "limites", text: "4. Les limites, une par une" },
        {
          type: "p",
          text: "La spécification le dit elle-même : MCP ne peut pas faire respecter les principes de sécurité au niveau du protocole. Ce n’est pas un défaut de conception, c’est un choix de périmètre. Mais dès qu’on dépasse le prototype, ces trous doivent être comblés ailleurs.",
        },
        {
          type: "table",
          head: ["Limite", "Ce qui peut arriver", "Ce qu’on met en place"],
          rows: [
            ["Contenus non fiables", "Un document ou un ticket contient des instructions cachées que l’agent suit (injection de prompt).", "Séparer lecture et écriture, validation humaine pour toute action, filtrage des contenus."],
            ["Descriptions d’outils piégées", "Un serveur glisse des instructions dans la description de ses outils, ou la modifie après validation.", "Catalogue de serveurs validés, versions figées, revue de chaque changement."],
            ["Serveurs non officiels", "En 2025, un paquet MCP populaire a été modifié pour copier en secret tous les e-mails envoyés.", "Hébergement interne, images vérifiées, analyse des dépendances."],
            ["Autorisation optionnelle", "L’authentification n’est pas obligatoire dans la spécification, et les droits fins par outil n’y figurent pas.", "Gateway MCP avec droits par outil et par groupe, propagation d’identité, jamais de jeton transmis tel quel."],
            ["Trop d’outils", "Selon Anthropic, 58 outils occupent environ 55 000 tokens avant la première question, et la précision baisse.", "Exposer les outils par domaine, recherche d’outils, sous-catalogues par agent."],
            ["Pas de catalogue d’entreprise", "Le registre officiel recense des serveurs publics ; il ne dit pas lesquels sont autorisés chez vous.", "Un registry interne : agents, serveurs MCP, prompts et skills validés."],
            ["Ni audit ni coûts", "Le protocole ne prévoit ni journal d’audit ni suivi des coûts : seulement des conventions de traces.", "Observabilité centralisée : chaque appel tracé, attribué à un agent et à une équipe."],
            ["Agent à outil seulement", "MCP relie un agent à un outil. Pour que deux agents collaborent, il faut un autre protocole : A2A.", "Gateway A2A et orchestration entre agents."],
          ],
        },

        { type: "h", id: "socle", text: "5. Le socle autour de MCP" },
        {
          type: "p",
          text: "La réponse du marché est la même partout : on ne laisse pas les agents parler directement aux serveurs MCP. On place entre eux un point de passage unique, qui sait qui appelle, quoi, avec quels droits et à quel coût.",
        },
        { type: "diagram", variant: "mcp" },
        {
          type: "defs",
          items: [
            { term: "Registry", text: "Le catalogue de tout ce qui est autorisé : agents, serveurs MCP, prompts, skills, modèles. Chaque élément a un propriétaire, une version et un statut de validation." },
            { term: "Gateway MCP", text: "Le passage obligé entre les agents et les serveurs MCP : authentification, droits par outil, limites d’appels, filtrage, journalisation." },
            { term: "Gateway LLM", text: "Le passage obligé vers les modèles : choix du modèle, quotas, suivi des coûts par équipe, possibilité de changer de fournisseur." },
            { term: "Gateway A2A", text: "Le même contrôle, appliqué aux échanges entre agents : quel agent peut en solliciter un autre, et pour quoi faire." },
            { term: "Politiques", text: "Des règles appliquées à chaque échange : masquage des données personnelles, limites de débit, contrôles de conformité." },
            { term: "Observabilité", text: "Une vue d’ensemble du réseau d’agents : qui appelle qui, volumes, temps de réponse, erreurs et coûts." },
          ],
        },
        {
          type: "callout",
          text: "Les contrôles se posent à deux endroits complémentaires : dans les gateways, pour tous les agents à la fois, et dans les middlewares de chaque agent, au plus près de ses décisions (validation humaine, plafonds, masquage des données).",
        },

        { type: "h", id: "identite", text: "6. Identité : quatre façons de relier l’utilisateur au serveur MCP" },
        {
          type: "p",
          text: "Entre l’utilisateur et l’application finale, la demande traverse une gateway IA, l’agent, puis une gateway MCP. La vraie question est : avec quelle identité le serveur MCP agit-il, et qui vérifie les droits ? Quatre schémas reviennent, du plus simple au plus fin.",
        },
        { type: "diagram", variant: "auth" },
        {
          type: "table",
          head: ["Schéma", "Ce que reçoit le serveur MCP", "Quand l’utiliser", "Point de vigilance"],
          rows: [
            ["1. Compte technique et contexte utilisateur", "Un jeton technique émis pour la gateway, accompagné d’un contexte utilisateur signé. La gateway a déjà vérifié l’identité, les droits par outil et les quotas.", "Applications internes sans droits fins par utilisateur ; démarrage rapide.", "Le serveur MCP ne doit faire confiance qu’au contexte venant de la gateway ; l’application, elle, voit un compte technique."],
            ["2. Jeton de l’utilisateur transmis", "Le jeton de l’utilisateur, que le serveur MCP valide lui-même, droits compris.", "Même fournisseur d’identité partout, jeton émis pour ce serveur MCP.", "La spécification MCP interdit d’accepter un jeton qui n’a pas été émis pour le serveur : ne jamais transmettre un jeton « tel quel »."],
            ["3. Échange de jeton", "Un nouveau jeton, obtenu par la gateway auprès du fournisseur d’identité au nom de l’utilisateur, limité à ce serveur et à ces droits.", "Le choix par défaut pour les données sensibles : l’application voit le vrai utilisateur, avec des droits réduits.", "Le fournisseur d’identité doit gérer l’échange de jeton (standard OAuth, RFC 8693)."],
            ["4. Autorisation en cours de tâche", "Un second jeton, obtenu quand l’utilisateur s’authentifie auprès du système cible pendant la tâche.", "Systèmes qui ont leur propre fournisseur d’identité : SaaS, partenaires, filiales.", "Une interruption pour l’utilisateur ; des jetons à stocker et à révoquer proprement."],
          ],
        },
        {
          type: "callout",
          text: "Dans tous les cas, la gateway reste le point de passage : elle valide l’identité, applique les quotas et les limites de débit, et trace chaque appel.",
        },

        { type: "h", id: "protocoles", text: "7. Trois protocoles, trois liaisons" },
        {
          type: "p",
          text: "MCP n’est qu’une des trois liaisons d’un agent. Les deux autres se standardisent aussi, avec des protocoles ouverts qui se complètent plutôt qu’ils ne se concurrencent.",
        },
        { type: "diagram", variant: "protocols" },
        {
          type: "table",
          head: ["Liaison", "Protocole", "Rôle"],
          rows: [
            ["Agent ↔ utilisateur", "AG-UI (Agent–User Interaction)", "Relie un agent à l’application que voit l’utilisateur : réponses en direct, appels d’outils visibles, demandes de validation. Lancé par CopilotKit."],
            ["Agent ↔ outils et données", "MCP (Model Context Protocol)", "Relie un agent aux applications et aux données de l’entreprise. Lancé par Anthropic."],
            ["Agent ↔ agent", "A2A (Agent2Agent)", "Permet à des agents de frameworks ou d’éditeurs différents de se trouver et de se confier des tâches. Lancé par Google."],
          ],
        },
        {
          type: "p",
          text: "Avec A2A, chaque agent publie une « carte d’agent » : un petit fichier qui décrit ce qu’il sait faire, où le joindre et comment s’authentifier. Les tâches confiées ont un cycle de vie (soumise, en cours, en attente d’une information, terminée…), ce qui permet des traitements longs, avec un humain dans la boucle. Pour la gouvernance, c’est une bonne nouvelle : ces cartes se rangent dans le registry, comme les serveurs MCP.",
        },

        { type: "h", id: "marche", text: "8. Le marché" },
        {
          type: "p",
          text: "Éditeurs d’intégration, clouds et projets open source proposent tous une version de ce socle. Le bon choix dépend surtout de ce que vous avez déjà en place.",
        },
        {
          type: "table",
          head: ["Solution", "Type", "À retenir"],
          rows: [
            ["MuleSoft Agent Fabric", "Plateforme d’intégration (Salesforce)", "Registry d’agents, connecteurs MCP et A2A, orchestrateur, cartographie du réseau d’agents, politiques via la gateway API"],
            ["Kong AI Gateway", "Gateway API", "Proxy MCP, authentification OAuth, droits par outil"],
            ["Azure API Management", "Cloud Microsoft", "Expose des API gérées en serveurs MCP, politiques de gateway IA"],
            ["AWS Bedrock AgentCore Gateway", "Cloud AWS", "Transforme API et fonctions en outils MCP derrière un point d’accès unique"],
            ["Cloudflare MCP Server Portals", "Zero Trust", "Plusieurs serveurs MCP derrière un portail, politiques par utilisateur, journalisation"],
            ["Gravitee Agent Mesh", "Gateway API", "Proxys LLM, MCP et A2A, catalogue d’agents"],
            ["LiteLLM", "Open source", "Gateway LLM, MCP et A2A : clés, droits par équipe, quotas, suivi des dépenses"],
            ["IBM ContextForge", "Open source", "Gateway et registry qui fédèrent MCP, REST et A2A"],
            ["Docker MCP Gateway", "Open source", "Serveurs MCP isolés en conteneurs, catalogue vérifié"],
            ["Microsoft MCP Gateway", "Open source", "Reverse proxy sur Kubernetes : routage, autorisation, cycle de vie des serveurs"],
          ],
        },
        {
          type: "callout",
          text: "Si vous gérez déjà vos API avec une plateforme d’intégration, commencez par là : ajouter MCP à une fondation d’API existante est souvent le chemin le plus court. Sinon, une gateway open source suffit pour démarrer.",
        },

        { type: "h", id: "demarrer", text: "9. Par où commencer" },
        {
          type: "list",
          items: [
            "Choisir deux ou trois systèmes utiles et exposer leurs API en serveurs MCP, en lecture d’abord.",
            "Inscrire ces serveurs, les agents et les modèles dans un registry, avec un propriétaire pour chacun.",
            "Faire passer tous les appels par une gateway : identité, droits par outil, quotas, journalisation.",
            "Observer le réseau d’agents, puis seulement orchestrer plusieurs agents sur un processus de bout en bout.",
          ],
        },
      ],
      sourcesLabel: "Pour aller plus loin",
      sources: MCP_SOURCES,
    },
    en: {
      title: "MCP: the protocol that plugs your systems into agents, its limits, and what it needs around it",
      lead: "MCP has become the standard for connecting agents to company tools. But the protocol handles neither the catalogue, nor fine-grained rights, nor audit, nor cost: that is the shared foundation’s job.",
      updated: "Updated 1 October 2026",
      summaryLabel: "In short",
      summary: [
        "MCP standardises the connection between an agent and a tool: an API becomes usable by any compatible agent.",
        "The protocol deliberately leaves out operational security, the catalogue, audit and cost.",
        "Dasein helps put in place the foundation that provides them: registry, gateways, policies and observability, building on what you already have.",
      ],
      blocks: [
        { type: "h", id: "mcp", text: "1. MCP in two minutes" },
        {
          type: "p",
          text: "MCP (Model Context Protocol) is an open protocol describing how an agent discovers and uses tools. On one side, an “MCP server” exposes an application’s capabilities: read a ticket, look up a customer, create an order. On the other, the agent connects to that server and immediately knows what it can do, with no custom development.",
        },
        {
          type: "defs",
          items: [
            { term: "Tools", text: "Actions the agent can trigger: search, read, create, update." },
            { term: "Resources", text: "Data the agent can look at to build context: documents, records, history." },
            { term: "Prompts", text: "Ready-made instruction templates offered by the server." },
          ],
        },
        {
          type: "p",
          text: "Created by Anthropic in November 2024, MCP was handed over in December 2025 to the Agentic AI Foundation, hosted by the Linux Foundation and backed by OpenAI, Google, Microsoft and AWS. The July 2026 version makes the protocol stateless, which finally makes it easier to run behind load balancers.",
        },
        {
          type: "callout",
          text: "MCP does for agents what REST APIs did for applications: a common way to plug in. Not a common way to be governed.",
        },

        { type: "h", id: "interet", text: "2. Why everyone is adopting it" },
        {
          type: "list",
          items: [
            "An existing API can be exposed as an MCP server: it becomes usable by every compatible agent.",
            "The same connector serves several front ends and agents: no need to redo the integration for each tool.",
            "The main assistants on the market (ChatGPT, Claude, Copilot, Le Chat, Gemini) already connect to it.",
            "Companies that already run an API management platform start ahead: their APIs are documented, secured and catalogued.",
          ],
        },

        { type: "h", id: "cas-usage", text: "3. What it is used for: three families of use cases" },
        {
          type: "p",
          text: "Once systems are exposed as MCP servers, nearly every use case falls into one of three families. They rely on the same servers and the same foundation: only the use case changes, and that is what makes the investment pay off.",
        },
        { type: "diagram", variant: "usecases" },

        { type: "h", id: "limites", text: "4. The limits, one by one" },
        {
          type: "p",
          text: "The specification says so itself: MCP cannot enforce security principles at the protocol level. It is not a design flaw, it is a choice of scope. But as soon as you go past the prototype, these gaps have to be filled elsewhere.",
        },
        {
          type: "table",
          head: ["Limit", "What can happen", "What we put in place"],
          rows: [
            ["Untrusted content", "A document or ticket contains hidden instructions that the agent follows (prompt injection).", "Separate read and write, human approval for any action, content filtering."],
            ["Poisoned tool descriptions", "A server slips instructions into its tool descriptions, or changes them after approval.", "Catalogue of approved servers, pinned versions, review of every change."],
            ["Unofficial servers", "In 2025, a popular MCP package was altered to secretly copy every email sent.", "Internal hosting, verified images, dependency scanning."],
            ["Optional authorization", "Authentication is not mandatory in the spec, and fine-grained per-tool rights are not part of it.", "MCP gateway with per-tool and per-group rights, identity propagation, never passing tokens through."],
            ["Too many tools", "According to Anthropic, 58 tools take about 55,000 tokens before the first question, and accuracy drops.", "Expose tools by domain, tool search, per-agent sub-catalogues."],
            ["No enterprise catalogue", "The official registry lists public servers; it does not say which ones are allowed in your company.", "An internal registry: approved agents, MCP servers, prompts and skills."],
            ["No audit, no cost", "The protocol defines neither an audit log nor cost tracking: only tracing conventions.", "Central observability: every call traced and attributed to an agent and a team."],
            ["Agent to tool only", "MCP links an agent to a tool. For two agents to work together, another protocol is needed: A2A.", "A2A gateway and orchestration between agents."],
          ],
        },

        { type: "h", id: "socle", text: "5. The foundation around MCP" },
        {
          type: "p",
          text: "The market’s answer is the same everywhere: agents do not talk to MCP servers directly. A single checkpoint sits between them, which knows who is calling what, with which rights and at what cost.",
        },
        { type: "diagram", variant: "mcp" },
        {
          type: "defs",
          items: [
            { term: "Registry", text: "The catalogue of everything that is allowed: agents, MCP servers, prompts, skills, models. Each item has an owner, a version and an approval status." },
            { term: "MCP gateway", text: "The mandatory path between agents and MCP servers: authentication, per-tool rights, rate limits, filtering, logging." },
            { term: "LLM gateway", text: "The mandatory path to models: model choice, quotas, cost per team, freedom to switch provider." },
            { term: "A2A gateway", text: "The same control applied to exchanges between agents: which agent may call another, and for what." },
            { term: "Policies", text: "Rules applied to every exchange: personal data masking, rate limits, compliance checks." },
            { term: "Observability", text: "An overview of the agent network: who calls whom, volumes, response times, errors and cost." },
          ],
        },
        {
          type: "callout",
          text: "Controls sit in two complementary places: in the gateways, for every agent at once, and in each agent’s middleware, closest to its decisions (human approval, caps, data masking).",
        },

        { type: "h", id: "identite", text: "6. Identity: four ways to link the user to the MCP server" },
        {
          type: "p",
          text: "Between the user and the target application, the request goes through an AI gateway, the agent, then an MCP gateway. The real question is: with which identity does the MCP server act, and who checks the rights? Four patterns come up, from the simplest to the finest-grained.",
        },
        { type: "diagram", variant: "auth" },
        {
          type: "table",
          head: ["Pattern", "What the MCP server receives", "When to use it", "Watch out for"],
          rows: [
            ["1. Technical account plus user context", "A technical token issued to the gateway, with a signed user context. The gateway has already checked identity, per-tool rights and quotas.", "Internal applications without fine per-user rights; quick start.", "The MCP server must trust user context only from the gateway; the application itself sees a technical account."],
            ["2. User token passed on", "The user’s token, which the MCP server validates itself, rights included.", "Same identity provider everywhere, token issued for this MCP server.", "The MCP spec forbids accepting a token that was not issued for the server: never pass a token through “as is”."],
            ["3. Token exchange", "A new token, obtained by the gateway from the identity provider on the user’s behalf, limited to this server and these rights.", "The default choice for sensitive data: the application sees the real user, with reduced rights.", "The identity provider must support token exchange (OAuth standard, RFC 8693)."],
            ["4. In-task authorization", "A second token, obtained when the user signs in to the target system during the task.", "Systems with their own identity provider: SaaS, partners, subsidiaries.", "An interruption for the user; tokens to store and revoke properly."],
          ],
        },
        {
          type: "callout",
          text: "In every case the gateway remains the checkpoint: it validates identity, applies quotas and rate limits, and traces every call.",
        },

        { type: "h", id: "protocoles", text: "7. Three protocols, three links" },
        {
          type: "p",
          text: "MCP is only one of an agent’s three links. The other two are being standardised too, with open protocols that complement rather than compete with each other.",
        },
        { type: "diagram", variant: "protocols" },
        {
          type: "table",
          head: ["Link", "Protocol", "Role"],
          rows: [
            ["Agent ↔ user", "AG-UI (Agent–User Interaction)", "Connects an agent to the application the user sees: live answers, visible tool calls, approval requests. Started by CopilotKit."],
            ["Agent ↔ tools and data", "MCP (Model Context Protocol)", "Connects an agent to company applications and data. Started by Anthropic."],
            ["Agent ↔ agent", "A2A (Agent2Agent)", "Lets agents from different frameworks or vendors find each other and hand off tasks. Started by Google."],
          ],
        },
        {
          type: "p",
          text: "With A2A, each agent publishes an “agent card”: a small file describing what it can do, where to reach it and how to authenticate. Delegated tasks have a lifecycle (submitted, working, waiting for input, completed…), which supports long-running work with a human in the loop. For governance this is good news: these cards belong in the registry, just like MCP servers.",
        },

        { type: "h", id: "marche", text: "8. The market" },
        {
          type: "p",
          text: "Integration vendors, clouds and open-source projects all offer a version of this foundation. The right choice mostly depends on what you already run.",
        },
        {
          type: "table",
          head: ["Solution", "Type", "Key point"],
          rows: [
            ["MuleSoft Agent Fabric", "Integration platform (Salesforce)", "Agent registry, MCP and A2A connectors, orchestrator, agent network map, policies through the API gateway"],
            ["Kong AI Gateway", "API gateway", "MCP proxy, OAuth authentication, per-tool rights"],
            ["Azure API Management", "Microsoft cloud", "Exposes managed APIs as MCP servers, AI gateway policies"],
            ["AWS Bedrock AgentCore Gateway", "AWS cloud", "Turns APIs and functions into MCP tools behind a single endpoint"],
            ["Cloudflare MCP Server Portals", "Zero Trust", "Several MCP servers behind one portal, per-user policies, logging"],
            ["Gravitee Agent Mesh", "API gateway", "LLM, MCP and A2A proxies, agent catalogue"],
            ["LiteLLM", "Open source", "LLM, MCP and A2A gateway: keys, team rights, quotas, spend tracking"],
            ["IBM ContextForge", "Open source", "Gateway and registry federating MCP, REST and A2A"],
            ["Docker MCP Gateway", "Open source", "MCP servers isolated in containers, verified catalogue"],
            ["Microsoft MCP Gateway", "Open source", "Kubernetes reverse proxy: routing, authorization, server lifecycle"],
          ],
        },
        {
          type: "callout",
          text: "If you already manage your APIs with an integration platform, start there: adding MCP to an existing API foundation is often the shortest path. Otherwise, an open-source gateway is enough to get going.",
        },

        { type: "h", id: "demarrer", text: "9. Where to start" },
        {
          type: "list",
          items: [
            "Pick two or three useful systems and expose their APIs as MCP servers, read-only first.",
            "Register these servers, the agents and the models in a registry, with an owner for each.",
            "Route every call through a gateway: identity, per-tool rights, quotas, logging.",
            "Observe the agent network, and only then orchestrate several agents across an end-to-end process.",
          ],
        },
      ],
      sourcesLabel: "Further reading",
      sources: MCP_SOURCES,
    },
  },};

export const articles: Partial<Record<string, Record<Locale, Article>>> = {
  "user-augmentation": {
    fr: {
      title: "User Augmentation\u00a0: donner des agents à chaque collaborateur, sans perdre le contrôle",
      lead: "Le front, on l’achète. Ce qui fait la différence, c’est la gouvernance des agents qu’il expose : qui peut faire quoi, avec quelles données, et à quel coût.",
      updated: "Mis à jour le 1er octobre 2026",
      summaryLabel: "En bref",
      summary: [
        "Une entreprise achète en général un front d’IA prêt à l’emploi plutôt que de le développer.",
        "Ce front expose des agents aux collaborateurs : c’est là qu’il faut une gouvernance.",
        "Dasein aide à mettre en place cette gouvernance : agents déclaratifs, connexions MCP maîtrisées, identité, droits, skills et maîtrise des appels aux modèles.",
      ],
      blocks: [
        { type: "h", id: "front", text: "1. Le point de départ : on achète un front" },
        {
          type: "p",
          text: "Un « front », c’est l’interface dans laquelle les collaborateurs discutent avec l’IA : une fenêtre de conversation, une liste d’assistants, des documents à joindre. Ce marché est mûr : il existe des solutions solides, souveraines, open source ou en SaaS. Les redévelopper n’a pas de sens.",
        },
        {
          type: "table",
          head: ["Solution", "Type", "À retenir"],
          rows: [
            ["Prisme.ai", "Plateforme française, SaaS ou auto-hébergée", "Création d’agents sans code, gouvernance, refacturation par équipe"],
            ["Open WebUI", "Open source, auto-hébergé", "Interface type ChatGPT, groupes, SSO, outils MCP"],
            ["LibreChat", "Open source (MIT), auto-hébergé", "Multi-modèles, agents, catalogue d’agents, suivi de consommation"],
            ["Mistral Le Chat Enterprise", "SaaS ou auto-hébergé", "Assistant souverain, connecteurs MCP, authentification pour le compte de l’utilisateur"],
            ["Microsoft 365 Copilot", "SaaS", "Agents déclaratifs décrits dans un manifeste, intégrés à Microsoft 365"],
            ["ChatGPT, Claude, Gemini Enterprise", "SaaS", "Connecteurs MCP gérés par l’administrateur, audit, droits par groupe"],
            ["Dust, Langdock", "SaaS", "Espaces d’agents d’équipe, validation des actions, SSO"],
          ],
          logos: [
            ["prismeai.svg"],
            ["openwebui.svg"],
            ["librechat.svg"],
            ["mistralai.svg"],
            ["copilot.svg"],
            ["openai.svg", "claude.svg", "googlegemini.svg"],
            ["dust.svg", "langdock.png"],
          ],
        },
        {
          type: "figure",
          src: "/articles/user-augmentation/open-webui.png",
          alt: "Interface d’Open WebUI",
          caption: "Open WebUI, un front open source auto-hébergé. Capture : projet Open WebUI (licence Open WebUI).",
        },
        {
          type: "callout",
          text: "Le choix du front compte moins que ce qu’on met derrière. Un même front peut être un gadget ou un outil de production : tout dépend de la gouvernance des agents qu’il expose.",
        },

        { type: "h", id: "gouvernance", text: "2. Le vrai sujet : gouverner les agents exposés" },
        {
          type: "p",
          text: "Le front va proposer des agents aux collaborateurs : un assistant de synthèse, un assistant de recherche documentaire, un assistant de rédaction. Chacun de ces agents lit des données, appelle des outils, consomme des modèles. Sans règles, on obtient vite des agents qui voient trop de choses, des coûts qui dérapent et aucune trace de ce qui s’est passé.",
        },
        { type: "diagram" },

        { type: "h", id: "briques", text: "3. Les briques, une par une" },
        {
          type: "defs",
          items: [
            {
              term: "Agents déclaratifs",
              text: "Un agent est décrit dans un fichier (en YAML) plutôt que codé : son rôle, ses instructions, le modèle utilisé, ses outils et qui peut l’utiliser. On peut le relire, le versionner, le valider avant de le publier, comme n’importe quelle configuration.",
            },
            {
              term: "Connexions MCP",
              text: "MCP (Model Context Protocol) est le standard qui permet à un agent d’utiliser des outils : lire des tickets, chercher dans une base documentaire, consulter un CRM. Chaque outil est exposé par un « serveur MCP ».",
            },
            {
              term: "Gouvernance des connexions MCP",
              text: "Tous les serveurs MCP ne se valent pas. On tient un catalogue de serveurs validés, on décide quels groupes peuvent les utiliser et on distingue les outils de lecture de ceux qui écrivent dans un système.",
            },
            {
              term: "Propagation d’identité",
              text: "L’agent agit avec l’identité de la personne qui l’utilise. S’il interroge un outil, il ne voit que ce que cette personne a le droit de voir. C’est le mode par défaut pour toutes les données personnelles ou sensibles.",
            },
            {
              term: "Machine à machine",
              text: "Pour certains outils, l’agent se connecte avec un compte de service, sans passer par l’utilisateur : une base documentaire publique en interne, un référentiel en lecture seule. C’est plus simple, mais réservé aux données que tout le monde peut voir.",
            },
            {
              term: "Délégation de droits",
              text: "L’utilisateur délègue à l’agent une partie seulement de ses droits : lire mais pas modifier, sur un périmètre précis, pour une durée limitée, et révocable à tout moment.",
            },
            {
              term: "Skills et prompts",
              text: "Une skill est un savoir-faire réutilisable : un dossier qui contient des instructions, des modèles de documents et éventuellement des scripts. L’agent ne la charge que lorsqu’il en a besoin. Les prompts sont gérés comme une bibliothèque partagée et versionnée.",
            },
            {
              term: "Gestion des appels LLM",
              text: "Tous les appels aux modèles passent par une gateway : choix du modèle selon le besoin, quotas par équipe, suivi des coûts, journalisation. On peut changer de modèle sans toucher aux agents.",
            },
          ],
        },
        {
          type: "code",
          caption: "Exemple simplifié : un agent décrit en YAML, avec une connexion en propagation d’identité et une connexion machine à machine.",
          text: AGENT_YAML_FR,
        },

        { type: "h", id: "identite", text: "4. Propagation d’identité ou machine à machine ?" },
        {
          type: "p",
          text: "C’est la décision la plus structurante. Le protocole MCP s’appuie sur OAuth 2.1, et prévoit deux extensions officielles qui correspondent exactement à ces deux modes.",
        },
        {
          type: "table",
          head: ["", "Propagation d’identité", "Machine à machine"],
          rows: [
            ["L’agent agit…", "au nom de l’utilisateur", "avec un compte de service"],
            ["Ce qu’il voit", "uniquement ce que l’utilisateur peut voir", "tout ce que le compte de service peut voir"],
            ["Contrôlé par", "l’annuaire d’entreprise (groupes, rôles, accès conditionnel)", "le périmètre du compte de service"],
            ["À utiliser pour", "messagerie, tickets, CRM, données personnelles", "référentiels et documentation ouverts à tous"],
            ["Dans MCP", "extension « Enterprise-Managed Authorization »", "extension « Client Credentials »"],
          ],
        },

        { type: "h", id: "ajouts", text: "5. Ce qu’on ajoute presque toujours" },
        {
          type: "list",
          items: [
            "Une connexion unique (SSO) et la synchronisation des groupes de l’annuaire, pour donner accès aux agents par équipe.",
            "Un catalogue d’agents et de connecteurs, avec une validation avant toute publication.",
            "Un journal d’audit : qui a utilisé quel agent, quel outil, avec quelles données.",
            "Une validation humaine pour les actions sensibles, par exemple toute écriture dans un système.",
            "Le suivi de l’adoption et des coûts par équipe, avec refacturation si besoin.",
            "Des bases de connaissance qui respectent les droits d’accès d’origine.",
            "Des garde-fous contre la fuite de données sensibles.",
            "Des versions et une évaluation des agents avant chaque mise à jour.",
          ],
        },

        { type: "h", id: "demarrer", text: "6. Par où commencer" },
        {
          type: "list",
          items: [
            "Choisir le front selon vos contraintes : souveraineté, hébergement, outils déjà en place.",
            "Démarrer avec trois agents utiles, sur un périmètre restreint, pour un groupe pilote.",
            "Connecter deux ou trois serveurs MCP, en décidant pour chacun : propagation d’identité ou machine à machine.",
            "Faire passer tous les appels aux modèles par la gateway dès le premier jour.",
            "Mesurer l’usage et les retours, puis élargir le catalogue.",
          ],
        },
      ],
      sourcesLabel: "Pour aller plus loin",
      sources: SOURCES,
    },
    en: {
      title: "User Augmentation: giving every employee agents, without losing control",
      lead: "You buy the front end. What makes the difference is the governance of the agents it exposes: who can do what, with which data, and at what cost.",
      updated: "Updated 1 October 2026",
      summaryLabel: "In short",
      summary: [
        "Companies usually buy a ready-made AI front end rather than build one.",
        "That front end exposes agents to employees: this is where governance is needed.",
        "Dasein helps put that governance in place: declarative agents, controlled MCP connections, identity, rights, skills and managed model calls.",
      ],
      blocks: [
        { type: "h", id: "front", text: "1. The starting point: you buy a front end" },
        {
          type: "p",
          text: "A “front end” is the interface where employees talk to AI: a chat window, a list of assistants, documents to attach. This market is mature: there are solid sovereign, open-source and SaaS options. Rebuilding one makes no sense.",
        },
        {
          type: "table",
          head: ["Solution", "Type", "Key point"],
          rows: [
            ["Prisme.ai", "French platform, SaaS or self-hosted", "No-code agent builder, governance, per-team rebilling"],
            ["Open WebUI", "Open source, self-hosted", "ChatGPT-style interface, groups, SSO, MCP tools"],
            ["LibreChat", "Open source (MIT), self-hosted", "Multi-model, agents, agent catalogue, usage tracking"],
            ["Mistral Le Chat Enterprise", "SaaS or self-hosted", "Sovereign assistant, MCP connectors, on-behalf-of authentication"],
            ["Microsoft 365 Copilot", "SaaS", "Declarative agents described in a manifest, inside Microsoft 365"],
            ["ChatGPT, Claude, Gemini Enterprise", "SaaS", "Admin-managed MCP connectors, audit, group-based rights"],
            ["Dust, Langdock", "SaaS", "Team agent spaces, action approval, SSO"],
          ],
          logos: [
            ["prismeai.svg"],
            ["openwebui.svg"],
            ["librechat.svg"],
            ["mistralai.svg"],
            ["copilot.svg"],
            ["openai.svg", "claude.svg", "googlegemini.svg"],
            ["dust.svg", "langdock.png"],
          ],
        },
        {
          type: "figure",
          src: "/articles/user-augmentation/open-webui.png",
          alt: "Open WebUI interface",
          caption: "Open WebUI, an open-source self-hosted front end. Screenshot: Open WebUI project (Open WebUI licence).",
        },
        {
          type: "callout",
          text: "The choice of front end matters less than what sits behind it. The same front end can be a gadget or a production tool: it all depends on the governance of the agents it exposes.",
        },

        { type: "h", id: "gouvernance", text: "2. The real topic: governing the agents you expose" },
        {
          type: "p",
          text: "The front end offers agents to employees: a summary assistant, a document search assistant, a writing assistant. Each of them reads data, calls tools and consumes models. Without rules, you quickly get agents that see too much, costs that drift and no record of what happened.",
        },
        { type: "diagram" },

        { type: "h", id: "briques", text: "3. The building blocks, one by one" },
        {
          type: "defs",
          items: [
            { term: "Declarative agents", text: "An agent is described in a file (YAML) rather than coded: its role, instructions, model, tools and who may use it. It can be reviewed, versioned and approved before publication, like any configuration." },
            { term: "MCP connections", text: "MCP (Model Context Protocol) is the standard that lets an agent use tools: read tickets, search a document base, query a CRM. Each tool is exposed by an “MCP server”." },
            { term: "Governing MCP connections", text: "Not all MCP servers are equal. You keep a catalogue of approved servers, decide which groups may use them, and separate read tools from tools that write into a system." },
            { term: "Identity propagation", text: "The agent acts with the identity of the person using it. When it queries a tool, it only sees what that person is allowed to see. This is the default for any personal or sensitive data." },
            { term: "Machine to machine", text: "For some tools, the agent connects with a service account, without going through the user: an internal document base open to all, a read-only reference. Simpler, but only for data everyone may see." },
            { term: "Rights delegation", text: "The user delegates only part of their rights to the agent: read but not change, on a precise scope, for a limited time, revocable at any moment." },
            { term: "Skills and prompts", text: "A skill is reusable know-how: a folder with instructions, document templates and possibly scripts. The agent only loads it when needed. Prompts are managed as a shared, versioned library." },
            { term: "Managing LLM calls", text: "Every model call goes through a gateway: model choice per need, quotas per team, cost tracking, logging. You can change models without touching the agents." },
          ],
        },
        {
          type: "code",
          caption: "Simplified example: an agent described in YAML, with one identity-propagation connection and one machine-to-machine connection.",
          text: AGENT_YAML_EN,
        },

        { type: "h", id: "identite", text: "4. Identity propagation or machine to machine?" },
        {
          type: "p",
          text: "This is the most structuring decision. MCP relies on OAuth 2.1 and defines two official extensions that match these two modes exactly.",
        },
        {
          type: "table",
          head: ["", "Identity propagation", "Machine to machine"],
          rows: [
            ["The agent acts…", "on behalf of the user", "with a service account"],
            ["What it sees", "only what the user may see", "everything the service account may see"],
            ["Controlled by", "the corporate directory (groups, roles, conditional access)", "the service account’s scope"],
            ["Use it for", "email, tickets, CRM, personal data", "references and documentation open to all"],
            ["In MCP", "“Enterprise-Managed Authorization” extension", "“Client Credentials” extension"],
          ],
        },

        { type: "h", id: "ajouts", text: "5. What we almost always add" },
        {
          type: "list",
          items: [
            "Single sign-on (SSO) and directory group sync, to give access to agents by team.",
            "A catalogue of agents and connectors, with approval before anything is published.",
            "An audit log: who used which agent, which tool, with which data.",
            "Human approval for sensitive actions, such as any write into a system.",
            "Adoption and cost tracking per team, with rebilling if needed.",
            "Knowledge bases that respect the original access rights.",
            "Guardrails against sensitive data leaks.",
            "Agent versions and evaluation before every update.",
          ],
        },

        { type: "h", id: "demarrer", text: "6. Where to start" },
        {
          type: "list",
          items: [
            "Choose the front end for your constraints: sovereignty, hosting, tools already in place.",
            "Start with three useful agents, on a narrow scope, for a pilot group.",
            "Connect two or three MCP servers, deciding for each: identity propagation or machine to machine.",
            "Route every model call through the gateway from day one.",
            "Measure usage and feedback, then widen the catalogue.",
          ],
        },
      ],
      sourcesLabel: "Further reading",
      sources: SOURCES,
    },
  },
  "ai-platform": {
    fr: {
      title: "AI Platform\u00a0: le socle commun qui permet à chaque équipe de construire ses agents",
      lead: "Sans plateforme, chaque équipe recommence tout : accès aux modèles, sécurité, garde-fous, suivi des coûts. Avec une plateforme, elle se concentre sur son métier et s’appuie sur des briques validées, partagées et gouvernées.",
      updated: "Mis à jour le 1er octobre 2026",
      summaryLabel: "En bref",
      summary: [
        "Une AI Platform regroupe ce que chaque équipe referait sinon de son côté : gateway de modèles, opérations, catalogue et gouvernance.",
        "Chaque équipe choisit son niveau d’autonomie : utiliser des agents existants, assembler les siens sur la plateforme, ou construire en autonomie en respectant les standards communs.",
        "Dasein aide à concevoir cette plateforme et son organisation : modèle fédéré, centre d’excellence et règles du jeu entre équipe plateforme et équipes métiers.",
      ],
      blocks: [
        { type: "h", id: "probleme", text: "1. Sans plateforme, chaque équipe recommence" },
        {
          type: "p",
          text: "Les premiers agents naissent souvent dans des équipes différentes, chacune avec ses outils. Au bout de quelques mois, les mêmes problèmes apparaissent partout :",
        },
        {
          type: "list",
          items: [
            "des clés d’accès aux modèles dispersées dans le code et les configurations ;",
            "des garde-fous réinventés par chaque équipe, avec des niveaux de sécurité inégaux ;",
            "des coûts invisibles jusqu’à la facture, impossibles à attribuer ;",
            "des agents et des outils introuvables, donc refaits ailleurs ;",
            "aucune vue d’ensemble pour la sécurité, l’audit ou la conformité.",
          ],
        },

        { type: "h", id: "blocs", text: "2. Une plateforme, quatre blocs" },
        {
          type: "p",
          text: "Une AI Platform met en commun ce qui n’a aucune raison d’être différent d’une équipe à l’autre. Les équipes gardent leur métier, leurs données et leurs choix ; la plateforme fournit le reste.",
        },
        { type: "diagram", variant: "platform" },
        {
          type: "defs",
          items: [
            { term: "Opérations", text: "Faire tourner les agents et les équipes : environnements d’exécution, sécurité et identité, arrivée d’une nouvelle équipe, suivi des coûts, observabilité et évaluation." },
            { term: "Catalogue", text: "Tout ce qui peut être réutilisé : agents, outils et serveurs MCP, workflows, prompts et skills, applications. Chaque élément a un propriétaire, une version et un statut de validation." },
            { term: "Gateway de modèles", text: "Un seul point d’accès à tous les modèles, propriétaires, open source ou adaptés à l’entreprise : routage selon le besoin, quotas et coûts par équipe." },
            { term: "Gouvernance et standards", text: "Les règles communes : garde-fous, politiques d’usage, frameworks et patterns recommandés, bonnes pratiques et assets réutilisables." },
          ],
        },

        { type: "h", id: "populations", text: "3. Trois populations, une plateforme" },
        {
          type: "p",
          text: "Une même plateforme sert trois publics, qui ne se posent pas la même question. Elle doit répondre aux trois à la fois.",
        },
        {
          type: "table",
          head: ["", "Consomme", "Assemble", "Gouverne"],
          rows: [
            ["Qui", "L’utilisateur métier", "Le porteur de cas d’usage", "L’équipe IT et plateforme"],
            ["Sa question", "« Est-ce que ça me fait gagner du temps au quotidien ? »", "« Est-ce que je peux monter mon cas d’usage sans coder ? »", "« Est-ce que je contrôle ce qui sort du SI ? »"],
            ["Ses besoins", "Parler à un agent en langage naturel, obtenir un résultat fiable et sourcé, produire des livrables professionnels", "Construire un agent pour son métier, tester, itérer, mesurer la valeur, passer en production quand ça marche", "Exposer les API en serveurs MCP et les gouverner, assurer sécurité, conformité et audit, opérer la plateforme"],
            ["Ses outils", "Front d’IA, Teams, Slack", "Studio d’agents, gateway LLM, gestion d’API", "VS Code, agents de code, MCP, ligne de commande"],
          ],
        },
        {
          type: "callout",
          text: "Une seule plateforme, trois portes d’entrée. La gouvernance IT ne freine pas les métiers : elle les protège.",
        },

        { type: "h", id: "niveaux", text: "4. Trois façons d’utiliser la plateforme" },
        {
          type: "p",
          text: "Toutes les équipes n’ont ni les mêmes besoins ni les mêmes compétences. Une bonne plateforme ne leur impose pas un modèle unique : elle propose plusieurs niveaux d’autonomie.",
        },
        {
          type: "table",
          head: ["Niveau", "L’équipe…", "La plateforme fournit…", "Typiquement"],
          rows: [
            ["Utiliser", "utilise des agents et des applications du catalogue, et expose ses données sous forme d’outils", "tout le reste", "Équipes métiers sans développeurs"],
            ["Assembler", "construit ses propres agents, outils et applications avec les briques de la plateforme, puis les publie au catalogue", "exécution, gateway, sécurité, observabilité, garde-fous, mémoire", "Équipes produit ou data avec quelques développeurs"],
            ["Construire en autonomie", "construit sa propre pile technique, indépendante du cœur de la plateforme", "les standards et la gouvernance à respecter, et le catalogue à alimenter", "Équipes d’ingénierie matures, besoins très spécifiques"],
          ],
        },
        {
          type: "callout",
          text: "Ce qui ne change pas, quel que soit le niveau : tout passe par le catalogue et respecte la gouvernance commune. C’est ce qui permet à une équipe de réutiliser l’agent d’une autre.",
        },

        { type: "h", id: "gateways", text: "5. Trois gateways, trois gouvernances" },
        {
          type: "p",
          text: "Tous les flux passent par une gateway, mais pas par la même. Appels aux modèles, appels aux outils et appels entre agents n’ont ni les mêmes contrats, ni les mêmes règles, ni la même maturité.",
        },
        { type: "diagram", variant: "gateways" },
        {
          type: "callout",
          text: "Pourquoi pas une seule brique ? Des contrats différents, des unités de gouvernance différentes, une observabilité différente et des maturités technologiques différentes. Les regrouper imposerait des compromis inacceptables.",
        },

        { type: "h", id: "federe", text: "6. Le modèle fédéré" },
        {
          type: "p",
          text: "Deux écueils guettent. Tout centraliser dans une équipe IA qui construit tout crée un goulot d’étranglement. Tout décentraliser recrée le chaos du départ. Le modèle fédéré partage les rôles : les équipes applicatives gardent leurs applications, leur orchestration et leurs données dans leur propre environnement ; l’équipe plateforme fournit et opère le socle commun.",
        },
        { type: "diagram", variant: "federated" },
        {
          type: "p",
          text: "Deux mondes, un contrat d’interface : les applications consomment les capacités de la plateforme via un contrat stable, sans connaître son organisation interne. Plusieurs équipes plateforme peuvent même coexister, dès lors qu’elles respectent le contrat commun défini par le centre d’excellence. L’autonomie locale accélère, la gouvernance centrale garantit la cohérence.",
        },
        {
          type: "table",
          head: ["", "Centralisé", "Décentralisé", "Fédéré"],
          rows: [
            ["Qui construit les agents", "Une équipe IA centrale", "Chaque équipe, seule", "Les équipes, sur un socle commun"],
            ["Point fort", "Cohérence, contrôle", "Vitesse, proximité du métier", "Les deux à la fois"],
            ["Risque", "Goulot d’étranglement", "Doublons, coûts, failles", "Demande une équipe plateforme solide"],
          ],
        },

        { type: "h", id: "coe", text: "7. Le centre d’excellence" },
        {
          type: "p",
          text: "À côté de l’équipe plateforme, un petit centre d’excellence porte les règles et le savoir-faire :",
        },
        {
          type: "list",
          items: [
            "définir les standards : frameworks, patterns, middlewares de contrôle validés ;",
            "valider les modèles avant leur mise à disposition ;",
            "porter le cadre d’IA responsable : usages autorisés, données sensibles, validation humaine ;",
            "produire des assets réutilisables : modèles d’agents, skills, prompts, exemples ;",
            "accompagner l’arrivée des équipes et mesurer l’adoption et la valeur.",
          ],
        },
        {
          type: "callout",
          text: "Un bon centre d’excellence outille plus qu’il ne contrôle : il rend le bon chemin plus facile que le mauvais.",
        },

        { type: "h", id: "protocoles", text: "8. Et MCP dans tout ça ?" },
        {
          type: "p",
          text: "MCP et A2A sont les prises standard qui relient les agents aux outils et aux autres agents. Ils facilitent la vie de la plateforme, mais ils n’en sont qu’une brique : c’est la plateforme qui décide quelles prises sont autorisées, pour qui, et sous quelles règles. Les contrôles se posent à deux endroits complémentaires : dans les gateways, pour tous les agents à la fois, et dans les middlewares de chaque agent, au plus près de ses décisions.",
        },
        {
          type: "related",
          href: "/articles/mcp",
          label: "Article",
          title: "MCP : le protocole, ses limites, et ce qu’il faut autour",
          text: "Ce que MCP apporte, ses cas d’usage, ses limites, les quatre schémas d’identité, les protocoles A2A et AG-UI, et les solutions du marché.",
        },

        { type: "h", id: "demarrer", text: "9. Par où commencer" },
        {
          type: "list",
          items: [
            "Mettre en place la gateway de modèles : un seul point d’accès, avec le suivi des coûts par équipe dès le premier jour.",
            "Ouvrir un catalogue minimal : quelques agents, outils et prompts validés, avec un propriétaire chacun.",
            "Brancher l’observabilité centrale et l’évaluation.",
            "Embarquer une équipe pilote au niveau « utiliser » ou « assembler », puis industrialiser l’arrivée des suivantes.",
            "Formaliser un centre d’excellence léger : standards, validation des modèles, IA responsable.",
          ],
        },
      ],
      sourcesLabel: "Pour aller plus loin",
      sources: PLATFORM_SOURCES,
    },
    en: {
      title: "AI Platform: the shared foundation that lets every team build its agents",
      lead: "Without a platform, every team starts from scratch: model access, security, guardrails, cost tracking. With a platform, it focuses on its business and relies on approved, shared and governed building blocks.",
      updated: "Updated 1 October 2026",
      summaryLabel: "In short",
      summary: [
        "An AI Platform pools what each team would otherwise rebuild on its own: model gateway, operations, catalogue and governance.",
        "Each team picks its level of autonomy: use existing agents, assemble its own on the platform, or build independently while following shared standards.",
        "Dasein helps design this platform and its organisation: federated model, centre of excellence and ground rules between the platform team and business teams.",
      ],
      blocks: [
        { type: "h", id: "probleme", text: "1. Without a platform, every team starts over" },
        {
          type: "p",
          text: "The first agents often appear in different teams, each with its own tools. After a few months, the same problems show up everywhere:",
        },
        {
          type: "list",
          items: [
            "model access keys scattered across code and configuration;",
            "guardrails reinvented by each team, with uneven security levels;",
            "costs invisible until the invoice, impossible to attribute;",
            "agents and tools nobody can find, so they get rebuilt elsewhere;",
            "no overall view for security, audit or compliance.",
          ],
        },

        { type: "h", id: "blocs", text: "2. One platform, four blocks" },
        {
          type: "p",
          text: "An AI Platform pools whatever has no reason to differ from one team to the next. Teams keep their business, their data and their choices; the platform provides the rest.",
        },
        { type: "diagram", variant: "platform" },
        {
          type: "defs",
          items: [
            { term: "Operations", text: "Running agents and teams: runtime environments, security and identity, onboarding a new team, cost tracking, observability and evaluation." },
            { term: "Catalogue", text: "Everything reusable: agents, tools and MCP servers, workflows, prompts and skills, applications. Each item has an owner, a version and an approval status." },
            { term: "Model gateway", text: "A single access point to every model, proprietary, open source or customised: routing by need, quotas and cost per team." },
            { term: "Governance and standards", text: "The shared rules: guardrails, usage policies, recommended frameworks and patterns, best practices and reusable assets." },
          ],
        },

        { type: "h", id: "populations", text: "3. Three audiences, one platform" },
        {
          type: "p",
          text: "One platform serves three audiences, each asking a different question. It has to answer all three at once.",
        },
        {
          type: "table",
          head: ["", "Consumes", "Assembles", "Governs"],
          rows: [
            ["Who", "The business user", "The use-case owner", "The IT and platform team"],
            ["Their question", "“Does it save me time every day?”", "“Can I build my use case without coding?”", "“Do I control what leaves the information system?”"],
            ["Their needs", "Talk to an agent in natural language, get a reliable, sourced result, produce professional deliverables", "Build an agent for their business, test, iterate, measure value, go to production when it works", "Expose APIs as MCP servers and govern them, ensure security, compliance and audit, run the platform"],
            ["Their tools", "AI front end, Teams, Slack", "Agent studio, LLM gateway, API management", "VS Code, coding agents, MCP, command line"],
          ],
        },
        {
          type: "callout",
          text: "One platform, three entry points. IT governance does not slow business teams down: it protects them.",
        },

        { type: "h", id: "niveaux", text: "4. Three ways to use the platform" },
        {
          type: "p",
          text: "Teams have neither the same needs nor the same skills. A good platform does not force one model on them: it offers several levels of autonomy.",
        },
        {
          type: "table",
          head: ["Level", "The team…", "The platform provides…", "Typically"],
          rows: [
            ["Use", "uses agents and applications from the catalogue, and exposes its data as tools", "everything else", "Business teams without developers"],
            ["Assemble", "builds its own agents, tools and applications with the platform’s building blocks, then publishes them to the catalogue", "runtime, gateway, security, observability, guardrails, memory", "Product or data teams with a few developers"],
            ["Build independently", "builds its own technical stack, independent of the platform core", "the standards and governance to follow, and the catalogue to feed", "Mature engineering teams, very specific needs"],
          ],
        },
        {
          type: "callout",
          text: "What stays the same at every level: everything goes through the catalogue and follows the shared governance. That is what lets one team reuse another team’s agent.",
        },

        { type: "h", id: "gateways", text: "5. Three gateways, three governances" },
        {
          type: "p",
          text: "Every flow goes through a gateway, but not the same one. Model calls, tool calls and agent-to-agent calls have neither the same contracts, nor the same rules, nor the same maturity.",
        },
        { type: "diagram", variant: "gateways" },
        {
          type: "callout",
          text: "Why not a single component? Different contracts, different governance units, different observability and different technology maturity. Merging them would force unacceptable trade-offs.",
        },

        { type: "h", id: "federe", text: "6. The federated model" },
        {
          type: "p",
          text: "Two traps lie in wait. Centralising everything in one AI team that builds it all creates a bottleneck. Decentralising everything brings back the initial chaos. The federated model splits the roles: application teams keep their applications, orchestration and data in their own environment; the platform team provides and runs the shared foundation.",
        },
        { type: "diagram", variant: "federated" },
        {
          type: "p",
          text: "Two worlds, one interface contract: applications consume the platform’s capabilities through a stable contract, without knowing its internal layout. Several platform teams can even coexist, as long as they follow the shared contract set by the centre of excellence. Local autonomy speeds things up; central governance keeps them consistent.",
        },
        {
          type: "table",
          head: ["", "Centralised", "Decentralised", "Federated"],
          rows: [
            ["Who builds the agents", "One central AI team", "Each team, alone", "The teams, on a shared foundation"],
            ["Strength", "Consistency, control", "Speed, close to the business", "Both at once"],
            ["Risk", "Bottleneck", "Duplicates, cost, security gaps", "Needs a solid platform team"],
          ],
        },

        { type: "h", id: "coe", text: "7. The centre of excellence" },
        {
          type: "p",
          text: "Next to the platform team, a small centre of excellence carries the rules and the know-how:",
        },
        {
          type: "list",
          items: [
            "set the standards: frameworks, patterns, approved control middleware;",
            "approve models before they are made available;",
            "own the responsible AI framework: allowed uses, sensitive data, human approval;",
            "produce reusable assets: agent templates, skills, prompts, examples;",
            "support team onboarding and measure adoption and value.",
          ],
        },
        {
          type: "callout",
          text: "A good centre of excellence equips more than it polices: it makes the right path easier than the wrong one.",
        },

        { type: "h", id: "protocoles", text: "8. Where does MCP fit?" },
        {
          type: "p",
          text: "MCP and A2A are the standard plugs connecting agents to tools and to other agents. They make the platform’s life easier, but they are only one building block: the platform decides which plugs are allowed, for whom, and under which rules. Controls sit in two complementary places: in the gateways, for every agent at once, and in each agent’s middleware, closest to its decisions.",
        },
        {
          type: "related",
          href: "/articles/mcp",
          label: "Article",
          title: "MCP: the protocol, its limits, and what it needs around it",
          text: "What MCP brings, its use cases, its limits, the four identity patterns, the A2A and AG-UI protocols, and the solutions on the market.",
        },

        { type: "h", id: "demarrer", text: "9. Where to start" },
        {
          type: "list",
          items: [
            "Set up the model gateway: one access point, with cost tracking per team from day one.",
            "Open a minimal catalogue: a few approved agents, tools and prompts, each with an owner.",
            "Plug in central observability and evaluation.",
            "Onboard a pilot team at the “use” or “assemble” level, then industrialise onboarding for the next ones.",
            "Set up a light centre of excellence: standards, model approval, responsible AI.",
          ],
        },
      ],
      sourcesLabel: "Further reading",
      sources: PLATFORM_SOURCES,
    },
  },
  "business-applications": {
    fr: {
      title: "Business Applications\u00a0: des agents qui travaillent dans vos processus, sous contrôle",
      lead: "Un agent métier commence petit : une tâche, quelques outils. Le piège, c’est de lui en ajouter jusqu’à ce qu’il ne s’y retrouve plus. La réponse : des agents spécialisés, coordonnés et isolés.",
      updated: "Mis à jour le 1er octobre 2026",
      summaryLabel: "En bref",
      summary: [
        "Un agent unique qui accumule les outils devient fragile, confus et coûteux.",
        "L’approche qui se généralise : un agent principal qui planifie, prend des notes et délègue à des sous-agents, comme Deep Agents de LangChain.",
        "Les contrôles se branchent sur la boucle de l’agent, via des middlewares et des hooks : validation humaine, masquage des données, plafonds, journal. Dasein aide à les concevoir et à les mettre en place.",
      ],
      blocks: [
        { type: "h", id: "petit", text: "1. Un agent commence petit" },
        {
          type: "p",
          text: "Prenons la comptabilité fournisseurs. Un premier agent lit les factures, les rapproche des bons de commande, signale les écarts et propose une validation. Quatre outils, un périmètre clair, un résultat facile à vérifier : c’est un bon départ.",
        },
        {
          type: "p",
          text: "Puis viennent les demandes : gérer les litiges, relancer les fournisseurs, consulter les paiements, appliquer la politique achats, produire le reporting. Chaque ajout est raisonnable. Leur somme ne l’est plus.",
        },
        {
          type: "code",
          caption: "Exemple simplifié : un agent qui a grandi un outil à la fois.",
          text: INVOICE_AGENT_FR,
        },

        { type: "h", id: "trop", text: "2. Quand un seul agent en fait trop" },
        {
          type: "defs",
          items: [
            { term: "Il devient fragile", text: "Les instructions s’allongent pour limiter les erreurs, chaque petit changement oblige à tout retester, et plus personne n’ose y toucher." },
            { term: "Il se trompe", text: "Il appelle le mauvais outil, lui passe les mauvais paramètres, et répond différemment à la même question." },
            { term: "Il coûte plus cher", text: "Il lui faut les modèles les plus puissants, ses instructions grossissent à chaque appel et il recommence des étapes. Selon Anthropic, 58 outils occupent à eux seuls environ 55 000 tokens avant la première question." },
          ],
        },

        { type: "h", id: "decouper", text: "3. Découper en agents spécialisés" },
        {
          type: "p",
          text: "La réponse est la même qu’en logiciel : découper. Un agent pour les factures, un pour les litiges, un pour les paiements. Chacun a peu d’outils, des instructions courtes et des droits limités à son domaine.",
        },
        {
          type: "list",
          items: [
            "Chaque agent est plus simple à écrire, à tester et à faire évoluer.",
            "Chaque agent est plus fiable : il a moins de choix possibles, donc moins d’occasions de se tromper.",
            "Les tâches indépendantes peuvent tourner en parallèle, ce qui raccourcit les délais.",
          ],
        },
        {
          type: "callout",
          text: "Ce n’est pas gratuit. Anthropic mesure qu’un système multi-agents consomme environ 15 fois plus de tokens qu’une simple conversation. Leur conseil : chercher la solution la plus simple possible, et n’ajouter de la complexité que lorsqu’elle est nécessaire.",
        },

        { type: "h", id: "deep-agents", text: "4. Un agent principal qui planifie et délègue" },
        {
          type: "p",
          text: "Découper en agents indépendants a un défaut : chacun ne voit qu’une partie du contexte, et leurs décisions peuvent se contredire. D’où l’approche qui se généralise depuis 2025, popularisée par Deep Agents de LangChain et inspirée de Claude Code, Manus ou Deep Research : un agent principal garde la main sur le contexte et s’appuie sur quatre ingrédients.",
        },
        {
          type: "defs",
          items: [
            { term: "Des instructions détaillées", text: "Un prompt système long et précis, qui décrit le métier, les étapes attendues et les règles à respecter." },
            { term: "Un plan", text: "Une liste de tâches que l’agent tient à jour : elle l’oblige à structurer son travail et permet de suivre où il en est." },
            { term: "Un espace de notes", text: "Un système de fichiers où l’agent dépose les résultats intermédiaires, au lieu de tout garder dans sa mémoire de travail." },
            { term: "Des sous-agents", text: "Des tâches précises confiées à des sous-agents au contexte isolé ; ils rendent un résultat, l’agent principal décide." },
          ],
        },
        {
          type: "callout",
          text: "Le principe : une seule tête qui décide, des mains qui exécutent. On garde les avantages du découpage sans perdre le fil du contexte.",
        },

        { type: "h", id: "modeles", text: "5. Les modèles de coordination" },
        {
          type: "p",
          text: "L’agent principal qui délègue est une forme de superviseur. Mais selon le processus, d’autres façons de faire travailler des agents ensemble restent pertinentes. Les frameworks et les éditeurs utilisent des noms différents, mais on retrouve partout les mêmes familles.",
        },
        { type: "diagram", variant: "patterns" },
        {
          type: "table",
          head: ["Modèle", "Principe", "Quand l’utiliser", "Point de vigilance"],
          rows: [
            ["Workflow", "Des étapes fixes, définies à l’avance ; les tâches indépendantes tournent en parallèle.", "Processus connu et répétitif : rapprochement, contrôle, clôture.", "Rigide face aux cas imprévus."],
            ["Superviseur", "Un agent reçoit la demande et appelle des agents spécialisés comme des outils.", "Demandes variées dans un même domaine.", "Le superviseur doit bien connaître chaque agent ; c’est un point de passage unique."],
            ["Hiérarchique", "Un agent planificateur découpe la demande et confie chaque partie à un superviseur de domaine.", "Processus qui traversent plusieurs services.", "Les délais et les coûts s’additionnent à chaque niveau."],
            ["Graphe", "Des agents reliés par des transitions explicites ; le modèle choisit la branche, avec des allers-retours possibles.", "Processus avec embranchements : contrôle, correction, nouvelle vérification.", "Borner les boucles pour éviter qu’elles tournent sans fin."],
            ["Essaim", "Des agents qui se passent la main d’eux-mêmes, avec une mémoire partagée.", "Recherche ouverte, exploration d’un problème mal défini.", "Le moins prévisible : la traçabilité est indispensable."],
          ],
        },
        {
          type: "p",
          text: "Dans la vraie vie, on les combine : un workflow pour la colonne vertébrale du processus, un superviseur à l’étape qui demande du jugement, et une validation humaine avant toute écriture.",
        },

        { type: "h", id: "middleware", text: "6. Middlewares et hooks : là où se branche la gouvernance" },
        {
          type: "p",
          text: "Un agent tourne en boucle : il interroge le modèle, appelle un outil, relit le résultat, recommence. Les frameworks récents permettent d’intervenir à chaque étape de cette boucle, sans toucher au cœur de l’agent : ce sont les middlewares et les hooks. C’est là que se posent les contrôles.",
        },
        { type: "diagram", variant: "hooks" },
        {
          type: "table",
          head: ["Moment", "Ce qu’on y branche"],
          rows: [
            ["Avant l’agent", "Vérifier la demande et les droits de l’utilisateur, charger le bon contexte."],
            ["Avant chaque appel au modèle", "Masquer les données personnelles, résumer un contexte trop long, choisir les outils utiles."],
            ["Autour de l’appel au modèle", "Plafond d’appels, nouvelle tentative, repli sur un autre modèle en cas d’erreur."],
            ["Autour de chaque appel d’outil", "Validation humaine avant une écriture, contrôle des droits, plafond d’appels, blocage ou correction des paramètres."],
            ["Après l’agent", "Journaliser l’exécution, évaluer la réponse, déclencher une revue."],
          ],
        },
        {
          type: "p",
          text: "Le modèle est désormais le même chez tous les grands acteurs, sous des noms différents :",
        },
        {
          type: "table",
          head: ["Framework", "Mécanisme"],
          rows: [
            ["LangChain et Deep Agents", "Middlewares (avant et après l’agent ou le modèle, autour des appels au modèle et aux outils), dont des middlewares prêts à l’emploi : validation humaine, données personnelles, plafonds, repli de modèle, résumé du contexte"],
            ["Claude Agent SDK (Anthropic)", "Hooks : avant et après chaque outil (pour autoriser, refuser, demander ou modifier), à l’envoi d’une demande, à l’arrêt d’un sous-agent"],
            ["OpenAI Agents SDK", "Garde-fous d’entrée, de sortie et d’outil qui stoppent l’exécution, et hooks de cycle de vie"],
            ["Strands Agents (AWS)", "Hooks, par exemple avant un appel d’outil pour l’annuler ou en réécrire les paramètres"],
            ["Google ADK", "Callbacks avant et après l’agent, le modèle et chaque outil"],
          ],
        },
        {
          type: "callout",
          text: "La gouvernance devient du code : une même bibliothèque de middlewares validés, réutilisée par tous les agents, plutôt que des règles réécrites dans chaque prompt.",
        },

        { type: "h", id: "briques", text: "7. Ce que nous construisons" },
        {
          type: "defs",
          items: [
            { term: "Agents autonomes", text: "Des agents qui enchaînent plusieurs étapes d’un processus : lire, analyser, préparer, mettre à jour, en s’arrêtant aux points de validation." },
            { term: "Talk to my data", text: "Poser des questions en langage courant sur les données de l’entreprise (Snowflake, Databricks, applications métiers) et obtenir des réponses chiffrées, sourcées, dans la limite des droits de chacun." },
            { term: "Aide à la décision", text: "Des recommandations argumentées, avec leurs sources et leur niveau de confiance, prêtes à être validées par un expert." },
            { term: "Isolation des runtimes", text: "Chaque agent s’exécute dans son propre environnement, avec ses propres droits : une erreur ou un abus reste contenu dans son périmètre." },
            { term: "Connecteurs métiers", text: "ERP, CRM, ITSM, outils financiers : les agents agissent dans les applications existantes, via des serveurs MCP gouvernés par l’AI Platform." },
          ],
        },

        { type: "h", id: "garde-fous", text: "8. Les garde-fous propres aux agents métiers" },
        {
          type: "list",
          items: [
            "Des droits limités au domaine de chaque agent, jamais un compte « qui peut tout faire ».",
            "Une validation humaine avant toute écriture dans un système de gestion.",
            "Des sources de référence validées et versionnées : politiques, barèmes, procédures.",
            "Une trace complète de chaque exécution : quelles données, quels outils, quelle décision.",
            "Une évaluation sur des cas réels avant chaque mise à jour d’un agent ou d’un modèle.",
            "Un plafond de coûts par agent et par processus.",
            "La possibilité de suspendre un agent en une seule opération.",
          ],
        },

        { type: "h", id: "demarrer", text: "9. Par où commencer" },
        {
          type: "list",
          items: [
            "Choisir un processus fréquent, mesurable, où l’erreur se détecte facilement.",
            "Commencer par un seul agent, avec peu d’outils, en lecture seule.",
            "Brancher dès le départ les middlewares de contrôle : validation humaine, données personnelles, plafonds, journal.",
            "Quand l’agent grossit, passer à un agent principal qui planifie et délègue à des sous-agents.",
            "Choisir le modèle de coordination le plus simple qui fonctionne, souvent un workflow.",
            "Ajouter l’écriture dans les systèmes seulement après validation humaine et mesure de la qualité.",
          ],
        },
      ],
      sourcesLabel: "Pour aller plus loin",
      sources: BUSINESS_SOURCES,
    },
    en: {
      title: "Business Applications: agents that work inside your processes, under control",
      lead: "A business agent starts small: one task, a few tools. The trap is to keep adding until it gets lost. The answer: specialised agents, coordinated and isolated.",
      updated: "Updated 1 October 2026",
      summaryLabel: "In short",
      summary: [
        "A single agent that keeps accumulating tools becomes fragile, confused and costly.",
        "The approach becoming widespread: a main agent that plans, takes notes and delegates to subagents, as in LangChain’s Deep Agents.",
        "Controls plug into the agent loop through middleware and hooks: human approval, data masking, caps, logging. Dasein helps design them and put them in place.",
      ],
      blocks: [
        { type: "h", id: "petit", text: "1. An agent starts small" },
        {
          type: "p",
          text: "Take accounts payable. A first agent reads invoices, matches them to purchase orders, flags discrepancies and proposes an approval. Four tools, a clear scope, an easy-to-check result: a good start.",
        },
        {
          type: "p",
          text: "Then the requests come: handle disputes, chase suppliers, check payments, apply the purchasing policy, produce the reporting. Each addition is reasonable. Their sum is not.",
        },
        {
          type: "code",
          caption: "Simplified example: an agent that grew one tool at a time.",
          text: INVOICE_AGENT_EN,
        },

        { type: "h", id: "trop", text: "2. When one agent does too much" },
        {
          type: "defs",
          items: [
            { term: "It becomes fragile", text: "Instructions grow longer to limit errors, every small change means retesting everything, and nobody dares touch it any more." },
            { term: "It makes mistakes", text: "It calls the wrong tool, passes the wrong parameters, and answers the same question differently." },
            { term: "It costs more", text: "It needs the most powerful models, its instructions grow with every call and it repeats steps. According to Anthropic, 58 tools alone take about 55,000 tokens before the first question." },
          ],
        },

        { type: "h", id: "decouper", text: "3. Split into specialised agents" },
        {
          type: "p",
          text: "The answer is the same as in software: split. One agent for invoices, one for disputes, one for payments. Each has few tools, short instructions and rights limited to its domain.",
        },
        {
          type: "list",
          items: [
            "Each agent is simpler to write, test and evolve.",
            "Each agent is more reliable: fewer possible choices, fewer chances to go wrong.",
            "Independent tasks can run in parallel, which shortens lead times.",
          ],
        },
        {
          type: "callout",
          text: "It is not free. Anthropic measures that a multi-agent system uses about 15 times more tokens than a simple chat. Their advice: find the simplest solution possible, and only add complexity when it is needed.",
        },

        { type: "h", id: "deep-agents", text: "4. A main agent that plans and delegates" },
        {
          type: "p",
          text: "Splitting into independent agents has a flaw: each sees only part of the context, and their decisions can conflict. Hence the approach spreading since 2025, popularised by LangChain’s Deep Agents and inspired by Claude Code, Manus and Deep Research: a main agent keeps control of the context and relies on four ingredients.",
        },
        {
          type: "defs",
          items: [
            { term: "Detailed instructions", text: "A long, precise system prompt describing the business, the expected steps and the rules to follow." },
            { term: "A plan", text: "A task list the agent keeps up to date: it forces structure and shows where the agent stands." },
            { term: "A notes space", text: "A file system where the agent stores intermediate results, instead of keeping everything in its working memory." },
            { term: "Subagents", text: "Precise tasks handed to subagents with isolated context; they return a result, the main agent decides." },
          ],
        },
        {
          type: "callout",
          text: "The principle: one head that decides, hands that execute. You keep the benefits of splitting without losing the thread of the context.",
        },

        { type: "h", id: "modeles", text: "5. Coordination patterns" },
        {
          type: "p",
          text: "A main agent that delegates is a form of supervisor. But depending on the process, other ways of making agents work together remain relevant. Frameworks and vendors use different names, but the same families appear everywhere.",
        },
        { type: "diagram", variant: "patterns" },
        {
          type: "table",
          head: ["Pattern", "Principle", "When to use it", "Watch out for"],
          rows: [
            ["Workflow", "Fixed steps defined in advance; independent tasks run in parallel.", "Known, repetitive process: matching, checks, closing.", "Rigid when facing unforeseen cases."],
            ["Supervisor", "One agent receives the request and calls specialised agents as tools.", "Varied requests within one domain.", "The supervisor must know each agent well; it is a single checkpoint."],
            ["Hierarchical", "A planner agent splits the request and hands each part to a domain supervisor.", "Processes spanning several departments.", "Delays and costs add up at each level."],
            ["Graph", "Agents linked by explicit transitions; the model picks the branch, with loops allowed.", "Processes with branches: check, correct, re-check.", "Bound the loops so they cannot run forever."],
            ["Swarm", "Agents hand off to each other on their own, with shared memory.", "Open research, exploring an ill-defined problem.", "The least predictable: traceability is essential."],
          ],
        },
        {
          type: "p",
          text: "In real life you combine them: a workflow for the backbone of the process, a supervisor at the step that needs judgement, and human approval before any write.",
        },

        { type: "h", id: "middleware", text: "6. Middleware and hooks: where governance plugs in" },
        {
          type: "p",
          text: "An agent runs in a loop: it queries the model, calls a tool, reads the result, starts again. Recent frameworks let you step in at each point of that loop without touching the agent’s core: that is middleware and hooks. This is where controls belong.",
        },
        { type: "diagram", variant: "hooks" },
        {
          type: "table",
          head: ["When", "What we plug in"],
          rows: [
            ["Before the agent", "Check the request and the user’s rights, load the right context."],
            ["Before each model call", "Mask personal data, summarise an overlong context, pick the useful tools."],
            ["Around the model call", "Call cap, retry, fallback to another model on error."],
            ["Around each tool call", "Human approval before a write, rights check, call cap, block or fix parameters."],
            ["After the agent", "Log the run, evaluate the answer, trigger a review."],
          ],
        },
        {
          type: "p",
          text: "The pattern is now the same at every major player, under different names:",
        },
        {
          type: "table",
          head: ["Framework", "Mechanism"],
          rows: [
            ["LangChain and Deep Agents", "Middleware (before and after the agent or model, around model and tool calls), including ready-made ones: human approval, personal data, caps, model fallback, context summarisation"],
            ["Claude Agent SDK (Anthropic)", "Hooks: before and after each tool (to allow, deny, ask or modify), on prompt submit, when a subagent stops"],
            ["OpenAI Agents SDK", "Input, output and tool guardrails that stop the run, plus lifecycle hooks"],
            ["Strands Agents (AWS)", "Hooks, for example before a tool call to cancel it or rewrite its parameters"],
            ["Google ADK", "Callbacks before and after the agent, the model and each tool"],
          ],
        },
        {
          type: "callout",
          text: "Governance becomes code: one library of approved middleware, reused by every agent, rather than rules rewritten in each prompt.",
        },

        { type: "h", id: "briques", text: "7. What we build" },
        {
          type: "defs",
          items: [
            { term: "Autonomous agents", text: "Agents that chain several steps of a process: read, analyse, prepare, update, stopping at approval points." },
            { term: "Talk to my data", text: "Ask questions in everyday language about company data (Snowflake, Databricks, business applications) and get quantified, sourced answers, within each person’s rights." },
            { term: "Decision support", text: "Reasoned recommendations, with their sources and confidence level, ready for an expert to approve." },
            { term: "Runtime isolation", text: "Each agent runs in its own environment, with its own rights: an error or misuse stays contained within its scope." },
            { term: "Business connectors", text: "ERP, CRM, ITSM, finance tools: agents act inside existing applications, through MCP servers governed by the AI Platform." },
          ],
        },

        { type: "h", id: "garde-fous", text: "8. Guardrails specific to business agents" },
        {
          type: "list",
          items: [
            "Rights limited to each agent’s domain, never an account that “can do everything”.",
            "Human approval before any write into a system of record.",
            "Approved, versioned reference sources: policies, price lists, procedures.",
            "A full trace of every run: which data, which tools, which decision.",
            "Evaluation on real cases before every update of an agent or a model.",
            "A cost cap per agent and per process.",
            "The ability to suspend an agent in a single operation.",
          ],
        },

        { type: "h", id: "demarrer", text: "9. Where to start" },
        {
          type: "list",
          items: [
            "Pick a frequent, measurable process where errors are easy to spot.",
            "Start with a single agent, few tools, read-only.",
            "Plug in the control middleware from day one: human approval, personal data, caps, logging.",
            "When the agent grows, move to a main agent that plans and delegates to subagents.",
            "Choose the simplest coordination pattern that works, often a workflow.",
            "Add writes into systems only after human approval and quality measurement.",
          ],
        },
      ],
      sourcesLabel: "Further reading",
      sources: BUSINESS_SOURCES,
    },
  },
};
