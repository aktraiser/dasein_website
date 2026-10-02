import Link from "next/link";
import { siteUrl, type Locale } from "@/lib/i18n";
import { CopyLink } from "./CopyLink";

const copy = {
  fr: {
    share: "Partager cet article",
    linkedin: "Partager sur LinkedIn",
    copy: "Copier le lien",
    copied: "Lien copié",
    newTab: " (nouvel onglet)",
    title: "Parlons de votre projet.",
    text: "Ce sujet vous concerne ? Décrivez-nous votre contexte en quelques lignes : nous revenons vers vous rapidement.",
    cta: "Démarrer un projet",
  },
  en: {
    share: "Share this article",
    linkedin: "Share on LinkedIn",
    copy: "Copy link",
    copied: "Link copied",
    newTab: " (opens in a new tab)",
    title: "Let’s talk about your project.",
    text: "Is this on your agenda? Tell us about your context in a few lines: we get back to you quickly.",
    cta: "Start a project",
  },
};

/** End of an article: share links, then the invitation to get in touch. */
export function ArticleEnd({ lang, path }: { lang: Locale; path: string }) {
  const t = copy[lang];
  const url = `${siteUrl}/${lang}${path}`;
  return (
    <>
      <section className="article__share" aria-label={t.share}>
        <p className="article__summary-label">{t.share}</p>
        <div className="article__share-links">
          <a
            className="pill pill--ghost"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.linkedin} <span aria-hidden="true">↗</span>
            <span className="sr-only">{t.newTab}</span>
          </a>
          <CopyLink url={url} label={t.copy} done={t.copied} />
        </div>
      </section>

      <aside className="article__cta">
        <div>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </div>
        <Link href={`/${lang}/contact`} className="pill pill--ink">
          {t.cta} <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </>
  );
}
