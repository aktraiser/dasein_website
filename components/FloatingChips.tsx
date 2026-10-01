"use client";

import { useEffect, useRef } from "react";

/**
 * Round chips drifting in a box and bouncing off its walls and each other,
 * like the floating characters on openai.com. They reuse the hero's vocabulary:
 * technology logos, the shield, the arrow and plain accent dots. The cursor
 * pushes them away. Paused off-screen; static with reduced motion.
 */

type Body =
  | { kind: "logo"; id: string; size: number }
  | { kind: "dot"; tone: "accent" | "paper"; size: number }
  | { kind: "shield" | "arrow"; size: number };

const BODIES: Body[] = [
  { kind: "logo", id: "snowflake", size: 104 },
  { kind: "dot", tone: "accent", size: 120 },
  { kind: "logo", id: "servicenow", size: 96 },
  { kind: "shield", size: 92 },
  { kind: "logo", id: "openai", size: 88 },
  { kind: "dot", tone: "paper", size: 70 },
  { kind: "logo", id: "databricks", size: 84 },
  { kind: "arrow", size: 78 },
  { kind: "logo", id: "claude", size: 90 },
  { kind: "logo", id: "salesforce", size: 98 },
  { kind: "dot", tone: "accent", size: 64 },
];

// Deterministic start positions (fractions of the box), so the server render and
// the first client frame match.
const START = BODIES.map((_, i) => ({ x: ((i * 37) % 100) / 100, y: ((i * 61 + 13) % 100) / 100 }));

export function FloatingChips() {
  const boxRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = box.clientWidth;
    let h = box.clientHeight;
    let scale = Math.min(1, w / 820);
    const state = BODIES.map((b, i) => {
      const r = (b.size * scale) / 2;
      const angle = i * 2.4;
      return {
        r,
        x: r + START[i].x * Math.max(1, w - 2 * r),
        y: r + START[i].y * Math.max(1, h - 2 * r),
        vx: Math.cos(angle) * (22 + (i % 4) * 8),
        vy: Math.sin(angle) * (22 + (i % 3) * 8),
      };
    });
    const pointer = { x: -1e4, y: -1e4 };

    const place = () => {
      state.forEach((s, i) => {
        const el = chipRefs.current[i];
        if (!el) return;
        el.style.width = el.style.height = `${s.r * 2}px`;
        el.style.transform = `translate(${(s.x - s.r).toFixed(1)}px, ${(s.y - s.r).toFixed(1)}px)`;
      });
    };

    const step = (dt: number) => {
      for (const s of state) {
        // Cursor repulsion.
        const dx = s.x - pointer.x;
        const dy = s.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        const reach = 140 + s.r;
        if (d2 < reach * reach && d2 > 1) {
          const d = Math.sqrt(d2);
          const push = ((reach - d) / reach) * 900 * dt;
          s.vx += (dx / d) * push;
          s.vy += (dy / d) * push;
        }
        // Keep a gentle drift speed.
        const speed = Math.hypot(s.vx, s.vy);
        const target = 34;
        const k = speed > 0 ? 1 + (target / speed - 1) * Math.min(1, dt * 0.8) : 1;
        s.vx *= k;
        s.vy *= k;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        // Walls.
        if (s.x < s.r) {
          s.x = s.r;
          s.vx = Math.abs(s.vx);
        } else if (s.x > w - s.r) {
          s.x = w - s.r;
          s.vx = -Math.abs(s.vx);
        }
        if (s.y < s.r) {
          s.y = s.r;
          s.vy = Math.abs(s.vy);
        } else if (s.y > h - s.r) {
          s.y = h - s.r;
          s.vy = -Math.abs(s.vy);
        }
      }
      // Chip-to-chip collisions (equal mass, elastic along the normal).
      for (let i = 0; i < state.length; i++) {
        for (let j = i + 1; j < state.length; j++) {
          const a = state[i];
          const b = state[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          const overlap = a.r + b.r - dist;
          if (overlap <= 0) continue;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= (nx * overlap) / 2;
          a.y -= (ny * overlap) / 2;
          b.x += (nx * overlap) / 2;
          b.y += (ny * overlap) / 2;
          const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
          if (rel < 0) {
            a.vx += rel * nx;
            a.vy += rel * ny;
            b.vx -= rel * nx;
            b.vy -= rel * ny;
          }
        }
      }
    };

    // Settle the start positions so nothing overlaps on the first frame.
    for (let i = 0; i < 60; i++) step(0);
    place();
    box.dataset.ready = "true";

    let raf = 0;
    let last = 0;
    let running = false;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      place();
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      w = box.clientWidth;
      h = box.clientHeight;
      scale = Math.min(1, w / 820);
      state.forEach((s, i) => {
        s.r = (BODIES[i].size * scale) / 2;
        s.x = Math.min(Math.max(s.x, s.r), w - s.r);
        s.y = Math.min(Math.max(s.y, s.r), h - s.r);
      });
      place();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(box);

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running && !reduce) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    visibility.observe(box);

    const onMove = (e: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
    };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={boxRef} className="floaters" aria-hidden="true">
      {BODIES.map((b, i) => (
        <span
          key={i}
          ref={(node) => {
            chipRefs.current[i] = node;
          }}
          className={`floater floater--${b.kind === "dot" ? b.tone : b.kind}`}
          style={{ left: 0, top: 0 }}
        >
          {b.kind === "logo" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/logos/${b.id}.svg`} alt="" data-wide={b.id === "servicenow"} />
          )}
          {b.kind === "shield" && (
            <svg viewBox="0 0 40 40">
              <path d="M20 5.5 31 9.6v9.1c0 7.4-4.6 13-11 15.8-6.4-2.8-11-8.4-11-15.8V9.6z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M14.6 20.2l3.9 3.9 7.2-7.6" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {b.kind === "arrow" && (
            <svg viewBox="0 0 40 40">
              <path d="M11 20h17M21 12l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
