"use client";

import { useState } from "react";
import { logos, logoWindow } from "@/content/logos";

/**
 * Three overlapping badges, like official seals, showing technologies Dasein
 * works with. A click flips them, one after the other, to the next three.
 */
export function LogoStack({ label }: { label: string }) {
  const [start, setStart] = useState(0);
  const set = logoWindow(start);

  return (
    <button
      type="button"
      className="chip-stack"
      aria-label={`${label}: ${set.map((logo) => logo.name).join(", ")}`}
      title={set.map((logo) => logo.name).join(" · ")}
      onClick={() => setStart((s) => (s + 3) % logos.length)}
    >
      {set.map((logo, i) => (
        <span key={i} className="chip-i chip-i--badge">
          {/* key on the logo: a new set remounts the image, which plays the flip-in */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={logo.id}
            src={`/logos/${logo.id}.svg`}
            alt=""
            data-wide={logo.wide}
            style={{ animationDelay: `${i * 90}ms` }}
          />
        </span>
      ))}
    </button>
  );
}
