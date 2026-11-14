import type { Metadata } from "next";
import Image from "next/image";

import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FinalCta } from "@/components/sections/FinalCta";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  ...business.seo.pages.about,
});

export default function AboutPage() {
  const { about } = business;

  return (
    <>
      <PageHero eyebrow={about.eyebrow} heading={about.heading} lead={about.lead} />

      <section className="section-y">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading heading={about.storyHeading} />
            <div className="mt-6 max-w-[65ch] space-y-5">
              {about.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <Image
              src={about.image.src}
              alt={about.image.alt}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y border-y border-border bg-card">
        <div className="container-site">
          <Reveal>
            <SectionHeading heading={about.valuesHeading} />
          </Reveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <li key={value.title}>
                <Reveal index={index}>
                  <Icon name={value.icon} />
                  <h3 className="type-h3 mt-4">{value.title}</h3>
                  <p className="mt-2 text-muted-foreground">{value.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal>
            <SectionHeading heading={about.teamHeading} />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {about.team.map((member, index) => (
              <li key={member.role}>
                <Reveal
                  index={index}
                  className="h-full rounded-lg border border-border bg-card p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-16 items-center justify-center rounded-full border border-dashed border-foreground/40 font-heading text-xl font-semibold text-muted-foreground"
                  >
                    {member.initials}
                  </span>
                  <h3 className="type-h3 mt-5">{member.role}</h3>
                  <p className="mt-2 text-muted-foreground">{member.bio}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="type-small mt-6 text-muted-foreground">{about.teamNote}</p>
        </div>
      </section>

      <section className="section-y border-y border-border bg-card">
        <div className="container-site grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              heading={about.licenseHeading}
              text={about.licenseText}
            />
          </Reveal>
          <Reveal>
            <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {about.badges.map((badge) => (
                <li
                  key={badge.label}
                  className="rounded-lg border border-border bg-background p-5"
                >
                  <span className="type-eyebrow inline-block border border-foreground/40 px-2 py-1 text-muted-foreground">
                    {about.demoLabel}
                  </span>
                  <p className="mt-4 font-semibold">{badge.label}</p>
                  <p className="type-small mt-1 text-muted-foreground">
                    {badge.detail}
                  </p>
                </li>
              ))}
            </ul>
            <p className="type-small mt-6 text-muted-foreground">
              {about.badgesNote}
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
