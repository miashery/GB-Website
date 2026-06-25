# Codex Handover Log

This is the living handover file for public website changes made by Codex after the Claude limit/freeze period. Keep adding dated entries here before handing work back to Claude or another assistant.

## 2026-06-25 - Claude redesign styling alignment

Scope: public website visual design language only. No backend, booking, payment, event request endpoint, schema migration, or form payload changes.

- Reviewed `C:\Codex\giggles-bloom-redesign\HANDOFF.md` and the 11 `.dc.html` reference designs as visual specs, not drop-in production code.
- Copied Claude redesign assets into `assets/redesign/` without overwriting the existing public-site assets.
- Updated `assets/site.css` to use the redesign palette, typography, card radii, button treatments, header/footer treatment, form fields, hero/section tints, and responsive spacing across the existing static pages.
- Updated `assets/site.js` to swap the visible header brand image to `assets/redesign/logo-wordmark.png` at runtime and align existing `theme-color` meta tags to the new blue.
- Updated `manifest.webmanifest` colours to the redesign cream/blue and bumped `sw.js` from `gb-public-v17` to `gb-public-v18`; the new wordmark is now cached by the service worker.
- Adjusted the homepage first-viewport copy from parent-specific wording to more inclusive adult/grown-up wording, while leaving the broader SEO/content terminology audit for a dedicated pass.

### Homepage hybrid follow-up

- Refined the homepage after founder screenshot review: do not clone Claude's page structure wholesale.
- Kept the current site's strength of early branch information and live branch-card replacement.
- Borrowed selected Claude strengths: slim blue announcement strip, small photo accents inside the first-screen branch cards, calmer full-width section bands, a blue membership band, and a softer pink "Join our community" CTA card.
- Bumped `sw.js` from `gb-public-v18` to `gb-public-v19` so returning visitors pick up the hybrid homepage.
- Verification: `node --check assets/site.js`, `node --check sw.js`, local reference check, and desktop/mobile homepage render smoke passed.

### Homepage screenshot refinement follow-up

- Removed the white Kadıköy stats strip from the homepage.
- Tightened first-viewport hero spacing and removed the top hero branch photos so the main headline starts higher while the two branch cards remain visible.
- Fixed the header `Join` button contrast to pure white text.
- Replaced repeated exterior photos in `Our Spaces` with interior Claude redesign photos (`inside-cafe`, `inside-books`, `inside-play`).
- Added a small explanatory intro card to the `Five worlds` section and made those section links quieter text-style links.
- Rebuilt the Family OS block with an actual blue feature panel instead of a blank decorative panel.
- Updated `Come visit` cards and live-rendered branch cards with phone, Google Maps, and Instagram links; added the shared phone to the footer.
- Expanded the shared footer sentence to: "We exist to lighten the invisible load. A warm, trust-first third space for families."
- Bumped `sw.js` from `gb-public-v19` to `gb-public-v20`.
- Verification: `node --check assets/site.js`, `node --check sw.js`, `git diff --check`, and desktop/mobile Playwright homepage smoke passed with mocked live branch data.

### Menu and inner-page styling follow-up

- Expanded the shared public navigation source of truth to include all primary public pages: Home, Play, BloomLab, Community, Support, Events, Work, Books, Café, Membership, Contact, Kadıköy, and Kurtköy.
- Fixed existing hard-coded mobile drawers so they resync from the shared nav list instead of keeping stale/missing page links.
- Added a medium-width breakpoint so the full menu moves into the hamburger drawer instead of silently cropping.
- Added shared inner-page styling alignment so non-home pages use the same warmer redesign typography, card, hero, section, and button treatment.
- Bumped `sw.js` from `gb-public-v20` to `gb-public-v21`.
- Verification: `node --check assets/site.js`, `node --check sw.js`, `git diff --check`, and desktop/medium-width Playwright menu smoke passed across 13 public pages.

### Founder screenshot correction follow-up

