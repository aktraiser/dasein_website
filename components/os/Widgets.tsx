"use client";

import { useEffect, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Live clock. Renders placeholders on the server to avoid a hydration mismatch. */
export function Clock({ locale }: { locale: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="clock">
      <p>{now ? now.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "short", year: "numeric" }) : "—"}</p>
      <p className="clock__time">{now ? now.toLocaleTimeString(locale, { hour12: false }) : "--:--:--"}</p>
    </div>
  );
}

type Run = { name: string; vertical: string; steps: string[]; approval: string };

/**
 * Data → Knowledge → Intelligence → Action, executed on concrete cases: each
 * stage runs, then shows what it produced, and the widget cycles through runs.
 * The Action stage first waits for a human approval: autonomy stays graduated.
 * Timeline per run (one tick each): stage 1 running, stage 1 done, stage 2
 * running… then a pause with the full result before the next run.
 */
const TICK = 650;
const HOLD = 4;
const APPROVAL = 3; // extra ticks the Action stage spends waiting for a human

export function Chain({ stages, runs, runLabel }: { stages: string[]; runs: Run[]; runLabel: string }) {
  const last = stages.length - 1;
  // Ticks: 2 per stage (running, done), plus the approval wait on the last one.
  const complete = stages.length * 2 + APPROVAL;
  // Start on a completed run: that is what the server renders and what
  // visitors who prefer reduced motion keep seeing.
  const [tick, setTick] = useState({ run: 0, t: complete });

  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => {
      setTick(({ run, t }) => (t + 1 >= complete + HOLD ? { run: (run + 1) % runs.length, t: 0 } : { run, t: t + 1 }));
    }, TICK);
    return () => window.clearInterval(id);
  }, [complete, runs.length]);

  const run = runs[tick.run];
  const t = tick.t;
  const actionStart = last * 2; // tick at which the Action stage starts
  const waiting = t >= actionStart && t < actionStart + APPROVAL;
  const done = t >= complete - 1 ? stages.length : Math.min(last, Math.floor((t + 1) / 2));
  const running = waiting ? last : t < actionStart && t % 2 === 0 ? t / 2 : t === complete - 2 ? last : -1;

  return (
    <div className="pipe">
      <p className="pipe__head">
        <span>{runLabel}</span> {run.name}
        <span className="pipe__vertical">{run.vertical}</span>
        <span className="pipe__count">
          {String(tick.run + 1).padStart(2, "0")}/{String(runs.length).padStart(2, "0")}
        </span>
      </p>
      <ol className="pipe__steps">
        {stages.map((stage, i) => {
          const state = i < done ? "done" : i === running ? (waiting ? "hold" : "run") : "wait";
          return (
            <li key={stage} className="pipe__step" data-state={state}>
              <span className="pipe__mark" aria-hidden="true">
                {state === "done" ? "■" : state === "run" ? "▶" : state === "hold" ? "⏸" : "□"}
              </span>
              <span className="pipe__stage">{stage}</span>
              <span className="pipe__value">
                {state === "done" ? run.steps[i] : state === "hold" ? run.approval : state === "run" ? "···" : ""}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** A terminal that keeps printing the example trace, line by line. */
export function LiveTrace({ lines, rows = 9 }: { lines: string[]; rows?: number }) {
  const [count, setCount] = useState(rows);

  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => setCount((c) => c + 1), 750);
    return () => window.clearInterval(id);
  }, []);

  const visible = Array.from({ length: rows }, (_, i) => {
    const n = count - rows + i;
    return { n, line: lines[((n % lines.length) + lines.length) % lines.length] };
  });

  return (
    <div className="livetrace" aria-hidden="true">
      {visible.map(({ n, line }) => (
        <div key={n} className="livetrace__line">
          <span>{String(n).padStart(4, "0")}</span>
          {line}
        </div>
      ))}
    </div>
  );
}
