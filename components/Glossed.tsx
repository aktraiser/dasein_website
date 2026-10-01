import type { ReactNode } from "react";
import { glossary } from "@/content/glossary";
import type { Locale } from "@/lib/i18n";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

/** One regex per locale over every term form, longest first, bounded by non-letters. */
const matchers = Object.fromEntries(
  (["fr", "en"] as const).map((lang) => {
    const forms = glossary
      .flatMap((entry) => entry[lang].match.map((form) => ({ form, id: entry.id })))
      .sort((a, b) => b.form.length - a.form.length);
    const lookup = new Map(forms.map(({ form, id }) => [form.toLowerCase(), id]));
    const pattern = new RegExp(
      // Not inside a word, and not a path segment such as "/api/" or "/mcp".
      `(?<![\\p{L}\\p{N}/])(${forms.map(({ form }) => escape(form)).join("|")})(?![\\p{L}\\p{N}]|/[\\p{L}\\p{N}])`,
      "giu",
    );
    return [lang, { pattern, lookup }];
  }),
) as Record<Locale, { pattern: RegExp; lookup: Map<string, string> }>;

/** Tracks which terms were already explained, so only the first occurrence on a page is marked. */
export type GlossarySeen = Set<string>;
export const newGlossarySeen = (): GlossarySeen => new Set();

/** Inline term with its definition, shown on hover, focus or tap. */
function Term({ id, word, lang }: { id: string; word: string; lang: Locale }) {
  const entry = glossary.find((e) => e.id === id)!;
  const t = entry[lang];
  return (
    <span className="term">
      <span className="term__word" tabIndex={0} aria-describedby={`gl-${id}`}>
        {word}
      </span>
      <span className="term__pop" role="tooltip" id={`gl-${id}`}>
        <strong>{t.name}</strong>
        <span>{t.def}</span>
        <a href={`/${lang}/glossary#${id}`}>
          {lang === "fr" ? "Voir le glossaire" : "See the glossary"} <span aria-hidden="true">→</span>
        </a>
      </span>
    </span>
  );
}

/** Returns the text with the first occurrence of each glossary term marked. */
export function glossText(text: string, lang: Locale, seen: GlossarySeen): ReactNode {
  const { pattern, lookup } = matchers[lang];
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const id = lookup.get(m[0].toLowerCase());
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(text.slice(last, m.index), <Term key={m.index} id={id} word={m[0]} lang={lang} />);
    last = m.index + m[0].length;
  }
  if (out.length === 0) return text;
  out.push(text.slice(last));
  return out;
}
