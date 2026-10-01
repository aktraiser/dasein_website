"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";

type Props = Pick<Dictionary["architecture"], "layers" | "traceTitle">;

/**
 * Scroll-driven architecture: each step on the right activates a layer of the
 * stack on the left, moves the packet down the rail and appends to the trace.
 */
export function Architecture({ layers, traceTitle }: Props) {
  const [active, setActive] = useState(0);
  const [packetTop, setPacketTop] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const layerRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const measure = useCallback(() => {
    const node = layerRefs.current[active];
    if (node) setPacketTop(node.offsetTop + node.offsetHeight / 2);
  }, [active]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const trace = layers
    .slice(0, active + 1)
    .flatMap((layer) => layer.trace.map((line) => ({ layer: layer.id, line })));

  return (
    <div className="arch">
      <div className="arch__stage" aria-hidden="true">
        <div className="arch__stack">
          <div className="arch__rail">
            <div className="arch__rail-fill" style={{ height: packetTop }} />
          </div>
          <div className="arch__packet" style={{ top: packetTop - 4 }} />
          {layers.map((layer, i) => (
            <div
              key={layer.id}
              ref={(node) => {
                layerRefs.current[i] = node;
              }}
              className="layer"
              data-state={i === active ? "active" : i < active ? "done" : "idle"}
            >
              <span className="layer__index">L{i + 1}</span>
              <span className="layer__name">{layer.name}</span>
              <span className="layer__stack">
                {layer.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className="terminal">
          <div className="terminal__bar">
            <span>{traceTitle}</span>
            <span className="terminal__live">live</span>
          </div>
          <div className="terminal__body">
            {trace.map(({ layer, line }, i) => (
              <div key={`${layer}-${i}`} className="trace-line">
                <span className="trace-line__layer">[{layer}]</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ol className="arch__steps">
        {layers.map((layer, i) => (
          <li
            key={layer.id}
            ref={(node) => {
              stepRefs.current[i] = node;
            }}
            data-index={i}
            data-active={i === active}
            className="step"
          >
            <p className="step__label">
              L{i + 1} — {layer.name}
            </p>
            <h3 className="h3">{layer.title}</h3>
            <p>{layer.text}</p>
            <div className="step__mobile">
              <div className="chips">
                {layer.stack.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
              <div className="terminal" aria-hidden="true">
                <div className="terminal__body">
                  {layer.trace.map((line) => (
                    <div key={line} className="trace-line">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