- Corrected the desktop header to the Claude-style compact navigation set: Play, BloomLab, Community, Café & Books, Membership, and Visit. The separate Home link is intentionally removed because the logo is the home action.
- Kept the fuller page list in the mobile drawer so Support, Events, Work, Books, Café, Kadıköy, and Kurtköy are still reachable on smaller screens.
- Corrected the homepage hero word colours: `breathe` stays blue, `grow` is pink, and `Together, in one place` is a softer grey.
- Added page mood classes and shared CSS tokens for page-specific top gradients/accent words. Play now uses the blue/teal mood and BloomLab the lavender/purple mood shown in the Claude references; the other public pages now also have a concise coloured headline phrase that follows the same system.
- Bumped `sw.js` from `gb-public-v21` to `gb-public-v23`.
- Verification: `node --check assets/site.js`, `node --check sw.js`, `git diff --check`, corrected local reference check, and focused desktop/mobile Playwright smoke passed for the homepage navigation/hero colours, fuller mobile drawer, and coloured gradient/accent treatment across the themed public pages.

### Visit and branch map follow-up

- Added responsive lazy-loaded Google Maps embeds to the Visit page for Kadıköy and Kurtköy, while keeping direct Google Maps buttons as fallback actions.
- Added matching embedded map sections to `kadikoy.html` and `kurtkoy.html` after opening hours.
- Added shared map-card CSS so the maps match the redesign card language and stack cleanly on mobile.
- Bumped `sw.js` from `gb-public-v23` to `gb-public-v24`.
- Verification: `node --check assets/site.js`, `node --check sw.js`, `git diff --check`, local reference check, and focused desktop/mobile map embed smoke passed for Visit, Kadıköy, and Kurtköy.

### Visit phone correction

- Replaced the stale `Phone: Coming soon` text in the Visit page branch cards with `(+90) 0 553 345 65 67` as a tap-to-call link.
- Bumped `sw.js` from `gb-public-v24` to `gb-public-v25`.

### Selective public photo placement

- Used a small number of already-curated public-site marketing assets rather than adding every newly shared photo.
- Added the branded espresso photo to the Cafe page hero, the Kurtkoy bookshelves photo to the Library page hero, and the Kurtkoy bookshop/mini-play interior photo to the Kurtkoy branch hero and social preview image.
- Left duplicate and lower-resolution cafe/table photos unused for now.
- Bumped `sw.js` from `gb-public-v25` to `gb-public-v26`.
- Verification: `node --check assets/site.js`, `node --check sw.js`, `git diff --check`, local reference check (`checked=349`), and Chrome desktop/mobile smoke passed for Cafe, Library, and Kurtkoy image rendering with no horizontal overflow. Local browser blocked external fonts/API calls as expected under network restrictions.

Still pending:

- Replace the temporary/low-resolution Claude logo with a founder-approved high-quality logo file when available.
- Decide whether to rebuild each page structurally from the `.dc.html` designs, or continue applying the design system incrementally to the current static pages.
- Complete a broader wording audit for parent/guardian/couple assumptions across the public site and the webapp.
- Live UAT after deployment: header logo, mobile nav, event request form, dynamic feed/menu sections, language toggle, and service-worker refresh on returning devices.

## 2026-06-23 - Event request canonical taxonomy

Scope: public website event request dropdown only; no layout, SEO, payment, booking, or schema work in this repo.

- Updated `events.html` request-type options to send the Event System v2 canonical values used by the webapp (`family_celebration`, `engagement_celebration`, `private_hire`, `school_group_visit`, `corporate_family_event`, `partner_institution_event`, `member_only_event`, `invite_only_custom_group`) while keeping `workshop_request` as an enquiry/programme-planning option.
- Bumped `sw.js` from `gb-public-v16` to `gb-public-v17` so returning devices pick up the dropdown after deployment.
- Requires the main webapp SQL migration `20260623120000_event_system_v2_foundation.sql` before relying on canonical request inserts in production.

## 2026-06-22 — Deep Review Pass 4: Nav, Colour, Flow & Text Fixes (Claude)

Scope: Two user-flagged visual regressions from Pass 3 fixed, plus full flow/text review with targeted copy improvements and data consistency fixes. No layout changes.

### What changed

