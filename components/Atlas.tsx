"use client";

import Link from "next/link";
import { ArticleVisual } from "./ArticleVisual";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { ForceGraph3DInstance } from "3d-force-graph";
import type { CanvasTexture, MeshLambertMaterial, PerspectiveCamera, SpriteMaterial, Vector3 } from "three";
import type { Dictionary } from "@/content/dictionaries";
import type { Atlas as AtlasData, AtlasGroup, AtlasNode } from "@/lib/atlas";
import type { Locale } from "@/lib/i18n";

type Labels = Dictionary["articlesPage"]["atlas"];
type Node = AtlasNode & { x?: number; y?: number; z?: number; vx?: number; vy?: number; vz?: number };
type Edge = { source: string | Node; target: string | Node };
type Graph = ForceGraph3DInstance<Node, Edge>;
/** A point's materials and title, with its current and target brightness (0 to 1). */
type Part = { mesh: MeshLambertMaterial; glow: SpriteMaterial; label: HTMLElement; level: number; target: number };
type Focus = { selected: string | null; hover: string | null; group: Set<string> | null };

const GROUPS: AtlasGroup[] = ["article", "case", "offer"];
const COLORS: Record<AtlasGroup, string> = {
  article: "#e5bda2",
  case: "#c9adc9",
  offer: "#fff3c7",
};
const LINK = "#987783";
const LINK_DIM = "#49313f";
/** Room kept around each point for its title: wide, not tall, little depth. */
const GAP = { x: 150, y: 48, z: 70 };

