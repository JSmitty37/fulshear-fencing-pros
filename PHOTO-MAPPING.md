# Photo Integration — Inventory & Slot Mapping

**Date:** 2026-06-13
**Source:** `Stock Photos/` (kept local, git-ignored) → optimized into `/assets/images/`
**Format:** every content photo ships as **WebP (primary) + JPEG (fallback)** via `<picture>`, with explicit `width`/`height` and descriptive alt text.

---

## A. Source inventory (all 20 files in `Stock Photos/`)

| File | Dimensions | Orientation | Shows | Decision |
|---|---|---|---|---|
| Image-from-iOS-50-scaled | 1280×960 | landscape | Natural cedar privacy fence, TX live oak | ✅ USED |
| Board-on-Board-Fence | 1280×588 | wide | Stained board-on-board cedar (rich brown) | ✅ USED |
| board-on-board-wood-fence | 960×1280 | portrait | Horizontal cedar w/ cap rail | ✅ USED |
| board-on-board-fence-picture-frame | 1280×960 | landscape | Natural cedar by pool | ✅ USED |
| BIG Cedar Fence | 1280×960 | landscape | Long cedar privacy run | ✅ USED |
| Chain Link | 960×1280 | portrait | Black chain-link, wooded | ✅ USED |
| Chain Link Gate | 960×1280 | portrait | Black chain-link gate | ✅ USED |
| 1.JPEG | 1200×900 | landscape | Black chain-link, backyard | ✅ USED |
| iron-gate-and-brick-pillars…utc | 6904×4608 | landscape | Iron gate + brick pillars (licensed **stock**) | ⚠️ USED (stock — see gap) |
| FL ALUMINUM 2 | 1280×960 | landscape | Aluminum pool fence, **palms (FL)** | ⛔ set aside (region/authenticity) |
| FL Vinyl fence | 1280×960 | landscape | White vinyl, **palms (FL)** | ⛔ set aside |
| FL VINYL GATE | 1280×960 | landscape | White vinyl gate, **palms (FL)** | ⛔ set aside |
| alumn-pool | 1280×856 | landscape | Aluminum pool fence (out-of-region) | ⛔ set aside |
| Black_Fence_3_1024x1024@2x | 1280×960 | landscape | Black wood fence (looks **catalog**) | ⛔ set aside |
| 73002356…New-Haven-Standard-Black | 1280×784 | landscape | Aluminum pool fence (**catalog SKU**) | ⛔ set aside |
| 23-how-to-stain-a-fence | 1280×853 | landscape | Dark-stained fence (**blog stock**) | ⛔ set aside |
| close-up-…picket…03-16 | 5088×4000 | landscape | (old generic stock) | ⛔ unused |
| close-up-…picket…03-17 | 6000×4000 | landscape | (old generic stock) | ⛔ unused |
| lawrence-krowdeed-…unsplash | 3047×2043 | landscape | (Unsplash stock) | ⛔ unused |
| wooden-fence-with-gate-…utc | 4180×2786 | landscape | (old generic stock) | ⛔ unused |

> The ⛔ set-aside photos match your earlier "authentic Texas photos only" decision (Florida palms, catalog/blog images, generic Unsplash).

---

## B. Used photos → SEO filename → slot → size

All output to `/assets/images/` (root-relative; works on every page depth). Logos stay in `/images/`.

| SEO filename | Dim | JPEG | WebP | Primary slot(s) | Alt (example) |
|---|---|---|---|---|---|
| cedar-privacy-fence-fulshear | 1280×960 | 290K | 236K (−19%) | **Hero (LCP)**, Cedar card, Projects | "Cedar privacy fence with gate in Fulshear TX residential neighborhood" |
| stained-cedar-board-on-board-fulshear | 1280×588 | 161K | 121K (−25%) | Wood card, Projects | "New wood fence installation in Fulshear TX backyard" |
| horizontal-cedar-fence-fulshear | 960×1280 | 357K | 321K (−10%) | Privacy card, Projects | "Cedar privacy fence against blue Texas sky in Fulshear" |
| cedar-board-on-board-pool-fulshear | 1280×960 | 272K | 203K (−25%) | Gate card, Projects | "Decorative residential gate and fence installation in Fort Bend County TX" |
| cedar-fence-installation-fulshear | 1280×960 | 320K | 291K (−9%) | Repair card, Why-Us image | "Cedar privacy fence installation crew in Fort Bend County TX" |
| chain-link-fence-fulshear | 960×1280 | 431K | 396K (−8%) | Chain-link page hero | "Black chain link fence installation in Fulshear TX" |
| chain-link-gate-fulshear | 960×1280 | 416K | 369K (−11%) | Chain-link / gate | "Black chain link gate installation in Fulshear TX" |
| black-chain-link-fence-fulshear | 1200×900 | 278K | 215K (−23%) | Chain-link / portfolio | "Black chain link fence in a Fulshear TX backyard" |
| ornamental-iron-fence-fulshear | 1700×1135 | 328K | 206K (−37%) | Iron card, Projects | "Ornamental iron fence and gate with brick pillars in Fulshear TX" |

---

## C. ⚠️ Slots with NO authentic photo (your call)

- **Ornamental Iron fence** (service card, iron service page hero, 2 project tiles): there is **no genuine company iron-fence photo** in the set. It currently uses a **licensed stock** image (`iron-gate-and-brick-pillars`). Options:
  1. **Keep the stock iron photo** (topically correct iron gate; what's there now).
  2. Use one of the set-aside **aluminum** photos (but they show Florida palms / look like catalog images).
  3. Swap to a clearly-commented placeholder until a real iron job is photographed.
- **Vinyl** is mentioned in homepage copy ("Premium Materials") but has **no on-brand photo** (only FL palm-tree vinyl). That section is icon-based (no photo slot), so no action needed unless you want a Vinyl service page later.

Everywhere a real authentic photo exists, it is used. No mismatched image was forced.

---

## D. Homepage changes applied (for checkpoint review)
- Hero background → `image-set()` WebP/JPEG; **LCP preload switched to WebP**.
- 13 content `<img>` → `<picture>` (WebP + JPEG fallback) with `width`/`height` + lazy-loading (hero stays eager via CSS bg).
- `picture { display: contents; }` added so wrappers don't affect layout (pixel-identical).
- Logos untouched (`/images/logo-horizontal.png`).
