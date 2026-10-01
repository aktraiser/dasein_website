import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { LogoStack } from "./LogoStack";
import { SecureChip } from "./SecureChip";

/**
 * Hero headline with round pictograms set inline between the words
 * (`{arrow}`, `{stack}`, `{secure}` placeholders in the dictionary string).
 */

function Arrow({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="chip-i chip-i--arrow" aria-label={label}>
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M11 20h17M21 12l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" />
      </svg>
    </Link>
  );
}

export function HeroTitle({
  marked,
  contactHref,
  contactLabel,
  labels,
}: {
  marked: string;
  contactHref: string;
  contactLabel: string;
  labels: { stack: string; secure: string };
}) {
  const chips: Record<string, ReactNode> = {
    arrow: <Arrow href={contactHref} label={contactLabel} />,
    stack: <LogoStack label={labels.stack} />,
    secure: <SecureChip label={labels.secure} />,
  };

  // "text {arrow} text" → ["text ", "arrow", " text"]: odd indexes are chips.
  const parts = marked.split(/\{(\w+)\}/);

  return (
    <h1 className="display display--center hero-title">
      {parts.map((part, i) =>
        i % 2 ? (
          <Fragment key={i}>
            {" "}
            <span className="chip-slot" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
              {chips[part]}
            </span>{" "}
          </Fragment>
        ) : (
          <Fragment key={i}>{part.trim()}</Fragment>
        ),
      )}
    </h1>
  );
}
