# Codex Handover Log

This is the living handover file for public website changes made by Codex after the Claude limit/freeze period. Keep adding dated entries here before handing work back to Claude or another assistant.

## 2026-06-07

### Social Lab Pillar Reframing

- Rebuilt `social-lab.html` so the page leads with normal, everyday social wellbeing rather than consent/research warnings.
- Positioned Social Lab as the networking and collaboration side of the Wellbeing pillar, separate from the private Support / Knowledge Centre flow on `wellbeing.html`.
- Added the active academic coordination wording for Üsküdar University Psychology Department coordinator and academics, explicitly avoiding signed-agreement or partnership claims.
- Added a clearer G&B pillar map: Giggles = Play, Bloom = BloomLab, Wellbeing = Social Lab + Support, Work, and Events, with books, cafe/healthy meals, experts, institutions, and Family OS woven through the system.
- Moved consent/privacy into a subtle trust note near the bottom, keeping the no-diagnosis/no-therapy/no-emergency-support boundary.
- Added light Social Lab-specific styling in `assets/site.css`; no webapp, POS, payment, receipt, booking, or branch-terminal logic was changed.

Verification:

- `node -c assets/site.js` passed.
- `social-lab.html` JSON-LD parses correctly.
- `git diff --check` passed; only normal Windows LF/CRLF warnings were shown.
- Public Social Lab wording uses academic coordination / institutional-agreement language rather than partnership claims.

## 2026-06-07

### BloomLab Workshop Page Repositioning

- Rebuilt `workshops.html` around BloomLab as the non-play development/community workshop pillar: special workshops, structured series, parent/adult workshops, family/community sessions, and expert/organisation programmes.
- Kept the workshop slogan visible while clarifying that Play Workshops and Guided Play Moments belong with the Play page experience rather than the BloomLab page.
- Updated the public live programme feed so `workshops.html` filters out `play_guided_moment` and `play_workshop` sessions, using BloomLab-style fallback cards when no public BloomLab sessions are live yet.
- Adjusted `play.html` so the Play Workshop call-to-action stays in the play context and the BloomLab page is framed as non-play workshops/series.
- Added light BloomLab-specific visual rhythm in `assets/site.css`; no webapp, POS, payment, receipt, booking, or branch-terminal logic was changed.

Verification:

- `node -c assets/site.js` passed.
- `workshops.html` JSON-LD parses correctly.
- Static scan confirms the BloomLab page no longer contains the old play-workshop rate hooks or play-first programme-family headings.
- `git diff --check` passed; only normal Windows LF/CRLF warnings were shown.

## 2026-06-07

### Healthy Meals Public Copy Correction

- Restored the public Healthy Meals positioning on the homepage and Cafe page after founder clarification that G&B is actively working with reputable suppliers.
- Copy now mentions selected sugar-free, lower-sugar, healthy-substitute, gluten-free, and vegetarian options while retaining the allergen/cross-contact note.
- Kept the wording as "working with suppliers" rather than claiming every item is already available or coeliac-safe.

Verification:

- Public-site syntax and text checks passed.

## 2026-06-07

### Public Trust and Launch-Credibility Follow-up

- Applied the agreed public-site-only trust pass after the Claude/ChatGPT review.
- Removed the stale homepage `50+` workshop claim and softened the “new category/first in Istanbul” style positioning into safer family-third-space language.
- Kept Kurtköy copy in an open/phased-capacity wording: the branch is open, while early-week service availability remains subject to capacity, safety rules, staff availability, and daily programme.
- Softened cafe dietary claims so the public site does not promise gluten-free/coeliac-safe preparation.
- Updated static and dynamic membership fallback names to launch-safe family pass names.
- Added `cafe.html` as a redirect/fallback to the real Cafe/Food page so old links do not break.

Verification:

- `node -c assets/site.js` passes.
- Static scan found no high-risk public phrases from the current review list, including stale opening-date wording, `50+`, LEGO/Serious Play, first/guaranteed/clinical/dietary-risk phrases, or visible mojibake markers.
- Production still needs redeploy/live verification after push.

## 2026-06-07

### Public Handover Mojibake Audit

- Removed raw mojibake marker examples from older verification notes so future scans do not report false positives from the handover itself.
- No public HTML, CSS, JavaScript, SEO metadata, contact links, booking/payment logic, or app integrations were changed in this cleanup.

Verification:

- Repository-wide mojibake marker scan returns no matches in `C:/Codex/GB-Website/gb_site`.

## 2026-06-07

### Public Launch Copy, SEO, and Safety Boundary Pass