**`assets/site.css`:**
- Removed the v15 `.btn:not(...)` button hierarchy override — it was wrong. The v9 sage fill on secondary `.btn` elements is intentional design (coral > sage > teal creates the visual hierarchy). Reverting it restores warm sage colour to hero buttons, world card secondary links, and all contextual CTAs.
- Kept `--radius-lg`, `@media (scripting: none)`, and `@media (prefers-reduced-motion)`.

**`assets/site.js`:**
- NAV_ITEMS: removed "Ana Sayfa" (brand logo links home, it was redundant), shortened long labels: "Giggles: Oyun" → "Oyun", "Topluluk & Destek" → "Topluluk", "İş & Etkinlikler" → "Etkinlikler", "Kafe & Restoran" → "Kafe", "Ziyaret" → "İletişim". Result: 10 short-label items that fit without overflow.

**`index.html`:**
- Stats row: "4 Program Ailesi" → "5 Deneyim Alanı" (now matches "Beş dünya" section heading)
- Kurtköy hero card: removed outdated "ilk haftalarda" (first weeks) caveat; now says what is open every day vs what follows the programme
- "İş & Etkinlikler" world card: removed B2B language (B2B atölyeler, kurum iş birlikleri, kurumsal aile günleri); replaced with family-first copy
- Diff card 2: removed "ekipler" (teams) — corporate language on a family card
- JSON-LD hours: Kadıköy → Mon–Fri 09:00–20:00 / Sat 09:00–21:00 / Sun 10:00–19:00; Kurtköy → Mon–Fri 09:00–19:00 / Sat 09:00–20:00 / Sun 10:00–18:00

**`kadikoy.html`:**
- Visible hours section: corrected (Mon–Fri 09:00–20:00, Sat 09:00–21:00, Sun 10:00–19:00)
- LocalBusiness JSON-LD + FAQ JSON-LD + visible FAQ: all hours updated to match

**`kurtkoy.html`:**
- Visible hours section: corrected (Mon–Fri 09:00–19:00, Sat 09:00–20:00, Sun 10:00–18:00)
- LocalBusiness JSON-LD + FAQ JSON-LD + visible FAQ: all hours updated to match

**`sw.js`**: bumped to gb-public-v16

### Still pending (not changed)

- "Today at G&B" card: hardcoded "14:20 · Kadıköy" — aspirational placeholder, can be made dynamic
- "Açılış notu" testimonial cards are brand promises, not real reviews — needs real testimonials when available
- `📱` emoji in Family OS teaser: inconsistent with SVG icon approach elsewhere
- Footer "Kurumsal" links (Hakkımızda, İş Modeli, Ortaklar) all point to contact.html — an about/vision page would be better
- Phone number still missing from LocalBusiness schema (founder action needed)

---

## 2026-06-22 — Deep Review Pass 3: Structure, Design & UX Fixes (Claude)

Scope: CSS bugs, button visual hierarchy, JS navigation, accessibility, performance hints, and opening hours display. No page layout rebuilt, no copy changed, no backend touched.

### What changed

**CSS bug fixes (`assets/site.css`):**
- `--radius-lg: 24px` added to `:root` — this variable was used by `.home-centres` (homepage branch section) but never defined, causing the section to render with no border-radius (square corners). Now rounded.
- Button hierarchy restored: v9 CSS pass had overridden ALL `.btn` elements to sage-filled, making secondary buttons visually identical to primary ones. Added `.btn:not(.btn-p):not(.btn-primary):not(.btn-coral):not(.btn-gold):not(.btn-white):not(.btn-join)` rule to restore outline/secondary appearance for bare `.btn` buttons.
- Added `@media (scripting: none) { .fi { opacity: 1; transform: none } }` — all content sections start with `opacity: 0` via `.fi` class; without this, JS-disabled visitors see a completely blank page.
- Added `@media (prefers-reduced-motion: reduce)` — `.fi` fade-in animations now respect system accessibility setting.

**Navigation fix (`assets/site.js`):**
- Added `kadikoy.html` and `kurtkoy.html` as explicit NAV_ITEMS entries. Previously, branch pages had NO link in the desktop nav or mobile nav drawer — users could only find them from the homepage branch section. Removed `kadikoy.html`/`kurtkoy.html` from contact's `activeFor` since they now have their own entries.

