# Public Website Contributor Guide

## Design System v2

Read `DESIGN_SYSTEM_v2.md` before changing public HTML, CSS, navigation, privacy controls, or responsive layout.

- Use `assets/tokens.css` for colour, spacing, radius, shadow, motion, and type tokens.
- Use `assets/design-system.css` for the public shell and canonical components.
- Use Newsreader for display type and Hanken Grotesk for body/interface type. Do not restore retired fonts.
- Use `assets/redesign/logo-wordmark.png` as the approved public wordmark.
- Use `.page-hero`, `.page-intro`, `.sec-label`, and `.sec-h` for content hierarchy.
- Keep one clear primary action in each decision area; subordinate secondary actions.
- Preserve working dynamic events, workshops, journal, privacy, language, authentication, and branch links.
- Keep headers and footers static in HTML. Change `scripts/sync-site-shell.mjs`, then run it across the site.
- Keep Turkish user-facing text in proper UTF-8.

Before handover, run:

```powershell
node scripts/sync-site-shell.mjs
node scripts/static-site-check.mjs
node --check assets/site.js
```

Visual changes also require desktop, tablet, and mobile checks, including the mobile menu, TR/EN switching, privacy choices, and horizontal overflow.
