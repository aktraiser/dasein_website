"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";

type Data = Dictionary["home"]["stage"];

export function Stage({ data }: { data: Data }) {
  const [lit, setLit] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const ignition = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("dasein-intro-seen") === "1";
    } catch { /* The introduction still works when browser storage is unavailable. */ }
    if (seen) {
      ignition.current = setTimeout(() => { setSkipIntro(true); setLit(true); }, 0);
      return () => { if (ignition.current !== null) clearTimeout(ignition.current); };
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    ignition.current = setTimeout(() => {
      try { sessionStorage.setItem("dasein-intro-seen", "1"); } catch { /* Optional session memory. */ }
      setLit(true);
    }, reduced.matches ? 0 : 240);
    return () => { if (ignition.current !== null) clearTimeout(ignition.current); };
  }, []);
  return (
    <section className="meaning meaning--neon meaning--quiet meaning--intro" data-night="" data-intro={skipIntro ? "skip" : "play"} data-lit={lit} aria-label={data.label}>
      <div className="meaning__atmosphere" aria-hidden="true" />
      <div className="meaning__reveal-flash" aria-hidden="true" />
      <div className="container meaning__content">
        <h1 className="meaning__title">
          <span>{data.opening}</span>{" "}
          <span className="meaning__action">{data.middle}</span>{" "}
          <span className="meaning__last">{data.ending} <em>{data.meaning}</em></span>
        </h1>
        <div className="meaning__light" aria-hidden="true">
          <span className="meaning__inhale"><i /><i /><i /></span>
          <svg className="meaning__engraving" viewBox="0 0 200 200" fill="none" focusable="false">
            <circle className="meaning__engraved-guide" cx="100" cy="100" r="94" />
            <g transform="rotate(-90 100 100)">
              <circle className="meaning__engraved-glow" cx="100" cy="100" r="94" pathLength="100" />
              <circle className="meaning__engraved-line" cx="100" cy="100" r="94" pathLength="100" />
            </g>
          </svg>
          <span className="meaning__engraving-head"><i /><i /><i /><i /><i /><i /></span>
        </div>

      </div>
      <a href="#offers" className="meaning__scroll" aria-label={data.scrollLabel} data-track="stage_scroll">
        <svg viewBox="0 0 24 38" width="24" height="38" fill="none" aria-hidden="true" focusable="false">
          <path d="M12 3V29M5 22L12 29L19 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <noscript><style>{`:root:has(.meaning--intro) .header,.meaning--intro .meaning__title,.meaning--intro .meaning__scroll{opacity:1!important;visibility:visible!important}.meaning--intro{background:#181114!important}.meaning__engraved-line,.meaning__engraved-glow{stroke-dashoffset:0}.meaning__engraved-line{stroke:#fffbd9}.meaning__atmosphere{opacity:1}.meaning__smoke{opacity:.65}`}</style></noscript>
    </section>
  );
}
