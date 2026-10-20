"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  DEAL_CATS,
  DEAL_KINDS,
  DEAL_NODES,
  DEAL_SOURCES,
  DEALS,
  dealMonth,
  nodeName,
  type Deal,
  type DealKind,
  type DealNode,
} from "@/content/deals";
import type { Locale } from "@/lib/i18n";

/**
 * The deal graph of the scrolling story (DealLoops). The caller says which deals
 * and players are lit and which players to frame; the graph moves its camera to fit them.
 */

export type EdgeState = "on" | "ctx" | "off";
/** on: in focus, ringed · plain: shown in full, no ring · dim: met, not in focus · faint: not met yet. */
export type NodeState = "on" | "plain" | "dim" | "faint";

export const LEGEND: Record<Locale, [DealKind, string][]> = {
  fr: [
    ["inv", "Investissement"],
    ["calc", "Achat de calcul"],
    ["fin", "Financement, garantie"],
    ["acq", "Rachat"],
    ["rup", "Rupture"],
  ],
  en: [
    ["inv", "Investment"],
    ["calc", "Compute purchase"],
    ["fin", "Financing, guarantee"],
    ["acq", "Acquisition"],
    ["rup", "Cut-off"],
  ],
};

const LABEL: Record<Locale, string> = {
  fr: "Graphe des accords entre labos d’IA, fabricants de puces, clouds et financeurs",
  en: "Graph of the deals between AI labs, chipmakers, clouds and financiers",
};

export const NODE = Object.fromEntries(DEAL_NODES.map((n) => [n.id, n])) as Record<string, DealNode>;
const radius = (n: DealNode) => (n.cat === "lab" ? 30 : 18);
const strokeWidth = (deal: Deal) => (deal.v ? 1.4 + Math.log10(1 + deal.v) * 1.5 : 1.5);

// Several deals between the same two players are drawn as separate, closely spaced curves.
const PAIR_INDEX = (() => {
  const count: Record<string, number> = {};
  return DEALS.map((deal) => {
    const key = [deal.f, deal.t].sort().join(">");
    count[key] = (count[key] ?? -1) + 1;
    return count[key];
  });
})();

/** A quadratic curve from one player to the other, bent to one side; parallel deals sit side by side. */
function edgePath(deal: Deal, i: number) {
  const a = NODE[deal.f];
  const b = NODE[deal.t];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy);
  // Same normal for both directions, so the deals of a pair stack on the same side.
  const [p, q] = deal.f < deal.t ? [a, b] : [b, a];
  const nx = -(q.y - p.y) / length;
  const ny = (q.x - p.x) / length;
  const offset = 26 + PAIR_INDEX[i] * 9;
  const cx = (a.x + b.x) / 2 + nx * offset * 2;
  const cy = (a.y + b.y) / 2 + ny * offset * 2;
  const da = Math.hypot(cx - a.x, cy - a.y);
  const db = Math.hypot(b.x - cx, b.y - cy);
  const sx = a.x + ((cx - a.x) / da) * (radius(a) + 3);
  const sy = a.y + ((cy - a.y) / da) * (radius(a) + 3);
  const tx = b.x - ((b.x - cx) / db) * (radius(b) + 5);
  const ty = b.y - ((b.y - cy) / db) * (radius(b) + 5);
  return `M${sx.toFixed(1)} ${sy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`;
}
const PATHS = DEALS.map((deal, i) => edgePath(deal, i));

/** The box around some players, labels included, in graph units. */
function bounds(ids: string[], lang: Locale) {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const id of ids) {
    const n = NODE[id];
    const r = radius(n);
    const half = Math.max(r, nodeName(id, lang).length * 4.6);
    x0 = Math.min(x0, n.x - half);
    x1 = Math.max(x1, n.x + half);
    y0 = Math.min(y0, n.y - r);
    y1 = Math.max(y1, n.y + r + 36);
  }
  return { x0, y0, x1, y1 };
}

type Camera = { s: number; tx: number; ty: number };

/**
 * Scale and offset that fit `ids` into the stage. `top` is kept free for the
 * stage header and `bottom` (a fraction of the height) for a card over the graph.
 */
function frame(ids: string[], lang: Locale, w: number, h: number, top: number, bottom: number): Camera {
  const b = bounds(ids, lang);
  const pad = 56;
  // Never zoom in so far that a single pair fills the screen.
  const minW = 380;
  const minH = 260;
  let bw = b.x1 - b.x0 + pad * 2;
  let bh = b.y1 - b.y0 + pad * 2;
  const cx = (b.x0 + b.x1) / 2;
  const cy = (b.y0 + b.y1) / 2;
  bw = Math.max(bw, minW);
  bh = Math.max(bh, minH);
  const availW = w;
  const availH = Math.max(120, h * (1 - bottom) - top);
  const s = Math.min(availW / bw, availH / bh, 1.7);
  return { s, tx: availW / 2 - cx * s, ty: top + availH / 2 - cy * s };
}

/**
 * Widens an element to the full window width, wherever its column sits.
 * Applied after mount (and on resize), so the server render stays in the column.
 */
