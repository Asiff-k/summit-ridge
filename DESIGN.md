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
- Two amber buttons are persistent: "Free Inspection" in the desktop header and in the mobile call bar. Beyond those, use one amber CTA per section at most.
- Form errors use the `--destructive` red. It is a functional colour for errors only, never for decoration.

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
- Sections alternate off-white and white; use a charcoal band at most twice per page, not counting the footer (on the home page: the hero and the storm damage band).
- Breakpoints are Tailwind defaults. Build at 375px first.
- Single column on mobile. Grids are two or three columns at most.

## Shape and depth

- Radius: 6px for buttons and inputs, 8px for cards and images. Nothing fully rounded except avatars.
- Borders do most of the work: 1px `border`.
- One shadow, for cards on hover and the sticky header: `0 1px 2px rgb(31 42 55 / 0.06), 0 4px 12px rgb(31 42 55 / 0.06)`.

## Components

- **CTA button**: amber fill, charcoal text, 48px tall, 6px radius. Hover goes to `amber-hover`. One per section at most.
- **Secondary button**: charcoal 1px outline, charcoal text, transparent fill. On dark sections, off-white outline and text.
- **Utility bar**: thin white strip above the header with the AI receptionist link. It scrolls away.
- **Header**: sticky, off-white, logo left, nav centre, then phone number, a "Text us" link and one amber "Free Inspection" CTA that opens booking. Below `xl`: logo, tap-to-call icon, menu button; the menu panel repeats call, text and book.
- **Mobile call bar**: fixed to the bottom below `md`, three equal buttons: charcoal "Call", outlined "Text" and amber "Book".
- **Hero**: split layout over a real roof photo with a flat 80% charcoal overlay. Copy on the left, a white "Get your roof estimate" card on the right with the address as its only field. The diagonal hairline pattern is the fallback for dark bands with no photo.
- **Placeholders**: anything not wired up yet (chat widget slot, map embed, team photos) is a dashed 1px outline with a plain label. Demo badges carry a small outlined "Demo" tag.
- **Accordion**: smooth height open and close; the plus icon rotates into a cross (see Motion).
- **Storm alert strip**: thin charcoal strip above everything, shown only while `stormAlert.active` is true in `business.ts`.
- **Widget cards** (booking, estimate form, estimator, quiz, ZIP checker): white or off-white card, 1px border, 8px radius. Choices are 48px-tall outlined buttons that fill charcoal when selected. The amber button is the single final action of each widget.
- **Progress bar**: 8px charcoal bar on a hairline track. It changes instantly between steps.
- **Before/after slider**: 4:3 photo pair with a white divider and a 44px round handle. It is a native range input, so it works by drag, touch and arrow keys.
- **AI call card**: charcoal phone mock-up, labelled "Demo call". The phone frame is the one place a radius above 8px is allowed (28px), because it depicts a device.
- **Demo labels**: sample reviews, sample projects, the example financing figure, the demo alert, the demo call and demo bookings all carry a visible plain-text label. Never remove them on the demo site.
- **Cards**: white surface, 1px border, 8px radius, 24px padding.
- **Review card**: quote, name, neighbourhood, charcoal stars, and the "Sample review" label in small muted text, always visible.
- **Forms**: labels above fields, 48px inputs, white fill, 1px border, charcoal focus ring. Errors in plain words beside the field.
- **Focus**: 2px ring with 2px offset on every interactive element.

## Imagery

- Real photography of roofs, crews, trucks, and Dallas-area homes. Natural light, no heavy filters.
- Icons are simple line icons (Lucide), 1.5px stroke, charcoal.
- Every image has descriptive alt text and explicit dimensions.

## Motion

The base motion is a subtle fade-up when a section first scrolls into view.

| Property | Value |
|---|---|
| Opacity | 0 to 1 |
| Translate | 12px up to 0 |
| Duration | 400ms |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Stagger | 60ms between siblings, 4 items at most |
| Trigger | Once, when about 15% of the element is visible |

- The hero plays the same fade-up once on page load, in CSS only so it never waits on JavaScript. Other above-the-fold content (the header) renders immediately.
- The demo call transcript uses this same fade-up for each new line. It only runs while on screen and has a pause button.

Five more motions are allowed, and only these:

| Motion | Where | Spec |
|---|---|---|
| Count-up | Stats bar numbers | Count from zero to the final value once on scroll into view, 1200ms, ease-out. The server renders the final number. |
| Accordion height | FAQ | Height opens and closes over 200ms; the plus icon rotates 45 degrees into a cross. |
| Header shrink | Sticky header | After 24px of scroll the header loses 16px of height and gains the card shadow, 200ms. |
| Checkmark draw | Booking and estimate confirmation | The circle and tick stroke draw once, 400ms each. |
| Card lift | Service cards only | 4px up with the card shadow on hover, 150ms. |

- Everything else changes instantly: progress bars, step changes, sliders, tabs, the mobile menu.
- Hover and focus changes are otherwise colour and shadow only, 150ms.
- With `prefers-reduced-motion: reduce`, none of the above runs. Content appears in its final state, stats show their final numbers, and the demo call shows its whole transcript without looping. A global rule in `globals.css` enforces this.

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
- Don't add parallax, scroll-jacking, smooth-scroll animation, carousels that auto-advance, confetti, shine or shake effects, or any hover lift or scale beyond the 4px service card lift.
- Don't use SaaS patterns: pill badges above the hero, bento grids, floating dashboard mockups, logo marquees, pricing tiers, dark mode toggles.
- Don't use stock photos of models in hard hats shaking hands.
- Don't use pill-shaped buttons or radii above 8px.
- Don't set body copy in Barlow Condensed or below 16px.
- Don't write hype copy ("revolutionary", "next-level", "seamless").
- Don't add a fourth brand colour. If something needs emphasis, use weight, size, or space.
- Don't hardcode a hex value in a component.