**Homepage fixes (`index.html`):**
- Added `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` — fonts were loaded via CSS `@import` with no preconnect, delaying first meaningful paint.
- Fixed hero branch badge: "Kurtköy — Uydu Şube" → "Kurtköy Şubesi" (consistent with kurtkoy.html fix).
- Added `datetime="14:20"` attribute to `<time>` element in hero (semantic correctness).

**Opening hours display (`kadikoy.html`, `kurtkoy.html`):**
- Added visible opening hours section using existing `.hours-grid` / `.hours-card` CSS (those classes were defined but unused on the public site). Shown before the capacity section. Weekdays 09:00–19:30, weekends 10:00–20:00.

**Technical:**
- `sw.js`: cache bumped from gb-public-v14 to gb-public-v15

### What still needs fixing

- The `<time>` element on the homepage hero has a hardcoded time "14:20" — should eventually show real opening status (open/closed based on current time).
- The branch selector on the homepage uses `<div>` where `<section>` would be more semantic.
- The `@import` for Google Fonts in site.css could be moved to a `<link>` tag on all pages for better performance, but requires editing every HTML file.
- Phone number still missing from LocalBusiness schema (founder action required).

---

## 2026-06-22 — Deep Review Pass 2: Branch Pages & CTR Fixes (Claude)

Scope: branch page titles, LocalBusiness schema enrichment, FAQ additions, internal cross-linking, and remaining meta fixes. No page copy, layout, CSS, JavaScript, booking/payment flows, or app integrations changed.

### What changed

**Branch page title fixes (critical — both pages had English-only titles):**
- `kadikoy.html`: title changed from "Kadıköy Flagship Family Centre" to "Giggles & Bloom Kadıköy | Çocuk Oyun Alanı, BloomLab Atölyeleri ve Aile Merkezi"
- `kadikoy.html`: description rewritten to be parent-facing ("Çocuklar oynarken ebeveynler nefes alır")
- `kadikoy.html`: hero badge TR text changed from "Kadıköy Flagship" to "Kadıköy Ana Merkezi"
- `kurtkoy.html`: title changed from "Kurtköy Healthy Family Lifestyle Satellite" to "Giggles & Bloom Kurtköy | Çocuk Kitapçısı, Sağlıklı Aile Kafesi ve Mini Oyun"
- `kurtkoy.html`: hero badge TR text changed from "Kurtköy Satellite" to "Kurtköy Şubesi"

**Opening hours added to LocalBusiness JSON-LD (strong local pack signal):**
- `kadikoy.html`: openingHoursSpecification added (weekdays 09:00–19:30, weekends 10:00–20:00)
- `kurtkoy.html`: openingHoursSpecification added (same hours)
- `index.html`: openingHoursSpecification added to both LocalBusiness entries in homepage schema

**FAQ sections added to branch pages (rich result + content signal):**
- `kadikoy.html`: FAQ JSON-LD (4 Q&A) in head + visible 4-card FAQ section before </main>
- `kurtkoy.html`: FAQ JSON-LD (4 Q&A) in head + visible 4-card FAQ section before </main>

**Internal cross-linking (orphan page fix):**
- `play.html`: added "Kadıköy şubesi hakkında →" and "Kurtköy şubesi hakkında →" links inside branch model cards. Previously no page linked to kadikoy.html or kurtkoy.html.

**Other CTR fixes:**
- `workspaces.html`: title changed from "Çalışma Alanı ve Aile Dostu Cowork" to "Çocuğunuz Oynarken Siz Çalışın | Ebeveyn Çalışma Alanı"; description removed B2B language ("kurum iş birlikleri")
- `library.html`: description improved with CTA hook ("Doğru kitabı, doğru anda bulun")

**Technical:**
- `sw.js`: cache version bumped from gb-public-v13 to gb-public-v14

### Verification required