- Updated public launch copy so Kurtkoy is described as open, while Mini Play and daily activity availability remain subject to capacity, safety rules, and the daily programme.
- Removed or softened unsupported public claims around formal university partnership, "first in Turkey", 50+ workshop types, LEGO/LSP certification, autism/ADHD positioning, and Layer 3 proof language.
- Aligned `workshops.html` with the current operating taxonomy: Play Guided Moments, Play Workshops, Special Workshops, and Structured Series.
- Strengthened `wellbeing.html` with canonical/hreflang/social metadata and a clear non-emergency, non-clinical support boundary.
- Expanded `privacy.html` with clearer family, child, consent, payment, event request, and Social Lab data-use sections.
- Added a static membership-tier fallback so `membership.html` no longer shows only a spinner if the live membership API is slow or unavailable.
- Made the public app URL override-friendly in `assets/site.js` and updated `sitemap.xml` lastmod dates.
- No POS, payment, receipt, branch-terminal, booking, or webapp operational logic was changed.

Verification:

- Static scans for risky launch claims and visible mojibake markers passed.
- Public JS syntax, JSON-LD parse, and `git diff --check` passed.
- Production still needs redeploy/live verification after push.

## 2026-06-01

### Branch Social and Map Links

- Added the official branch Instagram handles to public contact/footer surfaces:
  - Kadikoy: `@gigglesandbloom.kadikoy`
  - Kurtkoy: `@gigglesandbloom.kurtkoy`
  - main business: `@gigglesandbloom`
- Added the founder-provided Google Maps links for Kadikoy and Kurtkoy to the shared footer/contact paths and dynamic branch cards/hours cards.
- Refined the footer so branch contact is shown as two compact branch rows with icon-style map/Instagram actions instead of a long list of plain links.
- Promoted branch map/Instagram links on `contact.html` into visible action cards.
- Updated homepage structured data so the Organization references the main and branch Instagram profiles, and each branch LocalBusiness includes its branch Instagram and map link.
- No phone number has been added yet; keep "coming soon" until the business channel is ready.

Verification:

- Public JS syntax check, homepage JSON-LD parse, and public-site `git diff --check` passed.

## 2026-06-01

### SEO, Icon, and Contact-Safe Launch Plumbing

- Added `robots.txt`, `sitemap.xml`, canonical/hreflang/social metadata to key pages, and a refreshed service worker cache list.
- Added interim `assets/brand-mark.svg`, `assets/favicon.svg`, and `assets/og-image.png` so previews/favicons no longer depend on the older raster logo.
- Added Organization/LocalBusiness structured data on the homepage for Kadikoy/Kurtkoy public search context without exposing personal phone numbers.
- Corrected the generated Turkish SEO metadata on touched pages where Windows shell encoding had written `?` placeholders.
- The clean official wordmark/Bloom Motif assets are still needed. The shared-drive logo photo is a social/circle lockup, not the production default logo.

Verification:

- Static source checks and webapp `npm run quality:check` are tracked in the main webapp handover for this same date.

## 2026-05-29

### Warmth Sprint V2 Public Polish

- Added the shared cozy card tokens to `assets/site.css`: cozy shadows, soft radius, organic feature-card radius, single brand accent, and warm hairline.
- Replaced the top homepage branch real-estate card with a warmer "Today at Giggles & Bloom" moment while keeping branch/location detail elsewhere on the page.
- De-rainbowed the homepage "Six things that set us apart" cards by removing per-card inline colour bars.
- Replaced the six feature-card emoji icons with mono line SVGs using `stroke-width="1.5"`.
- Added final CSS overrides for the `.diff-card`, `.dc-icon`, `.today-card`, and public card depth selectors so the late stylesheet polish wins consistently.
- No booking, payment, branch, event request, membership, tracking, or webapp operational logic was changed.

Verification:

- `node --check assets/site.js` passes.
- `git diff --check` passes.
- Local browser preview was blocked by the browser tool/extension, so visual confirmation should happen after redeploy.

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
- Basic mojibake marker scans return no public-site matches.

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

- A focused mojibake marker scan across `workshops.html` and `play.html` returns no matches.
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
  - what academic psychology coordination enables;
  - what Social Lab does: observation, expert translation, community circles, programme improvement, privacy, and collaboration;
  - Neighbourhood Circle / Mahalle Cemberi as a family-community format;
  - how Kurtkoy can act as a neighbourhood satellite while Kadikoy acts as the larger workshop/research/event hub;
  - benefits for families, children, experts, and the local community;
  - privacy, consent, child-safety, and parent-safety principles.
- Kept wording public-safe and avoided confidential corporate strategy detail.

Verification:

- `social-lab.html` parser check passes.
- Local links on `social-lab.html` resolve.
- `git diff --check` passes.