const idOf = (end: string | Node) => (typeof end === "string" ? end : end.id);
/** The 3D map is for wide screens with a mouse (same query in the CSS); elsewhere the list below does the job. */
const MAP_QUERY = "(min-width: 1000px) and (hover: hover) and (pointer: fine)";
const watchMap = (onChange: () => void) => {
  const query = window.matchMedia(MAP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Soft round light, tinted per node by its sprite material. */
function glowTexture(THREE: typeof import("three")): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Everything Dasein has written as one 3D graph (after secondbrainos.dev):
 * articles and case studies, linked to each other and to the offers that
 * cite them. Hover lights a node's neighbours, a click opens it in a side
 * panel. three.js loads only here, after the page, and only on wide screens
 * with a mouse: elsewhere the list below the map, grouped the same way, is enough.
 */
export function Atlas({
  data,
  labels,
  lang,
  title,
  intro,
}: {
  data: AtlasData;
  labels: Labels;
  lang: Locale;
  title: string;
  intro: string;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const parts = useRef(new Map<string, Part>());
  const focus = useRef<Focus>({ selected: null, hover: null, group: null });
  const paint = useRef<() => void>(() => {});
  const flyTo = useRef<(id: string) => void>(() => {});
  const frame = useRef<(ms: number, straight?: boolean) => void>(() => {});
  /** Set once the visitor moves the camera or opens a point: the idle sway stops for good. */
  const moved = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "unsupported">("loading");
  const [selected, setSelected] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const wide = useSyncExternalStore(watchMap, () => window.matchMedia(MAP_QUERY).matches, () => false);

  const byId = useMemo(() => new Map(data.nodes.map((node) => [node.id, node])), [data.nodes]);
  const neighbours = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const { source, target } of data.links) {
      map.set(source, (map.get(source) ?? new Set()).add(target));
      map.set(target, (map.get(target) ?? new Set()).add(source));
    }
    return map;
  }, [data.links]);

  useEffect(() => {
    const el = holder.current;
    if (!el || !wide) return;
    let cancelled = false;
    let graph: Graph | undefined;
    let observer: ResizeObserver | undefined;
    let fading = 0;
    let depthFrame = 0;
    let revealTimer = 0;
    const disposables: { dispose(): void }[] = [];
    const partMap = parts.current;

    (async () => {
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) {
        setStatus("unsupported");
        return;
      }
      const [{ default: ForceGraph3D }, THREE, { CSS2DRenderer, CSS2DObject }] = await Promise.all([
        import("3d-force-graph"),
        import("three"),
        import("three/examples/jsm/renderers/CSS2DRenderer.js"),
      ]);
      if (cancelled) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const texture = glowTexture(THREE);
      const sphere = new THREE.SphereGeometry(1, 24, 16);
      disposables.push(texture, sphere);
      nodesRef.current = data.nodes.map((node) => ({ ...node }));

      const degree = (id: string) => neighbours.get(id)?.size ?? 0;
      const radius = (node: Node) => (node.group === "offer" ? 9 : 6 + Math.sqrt(degree(node.id)) * 1.1);

      graph = new ForceGraph3D(el, {
        controlType: "orbit",
        extraRenderers: [new CSS2DRenderer() as never],
      }) as unknown as Graph;
      graphRef.current = graph;

      // Forces come first, so that the warm-up below lays the map out with them.
      // Few links, several themes: keep the groups close instead of drifting apart…
      const charge = graph.d3Force("charge") as unknown as
        | { strength(s: number): void; distanceMax(d: number): void }
        | undefined;
      charge?.strength(-200);
      charge?.distanceMax(380);
      const links = graph.d3Force("link") as unknown as { distance(d: number): void } | undefined;
      links?.distance(100);
      // …keep every point clear of the others, with room for its title…
      let placed: Node[] = [];
      const initialize = (nodes: Node[]) => void (placed = nodes);
      const collide = Object.assign(
        () => {
          for (let i = 0; i < placed.length; i++) {
            for (let j = i + 1; j < placed.length; j++) {
              const a = placed[i];
              const b = placed[j];
              const dx = (b.x ?? 0) - (a.x ?? 0);
              const dy = (b.y ?? 0) - (a.y ?? 0);
              const dz = (b.z ?? 0) - (a.z ?? 0);
              const e = Math.hypot(dx / GAP.x, dy / GAP.y, dz / GAP.z) || 0.01;
              if (e >= 1) continue;
              const push = ((1 - e) / e) * 0.5;
              a.vx = (a.vx ?? 0) - dx * push;
              a.vy = (a.vy ?? 0) - dy * push;
              a.vz = (a.vz ?? 0) - dz * push;
              b.vx = (b.vx ?? 0) + dx * push;
              b.vy = (b.vy ?? 0) + dy * push;
              b.vz = (b.vz ?? 0) + dz * push;
            }
          }
        },
        { initialize },
      );
      // …and keep the map shallow, facing the visitor, so titles rarely cross.
      const shallow = Object.assign(
        () => {
          for (const n of placed) n.vz = (n.vz ?? 0) - (n.z ?? 0) * 0.12;
        },
        { initialize },
      );
      graph.d3Force("collide", collide);
      graph.d3Force("shallow", shallow);

      const controls = graph.controls() as {
        target: Vector3;
        enableDamping: boolean;
        dampingFactor: number;
        addEventListener(type: string, fn: () => void): void;
      };
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.addEventListener("start", () => (moved.current = true));

      const linkColor = (link: Edge) => {
        const { selected, hover, group } = focus.current;
        const center = hover ?? selected;
        const s = idOf(link.source);
        const t = idOf(link.target);
        if (center) return s === center || t === center ? COLORS[byId.get(center)!.group] : LINK_DIM;
        if (group) return group.has(s) || group.has(t) ? LINK : LINK_DIM;
        return LINK;
      };
      const particles = (link: Edge) => {
        const center = focus.current.hover ?? focus.current.selected;
        return center && (idOf(link.source) === center || idOf(link.target) === center) ? 2 : 0;
      };

      // Points fade towards their target brightness instead of switching at once.
      const fade = () => {
        let moving = false;
        for (const part of partMap.values()) {
          const next = part.level + (part.target - part.level) * 0.2;
          part.level = Math.abs(part.target - next) < 0.01 ? part.target : next;
          moving ||= part.level !== part.target;
          part.mesh.opacity = 0.1 + 0.85 * part.level;
          part.glow.opacity = 0.03 + 0.47 * part.level;
        }
        fading = moving ? requestAnimationFrame(fade) : 0;
      };

      paint.current = () => {
        const { selected, hover, group } = focus.current;
        const center = hover ?? selected;
        const lit = center ? new Set([center, ...(neighbours.get(center) ?? [])]) : null;
        for (const [id, part] of partMap) {
          const on = lit ? lit.has(id) : group ? group.has(id) : true;
          part.target = on ? 1 : 0;
          part.label.dataset.state = !lit && !group ? "idle" : id === center ? "center" : on ? "near" : "off";
        }
        if (!fading) fading = requestAnimationFrame(fade);
        graph?.linkColor(linkColor).linkDirectionalParticles(particles);
      };

      // Moves closer to a point along the current line of sight (the map is shallow:
      // coming from its centre would show it edge-on).
      flyTo.current = (id: string) => {
        const node = nodesRef.current.find((n) => n.id === id);
        const camera = graph?.camera();
        if (!graph || !camera || !node || node.x === undefined) return;
        const t = controls.target;
        const d = { x: camera.position.x - t.x, y: camera.position.y - t.y, z: camera.position.z - t.z };
        const len = Math.hypot(d.x, d.y, d.z) || 1;
        const dist = Math.max(220, Math.min(520, len * 0.6));
        const p = { x: node.x, y: node.y ?? 0, z: node.z ?? 0 };
        graph.cameraPosition(
          { x: p.x + (d.x / len) * dist, y: p.y + (d.y / len) * dist, z: p.z + (d.z / len) * dist },
          p,
          reduced ? 0 : 1400,
        );
      };

      graph
        .backgroundColor("rgba(0,0,0,0)")
        .showNavInfo(false)
        .enableNodeDrag(false)
        .nodeLabel(() => "")
        .nodeThreeObject((node: Node) => {
          const r = radius(node);
          const object = new THREE.Group();
          const mesh = new THREE.MeshLambertMaterial({
            color: COLORS[node.group],
            emissive: COLORS[node.group],
            emissiveIntensity: 0.35,
            transparent: true,
            opacity: 0.95,
          });
          const body = new THREE.Mesh(sphere, mesh);
          body.scale.setScalar(r);
          const glow = new THREE.SpriteMaterial({
            map: texture,
            color: COLORS[node.group],
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const halo = new THREE.Sprite(glow);
          halo.scale.setScalar(r * 6);
          const label = document.createElement("span");
          label.className = `atlas__label atlas__label--${node.group}`;
          label.dataset.state = "idle";
          label.textContent = node.short;
          // Centred on the point; CSS moves the title to the side chosen each frame.
          const tag = new CSS2DObject(label);
          object.add(body, halo, tag);
          disposables.push(mesh, glow);
          partMap.set(node.id, { mesh, glow, label, level: 1, target: 1 });
          return object;
        })
        .linkColor(linkColor)
        .linkOpacity(0.55)
        .linkWidth(0)
        .linkDirectionalParticles(particles)
        .linkDirectionalParticleWidth(1.4)
        .linkDirectionalParticleSpeed(0.006)
        .linkDirectionalParticleColor(() => COLORS.article)
        .onNodeHover((node: Node | null) => {
          focus.current.hover = node?.id ?? null;
          paint.current();
        })
        .onNodeClick((node: Node) => {
          moved.current = true;
          setSelected(node.id);
          flyTo.current(node.id);
        })
        .onBackgroundClick(() => {
          moved.current = true;
          focus.current.hover = null;
          setSelected(null);
          setGroup(null);
          frame.current(700);
        })
        // Lay the whole map out before showing it: nothing moves but the camera.
        .warmupTicks(300)
        .cooldownTicks(0);

      // Each frame: keep the view offset, sway gently while idle (a few degrees
      // around the centre, paused on hover), and dim the titles further back.
      let swayTime = 0;
      let swayRadius = 0;
      let last = performance.now();
      const projected = new THREE.Vector3();
      const screenX = new Map<string, number>();
      const depth = () => {
        offset();
        const now = performance.now();
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const camera = graph?.camera();
        if (camera && swayRadius && !reduced && !moved.current && !focus.current.hover && !focus.current.selected) {
          swayTime += dt;
          const t = controls.target;
          const azimuth = Math.sin(swayTime * 0.22) * 0.32;
          const elevation = Math.sin(swayTime * 0.15) * 0.09;
          camera.position.set(
            t.x + swayRadius * Math.sin(azimuth) * Math.cos(elevation),
            t.y + swayRadius * Math.sin(elevation),
            t.z + swayRadius * Math.cos(azimuth) * Math.cos(elevation),
          );
          camera.lookAt(t);
        }
        if (camera) {
          const distances = nodesRef.current.map((n) =>
            Math.hypot((n.x ?? 0) - camera.position.x, (n.y ?? 0) - camera.position.y, (n.z ?? 0) - camera.position.z),
          );
          const near = Math.min(...distances);
          const far = Math.max(...distances);
          nodesRef.current.forEach((n, i) => {
            const t = far > near ? (distances[i] - near) / (far - near) : 0;
            partMap.get(n.id)?.label.style.setProperty("--depth", (1 - t * 0.65).toFixed(2));
            screenX.set(n.id, projected.set(n.x ?? 0, n.y ?? 0, n.z ?? 0).project(camera).x);
          });
          // Each title goes on the side away from its neighbours (or from the centre).
          const all = [...screenX.values()];
          const centre = all.reduce((a, b) => a + b, 0) / (all.length || 1);
          for (const n of nodesRef.current) {
            const around = [...(neighbours.get(n.id) ?? [])].map((id) => screenX.get(id) ?? centre);
            const ref = around.length ? around.reduce((a, b) => a + b, 0) / around.length : centre;
            const side = (screenX.get(n.id) ?? 0) < ref ? "left" : "right";
            const label = partMap.get(n.id)?.label;
            if (label && label.dataset.side !== side) label.dataset.side = side;
          }
        }
        depthFrame = requestAnimationFrame(depth);
      };

      // On wide screens the intro panel covers the left: centre the map in what remains.
      // On wide screens the panels cover the sides: the map is centred in the space
      // between them (the intro on the left, an open point's details on the right).
      // The library resets the camera's view offset on its own updates, so it is
      // eased and re-applied on every frame (see depth below) rather than set once.
      const shiftFor = (w: number, open = false) => {
        if (w < 1000) return 0;
        const left = Math.min(w * 0.34, 480);
        return open ? (left - Math.min(w * 0.32, 380)) / 2 : left / 2;
      };
      let shift = shiftFor(el.clientWidth);
      const offset = () => {
        const camera = graph?.camera() as PerspectiveCamera | undefined;
        if (!camera) return;
        const w = el.clientWidth;
        const h = el.clientHeight;
        const goal = shiftFor(w, !!focus.current.selected);
        shift = Math.abs(goal - shift) < 0.5 || reduced ? goal : shift + (goal - shift) * 0.08;
        const view = camera.view;
        if (shift && (!view?.enabled || view.offsetX !== -shift || view.fullWidth !== w || view.fullHeight !== h)) {
          camera.setViewOffset(w, h, -shift, 0, w, h);
        } else if (!shift && view?.enabled) {
          camera.clearViewOffset();
        }
      };
      const fit = () => {
        if (!graph) return;
        graph.width(el.clientWidth).height(el.clientHeight);
        offset();
      };

      // Fits the whole map in the visible area, facing it (straight) or keeping the current direction.
      frame.current = (ms: number, straight = false) => {
        const nodes = nodesRef.current;
        const camera = graph?.camera() as PerspectiveCamera | undefined;
        if (!graph || !camera || !nodes.length) return;
        const c = { x: 0, y: 0, z: 0 };
        for (const n of nodes) {
          c.x += (n.x ?? 0) / nodes.length;
          c.y += (n.y ?? 0) / nodes.length;
          c.z += (n.z ?? 0) / nodes.length;
        }
        const r = Math.max(...nodes.map((n) => Math.hypot((n.x ?? 0) - c.x, (n.y ?? 0) - c.y, (n.z ?? 0) - c.z))) + 30;
        const w = el.clientWidth;
        const h = el.clientHeight || 1;
        const vertical = (camera.fov * Math.PI) / 180;
        // Titles sit beside the points: keep room for them on both sides.
        const titles = w < 700 ? 100 : 150;
        const room = Math.max(120, w - 2 * shiftFor(w) - 2 * titles);
        const horizontal = 2 * Math.atan(Math.tan(vertical / 2) * (room / h));
        const distance = (r / Math.sin(Math.min(vertical, horizontal) / 2)) * 1.02;
        const d = { x: camera.position.x - c.x, y: camera.position.y - c.y, z: camera.position.z - c.z };
        const len = Math.hypot(d.x, d.y, d.z) || 1;
        const dir = !straight && len > 1 ? { x: d.x / len, y: d.y / len, z: d.z / len } : { x: 0, y: 0, z: 1 };
        graph.cameraPosition(
          { x: c.x + dir.x * distance, y: c.y + dir.y * distance, z: c.z + dir.z * distance },
          c,
          reduced ? 0 : ms,
        );
      };

      // Framed once every point has its place (and the map its size), then faded in.
      let shown = false;
      const reveal = () => {
        const placedAll = nodesRef.current.length > 0 && nodesRef.current.every((n) => n.x !== undefined);
        if (shown || !graph || !placedAll) return;
        shown = true;
        frame.current(0, true);
        const camera = graph.camera();
        swayRadius = camera.position.distanceTo(controls.target);
        depthFrame = requestAnimationFrame(depth);
        setStatus("ready");
      };
      const retry = () => {
        reveal();
        if (!shown) revealTimer = window.setTimeout(retry, 250);
      };
      fit();
      graph.onEngineStop(reveal);
      graph.graphData({ nodes: nodesRef.current, links: data.links.map((l) => ({ ...l })) });
      revealTimer = window.setTimeout(retry, 250);
      observer = new ResizeObserver(fit);
      observer.observe(el);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(fading);
      cancelAnimationFrame(depthFrame);
      window.clearTimeout(revealTimer);
      observer?.disconnect();
      graph?._destructor();
      disposables.forEach((d) => d.dispose());
      partMap.clear();
      graphRef.current = null;
      el.innerHTML = "";
    };
    // The map is built once; later changes go through the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byId, neighbours, wide]);

  const wasSelected = useRef(false);
  useEffect(() => {
    focus.current.selected = selected;
    paint.current();
    // Closing a point steps back to the whole map.
    if (!selected && wasSelected.current) frame.current(1000);
    wasSelected.current = !!selected;
  }, [selected]);

  useEffect(() => {
    focus.current.group = group ? new Set(data.clusters.find(cluster => cluster.name === group)?.ids ?? []) : null;
    paint.current();
  }, [group, data.clusters]);

  const open = (id: string) => {
    moved.current = true;
    setSelected(id);
    setQuery("");
    flyTo.current(id);
  };

  const node = selected ? byId.get(selected) : undefined;
  const near = node
    ? [...(neighbours.get(node.id) ?? [])]
        .map((id) => byId.get(id)!)
        .sort((a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group))
    : [];
  const q = query.trim().toLowerCase();
  const matches = q ? data.nodes.filter((n) => n.label.toLowerCase().includes(q)).slice(0, 6) : [];
  const number = new Intl.NumberFormat(lang);

  return (
    <section className="atlas" data-night="" aria-labelledby="atlas-title">
      <div className="atlas__stage">
        <div
          className="atlas__graph"
          ref={holder}
          role="img"
          aria-label={labels.mapLabel}
          data-ready={status === "ready"}
        />
        {status !== "ready" && (
          <p className="atlas__status">{status === "loading" ? labels.loading : labels.unsupported}</p>
        )}
      </div>

      <div className="atlas__intro">
        <p className="atlas__kicker">{labels.kicker}</p>
        <h1 id="atlas-title" className="atlas__title">
          {title}
        </h1>
        <p className="atlas__lead">{intro}</p>
        <ul className="atlas__groups">
          {data.clusters.map((cluster, index) => {
            const count = cluster.ids.filter(id => byId.get(id)?.group !== "offer").length;
            return <li key={cluster.name}>
              <button type="button" className="atlas__group" aria-pressed={group === cluster.name}
                onClick={() => { moved.current = true; setSelected(null); focus.current.hover = null; setGroup(group === cluster.name ? null : cluster.name); frame.current(700); }}
                style={{ "--group": ["#fff3c7", "#c9adc9", "#e5bda2", "#d7c6b3"][index % 4] } as CSSProperties}>
                <span className="atlas__group-name">{cluster.name}</span>
                <span className="atlas__group-count">{count}</span>
              </button>
            </li>;
          })}
        </ul>
        <dl className="atlas__stats">
          {(["articles", "words", "minutes", "links"] as const).map((key) => (
            <div key={key}>
              <dt>{number.format(data.stats[key])}</dt>
              <dd>{labels.stats[key]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="atlas__search">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.search}
          aria-label={labels.search}
        />
        {matches.length === 0 && !selected && <p className="atlas__hint">{labels.intro}</p>}
        {matches.length > 0 && (
          <ul className="atlas__results">
            {matches.map((m) => (
              <li key={m.id}>
                <button type="button" onClick={() => open(m.id)}>
                  <i style={{ background: COLORS[m.group] }} />
                  {m.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {node && (
        <aside className="atlas__panel" aria-live="polite">
          <button type="button" className="atlas__close" onClick={() => setSelected(null)} aria-label={labels.close}>
            ×
          </button>
          <p className="atlas__panel-kind" style={{ color: COLORS[node.group] }}>
            {labels.groups[node.group]}
          </p>
          {node.cover && <div className="atlas__panel-image"><ArticleVisual cover={node.cover} lang={lang} /></div>}
          <h2 className="atlas__panel-title">{node.label}</h2>
          <p className="atlas__panel-meta">{node.meta}</p>
          <p className="atlas__panel-text">{node.text}</p>
          <Link href={`/${lang}${node.href}`} className="pill pill--paper pill--lg">
            {labels.open[node.group]} <span className="arrow" aria-hidden="true">→</span>
          </Link>
          {near.length > 0 && (
            <>
              <p className="atlas__panel-label">
                {labels.linked} <span>{near.length}</span>
              </p>
              <ul className="atlas__near">
                {near.map((n) => (
                  <li key={n.id}>
                    <button type="button" onClick={() => open(n.id)}>
                      <i style={{ background: COLORS[n.group] }} />
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      )}

    </section>
  );
}
