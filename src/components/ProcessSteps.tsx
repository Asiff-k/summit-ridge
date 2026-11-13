import { Reveal } from "@/components/Reveal";
import type { Step } from "@/config/business";
import { cn } from "@/lib/utils";

export function ProcessSteps({
  steps,
  onDark = false,
  className,
}: {
  steps: readonly Step[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-x-8 gap-y-8 sm:grid-cols-2", className)}>
      {steps.map((step, index) => (
        <li key={step.title}>
          <Reveal
            index={index}
            className={cn(
              "h-full border-t pt-5",
              onDark ? "border-on-dark/20" : "border-border",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "font-heading text-4xl leading-none font-bold tabular-nums",
                onDark ? "text-on-dark-muted" : "text-muted-foreground",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="type-h3 mt-3">{step.title}</h3>
            <p
              className={cn(
                "mt-2",
                onDark ? "text-on-dark-muted" : "text-muted-foreground",
              )}
            >
              {step.text}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
