const en = {
  meta: {
    siteName: "Dasein",
    title: "Dasein — Data & AI Engineering",
    description:
      "Dasein helps companies put AI to work: agents, platforms and governance, built on solid data foundations.",
  },

  nav: {
    expertise: "Expertise",
    articles: "Articles",
    about: "About",
    contact: "Contact",
    cta: "Start a project",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
  },

  navMenu: {
    expertise: {
      explore: "Explore expertise",
      main: [
        { label: "User Augmentation", href: "/expertise/user-augmentation" },
        { label: "Business Applications", href: "/expertise/business-applications" },
        { label: "AI Platform", href: "/expertise/ai-platform" },
      ],
      sideTitle: "Approach",
      side: [
        { label: "Three verticals", href: "/#verticals" },
      ],
    },
    about: {
      explore: "About Dasein",
      main: [
        { label: "Our view", href: "/about" },
        { label: "Why “Dasein”", href: "/about#name" },
        { label: "Who we work with", href: "/about#audience" },
        { label: "Contact", href: "/contact" },
      ],
      sideTitle: "Company",
      side: [
        { label: "Expertise", href: "/#verticals" },
      ],
    },
  },

  hero: {
    eyebrow: "Data & AI engineering",
    title: "We build the systems that let AI work inside the enterprise.",
    // Same sentence with inline pictograms: {arrow} {stack} {secure}
    titleMarked: "We build {arrow} the systems that let {stack} AI work inside {secure} the enterprise.",
    chipLabels: { stack: "Technologies we work with", secure: "Secure, human-approved" },
    lead: "Dasein designs and industrialises the data foundations and AI systems that turn an organisation’s data, knowledge and existing tools into systems able to understand, reason and act.",
    chain: ["Data", "Knowledge", "Intelligence", "Action"],
    primary: "Start a project",
    secondary: "Read our articles",
    intro: "Introducing Dasein",
    introRight: "Data & AI engineering",
    inboxTitle: "inbox.app",
    inboxHead: "NEW PROJECT?",
    inboxText: "Tell us what you’re building.",
    inboxButton: "Start a conversation",
    chainTitle: "chain.sys",
    runLabel: "run",
    runs: [
      {
        name: "it-incident",
        vertical: "Business",
        steps: ["14k log events · CMDB", "2 similar incidents + runbook", "root cause: disk quota", "approved ✓ runbook #42 run"],
        approval: "awaiting on-call approval",
      },
      {
        name: "legacy-migration",
        vertical: "IT",
        steps: ["legacy repo · 84k lines", "37 interfaces mapped", "migration plan · 12 PRs", "reviewed ✓ PR #118 merged"],
        approval: "awaiting code review",
      },
      {
        name: "incident-summary",
        vertical: "End users",
        steps: ["ticket + 3 attachments", "similar cases + KB articles", "summary & resolution draft", "edited ✓ note posted"],
        approval: "awaiting agent’s review",
      },
    ],
    traceTitle: "trace.log",
  },

  os: {
    title: "Dasein.OS",
    stackTitle: "architecture.3d",
    stackSteps: [
      "ingest logs & CMDB",
      "retrieve similar incidents",
      "reason · root cause found",
      "agent prepares remediation",
      "awaiting human approval",
      "runbook executed in ITSM",
      "traced & audited",
    ],
    stackHint: "drag to rotate",
    clockTitle: "Clock 1.0",
    footerTitle: "Dasein",
    footer: ["Version 0.1", "Data & AI engineering.", "All systems nominal."],
  },

  featured: {
    label: "Featured",
    kinds: { article: "Article", announcement: "Announcement", case: "Case study" },
  },

  statement: {
    title: "We don’t stop at chatbots. We build the systems AI runs on.",
    points: [
      { name: "Multi-model", text: "Mistral, OpenAI, Anthropic, open models — the right one for each constraint." },
      { name: "Multi-cloud", text: "AWS, Azure, GCP, IBM or private: we build on what you already run." },
      { name: "Production-first", text: "Identity, permissions, observability and governance from day one." },
    ],
  },

  bigline: ["Six layers.", "One system."],

  trust: {
    label: "Architecture of trust",
    title: "Four guarantees, built into every system.",
    items: [
      {
        name: "Connect without exposing",
        text: "Agents reach systems through gateways, MCP servers and APIs — never with direct, blanket access. Every call is filtered, logged and revocable.",
      },
      {
        name: "Govern autonomy",
        text: "Each agent has its own identity and scoped rights — read, generate, create, update, delete — matched to data sensitivity and validation points.",
      },
      {
        name: "Observe, trace, audit",
        text: "Sources, tool calls, versions, human approvals: every run can be reconstructed, explained and, if needed, stopped.",
      },
      {
        name: "Manage the lifecycle",
        text: "Agents, skills, prompts and models are versioned, tested on behaviour, rolled out progressively and retired when they stop creating value.",
      },
    ],
  },

  method: {
    index: "02",
    label: "Method",
    title: "From experiment to production, step by step.",
    intro:
      "We don’t start from a technology but from a portfolio of use cases — and we only scale what proves its value.",
    deliverablesLabel: "Deliverables",
    steps: [
      {
        file: "01_map.exe",
        name: "Map & prioritise",
        text: "We map use cases with business sponsors and rank them on value × feasibility: quick wins, structural cases, exploratory ones. Make or buy, case by case.",
        deliverables: ["Use-case portfolio", "Value × feasibility matrix", "Autonomy & control level per case"],
      },
      {
        file: "02_design.exe",
        name: "Design the trust architecture",
        text: "Which data, which tools, which rights, which validation points. Agents get their own identity and go through gateways and MCP, not straight into systems.",
        deliverables: ["Target architecture", "Agent identity & rights model", "Human-in-the-loop points"],
      },
      {
        file: "03_pilot.exe",
        name: "Build & pilot",
        text: "A first agent on a restricted scope, with real users, measured from day one: time saved, quality, errors, adoption.",
        deliverables: ["Pilot in real conditions", "Evaluation sets", "Value indicators"],
      },
      {
        file: "04_run.exe",
        name: "Industrialise & run",
        text: "Versioning, observability, rollback, cost control — AgentOps. What creates value is scaled; what doesn’t is retired.",
        deliverables: ["Agent catalogue & registries", "Observability & audit", "AgentOps practices"],
      },
    ],
  },

  offer: {
    caption:
      "Dasein’s offer: support on top; in the middle, User Augmentation and Business Applications around the AI Platform, with governance at its core; below it, the data and semantic foundation; deployment options at the bottom.",
    audience: { left: "People", core: "IT", right: "Processes" },
    axes: { support: "Support", activate: "Activate", govern: "Govern", ground: "Ground", deploy: "Deploy" },
    support: {
      title: "Support",
      items: ["Use-case framing", "Setting up governance", "Upskilling teams"],
    },
    left: { name: "User Augmentation", text: "Agents for every employee" },
    right: { name: "Business Applications", text: "Agents inside business processes" },
    core: { name: "AI Platform", text: "Gateway · Registry · Observability" },
    inner: { name: "Governance", text: "Identity · Rights · Audit" },
    data: {
      title: "Data and semantic foundation",
      items: ["Reliable data", "Reference data", "Meaning shared by teams and agents"],
    },
    infra: ["Public cloud", "Sovereign cloud", "On-premise", "Air-gapped"],
  },

  verticals: {
    index: "01",
    label: "Agentic AI",
    title: "AI governance plays out across three verticals.",
    intro:
      "An assistant that summarises a document and an agent that acts in an ERP don’t call for the same rules. We organise agentic AI in two verticals — end users and business teams — built on a common IT platform that governs every agent.",
    buildsLabel: "What we put in place",
    controlLabel: "Control",
    levels: ["Light", "Reinforced", "Strict"],
    // Used on the Work page to label each case's autonomy.
    patterns: [
      "Augmented assistant",
      "Tool-using agent",
      "Workflow agent",
      "Supervised autonomous agent",
      "Multi-agent orchestration",
    ],
    page: {
      back: "Expertise",
      problemLabel: "The problem",
      buildsLabel: "What we build",
      useCasesLabel: "Typical use cases",
      controlLabel: "Governance",
      casesLabel: "Related work",
      next: "Next vertical",
      more: "Read the article",
    },
    items: [
      {
        id: "end-users",
        slug: "user-augmentation",
        audience: "End users",
        name: "User Augmentation",
        purpose: "Agents for every employee, with their own rights.",
        lead: "Give every employee useful agents that are simple to create and act with their own rights.",
        problem:
          "Employees already use AI, often through consumer tools, outside any framework. Data leaves the company, usage isn’t measured, and assistants aren’t connected to any of your tools.",
        builds: [
          { name: "Choosing and integrating the AI front end", text: "A market front end, sovereign or open source, integrated with your tools." },
          { name: "Declarative agents", text: "Agents described in YAML: reviewed, versioned, approved before publishing." },
          { name: "Governed MCP connections", text: "A catalogue of approved MCP servers, opened by group." },
          { name: "Identity propagation", text: "The agent acts with the user’s rights, nothing more." },
          { name: "Shared skills and prompts", text: "Reusable know-how, managed as a library." },
        ],
        useCases: [
          "Incident summaries and resolution notes",
          "Meeting and committee preparation",
          "Search across technical documentation",
          "First drafts: minutes, knowledge base articles",
        ],
        control: "The agent acts with the user’s own identity and rights; the person approves.",
        controlPoints: [
          "Company-approved tools instead of consumer tools",
          "Classified data: what may and may not be exposed",
          "Human review of every output",
          "A usage charter and team training",
        ],
        level: 1,
      },
      {
        id: "business",
        slug: "business-applications",
        audience: "Business teams",
        name: "Business Applications",
        purpose: "Agents that work inside your processes, under control.",
        lead: "Agents that work inside your processes and help you decide — under control.",
        problem:
          "Recurring processes — tickets, invoices, FinOps recommendations, audits — take up a lot of time on repetitive work, and the data needed to decide stays locked in warehouses and applications.",
        builds: [
          { name: "Main agent and subagents", text: "An agent that plans and delegates, rather than one that does everything." },
          { name: "Talk to my data", text: "Query your data in everyday language, with each person’s rights." },
          { name: "Decision support", text: "Sourced recommendations, approved by an expert." },
          { name: "Control middleware", text: "Human approval, caps, data masking, plugged into the agent loop." },
          { name: "Isolated runtimes", text: "Each agent in its own environment, limited to its scope." },
        ],
        useCases: [
          "FinOps recommendations and remediation follow-up",
          "Supplier invoice reconciliation",
          "Security audit reports before go-live",
          "ITSM ticket automation",
        ],
        control: "Rights limited per agent, isolated runtimes, human approval before any write.",
        controlPoints: [
          "Access rights limited to each agent’s scope",
          "Validated, versioned sources",
          "Human approval at the key steps",
          "Full traceability of every action",
        ],
        level: 2,
      },
      {
        id: "it",
        slug: "ai-platform",
        audience: "IT & platform",
        name: "AI Platform",
        purpose: "The shared foundation that connects, secures and observes every agent.",
        lead: "The common foundation that connects, secures and observes all your agents.",
        problem:
          "Without a common foundation, every team builds its agents on its own: scattered API keys, tools exposed without control, no view of access, cost or errors. Scaling up becomes a risk.",
        builds: [
          { name: "LLM, MCP and agent gateways", text: "One checkpoint per type of flow, each with its own rules." },
          { name: "Catalogue of agents, tools and skills", text: "What is approved, reusable by every team." },
          { name: "Observability, evaluation and cost", text: "Every run traced, measured and attributed to a team." },
          { name: "Standards and centre of excellence", text: "Shared rules and approved models, for a federated model." },
        ],
        useCases: [
          "Group-wide agentic platform",
          "Multi-cloud LLM gateway",
          "Catalogue of agents and MCP servers",
          "Assisted application migration",
        ],
        control: "One control point for every team: identities, access, cost, traces and versions.",
        controlPoints: [
          "One control point for every agent",
          "Each agent has its own identity and revocable rights",
          "Controlled versions: models, prompts, skills",
          "An agent can be retired in a single step",
        ],
        level: 3,
      },
    ],
  },

  architecture: {
    index: "02",
    label: "Architecture",
    title: "One chain, running in production.",
    intro:
      "Scroll to follow one IT incident through a Dasein system. Data comes in and becomes context; a model finds the root cause; an agent prepares the remediation; a human approves; the action runs in a real system — and every step is traced.",
    traceTitle: "trace — example run",
    layers: [
      {
        id: "data",
        name: "Data",
        stack: ["Snowflake", "Databricks", "Cassandra"],
        title: "Data enters the system.",
        text: "Ingestion, pipelines, transformation and history. Streams and batches land in lakehouses, warehouses and operational stores, structured so they can be trusted downstream.",
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
        title: "Data becomes knowledge.",
        text: "Documents and records are turned into a corpus: parsed, enriched with metadata, chunked, embedded and indexed — so models work from what the company actually knows.",
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
        title: "A model reasons over context.",
        text: "The right model for the constraint: performance, sovereignty, cost. Context is engineered, not dumped — and every answer can be evaluated.",
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
        title: "An agent decides and calls a tool.",
        text: "Agents hold state and memory, use skills and tools through MCP, and escalate to a human when policy requires it.",
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
        title: "Approved, then executed in a real system.",
        text: "The agent prepared the fix; the on-call engineer approved it. The result is not a chat message: a ticket updated, a runbook executed, in the tools the company already runs.",
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
        title: "Everything is governed and observed.",
        text: "Gateways, runtimes, identity, permissions, observability and audit make the chain safe to run — on the cloud the company already uses.",
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
    label: "What we build",
    title: "Four layers, engineered together.",
    intro:
      "Most AI projects stall between the demo and production. The gap is rarely the model: it is the data, the context, the integration and the infrastructure around it.",
    items: [
      {
        name: "Data & Knowledge",
        file: "data.sys",
        keywords: ["Corpus", "Pipelines", "Historisation", "Storage", "Search", "Vector", "Knowledge"],
        text: "The foundations: from ingestion to vector stores, so AI systems work on reliable, well-structured data.",
      },
      {
        name: "AI & Models",
        file: "models.sys",
        keywords: ["LLM", "RAG", "Models", "Context", "Reasoning", "Evaluation"],
        text: "Multi-model, multi-provider intelligence layers, with context engineering and evaluation built in.",
      },
      {
        name: "Agents & Automation",
        file: "agents.sys",
        keywords: ["Agents", "Multi-agent", "MCP", "Tools", "Skills", "Memory", "Orchestration"],
        text: "Agents that act on the information system — with tools, memory and humans in the loop.",
      },
      {
        name: "AI Infrastructure",
        file: "infra.sys",
        keywords: ["Runtime", "Gateway", "Cloud", "Security", "Identity", "Observability", "Governance"],
        text: "The production layer: gateways, runtimes, registries, security and governance across clouds.",
      },
    ],
  },

  ecosystem: {
    index: "03",
    label: "Ecosystem",
    title: "Across ecosystems, not locked into one.",
    intro:
      "Dasein is not tied to a model, a cloud or a framework. Our work is to make these pieces run together in one coherent, secure architecture. Pick a system below to see the path it takes.",
    groups: [
      { name: "Data", items: ["Snowflake", "Databricks", "Cassandra", "Fabric", "PostgreSQL", "Qdrant"] },
      { name: "AI", items: ["Mistral AI", "OpenAI", "Anthropic", "Google", "Microsoft", "Open models"] },
      { name: "Agentic", items: ["MCP", "Tools", "Skills", "Runtimes", "Gateways", "Registries"] },
      { name: "Enterprise", items: ["ServiceNow", "ERP", "CRM", "ITSM", "Internal APIs"] },
      { name: "Cloud", items: ["AWS", "Azure", "GCP", "IBM"] },
    ],
    routes: [
      {
        name: "Sovereign document assistant",
        path: ["Azure", "PostgreSQL", "Mistral AI", "MCP", "Internal APIs"],
      },
      {
        name: "IT operations agent",
        path: ["AWS", "Snowflake", "Anthropic", "Runtimes", "ServiceNow"],
      },
      {
        name: "Analytics copilot",
        path: ["GCP", "Databricks", "Google", "Tools", "CRM"],
      },
      {
        name: "Private model platform",
        path: ["IBM", "Cassandra", "Open models", "Gateways", "ERP"],
      },
    ],
  },

  about: {
    label: "About",
    visionLabel: "Our vision",
    title: "AI is not a product. It is a new layer of the information system, and it has to be governed.",
    lead: "To work inside a company, AI must access data, understand context, use tools, act in existing systems, and stay under control. Dasein works at that intersection.",
    beliefsLabel: "What we believe",
    beliefs: [
      {
        title: "AI is becoming a layer of the information system.",
        text: "Not one more tool next to the others: a layer that reads your data, uses your applications and acts in your processes. It deserves the same engineering standards as the rest of the system.",
      },
      {
        title: "Value lies in governance, not in the front end.",
        text: "You can buy the chat interface. What makes the difference is what sits behind it: who can do what, with which data, at what cost, and with what trace.",
        link: { label: "User Augmentation", href: "/expertise/user-augmentation" },
      },
      {
        title: "An agent always acts with someone’s rights.",
        text: "Propagated identity, delegated rights, human approval before writing: an agent must never see or do more than the person it works for.",
        link: { label: "MCP", href: "/articles/mcp" },
      },
      {
        title: "One shared foundation rather than a hundred isolated projects.",
        text: "Gateways, catalogue, observability, standards: pooled once, they let every team move fast without reinventing security.",
        link: { label: "AI Platform", href: "/expertise/ai-platform" },
      },
      {
        title: "The simplest thing that works.",
        text: "A workflow before an agent, one agent before several. Add complexity when the problem demands it, not because the technology allows it.",
        link: { label: "Business Applications", href: "/expertise/business-applications" },
      },
      {
        title: "AI has a physical weight.",
        text: "Behind every model there are megawatts, heat and water. Picking the right model, measuring, and sizing to the real need are part of the engineering job.",
        link: { label: "The megawatt and the degree", href: "/articles/le-megawatt-et-le-degre" },
      },
    ],
    beliefMore: "Read:",
    roleLabel: "Our role",
    roleTitle: "We help put things in place. Your teams stay in charge.",
    role: [
      { title: "Frame", text: "Choose the use cases worth the effort, the level of control each needs and the architecture that carries them." },
      { title: "Build", text: "Put the agents, the foundation and the governance in place with your teams, in your environments and with your tools." },
      { title: "Hand over", text: "Document, explain, train: our articles and glossary follow the same rule, sources, limits, no jargon." },
    ],
    intersection: ["Data", "Software", "AI", "Infrastructure"],
    nameTitle: "Why “Dasein”",
    nameText:
      "Dasein — “being-there”. An intelligence that is not abstract, but situated: present in an environment, aware of its context, able to act in it.",
    audienceTitle: "Who we work with",
    audienceText:
      "Large groups with complex data and cloud ecosystems, and technology companies accelerating the construction of their AI infrastructure and products.",
    clients: [
      { name: "TF1", logo: "tf1.svg" },
      { name: "Safran", logo: "safran.svg" },
      { name: "Icade", logo: "icade.jpg" },
      { name: "L-Acoustics", logo: "l-acoustics-stacked.svg" },
    ],
    audience: [
      {
        title: "Leadership",
        items: ["Executive committees", "Management committees", "CTOs", "IT departments and information systems"],
      },
      {
        title: "Teams",
        items: ["Product", "Data center", "Network", "Cloud", "Data", "Cybersecurity"],
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Let’s talk about your project.",
    intro: "A few lines are enough: your context, the systems involved, what you want to achieve. We will get back to you quickly.",
    name: "Name",
    company: "Company",
    email: "Email",
    project: "Your project",
    projectPlaceholder: "Context, systems involved, what you want to achieve…",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you — your message has been sent. We’ll be in touch shortly.",
    error: "Something went wrong. Please try again in a moment.",
    invalid: "Please fill in every field with a valid email.",
  },

  articlesPage: {
    label: "Articles",
    rubrics: { article: "In-depth articles", case: "Case studies" },
    readingTime: "min read",
    title: "Understanding enterprise AI, without the jargon.",
    intro:
      "In-depth, sourced articles on how to put agents to work inside a company: what changes, what gets stuck, and how to govern it.",
    read: "Read the article",
    glossaryTitle: "Lost on a word?",
    glossaryText: "Every technical and business term used in these articles is explained simply in the glossary.",
    glossaryLink: "Open the glossary",
  },

  glossary: {
    label: "Glossary",
    title: "Data and AI terms, in plain words.",
    intro: "The technical, business and engineering terms used on this site, explained simply.",
  },

  footer: {
    tagline: "Data & AI engineering.",
    rights: "All rights reserved.",
    legal: "Legal notice",
    made: "Designed & engineered by Dasein.",
  },
};

export default en;
export type Dictionary = typeof en;
