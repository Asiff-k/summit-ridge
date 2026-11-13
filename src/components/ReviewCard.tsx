import { Stars } from "@/components/Stars";
import { business, type Review } from "@/config/business";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-4">
        <Stars rating={review.rating} />
        {review.sample ? (
          <span className="type-small text-muted-foreground">
            {business.reviewsSection.sampleLabel}
          </span>
        ) : null}
      </div>
      <blockquote className="mt-4 flex-1">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <span className="block font-semibold">{review.name}</span>
        <span className="type-small block text-muted-foreground">
          {review.location} · {review.service}
        </span>
      </figcaption>
    </figure>
  );
}
