"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { NightHeader } from "@/components/home/NightHeader";
import type { Locale } from "@/lib/i18n";

const media = "(min-width: 1000px) and (hover: hover) and (pointer: fine)";
function subscribe(callback: () => void) {
  const query = window.matchMedia(media);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getSnapshot = () => window.matchMedia(media).matches;
const getServerSnapshot = () => false;

export function ArticleViews({ lang, title, intro, kicker, graph, children }: {
  lang: Locale; title: string; intro: string; kicker: string; graph: ReactNode; children: ReactNode;
}) {
  const wide = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [choice, setChoice] = useState<"graph" | "list" | null>(null);
  const view = wide ? choice ?? "graph" : "list";
  return <div className="articles-map article-views" data-view={view}>
    <NightHeader key={view} />
    <div className="article-views__switch" role="group" aria-label={lang === "fr" ? "Vue du journal" : "Journal view"}>
      <button type="button" aria-pressed={view === "graph"} disabled={!wide} title={!wide ? (lang === "fr" ? "Le graphe est disponible sur grand écran avec une souris" : "The graph is available on large screens with a mouse") : undefined} onClick={() => setChoice("graph")}>{lang === "fr" ? "Graphe" : "Graph"}</button>
      <button type="button" aria-pressed={view === "list"} onClick={() => setChoice("list")}>{lang === "fr" ? "Liste" : "List"}</button>
    </div>
    {view === "graph" ? graph : <>
      <section className="atlas atlas--list" data-night="" aria-labelledby="journal-list-title">
        <div className="container">
          <p className="atlas__kicker">{kicker}</p>
          <h1 id="journal-list-title" className="atlas__title">{title}</h1>
          <p className="atlas__lead">{intro}</p>
        </div>
      </section>
      {children}
    </>}
  </div>;
}
