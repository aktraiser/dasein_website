import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { about } = await getDictionary(lang);
  return pageMetadata(lang, "/about", about.label, about.paragraphs[0]);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { about } = dict;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{about.label}</p>
          <h1 className="display">{about.title}</h1>
          <div className="prose">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="section">
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

      <section id="name" className="section">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">{about.nameTitle}</p>
          </Reveal>
          <Reveal>
            <p className="h3" style={{ maxWidth: "34ch" }}>
              {about.nameText}
            </p>
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
          </Reveal>
          <Reveal as="ul" className="spec">
            {about.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
