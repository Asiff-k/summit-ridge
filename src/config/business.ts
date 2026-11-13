/**
 * Single source of truth for all business content on the site.
 *
 * To re-skin this template for another client, replace the values in this
 * file. No component, page, or metadata export may hardcode business text.
 *
 * Summit Ridge Roofing is a fictional demo company. The phone number, address,
 * stats, and reviews below are invented placeholders.
 */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
};

export type Review = {
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service: string;
  text: string;
  /** When true, the UI must show `reviewsSection.sampleLabel` beside the review. */
  sample: boolean;
};

export type DayHours = {
  days: string;
  hours: string;
};

export const business = {
  name: "Summit Ridge Roofing",
  shortName: "Summit Ridge",
  legalName: "Summit Ridge Roofing LLC",
  tagline: "Dallas roofing done right, by people who live here.",
  description:
    "Summit Ridge Roofing repairs and replaces roofs for homeowners across Dallas and the surrounding suburbs. Free inspections, clear written estimates, and crews who clean up after themselves.",
  foundedYear: 2008,

  contact: {
    phoneDisplay: "(214) 555-0142",
    phoneHref: "tel:+12145550142",
    email: "hello@summitridgeroofing.example",
    emailHref: "mailto:hello@summitridgeroofing.example",
  },

  address: {
    street: "4120 Ridgeline Ave, Suite 200",
    city: "Dallas",
    state: "TX",
    zip: "75204",
    country: "US",
  },

  hours: [
    { days: "Monday to Friday", hours: "7:00 am to 6:00 pm" },
    { days: "Saturday", hours: "8:00 am to 2:00 pm" },
    { days: "Sunday", hours: "Closed" },
  ] satisfies DayHours[],
  emergencyNote: "Storm damage? Call any time and we will get a tarp on it.",

  serviceAreas: [
    "Dallas",
    "Plano",
    "Richardson",
    "Garland",
    "Irving",
    "Mesquite",
    "Carrollton",
    "Frisco",
  ],

  cta: {
    primary: "Get a free estimate",
    call: "Call now",
    secondary: "See our services",
    href: "/contact",
  },

  hero: {
    eyebrow: "Roofing contractor in Dallas, TX",
    heading: "A roof you can stop worrying about",
    subheading:
      "Repairs, replacements, and storm damage work for Dallas homes. We inspect for free and tell you plainly what your roof needs.",
  },

  stats: [
    { value: "2008", label: "Serving Dallas since" },
    { value: "2,400+", label: "Roofs completed" },
    { value: "10-year", label: "Workmanship warranty" },
  ],

  trustPoints: [
    {
      title: "Free roof inspections",
      text: "We get on the roof, take photos, and walk you through what we found.",
    },
    {
      title: "Written estimates",
      text: "One clear price before any work starts, with no surprises on the invoice.",
    },
    {
      title: "Insured crews",
      text: "Every crew is fully insured and led by a foreman who stays on site.",
    },
    {
      title: "Clean job sites",
      text: "We protect your landscaping and sweep the yard for nails before we leave.",
    },
  ],

  services: [
    {
      slug: "roof-replacement",
      name: "Roof Replacement",
      summary: "A full tear-off and new roof, usually finished in one or two days.",
      description:
        "When repairs no longer make sense, we remove the old roof down to the deck, fix any damaged wood, and install a new system built for Texas heat and hail.",
    },
    {
      slug: "roof-repair",
      name: "Roof Repair",
      summary: "Leaks, missing shingles, and flashing problems fixed properly.",
      description:
        "We find where the water is actually getting in, fix that, and show you photos of the work. If a repair will do, we will not sell you a new roof.",
    },
    {
      slug: "storm-damage",
      name: "Storm and Hail Damage",
      summary: "Fast inspections and help with your insurance claim.",
      description:
        "After a storm we document the damage, tarp anything that is open, and meet your insurance adjuster on the roof so nothing gets missed.",
    },
    {
      slug: "roof-inspection",
      name: "Roof Inspections",
      summary: "A free, honest look at the condition of your roof.",
      description:
        "Buying a home, selling one, or just unsure after a storm? We inspect the roof and attic and give you a written report with photos.",
    },
    {
      slug: "gutters",
      name: "Gutters",
      summary: "Seamless gutters that move water away from your home.",
      description:
        "We install and repair seamless aluminum gutters and downspouts, sized for heavy North Texas rain.",
    },
  ] satisfies Service[],

  process: [
    {
      title: "Call or send a request",
      text: "Tell us what is going on. We will set an inspection time that suits you.",
    },
    {
      title: "Free inspection",
      text: "We check the roof and attic, take photos, and explain what we found.",
    },
    {
      title: "Written estimate",
      text: "You get a clear price and timeline. Take the time you need to decide.",
    },
    {
      title: "The work, then a walkthrough",
      text: "We do the job, clean up, and walk the property with you before we call it done.",
    },
  ],

  reviewsSection: {
    heading: "What homeowners say",
    sampleLabel: "Sample review",
  },

  reviews: [
    {
      name: "Maria G.",
      location: "Lake Highlands",
      rating: 5,
      service: "Roof Replacement",
      text: "They replaced our whole roof in a day and a half. The foreman checked in with us each morning and the yard was spotless when they left.",
      sample: true,
    },
    {
      name: "David R.",
      location: "Plano",
      rating: 5,
      service: "Storm and Hail Damage",
      text: "After the hail storm they met the adjuster at our house and handled the paperwork. It took a lot of stress off us.",
      sample: true,
    },
    {
      name: "Angela T.",
      location: "Oak Cliff",
      rating: 5,
      service: "Roof Repair",
      text: "I was expecting to be told I needed a new roof. They fixed the flashing around the chimney instead and the leak is gone.",
      sample: true,
    },
    {
      name: "James W.",
      location: "Richardson",
      rating: 4,
      service: "Gutters",
      text: "Good work on the gutters at a fair price. Scheduling took a few extra days because of rain, but they kept us updated.",
      sample: true,
    },
  ] satisfies Review[],

  contactSection: {
    heading: "Get a free estimate",
    text: "Tell us a little about your roof and we will call you back within one business day.",
    successMessage: "Thanks. We have your request and will call you within one business day.",
  },

  footer: {
    blurb: "Locally owned roofing contractor serving Dallas and the surrounding suburbs.",
  },

  social: {
    facebook: "",
    instagram: "",
    google: "",
  },

  seo: {
    siteUrl: "https://summitridgeroofing.example",
    title: "Summit Ridge Roofing | Roof Repair and Replacement in Dallas, TX",
    titleTemplate: "%s | Summit Ridge Roofing",
    description:
      "Roof repair, roof replacement, and storm damage work in Dallas, TX. Free inspections and written estimates from a locally owned roofing contractor.",
  },
} as const;

export type Business = typeof business;
