import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/dictionaries";
import { cases } from "@/content/work";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { work } = await getDictionary(lang);
  return pageMetadata(lang, "/work", work.label, work.intro);
}

export default async function WorkPage({ params }: PageProps<"/[lang]/work">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { work } = dict;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{work.label}</p>
          <h1 className="display">{work.title}</h1>
          <p className="lead">{work.intro}</p>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 64 }}>
        <ol className="cases">
          {cases.map((item, i) => {
            const content = item.content[lang];
            return (
              <Reveal as="li" key={item.slug} className="case" id={item.slug}>
                <span className="case__index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="h3">{content.title}</h2>
                  <p className="case__meta">
                    <span>{item.domain}</span>
                    <span>
                      {item.vertical
                        ? `${work.verticalLabel} · ${dict.verticals.items.find((v) => v.id === item.vertical)?.audience}`
                        : work.crossCutting}
                    </span>
                    {item.pattern !== undefined && (
                      <span>
                        {work.patternLabel} · {dict.verticals.patterns[item.pattern]}
                      </span>
                    )}
                    {item.confidential && <span>{work.confidential}</span>}
                  </p>
                </div>
                <dl className="case__body">
                  <div>
                    <dt>{work.problem}</dt>
                    <dd>{content.problem}</dd>
                  </div>
                  <div>
                    <dt>{work.build}</dt>
                    <dd>{content.build}</dd>
                  </div>
                  <div className="case__stack">
                    <dt>{work.stack}</dt>
                    <dd className="chips">
                      {item.stack.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            );
          })}
        </ol>
      </section>
    </>
  );
}
