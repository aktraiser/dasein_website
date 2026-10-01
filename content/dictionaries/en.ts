const en = {
  meta: {
    siteName: "Dasein",
    title: "Dasein — Data & AI Engineering",
    description:
      "Dasein engineers the data foundations and AI systems that let enterprises turn their data, knowledge and existing tools into systems that understand, reason and act.",
  },

  nav: {
    expertise: "Expertise",
    work: "Work",
    lab: "Lab",
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
        { label: "All expertise", href: "/expertise" },
      ],
    },
    work: {
      explore: "Explore work",
      sideTitle: "Resources",
      side: [
        { label: "All cases", href: "/work" },
        { label: "Start a project", href: "/contact" },
      ],
    },
    lab: {
      explore: "Explore the lab",
      sideTitle: "Lab",
      side: [
        { label: "Research tracks", href: "/lab#tracks" },
        { label: "Log", href: "/lab#log" },
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
        { label: "Expertise", href: "/expertise" },
        { label: "Work", href: "/work" },
        { label: "Lab", href: "/lab" },
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
    secondary: "Explore the lab",
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
    kinds: { article: "Article", announcement: "Announcement", case: "Case study", lab: "Lab" },
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
      "Dasein’s offer: support on top; in the middle, User Augmentation and Business Applications around the AI Platform, with governance at its core; deployment options at the bottom.",
    axes: { support: "Support", activate: "Activate", govern: "Govern", deploy: "Deploy" },
    support: {
      title: "Support",
      items: ["Use-case framing", "Setting up governance", "Upskilling teams"],
    },
    left: { name: "User Augmentation", text: "Agents for every employee" },
    right: { name: "Business Applications", text: "Agents inside business processes" },
    core: { name: "AI Platform", text: "Gateway · Registry · Observability" },
    inner: { name: "Governance", text: "Identity · Rights · Audit" },
    infra: ["Public cloud", "Sovereign cloud", "On-premise", "Air-gapped"],
  },

  verticals: {
    index: "01",
    label: "Agentic AI",
    title: "AI governance plays out across three verticals.",
    intro:
      "An assistant that summarises a document and an agent that acts in an ERP don’t call for the same rules. We organise agentic AI in two verticals — end users and business teams — built on a common IT platform that governs every agent.",
    buildsLabel: "What we build",
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
      more: "Learn more",
    },
    items: [
      {
        id: "end-users",
        slug: "user-augmentation",
        audience: "End users",
        name: "User Augmentation",
        purpose: "AI at the service of every employee.",
        lead: "Give every employee useful agents that are simple to create and act with their own rights.",
        problem:
          "Employees already use AI, often through consumer tools, outside any framework. Data leaves the company, usage isn’t measured, and assistants aren’t connected to any of your tools.",
        builds: [
          { name: "User front end", text: "A single entry point for employees, inside the tools they already use." },
          { name: "Simple agent builder", text: "Teams create their own assistants from approved templates, without development." },
          { name: "Connectors", text: "Access to the company’s documents, tickets, messaging and reference data." },
          { name: "Machine-to-machine connections", text: "Agents talk to applications through APIs, with no manual steps." },
          { name: "Identity propagation", text: "The agent acts with the user’s identity and rights: it only sees what that person may see." },
        ],
        useCases: [
          "Incident summaries and resolution notes",
          "Meeting and committee preparation",
          "Search across technical documentation",
          "First drafts: minutes, knowledge base articles",
        ],
        control: "Agents act with the user’s own identity and rights; the person approves.",
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
        purpose: "AI that acts inside business processes.",
        lead: "Agents that work inside your processes and help you decide — under control.",
        problem:
          "Recurring processes — tickets, invoices, FinOps recommendations, audits — take up a lot of time on repetitive work, and the data needed to decide stays locked in warehouses and applications.",
        builds: [
          { name: "Autonomous agents", text: "Agents that chain several steps of a process: read, analyse, prepare, update." },
          { name: "Talk to my data", text: "Query Snowflake, Databricks or business applications in plain language, with each person’s rights." },
          { name: "Decision support", text: "Reasoned, sourced recommendations, ready for an expert to approve." },
          { name: "Isolated runtimes", text: "Each agent runs in an isolated environment, limited to its scope." },
          { name: "Business connectors", text: "ERP, CRM, ITSM, finance tools: agents act in the applications you already run." },
        ],
        useCases: [
          "FinOps recommendations and remediation follow-up",
          "Supplier invoice reconciliation",
          "Security audit reports before go-live",
          "ITSM ticket automation",
        ],
        control: "Isolated runtimes, scoped rights, human approval at the key steps.",
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
        purpose: "The common foundation for every agent.",
        lead: "The common foundation that connects, secures and observes all your agents.",
        problem:
          "Without a common foundation, every team builds its agents on its own: scattered API keys, tools exposed without control, no view of access, cost or errors. Scaling up becomes a risk.",
        builds: [
          { name: "Gateway for all agents", text: "A single path to models and tools: routing, quotas, filtering, logging." },
          { name: "Registry — agents, skills, prompts, tools", text: "The versioned catalogue of everything your agents use, MCP servers included." },
          { name: "Observability & audit", text: "Every run is traced: sources, tool calls, versions, approvals, cost." },
          { name: "Coding agents & CI/CD", text: "Agents inside the software toolchain — tests, documentation, migrations — reviewed before merge." },
        ],
        useCases: [
          "Group-wide agentic platform",
          "Multi-cloud LLM gateway",
          "Catalogue of agents and MCP servers",
          "Assisted application migration",
        ],
        control: "One control point: identities, access, traces and versions of every agent.",
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

  workTeaser: {
    index: "05",
    label: "Work",
    title: "Problems we know how to solve.",
    link: "All cases",
  },

  labTeaser: {
    index: "06",
    label: "Lab",
    title: "Engineering + Research.",
    text: "Dasein does not only integrate. We experiment with new forms of intelligent systems — multi-agent systems, agent memory, runtimes and interaction protocols — and bring what works back into production.",
    link: "Enter the lab",
  },

  expertise: {
    indexTitle: "Three verticals. One engineering standard.",
    indexIntro:
      "We work where AI has to work for real: with employees, inside business processes, and on the foundation that governs every agent.",
    foundationsLabel: "What we build on",
    foundationsTitle: "Four technical foundations.",
    more: "Learn more",
    label: "Expertise",
    title: "Data, knowledge, intelligence and action — as one system.",
    intro:
      "We work across the whole chain, and on making it run in the real technology environment of the enterprise: cloud, data platforms, models, business applications, APIs and existing information systems.",
    domains: [
      {
        id: "data-knowledge",
        name: "Data & Knowledge",
        summary:
          "Corpus, data engineering, pipelines, historisation, storage, search, vectorisation, RAG and knowledge systems.",
        text: "We build the foundations needed to exploit data, then turn data and documents into knowledge that AI systems can use — so models and agents work from the company’s real knowledge rather than from general knowledge alone.",
        groups: [
          {
            name: "Foundations",
            items: ["Collection & ingestion", "Data engineering", "Pipelines", "Structuring & transformation", "Historisation", "Storage & exposure", "Streaming & events"],
          },
          {
            name: "Stores",
            items: ["Data lakes", "Data warehouses", "Lakehouses", "Relational databases", "Document databases", "Distributed databases", "Vector databases"],
          },
          {
            name: "Knowledge",
            items: ["Corpus building", "Document processing", "Metadata", "Indexing", "Embeddings", "Semantic search", "RAG", "Knowledge bases", "Context & memory"],
          },
        ],
        stack: ["Snowflake", "Databricks", "Cassandra", "Microsoft Fabric", "PostgreSQL", "pgvector", "Qdrant"],
      },
      {
        id: "ai-models",
        name: "AI & Models",
        summary:
          "LLM, RAG, context engineering, specialised models, model serving and generative AI systems.",
        text: "Our approach is deliberately multi-model and multi-provider. We design architectures able to integrate different models and providers depending on performance, security, sovereignty, cost and business needs — including open models deployed on private infrastructure when the context requires it.",
        groups: [
          {
            name: "Capabilities",
            items: ["LLM", "RAG", "Specialised models", "Context engineering", "Reasoning", "Model serving", "Evaluation", "Generative AI applications"],
          },
        ],
        stack: ["Mistral AI", "OpenAI", "Anthropic", "Google", "Microsoft", "IBM", "Open models"],
      },
      {
        id: "agents-automation",
        name: "Agents & Automation",
        summary:
          "AI agents, multi-agent systems, orchestration, MCP, tools, skills, memory and connection to the information system.",
        text: "We build systems that do not only produce information but interact with their environment. The goal is not an AI isolated from the information system, but an intelligence able to understand and use existing systems — in a controlled way.",
        groups: [
          {
            name: "Agentic systems",
            items: ["AI agents", "Multi-agent systems", "Orchestration", "Agentic workflows", "Skills", "Tools", "MCP", "Memory", "State management", "Human-in-the-loop"],
          },
          {
            name: "Connected to",
            items: ["ServiceNow", "Snowflake", "Databricks", "ERP", "CRM", "ITSM", "Internal APIs", "Databases", "Document tools", "Business platforms"],
          },
        ],
        stack: [],
      },
      {
        id: "ai-infrastructure",
        name: "AI Infrastructure",
        summary:
          "Runtimes, gateways, registries, cloud, security, identity, observability and governance.",
        text: "We industrialise the infrastructure these systems need in production, adapted to the company’s existing environment rather than imposing a single stack.",
        groups: [
          {
            name: "Platform",
            items: ["AI / LLM gateways", "Agent gateways", "Agent runtimes", "Model serving", "Registries — agents, skills, prompts, tools", "MCP servers"],
          },
          {
            name: "Control",
            items: ["Security", "Identity", "Permissions", "Observability", "Evaluation", "Traceability", "Governance"],
          },
          {
            name: "Environments",
            items: ["AWS Bedrock / AgentCore", "Azure AI Foundry / AKS / APIM", "Google Cloud Vertex AI", "IBM watsonx", "Kubernetes / OpenShift", "Private infrastructure"],
          },
        ],
        stack: ["AWS", "Microsoft Azure", "Google Cloud Platform", "IBM"],
      },
    ],
    approach: {
      title: "Our approach",
      text: "We do not build chatbots in isolation. We build the Data + AI systems that let artificial intelligence work inside the real environment of the enterprise — coherent, secure and ready to be industrialised.",
      points: [
        { name: "Multi-model", text: "No dependency on a single model or provider." },
        { name: "Multi-cloud", text: "Architectures that fit the cloud you already run." },
        { name: "Production-first", text: "Security, identity, observability and governance from day one." },
      ],
    },
  },

  work: {
    label: "Work",
    title: "Problems we know how to solve.",
    intro:
      "Concrete problems met in the field. Many of our missions are confidential, so cases are described by the problem and the system we built rather than by client name.",
    problem: "Problem",
    build: "What we build",
    stack: "Typical stack",
    confidential: "Anonymised",
    verticalLabel: "Vertical",
    patternLabel: "Autonomy",
    crossCutting: "Cross-cutting",
  },

  lab: {
    label: "Lab",
    title: "Engineering + Research.",
    intro:
      "The lab is a core part of Dasein. We experiment with new forms of intelligent systems, and bring what holds up back into the systems we build for clients.",
    tracksTitle: "Research tracks",
    logTitle: "Log",
    logEmpty:
      "Experiments, demos, technical publications and open-source projects will be published here.",
    status: { active: "Active", exploring: "Exploring" },
  },

  about: {
    label: "About",
    title: "AI is becoming a new layer of the information system.",
    paragraphs: [
      "We do not see artificial intelligence as an isolated product. It is gradually becoming a new layer of the information system.",
      "To really work inside a company, it must be able to access data, understand context, keep a memory, use tools, interact with existing systems and act within a secure framework.",
      "Dasein works precisely at this intersection.",
    ],
    intersection: ["Data", "Software", "AI", "Infrastructure"],
    nameTitle: "Why “Dasein”",
    nameText:
      "Dasein — “being-there”. An intelligence that is not abstract, but situated: present in an environment, aware of its context, able to act in it.",
    audienceTitle: "Who we work with",
    audienceText:
      "Large groups with complex data and cloud ecosystems, and technology companies accelerating the construction of their AI infrastructure and products.",
    audience: [
      "CTO",
      "CIO",
      "Chief Data Officer",
      "Chief AI Officer",
      "Data & AI leads",
      "Architecture leads",
      "Engineering teams",
      "Cloud teams",
      "Data teams",
      "Innovation teams",
      "Business units running structural AI projects",
    ],
  },

  contact: {
    label: "Contact",
    title: "Tell us what you’re building.",
    intro: "A few lines are enough. We’ll get back to you quickly.",
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
    readingTime: "min read",
  },

  glossary: {
    label: "Glossary",
    title: "Data and AI terms, in plain words.",
    intro: "The technical, business and engineering terms used on this site, explained simply.",
  },

  footer: {
    tagline: "Data & AI engineering.",
    rights: "All rights reserved.",
    made: "Designed & engineered by Dasein.",
  },
};

export default en;
export type Dictionary = typeof en;
