# Design system wiring

This app is the current source of truth for the BladeRunner Labs website, and the Figma
design is the source of truth for how it looks. The design-system package lives in
`src/design-system/` and was updated to **v0.2** to match that design:

- `tokens.css` — palette, type scale, spacing, radii, button geometry, semantic roles
- `components.css` — `.brl-button` variants, `.brl-mono-label`, `.brl-panel`, `.brl-link`
- `tokens.json`, `README.md` — portable definitions and the written rules, both at v0.2
- `fonts/` — local Inter and IBM Plex Mono files with their OFL notices

## What v0.2 changed

Headings are **IBM Plex Sans** (H1–H2 at 700, H3–H6 at 600) with the design's tighter line
heights and negative tracking — H1 64/72 at -0.022em, down to 40/48 below 640px. Buttons are
uppercase IBM Plex Mono with 0.06em tracking at 40/48/56px heights, and `.brl-mono-label`
covers the uppercase eyebrows, card categories and counters at 12/16 with 0.08em.
The gray palette, accent, spacing and radius scales are unchanged from v0.1.

The hero is a grayscale render recoloured into the palette: the image keeps its own light and
shade, and a tint layer above it contributes hue and saturation only (`color` blend), so
highlights stay white and shadows turn blue rather than grey. It is tuned by
`--hero-duotone-tint`, `--hero-duotone-tint-opacity`, `--hero-duotone-contrast` and
`--hero-duotone-brightness`, and drifts slowly (`sweep-drift`, off under
`prefers-reduced-motion`). The earlier gradient-and-bubbles treatment is still in `tokens.css`
as `--hero-gradient`, `--bubble-fill` and `--bubble-shadow`. Service icons sit on
`--accent-subtle`. All of it is decorative — not for text, surfaces or controls.

## How Tailwind is bound to the tokens

`src/index.css` imports the design system, then clears Tailwind's default color, font and
radius scales (`--color-*: initial` and friends) and re-points them at the token variables.
`bg-gray-50`, `text-gray-600`, `border-gray-200` and `font-mono` all resolve to design-system
values, and nothing else is reachable. Two things to know:

1. **Theme flips.** `@theme` values resolve once at `:root`. The `[data-theme]` block in
   `index.css` re-declares the semantic roles so a section marked `data-theme="dark"`
   actually flips.
2. **Font import.** `tokens.css` normally imports `fonts/fonts.css` itself. The bundler
   resolves nested `@import`s from the entry file, so `index.css` imports the font sheet
   directly and that one line in `tokens.css` is commented out.

Note the gray scale numbering: the Figma file's `gray-50` is `#F1F1F1`, which is `gray-100`
in this system. The JSX uses design-system names, so the same hex values now read one step
higher than they did in the export.

## Page structure

`src/App.tsx` is the home page; `src/pages/ProjectDetail.tsx` is a project article, reached at
`…/projects/<id>` through the small router in `src/routing.ts` (real paths, so articles can be
bookmarked and shared; the deploy publishes a 404.html copy of the shell so deep links load). The contact
section and footer live in `src/sections/`, so both pages render the same markup rather than a
copy. A project article's sub-header carries the navigation — Back on the left, the next project on
the right — and switching projects replays the `.article-in` fade, which
`prefers-reduced-motion` turns off.

## Rules when adding UI

- Headings use `brl-h1`…`brl-h6`; body text uses `brl-body-lg`, `brl-body`, `brl-body-sm`,
  `brl-caption`, `brl-label`; uppercase labels use `brl-mono-label`.
- Buttons go through `src/components/Button.tsx`, which emits `.brl-button` classes. Pass
  `onDark` on a dark surface.
- Spacing utilities land on the 4px scale; radii come from tokens:
  `rounded-[var(--radius-16)]`.
- New values belong in `tokens.css` / `components.css`, not in component files.

## Open items

- **Technology section** shows the heading and the logo marquee, as the design does. The three
  approved expertise lists (AI & computation, Systems & infrastructure, Engineering tools) are
  still exported from `src/data.ts` as `technology` but are no longer rendered. Say the word
  and they go back in.
- **Contact section** has no CTA button, per the design; the email address is a link in the
  details column.
- **Third-party logo strip** loads brand logos from `cdn.simpleicons.org` at page load.
  Confirm the trademark use, and consider self-hosting so the section does not depend on an
  external CDN.
- **IBM Plex Sans loads from Google Fonts**, unlike Inter and Plex Mono which are local.
  Self-hosting it would remove the third-party request and the flash before it loads.
- **Hidden scrollbars** (`scrollbar-width: none`) come from the design. They remove a visible
  scroll affordance, which some people rely on — worth a second look.
- **New copy** not in the approved draft: phone number, `jobs@bladerunner.io`, Tel Aviv,
  LinkedIn, and the project-detail overview and capability claims. Confirm before publishing.
- **Artwork**: the project cards and the detail pages both use the supplied images
  (`public/assets/product-1.png`, `product-2.png`). No placeholders remain — the hero's right
  column is empty by design, as in the Figma file.
- **Logo**: the header and favicon use the client's own artwork in `public/assets/logo/`
  (`brand-wordmark.png`, `brand-mark.png`), with their originals kept in `logo/source/`. Ask
  the client for vector artwork and a transparent symbol; the redrawn SVGs that shipped before
  had the wrong proportions. `lockup.svg` / `wordmark.svg` are the Figma redraws, unused.
- `robots.index` is `false` in `.figma/make/site.json`; the site is noindex until you flip it.
- The earlier static prototype in `../BladeRunner-Labs-Prototype/` is superseded by this app,
  and still carries the v0.1 design system.
