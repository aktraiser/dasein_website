import { notFound } from "next/navigation";
import { legal } from "@/content/legal";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/legal">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = legal[lang];
  return pageMetadata(lang, "/legal", t.label, t.intro);
}

export default async function LegalPage({ params }: PageProps<"/[lang]/legal">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = legal[lang];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{t.label}</p>
          <h1 className="display display--serif xp-title">{t.title}</h1>
          <p className="lead">{t.intro}</p>
        </div>
      </section>

      <div className="container legal">
        {t.sections.map((section) => (
          <section key={section.id} id={section.id} className="legal__section">
            <h2>{section.title}</h2>
            <div className="legal__body">
              {section.rows && (
                <dl>
                  {section.rows.map(([name, value]) => (
                    <div key={name}>
                      <dt>{name}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
            </div>
          </section>
        ))}
        <p className="legal__updated">{t.updated}</p>
      </div>
    </>
  );
}
