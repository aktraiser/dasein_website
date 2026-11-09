const en = {
  meta: {
    siteName: "Dasein",
    title: "Dasein: AI agents at work",
    description:
      "Dasein helps companies work with AI agents: team methods, process automation and deployment at scale, under control.",
  },

  nav: {
    offers: "Offers",
    articles: "Articles",
    about: "About",
    contact: "Contact",
    cta: "Contact us",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
  },

  navMenu: {
    offers: {
      explore: "Explore the offers",
      main: [
        { label: "Work with AI", href: "/offers/ways-of-working" },
        { label: "Automate your operations", href: "/offers/solutions" },
        { label: "Deploy AI at scale", href: "/offers/engineering" },
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
        { label: "Offers", href: "/#offers" },
      ],
    },
  },

  hero: {
    eyebrow: "AI agents at work",
    title: "We work with AI agents every day. We put yours to work.",
    // Same sentence with inline pictograms: {arrow} {stack} {secure}
    titleMarked: "We work with AI agents {stack} every day. We put {arrow} yours {secure} to work.",
    chipLabels: { stack: "Technologies we work with", secure: "Secure, human-approved" },
    lead: "From the way your teams work to the systems running in production, with agents that stay under your control.",
    chain: ["Methods", "Processes", "Platforms"],
    primary: "Contact us",
    secondary: "See the offers",
    intro: "Introducing Dasein",
    introRight: "AI agents at work",
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
    footer: ["Version 0.1", "AI agents at work.", "All systems nominal."],
  },

  // Home page: the opening scene, then position, offers, own systems, work, journal, meeting.
  home: {
    stage: {
      label: "Between intention and action, there is meaning",
      scrollLabel: "Explore below",
      opening: "Between intention",
      middle: "and action,",
      ending: "there is",
      meaning: "meaning.",
      intro: "Dasein designs simpler relationships between people and artificial intelligence.",
      contact: "Let’s talk",
      offers: "What we do",
      human: "A human intention",
      machine: "New possibilities",
    },
    simple: {
      systemsTitle: "Inside our workshop.",
      workTitle: "Ideas made tangible.",
      journalTitle: "Take time to understand.",
      projectDetails: "About the project",
      readCase: "Read the case study",
      readArticle: "Read the article",
      relationLabel: "The relationship before the tool",
      relationTitle: "You bring meaning. AI opens possibilities.",
      relationText: "We help your teams work with AI and build the systems that make this collaboration possible.",
      relationSteps: [
        ["Intention", "You bring the context and what matters."],
        ["Dialogue", "AI proposes. You explore and refine."],
        ["Action", "You choose what becomes real."],
      ],
      offersLabel: "Our practice",
      offersTitle: "Three ways forward.",
      offers: [
        { slug: "ways-of-working", name: "Work with AI", text: "Find where AI belongs in your team’s work.", internal: "AI Ways of Working" },
        { slug: "solutions", name: "Build a solution", text: "Build an agent or a tool that is useful to your business.", internal: "AI Solutions Studio" },
        { slug: "engineering", name: "Design the architecture", text: "Design the technical foundations of your AI systems.", internal: "AI Architecture & Engineering" },
      ],
      explore: "What we build and share",
      systemsLabel: "In our workshop",
      discover: "Our monitoring and research station. An internal tool.",
      gatebot: "A WhatsApp assistant, in preparation.",
      workLabel: "Work and publications",
      journalLabel: "Journal",
      allArticles: "Open the journal",
      maker: "AI Maker, our editorial project.",
      contactTitle: "What would you like to do?",
      contactText: "Let’s start there.",
      contactLink: "Start a conversation",
    },
    position: {
      label: "Our position",
      // The middle part is set apart, to leave room between the two.
      title: ["We design what happens", "between", "people and artificial intelligence."],
      text: [
        "Dasein explores and builds new forms of collaboration between people, their knowledge and AI agents.",
        "From the way work is done to the systems that make action possible, we bring together human experience, design and engineering.",
      ],
    },
    offers: {
      label: "What we do",
      title: "Three ways we intervene.",
      intro: "Independent and complementary, each one starts with a short first engagement.",
      resultLabel: "Outcome",
      more: "See the offer",
      items: [
        {
          slug: "ways-of-working",
          name: "Transform work",
          internal: "AI Ways of Working",
          text: [
            "When agents can search, analyse, produce and act, the way work is done changes.",
            "We design agentic environments together with the people who use them: tools, skills, knowledge, memory, delegation, supervision and creation.",
          ],
          result: "A working environment people actually use, and a method suited to the team’s activities.",
        },
        {
          slug: "solutions",
          name: "Build systems",
          internal: "AI Solutions Studio",
          text: [
            "Turning intentions and business needs into operational systems.",
            "We build agents and processes connected to the organisation’s tools, data and rules.",
          ],
          result: "A working, measurable use case, with controlled actions.",
        },
        {
          slug: "engineering",
          name: "Architect intelligence",
          internal: "AI Architecture & Engineering",
          text: [
            "Artificial intelligence is becoming a component of enterprise systems.",
            "We design the architectures that let agents access knowledge, use tools, respect identities and permissions, and act with traceability.",
          ],
          result: "Foundations to build, secure and evolve AI systems.",
        },
      ],
    },
    systems: {
      label: "Our own systems",
      title: "We also build our own systems.",
      intro: "We work every day with the agents we build. Two of them, shown as they are.",
      items: [
        {
          name: "Discover",
          state: "live",
          status: "In use internally · not for sale",
          role: "Our monitoring and research station.",
          text: "It collects and connects a wide range of information sources to support our analyses and publications.",
          spec: [
            ["Function", "Monitoring and research"],
            ["Used for", "Our analyses and our journal"],
            ["Access", "Internal"],
          ],
        },
        {
          name: "Gatebot",
          state: "soon",
          status: "In preparation",
          role: "Our personal assistant on WhatsApp, for freelancers and small-business owners.",
          text: "It keeps track of ongoing matters and aims to carry out actions with its user’s agreement.",
          spec: [
            ["Channel", "WhatsApp"],
            ["For", "Freelancers, small-business owners"],
            ["Principle", "Act with the user’s agreement"],
            ["Opening", "Once its reliability and security criteria are met"],
          ],
        },
      ],
    },
    proofs: {
      label: "Work",
      title: "What we have done.",
      intro: "Each entry states what it is: a client project, an internal experiment or a technical publication.",
      kinds: { client: "Client project", internal: "Internal experiment", publication: "Technical publication" },
      // `slug` is an entry of content/articleIndex.ts: the page each line opens.
      items: [
        {
          slug: "weak-signal-l-acoustics",
          kind: "client",
          name: "Weak Signal",
          text: "An agentic pipeline that reads the news, qualifies opportunities and sends them to the right sales team.",
          meta: "With L-Acoustics · delivered in December 2025",
        },
        {
          slug: "phaseone10841",
          kind: "internal",
          name: "PHASEONE10841",
          text: "A documentary memorial open to AI agents: two interfaces for the same content, an MCP server, access rules.",
          meta: "phaseone10841.fr",
        },
        {
          slug: "mcp",
          kind: "publication",
          name: "MCP",
          text: "The protocol, its limits, and what it needs around it.",
          meta: "AI platform",
        },
        {
          slug: "ai-platform",
          kind: "publication",
          name: "AI Platform",
          text: "The shared foundation that lets every team build its agents.",
          meta: "Architecture",
        },
      ],
    },
    journal: {
      label: "Journal",
      title: "Observe, research, write.",
      intro: "Technical articles and analyses, prepared with Discover. Every source is checked before publication.",
      editorial: "Also: AI Maker, our editorial project.",
      all: "All articles",
    },
    meet: {
      label: "Meeting",
      question: "What could artificial intelligence change in the way you work?",
      offers: "Explore what we do",
      contact: "Tell us about your project",
    },
  },

  bigline: ["Six layers.", "One system."],

  trust: {
    label: "Architecture of trust",
    title: "Four guarantees, built into every system.",
    items: [
      {
        name: "Connect without exposing",
        text: "Agents reach systems through gateways, MCP servers and APIs, never with direct, blanket access. Every call is filtered, logged and revocable.",
      },
      {
        name: "Govern autonomy",
        text: "Each agent has its own identity and scoped rights (read, generate, create, update, delete) matched to data sensitivity and validation points.",
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
      "We don’t start from a technology but from a portfolio of use cases, and we only scale what proves its value.",
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
        text: "Versioning, observability, rollback, cost control: AgentOps. What creates value is scaled; what doesn’t is retired.",
        deliverables: ["Agent catalogue & registries", "Observability & audit", "AgentOps practices"],
      },
    ],
  },

  offers: {
    label: "Offers",
    title: "Three ways to work with us.",
    intro: "Each offer starts from a problem you already know, and begins with a short first engagement with a defined scope. They stand on their own and work together.",
    resultLabel: "What you end up with",
    startLabel: "To get started",
    more: "See the offer",
    page: {
      back: "Offers",
      secondaryCta: "How it works",
      whatLabel: "What we do",
      resultLabel: "What you end up with",
      proofLabel: "What we have done",
      startLabel: "To get started",
      entryLabel: "First engagement",
      nextLabel: "Then",
      deliverablesLabel: "Deliverables",
      scopeNote: "Duration and price are set together, based on your scope.",
      talk: "Talk about it",
      howLabel: "How it works",
      conditionsLabel: "What it takes to succeed",
      excludedLabel: "Out of scope",
      technicalLabel: "For technical teams",
      readingLabel: "Further reading",
      read: "Read",
      closingText: "A few lines are enough: your context and what you want to achieve. We will get back to you quickly.",
      otherOffers: "The other offers",
      kinds: { article: "Article", case: "Case study" },
    },
    items: [
      {
        slug: "ways-of-working",
        name: "Work with AI",
        internal: "AI Ways of Working",
        audience: "Teams and leaders",
        says: "“My teams use ChatGPT, each in their own corner.”",
        tagline: "Your teams already use AI. Let’s give them the right tools and a shared method.",
        lead: "We start with your team’s tasks to configure its AI tools, prepare reusable methods and learn how to delegate work, check it and share what works.",
        result: "A pilot team that works with its agents: a configured environment, shared skills and a common method to delegate and check.",
        figures: [] as { value: string; label: string }[],
        figuresNote: "",
        features: [
          {
            title: "An environment set up for each person",
            text: "Claude, ChatGPT or Gemini, connected to the tools your team is allowed to use, with skills written for your work.",
            window: "team-workspace",
            rows: [
              { label: "Assistant · email, calendar, documents", status: "connected", tone: "ok" },
              { label: "Skill · meeting summary", status: "active", tone: "ok" },
              { label: "Skill · contract review", status: "active", tone: "ok" },
              { label: "Skill · competitor watch", status: "in test", tone: "wait" },
            ],
          },
          {
            title: "A shared method to delegate",
            text: "What to hand to an agent, what to check, what to keep: simple rules, shared by the whole team.",
            window: "method.md",
            rows: [
              { label: "Draft of a meeting report", status: "delegate", tone: "ok" },
              { label: "Figures in a quote", status: "check", tone: "wait" },
              { label: "Decision for a client", status: "keep", tone: "off" },
            ],
          },
          {
            title: "Data that stays under control",
            text: "A usage charter and a clear classification: what may be handed to an agent, and what may not.",
            window: "data-rules",
            rows: [
              { label: "Public documents", status: "allowed", tone: "ok" },
              { label: "Internal documents", status: "approved tools only", tone: "ok" },
              { label: "Client data", status: "on approval", tone: "wait" },
              { label: "HR data", status: "excluded", tone: "off" },
            ],
          },
        ],
        start: {
          name: "Team pilot",
          text: "A small team, one environment, a few skills, one workshop.",
          steps: [
            { name: "Assessment", text: "Who uses what, for which tasks, with which data." },
            {
              name: "Configuration",
              text: "A working environment: tools, skills, approved connections.",
            },
            {
              name: "Method workshop",
              text: "Handing work to an agent, checking it, sharing what works.",
            },
          ],
          deliverables: "The environment in place, a team guide, three to five skills for your work.",
        },
        nextName: "Team rollout",
        next: "Extending to the whole team, a shared knowledge base, governance of rights and data, support over time. Leadership workshops, team training and training for internal champions complete the offer.",
        conditions: [
          "A sponsor who backs the project: a CEO or a business head.",
          "A volunteer pilot team, available for the workshop.",
          "Tools and data approved by your security team before we start.",
        ],
        excluded: [
          "Rolling out to the whole team, which comes next.",
          "Building custom tools.",
          "Support after delivery.",
        ],
        technical: "Claude, Codex or Gemini configuration; shared skills and prompt libraries; memory and knowledge base; MCP connectors to the team’s tools; delegation and supervision rules; a usage charter and a classification of the data that may, or may not, be handed to an agent.",
        related: ["user-augmentation"],
        cta: "Plan a team pilot",
        closing: "Start with a pilot team.",
      },
      {
        slug: "solutions",
        name: "Automate your operations",
        internal: "AI Solutions Studio",
        audience: "Business and operations teams",
        says: "“We lose hours on repetitive tasks.”",
        tagline: "Hand repetitive tasks to an agent, and keep control of what matters.",
        lead: "Documents, emails, files, invoices: part of your work repeats every day. We build an agent that takes these tasks on, connected to your tools, and asks for your approval at the steps that matter.",
        result: "A first automated process tested on your data, a before-and-after assessment and a limited production rollout when the prerequisites are met.",
        figures: [
          { value: "×5", label: "articles processed every day" },
          { value: "×10", label: "faster to qualify an opportunity" },
          { value: "−58%", label: "false positives" },
        ],
        figuresNote: "Weak Signal, with L-Acoustics: an agentic pipeline that reads the news, qualifies opportunities and passes them to the right sales team.",
        features: [
          {
            title: "An agent connected to your tools",
            text: "It reads documents, emails or files where they arrive, and prepares the work in your applications.",
            window: "invoice-agent",
            rows: [
              { label: "Invoices received", status: "read", tone: "ok" },
              { label: "Matched with purchase orders", status: "done", tone: "ok" },
              { label: "Discrepancies found", status: "to check", tone: "wait" },
            ],
          },
          {
            title: "Your approval at the steps that matter",
            text: "The agent prepares, a person approves. Nothing is written to your systems without consent, and every action is traced.",
            window: "approval",
            rows: [
              { label: "Supplier discrepancy", status: "awaiting approval", tone: "wait" },
              { label: "Credit note prepared", status: "ready", tone: "ok" },
              { label: "Payment", status: "blocked until approved", tone: "off" },
            ],
          },
          {
            title: "A measured result",
            text: "Time spent, errors, delays: measured before and after, to decide whether to extend, adjust or stop.",
            window: "review",
            rows: [
              { label: "Processing time · before / after", status: "measured", tone: "ok" },
              { label: "Errors · before / after", status: "measured", tone: "ok" },
              { label: "Next process", status: "to decide", tone: "wait" },
            ],
          },
        ],
        start: {
          name: "Process sprint",
          text: "One case, chosen with you, taken to production.",
          steps: [
            {
              name: "Prerequisites",
              text: "In the first week we check access, data, security and the availability of a business owner, and we choose the process.",
            },
            { name: "Baseline", text: "Time spent, errors, delays: the before, in numbers." },
            { name: "Build", text: "The agent is built and tested on your data, with real users." },
            {
              name: "Production",
              text: "On a limited scope, if the prerequisites are met; otherwise it becomes a separate engagement.",
            },
            {
              name: "Review",
              text: "The after, measured, and the decision: extend, adjust or stop.",
            },
          ],
          deliverables: "The automated process, the before-and-after review, the list of next processes.",
        },
        nextName: "Next processes",
        next: "Other processes, one at a time. When agents multiply, a shared foundation to run them: that is the third offer.",
        conditions: [
          "A business owner available every week.",
          "Approved access to the systems involved.",
          "Usable data.",
          "A shared definition of the expected result and of how to measure it.",
        ],
        excluded: [
          "Redesigning your existing tools.",
          "Migrating historical data.",
          "Running the process after the sprint, under a separate contract.",
        ],
        technical: "Lead agent and sub-agents; document processing (extraction, filing, drafting); workflows; API and MCP integrations; human approval, caps and data masking; evaluation sets and value metrics.",
        related: ["weak-signal-l-acoustics", "business-applications"],
        cta: "Suggest a process to automate",
        closing: "Start with one process.",
      },
      {
        slug: "engineering",
        name: "Deploy AI at scale",
        internal: "AI Architecture & Engineering",
        audience: "CIOs, CTOs, architects",
        says: "“Every team starts its own AI project, and nobody controls anything.”",
        tagline: "A shared foundation so every team can build its agents without multiplying risks.",
        lead: "Several teams are already building agents. Without a shared foundation, access, costs and risks multiply. We design and put in place the architecture that lets your agents work with your systems, your security rules and your control requirements, on the cloud you already use.",
        result: "A target architecture to review with your security team, an agent identity and permissions model, and a deployment plan.",
        figures: [] as { value: string; label: string }[],
        figuresNote: "",
        features: [
          {
            title: "One gateway for every agent",
            text: "Gateways for models, MCP tools and agents: every call is filtered, logged and revocable.",
            window: "gateway",
            rows: [
              { label: "llm-gateway · eu-west", status: "active", tone: "ok" },
              { label: "mcp · ticketing", status: "read only", tone: "ok" },
              { label: "mcp · erp", status: "write on approval", tone: "wait" },
              { label: "Personal API key", status: "refused", tone: "off" },
            ],
          },
          {
            title: "An identity and rights for each agent",
            text: "Each agent acts with its own identity or the user’s, never with more rights than it needs.",
            window: "agents",
            rows: [
              { label: "support-agent", status: "read · draft", tone: "ok" },
              { label: "finops-agent", status: "read · recommend", tone: "ok" },
              { label: "invoice-agent", status: "write after approval", tone: "wait" },
            ],
          },
          {
            title: "Costs, traces and versions under control",
            text: "Every run is traced, attributed to a team and versioned. An agent is retired in a single operation.",
            window: "observability",
            rows: [
              { label: "Cost per team", status: "tracked", tone: "ok" },
              { label: "Run traces", status: "kept", tone: "ok" },
              { label: "legacy-agent v2", status: "retired", tone: "off" },
            ],
          },
        ],
        start: {
          name: "Architecture review",
          text: "An assessment and a target architecture, before building anything.",
          steps: [
            { name: "Current state", text: "Existing agents, access, data flows, costs." },
            { name: "Gaps", text: "What departs from your security and compliance requirements." },
            {
              name: "Target architecture",
              text: "The foundation to put in place and the roadmap to get there.",
            },
          ],
          deliverables: "A reference architecture, an identity and rights model for agents, a rollout plan.",
        },
        nextName: "Building the platform",
        next: "Building and running the platform, then the business agents that rely on it.",
        conditions: [
          "A counterpart in IT or architecture.",
          "Access to the architecture documentation and the security policies.",
          "Interviews with the teams already building agents.",
        ],
        excluded: [
          "Building the platform, which comes next.",
          "A formal security audit or a certification.",
        ],
        technical: "LLM, MCP and agent gateways; an identity for each agent and propagation of the user’s identity; a catalogue of agents, tools and skills; observability, evaluation and cost tracking; versioning and rollback; deployment on public cloud, sovereign cloud, on premises or air-gapped; data and semantic foundation.",
        related: ["ai-platform", "mcp", "couche-semantique", "phaseone10841"],
        cta: "Request an architecture review",
        closing: "Start with an architecture review.",
      },
    ],
  },

  architecture: {
    index: "02",
    label: "Architecture",
    title: "One chain, running in production.",
    intro:
      "Scroll to follow one IT incident through a Dasein system. Data comes in and becomes context; a model finds the root cause; an agent prepares the remediation; a human approves; the action runs in a real system, and every step is traced.",
    traceTitle: "trace: example run",
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
        text: "Documents and records are turned into a corpus: parsed, enriched with metadata, chunked, embedded and indexed, so models work from what the company actually knows.",
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
        text: "The right model for the constraint: performance, sovereignty, cost. Context is engineered, not dumped, and every answer can be evaluated.",
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
        text: "Gateways, runtimes, identity, permissions, observability and audit make the chain safe to run, on the cloud the company already uses.",
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
        text: "Agents that act on the information system, with tools, memory and humans in the loop.",
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
        link: { label: "User Augmentation", href: "/articles/user-augmentation" },
      },
      {
        title: "An agent always acts with someone’s rights.",
        text: "Propagated identity, delegated rights, human approval before writing: an agent must never see or do more than the person it works for.",
        link: { label: "MCP", href: "/articles/mcp" },
      },
      {
        title: "One shared foundation rather than a hundred isolated projects.",
        text: "Gateways, catalogue, observability, standards: pooled once, they let every team move fast without reinventing security.",
        link: { label: "AI Platform", href: "/articles/ai-platform" },
      },
      {
        title: "The simplest thing that works.",
        text: "A workflow before an agent, one agent before several. Add complexity when the problem demands it, not because the technology allows it.",
        link: { label: "Business Applications", href: "/articles/business-applications" },
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
      "Dasein: “being-there”. An intelligence that is not abstract, but situated: present in an environment, aware of its context, able to act in it.",
    audienceTitle: "Who we work with",
    audienceText:
      "From large groups to SMEs: teams that want to work with AI agents, business heads who want to automate, and IT departments that need to deploy AI at scale without losing control.",
    clients: [
      { name: "TF1", logo: "tf1.svg" },
      { name: "Safran", logo: "safran.svg" },
      { name: "Icade", logo: "icade.jpg" },
      { name: "L-Acoustics", logo: "l-acoustics-stacked.svg" },
    ],
    audience: [
      {
        title: "Leadership",
        items: ["SME and mid-cap leaders", "Executive committees", "Business heads", "CTOs", "IT departments and information systems"],
      },
      {
        title: "Teams",
        items: ["Operations", "Product", "Data center", "Network", "Cloud", "Data", "Cybersecurity"],
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
    topic: "Subject",
    topicNone: "Choose a subject (optional)",
    topics: {
      "ways-of-working": "Work with AI",
      solutions: "Automate your operations",
      engineering: "Deploy AI at scale",
      other: "Something else",
    },
    project: "Your project",
    projectPlaceholder: "Context, systems involved, what you want to achieve…",
    submit: "Send",
    sending: "Sending…",
    success: "Thank you, your message has been sent. We’ll be in touch shortly.",
    error: "Something went wrong. Please try again in a moment.",
    invalid: "Please fill in every field with a valid email.",
  },

  articlesPage: {
    label: "Articles",
    readingTime: "min read",
    title: "AI, in practice.",
    intro:
      "Uses, architecture, energy: our analyses and project experience to inform your decisions.",
    glossaryTitle: "Lost on a word?",
    glossaryText: "Every technical and business term used in these articles is explained simply in the glossary.",
    glossaryLink: "Open the glossary",
    atlas: {
      kicker: "The Dasein journal",
      intro:
        "Each point is an article or an offer; each line, a link between them. Hover to see the links, click to open.",
      groups: { article: "In-depth articles", case: "Case studies", offer: "Offers" },
      groupText: {
        article: "Sourced analyses of AI in the enterprise.",
        case: "What we built, and what we learned from it.",
        offer: "The three ways to work with us.",
      },
      stats: { articles: "articles", words: "words", minutes: "minutes of reading", links: "links" },
      open: {
        article: "Read the article",
        case: "Read the case study",
        offer: "See the offer",
      },
      linked: "Links",
      linkedTo: "Linked to:",
      others: "Other subjects",
      search: "Search an article or an offer",
      reset: "Recentre",
      close: "Close",
      toList: "See the list",
      loading: "Drawing the map…",
      unsupported: "The map needs WebGL, which is not available here. Every article is listed just below.",
      mapLabel: "Map of the articles and offers, linked together",
    },
  },

  glossary: {
    label: "Glossary",
    title: "Data and AI terms, in plain words.",
    intro: "The technical, business and engineering terms used on this site, explained simply.",
  },

  footer: {
    tagline: "AI agents at work, under control.",
    rights: "All rights reserved.",
    legal: "Legal notice",
    made: "Designed & engineered by Dasein.",
  },
};

export default en;
export type Dictionary = typeof en;
