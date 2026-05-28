# Codex Handover Log

This is the living handover file for public website changes made by Codex after the Claude limit/freeze period. Keep adding dated entries here before handing work back to Claude or another assistant.

## 2026-05-29

### Precise Public Brand Polish

- Aligned the later public-site cream override to the canonical `#FDF8F0`, so Chrome/Edge should no longer drift between yellowish/white page backgrounds because of competing cream values.
- Changed the homepage membership CTA banner from sage gradient to brand teal.
- Replaced homepage membership-tier emoji icons with mono line SVG icons using `stroke-width="1.5"`.
- Updated dynamic/fallback membership rendering in `assets/site.js` so API-fed tier icons also render through the same mono icon system instead of returning to emoji.
- No booking, payment, branch, event request, membership logic, or tracking logic was changed.

Verification:

- `node --check assets/site.js` passes.
- `git diff --check` passes.

## 2026-05-29

### Public Website Turkish And Encoding Cleanup

- Fixed visible Turkish text on `privacy.html`, including navigation labels, auth CTAs, privacy principles, and KVKK request copy.
- Fixed `membership.html` title/description metadata from ASCII Turkish to proper `Üyelik`.
- Replaced the customer-visible ASCII Turkish `Atolyeler` label with proper `Atölyeler`.
- Cleaned corrupted separator comments in `index.html` so future maintenance scans do not keep rediscovering the same mojibake.
- No booking, payment, branch, event request, membership, or tracking logic was changed.

Verification:

- `node --check assets/site.js` passes.
- `git diff --check` passes.
- Targeted scans no longer find the fixed `privacy.html` ASCII Turkish strings or the corrupted `index.html` comment separators.

## 2026-05-25

### Public Website Launch Trust Cleanup

- Removed launch-risk claims from the homepage such as "first in Istanbul" / "Turkey's first" positioning and replaced them with safer family-third-space language.
- Replaced placeholder testimonial-style quotes with honest launch promise cards, so the public site no longer implies real customer testimonials before launch proof exists.
- Softened the homepage membership preview:
  - removed hardcoded price/benefit promises from homepage cards;
  - added clear language that live package details are managed through the webapp;
  - stated that monthly benefits reset, do not roll over, and depend on capacity/availability.
- Updated Kurtkoy public copy to show soft opening now and full opening planned for Monday, 1 June 2026.
- Added `info@ggbloom.org` as the public email for both Kadikoy and Kurtkoy contact surfaces.
- Rebuilt `contact.html` into readable, maintainable markup while preserving navigation, account CTAs, footer links, and shared script behavior.

Verification:

- `node --check assets/site.js` passes.
- `git diff --check` passes.
- Targeted public-claim scan no longer finds the removed first/only/testimonial phrases.
- Basic mojibake scans for `â`, `Ã`, and `Â` return no public-site matches.

## 2026-05-24

### Public Website Book Catalog Link

- Added a live catalogue CTA to `library.html` so public visitors can open the webapp `/catalog` page from the Bookstore & Library page.
- Added shared `data-app-path` handling in `assets/site.js`, so public-site links to app surfaces are generated from the central `APP_URL` instead of duplicating app URLs in multiple scripts.
- The static fallback `href` still points at `https://giggles-bloom.vercel.app/catalog` so the link remains usable even if JavaScript is unavailable.

## 2026-05-20

### Public Website Membership Fallback Claim Safety

- Reviewed the external launch-hardening analysis that flagged risky static fallback membership claims.
- Updated `assets/site.js` fallback membership cards so they no longer claim "unlimited everything" or unlimited play/coworking.
- Updated the homepage static membership cards with the same fair-use language.
- Fallback cards now use fair-use wording and include a no-rollover/capacity/availability note when live package data cannot load.
- This keeps the public website conservative if the dynamic webapp membership API fails.

## 2026-05-12

### Public Website Dynamic Branch Cleanup

- Reviewed the current homepage dynamic branch changes.
- Kept the public site static and API-fed, matching the existing architecture.
- Updated `assets/site.js` branch-hours rendering to use branch data returned by the webapp public endpoint instead of hardcoded per-branch contact assumptions.
- Local public-site checks:
  - `node --check assets/site.js` passes.
  - Local relative href scan reports all public local links resolve.
  - Targeted mojibake/broken-fragment scan for public HTML/CSS/JS returns no matches.

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

### Public Website: Social Lab Content Expansion

- Expanded `social-lab.html` so it no longer feels sparse.
- Added public-safe sections covering:
  - the purpose of Social Lab as a research-informed family learning space;
  - what the university/psychology partnership enables;
  - what Social Lab does: observation, expert translation, community circles, programme improvement, privacy, and partnerships;
  - Neighbourhood Circle / Mahalle Cemberi as a family-community format;
  - how Kurtkoy can act as a neighbourhood satellite while Kadikoy acts as the larger workshop/research/event hub;
  - benefits for families, children, experts, and the local community;
  - privacy, consent, child-safety, and parent-safety principles.
- Kept wording public-safe and avoided confidential corporate strategy detail.

Verification:

- `social-lab.html` parser check passes.
- Local links on `social-lab.html` resolve.
- `git diff --check` passes.
