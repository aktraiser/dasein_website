"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DEAL_NODES, DEAL_STEPS, DEALS, findLoops, nodeName } from "@/content/deals";
import type { Locale } from "@/lib/i18n";
import { DealGraph, Legend, useFullBleed, type EdgeState, type NodeState } from "./DealGraph";

const INTRO: Record<Locale, string> = {
  fr: "Faites défiler : les accords s’allument dans l’ordre où ils ont été conclus. Survolez ou touchez une flèche pour le détail.",
  en: "Scroll: the deals light up in the order they were signed. Hover over or tap an arrow for the details.",
};

const ALL_NODES = DEAL_NODES.map((n) => n.id);
// Wide screens put the cards beside the graph; narrow ones slide them over its lower part.
const WIDE = "(min-width: 900px)";

/** "[inv:invests]" becomes a word highlighted in the colour of that kind of deal. */
function marked(text: string): ReactNode[] {
  return text.split(/(\[[a-z]+:[^\]]+\])/).map((part, i) => {
    const m = /^\[([a-z]+):([^\]]+)\]$/.exec(part);
    return m ? (
      <mark key={i} className={`deals__mark deals__mark--${m[1]}`}>
        {m[2]}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

/** The scrolling deal story of "The gigawatt and the dollar". */
export function DealLoops({ lang }: { lang: Locale }) {
  const section = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(true);
  const loops = useMemo(() => findLoops(), []);
  const loopDeals = useMemo(() => new Set(loops.flatMap((l) => l.deals)), [loops]);
  const loopNodes = useMemo(() => [...new Set(loops.flatMap((l) => l.nodes))], [loops]);
  useFullBleed(section);

  useEffect(() => {
    const query = window.matchMedia(WIDE);
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // The active step is the last card whose top has come up past the reading line:
  // mid-screen beside the graph, low on the screen when the cards slide over it.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = document.documentElement.clientHeight * (window.matchMedia(WIDE).matches ? 0.55 : 0.75);
      let index = 0;
      cards.current.forEach((card, i) => {
        if (card && card.getBoundingClientRect().top <= line) index = i;
      });
      setActive(index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const step = DEAL_STEPS[active];
  // Deals told in earlier steps stay drawn in grey, as context.
  const told = new Set(DEAL_STEPS.slice(1, active).flatMap((s) => (Array.isArray(s.deals) ? s.deals : [])));
  const edges: EdgeState[] = DEALS.map((_, i) => {
    if (step.deals === "all") return "on";
    if (step.deals === "loops") return loopDeals.has(i) ? "on" : "ctx";
    if (step.deals.includes(i)) return "on";
    return told.has(i) ? "ctx" : "off";
  });
  const involved = new Set(DEALS.flatMap((d, i) => (edges[i] === "on" ? [d.f, d.t] : [])));
  const met = new Set(DEALS.flatMap((d, i) => (edges[i] !== "off" ? [d.f, d.t] : [])));
  const nodes: Record<string, NodeState> = Object.fromEntries(
    ALL_NODES.map((id) => [
      id,
      step.deals === "all" ? "plain" : involved.has(id) ? "on" : met.has(id) ? "dim" : "faint",
    ]),
  );
  const focus = step.deals === "all" ? ALL_NODES : step.deals === "loops" ? loopNodes : [...involved];

  const title = (s: (typeof DEAL_STEPS)[number]) =>
    s.title[lang]
      .replace("{deals}", String(DEALS.length))
      .replace("{nodes}", String(DEAL_NODES.length))
      .replace("{loops}", String(loops.length));

  return (
    <section ref={section} className="deals" aria-label={lang === "fr" ? "Les boucles de l’IA, accord par accord" : "The AI loops, deal by deal"}>
      <p className="deals__intro">{INTRO[lang]}</p>
      <div className="deals__grid">
        <div className="deals__stage">
          <div className="deals__head">
            <span className="deals__when">{step.when[lang]}</span>
            <Legend lang={lang} />
          </div>
          <DealGraph lang={lang} edges={edges} nodes={nodes} focus={focus} top={56} bottom={wide ? 0 : 0.44} />
        </div>

        <div className="deals__steps">
          {DEAL_STEPS.map((s, i) => {
            const newYear = s.year !== undefined && s.year !== DEAL_STEPS[i - 1]?.year;
            return (
              <div key={i} className={`deals__step${i === active ? " is-active" : i < active ? " is-past" : ""}`}>
                {newYear && <span className="deals__year">{s.year}</span>}
                <div
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  className="deals__card"
                >
                  <span className="deals__card-when">{s.when[lang]}</span>
                  <p className="deals__card-title">{title(s)}</p>
                  {s.text[lang].map((paragraph, j) => (
                    <p key={j}>{marked(paragraph)}</p>
                  ))}
                  {s.sources && (
                    <p className="deals__card-src">
                      {lang === "fr" ? "Sources : " : "Sources: "}
                      {s.sources.map((source, j) => (
                        <Fragment key={source.url}>
                          {j > 0 && ", "}
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.label}
                          </a>
                        </Fragment>
                      ))}
                    </p>
                  )}
                  {s.deals === "loops" && (
                    <ul className="deals__loops">
                      {loops.map((loop) => {
                        const names = loop.nodes.map((id) => nodeName(id, lang));
                        return (
                          <li key={loop.nodes.join("|")}>
                            {names.length === 2 ? `${names[0]} ⇄ ${names[1]}` : `${names.join(" → ")} → ${names[0]}`}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
