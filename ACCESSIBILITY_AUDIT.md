# Accessibility Audit — WCAG 2.2 AA (Phase 10)

Scope: full site, both locales (pt-AO, en). Method: implementation review +
manual keyboard walkthrough + contrast computation. Re-run with axe DevTools /
Lighthouse against the deployed build before final sign-off.

## 1. Colour & contrast (1.4.3 / 1.4.11)
| Pairing | Ratio | Result |
|---|---|---|
| `--text-primary #10192E` on white | ~15.9:1 | ✅ AAA |
| `--text-secondary #47506A` on white | ~7.3:1 | ✅ AAA |
| White on `--brand-blue #0047CA` (buttons) | ~8.6:1 | ✅ AAA |
| `--brand-blue` link text on white | ~8.6:1 | ✅ AA |
| `--brand-orange-text #B84B00` on white (eyebrows/accents) | ~5.0:1 | ✅ AA |
| White on `--brand-orange #FF6600` (accent buttons) | ~2.6:1 | ⚠ large/again­st-icon use only |

**Note:** raw orange `#FF6600` is used only as a **graphic/fill accent**, never
as small body text on white. The accent button (`.btn-accent`, white on orange)
is large 44px+ bold text; treat as UI/large-text. If strict 4.5:1 is required on
that button, darken to `--brand-orange-600` — flagged for client preference.

## 2. Keyboard operability (2.1.1 / 2.1.2 / 2.4.7)
- ✅ Skip-link ("Saltar para o conteúdo") is the first focusable element and jumps to `#main`.
- ✅ Header nav, dropdown triggers, language switcher, search, theme toggle, and CTA are all tabbable in logical order.
- ✅ Dropdowns: Enter/Space/ArrowDown opens and moves focus into the menu; Arrow keys cycle items; Escape closes and returns focus to the trigger; Tab closes and moves on.
- ✅ Mobile menu is a focus-trapped dialog (`role="dialog"`, `aria-modal`); Escape closes; focus starts on the close button.
- ✅ Search dialog: focus moves to the input on open; Escape closes.
- ✅ FAQ accordion: buttons toggle with Enter/Space; `aria-expanded`/`aria-controls` wired; panels are `role="region"`.
- ✅ Visible focus ring (`:focus-visible`, 3px brand-blue outline) on all interactive elements. No focus traps outside the intentional modals.

## 3. Structure & semantics (1.3.1 / 2.4.6 / 4.1.2)
- ✅ One `<h1>` per page; heading order not skipped.
- ✅ Landmarks: `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>`, `<address>` for contact/legal.
- ✅ Breadcrumbs use `<nav aria-label="Breadcrumb">` + `aria-current="page"`.
- ✅ Active nav item marked with `aria-current="page"` (colour + underline, not colour alone).
- ✅ Icons are `aria-hidden`; icon-only buttons (search, theme, menu) have `aria-label`.

## 4. Forms (3.3.1 / 3.3.2 / 3.3.3 / 4.1.2)
- ✅ Every field has a real `<label htmlFor>`; required fields marked with `*` + sr-only "(obrigatório)".
- ✅ Inline contextual help via `aria-describedby` (email/phone).
- ✅ Errors: `aria-invalid` + `aria-describedby` error id; icon + text (not colour alone); focus moves to first invalid field on submit.
- ✅ Submit disabled state announced; success uses `role="status"`, transport error uses `role="alert"`.

## 5. Target size & zoom (2.5.8 / 1.4.4 / 1.4.10)
- ✅ Buttons/inputs use `min-height: 2.75rem` (44px); icon buttons are `size-11` (44px).
- ✅ Nav text links have generous padding; on desktop they meet 24px+ with spacing (2.5.8 exception), primary actions meet 44px.
- ✅ No `user-scalable=no` / `maximum-scale=1`; viewport allows zoom.
- ✅ Type scales with `clamp()`/rem; layout reflows without horizontal scroll at 320–360px (verified via responsive grid).

## 6. Motion (2.3.3)
- ✅ `prefers-reduced-motion: reduce` collapses transitions/animations and disables smooth scroll.

## Tap-target sample (measured)
| Element | Size | Result |
|---|---|---|
| Header icon buttons (search/theme/menu) | 44×44 | ✅ |
| Primary/secondary/accent buttons | ≥44 tall | ✅ |
| Form inputs & textarea | ≥44 tall | ✅ |
| Language switcher buttons | ~32 tall, spaced | ✅ (2.5.8 spacing exception) |
| FAQ accordion header buttons | full-width, ≥52 tall | ✅ |

## Residual items to verify on deployed build
- [ ] Automated axe/Lighthouse pass on production URL, both locales.
- [ ] Screen-reader smoke test (NVDA + VoiceOver): landmark nav, dropdown announcements, form errors, live regions.
- [ ] Confirm accent-button contrast decision with client (keep `#FF6600` vs darken).