- Deploy with `vercel --prod` from `GB-Website\gb_site\`.
- Check Google Search Console in 4–6 weeks; kadikoy.html and kurtkoy.html should start ranking for Turkish queries ("Kadıköy aile merkezi", "Kurtköy çocuk kitapçısı").
- Confirm FAQ sections render in both TR and EN modes on both branch pages.
- Verify kadikoy.html in Google's Rich Results Test for FAQ and LocalBusiness schema.

### What still needs fixing

- Phone number missing from all LocalBusiness schemas (blocked until founder provides it)
- Exact street address missing from branch page schemas
- Google Business Profile not linked — biggest remaining local SEO gap
- 11 not-found URLs from prior GSC coverage report not yet investigated

---

## 2026-06-22 — SEO & Vision Alignment Pass (Claude)

Scope: meta tags, structured data, and founder-vision positioning. No page copy, layout, CSS, JavaScript, public forms, backend calls, booking/payment flows, or app integrations changed.

### What changed

**CTR fixes (all zero-click pages that had impressions in GSC):**
- `play.html`: new description leading with age range + safety + invitation; replaced operational "ekip destekli, kapasite kontrollü" language
- `contact.html`: new title ("Aile Merkezi | Üyelik, Rezervasyon & İletişim") and description — old title started with "İletişim" which caused skips for service intent queries
- `food.html`: new description leading with "çocuk dostu aile kafesi" and practical value
- `membership.html`: new description stating "5 farklı paket, aylık faturalandırma, haklar devretmez"
- `workshops.html`: new description centred on BloomLab + location + small group
- `events.html`: title reordered to lead with "Doğum Günü Organizasyonu" (birthday is the high-intent query); JSON-LD service name updated to match

**FAQ rich result additions (JSON-LD + visible sections):**
- `play.html`: 4 Q&A pairs (age, booking, price, drop-off policy) — visible FAQ section added before `</main>` + matching JSON-LD in head
- `workshops.html`: 4 Q&A pairs (audience, booking, BloomLab vs play, branches) — same pattern
- `membership.html`: 4 Q&A pairs (purchase, rollover, branch scope, member-only programmes) — JSON-LD in head + minified visible FAQ section added

**Founder vision alignment (Play + Bloom + Wellbeing = third place):**
- `index.html`: title updated to include "Aile Merkezi — Oyun, Gelişim ve Ebeveyn Desteği"; description rewritten to lead with third-place concept ("çocuklar oynar ve büyür, ebeveynler nefes alır ve destek bulur") and includes "Ebeveyn desteği" as a named service
- `wellbeing.html`: title and description completely rewritten — old version led with disclaimer ("Acil destek değildir") which was the worst possible first impression. New version leads with the human need: "Ebeveynlik bazen yalnız hissettiriyor" and targets "ebeveyn desteği kadıköy" intent queries
- `social-lab.html`: removed institutional/research language ("psikolojik güvenlik", "iş birliği odaklı"); replaced with warm community framing ("bağ kurmak, öğrenmek ve birbirini desteklemek")

**Technical:**
- `sitemap.xml`: all lastmod values updated to 2026-06-22
- `sw.js`: cache version bumped from gb-public-v12 to gb-public-v13

### Verification required

- Deploy with `vercel --prod`.
- In a private browser window, search "Giggles Bloom Kadıköy" and confirm updated title/description appear in snippets (may take 1–4 weeks for Google to re-crawl).
- Open each edited page and confirm FAQ sections render correctly in both TR and EN modes.
- Check Google Search Console in 4–6 weeks for CTR improvement on play.html, contact.html, food.html.

### What this does NOT fix yet

- Phone number and exact address missing from LocalBusiness schema (blocked until founder provides business phone)
- Google Business Profile not linked — biggest local SEO gap remaining
- The site needs 1-2 new editorial pages to capture discovery queries: a dedicated birthday party page and a parenting support / FAQ resource page would each unlock new keyword clusters

## 2026-06-18

### Branch Cafe Highlight Filter

- Added a branch filter to the live cafe highlights on `food.html`: All branches, Kadikoy, and Kurtkoy.
- The filter uses the existing public menu data and branch-owned menu rows; it does not add ordering, payments, delivery, stock changes, or backend schema.
- Families can now separate visible cafe highlights by branch instead of reading a mixed list with only per-card branch badges.
- Bumped the service-worker cache from `gb-public-v11` to `gb-public-v12` so returning devices pick up the updated cafe JavaScript/CSS after deployment.

Verification required:

- Deploy with `vercel --prod`.
- Open `https://www.gigglesbloom.com/food.html`, switch Turkish/English, and confirm All/Kadikoy/Kurtkoy filters show the expected live item counts and cards.