export function useFullBleed(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    const apply = () => {
      if (!parent) return;
      const left = parent.getBoundingClientRect().left;
      const width = document.documentElement.clientWidth;
      el.style.marginLeft = `${-left}px`;
      el.style.width = `${width}px`;
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [ref]);
}

type Tip = { deal: number; x: number; y: number };

export function DealGraph({
  lang,
  edges,
  nodes,
  focus,
  top = 0,
  bottom = 0,
}: {
  lang: Locale;
  edges: EdgeState[];
  nodes: Record<string, NodeState>;
  /** Players to frame. */
  focus: string[];
  top?: number;
  bottom?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!tip) return;
    const hide = () => setTip(null);
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, [tip]);

  // Before the first measure, fall back to the whole graph in its own units.
  const w = size?.w ?? 980;
  const h = size?.h ?? 690;
  const camera = size ? frame(focus, lang, w, h, top, bottom) : { s: 1, tx: 0, ty: 0 };
  const showTip = (i: number, event: React.PointerEvent | React.MouseEvent) =>
    setTip({ deal: i, x: event.clientX, y: event.clientY });

  return (
    <div ref={box} className="dgraph">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={LABEL[lang]}>
        <defs>
          {[...Object.keys(DEAL_KINDS), "ctx"].map((kind) => (
            <marker
              key={kind}
              id={`dgraph-arrow-${kind}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerUnits="userSpaceOnUse"
              markerWidth="10"
              markerHeight="10"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" className={`dgraph__head-${kind}`} />
            </marker>
          ))}
        </defs>
        <g
          className="dgraph__camera"
          style={{ transform: `translate(${camera.tx}px, ${camera.ty}px) scale(${camera.s})` }}
        >
          <g>
            {DEALS.map((deal, i) => {
              const state = edges[i];
              return (
                <g key={i} className={`dgraph__edge dgraph__edge--${state}`}>
                  <path
                    d={PATHS[i]}
                    className={`dgraph__line dgraph__line--${deal.k}`}
                    strokeWidth={strokeWidth(deal).toFixed(2)}
                    strokeDasharray={deal.k === "rup" ? "6 5" : undefined}
                    markerEnd={`url(#dgraph-arrow-${state === "ctx" ? "ctx" : deal.k})`}
                  />
                  {state === "on" && (
                    <path
                      d={PATHS[i]}
                      className="dgraph__hit"
                      onPointerMove={(e) => showTip(i, e)}
                      onPointerLeave={() => setTip(null)}
                      onClick={(e) => showTip(i, e)}
                    />
                  )}
                </g>
              );
            })}
          </g>
          <g>
            {DEAL_NODES.map((node) => {
              const r = radius(node);
              const name = nodeName(node.id, lang);
              const state = nodes[node.id] ?? "faint";
              return (
                <g key={node.id} className={`dgraph__node dgraph__node--${node.cat} dgraph__node--${state}`}>
                  <title>{`${name} : ${node.desc[lang]}`}</title>
                  {state === "on" && <circle cx={node.x} cy={node.y} r={r + 5} className="dgraph__ring" />}
                  <circle cx={node.x} cy={node.y} r={r} className="dgraph__dot" />
                  {node.cat === "lab" && (
                    <text x={node.x} y={node.y + 6} textAnchor="middle" className="dgraph__initial">
                      {name.slice(0, 1)}
                    </text>
                  )}
                  <text x={node.x} y={node.y + r + 18} textAnchor="middle" className="dgraph__name">
                    {name}
                  </text>
                  <text x={node.x} y={node.y + r + 31} textAnchor="middle" className="dgraph__cat">
                    {DEAL_CATS[node.cat][lang]}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
      {tip && <DealTip tip={tip} lang={lang} />}
    </div>
  );
}

function DealTip({ tip, lang }: { tip: Tip; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: tip.x + 14, top: tip.y + 14 });
  const deal = DEALS[tip.deal];

  // Keep the tooltip inside the window.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setPos({
      left: Math.max(8, Math.min(tip.x + 14, window.innerWidth - el.offsetWidth - 10)),
      top: Math.max(8, Math.min(tip.y + 14, window.innerHeight - el.offsetHeight - 10)),
    });
  }, [tip]);

  return (
    <div ref={ref} className="dgraph__tip" style={pos} role="status">
      <b>
        {nodeName(deal.f, lang)} → {nodeName(deal.t, lang)}
      </b>{" "}
      · {DEAL_KINDS[deal.k][lang]}
      <br />
      {deal.txt[lang]}
      <span>
        {deal.amt[lang]} · {dealMonth(deal.d, lang)} · {DEAL_SOURCES[deal.s].label[lang]}
      </span>
    </div>
  );
}

export function Legend({ lang }: { lang: Locale }) {
  return (
    <ul className="dgraph__legend">
      {LEGEND[lang].map(([kind, label]) => (
        <li key={kind}>
          <i className={`dgraph__swatch dgraph__swatch--${kind}`} />
          {label}
        </li>
      ))}
    </ul>
  );
}
