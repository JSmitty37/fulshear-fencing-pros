# Fulshear Fencing Pros — Code, Scaffolding & SEO Audit

**Date:** 2026-06-13
**Scope:** All 20 HTML pages, CSS, JS, robots.txt, sitemap.xml, image assets
**Method:** Full read-only crawl + automated checks (links, images, meta, schema, headings, asset weight)

---

## ✅ What's already correct (no action needed)

- **Zero broken internal links** and **zero broken images** across all 20 pages. The old "Gate Installation card rendering alt text" bug is gone — every `<img src>` resolves to a real file.
- **Exactly one `<h1>` per page**, all with city + keyword.
- **Canonical tag on every page.**
- **Schema matches visible content** on service & neighborhood pages: every page with a visible FAQ accordion also has `FAQPage` schema; service pages have `Service` + `BreadcrumbList`; neighborhoods have `LocalBusiness` + `Place` + `BreadcrumbList`.
- **Homepage schema** is clean: `LocalBusiness`/`HomeAndConstructionBusiness` (NAP, hours, areaServed, **no `aggregateRating`**), `WebSite`, `BreadcrumbList`, `FAQPage`.
- **Mobile sticky call/quote bar** present (`#mobile-sticky-cta`) on all pages.
- **robots.txt is correctly configured** on `origin/main` (what GitHub Pages serves): `Allow: /`, sitemap referenced, only `/thank-you.html` disallowed (correct — it's a conversion page). See note in HIGH-2.
- Fonts already load with `&display=swap` + `preconnect`.
- Forms post to Zapier; privacy policy names Zapier as processor.

---

## 🔴 HIGH IMPACT (fix first — ranking + policy risk)

### H1 — Fabricated reviews still live on 6 pages ⚠️ (policy + trust violation)
The earlier cleanup only touched `index.html`. These still contain fake **"★★★★★ 4.9 stars · 52 reviews"**:
| Page | Visible fake rating | Fake `aggregateRating` schema |
|---|---|---|
| `about.html` | line 166 | **YES — line 18 (`ratingValue 4.9 / reviewCount 52`)** |
| `contact.html` | line 198 | no |
| `neighborhoods/cross-creek-ranch.html` | line 218 | no |
| `neighborhoods/cinco-ranch.html` | line 230 | no |
| `neighborhoods/fulbrook.html` | line 215 | no |
| `neighborhoods/weston-lakes.html` | line 235 | no |

`about.html`'s `aggregateRating` schema is the most serious — it violates Google's structured-data policy (ratings must reflect real, collected reviews) and can trigger a manual action. **Remove all six**, replace with the neutral "collecting reviews" treatment already used on the homepage.

### H2 — "Top-rated" claim implies ratings we don't have
`index.html` meta description, `og:description`, and `twitter:description` all open with **"Top-rated fence contractor…"**. With no reviews, this is a fabricated trust signal. Reword to a neutral, keyword-rich value prop (e.g., "Licensed cedar, wood & iron fencing…").
*Also:* the homepage's 3 placeholder testimonial cards show **5 filled gold stars** directly above "Review pending" text (lines 797/811/825) — visually implies a 5-star review. Make the stars neutral/empty until real reviews exist.

### H3 — Tailwind loaded via CDN runtime compiler on every page (Core Web Vitals killer)
Every page loads `https://cdn.tailwindcss.com`. This ships a ~400KB+ JS bundle that **compiles CSS in the browser at runtime** — Tailwind's own docs say *"not designed for production."* Impact:
- **Render-blocking** → slow First Contentful Paint / LCP
- **Layout shift (CLS)** as styles inject after first paint
- Extra main-thread work → worse INP
**Fix:** compile a static, minified Tailwind stylesheet (build once with the Tailwind CLI) and ship it as a real `.css` file; drop the CDN `<script>`. Keep the existing `tailwind.config` tokens so the design is byte-for-byte preserved.

### H4 — LCP hero image not preloaded; favicon is 1.3 MB
- The homepage hero is a **CSS `background-image`** (`cedar-privacy-fence-fulshear.jpg`, 347 KB). Because it's in CSS, the browser discovers it late → delayed LCP. **Preload it** (`<link rel="preload" as="image">`) and consider `fetchpriority`.
- **`logo-icon.png` = 1.3 MB** is used as both `favicon` and `apple-touch-icon` on **every page** — a 1.3 MB favicon download site-wide. Replace with a small optimized icon (e.g. 32×32 favicon + 180×180 apple-touch, ~5–20 KB).

---

## 🟠 MEDIUM IMPACT

### M1 — Titles exceed 60 characters on 16 pages
Google truncates ~60 chars. Lengths now:
`weston-lakes 87 · cinco-ranch 86 · emergency-repair 85 · cross-creek 84 · gate 82 · iron 78 · privacy-fence 78 · fence-repair 77 · cedar 76 · chain-link 76 · service-area 75 · fulbrook 70 · index 69 · portfolio 66 · about 64 · contact 63`. (Only `wood` 59 is in range.) Trim each to ≤60 while keeping city + primary keyword.

### M2 — Meta descriptions over 160 chars on ~14 pages
Worst: `cedar 193`, `cinco-ranch 177`, `chain-link 176`, `iron 173`, `contact 172`, `portfolio/emergency 171`, `fulbrook/fence-repair 170`. Tighten to 150–160 and ensure each carries a CTA. (Utility pages `privacy-policy 117`, `terms 111`, `thank-you 143` are fine.)

### M3 — Twitter Card tags missing on 17 of 20 pages
Only `index.html` and `portfolio.html` have `twitter:card`. Add full Twitter Card + complete OpenGraph to all content pages. `privacy-policy.html`, `terms.html`, `thank-you.html` are missing OG entirely too.

### M4 — Images lack explicit `width`/`height` (CLS risk)
No content image carries intrinsic `width`/`height` attributes (the only matches are the 1×1 tracking pixel). CSS fixed heights partially mitigate, but explicit dimensions (or `aspect-ratio`) are needed to fully prevent layout shift — and the brief requires them. Add to every `<img>` during Phase 3.

### M5 — Below-the-fold images not consistently lazy-loaded
`about.html` (3 imgs, 0 lazy), all 4 neighborhood pages, `service-area.html`, and the utility pages load 0 lazy images. Above-fold logos should stay eager, but any below-fold content image should be `loading="lazy"`.

### M6 — Image payloads not in next-gen format
Photos are 194–562 KB JPEG. Phase 3 calls for **WebP with `<picture>` JPEG fallback** — will cut ~30–40% off image weight. `logo-horizontal.png` (247 KB) loads on every page and could be optimized too.

---

## 🟡 LOW IMPACT (polish)

- **L1 — Heading-level skips.** Footer column headers are `<h4>` right after a section `<h2>` (skip 2→4) on nearly every page; homepage hero `<h1>` is followed by the form card `<h3>` before the first `<h2>` (skip 1→3). Minor a11y; normalize footer headings to `<h3>`/non-heading and demote the form-card heading.
- **L2 — Footer fine-print contrast.** `text-white/40`–`/50` on `#0E1F17` and the gray "Review pending" text may fall below WCAG AA 4.5:1. Bump opacity/contrast.
- **L3 — Dead code / unused assets.** Testimonial-carousel JS in `main.js` (homepage now uses static cards) and its `.testimonial-*` CSS are unused; `logo-stacked.png` (234 KB) is committed but referenced nowhere; GTM placeholder is commented out (harmless). Remove the dead JS/asset.
- **L4 — `og:image` is a raw landscape photo**, not a 1200×630 branded card. Functional but not ideal for social previews.
- **L5 — Utility pages lack schema** (`privacy-policy`, `terms`, `thank-you`) — optional `WebPage`/`BreadcrumbList` for completeness.
- **L6 — Unminified CSS/JS** (`styles.css`, `main.js`) — small; minify during build for marginal gains.

---

## 📋 Per-page snapshot

| Page | Title len | Desc len | H1 | Canon | OG | TW | Schema | Fake rating |
|---|---|---|---|---|---|---|---|---|
| index.html | 69 | 164 | 1 | ✓ | ✓ | ✓ | LB/Web/BC/FAQ | "Top-rated" + star icons |
| about.html | 64 | 166 | 1 | ✓ | ✓ | ✗ | LB | **★ 4.9/52 + schema** |
| contact.html | 63 | 172 | 1 | ✓ | ✓ | ✗ | LB | **★ 4.9/52** |
| service-area.html | 75 | 166 | 1 | ✓ | ✓ | ✗ | LB | — |
| portfolio.html | 66 | 171 | 1 | ✓ | ✓ | ✓ | BC/Gallery | — |
| services/* (8) | 59–85 | 158–193 | 1 | ✓ | ✓ | ✗ | Service/LB/FAQ/BC | — |
| neighborhoods/* (4) | 70–87 | 158–177 | 1 | ✓ | ✓ | ✗ | LB/Place/FAQ/BC | **★ 4.9/52** |
| privacy-policy / terms / thank-you | 33–40 | 111–143 | 1 | ✓ | ✗ | ✗ | none | — |

---

## Notes for Phase 2/3
- **robots.txt:** the deployed file already allows all crawlers. I could not re-fetch the live URL from this environment (transient connection reset), so **verify in Google Search Console's robots tester after the next deploy** — but no change is required in the repo.
- **Design preservation:** every fix above is non-visual except removing fake ratings and neutralizing stars. The Tailwind change compiles the *same* utility classes to static CSS — pixel-identical output.
- **Photos:** Phase 3 will move images to `/assets/images/`, add WebP + dimensions + lazy, and re-point all references.

**[CHECKPOINT]** — Review this before I begin fixing in Phase 2.
