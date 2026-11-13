import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ReviewGrid } from "@/components/sections/Reviews";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: business.seo.pages.reviews.title,
  description: business.seo.pages.reviews.description,
};

export default function ReviewsPage() {
  const { reviewsSection, reviews } = business;

  return (
    <>
      <PageHero
        eyebrow={reviewsSection.eyebrow}
        heading={reviewsSection.heading}
        lead={reviewsSection.pageLead}
      />

      <section className="section-y">
        <div className="container-site">
          <ReviewGrid reviews={reviews} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
