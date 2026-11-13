"use client";

import { useEffect, useRef, useState } from "react";

import { BookButton } from "@/components/BookButton";
import { buttonClasses, choiceClass } from "@/components/button-styles";
import type { Business } from "@/config/business";
import { fill } from "@/lib/template";
import { cn } from "@/lib/utils";

type QuizConfig = Business["quiz"];

/** Five questions, then a score, a recommendation, and a booking button. */
export function RoofQuiz({ config }: { config: QuizConfig }) {
  // Points chosen so far, one entry per answered question.
  const [answers, setAnswers] = useState<number[]>([]);

  const total = config.questions.length;
  const current = answers.length;
  const finished = current >= total;

  // Move focus to the new question or the result. Skipped on first render.
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
  }, [current]);

  const cardClass = "rounded-lg border border-border bg-card p-5 sm:p-6 lg:p-8";

  if (finished) {
    const points = answers.reduce((sum, value) => sum + value, 0);
    const maxPoints = config.questions.reduce(
      (sum, question) =>
        sum + Math.max(...question.options.map((option) => option.points)),
      0,
    );
    const score = Math.round(100 - (points / maxPoints) * 100);
    const result =
      config.results.find((entry) => points <= entry.maxPoints) ??
      config.results[config.results.length - 1];

    return (
      <div className={cardClass}>
        <p className="type-small text-muted-foreground">{config.scoreLabel}</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="font-heading text-6xl leading-none font-bold tabular-nums">
            {score}
          </span>
          <span className="text-muted-foreground">{config.scoreOutOf}</span>
        </p>
        <h3 ref={heading} tabIndex={-1} className="type-h3 mt-5">
          {result.title}
        </h3>
        <p className="mt-2 max-w-[60ch] text-muted-foreground">{result.text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <BookButton service={result.service}>{config.cta}</BookButton>
          <button
            type="button"
            onClick={() => setAnswers([])}
            className={buttonClasses("outline")}
          >
            {config.restart}
          </button>
        </div>
        <p className="type-small mt-5 text-muted-foreground">{config.disclaimer}</p>
      </div>
    );
  }

  const question = config.questions[current];

  return (
    <div className={cardClass}>
      <p className="type-small font-semibold text-muted-foreground">
        {fill(config.questionLabel, { current: current + 1, total })}
      </p>
      <h3 ref={heading} tabIndex={-1} className="type-h3 mt-2">
        {question.question}
      </h3>
      <div className="mt-5 grid gap-2">
        {question.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => setAnswers((previous) => [...previous, option.points])}
            className={cn(choiceClass, "min-h-12 px-4 py-3 text-left font-medium")}
          >
            {option.label}
          </button>
        ))}
      </div>
      {current > 0 ? (
        <button
          type="button"
          onClick={() => setAnswers((previous) => previous.slice(0, -1))}
          className={buttonClasses("outline", "mt-5")}
        >
          {config.back}
        </button>
      ) : null}
    </div>
  );
}
