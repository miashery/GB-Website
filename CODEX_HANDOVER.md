# Codex Handover Log

This is the living handover file for public website changes made by Codex after the Claude limit/freeze period. Keep adding dated entries here before handing work back to Claude or another assistant.

## 2026-05-04

### Public Website Repair and Polish

- Fixed the original TR/EN language overlap caused by later CSS making both `.tr-only` and `.en-only` visible at the same time.
- Repaired visible homepage text overlap, including the location strapline overlapping the hero text.
- Improved typography, spacing, and button hierarchy across the static public site.
- Polished workshop and play pages so they no longer look like raw colored blocks/tables.
- Used the cafe/restaurant page as a cleaner visual reference for the rest of the site.

Relevant commits:

- `4857a4e fix public site language overlap and feed text`
- `0d97e1f polish public site typography and hero layout`
- `ca3c997 polish public workshop and play page design`

### Public Website: Mobile, PWA, and Dynamic Content

- Added mobile navigation behavior.
- Added a public-site PWA foundation:
  - `manifest.webmanifest`
  - `sw.js`
- Updated `assets/site.js` to inject PWA/mobile behavior and normalize shared public-site interactions.
- Wired public Sign In / Join links to the webapp.
- Added dynamic content loading from the webapp public endpoint:
  - `https://giggles-bloom.vercel.app/api/public/upcoming`
- Dynamic/public endpoint currently provides:
  - upcoming workshops/events;
  - play availability;
  - menu highlights.
- Updated `play.html` to consume dynamic play availability.
- Updated `food.html` to consume dynamic menu highlights.

Relevant commit:

- `abe4c71 improve public site mobile and dynamic content`

### Public Website: Contact and Domain Notes

- Updated contact email to `info@ggbloom.org`.
- Updated Instagram to `gigglesandbloom`.
- Removed fake phone/placeholder phone from visible contact areas where possible.
- User connected main domain to public website on Vercel:
  - `https://www.gigglesbloom.com/`
- Official business phone number is still pending from the user.

Relevant commit:

- `0b27a40 update public contact details`

## Near-Term Public Website Backlog

- Full mobile QA on real phone/tablet.
- Confirm every navigation link and CTA goes to the correct public or webapp destination.
- Review all pages for polish consistency, especially pages that still inherited older blocks.
- Ensure every dynamic section has a useful loading/empty/error state.
- Confirm PWA install behavior and service worker behavior on production domain.
- Replace temporary visual assets with final brand-approved photography/illustration when available.

## 2026-05-05

### Public Website: Workshops and Play Redesign

- Rebuilt `workshops.html` with a cleaner structure closer to the Cafe page:
  - calmer hero section;
  - two programme-type cards;
  - four-track overview cards;
  - daily session rhythm table;
  - dynamic live programmes section using `id="dynamic-feed"`;
  - cleaner enrolment CTA.
- Rebuilt `play.html` with:
  - calmer hero section;
  - clear daily entry pricing;
  - two play-zone cards;
  - pricing cards;
  - dynamic availability section using `id="play-availability"`;
  - account/membership CTAs.
- Added shared v10 CSS in `assets/site.css` for:
  - feature cards;
  - pricing cards;
  - workshop track cards;
  - improved mobile behavior for hero, dynamic sections, pricing, and track grids.

Verification:

- `rg -n 'ðŸ|Ã|Â|â|Ä|Å' workshops.html play.html` returns no matches.
- A PowerShell local href scan found all relative HTML links point to existing files.
- Attempting to start a local background HTTP server from this sandbox was blocked by the workspace policy, so production/mobile browser QA still needs to happen after deploy.

### Public Website: Remove Public Corporate Pages

- Removed public `corporate/*.html` pages from the deploy because they contain strategy, partnership, operating model, and commercial material that should not be publicly browsable.
- Replaced public links that pointed into `corporate/` with safe public destinations:
  - `contact.html` for B2B, expert, partnership, about, and request conversations;
  - `privacy.html` for data/privacy references;
  - `membership.html` where the old public CTA was really about the family portal/member experience.
- Added `privacy.html` as a minimal public-safe privacy and data principles page.
- Updated `assets/site.js` footer normalization so it no longer injects links to the corporate folder.
- Bumped the public service-worker cache name to `gb-public-v2` so older cached corporate pages are cleared after deployment.

Future recommendation:

- For B2B/partnership material, create a separate private proposal pack or mini-site later, with time-bound signed links or password-protected Vercel preview/proposal URLs. Public pages should only invite enquiries and avoid pricing, internal strategy, operating model, or founder-sensitive detail.

Verification:

- No remaining `corporate/` references were found in public HTML/CSS/JS.
- A PowerShell local href scan found all remaining public local links point to existing files.