### Public Header Stability Guard

- Added a final CSS guard that forces the public website header/navigation to stay in normal document flow, with no sticky/fixed transform behavior. This targets tablet/full-page screenshot cases where the header could appear stitched through the middle of the page.
- Bumped the service-worker cache from `gb-public-v10` to `gb-public-v11` so returning devices pick up the corrected public CSS after deployment.
- Refreshed `sitemap.xml` `lastmod` values to `2026-06-18` because the shared public chrome changed across all public pages.
- No public copy, forms, booking/payment flows, webapp backend, POS/Beko, or customer portal logic changed in this pass.

Verification required:

- Deploy with `vercel --prod`.
- Hard-refresh or clear site data on affected tablets, then check Home, Play, BloomLab, Cafe, Membership, and Visit for header placement while scrolling.
- If a long screenshot still shows the header in the middle, treat it as a browser screenshot stitching artifact and verify by normal scrolling/video capture.

## 2026-06-17

### Branch-Specific Cafe Menu Clarity

- Added a branch-specific menu/stock explanation to `food.html`, clarifying that Kadıköy and Kurtköy have separate stock, sales, VAT, and legal-entity records.
- Added Kadıköy/Kurtköy branch rhythm cards so the public café page no longer implies both branches always carry the same items.
- Updated the live cafe highlights renderer to show a compact branch scope badge on each menu item when branch data is available, with a safe branch-varying fallback.
- Bumped the service-worker cache from `gb-public-v9` to `gb-public-v10` so returning devices pick up `food.html`, `assets/site.js`, and `assets/site.css` changes after deployment.

Verification required:

- Run local syntax/link checks.
- Deploy with `vercel --prod`.
- Live-check `https://www.gigglesbloom.com/food.html` in Turkish and English and confirm live menu cards show branch scope cleanly.

### Search Console Coverage Follow-Up

- Reviewed the founder-provided 2026-06-16 Search Console coverage export. The export only included grouped issue counts, not the affected URLs:
  - 11 not found;
  - 1 soft 404;
  - 1 page with redirect;
  - 1 alternate page with proper canonical;
  - 4 crawled, currently not indexed.
- Ran a local static HTML link check and found no missing local `href` or `src` targets in the public-site source.
- Refreshed `sitemap.xml` `lastmod` values to `2026-06-17`.
- Bumped the service-worker cache from `gb-public-v8` to `gb-public-v9` so returning devices pick up the refreshed public assets.

Still required:

- Deploy with `vercel --prod`.
- Resubmit or validate the sitemap in Google Search Console.
- If the 404/soft-404 count remains, export the affected URL list from Search Console because the summary CSV is not enough to identify which addresses Google is holding onto.

## 2026-06-16

### Public Navigation Stability

- Hardened the public-site shared header so the old per-page static menu does not visibly flash before `assets/site.js` normalizes it into the current canonical public navigation.
- Moved header normalization to the first DOM-ready step, then marks the nav as ready after the canonical order/labels/active state are applied.
- Added a small CSS reserve/opacity rule so the top navigation holds its space and fades in once normalized, with a no-script fallback.
- No page URLs, SEO canonicals, sitemap entries, public forms, backend calls, booking/payment flows, or app integrations changed in this pass.

Verification completed:

- `node --check assets/site.js` passed.
- Diff reviewed for `assets/site.js` and `assets/site.css`.

Still required:

- Commit, push, deploy with `vercel --prod`, then live-check the top menu on Home, Play, BloomLab, Work & Events, Books, Cafe, Membership, and Visit.

## 2026-06-09

### Analytics and SEO URL Parity

