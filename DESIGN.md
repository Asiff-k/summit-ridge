# Design system — Summit Ridge Roofing

Source of truth for every visual decision. `src/app/globals.css` implements these tokens; components consume them through Tailwind utilities. To re-skin the template for another client, change the values here and in `globals.css`, and nothing else.

## Feel

A calm, trustworthy local contractor. The site should read like a well-run family business that has been on the same streets for years: plain, solid, easy to phone. It should not read like a software product.

The homeowner arriving here probably has a leak or hail damage and is a little stressed. The design's job is to lower that stress: clear headings, real photos of roofs and crews, a phone number that is always within reach, and nothing that moves or shouts.

## Colour

Three brand colours, used in fixed roles.

| Token | Hex | Role |
|---|---|---|
| `charcoal` | `#1F2A37` | Headings, body text, header and footer bands, dark sections |
| `amber` | `#F59E0B` | Call-to-action buttons and links only |
| `off-white` | `#F7F5F2` | Page background and light sections |

Supporting neutrals, derived from the three above:

| Token | Hex | Role |
|---|---|---|
| `surface` | `#FFFFFF` | Cards and form fields sitting on off-white |
| `muted` | `#5B6673` | Secondary text, captions, the "Sample review" label |
| `border` | `#E4E0DA` | Hairlines, card and input borders |
| `amber-hover` | `#D97706` | Hover and pressed state of a CTA |
| `on-dark` | `#F7F5F2` | Text on charcoal |
| `on-dark-muted` | `#B8C0CA` | Secondary text on charcoal |

Semantic mapping for `globals.css`:

| Semantic token | Value |
|---|---|
| `--background` | `off-white` |
| `--foreground` | `charcoal` |
| `--card` | `surface` |
| `--muted-foreground` | `muted` |
| `--border`, `--input` | `border` |
| `--primary` | `charcoal` |
| `--primary-foreground` | `on-dark` |
| `--cta` | `amber` |
| `--cta-hover` | `amber-hover` |
| `--cta-foreground` | `charcoal` |
| `--ring` | `charcoal` on light, `amber` on dark |

### Amber is for CTAs only

Amber appears on the things a visitor can press to contact the business: "Get a free estimate", "Call now", the form submit button. It appears nowhere else. That scarcity is what makes the button findable in half a second.

- Text on amber is always charcoal (about 7:1 contrast). White on amber fails contrast and is not allowed.
- Star ratings, icons, badges, underlines, and section accents are charcoal or muted, not amber.
- Aim for one amber element per viewport. The sticky mobile call bar counts as that one.

## Typography

| Role | Family | Weights |
|---|---|---|
| Headings | Barlow Condensed | 600, 700 |
| Body and UI | Inter | 400, 500, 600 |

Load both with `next/font/google` and expose them as `--font-heading` and `--font-sans`.

Scale (mobile, then `lg` and up):

| Style | Font | Mobile | Desktop | Line height | Notes |
|---|---|---|---|---|---|
| Display (hero h1) | Barlow Condensed 700 | 40px | 64px | 1.05 | Uppercase, tracking 0.01em |
| H2 | Barlow Condensed 700 | 30px | 44px | 1.1 | Uppercase, tracking 0.01em |
| H3 | Barlow Condensed 600 | 22px | 26px | 1.2 | Sentence case |
| Eyebrow | Inter 600 | 13px | 13px | 1.4 | Uppercase, tracking 0.08em, muted |
| Lead | Inter 400 | 18px | 20px | 1.6 | |
| Body | Inter 400 | 16px | 17px | 1.65 | Never below 16px |
| Small | Inter 400 | 14px | 14px | 1.5 | Captions, labels |
| Button | Inter 600 | 16px | 16px | 1 | Sentence case |

- Body text measure is 60 to 70 characters.
- Barlow Condensed is for headings only. Never set paragraphs, buttons, or form fields in it.
- Phone numbers use tabular figures.

## Layout and spacing

