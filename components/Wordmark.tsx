import Link from "next/link";
import type { Locale } from "@/lib/i18n";

// The two interlocking chevrons of the Dasein logo (public/brand/dasein-original.svg),
// drawn in the site's colours: paper on an ink square.
const CHEVRON_TOP =
  "M17.1087 2.62611L17.1087 2.62614L17.1086 2.6261L13.8565 5.87829L13.8565 5.87832L6.18411 13.5507L9.4363 16.8029L9.43644 16.8027L15.1623 22.5286L18.4145 19.2764L12.6886 13.5506L17.1087 9.1305L31.9267 23.9485L35.1789 20.6963L20.3609 5.87832L20.3609 5.87829L17.1087 2.62611Z";
const CHEVRON_BOTTOM =
  "M15.07 29.9948L15.0701 29.9947L18.3223 26.7425L25.9946 19.0702L22.7424 15.818L22.7423 15.8181L17.0165 10.0922L13.7643 13.3444L19.4902 19.0703L15.0701 23.4903L0.252062 8.6723L-3.00012 11.9245L11.8179 26.7425L11.8179 26.7426L15.07 29.9948Z";

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" fill="var(--ink)" />
      <path d={CHEVRON_TOP} fill="var(--paper)" fillRule="evenodd" />
      <path d={CHEVRON_BOTTOM} fill="var(--paper)" fillRule="evenodd" />
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
