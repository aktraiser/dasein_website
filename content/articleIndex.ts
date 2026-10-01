import type { Locale } from "@/lib/i18n";

/**
 * Every published article, newest or most important first. Kept light (no
 * article bodies) so the header menu can use it. The first entry is featured
 * on the /articles page. `cover` picks the illustration in components/covers.
 */
export type ArticleCover =
  | "energy"
  | "weak-signal"
  | "phaseone"
  | "mcp"
  | "platform"
  | "business"
  | "user-augmentation";

export type ArticleEntry = {
  slug: string;
  /** Path without the locale. */
  href: string;
  cover: ArticleCover;
  topic: Record<Locale, string>;
  title: Record<Locale, string>;
  /** Publication date (ISO), for structured data and the sitemap. */
  date: string;
};

export const articleIndex: ArticleEntry[] = [
  {
    slug: "le-megawatt-et-le-degre",
    date: "2026-09-24",
    href: "/articles/le-megawatt-et-le-degre",
    cover: "energy",
    topic: { fr: "Énergie et infrastructure", en: "Energy and infrastructure" },
    title: {
      fr: "Le mégawatt et le degré",
      en: "The megawatt and the degree",
    },
  },
  {
    slug: "weak-signal-l-acoustics",
    date: "2026-10-01",
    href: "/articles/weak-signal-l-acoustics",
    cover: "weak-signal",
    topic: { fr: "Retour d’expérience", en: "Case study" },
    title: {
      fr: "Weak Signal : repérer les opportunités avant les concurrents, avec L-Acoustics",
      en: "Weak Signal: spotting opportunities before competitors, with L-Acoustics",
    },
  },
  {
    slug: "phaseone10841",
    date: "2026-10-01",
    href: "/articles/phaseone10841",
    cover: "phaseone",
    topic: { fr: "Retour d’expérience", en: "Case study" },
    title: {
      fr: "Un site pour les humains et pour les agents : ce que nous avons appris avec PHASEONE10841",
      en: "A site for humans and for agents: what we learned building PHASEONE10841",
    },
  },
  {
    slug: "mcp",
    date: "2026-10-01",
    href: "/articles/mcp",
    cover: "mcp",
    topic: { fr: "AI Platform", en: "AI Platform" },
    title: {
      fr: "MCP : le protocole, ses limites, et ce qu’il faut autour",
      en: "MCP: the protocol, its limits, and what it needs around it",
    },
  },
  {
    slug: "ai-platform",
    date: "2026-10-01",
    href: "/expertise/ai-platform",
    cover: "platform",
    topic: { fr: "AI Platform", en: "AI Platform" },
    title: {
      fr: "Le socle commun qui permet à chaque équipe de construire ses agents",
      en: "The shared foundation that lets every team build its agents",
    },
  },
  {
    slug: "business-applications",
    date: "2026-10-01",
    href: "/expertise/business-applications",
    cover: "business",
    topic: { fr: "Business Applications", en: "Business Applications" },
    title: {
      fr: "Des agents qui travaillent dans vos processus, sous contrôle",
      en: "Agents that work inside your processes, under control",
    },
  },
  {
    slug: "user-augmentation",
    date: "2026-10-01",
    href: "/expertise/user-augmentation",
    cover: "user-augmentation",
    topic: { fr: "User Augmentation", en: "User Augmentation" },
    title: {
      fr: "Donner des agents à chaque collaborateur, sans perdre le contrôle",
      en: "Giving every employee agents, without losing control",
    },
  },
];
