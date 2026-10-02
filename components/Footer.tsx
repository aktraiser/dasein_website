import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { LangLinks } from "./LangLinks";
import { Mark } from "./Wordmark";

/**
 * Footer after america.gov/how-it-works: large serif links, the name set huge
 * across the page, the signature line, then the small print.
 */
export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}#verticals`, label: dict.nav.expertise },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/articles`, label: dict.nav.articles },
    { href: `/${lang}/contact`, label: dict.nav.contact },
    { href: `/${lang}/glossary`, label: dict.glossary.label },
  ];

  return (
    <footer className="footer">
      <nav className="footer__links" aria-label="Footer">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <p className="footer__name" aria-hidden="true">
        Dasein
      </p>

      <div className="footer__sign">
        <Mark className="footer__mark" />
        <p>{dict.footer.tagline}</p>
      </div>

      <p className="footer__small">
        <span>
          © {new Date().getFullYear()} Dasein. {dict.footer.rights}
        </span>
        <Link href={`/${lang}/legal`}>{dict.footer.legal}</Link>
        <LangLinks lang={lang} />
      </p>

      <p className="footer__made">{dict.footer.made}</p>
    </footer>
  );
}
