"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";

type Props = Pick<Dictionary["ecosystem"], "groups" | "routes">;

const INTERVAL = 3600;

/**
 * Ecosystem matrix. Each route lights up the nodes a real system crosses,
 * cycling automatically until the visitor picks one.
 */
export function Ecosystem({ groups, routes }: Props) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % routes.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [auto, inView, routes.length]);

  const path = routes[active].path;
  // Order the route along the columns (data → AI → agentic → enterprise → cloud)
  const ordered = groups.flatMap((group, g) =>
    group.items.filter((item) => path.includes(item)).map((item) => ({ item, g })),
  );
  const cloudIndex = groups.length - 1;
  const flow = ordered.filter((node) => node.g !== cloudIndex);
  const runtime = ordered.find((node) => node.g === cloudIndex);

  return (
    <div className="eco" ref={ref}>
      <div>
        <div className="eco__routes" role="group">
          {routes.map((route, i) => (
            <button
              key={route.name}
              type="button"
              className="eco__route"
              aria-pressed={i === active}
              onClick={() => {
                setActive(i);
                setAuto(false);
              }}
            >
              {route.name}
              <span className="eco__route-index">0{i + 1}</span>
            </button>
          ))}
        </div>
        <p className="eco__path" aria-live="polite">
          {flow.map((node, i) => (
            <span key={node.item}>
              {i > 0 && <i>→</i>}
              {node.item}
            </span>
          ))}
          {runtime && (
            <>
              <i>@</i>
              <span>{runtime.item}</span>
            </>
          )}
        </p>
      </div>

      <div className="eco__grid">
        {groups.map((group, g) => (
          <div key={group.name} className="eco__col">
            <p className="eco__col-name">{group.name}</p>
            {group.items.map((item) => {
              const on = path.includes(item);
              return (
                <span key={item} className="eco__node" data-on={on}>
                  {item}
                  {on && <span className="eco__step">{g === cloudIndex ? "@" : `0${g + 1}`}</span>}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
