# Fulshear Fencing Pros — Website

Static marketing site for **fulshearfencingpros.com**, hosted on GitHub Pages.
No server runtime — plain HTML/CSS/JS with a compiled Tailwind stylesheet.

---

## Tech stack
- **HTML** (one file per page) + **`css/styles.css`** (custom components) + **`css/tailwind.css`** (compiled utilities)
- **Tailwind CSS v3**, compiled to a static minified file (no CDN runtime)
- **`js/main.js`** — header, mobile menu, FAQ accordion, scroll reveal, Zapier form posting
- Fonts: DM Serif Display + DM Sans (Google Fonts, `display=swap`)
- Forms post to a **Zapier** Catch Hook; redirect to `thank-you.html`
- Analytics: **GA4** `G-KZR5XV2TNH`, **Meta Pixel** `2507394463024855`
- Phone (CallRail): **(832) 734-9878**

## Local development
```bash
npm install            # installs Tailwind + sharp (build-only)
npm run build:css      # compile css/tailwind.css (run after editing classes)
npm run watch:css      # rebuild on change while developing
npx http-server . -p 4173 -c-1   # preview at http://localhost:4173
```
> **Important:** after changing any Tailwind utility classes in HTML, re-run `npm run build:css` or the new classes won't be styled.

## Structure
```
/                     index.html + standard pages (about, contact, portfolio, service-area, thank-you, legal)
/services/            7 service pages (wood, cedar, privacy, chain-link, fence-repair, emergency-repair, gate)
/neighborhoods/       4 area pages (cross-creek-ranch, weston-lakes, fulbrook, cinco-ranch)
/assets/images/       optimized project photos (WebP + JPEG, root-relative refs)
/images/              logos + favicons
/css/, /src/          compiled + source CSS
/Stock Photos/        source photo originals (git-ignored, not deployed)
AUDIT.md              full code/SEO audit (Phase 1)
PHOTO-MAPPING.md      photo inventory → slot mapping
```

## What changed (June 2026 optimization)
See **AUDIT.md** (findings) and **PHOTO-MAPPING.md** (photos). Summary:
- Replaced the Tailwind CDN runtime compiler with a compiled static stylesheet (Core Web Vitals).
- Removed all fabricated trust signals (fake "4.9 stars / 52 reviews", `aggregateRating` schema, "top-rated").
- Titles ≤60 chars, meta descriptions 150–160, full OpenGraph + Twitter Cards on every page.
- Schema validated and matched to visible content (LocalBusiness, WebSite, BreadcrumbList, Service, FAQPage).
- Optimized favicon (1.3 MB → ~1 KB), preloaded LCP hero, lazy-loaded below-fold images.
- Integrated real project photos as WebP + JPEG `<picture>` with `width`/`height` + descriptive alt.
- **Removed the ornamental-iron offering entirely** (service page, nav, forms, schema, prose) per owner decision.

## ⚠️ Slots still needing real photos
- **Iron/ornamental** — offering removed; no action unless it's reintroduced later.
- **Vinyl** — mentioned in the homepage "Premium Materials" section (icon only, no photo). Add a real Texas vinyl photo if a Vinyl service page is created.
- The neighborhood pages (Cross Creek Ranch, Weston Lakes, Fulbrook, Cinco Ranch) use no in-body project photos yet — add real local job photos as they're collected.
- `images/logo-stacked.png` exists but is unused — available for a future branded OG image (currently OG uses a project photo).

## Pre-launch SEO checklist
- [ ] **Google Search Console** — verify the property, submit `sitemap.xml`, run the robots.txt tester (robots already allows all crawlers).
- [ ] **GA4** — confirm `G-KZR5XV2TNH` is the correct property and receiving events.
- [ ] **Meta Pixel** — confirm `2507394463024855` fires (PageView site-wide, Lead on `thank-you.html`).
- [ ] **Google Business Profile** — create/claim, match NAP exactly: *Fulshear Fencing Pros · Fulshear, TX 77441 · (832) 734-9878*. Add the GBP review link to the homepage testimonials section once live.
- [ ] **Real reviews** — replace the neutral "review pending" placeholders with real Google reviews; only then consider adding `aggregateRating` schema (must reflect real reviews).
- [ ] **Branded OG image** — optional 1200×630 card (currently OG uses a project photo).
- [ ] **CallRail** — confirm dynamic number insertion if used.

## Notes
- **Do not edit this repo from inside OneDrive** — it corrupts files on sync. This repo lives at `C:\Users\jacks\dev\fulshear-fencing-pros`.
- Image pipeline: source originals in `/Stock Photos/` → optimized with `sharp` into `/assets/images/` (JPEG q82 + WebP). Re-run a sharp script if adding photos.
