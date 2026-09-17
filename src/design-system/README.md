# BladeRunner Labs design foundations · v0.2

## What changed in v0.2

Typography now follows the approved Figma design. Headings moved from Orbitron to
**IBM Plex Sans** (H1–H2 at weight 700, H3–H6 at 600), with tighter line heights and the
negative tracking the design uses. Buttons are uppercase IBM Plex Mono with 0.06em tracking,
and a mono label role was added for eyebrows and card categories. The color palette, spacing
and radius scales are unchanged from v0.1. The hero's blue mesh gradient, bubble shading and the
accent tint are recorded under "Decorative treatments" below.

Approved direction: IBM Plex Sans headings, Inter body/UI text, IBM Plex Mono buttons; a gray palette derived from #1A1A1A; #FFFFFF, #F8F8F8 and #1A1A1A surfaces; #1F51FF accent; 4px-based spacing; radii 2, 4, 8, 10, 12, 16, 24, 32, 40, 48, 56, 64, 999999px.

## Files

- `tokens.json`: portable token definitions. Theme entries reference primitive CSS variable names. Typography and dimension values are CSS pixels.
- `tokens.css`: font faces, primitives, semantic aliases, typography utility classes, and responsive heading sizes.
- `components.css`: reusable button variants, panel and text-link styles.
- `fonts/`: local font files and SIL Open Font License notices.

Include `tokens.css`, then `components.css` in future pages. (The standalone reference page and its showcase files live in the original design-system package, not in this copy.) Use semantic colors (`--surface`, `--text`, `--border`, `--link`) in components; use primitives for the palette specimen. Set `data-theme="dark"` on the root or a section for an inverse theme. This defines dark surface behavior, not a requirement to add a dark-mode switch to the public website.

## Typography

Headings: IBM Plex Sans — 700 for display, H1 and H2; 600 for H3–H6. Body: Inter Regular 400.
Labels: Inter Medium 500. Buttons and mono labels: IBM Plex Mono Medium 500, uppercase.
IBM Plex Sans loads from Google Fonts; Inter and IBM Plex Mono are local files in `fonts/`
with their SIL Open Font License notices.

Desktop size/line-height: display 80/96; H1 64/72; H2 48/56; H3 36/44; H4 28/36; H5 24/32;
H6 20/28. Body large 20/32, body 16/24, small 14/20, caption 12/16, label 14/20.
Button 14/20 (13/20 compact, 15/20 large). Mono label 12/16.

Heading tracking is negative and set per role: display and H1 -0.022em, H2 -0.020em,
H3 -0.018em, H4 -0.015em, H5 -0.012em, H6 -0.010em. Body roles use normal tracking.
Buttons use +0.06em and mono labels +0.08em, both uppercase.

Below 640px: display 48/58, H1 40/48, H2 32/40, H3 28/36, H4 24/32, H5 20/28, body large
18/28. H6, body and controls keep their sizes. Body text should stay within about 65
characters per line.

## Color derivation

Gray 900 is #1A1A1A. Tints use sRGB channel interpolation from white toward this anchor at 3%, 6%, 12%, 24%, 40%, 60%, 72%, 84%, and 92%. Gray 950 is the darker #101010 shade. Gray 0 is white. Exact hex values are in tokens.json.

Accent is #1F51FF. Hover #1941CC and pressed #1639B3 are darker states; #90A9FF is the accessible text/focus variant on dark surfaces. Primary buttons retain the exact base accent on either surface.

Contrast ratios (unchanged in v0.2): white/accent 5.71:1; Gray 900/white 17.40:1; Gray 600/white 6.90:1; Gray 500/white 4.54:1; dark link/Gray 900 7.71:1. These are color-pair checks, not a claim of a complete WCAG audit. Disabled controls are intentionally lower contrast. Thin structural dividers are not control boundaries; use the stronger border token for controls.

## Spacing and radii

Spacing: 0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128. Tokens are named by their pixel value (`--space-24` = 1.5rem). Border thickness and focus ring width are independent of layout spacing.

Radius: 2, 4, 8, 10, 12, 16, 24, 32, 40, 48, 56, 64, 999999. `--radius-999999: 999999px` creates fully rounded pills and circles. Compact surfaces 4–8, panels 12–16, standard buttons 24, large buttons 32. Larger radii are available for deliberate large-container treatments.

## Buttons

Primary, secondary, tertiary, ghost, and link. Default, hover, pressed, focus-visible, and
disabled states. Filled, secondary and tertiary buttons: standard 48px, compact 40px, large
56px, with 24/20/32px inline padding and 24px radius (32px at large). Ghost and link buttons
are text-sized, with zero padding, zero border radius, no border and no minimum height across
all sizes and states. Button labels are uppercase IBM Plex Mono with 0.06em tracking.

Secondary uses a Gray 300 border, going to Gray 900 on a Gray 100 background on hover.
Tertiary sits on Gray 100 and darkens to Gray 200. Ghost is Gray 900 text that turns accent
on hover. Link is accent text, underlined, darkening to accent hover. On a dark surface, add
the on-dark modifier: white borders and text at 40%/10% white fills, with the on-dark accent
for link and ghost.

Use 48px or larger for primary touch actions. Button sizes are minimum heights and can grow
with text enlargement.

Use semantic `<button>` for actions and `<a>` for navigation. Use native `disabled` for
disabled buttons. If an anchor uses `aria-disabled`, the calling implementation must also
prevent navigation; prefer not rendering unavailable navigation as a link. Give icon-only
buttons an accessible name. Do not rely on hover to expose essential content.

## Decorative treatments

The hero uses a blue mesh gradient and floating bubbles (`--hero-gradient`, `--bubble-fill`,
`--bubble-shadow`); the mesh's two strongest layers are the accent at 28% and 34%, over
hero-only light blues. The bubbles sit in three depth tiers — `--bubble-blur-near` (sharp),
`--bubble-blur-mid` and `--bubble-blur-far` — and carry an iridescent film (`--bubble-sheen`)
multiplied at the rim through `--bubble-sheen-mask`, running cool blues through violet into a
warm amber arc. Service icons sit on a 10% accent tint (`--accent-subtle`). These are decorative
only: they are not part of the gray palette and must not be used for text, surfaces, borders
or controls, where contrast is not guaranteed.

## Scope

This is the design foundation and component specimen, not a completed application UI kit. The existing website prototype has not been restyled in this step. The wordmark is supplied as SVG artwork in the site's assets.

## Light-gray surface

#F8F8F8 (Gray 50) is an approved surface alongside white and dark. Use the existing semantic `--surface-subtle` token for alternating sections, panels and grouped content. In the dark theme, this semantic role adapts to Gray 800. Use Gray 900 text and the standard accent on the light-gray surface.
