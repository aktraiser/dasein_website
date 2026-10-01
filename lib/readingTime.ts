import type { Article, Block } from "@/content/articles";

const WORDS_PER_MINUTE = 220;

const blockText = (block: Block): string => {
  switch (block.type) {
    case "h":
    case "h3":
    case "p":
    case "callout":
    case "note":
      return block.text;
    case "quote":
      return `${block.text} ${block.cite}`;
    case "box":
      return `${block.title} ${block.text}`;
    case "stats":
      return block.items.map((item) => `${item.value} ${item.label}`).join(" ");
    case "compare":
      return block.columns.flatMap((c) => [c.title, ...c.items.map((i) => `${i.value} ${i.label}`)]).join(" ");
    case "timeline":
      return block.items.map((item) => `${item.place} ${item.date} ${item.text.join(" ")}`).join(" ");
    case "list":
      return block.items.join(" ");
    case "defs":
      return block.items.map((item) => `${item.term} ${item.text}`).join(" ");
    case "table":
      return [...block.head, ...block.rows.flat(), block.caption ?? ""].join(" ");
    case "code":
      return block.caption;
    case "figure":
      return block.caption;
    case "related":
      return `${block.title} ${block.text}`;
    case "diagram":
      return "";
  }
};

/** Estimated reading time in whole minutes (at least 1). */
export function readingMinutes(article: Article) {
  const text = [article.lead, ...article.summary, ...article.blocks.map(blockText)].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
