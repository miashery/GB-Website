# Giggles & Bloom Public Design System v2.1

Status: active public-site standard  
Applies to: the static public website in this repository  
Does not automatically apply to: authenticated portals in the GigglesBloom repository

## Design intent

The public site should feel warm, calm, literate, trustworthy, and recognisably Giggles & Bloom. It is a real family third-place website, not a generic SaaS landing page. The interface should make the physical branches, books, play, workshops, community, and practical next steps easy to understand.

The site uses one shared visual language with a distinct accent for each world. Pages may have their own character, but navigation, typography, spacing, buttons, forms, accessibility, and responsive behaviour remain consistent.

## Sources of truth

- `assets/tokens.css`: colours, typography, spacing, radii, shadows, motion, and compatibility aliases.
- `assets/design-system.css`: canonical public components, hierarchy, shell, privacy controls, and responsive rules.
- `scripts/sync-site-shell.mjs`: canonical static header, mobile navigation, announcement, footer, active page state, and page theme class.
- `scripts/static-site-check.mjs`: build-time design, encoding, privacy, security, asset, sitemap, and route checks.

Do not reintroduce runtime-generated headers or footers. Update the shell generator and run it instead.

## Brand assets

- Approved public wordmark: `assets/redesign/logo-wordmark.png`.
- Approved favicon: `assets/favicon.svg`.
- The old `assets/brand-mark.svg` is not the public wordmark and must not be used in page shells, metadata, or structured data.
- The wordmark must remain legible, uncropped, and proportionally scaled.

## Typography

- Display: Newsreader.
- Interface and body: Hanken Grotesk.
- Retired: Fraunces and DM Sans.
- Display scale is reserved for true page heroes. Cards, compact tools, navigation, and supporting panels use restrained sizes.
- Letter spacing is zero in display and body copy. Small uppercase labels may use positive tracking only.

## Page worlds

| World | Theme class | Accent |
| --- | --- | --- |
| Play | `page-play` | Play blue |
| BloomLab | `page-bloomlab` | Lilac |
| Community and support | `page-community`, `page-support` | Sage |
| Journal | `page-journal` | G&B blue with soft editorial tones |
| Events | `page-events` | Lilac |
| Workspaces | `page-work` | G&B blue |
| Books and Kurtköy | `page-books`, `page-kurtkoy` | Gold |
| Cafe | `page-cafe` | Coral |
| Membership | `page-membership` | G&B blue |
| Visit and Kadıköy | `page-visit`, `page-kadikoy` | Sage |

Use the accent to clarify identity and priority. Do not turn the whole page into one colour family.

## Layout and components

- Main content width: `--container` (1120px), with narrower reading measure where appropriate.
- Spacing follows the 8px rhythm in `assets/tokens.css`.
- Standard cards and tools use 12px or 20px radii. Pills are only for compact controls, status, tags, and primary actions.
- Do not place decorative cards inside cards. Use full-width bands or unframed groups for page sections.
- Primary actions use the brand or page accent. Secondary actions remain quiet and clearly subordinate.
- Real branch, product, book, workshop, or community imagery is preferred over abstract decoration.
- Empty and degraded states should be honest, useful, and optimistic without inventing activity or data.

## Public shell

Desktop navigation intentionally contains seven scanning-friendly destinations:

1. Play
2. BloomLab
3. Community
4. Journal
5. Cafe & Books
6. Membership
7. Visit

The mobile drawer includes the deeper destinations and both branches. Every functional page contains a static header and footer so navigation is available before JavaScript loads and search engines receive the complete shell.

Run after any shell change:

```powershell
node scripts/sync-site-shell.mjs
```

## Responsive behaviour

- Desktop: balanced three-part header and restrained content width.
- Tablet: preserve useful two-column compositions where they remain readable; prevent actions and headings from colliding.
- Mobile: one-column content, icon menu, comfortable touch targets, no horizontal overflow, and no hidden primary action.
- Fixed-format elements use stable dimensions or aspect ratios to avoid layout shift.
- Respect `prefers-reduced-motion`.

## Privacy and external content

- The privacy notice is compact and subordinate to the page content.
- Essential technology works without optional consent.
- Analytics and external embeds wait for the relevant preference.
- Maps must retain their consent marker and delayed `data-src` contract.
- Privacy choices remain reachable from the footer after the first decision.

## Quality gate

Run before release:

```powershell
node scripts/static-site-check.mjs
```

The check blocks retired fonts, retired logo use, malformed Turkish encoding, duplicate or missing shells, early map loading, security regressions, broken local links, and missing required rewrites/assets. Visual changes also require desktop, tablet, and mobile rendering checks plus a real menu and language interaction.

## Exceptions

An exception must be intentional, documented in `CODEX_HANDOVER.md`, and visually verified. A page-specific accent or editorial layout is acceptable. A second navigation system, unapproved font, inconsistent logo, inaccessible control, public-data invention, or silently broken bilingual state is not.
