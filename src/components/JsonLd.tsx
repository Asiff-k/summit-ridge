import { business } from "@/config/business";

/**
 * LocalBusiness structured data. Deliberately has no Review or AggregateRating:
 * the reviews on this site are samples (see CLAUDE.md rule 6).
 */
export function JsonLd() {
  const { contact, address, seo } = business;

  const data = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${seo.siteUrl}/#business`,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: seo.siteUrl,
    telephone: contact.phoneE164,
    email: contact.email,
    foundingDate: String(business.foundedYear),
    image: business.hero.image.src,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: address.country,
    },
    areaServed: business.serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHoursSpecification: business.hoursSchema.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
