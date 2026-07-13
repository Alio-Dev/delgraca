# Content Operations Recommendation (Phase 13)

## Context
DELGRAÇA is a small Angolan SME with a **non-technical team** and **intermittent
connectivity**. The site is **bilingual (pt-AO primary, en secondary)** and its
editable content is well-structured: Services, Formações, Fornecimentos, Blog,
and FAQ. The goal is to let staff update content **without a developer redeploy
per change**.

## Recommendation: **Sanity** (headless CMS) — hosted, with Git-friendly fallback

**Why Sanity fits this client**
- **Generous free tier** and low ongoing cost for a small team.
- **First-class localization**: field-level or document-level i18n maps cleanly
  onto our `pt-AO` / `en` model. Legal data (NIF, matrícula, address) can be a
  single non-localized field so it stays identical across locales by design.
- **Draft → publish workflow with scheduling** and **document history/versioning
  with one-click rollback** — covers the required editorial lifecycle.
- **Structured content** (schemas) matches our typed catalog (`Catalogitem`,
  `SupplyCategory`) almost 1:1, so the editing UI mirrors the site's data model.
- **Resilient to poor connectivity**: the Studio is an SPA that tolerates flaky
  networks and retries; content is fetched at build/ISR time, so visitors are
  served fast static pages even when the editor is offline.

**Alternatives considered**
| Option | Verdict |
|---|---|
| **Storyblok** | Strong visual editing + i18n; good second choice. Slightly heavier for a tiny team. |
| **Contentful** | Capable but pricier and heavier than needed at this scale. |
| **Decap CMS (git-based)** | Free and simple, but the git-commit-per-edit model is fragile on intermittent connectivity and less friendly for non-technical staff. Good only if hosting must stay 100% free. |
| **Payload (self-hosted)** | Powerful, but self-hosting adds ops burden this team can't carry. |

## Content model (Sanity schemas)
- `service` — { slug, name (localized), short (localized), long (localized), icon, order }
- `training` — { slug, name, short, long, order }
- `supplyCategory` — { slug, name, description, items[] }
- `faqItem` — { question (localized), answer (localized), order }
- `blogPost` — { slug, locale, title, description, date, tags[], ogImage, body (portable text) }
- `companyInfo` — **singleton, non-localized** (legalName, NIF, CAE, matrícula,
  address, phones, email) — the single source of truth, edited in one place.

## Editorial workflow (per locale)
1. **Draft** — editor creates/edits a document; autosaved as a draft.
2. **Review** — a second role (e.g. Director) reviews via Sanity's roles/permissions.
3. **Schedule** — set a publish time (Scheduled Publishing) or publish immediately.
4. **Publish** — triggers a webhook → Next.js **on-demand revalidation** (or an
   ISR revalidate window) so the change appears without a manual redeploy.
5. **Rollback** — if something is wrong, restore any previous version from
   document history in one click.

## What non-technical staff CAN change unassisted
- Service / Formação / Fornecimento names, descriptions, ordering, and catalog items.
- FAQ questions and answers.
- Blog posts (both locales), tags, publish dates, and scheduling.
- Company contact details in the `companyInfo` singleton (phones, email, hours).

## What requires a developer
- Site structure/routes, navigation architecture, and localized URL slugs.
- Design tokens, layout, and component behaviour.
- Adding a **new content type** or a new field to an existing schema.
- Wiring/rotating the publish webhook and revalidation secret.

## Integration notes for this codebase
- Replace the local accessors in `src/lib/content.ts` and `src/content/blog.ts`
  with Sanity GROQ queries; keep the same return shapes so pages don't change.
- Keep `src/data/company.ts` as the fallback/source of truth until the
  `companyInfo` singleton is populated, then read from Sanity.
- Add an on-demand revalidation route (`/api/revalidate`) guarded by a secret,
  called by the Sanity publish webhook.
