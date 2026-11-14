"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

import type { AiCallCard } from "@/components/AiCallCard";
import type { BeforeAfter } from "@/components/BeforeAfter";
import type { BookingWidget } from "@/components/BookingWidget";
import type { RoofEstimator } from "@/components/RoofEstimator";
import type { RoofQuiz } from "@/components/RoofQuiz";
import type { ZipChecker } from "@/components/ZipChecker";

import { LazyMount, Skeleton } from "./LazyMount";

/**
 * Lazy versions of the interactive widgets. Each one's code is in its own
 * chunk that is fetched only when the widget is about to scroll into view,
 * so none of it runs during the first load. They are client-only (ssr: false);
 * the server sends a fixed-size skeleton in their place.
 *
 * The size classes below reserve each widget's height so the page does not
 * shift when it mounts. Keep them in step with the widget's real height.
 */

const loading = () => <Skeleton />;
const darkSkeleton = "rounded-[1.75rem] border-charcoal bg-charcoal";
const loadingDark = () => <Skeleton className={darkSkeleton} />;

const BookingWidgetImpl = dynamic(
  () => import("@/components/BookingWidget").then((module) => module.BookingWidget),
  { ssr: false, loading },
);
const RoofEstimatorImpl = dynamic(
  () => import("@/components/RoofEstimator").then((module) => module.RoofEstimator),
  { ssr: false, loading },
);
const RoofQuizImpl = dynamic(
  () => import("@/components/RoofQuiz").then((module) => module.RoofQuiz),
  { ssr: false, loading },
);
const ZipCheckerImpl = dynamic(
  () => import("@/components/ZipChecker").then((module) => module.ZipChecker),
  { ssr: false, loading },
);
const AiCallCardImpl = dynamic(
  () => import("@/components/AiCallCard").then((module) => module.AiCallCard),
  { ssr: false, loading: loadingDark },
);
const BeforeAfterImpl = dynamic(
  () => import("@/components/BeforeAfter").then((module) => module.BeforeAfter),
  { ssr: false, loading },
);

export function LazyBookingWidget(props: ComponentProps<typeof BookingWidget>) {
  return (
    // Tall enough for the day grid plus a full day of time slots, so the card
    // does not grow while availability loads.
    <LazyMount className="min-h-[35.5rem] sm:min-h-[27rem]">
      <BookingWidgetImpl {...props} />
    </LazyMount>
  );
}

export function LazyRoofEstimator(props: ComponentProps<typeof RoofEstimator>) {
  return (
    <LazyMount className="min-h-[42rem] sm:min-h-[36rem] lg:min-h-[38rem]">
      <RoofEstimatorImpl {...props} />
    </LazyMount>
  );
}

export function LazyRoofQuiz(props: ComponentProps<typeof RoofQuiz>) {
  return (
    <LazyMount className="min-h-[24rem]">
      <RoofQuizImpl {...props} />
    </LazyMount>
  );
}

export function LazyZipChecker(props: ComponentProps<typeof ZipChecker>) {
  return (
    <LazyMount className="min-h-[9.75rem]">
      <ZipCheckerImpl {...props} />
    </LazyMount>
  );
}

export function LazyAiCallCard(props: ComponentProps<typeof AiCallCard>) {
  return (
    <LazyMount
      className="mx-auto min-h-[31.75rem] w-full max-w-[22rem]"
      skeletonClassName={darkSkeleton}
    >
      <AiCallCardImpl {...props} />
    </LazyMount>
  );
}

export function LazyBeforeAfter(props: ComponentProps<typeof BeforeAfter>) {
  return (
    <LazyMount className="aspect-[4/3]">
      <BeforeAfterImpl {...props} />
    </LazyMount>
  );
}
