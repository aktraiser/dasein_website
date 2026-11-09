import { articleIndex, type ArticleCover } from "@/content/articleIndex";
import { articles } from "@/content/articles";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "./i18n";
import { articleWords, readingMinutes } from "./readingTime";

/**
 * The whole body of writing as one graph, computed from the content itself:
 * articles and case studies, linked by their "read also" cards, and the offers
 * that cite them. A new article shows up on the map with its links.
 */
export type AtlasGroup = "article" | "case" | "offer";

export type AtlasNode = {
  id: string;
  group: AtlasGroup;
  label: string;
  /** Shorter label drawn on the map. */
  short: string;
  /** Path without the locale. */
  href: string;
  meta: string;
  text: string;
  cover?: ArticleCover;
};

export type AtlasLink = { source: string; target: string };

/** Points linked together, directly or not: one subject, named after its offer or its topic. */
export type AtlasCluster = { name: string; ids: string[] };

/** "Title: subtitle" keeps its title; a long title is cut at a word boundary. */
function shortTitle(title: string) {
  const head = title.split(/\s?:\s/)[0];
  if (head.length <= 30) return head;
  return `${head.slice(0, 28).replace(/[\s,]+\S*$/, "")}…`;
}

export type Atlas = {
  nodes: AtlasNode[];
  links: AtlasLink[];
  counts: Record<AtlasGroup, number>;
  stats: { articles: number; words: number; minutes: number; links: number };
  /** The same map as a list, for touch screens: one cluster per subject. */
  clusters: AtlasCluster[];
};

export function buildAtlas(lang: Locale, offers: Dictionary["offers"], minutesLabel: string, othersLabel: string): Atlas {
  const nodes: AtlasNode[] = [];
  const topics = new Map<string, string>();
  const links = new Map<string, AtlasLink>();
  const link = (source: string, target: string) => {
    if (source !== target) links.set(`${source}>${target}`, { source, target });
  };
  let words = 0;
  let minutes = 0;

  const published = articleIndex.filter((entry) => articles[entry.slug]?.[lang]);
  const ids = new Set(published.map((entry) => `a:${entry.slug}`));

  for (const entry of published) {
    const article = articles[entry.slug]![lang];
    const id = `a:${entry.slug}`;
    words += articleWords(article);
    minutes += readingMinutes(article);
    topics.set(id, entry.topic[lang]);
    nodes.push({
      id,
      group: entry.kind,
      label: entry.title[lang],
      short: shortTitle(entry.title[lang]),
      href: entry.href,
      meta: `${entry.topic[lang]} · ${readingMinutes(article)} ${minutesLabel}`,
      text: article.lead,
      cover: entry.cover,
    });
    // "Read also" cards between articles.
    for (const block of article.blocks) {
      const target = block.type === "related" ? block.href.match(/^\/articles\/([a-z0-9-]+)$/)?.[1] : undefined;
      if (target && ids.has(`a:${target}`)) link(id, `a:${target}`);
    }
  }

  for (const offer of offers.items) {
    const id = `o:${offer.slug}`;
    nodes.push({
      id,
      group: "offer",
      label: offer.name,
      short: offer.name,
      href: `/offers/${offer.slug}`,
      meta: offer.internal,
      text: offer.tagline,
    });
    for (const ref of offer.related) if (ids.has(`a:${ref}`)) link(id, `a:${ref}`);
  }

  const count = (group: AtlasGroup) => nodes.filter((n) => n.group === group).length;
  return {
    nodes,
    links: [...links.values()],
    counts: { article: count("article"), case: count("case"), offer: count("offer") },
    stats: { articles: published.length, words, minutes, links: links.size },
    clusters: clusterNodes(nodes, [...links.values()], topics, othersLabel),
  };
}

/**
 * Splits the map into its connected parts. A part is named after its offer, or
 * else its most common topic; lone points are gathered at the end. Offers come
 * first in each part, then the most linked points.
 */
function clusterNodes(nodes: AtlasNode[], links: AtlasLink[], topics: Map<string, string>, othersLabel: string) {
  const around = new Map<string, string[]>(nodes.map((n) => [n.id, []]));
  for (const { source, target } of links) {
    around.get(source)?.push(target);
    around.get(target)?.push(source);
  }
  const order = new Map(nodes.map((n, i) => [n.id, i]));
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const seen = new Set<string>();
  const parts: string[][] = [];
  for (const node of nodes) {
    if (seen.has(node.id)) continue;
    const part: string[] = [];
    const queue = [node.id];
    seen.add(node.id);
    while (queue.length) {
      const id = queue.shift()!;
      part.push(id);
      for (const next of around.get(id) ?? []) {
        if (seen.has(next)) continue;
        seen.add(next);
        queue.push(next);
      }
    }
    parts.push(part);
  }

  const rank = (id: string) => (byId.get(id)?.group === "offer" ? 1000 : 0) + (around.get(id)?.length ?? 0);
  const sorted = (ids: string[]) => [...ids].sort((a, b) => rank(b) - rank(a) || order.get(a)! - order.get(b)!);
  const named = (ids: string[]): AtlasCluster => {
    const offer = ids.map((id) => byId.get(id)!).find((n) => n.group === "offer");
    if (offer) return { name: offer.label, ids: sorted(ids) };
    const tally = new Map<string, number>();
    for (const id of ids) if (topics.has(id)) tally.set(topics.get(id)!, (tally.get(topics.get(id)!) ?? 0) + 1);
    const topic = [...tally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? othersLabel;
    return { name: topic, ids: sorted(ids) };
  };

  const linked = parts.filter((part) => part.length > 1);
  const alone = parts.filter((part) => part.length === 1).flat();
  const firstOffer = (ids: string[]) => Math.min(...ids.map((id) => (byId.get(id)?.group === "offer" ? order.get(id)! : Infinity)));
  linked.sort((a, b) => firstOffer(a) - firstOffer(b) || b.length - a.length);
  return [...linked.map(named), ...(alone.length ? [{ name: othersLabel, ids: sorted(alone) }] : [])];
}
