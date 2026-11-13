import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/** Star rating. Stars take the current text colour; never amber. */
export function Stars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={cn("inline-flex gap-0.5", className)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            "size-4",
            star <= rating ? "fill-current" : "opacity-40",
          )}
        />
      ))}
    </span>
  );
}
