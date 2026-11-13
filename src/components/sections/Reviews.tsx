import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { business, type Review } from "@/config/business";

export function ReviewGrid({ reviews }: { reviews: readonly Review[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {reviews.map((review, index) => (
        <li key={review.name}>
          <Reveal index={index % 2} className="h-full">
            <ReviewCard review={review} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function Reviews() {
  const { reviewsSection, reviews, cta } = business;

  return (
    <section className="section-y border-y border-border bg-card">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow={reviewsSection.eyebrow}
            heading={reviewsSection.heading}
          />
        </Reveal>

        <div className="mt-10 lg:mt-12">
          <ReviewGrid reviews={reviews.slice(0, 4)} />
        </div>

        <Link
          href="/reviews"
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
        >
          {cta.allReviews}
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