- 4px base unit. Use the Tailwind spacing scale; prefer 4, 6, 8, 12, 16, 24.
- Container: max width 1200px, side padding 20px mobile, 32px from `md`.
- Section vertical padding: 64px mobile, 96px from `lg`.
- Sections alternate off-white and white; use a charcoal band at most twice per page (for example the trust strip and the final CTA).
- Breakpoints are Tailwind defaults. Build at 375px first.
- Single column on mobile. Grids are two or three columns at most.

## Shape and depth

- Radius: 6px for buttons and inputs, 8px for cards and images. Nothing fully rounded except avatars.
- Borders do most of the work: 1px `border`.
- One shadow, for cards on hover and the sticky header: `0 1px 2px rgb(31 42 55 / 0.06), 0 4px 12px rgb(31 42 55 / 0.06)`.

## Components

- **CTA button**: amber fill, charcoal text, 48px tall, 6px radius. Hover goes to `amber-hover`. One per section at most.
- **Secondary button**: charcoal 1px outline, charcoal text, transparent fill. On dark sections, off-white outline and text.
- **Header**: off-white, logo left, phone number and one CTA right. On mobile: logo, tap-to-call, menu.
- **Mobile call bar**: fixed to the bottom on small screens, amber "Call now" with the phone number.
- **Cards**: white surface, 1px border, 8px radius, 24px padding.
- **Review card**: quote, name, neighbourhood, charcoal stars, and the "Sample review" label in small muted text, always visible.
- **Forms**: labels above fields, 48px inputs, white fill, 1px border, charcoal focus ring. Errors in plain words beside the field.
- **Focus**: 2px ring with 2px offset on every interactive element.

## Imagery

- Real photography of roofs, crews, trucks, and Dallas-area homes. Natural light, no heavy filters.
- Icons are simple line icons (Lucide), 1.5px stroke, charcoal.
- Every image has descriptive alt text and explicit dimensions.

## Motion

One motion only: a subtle fade-up when a section first scrolls into view.

| Property | Value |
|---|---|
| Opacity | 0 to 1 |
| Translate | 12px up to 0 |
| Duration | 400ms |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Stagger | 60ms between siblings, 4 items at most |
| Trigger | Once, when about 15% of the element is visible |

- The hero plays the same fade-up once on page load, in CSS only so it never waits on JavaScript. Other above-the-fold content (the header) renders immediately.
- With `prefers-reduced-motion: reduce`, content appears with no transform and no fade.
- Hover and focus changes are colour and shadow only, 150ms.

## Do

- Put the phone number in the header, the hero, the footer, and the mobile call bar.
- Use plain words a homeowner would use: "roof repair", "free estimate", "hail damage".
- Keep amber for CTAs and give each viewport one clear action.
- Let sections breathe; off-white space is part of the calm.
- Use solid colour blocks, 1px borders, and real photos.
- Use charcoal text on amber, and check contrast for every new pairing (4.5:1 minimum for text).
- Keep headings short enough to fit two lines on a phone.
- Show trust signals plainly: years in business, service area, warranty, insurance.
- Design the 375px layout first.

## Don't

- Don't use gradients, glassmorphism, glows, or blurred colour blobs.
- Don't use amber for decoration: no amber icons, stars, headings, borders, or backgrounds.
- Don't put white text on amber.
- Don't add parallax, scroll-jacking, carousels that auto-advance, counters that tick up, or hover lift-and-scale effects.
- Don't use SaaS patterns: pill badges above the hero, bento grids, floating dashboard mockups, logo marquees, pricing tiers, dark mode toggles.
- Don't use stock photos of models in hard hats shaking hands.
- Don't use pill-shaped buttons or radii above 8px.
- Don't set body copy in Barlow Condensed or below 16px.
- Don't write hype copy ("revolutionary", "next-level", "seamless").
- Don't add a fourth brand colour. If something needs emphasis, use weight, size, or space.
- Don't hardcode a hex value in a component.
