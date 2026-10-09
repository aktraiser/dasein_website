import { ArticleEnd } from "./ArticleEnd";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { Fragment } from "react";
import type { Article, Block } from "@/content/articles";
import type { Locale } from "@/lib/i18n";
import { glossText, newGlossarySeen, type GlossarySeen } from "./Glossed";

const DIAGRAM: Record<Locale, Record<string, string>> = {
  fr: {
    user: "Collaborateur",
    front: "Front",
    frontSub: "acheté : Prisme.ai, Open WebUI, Le Chat…",
    agents: "Agents déclaratifs",
    agentsSub: "YAML · skills · prompts",
    idp: "MCP · propagation d’identité",
    idpSub: "messagerie, tickets, CRM",
    m2m: "MCP · machine à machine",
    m2mSub: "référentiels, documentation",
    gateway: "Gateway LLM",
    gatewaySub: "routage, quotas, coûts",
    governance: "Gouvernance, avec l’accompagnement de Dasein : catalogue validé · droits délégués · audit · coûts par équipe",
  },
  en: {
    user: "Employee",
    front: "Front end",
    frontSub: "bought: Prisme.ai, Open WebUI, Le Chat…",
    agents: "Declarative agents",
    agentsSub: "YAML · skills · prompts",
    idp: "MCP · identity propagation",
    idpSub: "email, tickets, CRM",
    m2m: "MCP · machine to machine",
    m2mSub: "references, documentation",
    gateway: "LLM gateway",
    gatewaySub: "routing, quotas, cost",
    governance: "Governance, with Dasein’s support: approved catalogue · delegated rights · audit · cost per team",
  },
};

/** The user → front end → agents → tools / models chain, with the governance layer. */
function Diagram({ lang }: { lang: Locale }) {
  const t = DIAGRAM[lang];
  return (
    <figure className="adiag" aria-label={`${t.user} → ${t.front} → ${t.agents} → ${t.idp} / ${t.m2m} / ${t.gateway}`}>
      <div className="adiag__flow">
        <div className="adiag__node">{t.user}</div>
        <span className="adiag__arrow" aria-hidden="true">→</span>
        <div className="adiag__node">
          {t.front}
          <small>{t.frontSub}</small>
        </div>
        <span className="adiag__arrow" aria-hidden="true">→</span>
        <div className="adiag__node adiag__node--accent">
          {t.agents}
          <small>{t.agentsSub}</small>
        </div>
        <span className="adiag__arrow" aria-hidden="true">→</span>
        <div className="adiag__stack">
          <div className="adiag__node">
            {t.idp}
            <small>{t.idpSub}</small>
          </div>
          <div className="adiag__node">
            {t.m2m}
            <small>{t.m2mSub}</small>
          </div>
          <div className="adiag__node">
            {t.gateway}
            <small>{t.gatewaySub}</small>
          </div>
        </div>
      </div>
      <figcaption className="adiag__gov">{t.governance}</figcaption>
    </figure>
  );
}

const MCP_DIAGRAM: Record<Locale, { label: string; layers: { name: string; nodes: string[]; note?: string; accent?: boolean }[] }> = {
  fr: {
    label: "Les couches autour de MCP",
    layers: [
      { name: "Agents", nodes: ["Fronts et assistants", "Agents métiers", "Agents des éditeurs"] },
      {
        name: "Socle AI Platform",
        nodes: ["Registry", "Gateway MCP", "Gateway LLM", "Gateway A2A"],
        note: "Identité · droits par outil · quotas · audit · coûts",
        accent: true,
      },
      { name: "Serveurs MCP", nodes: ["Tickets", "CRM", "ERP", "Documentation"] },
      { name: "Existant", nodes: ["API, bases de données et applications de l’entreprise"] },
    ],
  },
  en: {
    label: "The layers around MCP",
    layers: [
      { name: "Agents", nodes: ["Front ends and assistants", "Business agents", "Vendor agents"] },
      {
        name: "AI Platform foundation",
        nodes: ["Registry", "MCP gateway", "LLM gateway", "A2A gateway"],
        note: "Identity · per-tool rights · quotas · audit · cost",
        accent: true,
      },
      { name: "MCP servers", nodes: ["Tickets", "CRM", "ERP", "Documentation"] },
      { name: "Existing", nodes: ["Company APIs, databases and applications"] },
    ],
  },
};

/** Agents → AI Platform foundation → MCP servers → existing systems, top to bottom. */
function McpDiagram({ lang }: { lang: Locale }) {
  const t = MCP_DIAGRAM[lang];
  return (
    <figure className="adiag mdiag" aria-label={t.label}>
      {t.layers.map((layer, i) => (
        <div key={layer.name} className="mdiag__layer-wrap">
          {i > 0 && (
            <span className="adiag__arrow mdiag__arrow" aria-hidden="true">
              ↓
            </span>
          )}
          <div className={`mdiag__layer${layer.accent ? " mdiag__layer--accent" : ""}`}>
            <span className="mdiag__name">{layer.name}</span>
            <div className="mdiag__nodes">
              {layer.nodes.map((node) => (
                <span key={node} className="adiag__node">
                  {node}
                </span>
              ))}
            </div>
            {layer.note && <span className="mdiag__note">{layer.note}</span>}
          </div>
        </div>
      ))}
    </figure>
  );
}

