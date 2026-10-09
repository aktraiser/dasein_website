import { getDictionary } from "@/content/dictionaries";
import { glossary } from "@/content/glossary";
import { hasLocale, locales, siteUrl } from "@/lib/i18n";
import { markdownResponse } from "@/lib/markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Markdown version of the glossary, served at "/<lang>/glossary.md" (see next.config.ts). */
export async function GET(_request: Request, { params }: RouteContext<"/[lang]/md/glossary">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response(null, { status: 404 });
  const { glossary: t } = await getDictionary(lang);
  const entries = [...glossary].sort((a, b) => a[lang].name.localeCompare(b[lang].name, lang));
  const body = [
    `# ${t.title}`,
    `> ${t.intro}`,
    entries.map((entry) => `- **${entry[lang].name}** — ${entry[lang].def}`).join("\n"),
  ].join("\n\n");
  return markdownResponse(`${body}\n`, `${siteUrl}/${lang}/glossary`);
}
