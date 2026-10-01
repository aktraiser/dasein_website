import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getDictionary } from "@/content/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { contact } = await getDictionary(lang);
  return pageMetadata(lang, "/contact", contact.label, contact.intro);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { contact } = await getDictionary(lang);

  return (
    <section className="page-hero">
      <div className="container contact">
        <div>
          <p className="eyebrow">{contact.label}</p>
          <h1 className="display display--serif">{contact.title}</h1>
          <p className="lead">{contact.intro}</p>
        </div>
        <div className="contact__card">
          <ContactForm labels={contact} />
        </div>
      </div>
    </section>
  );
}
