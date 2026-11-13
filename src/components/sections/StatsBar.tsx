import { business } from "@/config/business";

export function StatsBar() {
  return (
    <section className="border-b border-border bg-card">
      <dl className="container-site grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {business.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1">
            <dt className="type-small text-muted-foreground">{stat.label}</dt>
            <dd className="font-heading text-[2.5rem] leading-none font-bold tabular-nums lg:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
