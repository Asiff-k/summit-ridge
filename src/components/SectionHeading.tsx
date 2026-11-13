import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  heading,
  text,
  onDark = false,
  className,
}: {
  eyebrow?: string;
  heading: string;
  text?: string;
  onDark?: boolean;
  className?: string;
}) {
  const mutedText = onDark ? "text-on-dark-muted" : "text-muted-foreground";

  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className={cn("type-eyebrow", mutedText)}>{eyebrow}</p>
      ) : null}
      <h2 className={cn("type-h2", eyebrow && "mt-3")}>{heading}</h2>
      {text ? <p className={cn("type-lead mt-4", mutedText)}>{text}</p> : null}
    </div>
  );
}