- Normalized public-site SEO URLs to the live production domain `https://www.gigglesbloom.com` across canonical, hreflang, OpenGraph, Twitter, JSON-LD, `robots.txt`, and `sitemap.xml` references.
- Refreshed `sitemap.xml` `lastmod` values to `2026-06-09`.
- Strengthened `library.html` metadata for local children’s bookstore/library search intent around Kadıköy, Kurtköy, children’s books, library, reading pods, lending, and author days.
- Strengthened `workspaces.html` metadata for family-friendly workspace/cowork search intent, including Kadıköy 8-person and Kurtköy 4-person capacity.
- Kept the existing Vercel Web Analytics static-site script pattern; no forms, booking, payment, app integration, or backend logic changed.

Verification completed:

- Confirmed no stale `gigglesandbloom.com` or bare `https://gigglesbloom.com` URLs remain in the public-site source.
- Confirmed `robots.txt` is plain UTF-8 without a BOM after the URL rewrite.

Still required:

- Commit, push, deploy with `vercel --prod`, then live-check Vercel Analytics, `robots.txt`, `sitemap.xml`, and page source for Library/Workspace canonicals.

## 2026-06-08

### Public Pillar Detail and Capacity Follow-Up

- Deepened the previous public-site IA pass after founder review noted that important practical details were too thin.
- Follow-up refinement moved the workspace/cafe-working proposition to the top of the Work & Events page, while keeping `workspaces.html` as the deeper detail page.
- Added a public branch-capacity snapshot on the homepage:
  - Kadıköy: play 8 children, play workshop 6, BloomLab 8, workspace 8 stations;
  - Kurtköy: mini play 4 children, play workshop 5, BloomLab 5, workspace 4 points.
- Added clearer capacity and branch-flow notes to Play, BloomLab Workshops, Workspace, Events, and Contact/Visit.
- Updated Work & Events metadata/structured description so the page includes family-friendly workspace as well as birthdays, private hire, school/group visits, corporate family days, author days, and partner events.
- Made the homepage pillar cards link to the right paired pages where a pillar contains two public paths, such as Workspace + Events, Social Lab + Support, and Library + Café.
- Kept this as public-site copy/structure only; no webapp backend, payment, booking, Supabase, POS, or staff-terminal logic changed.

Verification completed:

- `assets/site.js` syntax check passed.
- JSON-LD parse check passed for static HTML pages.
- Local relative-link scan passed.
- Launch-claim scan found no blocked overpromise markers from the current review list.

Still required:

- Redeploy `GB-Website` and live-check production after commit.

### Public Website Information Architecture Alignment

- Reviewed the founder/ChatGPT public-site architecture direction and kept the change public-site-only.
- Updated the shared runtime navigation to the clearer public structure:
  - Home;
  - Giggles: Play;
  - BloomLab;
  - Community & Support;
  - Work & Events;
  - Books & Café;
  - Membership;
  - Visit.
- Preserved the existing dynamic public-site feeds and rate hooks; no webapp backend, POS, payment, workshop backend, membership backend, Supabase schema, or customer portal logic was changed.
- Reframed homepage copy around the public promise: G&B as a warm family third place where children play and grow while parents breathe, work, connect and feel supported.
- Simplified the homepage service map into the clarified public pillars while keeping branch details, books/café, institutions/partners, and Family OS woven in as supporting context.
- Softened public Social Lab and Family OS homepage language so the site does not lead with research-heavy, clinical, or overpromised platform wording.
- Updated Play, BloomLab, Events, and Workspace copy to make the pillar/sub-offering boundaries clearer:
  - Giggle Garden / Giggle Sparks / Giggle Minis live on Play;
  - BloomLab Special Workshops / BloomLab Series / Bloom Circles live on BloomLab;
  - private, corporate/business, public, and member/restricted events live under Work & Events;
  - Workspace is treated as the parent-work side of the Work pillar.

Verification completed in this handover:

- `assets/site.js` syntax check passed.
- JSON-LD parse check passed for static HTML pages.
- Local relative-link scan passed.
- Launch-claim scan found no blocked overpromise markers from the current review list.
- `git diff --check` passed.
- Redeploy `GB-Website` and spot-check production navigation/header behavior after commit.

## 2026-06-07

