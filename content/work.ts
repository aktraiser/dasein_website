import type { Locale } from "@/lib/i18n";

/**
 * Work / cases.
 * Add an entry here to publish a new case. Cases can stay anonymised
 * (`confidential: true`) when the mission is under NDA.
 */
export type Case = {
  slug: string;
  domain: "Data & Knowledge" | "AI & Models" | "Agents & Automation" | "AI Infrastructure";
  /** Agentic vertical (see `verticals` in the dictionaries); omit for cross-cutting foundations. */
  vertical?: "end-users" | "business" | "it";
  /** Index in `verticals.patterns`: 0 augmented assistant … 4 multi-agent orchestration. */
  pattern?: 0 | 1 | 2 | 3 | 4;
  confidential: boolean;
  /** Shown in the header's Work menu. */
  featured?: boolean;
  stack: string[];
  content: Record<Locale, { title: string; problem: string; build: string }>;
};

export const cases: Case[] = [
  {
    slug: "group-ai-architecture",
    featured: true,
    domain: "AI Infrastructure",
    confidential: true,
    stack: ["Azure AI Foundry", "AWS Bedrock", "LLM gateway", "Entra ID"],
    content: {
      en: {
        title: "AI architecture at group scale",
        problem: "Dozens of AI initiatives across business units, each with its own models, keys and data access — no shared control, no view on cost or risk.",
        build: "A group-level reference architecture: shared LLM gateway, model catalogue, identity and permission model, and a path from experiment to production.",
      },
      fr: {
        title: "Architecture IA à l’échelle d’un groupe",
        problem: "Des dizaines d’initiatives IA dans les filiales, chacune avec ses modèles, ses clés et ses accès data — sans contrôle partagé ni visibilité sur les coûts et les risques.",
        build: "Une architecture de référence groupe : LLM gateway mutualisée, catalogue de modèles, modèle d’identité et de permissions, et un chemin de l’expérimentation à la production.",
      },
    },
  },
  {
    slug: "data-ai-platform",
    domain: "Data & Knowledge",
    confidential: true,
    stack: ["Databricks", "Snowflake", "dbt", "Kafka"],
    content: {
      en: {
        title: "Data & AI platform",
        problem: "Data spread across legacy warehouses and operational systems, unusable as-is by AI teams.",
        build: "A platform that ingests, historises and exposes data for analytics and AI alike — with lineage, quality checks and governed access.",
      },
      fr: {
        title: "Plateforme Data & AI",
        problem: "Des données dispersées entre entrepôts historiques et systèmes opérationnels, inexploitables en l’état par les équipes IA.",
        build: "Une plateforme qui ingère, historise et expose la donnée à la fois pour l’analytique et l’IA — avec lignage, contrôles qualité et accès gouvernés.",
      },
    },
  },
  {
    slug: "corpus-rag-at-scale",
    featured: true,
    domain: "Data & Knowledge",
    vertical: "end-users",
    pattern: 1,
    confidential: true,
    stack: ["PostgreSQL", "pgvector", "Qdrant", "Mistral AI"],
    content: {
      en: {
        title: "Business corpus & RAG at scale",
        problem: "Hundreds of thousands of heterogeneous documents — contracts, procedures, technical notes — and answers that must be sourced and exact.",
        build: "Corpus construction, document processing, metadata, hybrid search and a RAG pipeline with evaluation sets to measure answer quality over time.",
      },
      fr: {
        title: "Corpus métier & RAG à grande échelle",
        problem: "Des centaines de milliers de documents hétérogènes — contrats, procédures, notes techniques — et des réponses qui doivent être sourcées et exactes.",
        build: "Constitution du corpus, traitement documentaire, métadonnées, recherche hybride et pipeline RAG avec jeux d’évaluation pour mesurer la qualité dans le temps.",
      },
    },
  },
  {
    slug: "memory-historisation",
    domain: "Data & Knowledge",
    confidential: true,
    stack: ["Cassandra", "PostgreSQL", "Event streaming"],
    content: {
      en: {
        title: "Historisation & memory",
        problem: "AI systems that forget: no history of past decisions, interactions or state changes to reason on.",
        build: "Historised data models and a memory layer — short-term, long-term, shared — that agents can read and write under control.",
      },
      fr: {
        title: "Historisation & mémoire",
        problem: "Des systèmes IA qui oublient : aucun historique des décisions, interactions ou changements d’état sur lequel raisonner.",
        build: "Des modèles de données historisés et une couche mémoire — court terme, long terme, partagée — que les agents lisent et écrivent sous contrôle.",
      },
    },
  },
  {
    slug: "agents-servicenow",
    featured: true,
    domain: "Agents & Automation",
    vertical: "business",
    pattern: 2,
    confidential: true,
    stack: ["ServiceNow", "MCP", "Anthropic", "Internal APIs"],
    content: {
      en: {
        title: "Agents connected to the information system",
        problem: "Support and operations teams switching between ServiceNow, internal tools and documentation to handle every request.",
        build: "Agents that read context, query internal APIs and act in ServiceNow through MCP tools — with scoped permissions and human approval on sensitive actions.",
      },
      fr: {
        title: "Agents connectés au SI",
        problem: "Des équipes support et opérations qui jonglent entre ServiceNow, outils internes et documentation pour traiter chaque demande.",
        build: "Des agents qui lisent le contexte, interrogent les API internes et agissent dans ServiceNow via des outils MCP — avec des permissions limitées et une validation humaine sur les actions sensibles.",
      },
    },
  },
  {
    slug: "ai-on-warehouse-data",
    domain: "AI & Models",
    vertical: "business",
    pattern: 1,
    confidential: true,
    stack: ["Snowflake Cortex", "Databricks", "OpenAI", "Semantic layer"],
    content: {
      en: {
        title: "AI on Snowflake & Databricks data",
        problem: "Valuable structured data locked behind SQL and dashboards, out of reach for business users and AI systems.",
        build: "A semantic layer and governed tools that let models query warehouse data safely, with row-level security preserved end to end.",
      },
      fr: {
        title: "IA sur les données Snowflake & Databricks",
        problem: "Une donnée structurée précieuse enfermée derrière du SQL et des dashboards, hors de portée des métiers et des systèmes IA.",
        build: "Une couche sémantique et des outils gouvernés qui permettent aux modèles d’interroger l’entrepôt en sécurité, avec une sécurité ligne à ligne préservée de bout en bout.",
      },
    },
  },
  {
    slug: "agentic-platform-security",
    domain: "AI Infrastructure",
    confidential: true,
    stack: ["Kubernetes", "Agent runtime", "MCP registry", "OPA"],
    content: {
      en: {
        title: "Agentic platform & tool security",
        problem: "Teams building agents in isolation, with tools exposed without identity, permissions or audit.",
        build: "A shared agent runtime with registries for agents, skills, prompts and MCP servers — plus identity, policy enforcement and full traceability of tool calls.",
      },
      fr: {
        title: "Plateforme agentique & sécurité des outils",
        problem: "Des équipes qui construisent des agents chacune de leur côté, avec des outils exposés sans identité, permissions ni audit.",
        build: "Un runtime d’agents mutualisé avec registries d’agents, skills, prompts et serveurs MCP — plus identité, application des politiques et traçabilité complète des appels d’outils.",
      },
    },
  },
  {
    slug: "llm-infra-multicloud",
    domain: "AI Infrastructure",
    confidential: true,
    stack: ["AWS", "Azure", "GCP", "OpenTelemetry"],
    content: {
      en: {
        title: "LLM infrastructure across clouds",
        problem: "Models consumed from several clouds and providers with no common routing, quota, cost or quality view.",
        build: "A multi-cloud LLM gateway with routing, fallbacks, observability and evaluation — the basis for governance at scale.",
      },
      fr: {
        title: "Infrastructure LLM multi-cloud",
        problem: "Des modèles consommés depuis plusieurs clouds et fournisseurs, sans routage, quotas, vision des coûts ni de la qualité communs.",
        build: "Une LLM gateway multi-cloud avec routage, fallbacks, observabilité et évaluation — la base d’une gouvernance à l’échelle.",
      },
    },
  },
  {
    slug: "process-automation",
    domain: "Agents & Automation",
    vertical: "business",
    pattern: 4,
    confidential: true,
    stack: ["Multi-agent", "Workflow engine", "ERP", "CRM"],
    content: {
      en: {
        title: "Business process automation",
        problem: "Document-heavy processes — claims, onboarding, procurement — handled manually across ERP, CRM and email.",
        build: "Multi-agent workflows that extract, check, decide and update business systems, with humans in the loop where judgement is needed.",
      },
      fr: {
        title: "Automatisation de processus métiers",
        problem: "Des processus très documentaires — sinistres, onboarding, achats — traités à la main entre ERP, CRM et emails.",
        build: "Des workflows multi-agents qui extraient, vérifient, décident et mettent à jour les systèmes métiers, avec l’humain dans la boucle là où le jugement est nécessaire.",
      },
    },
  },
  {
    slug: "coding-agents-migration",
    featured: true,
    domain: "Agents & Automation",
    vertical: "it",
    pattern: 3,
    confidential: true,
    stack: ["Coding agents", "Git", "CI/CD", "MCP"],
    content: {
      en: {
        title: "Coding agents & application migration",
        problem: "Legacy applications and integration flows to migrate, with little documentation and scarce experts.",
        build: "Agents plugged into repositories and CI/CD that map legacy code, propose multi-file changes and generate tests and documentation — every change reviewed and traceable.",
      },
      fr: {
        title: "Agents de code & migration applicative",
        problem: "Des applications et des flux d’intégration legacy à migrer, peu documentés, avec des experts rares.",
        build: "Des agents branchés sur les dépôts et la CI/CD qui cartographient le code legacy, proposent des modifications multi-fichiers et génèrent tests et documentation — chaque changement revu et traçable.",
      },
    },
  },
];
