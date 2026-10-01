import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" aria-hidden="true">
      <rect x="0.5" y="0.5" width="13" height="13" fill="none" stroke="currentColor" />
      <rect x="7" y="7" width="4" height="4" fill="var(--accent)" />
    </svg>
  );
}

export function Wordmark({ lang }: { lang: Locale }) {
  return (
    <Link href={`/${lang}`} className="wordmark" aria-label="Dasein — home">
      <Mark className="wordmark__mark" />
      dasein
    </Link>
  );
}
