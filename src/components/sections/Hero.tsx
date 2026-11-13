import Image from "next/image";

import { CallTextButtons } from "@/components/ButtonLink";
import { HeroEstimateCard } from "@/components/HeroEstimateCard";
import { Stars } from "@/components/Stars";
import { business } from "@/config/business";

const fadeUp = "animate-fade-up motion-reduce:animate-none";

export function Hero() {
  const { hero } = business;

  return (
    <section className="on-dark-section relative isolate flex items-center overflow-hidden lg:min-h-[calc(100svh-11rem)]">
      <Image
        src={hero.image.src}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-20 object-cover"
      />
      {/* Flat charcoal overlay keeps the text readable over the photo. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-charcoal/80" />

      <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:py-20">
        <div>
          <p className={`${fadeUp} type-eyebrow text-on-dark-muted`}>
            {hero.eyebrow}
          </p>

          <h1 className={`${fadeUp} type-display mt-4 [animation-delay:60ms]`}>
            {hero.heading}
          </h1>

          <p
            className={`${fadeUp} type-lead mt-6 max-w-[55ch] text-on-dark [animation-delay:120ms]`}
          >
            {hero.subheading}
          </p>

          <div className={`${fadeUp} mt-8 [animation-delay:180ms]`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <CallTextButtons variant="outline-on-dark" />
            </div>

            <ul className="type-small mt-8 flex flex-col gap-x-6 gap-y-2 text-on-dark sm:flex-row sm:flex-wrap sm:items-center">
              <li className="flex items-center gap-2">
                <Stars rating={hero.rating.value} />
                <span>{hero.rating.text}</span>
              </li>
              {hero.trust.map((item) => (
                <li
                  key={item}
                  className="sm:border-l sm:border-on-dark/30 sm:pl-6"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${fadeUp} [animation-delay:180ms]`}>
          <HeroEstimateCard config={hero.estimateCard} />
        </div>
      </div>
    </section>
  );
}