type Pt = [number, number];
/** Each coordination pattern as a tiny graph: nodes, links (index pairs), the lead node, curved back-links. */
const PATTERNS: { key: string; nodes: Pt[]; links: [number, number][]; lead?: number; back?: [number, number][] }[] = [
  { key: "workflow", nodes: [[14, 40], [52, 22], [52, 58], [90, 40]], links: [[0, 1], [0, 2], [1, 3], [2, 3]] },
  { key: "supervisor", nodes: [[60, 16], [22, 62], [60, 62], [98, 62]], links: [[0, 1], [0, 2], [0, 3]], lead: 0 },
  {
    key: "hierarchical",
    nodes: [[60, 10], [34, 40], [86, 40], [18, 70], [50, 70], [70, 70], [102, 70]],
    links: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]],
    lead: 0,
  },
  { key: "graph", nodes: [[14, 40], [46, 40], [78, 22], [78, 60], [106, 22]], links: [[0, 1], [1, 2], [1, 3], [2, 4]], back: [[2, 1]] },
  {
    key: "swarm",
    nodes: [[60, 10], [100, 34], [86, 72], [34, 72], [20, 34]],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 3], [4, 2]],
  },
];

const PATTERN_LABELS: Record<Locale, Record<string, [string, string]>> = {
  fr: {
    workflow: ["Workflow", "Étapes fixes, parallèles si possible"],
    supervisor: ["Superviseur", "Un agent délègue à des spécialistes"],
    hierarchical: ["Hiérarchique", "Planificateur, superviseurs, agents"],
    graph: ["Graphe", "Branches et allers-retours"],
    swarm: ["Essaim", "Les agents se passent la main"],
  },
  en: {
    workflow: ["Workflow", "Fixed steps, parallel when possible"],
    supervisor: ["Supervisor", "One agent delegates to specialists"],
    hierarchical: ["Hierarchical", "Planner, supervisors, agents"],
    graph: ["Graph", "Branches and loops"],
    swarm: ["Swarm", "Agents hand off to each other"],
  },
};

/** Five coordination patterns, from the most predictable to the least. */
function PatternsDiagram({ lang }: { lang: Locale }) {
  const labels = PATTERN_LABELS[lang];
  return (
    <figure className="adiag pdiag">
      <ol className="pdiag__list">
        {PATTERNS.map((pattern) => (
          <li key={pattern.key} className="pdiag__item">
            <svg viewBox="0 0 120 80" aria-hidden="true" className="pdiag__svg">
              {pattern.links.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={pattern.nodes[a][0]}
                  y1={pattern.nodes[a][1]}
                  x2={pattern.nodes[b][0]}
                  y2={pattern.nodes[b][1]}
                />
              ))}
              {pattern.back?.map(([a, b]) => {
                const [x1, y1] = pattern.nodes[a];
                const [x2, y2] = pattern.nodes[b];
                return <path key={`b${a}-${b}`} d={`M${x1},${y1} Q${(x1 + x2) / 2},${y1 - 22} ${x2},${y2}`} className="pdiag__back" />;
              })}
              {pattern.nodes.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={7} className={i === pattern.lead ? "pdiag__lead" : undefined} />
              ))}
            </svg>
            <strong>{labels[pattern.key][0]}</strong>
            <span>{labels[pattern.key][1]}</span>
          </li>
        ))}
      </ol>
      <figcaption className="pdiag__scale">
        <span>{lang === "fr" ? "Plus prévisible" : "More predictable"}</span>
        <span aria-hidden="true" />
        <span>{lang === "fr" ? "Plus autonome" : "More autonomous"}</span>
      </figcaption>
    </figure>
  );
}

const PROTOCOLS: Record<Locale, { label: string; user: string; agent: string; tools: string; agents: string }> = {
  fr: { label: "Les trois liaisons d’un agent", user: "Utilisateurs", agent: "Agent", tools: "Outils et données", agents: "Autres agents" },
  en: { label: "An agent’s three links", user: "Users", agent: "Agent", tools: "Tools and data", agents: "Other agents" },
};

/** Users ↔ AG-UI ↔ agent ↔ MCP ↔ tools, and agent ↔ A2A ↔ other agents. */
function ProtocolsDiagram({ lang }: { lang: Locale }) {
  const t = PROTOCOLS[lang];
  return (
    <figure className="adiag prdiag" aria-label={t.label}>
      <span className="adiag__node prdiag__user">{t.user}</span>
      <span className="prdiag__link prdiag__link--ui">AG-UI</span>
      <span className="adiag__node adiag__node--accent prdiag__agent">{t.agent}</span>
      <span className="prdiag__link prdiag__link--mcp">MCP</span>
      <span className="adiag__node prdiag__tools">{t.tools}</span>
      <span className="prdiag__link prdiag__link--a2a">A2A</span>
      <span className="adiag__node prdiag__agents">{t.agents}</span>
    </figure>
  );
}

