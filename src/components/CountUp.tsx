/**
 * A number that counts up from zero the first time it scrolls into view.
 * This renders the final value as plain HTML, so it is correct without
 * JavaScript and under reduced motion. The counting itself is done by the one
 * observer in SiteEffects.tsx, which reads the data attributes below.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <span data-count-to={value} data-count-suffix={suffix} suppressHydrationWarning>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
