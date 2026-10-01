"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Fades its content in once when it enters the viewport. */
export function Reveal({
  as: Tag = "div",
  id,
  className = "",
  delay = 0,
  children,
}: {
  as?: ElementType;
  id?: string;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
