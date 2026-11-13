@AGENTS.md

# Summit Ridge Roofing — Incodet contractor template

A demo marketing site for a fictional roofing company (Summit Ridge Roofing, Dallas TX). It is also Incodet's re-skinnable template for local contractors: a new client site should need only a new `src/config/business.ts`, new token values in `DESIGN.md` / `src/app/globals.css`, and new images. Every rule below exists to keep that true.

Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, TypeScript.

## Rules

### 1. Business text comes from `src/config/business.ts` only

- Company name, phone, email, address, hours, service areas, services, reviews, stats, taglines, CTA labels, and SEO metadata are all read from `business`.
- Never hardcode any of these in a component, page, `metadata` export, or JSON-LD. If a page needs copy that does not exist yet, add a field to `business.ts` first, then read it.
- Generic UI labels that would be the same for any client ("Menu", "Close", "Send", form field labels) may live in components.
- Check before finishing a step: searching `src/app` and `src/components` for "Summit", "Dallas", or the phone number returns nothing.

### 2. Visual tokens come from `DESIGN.md` only

- `DESIGN.md` is the source of truth for colour, type, spacing, radius, shadow, and motion. `src/app/globals.css` implements those tokens as CSS variables in the Tailwind theme.
- Components use the token utilities (`bg-background`, `text-foreground`, `bg-cta`, `font-heading`, ...). No raw hex values, no arbitrary colour values like `bg-[#1F2A37]`, no stock Tailwind palette colours like `bg-amber-500` or `text-gray-600`.
- To change a visual value, change it in `DESIGN.md` and `globals.css` together, in the same commit.
- Read the Do / Don't lists in `DESIGN.md` before building any UI.

### 3. Secrets live in `.env.local` only

- API keys, form endpoints, and tokens go in `.env.local`, which is gitignored. Never put one in source, in `business.ts`, or in a commit.
- Keep `.env.example` up to date with variable names and empty values.
- Only prefix a variable with `NEXT_PUBLIC_` if it is safe for the browser to see.

### 4. Commit after each step

- One commit per completed step (a section, a page, a config change), with a message saying what the step was.
- Run `npm run lint` and `npm run build` before committing. Do not commit a broken build.

### 5. Mobile-first

- Design and build at 375px first, then add `sm:`, `md:`, `lg:` enhancements. Unprefixed classes are the mobile styles.
- Tap targets are at least 44×44px. The phone number is always a `tel:` link.
- No horizontal scroll at any width from 320px up.

### 6. Sample reviews are labelled "Sample review"

- This is a demo with invented reviews. Every review rendered anywhere on the site shows the visible text "Sample review" next to it. The label is driven by `sample: true` on the review in `business.ts`.
- Do not emit `Review` or `AggregateRating` JSON-LD for sample reviews.
- The label comes off only when a real client supplies real reviews and the entry is set to `sample: false`.

## Layout

```
src/config/business.ts   all business content
DESIGN.md                all visual tokens and design rules
src/app/globals.css      token implementation (Tailwind v4 @theme)
src/app/                 routes
src/components/ui/       shadcn primitives
src/components/          site sections
```

## Commands

```
npm run dev      local dev server
npm run lint     ESLint
npm run build    production build
```
