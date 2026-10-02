import type { Locale } from "@/lib/i18n";

/** Legal identity of the publisher. Single source for the legal notice, in both languages. */
export const company = {
  name: "DASEIN",
  form: "SAS (société par actions simplifiée)",
  siren: "942 054 271",
  rcs: "RCS Pau 942 054 271",
  vat: "FR22942054271",
  address: "23 rue Louis Barthou, 64000 Pau, France",
  director: "Lucas Bometon, président",
  email: "contact@dasein-ai.com",
  host: {
    name: "Hostinger International Ltd",
    address: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
    url: "https://www.hostinger.com",
  },
};

type Section = { id: string; title: string; rows?: [string, string][]; paragraphs?: string[] };
type Legal = { label: string; title: string; intro: string; updated: string; sections: Section[] };

const c = company;

export const legal: Record<Locale, Legal> = {
  fr: {
    label: "Mentions légales",
    title: "Mentions légales et confidentialité.",
    intro: "Qui édite ce site, qui l’héberge, et ce que nous faisons des données que vous nous confiez.",
    updated: "Dernière mise à jour : 2 octobre 2026",
    sections: [
      {
        id: "editeur",
        title: "Éditeur du site",
        rows: [
          ["Dénomination", c.name],
          ["Forme juridique", c.form],
          ["SIREN", c.siren],
          ["Immatriculation", c.rcs],
          ["TVA intracommunautaire", c.vat],
          ["Siège social", c.address],
          ["Directeur de la publication", c.director],
          ["Contact", c.email],
        ],
      },
      {
        id: "hebergeur",
        title: "Hébergeur",
        rows: [
          ["Société", c.host.name],
          ["Adresse", c.host.address],
          ["Site", c.host.url],
        ],
      },
      {
        id: "propriete",
        title: "Propriété intellectuelle",
        paragraphs: [
          "Les textes, schémas, illustrations et le code de ce site sont la propriété de Dasein, sauf mention contraire. Toute reproduction, même partielle, est soumise à notre accord écrit préalable ; la citation courte avec mention de la source et lien vers la page reste libre.",
          "Les marques et logos de tiers présents sur le site appartiennent à leurs propriétaires respectifs et ne sont cités qu’à titre de référence.",
        ],
      },
      {
        id: "donnees",
        title: "Données personnelles",
        paragraphs: [
          "Les seules données personnelles que nous collectons sont celles que vous saisissez dans le formulaire de contact : nom, société, adresse e-mail et description de votre projet. Elles servent uniquement à répondre à votre demande, sur le fondement de notre intérêt légitime à traiter les demandes qui nous sont adressées.",
          "Ces données sont transmises par e-mail à l’équipe Dasein par l’intermédiaire de notre prestataire d’envoi, Resend (États-Unis), dans le cadre des clauses contractuelles types de la Commission européenne. Elles ne sont ni vendues, ni cédées, ni utilisées à des fins de prospection par des tiers.",
          "Nous les conservons le temps de l’échange, et au plus trois ans après notre dernier contact.",
          `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition. Pour l’exercer, écrivez à ${c.email}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr).`,
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        paragraphs: [
          "Ce site n’utilise ni cookie publicitaire, ni outil de mesure d’audience, ni traceur tiers.",
          "Un seul cookie, NEXT_LOCALE, est déposé lorsque vous changez de langue : il mémorise ce choix pendant un an. Strictement nécessaire au service que vous demandez, il ne requiert pas de consentement.",
        ],
      },
      {
        id: "responsabilite",
        title: "Responsabilité",
        paragraphs: [
          "Les articles publiés sur ce site sont fournis à titre d’information et reflètent notre analyse à leur date de publication. Ils ne constituent pas un conseil adapté à une situation particulière. Les sites tiers vers lesquels nous renvoyons relèvent de la seule responsabilité de leurs éditeurs.",
        ],
      },
    ],
  },
  en: {
    label: "Legal notice",
    title: "Legal notice and privacy.",
    intro: "Who publishes this site, who hosts it, and what we do with the data you share with us.",
    updated: "Last updated: 2 October 2026",
    sections: [
      {
        id: "publisher",
        title: "Publisher",
        rows: [
          ["Company name", c.name],
          ["Legal form", c.form],
          ["SIREN", c.siren],
          ["Registration", c.rcs],
          ["EU VAT number", c.vat],
          ["Registered office", c.address],
          ["Publication director", c.director.replace("président", "President")],
          ["Contact", c.email],
        ],
      },
      {
        id: "hosting",
        title: "Hosting",
        rows: [
          ["Company", c.host.name],
          ["Address", c.host.address.replace("Chypre", "Cyprus")],
          ["Website", c.host.url],
        ],
      },
      {
        id: "ip",
        title: "Intellectual property",
        paragraphs: [
          "The texts, diagrams, illustrations and code of this site belong to Dasein unless stated otherwise. Any reproduction, even partial, requires our prior written consent; short quotations with the source and a link to the page remain free.",
          "Third-party trademarks and logos shown on the site belong to their respective owners and are mentioned for reference only.",
        ],
      },
      {
        id: "data",
        title: "Personal data",
        paragraphs: [
          "The only personal data we collect is what you enter in the contact form: name, company, email address and a description of your project. It is used solely to answer your request, on the basis of our legitimate interest in handling the requests sent to us.",
          "This data is sent by email to the Dasein team through our delivery provider, Resend (United States), under the European Commission’s standard contractual clauses. It is never sold, shared or used by third parties for marketing.",
          "We keep it for the duration of the exchange, and no longer than three years after our last contact.",
          `You have the right to access, rectify, erase, restrict and object to the processing of your data. To exercise it, write to ${c.email}. You may also lodge a complaint with the French data protection authority, the CNIL (cnil.fr).`,
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        paragraphs: [
          "This site uses no advertising cookies, no analytics and no third-party trackers.",
          "A single cookie, NEXT_LOCALE, is set when you switch language: it remembers that choice for one year. Strictly necessary for the service you ask for, it does not require consent.",
        ],
      },
      {
        id: "liability",
        title: "Liability",
        paragraphs: [
          "The articles published on this site are provided for information and reflect our analysis at the time of publication. They are not advice tailored to a specific situation. Third-party sites we link to are the sole responsibility of their publishers.",
        ],
      },
    ],
  },
};
