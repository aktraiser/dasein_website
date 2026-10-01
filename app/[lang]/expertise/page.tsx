import Link from "next/link";
import { notFound } from "next/navigation";
import { glossText, newGlossarySeen } from "@/components/Glossed";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/expertise">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { expertise } = await getDictionary(lang);
  return pageMetadata(lang, "/expertise", expertise.label, expertise.indexIntro);
}

export default async function ExpertisePage({ params }: PageProps<"/[lang]/expertise">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { expertise, verticals } = dict;
  const seen = newGlossarySeen();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{expertise.label}</p>
          <h1 className="display display--serif xp-title">{expertise.indexTitle}</h1>
          <p className="lead">{expertise.indexIntro}</p>
        </div>
      </section>

      {/* The three verticals, each leading to its own page */}
      <div className="container">
        <ol className="xp-verticals">
          {verticals.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 80}>
              <Link href={`/${lang}/expertise/${item.slug}`} className="xp-vertical">
                <span className="xp-vertical__top">
                  {String(i + 1).padStart(2, "0")} · {item.audience}
                </span>
                <span className="xp-vertical__name">{item.name}</span>
                <span className="xp-vertical__lead">{item.lead}</span>
                <span className="xp-vertical__more">
                  {verticals.page.more} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* The four technical foundations, one line each */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">{expertise.foundationsLabel}</p>
          <h2 className="xp-foundations__title">{expertise.foundationsTitle}</h2>
          <ul className="xp-foundations">
            {expertise.domains.map((domain) => (
              <Reveal as="li" key={domain.id} id={domain.id}>
                <h3>{domain.name}</h3>
                <p>{glossText(domain.summary, lang, seen)}</p>
                {domain.stack.length > 0 && <p className="xp-foundations__stack">{domain.stack.join(" · ")}</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
