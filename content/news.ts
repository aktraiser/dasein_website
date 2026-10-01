import type { Locale } from "@/lib/i18n";

/**
 * Articles and announcements shown in the home page's "Featured" grid.
 * The item with `featured: true` is the large card on the left (it stays in
 * place on desktop); the others are listed in the right-hand column, in order.
 *
 * `href` is a site path without the locale ("/lab#memory") or a full URL.
 * `visual` picks the illustration drawn in the card:
 *   chips  — floating logo chips          flow   — source → agent → system
 *   dither — animated 1-bit field         steps  — four numbered steps
 *   shield — shield on the accent colour   mcp    — cover of the MCP article
 *
 * The first entries point to existing pages of the site; replace or add your
 * own articles as they are published.
 */
export type NewsKind = "article" | "announcement" | "case" | "lab";
export type NewsVisual = "chips" | "flow" | "dither" | "steps" | "shield" | "mcp";

export type NewsItem = {
  slug: string;
  kind: NewsKind;
  visual: NewsVisual;
  href: string;
  featured?: boolean;
  content: Record<Locale, { title: string; meta: string }>;
};

export const news: NewsItem[] = [
  {
    slug: "three-verticals",
    kind: "article",
    visual: "chips",
    href: "/#verticals",
    featured: true,
    content: {
      en: { title: "Three verticals for agentic AI", meta: "End users, business, IT" },
      fr: { title: "Trois verticales pour l’IA agentique", meta: "Utilisateurs, métiers, IT" },
    },
  },
  {
    slug: "mcp",
    kind: "article",
    visual: "mcp",
    href: "/articles/mcp",
    content: {
      en: { title: "MCP: the protocol, its limits, and what it needs around it", meta: "AI Platform" },
      fr: { title: "MCP : le protocole, ses limites, et ce qu’il faut autour", meta: "AI Platform" },
    },
  },
  {
    slug: "agents-servicenow",
    kind: "case",
    visual: "flow",
    href: "/work#agents-servicenow",
    content: {
      en: { title: "Agents connected to the information system", meta: "Business teams" },
      fr: { title: "Agents connectés au SI", meta: "Métiers" },
    },
  },
  {
    slug: "agent-memory",
    kind: "lab",
    visual: "dither",
    href: "/lab#memory",
    content: {
      en: { title: "Agent memory", meta: "Active research" },
      fr: { title: "Mémoire des agents", meta: "Recherche active" },
    },
  },
];
