"use client";

import { CircleCheck, Pause, Phone, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Business } from "@/config/business";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

type AiCallConfig = Business["aiCall"];

const LINE_DELAY_MS = 1900;
const HOLD_AT_END_MS = 4500;
const INITIAL_LINES = 2;

/**
 * Phone mock-up that plays a looping demo transcript of the AI receptionist
 * booking an inspection. Lines arrive with the standard fade-up. It only runs
 * while on screen, can be paused, and under reduced motion shows the whole
 * transcript at once with no loop. Clearly labelled as a demo call.
 */
export function AiCallCard({ config }: { config: AiCallConfig }) {
  const reducedMotion = useReducedMotion();
  const total = config.transcript.length + 1; // lines, then the outcome row
  // The first two lines are there from the start, so the card never looks empty.
  const [count, setCount] = useState(Math.min(INITIAL_LINES, total));
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Start the loop only once the card is on screen and the browser is idle.
  useEffect(() => {
    if (!inView || started) return;
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(() => setStarted(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, [inView, started]);

  useEffect(() => {
    if (reducedMotion || paused || !inView || !started) return;
    const atEnd = count >= total;
    const timer = window.setTimeout(
      () => setCount(atEnd ? Math.min(INITIAL_LINES, total) : count + 1),
      atEnd ? HOLD_AT_END_MS : LINE_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [count, total, paused, inView, started, reducedMotion]);

  const shown = reducedMotion ? total : count;
  const lines = config.transcript.slice(0, shown);
  const showOutcome = shown >= total;

  return (
    <div
      ref={frame}
      className="on-dark-section mx-auto w-full max-w-[22rem] rounded-[1.75rem] border border-on-dark/20 p-3"
    >
      <div className="flex items-center justify-between gap-3 px-2 pt-1 pb-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-on-dark/30">
            <Phone aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </span>
          <div className="leading-tight">
            <p className="font-semibold">{config.agentName}</p>
            <p className="type-eyebrow mt-1 text-on-dark-muted">{config.demoLabel}</p>
          </div>
        </div>
        {reducedMotion ? null : (
          <button
            type="button"
            aria-label={paused ? config.play : config.pause}
            onClick={() => setPaused((value) => !value)}
            className="flex size-11 items-center justify-center rounded-md hover:bg-on-dark/10"
          >
            {paused ? (
              <Play aria-hidden="true" className="size-5" strokeWidth={1.5} />
            ) : (
              <Pause aria-hidden="true" className="size-5" strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>

      {/* Full transcript for screen readers; the animated one is decorative. */}
      <ol className="sr-only">
        {config.transcript.map((line) => (
          <li key={line.text}>
            {line.speaker === "agent" ? config.agentName : config.callerName}: {line.text}
          </li>
        ))}
        <li>{config.outcome}</li>
      </ol>

      <div
        aria-hidden="true"
        className={cn(
          "flex flex-col justify-end overflow-hidden rounded-[1.25rem] bg-on-dark/5 p-3",
          reducedMotion ? "min-h-[26rem]" : "h-[26rem]",
        )}
      >
        {/* Reads from the top while the lines fit. mb-auto takes the spare
            space; once the transcript overflows it collapses to zero and
            justify-end keeps the newest line in view, like a phone does. */}
        <div className="mb-auto flex flex-col gap-2">
          {lines.map((line) => (
            <p
              key={line.text}
              className={cn(
                "type-small animate-fade-up max-w-[85%] rounded-lg px-3 py-2 motion-reduce:animate-none",
                line.speaker === "agent"
                  ? "self-start bg-surface text-charcoal"
                  : "self-end border border-on-dark/40 text-on-dark",
              )}
            >
              {line.text}
            </p>
          ))}
          {showOutcome ? (
            <p className="type-small animate-fade-up mt-1 flex items-center gap-2 rounded-lg border border-on-dark/40 px-3 py-3 font-semibold motion-reduce:animate-none">
              <CircleCheck aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
              {config.outcome}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
