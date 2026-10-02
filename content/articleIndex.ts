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
  /** Rubric on the /articles page: in-depth article or case study. */
  kind: "article" | "case";
  topic: Record<Locale, string>;
  title: Record<Locale, string>;
  /** Short title for the browser tab and search results (under ~50 characters). */
  seoTitle?: Record<Locale, string>;
  /** Publication date (ISO), for structured data and the sitemap. */
  date: string;
};

export const articleIndex: ArticleEntry[] = [
  {
    slug: "le-megawatt-et-le-degre",
    date: "2026-09-24",
    href: "/articles/le-megawatt-et-le-degre",
    cover: "energy",
    kind: "article",
    topic: { fr: "Énergie et infrastructure", en: "Energy and infrastructure" },
    title: {
      fr: "Le mégawatt et le degré",
      en: "The megawatt and the degree",
    },
  },
  {
    slug: "weak-signal-l-acoustics",
    seoTitle: { fr: "Weak Signal avec L-Acoustics : retour d’expérience", en: "Weak Signal with L-Acoustics: a case study" },
    date: "2026-10-01",
    href: "/articles/weak-signal-l-acoustics",
    cover: "weak-signal",
    kind: "case",
    topic: { fr: "Retour d’expérience", en: "Case study" },
    title: {
      fr: "Weak Signal : repérer les opportunités avant les concurrents, avec L-Acoustics",
      en: "Weak Signal: spotting opportunities before competitors, with L-Acoustics",
    },
  },
  {
    slug: "phaseone10841",
    seoTitle: { fr: "PHASEONE10841 : un site pour humains et agents", en: "PHASEONE10841: a site for humans and agents" },
    date: "2026-10-01",
    href: "/articles/phaseone10841",
    cover: "phaseone",
    kind: "case",
    topic: { fr: "Retour d’expérience", en: "Case study" },
    title: {
      fr: "Un site pour les humains et pour les agents : ce que nous avons appris avec PHASEONE10841",
      en: "A site for humans and for agents: what we learned building PHASEONE10841",
    },
  },
  {
    slug: "mcp",
    seoTitle: { fr: "MCP : le protocole et ses limites", en: "MCP: the protocol and its limits" },
    date: "2026-10-01",
    href: "/articles/mcp",
    cover: "mcp",
    kind: "article",
    topic: { fr: "AI Platform", en: "AI Platform" },
    title: {
      fr: "MCP : le protocole, ses limites, et ce qu’il faut autour",
      en: "MCP: the protocol, its limits, and what it needs around it",
    },
  },
  {
    slug: "ai-platform",
    seoTitle: { fr: "AI Platform : le socle commun des agents", en: "AI Platform: the shared foundation for agents" },
    date: "2026-10-01",
    href: "/expertise/ai-platform",
    cover: "platform",
    kind: "article",
    topic: { fr: "AI Platform", en: "AI Platform" },
    title: {
      fr: "Le socle commun qui permet à chaque équipe de construire ses agents",
      en: "The shared foundation that lets every team build its agents",
    },
  },
  {
    slug: "business-applications",
    seoTitle: { fr: "Business Applications : agents et processus", en: "Business Applications: agents in your processes" },
    date: "2026-10-01",
    href: "/expertise/business-applications",
    cover: "business",
    kind: "article",
    topic: { fr: "Business Applications", en: "Business Applications" },
    title: {
      fr: "Des agents qui travaillent dans vos processus, sous contrôle",
      en: "Agents that work inside your processes, under control",
    },
  },
  {
    slug: "user-augmentation",
    seoTitle: { fr: "User Augmentation : un agent par collaborateur", en: "User Augmentation: agents for every employee" },
    date: "2026-10-01",
    href: "/expertise/user-augmentation",
    cover: "user-augmentation",
    kind: "article",
    topic: { fr: "User Augmentation", en: "User Augmentation" },
    title: {
      fr: "Donner des agents à chaque collaborateur, sans perdre le contrôle",
      en: "Giving every employee agents, without losing control",
    },
  },
];
