"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const NAMES: Record<Locale, string> = { en: "English", fr: "Français" };

/** Language links that keep the current page (used in the footer). */
export function LangLinks({ lang }: { lang: Locale }) {
  const rest = usePathname().split("/").slice(2).join("/");
  return (
    <>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest ? `/${rest}` : ""}`}
          hrefLang={locale}
          aria-current={locale === lang ? "true" : undefined}
          onClick={() => {
            document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
          }}
        >
          {NAMES[locale]}
        </Link>
      ))}
    </>
  );
}
