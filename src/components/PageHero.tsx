import Image from "next/image";
import type { ReactNode } from "react";

import type { ImageAsset } from "@/config/business";

const fadeUp = "animate-fade-up motion-reduce:animate-none";

/** Charcoal page header for inner pages, with an optional photo behind it. */
export function PageHero({
  eyebrow,
  heading,
  lead,
  image,
  children,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  image?: ImageAsset;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark-section relative isolate overflow-hidden">
      {image ? (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="-z-20 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-charcoal/85" />
        </>
      ) : (
        <div aria-hidden="true" className="bg-diagonal-lines absolute inset-0 -z-10" />
      )}

      <div className="container-site py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className={`${fadeUp} type-eyebrow text-on-dark-muted`}>{eyebrow}</p>
          <h1 className={`${fadeUp} type-display mt-4 [animation-delay:60ms]`}>
            {heading}
          </h1>
          {lead ? (
            <p
              className={`${fadeUp} type-lead mt-6 max-w-[60ch] text-on-dark-muted [animation-delay:120ms]`}
            >
              {lead}
            </p>
          ) : null}
          {children ? (
            <div
              className={`${fadeUp} mt-10 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:gap-4`}
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
