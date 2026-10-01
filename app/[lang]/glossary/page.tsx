import { notFound } from "next/navigation";
import { glossary } from "@/content/glossary";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/glossary">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { glossary: t } = await getDictionary(lang);
  return pageMetadata(lang, "/glossary", t.label, t.intro);
}

export default async function GlossaryPage({ params }: PageProps<"/[lang]/glossary">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { glossary: t } = await getDictionary(lang);

  // Alphabetical, grouped by first letter (accents folded).
  const letterOf = (name: string) => name.normalize("NFD")[0].toUpperCase();
  const entries = [...glossary].sort((a, b) => a[lang].name.localeCompare(b[lang].name, lang));
  const groups = new Map<string, typeof entries>();
  for (const entry of entries) {
    const letter = letterOf(entry[lang].name);
    groups.set(letter, [...(groups.get(letter) ?? []), entry]);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.label}</p>
          <h1 className="display display--serif xp-title">{t.title}</h1>
          <p className="lead">{t.intro}</p>
          <nav className="glossary__letters" aria-label={t.label}>
            {[...groups.keys()].map((letter) => (
              <a key={letter} href={`#letter-${letter}`}>
                {letter}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="container glossary">
        {[...groups].map(([letter, items]) => (
          <section key={letter} id={`letter-${letter}`} className="glossary__group">
            <h2 className="glossary__letter">{letter}</h2>
            <dl>
              {items.map((entry) => (
                <div key={entry.id} id={entry.id} className="glossary__entry">
                  <dt>{entry[lang].name}</dt>
                  <dd>{entry[lang].def}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}
