# DELGRAÇA Website — BUILD LOG

Stack: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + next-intl v4**.
Bilingual: **pt-AO (default, unprefixed) / en (`/en`)** with localized pathnames.
Primary experience: **premium light mode**; dark mode is an optional toggle.

---

## Phase 0.5 — Asset preparation ✅
- Converted `logo.jpeg` → `public/brand/delgraca-logo.png` (transparent, trimmed, 1097×594).
- Converted `logo and favico.jpeg` → `public/brand/delgraca-monogram.png` (transparent, 648×546).
- Generated icon set from the DG monogram: `favicon.ico` (16/32/48), `icon-192.png`,
  `icon-512.png`, `apple-touch-icon.png` (180, on white), `icon-maskable-512.png`.
- Brand hexes locked: blue `#0047CA`, orange `#FF6600`.

## Phase 1 — Design tokens & typography ✅
- Light-first CSS custom properties in `globals.css` (bg/surface/text/border/semantic).
- Contrast: text-primary `#10192E` ~15.9:1 on white; text-secondary `#47506A` ~7.3:1.
  Orange `#FF6600` documented as **accent/graphic only** (~2.9:1 on white);
  `--brand-orange-text: #B84B00` (~5:1) used wherever orange text sits on light.
- Modular type scale (~1.25), fonts via `next/font`: **Sora** (display) + **Inter** (body),
  both subset `latin` + `latin-ext` (Portuguese diacritics), preloaded.
- Elevation (sm/md/lg/xl), radius (sm/md/lg/xl), spacing (4px base), motion tokens,
  `prefers-reduced-motion` handling. Icons: **Lucide**, single stroke width.

## Phase 2 — Scaffold, grid, assets ✅
- Home: Hero (eyebrow/headline/subheadline/2 CTAs/brand panel), Services grid,
  Training+Supplies teasers, Contact teaser, CTA banner.
- Shared `.auto-grid` primitive (CSS Grid auto-fit/minmax) reused across sections.
- Logo in header + footer; favicon/app-icon set wired via `manifest.ts`;
  OG image generated at `[locale]/opengraph-image.tsx`.

## Phase 3 — Navigation ✅
- Semantic `<nav aria-label>`, dropdowns for Services/Training/Supplies with
  `aria-haspopup/expanded/controls`, arrow-key + Escape handling, hover + click.
- Sticky header gains shadow only after scroll. Mobile hamburger with focus trap.
- Active state via colour + underline + `aria-current="page"`. Language switcher
  (`Português`/`English`, word labels) reachable in mobile menu.

## Phase 4 — About (semantic HTML5 + schema.org) ✅
- `<main>/<article>/<section>/<address>`, `Organization` JSON-LD with legal data.
- Legal block (NIF/CAE/matrícula/address/phones/email) identical across locales.

## Phase 5 — Services & Fornecimentos detail (JSON-LD) ✅
- 8 service detail pages, each unique `Service` JSON-LD + breadcrumb JSON-LD.
- Supplies: 4 categories as `ItemList` JSON-LD, no price/offer fields.

## Phase 6 — Contact form ✅
- Client validation (required, email, Angolan phone), inline help, `aria-invalid`/
  `aria-describedby`, focus-first-invalid, success/error states.
- `/api/contact` route: server-side sanitisation + validation (independent of JS).
  [[NEEDS CLIENT INPUT: production email endpoint / form backend]]

## Phase 7 — FAQ ✅
- Accessible accordion (`aria-expanded`/`controls`, region), `FAQPage` JSON-LD;
  Q/A text matches on-page content per locale.

## Phase 8 — Blog / MDX template ✅
- Bilingual blog listing + detail; frontmatter contract documented in
  `src/content/blog/_TEMPLATE.mdx`. Sample post links to 2 real service pages.

## Phase 9 — Client-side search ✅
- Command-palette search: 260ms debounce, accent-insensitive matching (`normalizeText`),
  `<mark>` highlighting, empty/no-results states, both locales.

## Phase 11 — Security ✅ (headers), backend pending client
- `next.config.ts` sets CSP, HSTS, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, frame-ancestors. Server-side form sanitisation in place.

## Phase 12 — Crawlability ✅
- `sitemap.ts` (all routes both locales, hreflang alternates, x-default → pt-AO),
  `robots.ts` (allows all, disallows `/api/`, references sitemap).

## Phase 13 — Content ops ✅
- See `CMS_RECOMMENDATION.md` (Sanity, with workflow + content model).

---

## OPEN ITEMS (client input required)
- [[NEEDS CLIENT INPUT: confirm Bairro — Mutamba (letter) vs Ingombota (brief)]]
- [[NEEDS CLIENT INPUT: production email endpoint / form backend]]
- [[NEEDS CLIENT INPUT: confirm wordmark stays "DELGRACA" without cedilla]]
- English catalog descriptions carry `[[VERIFY TRANSLATION]]` markers for client review.
- Real map embed for the contact page (placeholder in place).
- Replace placeholder domain `https://www.delgraca.co.ao` in `src/data/company.ts`.
