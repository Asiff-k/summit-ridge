/**
 * Single source of truth for all business content on the site.
 *
 * To re-skin this template for another client, replace the values in this
 * file (text, links, and image URLs). No component, page, or metadata export
 * may hardcode business text.
 *
 * Summit Ridge Roofing is a fictional demo company. The phone number, address,
 * stats, licence details, projects, and reviews below are invented
 * placeholders. Photos are stock images from Unsplash.
 */

export type IconName =
  | "repair"
  | "replacement"
  | "storm"
  | "inspection"
  | "gutters"
  | "commercial"
  | "local"
  | "warranty"
  | "clean"
  | "honest"
  | "family"
  | "safety"
  | "leak";

export type ImageAsset = {
  src: string;
  alt: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Step = {
  title: string;
  text: string;
};

export type Service = {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  description: string;
  image: ImageAsset;
  includes: string[];
  /** Use the insurance claim steps instead of the standard process. */
  useClaimProcess?: boolean;
  faqs: Faq[];
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

/** Swap these per client. Any host used here must be allowed in next.config.ts. */
const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

const images = {
  crewOnRoof: {
    src: photo("1635424709845-3a85ad5e1f5e", 2000),
    alt: "Two roofers in safety harnesses working on a shingle roof",
  },
  crewCloseUp: {
    src: photo("1635424709961-f3a150459ad4"),
    alt: "Roofers in safety harnesses fastening shingles",
  },
  crewPair: {
    src: photo("1635424709870-cdc6e64f0e20"),
    alt: "Two roofers working side by side on a roof",
  },
  repair: {
    src: photo("1635424824849-1b09bdcc55b1"),
    alt: "A roofer nailing shingles on a house roof",
  },
  stormRoof: {
    src: photo("1632759145351-1d592919f522"),
    alt: "A roofer inspecting damaged shingles on a brick home",
  },
  tearOff: {
    src: photo("1633759593085-1eaeb724fc88"),
    alt: "A roofer removing damaged shingles from a roof",
  },
  shingleHome: {
    src: photo("1780080019323-20a5fb128906"),
    alt: "A grey two-storey home with a dark shingle roof and brick chimney",
  },
  shingleRooflines: {
    src: photo("1710139323182-69622cad5c3b"),
    alt: "Rooflines of neighbouring homes with new architectural shingles",
  },
  metalRoof: {
    src: photo("1779941373840-a93f6e0d5db0"),
    alt: "A standing seam metal roof with a dormer window",
  },
  modernHome: {
    src: photo("1762810981576-1b07f76af9d2"),
    alt: "A single-storey home with a low-slope roof and paved driveway",
  },
  whiteHome: {
    src: photo("1787094497609-5efe6029b950"),
    alt: "A white two-storey home with a metal roof and front porch",
  },
  greyHome: {
    src: photo("1586982599726-11708daaceca"),
    alt: "A grey and white home with a metal roof and two brick chimneys",
  },
  roofInProgress: {
    src: photo("1763665814485-a0a1b6f51ed7"),
    alt: "Roofers laying new roofing over bare decking",
  },
} satisfies Record<string, ImageAsset>;

export const business = {
  name: "Summit Ridge Roofing",
  shortName: "Summit Ridge",
  logo: { primary: "Summit Ridge", secondary: "Roofing" },
  legalName: "Summit Ridge Roofing LLC",
  tagline: "Dallas roofing done right, by people who live here.",
  description:
    "Summit Ridge Roofing repairs and replaces roofs for homeowners across Dallas and the surrounding suburbs. Free inspections, clear written estimates, and crews who clean up after themselves.",
  foundedYear: 2008,

  contact: {
    phoneDisplay: "(214) 555-0142",
    phoneHref: "tel:+12145550142",
    phoneE164: "+12145550142",
    email: "hello@summitridgeroofing.example",
    emailHref: "mailto:hello@summitridgeroofing.example",
    smsHref: "sms:+12145550142",
  },

  address: {
    street: "4120 Ridgeline Ave, Suite 200",
    city: "Dallas",
    state: "TX",
    zip: "75204",
    country: "US",
  },

  hoursHeading: "Hours",
  hours: [
    { days: "Monday to Friday", hours: "7:00 am to 6:00 pm" },
    { days: "Saturday", hours: "8:00 am to 2:00 pm" },
    { days: "Sunday", hours: "Closed" },
  ] satisfies DayHours[],
  /** Machine-readable hours for structured data. */
  hoursSchema: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    { days: ["Saturday"], opens: "08:00", closes: "14:00" },
  ],
  emergencyNote: "Storm damage? Call any time and we will get a tarp on it.",

  nav: [
    { label: "Services", href: "/services" },
    { label: "Storm Damage", href: "/storm-damage" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ],

  cta: {
    primary: "Get a free estimate",
    inspection: "Free Inspection",
    call: "Call now",
    callShort: "Call",
    text: "Text us",
    textShort: "Text",
    book: "Book",
    bookThis: "Book this",
    bookInspection: "Book a free inspection",
    learnMore: "Learn more",
    allServices: "See all services",
    allReviews: "Read all reviews",
    href: "/contact",
  },

  /** Placeholders for the voice agent and chat widget. Not wired up yet. */
  ai: {
    receptionistLabel: "Talk to our 24/7 AI receptionist",
    chatLabel: "Chat with us",
    chatPlaceholderNote: "Chat widget placeholder",
  },

  utilityBar: {
    note: "Free roof inspections across the Dallas area",
  },

  hero: {
    eyebrow: "Roofing contractor in Dallas, TX",
    heading: "A roof you can stop worrying about",
    subheading:
      "Repairs, replacements, and storm damage work for Dallas homes. We inspect for free and tell you plainly what your roof needs.",
    image: images.crewOnRoof,
    rating: {
      value: 5,
      text: "4.9 from 300+ sample reviews",
    },
    trust: ["Licensed & Insured", "Since 2008"],
    estimateCard: {
      heading: "Get your roof estimate",
      text: "Start with your address. It takes about a minute.",
      addressLabel: "Property address",
      addressPlaceholder: "Street address and ZIP",
      submit: "Start my estimate",
      note: "No obligation. We never share your details.",
    },
  },

  /** `value` counts up from zero on scroll; `suffix` is appended as written. */
  stats: [
    { value: 18, suffix: "+", label: "Years in business" },
    { value: 2400, suffix: "+", label: "Roofs completed" },
    { value: 10, suffix: "", label: "Year workmanship warranty" },
    { value: 24, suffix: " hr", label: "Storm response time" },
  ],

  servicesSection: {
    eyebrow: "What we do",
    heading: "Roofing services",
    text: "From a single missing shingle to a full replacement, the same crew and the same standards.",
  },

  services: [
    {
      slug: "roof-repair",
      name: "Roof Repair",
      icon: "repair",
      summary: "Leaks, missing shingles, and flashing problems fixed properly.",
      description:
        "We find where the water is actually getting in, fix that, and show you photos of the work. If a repair will do, we will not sell you a new roof.",
      image: images.repair,
      includes: [
        "Leak tracing from the attic and the roof surface",
        "Shingle, flashing, and pipe boot replacement",
        "Matching shingles as closely as the roof's age allows",
        "Before and after photos of every repair",
        "A written repair warranty",
      ],
      faqs: [
        {
          question: "Can you repair my roof, or do I need a new one?",
          answer:
            "Most leaks can be repaired. We recommend replacement only when the shingles are at the end of their life or the damage is spread across the whole roof, and we will show you photos so you can see why.",
        },
        {
          question: "How quickly can you fix a leak?",
          answer:
            "We can usually inspect within a day or two. If water is coming in now, call us and we will tarp the area first, then schedule the permanent repair.",
        },
        {
          question: "How much does a roof repair cost?",
          answer:
            "It depends on the cause and how easy it is to reach. You will get a written price after the inspection, before any work starts.",
        },
      ],
    },
    {
      slug: "roof-replacement",
      name: "Roof Replacement",
      icon: "replacement",
      summary: "A full tear-off and new roof, usually finished in one or two days.",
      description:
        "When repairs no longer make sense, we remove the old roof down to the deck, fix any damaged wood, and install a new system built for Texas heat and hail.",
      image: images.crewPair,
      includes: [
        "Full tear-off down to the roof deck",
        "Replacement of any rotted or damaged decking",
        "New underlayment, flashing, vents, and drip edge",
        "Architectural or impact-rated shingles in your choice of colour",
        "Magnetic nail sweep and full site clean-up",
        "A written workmanship warranty",
      ],
      faqs: [
        {
          question: "How long does a roof replacement take?",
          answer:
            "Most homes take one to two days once materials are delivered. Larger or steeper roofs can take three. Rain will push the schedule, and we will keep you updated.",
        },
        {
          question: "Do I need to move out while you work?",
          answer:
            "No. It is noisy, but you can stay home. We ask that you move cars out of the driveway and take anything fragile off the walls.",
        },
        {
          question: "What shingles do you recommend for Dallas?",
          answer:
            "For most homes we suggest an impact-rated architectural shingle. It stands up better to hail, and some insurers offer a discount for it. Ask your agent.",
        },
      ],
    },
    {
      slug: "storm-damage",
      name: "Storm & Hail Damage",
      icon: "storm",
      summary: "Fast inspections and help through your insurance claim.",
      description:
        "After a storm we document the damage, tarp anything that is open, and meet your insurance adjuster on the roof so nothing gets missed.",
      image: images.stormRoof,
      useClaimProcess: true,
      includes: [
        "Free storm damage inspection",
        "Emergency tarping when the roof is open",
        "A photo report you can send to your insurer",
        "Meeting your adjuster on the roof",
        "Repair or replacement to the approved scope",
      ],
      faqs: [
        {
          question: "How do I know if hail damaged my roof?",
          answer:
            "From the ground you might see dented gutters, vents, or window screens, or granules collecting at the downspouts. Damage to the shingles themselves usually needs someone on the roof to confirm.",
        },
        {
          question: "Should I call my insurance company or a roofer first?",
          answer:
            "Either works. Many homeowners have us inspect first so they know whether there is enough damage to file a claim.",
        },
        {
          question: "Can you cover my deductible?",
          answer:
            "No. Texas law requires homeowners to pay their own deductible, and a contractor who offers to waive it is breaking that law.",
        },
      ],
    },
    {
      slug: "roof-inspection",
      name: "Roof Inspections",
      icon: "inspection",
      summary: "A free, honest look at the condition of your roof.",
      description:
        "Buying a home, selling one, or just unsure after a storm? We inspect the roof and attic and give you a written report with photos.",
      image: images.modernHome,
      includes: [
        "Shingles, flashing, vents, and sealant checked up close",
        "Attic check for leaks, ventilation, and decking",
        "Gutters and downspouts checked for damage",
        "A written report with photos",
        "A plain answer: fine, repair, or replace",
      ],
      faqs: [
        {
          question: "Is the inspection really free?",
          answer:
            "Yes. There is no charge and no obligation. If the roof is fine, we will tell you so.",
        },
        {
          question: "How long does an inspection take?",
          answer: "About 30 to 45 minutes for most homes.",
        },
        {
          question: "How often should a roof be inspected?",
          answer:
            "Once a year is sensible in North Texas, and again after any storm with hail or high winds.",
        },
      ],
    },
    {
      slug: "gutters",
      name: "Gutters",
      icon: "gutters",
      summary: "Seamless gutters that move water away from your home.",
      description:
        "We install and repair seamless aluminum gutters and downspouts, sized for heavy North Texas rain.",
      image: images.whiteHome,
      includes: [
        "Seamless aluminum gutters formed on site",
        "Downspouts placed to protect the foundation",
        "Gutter guards on request",
        "Repair and re-hanging of sagging sections",
        "Removal and disposal of the old gutters",
      ],
      faqs: [
        {
          question: "Can you replace gutters at the same time as the roof?",
          answer:
            "Yes, and it is the easiest time to do it. We hang the new gutters once the roof is finished.",
        },
        {
          question: "What size gutters do I need?",
          answer:
            "Most homes do well with five-inch gutters. Large or steep roofs may need six-inch. We measure and recommend a size during the estimate.",
        },
        {
          question: "Do gutter guards work?",
          answer:
            "They cut down on cleaning, especially under trees, but no guard removes it entirely. We will tell you whether they are worth it for your home.",
        },
      ],
    },
    {
      slug: "commercial-roofing",
      name: "Commercial Roofing",
      icon: "commercial",
      summary: "Repairs and replacements for low-slope and metal roofs.",
      description:
        "We work on offices, retail buildings, and small warehouses across the Dallas area, scheduling around your business hours wherever we can.",
      image: images.metalRoof,
      includes: [
        "Low-slope membrane and metal roof repair",
        "Full replacement and re-cover options",
        "Leak tracing and moisture checks",
        "Scheduled maintenance visits",
        "Written reports for owners and property managers",
      ],
      faqs: [
        {
          question: "Can you work around our opening hours?",
          answer:
            "Usually, yes. We plan noisy work and deliveries around your schedule and keep entrances clear.",
        },
        {
          question: "What kinds of commercial roofs do you work on?",
          answer:
            "Low-slope membrane roofs, modified bitumen, and standing seam metal on small and mid-sized buildings.",
        },
        {
          question: "Do you offer maintenance plans?",
          answer:
            "Yes. A twice-yearly visit catches small problems before they turn into leaks.",
        },
      ],
    },
  ] satisfies Service[],

  processSection: {
    eyebrow: "How it works",
    heading: "What to expect",
  },
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
  ] satisfies Step[],

  stormDamage: {
    eyebrow: "Storm damage",
    heading: "Hail hit your roof?",
    text: "We will check it for free and help you through the insurance claim, one step at a time.",
    cta: "Book a storm inspection",
    image: images.stormRoof,
    steps: [
      {
        title: "Free inspection",
        text: "We get on the roof and check shingles, vents, flashing, and gutters for storm damage.",
      },
      {
        title: "Photo report",
        text: "You get a written report with photos that you can send straight to your insurer.",
      },
      {
        title: "We meet your adjuster",
        text: "We walk the roof with the adjuster and point out what we documented.",
      },
      {
        title: "Repair or replace",
        text: "Once the scope is approved, we do the work and walk the finished job with you.",
      },
    ] satisfies Step[],
    page: {
      heading: "Storm and hail damage, handled step by step",
      lead: "North Texas hail can ruin a roof in ten minutes. Here is how we help you get from a damaged roof to a finished repair, including the insurance claim.",
      claimHeading: "The insurance claim process",
      claimText:
        "You file the claim and make the decisions. We handle the roof side: the inspection, the documentation, and the work.",
      signsHeading: "Signs your roof took a hit",
      signs: [
        "Dents in gutters, downspouts, or roof vents",
        "Granules collecting in gutters or at the downspouts",
        "Shingles missing, lifted, or creased after high wind",
        "Dark spots or bruises on shingles",
        "Torn window screens or dented garage doors",
        "New water stains on ceilings or in the attic",
      ],
      firstStepsHeading: "What to do right after a storm",
      firstSteps: [
        {
          title: "Stay off the roof",
          text: "Wet, damaged shingles are slippery. Look from the ground and leave the climbing to us.",
        },
        {
          title: "Take photos",
          text: "Photograph hail on the ground, dented metal, and any water inside the house.",
        },
        {
          title: "Stop the water",
          text: "Put buckets under leaks and move belongings. Call us if the roof is open and we will tarp it.",
        },
        {
          title: "Get an inspection before you file",
          text: "A free inspection tells you whether there is enough damage to make a claim worthwhile.",
        },
      ] satisfies Step[],
      disclaimer:
        "We are roofers, not public adjusters. We document damage and discuss the scope of repairs, but we cannot negotiate your claim or interpret your policy.",
      faqHeading: "Storm damage questions",
      faqs: [
        {
          question: "How long do I have to file a hail claim?",
          answer:
            "It depends on your policy. Many set a deadline of one to two years from the storm date, and some are shorter. Check your policy or ask your agent, and do not wait if you suspect damage.",
        },
        {
          question: "Will filing a claim raise my premium?",
          answer:
            "That is a question for your insurer or agent. Rules differ between companies, and we would rather you hear it from them than guess.",
        },
        {
          question: "Can you cover my deductible?",
          answer:
            "No. Texas law requires homeowners to pay their own deductible, and a contractor who offers to waive it is breaking that law.",
        },
        {
          question: "What if the adjuster says there is no damage?",
          answer:
            "You can ask your insurer for a second inspection. We will give you our photo report so you have clear documentation to share.",
        },
        {
          question: "Do you tarp roofs in an emergency?",
          answer:
            "Yes. If the roof is open, call us at any hour and we will get it covered to stop further damage.",
        },
      ] satisfies Faq[],
    },
  },

  whyUs: {
    eyebrow: "Why Summit Ridge",
    heading: "Why homeowners choose us",
    image: images.crewCloseUp,
    points: [
      {
        icon: "local",
        title: "A local Dallas crew",
        text: "Our crews live in the neighbourhoods we work in. No out-of-town storm chasers.",
      },
      {
        icon: "warranty",
        title: "A written warranty",
        text: "Every replacement comes with a 10-year workmanship warranty, in writing.",
      },
      {
        icon: "clean",
        title: "Clean job sites",
        text: "We protect your landscaping and sweep the yard for nails before we leave.",
      },
      {
        icon: "honest",
        title: "Honest, no-pressure quotes",
        text: "One clear price, in writing. If a repair will do, that is what we will recommend.",
      },
    ] satisfies { icon: IconName; title: string; text: string }[],
  },

  projects: {
    eyebrow: "Our work",
    heading: "Recent projects",
    text: "Drag the handle to compare before and after.",
    beforeLabel: "Before",
    afterLabel: "After",
    sampleLabel: "Sample project",
    sampleNote:
      "Sample projects for this demo site. The before and after photos are stock images and do not show the same house.",
    items: [
      {
        before: images.tearOff,
        after: images.shingleHome,
        neighborhood: "Lake Highlands",
        jobType: "Roof replacement",
      },
      {
        before: images.stormRoof,
        after: images.shingleRooflines,
        neighborhood: "Plano",
        jobType: "Hail damage replacement",
      },
      {
        before: images.roofInProgress,
        after: images.greyHome,
        neighborhood: "Richardson",
        jobType: "Metal roof installation",
      },
      {
        before: images.crewPair,
        after: images.metalRoof,
        neighborhood: "Irving",
        jobType: "Standing seam metal roof",
      },
      {
        before: images.repair,
        after: images.modernHome,
        neighborhood: "Garland",
        jobType: "Roof repair",
      },
      {
        before: images.crewCloseUp,
        after: images.whiteHome,
        neighborhood: "Frisco",
        jobType: "Roof replacement",
      },
    ],
  },

  reviewsSection: {
    eyebrow: "Reviews",
    heading: "What homeowners say",
    sampleLabel: "Sample review",
    pageLead:
      "These are sample reviews written for this demo site. Real customer reviews will replace them.",
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
      service: "Storm & Hail Damage",
      text: "After the hail storm they met the adjuster at our house and gave us a clear photo report. It took a lot of stress off us.",
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
    {
      name: "Priya S.",
      location: "Frisco",
      rating: 5,
      service: "Roof Inspections",
      text: "We asked for an inspection before buying a house. The report had photos of everything and saved us from a nasty surprise.",
      sample: true,
    },
    {
      name: "Robert L.",
      location: "Garland",
      rating: 5,
      service: "Roof Replacement",
      text: "The price on the estimate was the price on the invoice. The crew was polite and finished when they said they would.",
      sample: true,
    },
    {
      name: "Karen M.",
      location: "Irving",
      rating: 5,
      service: "Roof Repair",
      text: "They came out the day after I called, found the leak in ten minutes, and had it fixed that week.",
      sample: true,
    },
    {
      name: "Tom H.",
      location: "Mesquite",
      rating: 4,
      service: "Commercial Roofing",
      text: "They repaired the roof over our shop without us having to close. Communication was good from start to finish.",
      sample: true,
    },
  ] satisfies Review[],

  serviceAreasSection: {
    eyebrow: "Where we work",
    heading: "Service areas",
    text: "We work across Dallas and the surrounding suburbs. Not sure if we cover your street? Call and ask.",
  },
  serviceAreas: [
    "Dallas",
    "Plano",
    "Irving",
    "Garland",
    "Richardson",
    "Mesquite",
    "Frisco",
    "Arlington",
  ],

  faqSection: {
    eyebrow: "Questions",
    heading: "Common questions",
  },
  faqs: [
    {
      question: "How much does a new roof cost?",
      answer:
        "It depends on the size and pitch of the roof, the shingles you choose, and the condition of the wood underneath. We measure the roof and give you a written price, with no charge for the estimate.",
    },
    {
      question: "Do you help with insurance claims?",
      answer:
        "Yes. We inspect the roof, give you a photo report, and meet your adjuster on site. You file the claim and stay in charge of it; we handle the roof.",
    },
    {
      question: "How long does a roof replacement take?",
      answer:
        "Most homes take one to two days once the materials arrive. We will give you a start date and keep you updated if weather moves it.",
    },
    {
      question: "What warranty do you offer?",
      answer:
        "Replacements carry our 10-year workmanship warranty, in writing, on top of the shingle manufacturer's own warranty.",
    },
    {
      question: "Do you offer financing?",
      answer:
        "Yes. Monthly payment plans are available for qualifying homeowners. Ask when we give you the estimate and we will walk you through the options.",
    },
    {
      question: "Do I need to be home during the work?",
      answer:
        "No. We need access to the driveway and an outdoor power outlet. Many customers go to work as usual and come home to a finished roof.",
    },
  ] satisfies Faq[],

  finalCta: {
    eyebrow: "Book online",
    heading: "Ready when you are",
    text: "Free inspection, written report, no pressure.",
  },

  /** Owner-editable banner. Shown site-wide only while `active` is true. */
  stormAlert: {
    active: true,
    demoLabel: "Demo alert",
    message:
      "Hail reported in Plano and Frisco this week. Free storm checks, usually within 24 hours.",
    cta: "Book a storm check",
    service: "Storm & Hail Damage",
  },

  financing: {
    active: true,
    exampleLabel: "Example",
    lead: "Roof replacement from",
    amount: "$149",
    period: "/month",
    note: "Example payment only. Actual terms depend on the lender and your approval.",
    cta: "Ask about financing",
    service: "Roof Replacement",
  },

  /** Three-step estimate request. Contact details are asked for last. */
  estimateForm: {
    eyebrow: "Free estimate",
    heading: "Tell us about your roof",
    text: "Three quick steps. We will call you back with a time for a free inspection.",
    stepLabel: "Step {current} of {total}",
    steps: ["Address", "Problem", "Your details"],
    addressLabel: "Property address",
    addressPlaceholder: "Street address and ZIP",
    problemLegend: "What is going on with your roof?",
    problems: [
      { key: "leak", label: "Leak", icon: "leak", service: "Roof Repair" },
      { key: "storm", label: "Hail or storm", icon: "storm", service: "Storm & Hail Damage" },
      {
        key: "replacement",
        label: "Full replacement",
        icon: "replacement",
        service: "Roof Replacement",
      },
      { key: "inspection", label: "Inspection", icon: "inspection", service: "Roof Inspections" },
      { key: "gutters", label: "Gutters", icon: "gutters", service: "Gutters" },
      { key: "commercial", label: "Commercial", icon: "commercial", service: "Commercial Roofing" },
    ] satisfies { key: string; label: string; icon: IconName; service: string }[],
    photoLabel: "Photo of the damage",
    photoHint: "One image, up to 8 MB.",
    photoTooLarge: "That photo is over 8 MB. Please choose a smaller one.",
    next: "Next",
    back: "Back",
    submit: "Send my request",
    submitting: "Sending",
    successHeading: "Got it. We will be in touch",
    successMessage:
      "We will call you within one business day. Want to skip the wait? Pick a time now.",
    errorMessage:
      "Something went wrong and your request was not sent. Please try again or call us.",
  },

  /**
   * Slider estimator. No satellite lookup: roof area is estimated as
   * home size / stories x roofFactor, then priced per square foot.
   * Tune every number here per client.
   */
  estimator: {
    eyebrow: "Price guide",
    heading: "What might a new roof cost?",
    text: "Move the sliders for a rough idea. Every roof is different, so we confirm the price after a free inspection.",
    currency: "$",
    homeSize: {
      label: "Home size",
      unit: "sq ft",
      min: 1000,
      max: 5000,
      step: 100,
      default: 2200,
    },
    storiesLabel: "Stories",
    stories: [
      { label: "1", count: 1, priceMultiplier: 1 },
      { label: "2", count: 2, priceMultiplier: 1.1 },
      { label: "3", count: 3, priceMultiplier: 1.2 },
    ],
    /** Allows for roof pitch, overhangs, and waste. */
    roofFactor: 1.3,
    materialLabel: "Material",
    materials: [
      { key: "three-tab", label: "3-tab shingle", lowPerSqFt: 4.0, highPerSqFt: 5.5 },
      { key: "architectural", label: "Architectural shingle", lowPerSqFt: 4.75, highPerSqFt: 7.0 },
      { key: "metal", label: "Metal", lowPerSqFt: 9.0, highPerSqFt: 14.0 },
    ],
    defaultMaterial: "architectural",
    roundTo: 100,
    resultLabel: "Typical range, final quote after inspection",
    roofAreaLabel: "Estimated roof area",
    cta: "Book a free inspection",
    service: "Roof Replacement",
  },

  /**
   * Inline booking. Working hours and slot length drive the time slots.
   * `day` is 0 (Sunday) to 6 (Saturday). Availability is mocked for now.
   */
  booking: {
    eyebrow: "Book online",
    heading: "Book a free inspection",
    text: "Pick a day and a time. No phone call needed.",
    timeZone: "America/Chicago",
    slotMinutes: 60,
    daysAhead: 14,
    workingHours: [
      { day: 1, open: "08:00", close: "17:00" },
      { day: 2, open: "08:00", close: "17:00" },
      { day: 3, open: "08:00", close: "17:00" },
      { day: 4, open: "08:00", close: "17:00" },
      { day: 5, open: "08:00", close: "17:00" },
      { day: 6, open: "09:00", close: "13:00" },
    ],
    dayLegend: "1. Pick a day",
    slotLegend: "2. Pick a time",
    detailsLegend: "3. Your details",
    loadingDays: "Loading available days",
    loadingSlots: "Loading times",
    noSlots: "No times left on this day. Please pick another.",
    closedLabel: "Closed",
    serviceLabel: "What do you need?",
    defaultService: "Roof Inspections",
    addressLabel: "Property address",
    confirm: "Confirm booking",
    confirming: "Booking",
    confirmedHeading: "See you {day} at {time}",
    confirmedText:
      "Your free inspection is booked. We will call the number you gave us if anything changes.",
    demoNote: "Demo booking. Times are sample availability and nothing is sent.",
    bookAnother: "Book another time",
    loadError: "We could not load the calendar. Please try again or call us.",
    slotTakenError: "That time was just taken. Please pick another.",
    submitError:
      "Something went wrong and your booking was not saved. Please try again or call us.",
  },

  /** Animated demo transcript for the AI receptionist card. */
  aiCall: {
    eyebrow: "Never miss a call",
    heading: "Every call answered, day or night",
    text: "Our AI receptionist picks up when the office is closed, checks the calendar, and books the inspection.",
    demoLabel: "Demo call",
    callerName: "Homeowner",
    agentName: "AI receptionist",
    pause: "Pause demo call",
    play: "Play demo call",
    transcript: [
      { speaker: "agent", text: "Summit Ridge Roofing, how can I help?" },
      { speaker: "caller", text: "We had hail last night and I think the roof is damaged." },
      { speaker: "agent", text: "Sorry to hear that. Is any water coming inside right now?" },
      { speaker: "caller", text: "No leaks so far. There are dents on the gutters though." },
      {
        speaker: "agent",
        text: "I can get someone out for a free inspection. I have Thursday at 10am or Friday at 2pm.",
      },
      { speaker: "caller", text: "Thursday at 10 works." },
      { speaker: "agent", text: "Done. I will text you a confirmation now." },
    ] satisfies { speaker: "agent" | "caller"; text: string }[],
    outcome: "Inspection booked, Thursday 10am",
  },

  /** ZIP codes we serve. The checker answers from this list only. */
  coverage: {
    heading: "Check your ZIP code",
    label: "ZIP code",
    placeholder: "75204",
    submit: "Check",
    invalid: "Please enter a 5-digit ZIP code.",
    yes: "Yes, we cover {zip}",
    yesText: "We can usually inspect within a couple of days.",
    no: "We do not cover {zip} yet",
    noText: "Call us and we will point you to a roofer who does.",
    cta: "Book a free inspection",
    // prettier-ignore
    zips: [
      // Dallas
      "75201", "75202", "75203", "75204", "75205", "75206", "75207", "75208", "75209", "75210",
      "75211", "75212", "75214", "75215", "75216", "75217", "75218", "75219", "75220", "75223",
      "75224", "75225", "75226", "75227", "75228", "75229", "75230", "75231", "75232", "75233",
      "75234", "75235", "75238", "75240", "75243", "75244", "75248", "75252", "75254",
      // Plano
      "75023", "75024", "75025", "75074", "75075", "75093",
      // Irving
      "75038", "75039", "75060", "75061", "75062", "75063",
      // Garland
      "75040", "75041", "75042", "75043", "75044",
      // Richardson
      "75080", "75081", "75082",
      // Mesquite
      "75149", "75150", "75181",
      // Frisco
      "75033", "75034", "75035",
      // Arlington
      "76001", "76002", "76006", "76010", "76011", "76012", "76013", "76014", "76015", "76016",
      "76017", "76018",
    ],
  },

  /** Five questions. Higher points mean more risk. Results are matched on total points. */
  quiz: {
    eyebrow: "Not sure?",
    heading: "Roof health check",
    text: "Five quick questions. Get a score and a plain recommendation.",
    questionLabel: "Question {current} of {total}",
    back: "Back",
    restart: "Start again",
    scoreLabel: "Roof health score",
    scoreOutOf: "out of 100",
    disclaimer: "A rough guide only. It is not a substitute for an inspection.",
    cta: "Book a free inspection",
    questions: [
      {
        question: "How old is your roof?",
        options: [
          { label: "Under 5 years", points: 0 },
          { label: "5 to 12 years", points: 1 },
          { label: "13 to 20 years", points: 2 },
          { label: "Over 20 years, or not sure", points: 3 },
        ],
      },
      {
        question: "Can you see any damage from the ground?",
        options: [
          { label: "No, it looks fine", points: 0 },
          { label: "A few shingles look worn", points: 1 },
          { label: "Missing, curled, or lifted shingles", points: 3 },
        ],
      },
      {
        question: "Any leaks or water stains inside?",
        options: [
          { label: "None", points: 0 },
          { label: "An old stain that has not changed", points: 1 },
          { label: "A new stain or an active leak", points: 3 },
        ],
      },
      {
        question: "When was the roof last inspected?",
        options: [
          { label: "Within the last year", points: 0 },
          { label: "One to three years ago", points: 1 },
          { label: "Longer ago, or never", points: 2 },
        ],
      },
      {
        question: "Has hail or high wind hit your area recently?",
        options: [
          { label: "Not that I know of", points: 0 },
          { label: "Yes, a while back", points: 1 },
          { label: "Yes, in the last few months", points: 3 },
        ],
      },
    ],
    results: [
      {
        maxPoints: 3,
        title: "Looking good",
        text: "Nothing here suggests a problem. A yearly inspection will keep it that way.",
        service: "Roof Inspections",
      },
      {
        maxPoints: 8,
        title: "Worth a look",
        text: "There are a few signs worth checking before they turn into leaks. A free inspection will tell you for sure.",
        service: "Roof Inspections",
      },
      {
        maxPoints: 99,
        title: "Get it checked soon",
        text: "Your answers point to possible damage. Book a free inspection, and call us straight away if water is coming in.",
        service: "Roof Repair",
      },
    ],
  },

  about: {
    eyebrow: "About us",
    heading: "A Dallas roofing company, since 2008",
    lead: "We started with one truck and one crew. We are bigger now, and we still answer the phone ourselves.",
    image: images.crewPair,
    storyHeading: "Our story",
    story: [
      "Summit Ridge Roofing began in 2008, when our founder left a large roofing outfit to run jobs the way he thought they should be run: show up on time, tell the truth about what the roof needs, and leave the yard cleaner than we found it.",
      "North Texas weather has kept us busy ever since. We have worked through every major hail season since then, and many of our customers come from neighbours who watched us work next door.",
      "We are still locally owned. The person who inspects your roof is an employee, not a commissioned salesperson, and the crew on your roof works for us.",
    ],
    valuesHeading: "What we stand for",
    values: [
      {
        icon: "honest",
        title: "Tell the truth",
        text: "If your roof has years left in it, we will say so.",
      },
      {
        icon: "safety",
        title: "Work safely",
        text: "Harnesses on, every roof, every time.",
      },
      {
        icon: "clean",
        title: "Respect the property",
        text: "Tarps over the plants, magnets over the lawn.",
      },
      {
        icon: "family",
        title: "Stand behind the work",
        text: "If something we installed fails, we come back and fix it.",
      },
    ] satisfies { icon: IconName; title: string; text: string }[],
    teamHeading: "The team",
    teamNote: "Placeholder team cards. Names and photos will be added for a real client.",
    team: [
      { initials: "OW", role: "Owner", bio: "Runs the company and still walks roofs." },
      { initials: "PM", role: "Project Manager", bio: "Your point of contact from estimate to walkthrough." },
      { initials: "CF", role: "Crew Foreman", bio: "On site every day the crew is on your roof." },
    ],
    licenseHeading: "Licence and insurance",
    licenseText:
      "Texas does not issue a state roofing licence. We carry general liability insurance and can send a certificate on request.",
    demoLabel: "Demo",
    badges: [
      { label: "Licensed & Insured", detail: "Certificate available on request" },
      { label: "10-Year Workmanship Warranty", detail: "Written, on every replacement" },
      { label: "Locally Owned", detail: "Dallas, TX since 2008" },
    ],
    badgesNote:
      "The badges above are placeholders for this demo site and do not represent real certifications.",
  },

  servicesPage: {
    eyebrow: "Services",
    heading: "Roofing services in Dallas",
    lead: "Six services, one standard. Pick the one that fits and see what is included.",
  },
  servicePage: {
    includesHeading: "What's included",
    faqHeading: "Questions about this service",
  },

  contactPage: {
    eyebrow: "Contact",
    heading: "Get a free estimate",
    lead: "Tell us a little about your roof and we will call you back within one business day.",
    formHeading: "Request a free inspection",
    submitLabel: "Send request",
    submittingLabel: "Sending",
    successHeading: "Thanks, we have your request",
    successMessage: "We will call you within one business day to set up your inspection.",
    errorMessage: "Something went wrong and your request was not sent. Please try again or call us.",
    preferredTimes: ["Morning", "Afternoon", "Evening", "Any time"],
    detailsHeading: "Contact details",
    mapPlaceholder: "Map embed placeholder",
  },

  footer: {
    blurb: "Locally owned roofing contractor serving Dallas and the surrounding suburbs.",
    contactHeading: "Contact",
    servicesHeading: "Services",
    areasHeading: "Service areas",
    rights: "All rights reserved.",
    credit: { text: "Demo website by Incodet", href: "https://incodet.com" },
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
    pages: {
      services: {
        title: "Roofing Services in Dallas, TX",
        description:
          "Roof repair, replacement, storm damage, inspections, gutters, and commercial roofing across the Dallas area.",
      },
      stormDamage: {
        title: "Storm and Hail Damage Roof Repair in Dallas",
        description:
          "Free storm damage inspections, photo reports, and help through the insurance claim process for Dallas-area homeowners.",
      },
      about: {
        title: "About Us",
        description:
          "Summit Ridge Roofing is a locally owned Dallas roofing contractor, in business since 2008.",
      },
      reviews: {
        title: "Reviews",
        description: "Sample reviews for the Summit Ridge Roofing demo site.",
      },
      contact: {
        title: "Contact and Free Estimates",
        description:
          "Request a free roof inspection and written estimate from Summit Ridge Roofing in Dallas, TX.",
      },
    },
  },
} as const;

export type Business = typeof business;
