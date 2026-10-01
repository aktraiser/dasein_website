"use client";

import { useEffect, useState } from "react";

/**
 * Frosted "secure & approved" chip for the hero headline: a shield with a check.
 * On click (and once on load) it runs: sealing (the shield outline redraws under
 * a light sweep) → approved (accent background, the check draws) → back to idle.
 * Metaphor: agents act inside a secured frame, with human approval.
 */

type Phase = "idle" | "sealing" | "approved" | "returning";

const TIMINGS: Record<Exclude<Phase, "idle">, [number, Phase]> = {
  sealing: [650, "approved"],
  approved: [1200, "returning"],
  returning: [450, "idle"],
};

const SHIELD = "M20 5.5 31 9.6v9.1c0 7.4-4.6 13-11 15.8-6.4-2.8-11-8.4-11-15.8V9.6z";
const CHECK = "M14.6 20.2l3.9 3.9 7.2-7.6";

export function SecureChip({ label }: { label: string }) {
  const [phase, setPhase] = useState<Phase>("idle");

  // Each phase schedules the next one.
  useEffect(() => {
    if (phase === "idle") return;
    const [delay, next] = TIMINGS[phase];
    const id = window.setTimeout(() => setPhase(next), delay);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    // Play once, shortly after the headline has appeared.
    const timer = window.setTimeout(() => setPhase((p) => (p === "idle" ? "sealing" : p)), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      className="chip-i chip-i--secure"
      data-phase={phase}
      aria-label={label}
      title={label}
      onClick={() => setPhase((p) => (p === "idle" ? "sealing" : p))}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id="sc-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="sc-clip">
            <path d={SHIELD} />
          </clipPath>
        </defs>
        <g clipPath="url(#sc-clip)">
          <rect className="sc-light" x="0" y="-12" width="40" height="12" fill="url(#sc-light)" />
        </g>
        <path className="sc-shield" d={SHIELD} pathLength={1} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path className="sc-check" d={CHECK} pathLength={1} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
