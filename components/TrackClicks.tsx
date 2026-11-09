"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Tracks clicks on any element with `data-track="event"`, so server-rendered
 * links can be measured without becoming client components. Its other
 * `data-track-*` attributes become the event's properties
 * (`data-track-offer="solutions"` → `{ offer: "solutions" }`).
 */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el?.dataset.track) return;
      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track" && value) props[key.slice(5).toLowerCase()] = value;
      }
      track(el.dataset.track, props);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
