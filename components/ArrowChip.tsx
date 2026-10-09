"use client";

import { useRouter } from "next/navigation";

/**
 * The round arrow set inside the hero headline. It is a shortcut for mouse users
 * to the contact page, deliberately not a link: a link inside the <h1> would put
 * its address in the headline's text. The real link is the button under the hero.
 */
export function ArrowChip({ href }: { href: string }) {
  const router = useRouter();
  return (
    <span className="chip-i chip-i--arrow" aria-hidden="true" onClick={() => router.push(href)}>
      <svg viewBox="0 0 40 40">
        <path d="M11 20h17M21 12l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" />
      </svg>
    </span>
  );
}
