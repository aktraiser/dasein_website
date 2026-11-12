import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { NightHeader } from "@/components/home/NightHeader";
import { getDictionary } from "@/content/dictionaries";
import { company } from "@/content/legal";
import { offerDesign } from "@/content/offerDesign";
import { hasLocale, type OfferSlug } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import "./contact.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { contact } = await getDictionary(lang);
  return pageMetadata(lang, "/contact", contact.label, contact.intro);
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { contact } = await getDictionary(lang);
  // The subjects are the offers, under the names their pages use (without the final full stop).
  const name = (slug: OfferSlug) => offerDesign[lang][slug].name.replace(/\.$/, "");
  const labels = {
    ...contact,
    topics: {
      ...contact.topics,
      "ways-of-working": name("ways-of-working"),
      solutions: name("solutions"),
      engineering: name("engineering"),
    },
  };
  // An offer page links here with "?offer=<slug>": the form opens with that subject chosen.
  const { offer } = await searchParams;
  const topic = typeof offer === "string" && Object.hasOwn(contact.topics, offer) ? offer : "";

  return (
    <div className="contact-page">
      <NightHeader />
      <section className="contact-opening container" aria-labelledby="contact-title">
        <div className="contact-intro">
          <p className="contact-label">{contact.label}</p>
          <h1 id="contact-title">{contact.title}</h1>
          <p className="contact-lead">{contact.intro}</p>
        </div>

        <ContactForm labels={labels} lang={lang} topic={topic} />

        <dl className="contact-notes">
          <div>
            <dt>{contact.nextLabel}</dt>
            <dd>{contact.next}</dd>
          </div>
          <div>
            <dt>{contact.directLabel}</dt>
            <dd>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
