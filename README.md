# BladeRunner Labs — website

The BladeRunner Labs one-page site and the design system it is built from.

**🔗 Live preview:** https://nanamuratova.github.io/bladerunner-labs-website/

> This is a work-in-progress preview for review, not the live bladerunner.io site. It is
> marked `noindex`, so search engines skip it. The copy, contact details and project claims
> are drafts pending confirmation — see **Before publishing** below.

---

## What's here

| Path | What it is |
| --- | --- |
| `src/App.tsx` | The one-page site: hero, about, projects, services, technology, contact |
| `src/pages/ProjectDetail.tsx` | The DAGRunner and AI Couture detail pages |
| `src/data.ts` | All project, service and technology content — edit copy here |
| `src/sections/` | Contact and footer, shared by the home page and the project articles |
| `src/design-system/` | The design system: tokens, components, fonts and its own README |
| `public/assets/` | Project artwork, service icons and the logo set |
| `DESIGN-SYSTEM-NOTES.md` | How the design system is wired into the app, and open items |

## The design system

`src/design-system/` is the visual source of truth, currently at **v0.2**:

- `tokens.css` — the palette, type scale, spacing, radii, button geometry and semantic roles
- `components.css` — button variants, the mono label, panel and link styles
- `tokens.json` — the same values in a portable form, for Figma or another codebase
- `README.md` — the written rules: typography, color derivation, contrast, button behavior
- `fonts/` — Inter and IBM Plex Mono, local, with their SIL Open Font License notices

In short: IBM Plex Sans headings, Inter body text, uppercase IBM Plex Mono for buttons and
labels, a gray palette derived from `#1A1A1A`, the `#1F51FF` accent, and 4px-based spacing.
Tailwind's own color, font and radius scales are switched off in `src/index.css` and replaced
with these tokens, so a component can only reach design-system values.

Changing a color or a size means changing it in `tokens.css` — every screen follows.

## URLs

The home page lives at the base path and each project article at
`…/projects/<id>` — `projects/dagrunner`, `projects/ai-couture`. Links are real
anchors, so they can be opened in a new tab, bookmarked and shared, and a reload
lands back on the same article.

Because these are paths rather than hashes, a static host has to serve the app
shell for unknown paths. The deploy workflow copies `index.html` to `404.html`,
which is how GitHub Pages does it; on another host, add a catch-all rewrite to
`index.html`.

## Running it locally

Node 20 or newer:

```bash
npm install
npm run dev
```

Then open the URL it prints (http://localhost:8443). `npm run build` produces the static site
in `dist/`, and every push to `main` deploys it to the live preview above.

## Before publishing

- **Copy** — the phone number, `jobs@bladerunner.io`, the Tel Aviv address and the technical
  claims on the project detail pages are newer than the approved copy draft. Confirm them.
- **DAGRunner article** — written from the client's deck (`DAG_RUNNER.pdf`) and the technical
  overview. The measured results (20 → 2 min, 15% → 95% GPU utilization) name the workload and
  carry the deck's own qualifier, but publishing them needs the client's sign-off.
- **AI Couture article** — written from the client's slide deck. Three things there need
  sign-off before this is public: the market figures (attributed to NRF, Appriss Retail,
  Signifyd, Happy Returns, Narvar and Optoro, as the deck cites them), the patent claim
  US 11,113,892 B2, and the retailer ROI, which is written as expected outcomes because the
  deck reports no retailer results. The original brief specifically cautioned against
  unverified accuracy, patent and ROI claims.
- **Third-party logos** — the technology strip loads brand logos from `cdn.simpleicons.org`
  at page load. Confirm the trademark use, and consider self-hosting them.
- **Artwork** — project cards and detail pages use the supplied images. The logo is the
  client's PNG; vector artwork would be better for print and large display.
- **Fonts** — IBM Plex Sans loads from Google Fonts; Inter and IBM Plex Mono are local files.
- **Search visibility** — `robots.index` in `.figma/make/site.json` is `false`. Flip it when
  the site goes to its real domain.

## Origin

The site began as a Figma Make export and stays compatible with it. The design system was
brought in from the BladeRunner Labs foundations package and updated to match the Figma
design. `DESIGN-SYSTEM-NOTES.md` explains that wiring, including the parts worth knowing
before editing styles.
