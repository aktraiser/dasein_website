import { Fragment, type ReactNode } from "react";
import { ArrowChip } from "./ArrowChip";
import { LogoStack } from "./LogoStack";
import { SecureChip } from "./SecureChip";

/**
 * Hero headline with round pictograms set inline between the words
 * (`{arrow}`, `{stack}`, `{secure}` placeholders in the dictionary string).
 */

export function HeroTitle({
  marked,
  contactHref,
  labels,
}: {
  marked: string;
  contactHref: string;
  labels: { stack: string; secure: string };
}) {
  const chips: Record<string, ReactNode> = {
    arrow: <ArrowChip href={contactHref} />,
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
