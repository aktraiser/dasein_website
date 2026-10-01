import type { ArticleCover } from "@/content/articleIndex";
import type { Locale } from "@/lib/i18n";

/**
 * Articles and announcements shown in the home page's "Featured" grid.
 * The item with `featured: true` is the large card on the left (it stays in
 * place on desktop); the others are listed in the right-hand column, in order.
 *
 * `href` is a site path without the locale ("/articles/mcp") or a full URL.
 * `visual` picks the illustration drawn in the card:
 *   chips  — floating logo chips          flow   — source → agent → system
 *   dither — animated 1-bit field         steps  — four numbered steps
 *   shield — shield on the accent colour
 *   mcp, platform, business, user-augmentation — the article's cover
 *
 * The first entries point to existing pages of the site; replace or add your
 * own articles as they are published.
 */
export type NewsKind = "article" | "announcement" | "case";
/** A visual drawn in the card, or the cover of an article. */
export type NewsVisual = "chips" | "flow" | "dither" | "steps" | "shield" | ArticleCover;

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
    slug: "le-megawatt-et-le-degre",
    kind: "article",
    visual: "energy",
    href: "/articles/le-megawatt-et-le-degre",
    featured: true,
    content: {
      en: { title: "The megawatt and the degree", meta: "Energy and infrastructure" },
      fr: { title: "Le mégawatt et le degré", meta: "Énergie et infrastructure" },
    },
  },
  {
    slug: "weak-signal-l-acoustics",
    kind: "article",
    visual: "weak-signal",
    href: "/articles/weak-signal-l-acoustics",
    content: {
      en: { title: "Weak Signal: spotting opportunities before competitors, with L-Acoustics", meta: "Case study" },
      fr: { title: "Weak Signal : repérer les opportunités avant les concurrents, avec L-Acoustics", meta: "Retour d’expérience" },
    },
  },
  {
    slug: "phaseone10841",
    kind: "article",
    visual: "phaseone",
    href: "/articles/phaseone10841",
    content: {
      en: { title: "A site for humans and for agents: what we learned building PHASEONE10841", meta: "Case study" },
      fr: { title: "Un site pour les humains et pour les agents : ce que nous avons appris avec PHASEONE10841", meta: "Retour d’expérience" },
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
    slug: "ai-platform",
    kind: "article",
    visual: "platform",
    href: "/expertise/ai-platform",
    content: {
      en: { title: "The shared foundation that lets every team build its agents", meta: "AI Platform" },
      fr: { title: "Le socle commun qui permet à chaque équipe de construire ses agents", meta: "AI Platform" },
    },
  },
  {
    slug: "business-applications",
    kind: "article",
    visual: "business",
    href: "/expertise/business-applications",
    content: {
      en: { title: "Agents that work inside your processes, under control", meta: "Business Applications" },
      fr: { title: "Des agents qui travaillent dans vos processus, sous contrôle", meta: "Business Applications" },
    },
  },
  {
    slug: "user-augmentation",
    kind: "article",
    visual: "user-augmentation",
    href: "/expertise/user-augmentation",
    content: {
      en: { title: "Giving every employee agents, without losing control", meta: "User Augmentation" },
      fr: { title: "Donner des agents à chaque collaborateur, sans perdre le contrôle", meta: "User Augmentation" },
    },
  },
];
