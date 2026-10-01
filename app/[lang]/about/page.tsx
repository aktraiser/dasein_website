import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { about } = await getDictionary(lang);
  return pageMetadata(lang, "/about", about.visionLabel, about.lead);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { about } = await getDictionary(lang);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{about.visionLabel}</p>
          <h1 className="display display--serif vision__title">{about.title}</h1>
          <p className="lead">{about.lead}</p>
        </div>
      </section>

      <section className="section vision__band">
        <div className="container">
          <Reveal as="p" className="intersection">
            {about.intersection.map((word, i) => (
              <span key={word}>
                {i > 0 && <i>× </i>}
                {word}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Convictions, each pointing to the article that develops it */}
      <section id="vision" className="section">
        <div className="container">
          <p className="eyebrow">{about.beliefsLabel}</p>
          <ol className="beliefs">
            {about.beliefs.map((belief, i) => (
              <Reveal as="li" key={belief.title} className="belief">
                <span className="belief__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="belief__body">
                  <h2 className="belief__title">{belief.title}</h2>
                  <p>{belief.text}</p>
                  {"link" in belief && belief.link && (
                    <Link href={`/${lang}${belief.link.href}`} className="belief__link">
                      {about.beliefMore} {belief.link.label} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="role" className="section">
        <div className="container role">
          <Reveal>
            <p className="eyebrow">{about.roleLabel}</p>
            <h2 className="role__title">{about.roleTitle}</h2>
          </Reveal>
          <ol className="role__steps">
            {about.role.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80}>
                <span className="role__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="name" className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">{about.nameTitle}</p>
          </Reveal>
          <Reveal>
            <p className="vision__name">{about.nameText}</p>
          </Reveal>
        </div>
      </section>

      <section id="audience" className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">{about.audienceTitle}</p>
            <p className="lead" style={{ marginTop: 24 }}>
              {about.audienceText}
            </p>
            <ul className="clients">
              {about.clients.map((client) => (
                <li key={client.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/logos/${client.logo}`} alt={client.name} loading="lazy" />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="audience">
            {about.audience.map((group) => (
              <div key={group.title}>
                <p className="audience__title">{group.title}</p>
                <ul className="spec">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
