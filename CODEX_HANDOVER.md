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

### Public Website: Encoding Repair After Corporate Cleanup

- The broad corporate-link cleanup caused Turkish UTF-8 text to display as mojibake on the deployed site.
- Repaired public HTML and shared script text back to valid UTF-8.
- Removed remaining broken decorative emoji fragments where they were presentation-only.
- Restored normal dash characters in public prose.

Verification:

- UTF-8 runtime check confirms the homepage hero now reads correctly:
  - `İstanbul'da İlk — Kadıköy & Kurtköy`
  - `Ebeveynler nefes alır. Çocuklar büyür.`
  - `Giggles & Bloom bir oyun kafesi değil.`
- Mojibake scan for common broken fragments returns no matches across public HTML/CSS/JS.
- `git diff --check` passes.

### Public Website: Homepage Layout and Centre Photography Polish

- Added optimized WebP centre photos in `assets/centres/` from the founder-provided Kadıköy/Kurtköy raw photos:
  - `kadikoy-day.webp`
  - `kurtkoy-day.webp`
  - `kurtkoy-night.webp`
- Added a homepage “Our Spaces / Mekânlarımız” section using those photos so the page no longer has a long empty middle area.
- Fixed remaining homepage markup fragments left after earlier encoding cleanup:
  - malformed location and email `<div>` elements;
  - missing `<h4>` opening tags in service/hour cards;
  - placeholder question marks in CTAs, prices, active badges, square-metre labels, and LEGO® Serious Play® text.
- Added v11 homepage CSS for:
  - photo cards with stable aspect and caption overlay;
  - cleaner branch cards;
  - tighter section rhythm;
  - improved mobile stacking for the new photo section.

Verification:

- Local href scan reports all relative public links resolve.
- Homepage parser check passes.
- `git diff --check` passes.
- Browser screenshot verification was attempted with the bundled Playwright package, but this sandbox cannot launch the local browser executable due to Windows `EPERM`; production visual QA still needs a quick refresh after deploy.

### Public Website: Site-Wide Page Consistency Repair

- Rebuilt the most visibly inconsistent public pages with clean, valid bilingual markup:
  - `food.html`
  - `library.html`
  - `workspaces.html`
  - `events.html`
  - `membership.html`
  - `contact.html`
  - `social-lab.html`
  - `wellbeing.html`
- Replaced fragile Turkish text with HTML-safe entities so Windows/Git/Vercel/browser encoding does not turn Turkish characters into question marks.
- Removed malformed mixed-language labels and broken card markup from:
  - cafe menu cards;
  - library branch and service cards;
  - cowork practical-information section;
  - event cards;
  - membership pricing cards;
  - contact request cards;
  - Social Lab and Parent Support sections.
- Kept corporate/B2B material public-safe: public pages now only invite contact for private proposals instead of linking to public corporate detail pages.
- Fixed shared `assets/site.js` footer normalization and dynamic price formatting so injected content no longer shows placeholder question marks.
- Added v12 shared CSS to normalize:
  - page-title scale;
  - hero heading scale;
  - card typography;
  - price and track card size;
  - cowork info-grid layout;
  - membership pricing-grid layout;
  - mobile stacking.

Verification:

- HTML parser check passes across public `.html` files.
- Local relative-link scan reports no missing public links.
- Targeted scan no longer finds the known broken fragments from the screenshots (`?5.000`, `m?`, `LEGO?`, malformed `<div <`, duplicated card tags, or mojibake fragments) in the repaired files.
- Browser screenshot verification is still blocked in this sandbox by Windows `EPERM`; after deploy, do a visual refresh on desktop and mobile.

### Public Website: Header Compatibility and Typography Tightening

- Added CSS compatibility for both public header markup styles:
  - older pages use `.header` / `.header-inner` / `.brand-logo`;
  - rebuilt pages use `.site-header` / `.bar` / plain `.brand img`.
- This prevents the logo/header from rendering oversized on rebuilt pages such as Cafe, Library, Cowork, Social Lab, Support, Events, Membership, and Contact.
- Added styling for the newer `.lang` language toggle so it matches the older compact switcher scale.
- Tightened in-page typography:
  - smaller section headings such as "Two Programme Types";
  - smaller card headings such as "Play Workshops";
  - calmer card body text and membership price scale.

Verification:

- `git diff --check` passes.
- Public HTML parser check passes.

### Public Website: Visual Warmth Pass

- Restored gentle pastel character after the cleanup pass made the public site feel too pale.
- Added a v14 shared CSS layer with:
  - soft sage/gold/coral radial accents in hero blocks;
  - warmer page-specific hero backgrounds;
  - alternating pastel card surfaces for feature, track, price, and clean-card grids;
  - richer highlight panels;
  - compact pastel chips;
  - membership cards with distinct but restrained pastel backgrounds;
  - warmer hover states.
- Kept the repaired structure, compact headers, and tightened typography intact.

Verification:

- `git diff --check` passes.