### Social Lab Pillar Reframing

- Rebuilt `social-lab.html` so the page leads with normal, everyday social wellbeing rather than consent/research warnings.
- Positioned Social Lab as the networking and collaboration side of the Wellbeing pillar, separate from the private Support / Knowledge Centre flow on `wellbeing.html`.
- Added the active academic coordination wording for Üsküdar University Psychology Department coordinator and academics, explicitly avoiding signed-agreement or partnership claims.
- Follow-up refinement aligned the hero with founder/ChatGPT wording: Social Lab is for ordinary families and communities, with no labelling or research-subject tone.
- Added a near-top benefits row for families, children, parents, community, and experts, so the value is visible before privacy mechanics.
- Added a clearer G&B pillar map: Giggles = Play, Bloom = BloomLab, Wellbeing = Social Lab + Support, Work, and Events, with books, cafe/healthy meals, experts, institutions, and Family OS woven through the system.
- Moved consent/privacy into a subtle trust note near the bottom with clear consent-led, child-safe, parent-safe language.
- Added light Social Lab-specific styling in `assets/site.css`; no webapp, POS, payment, receipt, booking, or branch-terminal logic was changed.

Verification:

- `node -c assets/site.js` passed.
- `social-lab.html` JSON-LD parses correctly.
- `git diff --check` passed; only normal Windows LF/CRLF warnings were shown.
- Public Social Lab wording uses academic coordination / institutional-agreement language rather than partnership claims.
- Follow-up scan confirms `social-lab.html` has no visible partnership claim, clinical wording, or research-subject wording.

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

### Public Website: Branch Selector and Branch Guide Pages

- Added a warm homepage branch selector so families can choose between:
  - Kadıköy as the flagship family development centre;
  - Kurtköy as the cozy healthy family lifestyle satellite.
- Added `kadikoy.html` with:
  - Kadıköy flagship positioning;
  - play, BloomLab, workspace, books, events, and membership pathways;
  - capacity notes for play, play workshops, BloomLab, and workspace;
  - map, Instagram, visit, and event request CTAs.
- Added `kurtkoy.html` with:
  - Kurtköy satellite positioning;
  - healthy cafe, books, mini play, selected workshops, workspace, Neighbour Circle, and birthday/private request pathways;
  - capacity notes for mini play, play workshops, BloomLab, and work points;
  - map, Instagram, visit, and event request CTAs.
- Updated shared navigation so branch pages sit under `Visit` without adding more top-menu clutter.
- Updated shared footer so Kadıköy and Kurtköy labels link to their branch guide pages while keeping Map and Instagram shortcuts.
- Updated `sitemap.xml` and `sw.js` so the branch pages are crawlable and cached.
- Kept this public-site-only: no backend, schema, POS, Beko, PayTR, Paraşüt, Daily Close, membership entitlement, Bloom Points, delivery, or partner/off-premises logic changed.

Verification:

- `node --check assets/site.js` passes.
- HTML sanity check passes for `index.html`, `kadikoy.html`, and `kurtkoy.html`.
- Local relative-link scan passes for the touched public pages.
- `git diff --check` passes, aside from normal Windows LF/CRLF warnings.
- Still needs live visual/UAT after production deploy: desktop, mobile, language toggle, branch CTAs, Google Maps links, Instagram links, and service-worker refresh.

### Public Website: Static Header Screenshot/Tablet Hardening

- Reviewed founder screenshots from 2026-06-15.
- Found the visible header appearing through the middle of long page screenshots; this is consistent with a sticky/blurred public header being captured during full-page screenshot stitching and can also feel jumpy on some browsers.
- Changed the public website header from sticky/translucent/blurred to static and solid cream.
- Bumped the service-worker cache from `gb-public-v7` to `gb-public-v8` so the updated CSS is picked up after deploy.
- Sitemap did not need a URL change for this CSS-only pass; branch pages are already listed.

Verification:

- `node --check assets/site.js` passes.
- Local link scan passes for all 16 public HTML pages, with Vercel Analytics treated as a platform path.
- `git diff --check` passes, aside from normal Windows LF/CRLF warnings.
