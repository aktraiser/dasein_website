"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

// Shared stacking order: the last window touched comes to the front.
let topZ = 20;

/**
 * Retro 1-bit window, draggable by its title bar (mouse or touch).
 */
export function Window({
  title,
  children,
  className = "",
  style,
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tone?: "light" | "grey" | "ink";
}) {
  const ref = useRef<HTMLElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const raise = () => {
    if (ref.current) ref.current.style.zIndex = String(++topZ);
  };

  const onDown = (event: PointerEvent<HTMLElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, ox: offset.current.x, oy: offset.current.y };
    ref.current?.setAttribute("data-dragging", "true");
  };

  const onMove = (event: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || !ref.current) return;
    offset.current = { x: d.ox + event.clientX - d.x, y: d.oy + event.clientY - d.y };
    ref.current.style.translate = `${offset.current.x}px ${offset.current.y}px`;
  };

  const onUp = () => {
    drag.current = null;
    ref.current?.removeAttribute("data-dragging");
  };

  return (
    <section ref={ref} className={`win win--${tone} ${className}`} style={style} onPointerDown={raise}>
      <header
        className="win__bar"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span>{title}</span>
        <span className="win__box" aria-hidden="true" />
      </header>
      <div className="win__body">{children}</div>
    </section>
  );
}