type HookStep = { kind: "node" | "hook"; label: string; note?: string };
const HOOKS: Record<Locale, { label: string; loop: string; before: HookStep[]; inner: HookStep[]; after: HookStep[] }> = {
  fr: {
    label: "Les points d’accroche des middlewares dans la boucle d’un agent",
    loop: "Boucle de l’agent, répétée jusqu’à la réponse",
    before: [
      { kind: "node", label: "Demande" },
      { kind: "hook", label: "Avant l’agent", note: "droits, contexte" },
    ],
    inner: [
      { kind: "hook", label: "Avant le modèle", note: "masquage, résumé" },
      { kind: "node", label: "Appel au modèle", note: "autour : plafond, repli" },
      { kind: "hook", label: "Autour de l’outil", note: "validation humaine, droits" },
      { kind: "node", label: "Appel d’outil" },
    ],
    after: [
      { kind: "hook", label: "Après l’agent", note: "journal, évaluation" },
      { kind: "node", label: "Réponse" },
    ],
  },
  en: {
    label: "Where middleware hooks into an agent’s loop",
    loop: "Agent loop, repeated until the answer",
    before: [
      { kind: "node", label: "Request" },
      { kind: "hook", label: "Before the agent", note: "rights, context" },
    ],
    inner: [
      { kind: "hook", label: "Before the model", note: "masking, summary" },
      { kind: "node", label: "Model call", note: "around: cap, fallback" },
      { kind: "hook", label: "Around the tool", note: "human approval, rights" },
      { kind: "node", label: "Tool call" },
    ],
    after: [
      { kind: "hook", label: "After the agent", note: "log, evaluation" },
      { kind: "node", label: "Answer" },
    ],
  },
};

function HookItem({ step }: { step: HookStep }) {
  return (
    <li className={step.kind === "hook" ? "hdiag__hook" : "adiag__node hdiag__node"}>
      {step.label}
      {step.note && <small>{step.note}</small>}
    </li>
  );
}

/** Request → hooks around the model / tool loop → answer. */
function HooksDiagram({ lang }: { lang: Locale }) {
  const t = HOOKS[lang];
  return (
    <figure className="adiag hdiag" aria-label={t.label}>
      <ol className="hdiag__row">
        {t.before.map((step) => (
          <HookItem key={step.label} step={step} />
        ))}
        <li className="hdiag__loop">
          <span className="hdiag__loop-label">↻ {t.loop}</span>
          <ol className="hdiag__row">
            {t.inner.map((step) => (
              <HookItem key={step.label} step={step} />
            ))}
          </ol>
        </li>
        {t.after.map((step) => (
          <HookItem key={step.label} step={step} />
        ))}
      </ol>
    </figure>
  );
}

type Group = { title: string; items: string[] };
const PLATFORM: Record<
  Locale,
  { label: string; levels: { name: string; owns: string[]; note: string }[]; platform: string; groups: Group[] }
> = {
  fr: {
    label: "Les quatre blocs de l’AI Platform et les trois façons de l’utiliser",
    levels: [
      { name: "Utiliser", owns: ["Données", "Outils"], note: "Utilise les agents du catalogue" },
      { name: "Assembler", owns: ["Code applicatif", "Données", "Outils", "Mémoire", "CI/CD"], note: "Construit sur la plateforme, publie au catalogue" },
      {
        name: "Construire en autonomie",
        owns: ["Code applicatif", "Données", "Runtime", "Sécurité", "Garde-fous", "Observabilité", "Gateway"],
        note: "Respecte les standards, publie au catalogue",
      },
    ],
    platform: "AI Platform",
    groups: [
      { title: "Opérations", items: ["Runtime", "Sécurité et identité", "Suivi des coûts", "Arrivée des équipes", "Observabilité et évaluation"] },
      { title: "Catalogue", items: ["Agents", "Outils et serveurs MCP", "Workflows", "Prompts et skills", "Applications"] },
      { title: "Gateway de modèles", items: ["Routage", "Modèles propriétaires", "Modèles open source", "Modèles adaptés"] },
      { title: "Gouvernance et standards", items: ["Garde-fous", "Politiques", "Frameworks et patterns", "Bonnes pratiques et assets"] },
    ],
  },
  en: {
    label: "The four blocks of the AI Platform and the three ways to use it",
    levels: [
      { name: "Use", owns: ["Data", "Tools"], note: "Uses agents from the catalogue" },
      { name: "Assemble", owns: ["Application code", "Data", "Tools", "Memory", "CI/CD"], note: "Builds on the platform, publishes to the catalogue" },
      {
        name: "Build independently",
        owns: ["Application code", "Data", "Runtime", "Security", "Guardrails", "Observability", "Gateway"],
        note: "Follows the standards, publishes to the catalogue",
      },
    ],
    platform: "AI Platform",
    groups: [
      { title: "Operations", items: ["Runtime", "Security and identity", "Cost tracking", "Team onboarding", "Observability and evaluation"] },
      { title: "Catalogue", items: ["Agents", "Tools and MCP servers", "Workflows", "Prompts and skills", "Applications"] },
      { title: "Model gateway", items: ["Routing", "Proprietary models", "Open-source models", "Customised models"] },
      { title: "Governance and standards", items: ["Guardrails", "Policies", "Frameworks and patterns", "Best practices and assets"] },
    ],
  },
};

