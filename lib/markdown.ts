import type { Article, Block } from "@/content/articles";
import { siteUrl, type Locale } from "./i18n";

/**
 * Plain Markdown versions of the articles, for AI agents and other programs:
 * the same content as the page, without layout. Diagrams are drawn in the page,
 * so here each one is replaced by a sentence saying what it shows.
 */
type Variant = NonNullable<Extract<Block, { type: "diagram" }>["variant"]>;

const DIAGRAMS: Record<Variant, Record<Locale, string>> = {
  governance: {
    fr: "La chaîne de gouvernance : l’utilisateur, son assistant, la gateway et les systèmes, avec les contrôles à chaque étape.",
    en: "The governance chain: the user, their assistant, the gateway and the systems, with checks at each step.",
  },
  mcp: {
    fr: "Le socle autour de MCP : les agents passent par un registry et des gateways avant d’atteindre les serveurs MCP et les modèles.",
    en: "The foundation around MCP: agents go through a registry and gateways before reaching MCP servers and models.",
  },
  patterns: {
    fr: "Les schémas de coordination entre plusieurs agents.",
    en: "The coordination patterns between several agents.",
  },
  protocols: {
    fr: "Trois protocoles complémentaires : AG-UI entre l’interface et l’agent, MCP entre l’agent et les outils, A2A entre agents.",
    en: "Three complementary protocols: AG-UI between interface and agent, MCP between agent and tools, A2A between agents.",
  },
  hooks: {
    fr: "Les points de la boucle de l’agent où se branchent les middlewares et les hooks.",
    en: "The points in the agent loop where middleware and hooks plug in.",
  },
  platform: {
    fr: "Les blocs de l’AI Platform et les trois façons dont les équipes s’en servent.",
    en: "The blocks of the AI Platform and the three ways teams use it.",
  },
  federated: {
    fr: "Le modèle fédéré : une équipe plateforme fournit le socle, les équipes applicatives construisent dessus.",
    en: "The federated model: a platform team provides the foundation, application teams build on it.",
  },
  usecases: {
    fr: "Trois familles de cas d’usage sur un socle commun : interroger ses données, aider à la décision, agir dans les systèmes.",
    en: "Three families of use cases on a shared foundation: querying data, supporting decisions, acting in systems.",
  },
  auth: {
    fr: "Les quatre façons de relier l’identité de l’utilisateur au serveur MCP, à travers les gateways.",
    en: "The four ways to carry the user’s identity to the MCP server, through the gateways.",
  },
  gateways: {
    fr: "Trois gateways : vers les modèles (LLM), vers les outils (MCP) et entre agents (A2A).",
    en: "Three gateways: to models (LLM), to tools (MCP) and between agents (A2A).",
  },
  pipeline: {
    fr: "Le pipeline Weak Signal en quatre étapes : collecter, indexer, analyser, distribuer.",
    en: "The Weak Signal pipeline in four steps: collect, index, analyse, distribute.",
  },
  "semantic-chain": {
    fr: "D’une donnée brute à son sens : la donnée (ID vidéo 84721), le concept (épisode), le contexte (rattaché à un programme), les attributs et relations (genre : sport, saison : 2).",
    en: "From a raw value to its meaning: the data (video ID 84721), the concept (episode), the context (attached to a programme), the attributes and relationships (genre: sport, season: 2).",
  },
  "semantic-house": {
    fr: "Métiers et équipes tech alimentent le socle sémantique partagé ; la plateforme agentique le rend utilisable, sous la gouvernance data et IA.",
    en: "Business and tech teams feed the shared semantic foundation; the agentic platform makes it usable, under data and AI governance.",
  },
};

const cell = (text: string) => text.replace(/\|/g, "\\|").replace(/\n/g, " ");
const absolute = (href: string, lang: Locale) => (href.startsWith("http") ? href : `${siteUrl}/${lang}${href}`);

function blockToMarkdown(block: Block, lang: Locale): string {
  switch (block.type) {
    case "h":
      return `## ${block.text}`;
    case "h3":
      return `### ${block.text}`;
    case "p":
      return block.text;
    case "list":
      return block.items.map((item) => `- ${item}`).join("\n");
    case "defs":
      return block.items.map((item) => `- **${item.term}** — ${item.text}`).join("\n");
    case "code":
      return `${block.caption}\n\n\`\`\`\n${block.text}\n\`\`\``;
    case "table":
      return [
        `| ${block.head.map(cell).join(" | ")} |`,
        `| ${block.head.map(() => "---").join(" | ")} |`,
        ...block.rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
        ...(block.caption ? ["", `*${block.caption}*`] : []),
      ].join("\n");
    case "quote":
      return `> ${block.text}\n>\n> — ${block.cite}`;
    case "note":
      return `*${block.text}*`;
    case "callout":
      return `> ${block.text}`;
    case "stats":
      return block.items.map((item) => `- **${item.value}** — ${item.label}`).join("\n");
    case "compare":
      return [
        ...block.columns.map(
          (column) => `**${column.title}**\n\n${column.items.map((item) => `- **${item.value}** — ${item.label}`).join("\n")}`,
        ),
        ...(block.caption ? [`*${block.caption}*`] : []),
      ].join("\n\n");
    case "timeline":
      return block.items
        .map((item) => `**${item.date} — ${item.place}**${item.tag ? ` (${item.tag})` : ""}\n\n${item.text.join("\n\n")}`)
        .join("\n\n");
    case "box":
      return `**${block.title}**\n\n${block.text}`;
    case "figure":
      return `*${block.caption}*`;
    case "related":
      return `${block.label} : [${block.title}](${absolute(block.href, lang)}) — ${block.text}`;
    case "diagram":
      return `*${lang === "fr" ? "Schéma" : "Diagram"} — ${DIAGRAMS[block.variant ?? "governance"][lang]}*`;
  }
}

export function articleToMarkdown(article: Article, lang: Locale, path: string) {
  const url = `${siteUrl}/${lang}${path}`;
  return [
    `# ${article.title}`,
    `> ${article.lead}`,
    `${lang === "fr" ? "Source" : "Source"} : ${url} · Dasein · ${article.updated}`,
    `## ${article.summaryLabel}`,
    article.summary.map((line) => `- ${line}`).join("\n"),
    ...article.blocks.map((block) => blockToMarkdown(block, lang)),
    `## ${article.sourcesLabel}`,
    article.sources.map((source) => (source.url ? `- [${source.label}](${source.url})` : `- ${source.label}`)).join("\n"),
  ].join("\n\n") + "\n";
}

/** Markdown response, pointing search engines back to the HTML page as the canonical one. */
export const markdownResponse = (body: string, canonical: string) =>
  new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
