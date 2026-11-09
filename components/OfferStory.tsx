"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale, OfferSlug } from "@/lib/i18n";

const LABELS: Record<Locale, Record<OfferSlug, [string, string, string]>> = {
  fr: { "ways-of-working": ["Votre équipe", "Outils & méthode", "Données & règles"], solutions: ["Vos outils", "L’agent prépare", "Vous validez"], engineering: ["Les agents", "Le socle commun", "Vos systèmes"] },
  en: { "ways-of-working": ["Your team", "Tools & method", "Data & rules"], solutions: ["Your tools", "The agent prepares", "You approve"], engineering: ["The agents", "Shared foundation", "Your systems"] },
};

/** All copy stays readable; the diagram follows the explanation rather than simulating a product. */
export function OfferStory({ slug, lang, features }: { slug: OfferSlug; lang: Locale; features: { title: string; text: string }[] }) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (entry) setActive(Number((entry.target as HTMLElement).dataset.step));
    }, { rootMargin: "-22% 0px -38% 0px", threshold: [0, .2, .5] });
    steps.current.forEach(step => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, []);
  const labels = LABELS[lang][slug];
  return <div className="offer-story">
    <figure className="offer-story__figure">
      <div className="offer-story__drawing" data-stage={active}>
        <svg viewBox="0 0 540 430" fill="none" aria-hidden="true">
          <defs><pattern id={`story-grid-${slug}`} width="27" height="27" patternUnits="userSpaceOnUse"><path d="M27 0H0V27" stroke="currentColor" strokeOpacity=".07" /></pattern></defs>
          <rect width="540" height="430" fill={`url(#story-grid-${slug})`} />
          <circle cx="270" cy="200" r="150" stroke="currentColor" strokeOpacity=".12" />
          <circle cx="270" cy="200" r="110" stroke="currentColor" strokeOpacity=".1" />
          <path d="M100 200H440" stroke="currentColor" strokeOpacity=".3" strokeDasharray="3 6" />
          {labels.map((label, index) => <g key={label} className="offer-story__node" data-active={active === index}>
            <rect x={55 + index * 170} y={155} width="90" height="90" rx={index === 1 ? 3 : 45} fill="var(--story-paper)" stroke="currentColor" strokeWidth={active === index ? 2 : 1} />
            <circle cx={100 + index * 170} cy="200" r={active === index ? 9 : 4} fill="currentColor" />
            <text x={100 + index * 170} y="282" textAnchor="middle" fill="currentColor">{label}</text>
          </g>)}
          <path d={`M${100 + active * 170} 113v22`} stroke="currentColor" />
          <text x={100 + active * 170} y="98" textAnchor="middle" fill="currentColor" className="offer-story__index">0{active + 1}</text>
        </svg>
      </div>
      <figcaption>{lang === "fr" ? "Une méthode, adaptée à votre contexte." : "A method shaped around your context."}</figcaption>
    </figure>
    <div className="offer-story__chapters">{features.map((feature, index) => <article key={feature.title} data-step={index} ref={element => { steps.current[index] = element; }} className="offer-story__chapter">
      <p className="offer-caption">0{index + 1}</p><h3>{feature.title}</h3><p>{feature.text}</p>
    </article>)}</div>
  </div>;
}
