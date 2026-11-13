import { cn } from "@/lib/utils";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-base leading-none font-semibold whitespace-nowrap transition-colors duration-150 disabled:opacity-60";

const variants = {
  /** Amber. Reserved for calls to action. */
  cta: "bg-cta text-cta-foreground hover:bg-cta-hover",
  /** Charcoal fill, for a second action on light backgrounds. */
  dark: "bg-primary text-primary-foreground hover:bg-primary/90",
  /** Charcoal outline on light backgrounds. */
  outline: "border border-foreground text-foreground hover:bg-foreground/5",
  /** Off-white outline on charcoal backgrounds. */
  "outline-on-dark": "border border-on-dark text-on-dark hover:bg-on-dark/10",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant = "cta", className?: string) {
  return cn(base, variants[variant], className);
}

/** Underlined text link with a 44px tap target. */
export const textLinkClass =
  "inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4";

/** Form control: 48px tall, white fill, 1px border. */
export const inputClass =
  "h-12 w-full rounded-md border border-input bg-card px-3 text-base text-foreground aria-invalid:border-destructive";

/** Toggle button for pickers (days, slots, options). Pair with aria-pressed. */
export const choiceClass =
  "rounded-md border border-input bg-card text-foreground transition-colors duration-150 hover:border-foreground aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground disabled:cursor-not-allowed disabled:border-border disabled:bg-background disabled:text-muted-foreground disabled:hover:border-border";
