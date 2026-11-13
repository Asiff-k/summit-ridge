/**
 * Confirmation checkmark that draws itself once (see DESIGN.md, Motion).
 * The animation is CSS only and is skipped under reduced motion.
 */
export function DrawnCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "size-12"}
    >
      <circle cx="24" cy="24" r="21" pathLength={1} className="draw-stroke" />
      <path
        d="M15 24.5l6.5 6.5L33.5 18"
        pathLength={1}
        className="draw-stroke [animation-delay:200ms]"
      />
    </svg>
  );
}