function Groups({ groups }: { groups: Group[] }) {
  return (
    <div className="pfdiag__groups">
      {groups.map((group) => (
        <div key={group.title} className="pfdiag__group">
          <span className="pfdiag__group-title">{group.title}</span>
          <div className="pfdiag__chips">
            {group.items.map((item) => (
              <span key={item} className="adiag__node">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Three team levels (what each team owns) on top of the shared platform blocks. */
function PlatformDiagram({ lang }: { lang: Locale }) {
  const t = PLATFORM[lang];
  return (
    <figure className="adiag pfdiag" aria-label={t.label}>
      <div className="pfdiag__levels">
        {t.levels.map((level, i) => (
          <div key={level.name} className="pfdiag__level">
            <span className="pfdiag__level-num">{String(i + 1).padStart(2, "0")}</span>
            <strong>{level.name}</strong>
            <div className="pfdiag__owns">
              {level.owns.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <small>{level.note}</small>
            <span className="pfdiag__link" aria-hidden="true">
              ⇅
            </span>
          </div>
        ))}
      </div>
      <div className="pfdiag__platform">
        <span className="pfdiag__platform-title">{t.platform}</span>
        <Groups groups={t.groups} />
      </div>
    </figure>
  );
}

const FEDERATED: Record<
  Locale,
  { label: string; apps: string; app: string; env: string; envItems: string[]; team: string; core: string[]; groups: Group[] }
> = {
  fr: {
    label: "Le modèle fédéré : équipes applicatives et équipe plateforme",
    apps: "Équipes applicatives",
    app: "Application",
    env: "Environnement de l’équipe",
    envItems: ["Orchestration", "Données"],
    team: "Équipe plateforme",
    core: ["Gateway de modèles", "Observabilité centrale", "Outillage LLMOps", "Catalogue agents et outils"],
    groups: [
      { title: "Opérations de la plateforme", items: ["Arrivée des équipes", "Arrivée des modèles", "Sécurité", "Suivi des coûts", "CI/CD de la plateforme"] },
      { title: "Centre d’excellence", items: ["Standards", "Validation des modèles", "IA responsable"] },
    ],
  },
  en: {
    label: "The federated model: application teams and platform team",
    apps: "Application teams",
    app: "Application",
    env: "Team environment",
    envItems: ["Orchestration", "Data"],
    team: "Platform team",
    core: ["Model gateway", "Central observability", "LLMOps tooling", "Agent and tool catalogue"],
    groups: [
      { title: "Platform operations", items: ["Team onboarding", "Model onboarding", "Security", "Cost tracking", "Platform CI/CD"] },
      { title: "Centre of excellence", items: ["Standards", "Model approval", "Responsible AI"] },
    ],
  },
};

/** Application teams keep their app, orchestration and data; the platform team runs the shared core. */
function FederatedDiagram({ lang }: { lang: Locale }) {
  const t = FEDERATED[lang];
  return (
    <figure className="adiag fddiag" aria-label={t.label}>
      <div className="fddiag__side fddiag__side--apps">
        <span className="pfdiag__group-title">{t.apps}</span>
        {[1, 2].map((n) => (
          <div key={n} className="fddiag__team">
            <span className="adiag__node">
              {t.app} {n === 1 ? "A" : "B"}
            </span>
            <span className="adiag__arrow" aria-hidden="true">
              →
            </span>
            <div className="fddiag__env">
              <small>{t.env}</small>
              {t.envItems.map((item) => (
                <span key={item} className="adiag__node">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className="fddiag__bridge" aria-hidden="true">
        ⇄
      </span>
      <div className="fddiag__side fddiag__side--core">
        <span className="pfdiag__group-title">{t.team}</span>
        <div className="pfdiag__chips">
          {t.core.map((item) => (
            <span key={item} className="adiag__node adiag__node--accent">
              {item}
            </span>
          ))}
        </div>
        <Groups groups={t.groups} />
      </div>
    </figure>
  );
}

type UseCase = { title: string; sub: string; families: [string, string][]; examples: string[] };
const USE_CASES: Record<Locale, { label: string; examplesLabel: string; items: UseCase[] }> = {
  fr: {
    label: "Trois familles de cas d’usage sur un socle commun",
    examplesLabel: "Exemples",
    items: [
      {
        title: "Talk to my data",
        sub: "Interroger ses données et ses documents",
        families: [
          ["Données structurées", "CRM, ERP, plateforme data, référentiels"],
          ["Documents", "Contrats, spécifications, procédures, bases de connaissance"],
          ["Temps réel", "Logs, supervision, flux IoT, événements"],
        ],
        examples: ["« Quel est le chiffre d’affaires par région ? »", "« Que dit le contrat X ? »"],
      },
      {
        title: "Aide à la décision",
        sub: "Analyser, comparer, recommander",
        families: [
          ["Synthèse et reporting", "Résumés, rapports, tableaux de bord"],
          ["Comparaison et scoring", "Évaluation, priorisation, notation"],
          ["Prévision et recommandation", "Prévisions, prochaine meilleure action, anticipation"],
        ],
        examples: ["« Quel fournisseur choisir ? »", "« Quelle est la tendance ? »"],
      },
      {
        title: "Optimisation",
        sub: "Automatiser, accélérer, réduire les coûts",
        families: [
          ["Automatisation", "Saisie, classification, transformation"],
          ["Accélération des processus", "Validation, onboarding, production de contenu"],
          ["Qualité et coûts", "Détection de défauts, maintenance prédictive, supply chain"],
        ],
        examples: ["« Automatiser les factures »", "« Réduire les ruptures »"],
      },
    ],
  },
  en: {
    label: "Three families of use cases on a shared foundation",
    examplesLabel: "Examples",
    items: [
      {
        title: "Talk to my data",
        sub: "Query your data and documents",
        families: [
          ["Structured data", "CRM, ERP, data platform, reference data"],
          ["Documents", "Contracts, specifications, procedures, knowledge bases"],
          ["Real time", "Logs, monitoring, IoT streams, events"],
        ],
        examples: ["“What is revenue by region?”", "“What does contract X say?”"],
      },
      {
        title: "Decision support",
        sub: "Analyse, compare, recommend",
        families: [
          ["Synthesis and reporting", "Summaries, reports, dashboards"],
          ["Comparison and scoring", "Assessment, prioritisation, rating"],
          ["Forecast and recommendation", "Forecasts, next best action, anticipation"],
        ],
        examples: ["“Which supplier should we pick?”", "“What is the trend?”"],
      },
      {
        title: "Optimisation",
        sub: "Automate, speed up, cut costs",
        families: [
          ["Automation", "Data entry, classification, transformation"],
          ["Process acceleration", "Approval, onboarding, content production"],
          ["Quality and cost", "Defect detection, predictive maintenance, supply chain"],
        ],
        examples: ["“Automate invoices”", "“Reduce stock-outs”"],
      },
    ],
  },
};

function UseCasesDiagram({ lang }: { lang: Locale }) {
  const t = USE_CASES[lang];
  return (
    <figure className="adiag ucdiag" aria-label={t.label}>
      {t.items.map((item, i) => (
        <div key={item.title} className={`ucdiag__card ucdiag__card--${i + 1}`}>
          <div className="ucdiag__head">
            <strong>{item.title}</strong>
            <span>{item.sub}</span>
          </div>
          <ul className="ucdiag__families">
            {item.families.map(([name, text]) => (
              <li key={name}>
                <b>{name}</b>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="ucdiag__examples">
            <small>{t.examplesLabel}</small>
            {item.examples.map((example) => (
              <em key={example}>{example}</em>
            ))}
          </div>
        </div>
      ))}
    </figure>
  );
}

const AUTH: Record<
  Locale,
  { label: string; user: string; idp: string; aiGw: string; agent: string; mcpGw: string; mcp: string; apps: string; userToken: string; last: string; exchange: string; checks: [string, string] }
> = {
  fr: {
    label: "La chaîne d’identité entre l’utilisateur et le serveur MCP",
    user: "Utilisateur",
    idp: "Fournisseur d’identité",
    aiGw: "Gateway IA",
    agent: "Agent",
    mcpGw: "Gateway MCP",
    mcp: "Serveur MCP",
    apps: "Applications",
    userToken: "jeton",
    last: "jeton reçu par le serveur MCP : 1 technique · 2 utilisateur · 3 échangé · 4 second jeton",
    exchange: "échange de jeton (3)",
    checks: ["identité, droits", "droits par outil, quotas, audit"],
  },
  en: {
    label: "The identity chain between the user and the MCP server",
    user: "User",
    idp: "Identity provider",
    aiGw: "AI gateway",
    agent: "Agent",
    mcpGw: "MCP gateway",
    mcp: "MCP server",
    apps: "Applications",
    userToken: "token",
    last: "token received by the MCP server: 1 technical · 2 user · 3 exchanged · 4 second token",
    exchange: "token exchange (3)",
    checks: ["identity, rights", "per-tool rights, quotas, audit"],
  },
};

function Hop({ token }: { token: string }) {
  return (
    <span className="audiag__hop" aria-hidden="true">
      <small>{token}</small>
      <span className="audiag__line" />
    </span>
  );
}

/** User → AI gateway → agent → MCP gateway → MCP server → apps, with the token on each hop. */
function AuthDiagram({ lang }: { lang: Locale }) {
  const t = AUTH[lang];
  return (
    <figure className="adiag audiag" aria-label={t.label}>
      <div className="audiag__chain">
        <span className="adiag__node audiag__user">{t.user}</span>
        <Hop token={t.userToken} />
        <span className="adiag__node adiag__node--accent">
          {t.aiGw}
          <small>{t.checks[0]}</small>
        </span>
        <Hop token={t.userToken} />
        <span className="adiag__node">{t.agent}</span>
        <Hop token={t.userToken} />
        <span className="adiag__node adiag__node--accent audiag__mcpgw">
          {t.mcpGw}
          <small>{t.checks[1]}</small>
        </span>
        <Hop token="?" />
        <span className="adiag__node audiag__mcp">
          {t.mcp}
          <small>{t.apps}</small>
        </span>
      </div>
      <div className="audiag__foot">
        <span className="adiag__node audiag__idp">{t.idp}</span>
        <span className="audiag__exchange">↔ {t.exchange}</span>
        <span className="audiag__legend">? = {t.last}</span>
      </div>
    </figure>
  );
}

type GatewayCard = { kicker: string; name: string; role: string; flows: string; stakes: string[]; typical: string };
const GATEWAYS: Record<Locale, { label: string; stakesLabel: string; items: GatewayCard[] }> = {
  fr: {
    label: "Trois gateways : modèles, outils, agents",
    stakesLabel: "Enjeux",
    items: [
      {
        kicker: "Appels aux modèles",
        name: "Gateway LLM",
        role: "Médiation des appels aux modèles",
        flows: "Complétions, embeddings, vision",
        stakes: ["Routage multi-modèles et repli", "Normalisation des API des fournisseurs", "Suivi des tokens, des coûts et de la latence"],
        typical: "Typiquement : LiteLLM, Portkey, AI gateways des clouds",
      },
      {
        kicker: "Appels aux outils",
        name: "Gateway MCP",
        role: "Médiation des capacités outillées",
        flows: "Outils exposés via MCP",
        stakes: ["Catalogue et contrats d’entrée-sortie", "Politiques d’exposition, versions", "Routage vers les systèmes internes"],
        typical: "Typiquement : MuleSoft, Kong, Azure API Management",
      },
      {
        kicker: "Appels entre agents",
        name: "Gateway d’agents",
        role: "Médiation agent à agent (A2A)",
        flows: "Délégation, orchestration entre agents",
        stakes: ["Découverte des agents disponibles", "Propagation de l’identité et du contexte", "Sessions longues, état"],
        typical: "Espace émergent : standards en cours",
      },
    ],
  },
  en: {
    label: "Three gateways: models, tools, agents",
    stakesLabel: "Stakes",
    items: [
      {
        kicker: "Model calls",
        name: "LLM gateway",
        role: "Mediates calls to models",
        flows: "Completions, embeddings, vision",
        stakes: ["Multi-model routing and fallback", "Normalising provider APIs", "Tracking tokens, cost and latency"],
        typical: "Typically: LiteLLM, Portkey, cloud AI gateways",
      },
      {
        kicker: "Tool calls",
        name: "MCP gateway",
        role: "Mediates tool capabilities",
        flows: "Tools exposed through MCP",
        stakes: ["Catalogue and input/output contracts", "Exposure policies, versioning", "Routing to internal systems"],
        typical: "Typically: MuleSoft, Kong, Azure API Management",
      },
      {
        kicker: "Agent calls",
        name: "Agent gateway",
        role: "Mediates agent-to-agent (A2A)",
        flows: "Delegation, orchestration across agents",
        stakes: ["Discovering available agents", "Propagating identity and context", "Long sessions, state"],
        typical: "Emerging space: standards in progress",
      },
    ],
  },
};

function GatewaysDiagram({ lang }: { lang: Locale }) {
  const t = GATEWAYS[lang];
  return (
    <figure className="adiag gwdiag" aria-label={t.label}>
      {t.items.map((item) => (
        <div key={item.name} className="gwdiag__card">
          <span className="gwdiag__kicker">{item.kicker}</span>
          <strong>{item.name}</strong>
          <em>{item.role}</em>
          <span className="gwdiag__flows">{item.flows}</span>
          <small className="gwdiag__label">{t.stakesLabel}</small>
          <ul>
            {item.stakes.map((stake) => (
              <li key={stake}>{stake}</li>
            ))}
          </ul>
          <span className="gwdiag__typical">{item.typical}</span>
        </div>
      ))}
    </figure>
  );
}

type Stage = { title: string; nodes: string[]; tags: string[] };
const PIPELINE: Record<Locale, { label: string; stages: Stage[] }> = {
  fr: {
    label: "Le pipeline Weak Signal : collecter, indexer, analyser, distribuer",
    stages: [
      { title: "Collecter", nodes: ["Feedly"], tags: ["Verticale", "Flux"] },
      { title: "Indexer", nodes: ["Agent", "AI Search"], tags: ["Extraction", "Indexation"] },
      { title: "Analyser", nodes: ["Agents"], tags: ["Enrichissement", "Évaluation"] },
      { title: "Distribuer", nodes: ["Warehouse", "Excel"], tags: ["Consolidation", "Validation"] },
    ],
  },
  en: {
    label: "The Weak Signal pipeline: collect, index, analyse, distribute",
    stages: [
      { title: "Collect", nodes: ["Feedly"], tags: ["Vertical", "Feed"] },
      { title: "Index", nodes: ["Agent", "AI Search"], tags: ["Extraction", "Indexing"] },
      { title: "Analyse", nodes: ["Agents"], tags: ["Enrichment", "Evaluation"] },
      { title: "Distribute", nodes: ["Warehouse", "Excel"], tags: ["Consolidation", "Approval"] },
    ],
  },
};

/** Four stages on one line: what runs at each step and what it produces. */
function PipelineDiagram({ lang }: { lang: Locale }) {
  const t = PIPELINE[lang];
  return (
    <figure className="adiag pldiag" aria-label={t.label}>
      <ol className="pldiag__stages">
        {t.stages.map((stage, i) => (
          <li key={stage.title} className="pldiag__stage">
            <span className="pldiag__num">{String(i + 1).padStart(2, "0")}</span>
            <strong>{stage.title}</strong>
            <div className="pldiag__nodes">
              {stage.nodes.map((node) => (
                <span key={node} className="pldiag__node">
                  {node}
                </span>
              ))}
            </div>
            <div className="pldiag__tags">
              {stage.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const SEMANTIC_CHAIN: Record<Locale, { label: string; steps: [string, string][]; bar: [string, string] }> = {
  fr: {
    label: "D’une donnée brute à son sens : donnée, concept, contexte, attributs et relations",
    steps: [
      ["Donnée", "ID vidéo 84721"],
      ["Concept", "Épisode"],
      ["Contexte", "Rattaché à un programme"],
      ["Attributs et relations", "Genre : sport · Saison : 2"],
    ],
    bar: [
      "La sémantique : un langage commun",
      "Elle définit les concepts métier, leurs relations et les règles qui permettent de les interpréter.",
    ],
  },
  en: {
    label: "From a raw value to its meaning: data, concept, context, attributes and relationships",
    steps: [
      ["Data", "Video ID 84721"],
      ["Concept", "Episode"],
      ["Context", "Attached to a programme"],
      ["Attributes and relationships", "Genre: sport · Season: 2"],
    ],
    bar: [
      "Semantics: a common language",
      "It defines business concepts, their relationships and the rules for interpreting them.",
    ],
  },
};

function SemanticChainDiagram({ lang }: { lang: Locale }) {
  const t = SEMANTIC_CHAIN[lang];
  return (
    <figure className="adiag smdiag" aria-label={t.label}>
      <ol className="smdiag__chain">
        {t.steps.map(([name, value]) => (
          <li key={name}>
            <small>{name}</small>
            <strong>{value}</strong>
          </li>
        ))}
      </ol>
      <p className="smdiag__bar">
        <strong>{t.bar[0]}</strong>
        <span>{t.bar[1]}</span>
      </p>
    </figure>
  );
}

type SemanticSide = { title: string; items: string[] };
const SEMANTIC_HOUSE: Record<
  Locale,
  { label: string; gov: [string, string]; business: SemanticSide; tech: SemanticSide; core: [string, string]; base: [string, string] }
> = {
  fr: {
    label:
      "Métiers et équipes tech alimentent le socle sémantique partagé ; la plateforme agentique le rend utilisable, sous la gouvernance data et IA",
    gov: [
      "Gouvernance data et IA",
      "Règles communes et responsabilités · Qualité et cycle de vie de la donnée · Accès et conformité",
    ],
    business: {
      title: "Les métiers",
      items: ["Définir les concepts", "Aligner indicateurs et vocabulaire", "Exprimer besoins et règles métier"],
    },
    tech: {
      title: "Les équipes tech",
      items: ["Fiabiliser les données", "Structurer le référentiel sémantique", "Intégrer, sécuriser, tracer"],
    },
    core: ["Plateforme agentique", "Rend la connaissance interrogeable et actionnable, avec des droits et des garde-fous"],
    base: ["Socle sémantique partagé", "Concepts · Définitions · Relations · Règles métier"],
  },
  en: {
    label:
      "Business and tech teams feed the shared semantic foundation; the agentic platform makes it usable, under data and AI governance",
    gov: [
      "Data and AI governance",
      "Common rules and responsibilities · Data quality and lifecycle · Access and compliance",
    ],
    business: {
      title: "Business teams",
      items: ["Define the concepts", "Align metrics and vocabulary", "Express needs and business rules"],
    },
    tech: {
      title: "Tech teams",
      items: ["Make data reliable", "Structure the semantic repository", "Integrate, secure, trace"],
    },
    core: ["Agentic platform", "Makes knowledge queryable and actionable, with rights and guardrails"],
    base: ["Shared semantic foundation", "Concepts · Definitions · Relationships · Business rules"],
  },
};

function SemanticHouseDiagram({ lang }: { lang: Locale }) {
  const t = SEMANTIC_HOUSE[lang];
  const side = (data: SemanticSide) => (
    <div className="shdiag__side">
      <strong>{data.title}</strong>
      <ul>
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <figure className="adiag shdiag" aria-label={t.label}>
      <p className="shdiag__gov">
        <strong>{t.gov[0]}</strong>
        <span>{t.gov[1]}</span>
      </p>
      <div className="shdiag__mid">
        {side(t.business)}
        <span className="shdiag__link" aria-hidden="true">
          ⇄
        </span>
        <p className="shdiag__core">
          <strong>{t.core[0]}</strong>
          <span>{t.core[1]}</span>
        </p>
        <span className="shdiag__link" aria-hidden="true">
          ⇄
        </span>
        {side(t.tech)}
      </div>
      <p className="shdiag__base">
        <strong>{t.base[0]}</strong>
        <span>{t.base[1]}</span>
      </p>
    </figure>
  );
}

const imageExists = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src));

/** Rendered as a plain call, in reading order, so glossary terms are marked on first use. */
function renderBlock(block: Block, lang: Locale, seen: GlossarySeen) {
  const g = (text: string) => glossText(text, lang, seen);
  switch (block.type) {
    case "h":
      return (
        <h2 id={block.id} className="article__h">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="article__p">{g(block.text)}</p>;
    case "h3":
      return <h3 className="article__h3">{block.text}</h3>;
    case "note":
      return <p className="article__note">{block.text}</p>;
    case "quote":
      return (
        <figure className="article__quote">
          <blockquote>{block.text}</blockquote>
          <figcaption>{block.cite}</figcaption>
        </figure>
      );
    case "stats":
      return (
        <dl className="article__stats">
          {block.items.map((item) => (
            <div key={item.value}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      );
    case "compare":
      return (
        <figure className="article__compare">
          <div className="article__compare-cols">
            {block.columns.map((column) => (
              <div key={column.title} className="article__compare-col">
                <p className="article__compare-title">{column.title}</p>
                <dl>
                  {column.items.map((item) => (
                    <div key={item.label}>
                      <dt>{item.value}</dt>
                      <dd>{item.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "timeline":
      return (
        <ol className="article__timeline">
          {block.items.map((item) => (
            <li key={item.place}>
              <div className="article__timeline-head">
                <strong>{item.place}</strong>
                <span>{item.date}</span>
                {item.tag && <em>{item.tag}</em>}
              </div>
              <div className="article__timeline-body">
                {item.text.map((paragraph) => (
                  <p key={paragraph}>{g(paragraph)}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      );
    case "box":
      return (
        <aside className="article__box">
          <p className="article__box-title">{block.title}</p>
          <p>{g(block.text)}</p>
        </aside>
      );
    case "list":
      return (
        <ul className="article__list">
          {block.items.map((item) => (
            <li key={item}>{g(item)}</li>
          ))}
        </ul>
      );
    case "defs":
      return (
        <dl className="article__defs">
          {block.items.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{g(item.text)}</dd>
            </div>
          ))}
        </dl>
      );
    case "code":
      return (
        <figure className="article__code">
          <pre>
            <code>{block.text}</code>
          </pre>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "table":
      return (
        <div className="article__tablewrap">
          <table className="article__table">
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c}>
                        {block.logos?.[r] && (
                          <span className="article__logos" aria-hidden="true">
                            {block.logos[r].map((file) => (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img key={file} src={`/logos/${file}`} alt="" />
                            ))}
                          </span>
                        )}
                        {g(cell)}
                      </th>
                    ) : (
                      <td key={c}>{g(cell)}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && <p className="article__table-caption">{block.caption}</p>}
        </div>
      );
    case "figure":
      if (!imageExists(block.src)) return null;
      return (
        <figure className="article__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} loading="lazy" />
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "callout":
      return <p className="article__callout">{g(block.text)}</p>;
    case "related": {
      const content = (
        <>
          <span className="article__related-label">{block.label}</span>
          <strong>{block.title}</strong>
          <span>{block.text}</span>
          <span className="article__related-arrow" aria-hidden="true">
            {/^https?:/.test(block.href) ? "↗" : "→"}
          </span>
        </>
      );
      // External links open in a new tab; site paths get the locale prefix.
      return /^https?:/.test(block.href) ? (
        <a href={block.href} className="article__related" target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={`/${lang}${block.href}`} className="article__related">
          {content}
        </Link>
      );
    }
    case "diagram":
      if (block.variant === "mcp") return <McpDiagram lang={lang} />;
      if (block.variant === "patterns") return <PatternsDiagram lang={lang} />;
      if (block.variant === "protocols") return <ProtocolsDiagram lang={lang} />;
      if (block.variant === "hooks") return <HooksDiagram lang={lang} />;
      if (block.variant === "platform") return <PlatformDiagram lang={lang} />;
      if (block.variant === "federated") return <FederatedDiagram lang={lang} />;
      if (block.variant === "usecases") return <UseCasesDiagram lang={lang} />;
      if (block.variant === "auth") return <AuthDiagram lang={lang} />;
      if (block.variant === "gateways") return <GatewaysDiagram lang={lang} />;
      if (block.variant === "pipeline") return <PipelineDiagram lang={lang} />;
      if (block.variant === "semantic-chain") return <SemanticChainDiagram lang={lang} />;
      if (block.variant === "semantic-house") return <SemanticHouseDiagram lang={lang} />;
      return <Diagram lang={lang} />;
  }
}

/** Article layout: sticky table of contents on the left, the text on the right. */
export function ArticleBody({ article, lang, path }: { article: Article; lang: Locale; path: string }) {
  const seen = newGlossarySeen();
  const headings = article.blocks.filter((b): b is Extract<Block, { type: "h" }> => b.type === "h");
  return (
    <div className="article">
      <nav className="article__toc" aria-label={lang === "fr" ? "Sommaire" : "Contents"}>
        {headings.map((h) => (
          <a key={h.id} href={`#${h.id}`}>
            {h.text}
          </a>
        ))}
        <a href={`/${lang}/glossary`} className="article__toc-glossary">
          {lang === "fr" ? "Glossaire" : "Glossary"} <span aria-hidden="true">→</span>
        </a>
      </nav>
      <div className="article__body">
        <aside className="article__summary">
          <p className="article__summary-label">{article.summaryLabel}</p>
          <ul>
            {article.summary.map((line) => (
              <li key={line}>{glossText(line, lang, seen)}</li>
            ))}
          </ul>
        </aside>
        {article.blocks.map((block, i) => (
          <Fragment key={i}>{renderBlock(block, lang, seen)}</Fragment>
        ))}
        <section className="article__sources">
          <p className="article__summary-label">{article.sourcesLabel}</p>
          <ul>
            {article.sources.map((source) => (
              <li key={source.label}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only">{lang === "fr" ? " (nouvel onglet)" : " (opens in a new tab)"}</span>
                  </a>
                ) : (
                  source.label
                )}
              </li>
            ))}
          </ul>
        </section>
        <ArticleEnd lang={lang} path={path} />
      </div>
    </div>
  );
}
