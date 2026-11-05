"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { id: string; text: string };

/**
 * Sticky table of contents. Highlights the section being read: the last heading
 * that has scrolled above the reading line (a quarter of the way down the screen).
 */
export function ArticleToc({ headings, label, glossary }: { headings: Heading[]; label: string; glossary: { href: string; text: string } }) {
  const [active, setActive] = useState<string | null>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      // At the very bottom of the page, the last section is the one being read.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = targets[targets.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  // Keep the active entry visible when the table of contents is taller than the screen.
  useEffect(() => {
    if (!active || !nav.current) return;
    const link = nav.current.querySelector<HTMLElement>(`a[href="#${CSS.escape(active)}"]`);
    if (!link) return;
    const box = nav.current.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    if (item.top < box.top || item.bottom > box.bottom) {
      nav.current.scrollTop += item.top - box.top - box.height / 3;
    }
  }, [active]);

  return (
    <nav ref={nav} className="article__toc" aria-label={label}>
      {headings.map((h) => (
        <a key={h.id} href={`#${h.id}`} aria-current={active === h.id ? "location" : undefined}>
          {h.text}
        </a>
      ))}
      <a href={glossary.href} className="article__toc-glossary">
        {glossary.text} <span aria-hidden="true">→</span>
      </a>
    </nav>
  );
}
