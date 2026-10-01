import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/dictionaries";
import { entries, tracks } from "@/content/lab";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/lab">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { lab } = await getDictionary(lang);
  return pageMetadata(lang, "/lab", lab.label, lab.intro);
}

export default async function LabPage({ params }: PageProps<"/[lang]/lab">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { lab } = dict;
  const log = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{lab.label}</p>
          <h1 className="display">{lab.title}</h1>
          <p className="lead">{lab.intro}</p>
        </div>
      </section>

      <section id="tracks" className="section">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 40 }}>
            {lab.tracksTitle}
          </p>
          <ul className="tracks">
            {tracks.map((track, i) => {
              const content = track.content[lang];
              return (
                <Reveal as="li" key={track.id} className="track" id={track.id} delay={(i % 3) * 80}>
                  <div className="track__head">
                    <span>T{String(i + 1).padStart(2, "0")}</span>
                    <span className="status" data-status={track.status}>
                      {lab.status[track.status]}
                    </span>
                  </div>
                  <h2 className="h3">{content.name}</h2>
                  <p>{content.question}</p>
                  <div className="chips">
                    {content.topics.map((topic) => (
                      <span key={topic} className="chip">
                        {topic}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="log" className="section">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 40 }}>
            {lab.logTitle}
          </p>
          <div className="log">
            {log.length === 0 ? (
              <p className="log__empty">{lab.logEmpty}</p>
            ) : (
              log.map((entry) => {
                const content = entry.content[lang];
                const title = entry.url ? (
                  <a href={entry.url} className="link" target="_blank" rel="noopener noreferrer">
                    {content.title} <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  content.title
                );
                return (
                  <article key={entry.slug} className="log__entry">
                    <time className="mono muted" dateTime={entry.date}>
                      {entry.date}
                    </time>
                    <span className="mono" style={{ color: "var(--accent)" }}>
                      {entry.kind}
                    </span>
                    <div>
                      <h2 className="h3">{title}</h2>
                      <p className="muted" style={{ marginTop: 8 }}>
                        {content.summary}
                      </p>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
