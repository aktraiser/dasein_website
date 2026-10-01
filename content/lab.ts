import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

export type Track = {
  id: string;
  status: "active" | "exploring";
  content: Localized<{ name: string; question: string; topics: string[] }>;
};

/**
 * A lab log entry: experiment, demo, publication or open-source project.
 * Entries appear on /lab, newest first.
 */
export type LabEntry = {
  slug: string;
  kind: "experiment" | "demo" | "publication" | "open-source";
  date: string; // ISO, e.g. "2026-10-02"
  url?: string; // external link (GitHub, paper, demo…)
  content: Localized<{ title: string; summary: string }>;
};

export const tracks: Track[] = [
  {
    id: "multi-agent",
    status: "active",
    content: {
      en: {
        name: "Multi-agent systems & swarms",
        question: "When do many small agents outperform one large one — and how do they coordinate?",
        topics: ["Multi-agent systems", "Agent swarms", "Cooperation", "Orchestration"],
      },
      fr: {
        name: "Systèmes multi-agents & swarms",
        question: "Quand plusieurs petits agents font-ils mieux qu’un seul grand — et comment se coordonnent-ils ?",
        topics: ["Systèmes multi-agents", "Agent swarms", "Coopération", "Orchestration"],
      },
    },
  },
  {
    id: "memory",
    status: "active",
    content: {
      en: {
        name: "Agent memory",
        question: "What should an agent remember, for how long, and who else may read it?",
        topics: ["Short & long-term memory", "Shared memory", "Historisation", "Context management"],
      },
      fr: {
        name: "Mémoire des agents",
        question: "Que doit retenir un agent, combien de temps, et qui d’autre peut y accéder ?",
        topics: ["Mémoire court & long terme", "Mémoire partagée", "Historisation", "Gestion du contexte"],
      },
    },
  },
  {
    id: "emergence",
    status: "exploring",
    content: {
      en: {
        name: "Emergent behaviour",
        question: "What behaviours appear when autonomous agents interact over time — and how do we keep them in bounds?",
        topics: ["Autonomous agents", "Emergent behaviour", "Agent cooperation"],
      },
      fr: {
        name: "Comportements émergents",
        question: "Quels comportements apparaissent quand des agents autonomes interagissent dans la durée — et comment les maintenir dans un cadre ?",
        topics: ["Agents autonomes", "Comportements émergents", "Coopération entre agents"],
      },
    },
  },
  {
    id: "runtimes",
    status: "active",
    content: {
      en: {
        name: "Runtimes & protocols",
        question: "What does an operating system for agents look like — and how do agents talk to tools and to each other?",
        topics: ["Agent runtimes", "MCP", "Interaction protocols", "Agentic architectures"],
      },
      fr: {
        name: "Runtimes & protocoles",
        question: "À quoi ressemble un système d’exploitation pour agents — et comment les agents parlent-ils aux outils et entre eux ?",
        topics: ["Runtimes d’agents", "MCP", "Protocoles d’interaction", "Architectures agentiques"],
      },
    },
  },
  {
    id: "observation",
    status: "active",
    content: {
      en: {
        name: "Observation & evaluation",
        question: "How do you observe, measure and trust a system that reasons?",
        topics: ["Tracing", "Evaluation", "Agent observability"],
      },
      fr: {
        name: "Observation & évaluation",
        question: "Comment observer, mesurer et faire confiance à un système qui raisonne ?",
        topics: ["Tracing", "Évaluation", "Observabilité des agents"],
      },
    },
  },
  {
    id: "infrastructure",
    status: "exploring",
    content: {
      en: {
        name: "New AI infrastructure",
        question: "Which infrastructure primitives does AI actually need, beyond what cloud platforms offer today?",
        topics: ["Gateways", "Registries", "Identity for agents", "Governance"],
      },
      fr: {
        name: "Nouvelles infrastructures IA",
        question: "De quelles briques d’infrastructure l’IA a-t-elle vraiment besoin, au-delà de ce que proposent les clouds aujourd’hui ?",
        topics: ["Gateways", "Registries", "Identité des agents", "Gouvernance"],
      },
    },
  },
];

export const entries: LabEntry[] = [];
