"use client";

import { useEffect } from "react";

/** Nudges a glossary definition sideways so it never leaves the screen. */
export function TermPopovers() {
  useEffect(() => {
    const align = (event: Event) => {
      const term = (event.target as Element | null)?.closest?.(".term");
      const pop = term?.querySelector<HTMLElement>(".term__pop");
      if (!pop || matchMedia("(max-width: 640px)").matches) return;
      // Measured from the word (not the animated popover): where the centred popover would sit.
      const anchor = term!.getBoundingClientRect();
      const half = pop.offsetWidth / 2;
      const centre = anchor.left + anchor.width / 2;
      const margin = 16;
      const overRight = centre + half - (document.documentElement.clientWidth - margin);
      const overLeft = margin - (centre - half);
      pop.style.setProperty("--shift", `${overRight > 0 ? -overRight : overLeft > 0 ? overLeft : 0}px`);
    };
    document.addEventListener("pointerover", align);
    document.addEventListener("focusin", align);
    return () => {
      document.removeEventListener("pointerover", align);
      document.removeEventListener("focusin", align);
    };
  }, []);
  return null;
}
