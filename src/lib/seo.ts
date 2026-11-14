import type { Metadata } from "next";

import { business } from "@/config/business";

const { seo } = business;

/** Indexable routes that are not generated from business content. */
const staticPaths = [
  "/",
  "/services",
  "/storm-damage",
  "/about",
  "/reviews",
  "/contact",
] as const;

export function servicePath(slug: string) {
  return `/services/${slug}`;
}

/** Every indexable route on the site, service pages included. */
export function sitePaths(): string[] {
  return [
    ...staticPaths,
    ...business.services.map((service) => servicePath(service.slug)),
  ];
}

export function absoluteUrl(path: string) {
  return new URL(path, seo.siteUrl).toString();
}

/** Open Graph fields shared by every page. */
export const baseOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName: business.name,
  images: [{ url: business.hero.image.src, alt: business.hero.image.alt }],
} satisfies Metadata["openGraph"];

/**
 * Per-page metadata with a canonical URL and a full Open Graph block.
 * Next merges metadata shallowly, so openGraph has to be complete here or the
 * layout's image and site name would be dropped. Relative paths resolve
 * against metadataBase (business.seo.siteUrl).
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title?: string;
  description: string;
}): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      url: path,
      title: title ? seo.titleTemplate.replace("%s", title) : seo.title,
      description,
    },
  };
}
