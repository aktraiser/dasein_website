"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Transparent over the hero; on paper it returns when the visitor scrolls up. */
export function NightHeader() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".header");
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>("[data-night]"));
    let frame = 0;
    let previousY = window.scrollY;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const middle = (header?.offsetHeight ?? 64) / 2;
      const overDark = darkSections.some(section => {
        const box = section.getBoundingClientRect();
        return box.top <= middle && box.bottom > middle;
      });
      root.dataset.headerTone = overDark ? "night" : "day";
      if (overDark || y < 10 || header?.dataset.open === "true") {
        root.dataset.headerScroll = "visible";
        previousY = y;
      } else if (Math.abs(y - previousY) >= 8) {
        root.dataset.headerScroll = y > previousY ? "hidden" : "visible";
        previousY = y;
      } else if (!root.dataset.headerScroll) {
        root.dataset.headerScroll = "visible";
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      delete root.dataset.headerTone;
      delete root.dataset.headerScroll;
    };
  }, [pathname]);
  return null;
}
