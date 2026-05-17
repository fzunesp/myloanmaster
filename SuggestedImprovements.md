# MyLoanMaster — SEO Improvement Suggestions

> **Generated:** May 2, 2026  
> **Based on:** Comprehensive audit of `index.html`, `src/App.tsx`, `vite.config.ts`, `public/`, and all component files.

---

## P0 — Critical (Missing SEO Basics)

### 1. No `<h1>` Tag — CRITICAL

**Problem:** The entire page has zero `<h1>` elements. The header title is `<Title order={3}>` → `<h3>`. Calculator titles are also `<h3>`. Section headings are `<h2>`. Search engines have no primary topic signal.

**Fix in `src/App.tsx`:**
- Change header `<Title order={3}>` → `<Title order={1}>` to create the `<h1>`
- Change all calculator `<Title order={3}>` → `<Title order={2}>` for proper nesting (h1 → h2 → h3 hierarchy)

### 2. Missing `og:image` and `twitter:image`

**Problem:** No social sharing preview image. Shares to Facebook, Twitter, LinkedIn, Discord show no image — dramatically reducing click-through rate from social media.

**Fix in `index.html`:**
```html
<meta property="og:image" content="https://www.myloanmaster.com/icon-512.png" />
<meta name="twitter:image" content="https://www.myloanmaster.com/icon-512.png" />
```

### 3. No PWA Support

**Problem:** No `manifest.json`, service worker, or PWA icons. Misses the installability ranking signal and offline capability that Google uses for mobile rankings.

**Files to create/update:**
- `public/manifest.json` — PWA manifest (use convert-all prototype as template)
- `public/icon-192.png` — 192×192 app icon
- `public/icon-512.png` — 512×512 app icon
- `public/sw.js` — Service worker for offline caching of static assets
- `index.html` — Add:
  ```html
  <link rel="manifest" href="manifest.json" />
  <meta name="theme-color" content="#0B0D14" />
  <link rel="apple-touch-icon" href="icon-192.png" />
  ```

---

## P1 — High Priority (Performance + Technical SEO)

### 4. No Code Splitting — 1 MB JS Bundle

**Problem:** All 9 calculator components load in the initial JavaScript bundle (~1,020 KB). `recharts`, `html2canvas`, and all Mantine components are included up front, blocking rendering.

**Fix in `src/App.tsx`:**
```tsx
import { lazy, Suspense } from 'react';

const LoanCalculator = lazy(() => import('./components/LoanCalculator'));
const RetirementCalculator = lazy(() => import('./components/RetirementCalculator'));
// ... lazy-load all remaining calculators

// Wrap renderContent in <Suspense fallback={<LoadingSkeleton />}>
```

**Fix in `vite.config.ts` — manual chunk splitting:**
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        recharts: ['recharts'],
        html2canvas: ['html2canvas'],
        mantine: ['@mantine/core', '@mantine/hooks'],
      },
    },
  },
}
```

**Expected impact:** Critical path JS drops from ~1,020 KB to ~250 KB. Largest Contentful Paint (LCP) improves by 60-70%.

### 5. Missing Preconnect Hints

**Problem:** No early connection hints for external origins. The browser must discover and connect to AdSense and font domains during parsing, delaying resource loading.

**Fix in `index.html` — add to `<head>`:**
```html
<link rel="preconnect" href="https://pagead2.googlesyndication.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
```

### 6. Missing Semantic HTML Elements

**Problem:** Copyright is in a plain `<div>`. FAQ, About, Terms, Privacy sections are generic containers without semantic meaning for crawlers.

**Fix in `src/App.tsx`:**
- Wrap copyright in `<footer>` element
- Wrap FAQ, About, Terms of Service, Privacy Policy in `<section>` elements
- Add `aria-label` to each section for accessibility
- Consider wrapping calculator cards in `<article>` elements

---

## P2 — Medium Priority (Content + Structured Data)

### 7. Sitemap Has Only 1 URL

**Problem:** `public/sitemap.xml` lists only the homepage. A site with 9 calculators under-indexes its content for search engines.

**Options:**
- Use `vite-plugin-sitemap` to auto-generate with lastmod from build time
- Add hash-based or query-param URLs per calculator (`/#mortgage`, `/#retirement`, etc.)
- Add `<changefreq>` and calculator-specific `<priority>` values
- Add `<image:image>` tags for visual calculators

### 8. Missing BreadcrumbList JSON-LD

**Problem:** No breadcrumb schema for rich search results. Google uses this for breadcrumb display in SERPs.

**Fix — add to `index.html` or inject dynamically:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "MyLoanMaster", "item": "https://www.myloanmaster.com/" },
    { "@type": "ListItem", "position": 2, "name": "Mortgage Calculator", "item": "https://www.myloanmaster.com/#mortgage" }
  ]
}
```

### 9. Placeholder AdSense IDs

**Problem:** `ca-pub-XXXXXXXXXXXXXXXX` and ad slot placeholders (`1234567890`, `2345678901`, `3456789012`) are still in:
- `index.html` line 28 — AdSense script client ID
- `src/components/AdUnit.tsx` line 47 — `data-ad-client`
- `src/App.tsx` lines 69, 74, 179 — ad slot IDs
- `public/ads.txt` — publisher ID and verification hash

**Fix:** Replace all with real IDs from your Google AdSense dashboard.

### 10. Missing Service Worker

**Problem:** No `sw.js` for offline caching of static assets. The convert-all prototype already has one that can serve as a template.

**Fix:** Create `public/sw.js` with cache-first strategy for CSS/JS/fonts and network-first for the HTML shell. Register in `index.html` with an inline script at the end of `<body>`.

### 11. Remove Unused Template Assets

**Problem:** `src/assets/` contains unused files from the Vite template:
- `hero.png` — not referenced anywhere
- `react.svg` — not referenced anywhere
- `vite.svg` — not referenced anywhere

**Fix:** Delete these 3 files. They contribute to the asset directory weight and may confuse bundler analysis.

---

## P3 — Nice to Have (Future Enhancements)

### 12. WebApplication Schema Missing `image`

**Problem:** The `WebApplication` JSON-LD has no `image` field, missing an opportunity for a visual knowledge panel.

**Fix:** Add `"image": "https://www.myloanmaster.com/icon-512.png"` to the schema.

### 13. Individual SoftwareApplication Schemas

**Problem:** Each calculator could qualify for its own `SoftwareApplication` structured data (e.g., "Mortgage Calculator" as a SoftwareApplication), increasing rich-result eligibility.

**Fix:** Add per-calculator `SoftwareApplication` JSON-LD snippets injected client-side based on the active tab, or include all in `index.html`.

### 14. Dynamic `lastmod` in Sitemap

**Problem:** The `<lastmod>` date in `sitemap.xml` is hardcoded to `2026-05-02`. It will go stale and signal outdated content to crawlers.

**Fix:** Use `vite-plugin-sitemap` for auto-generation, or use a build-time script to insert the current date.

### 15. `hreflang` Tags for Multi-Language

**Problem:** If multi-language support is ever planned, no `hreflang` tags are present for content localization.

**Fix:** Add `<link rel="alternate" hreflang="en" href="https://www.myloanmaster.com/" />` and variants as needed.

### 16. `aggregateRating` Structured Data

**Problem:** The convert-all prototype includes `aggregateRating` (4.9 stars, 1240 reviews) in its `WebApplication` schema, which enables star-rich results. MyLoanMaster currently lacks this.

**Fix:** Only add if you have legitimate, verifiable reviews. Google penalizes fake ratings. If you collect genuine reviews, add `aggregateRating` to the `WebApplication` schema.

### 17. `<figure>` / `<figcaption>` for Data Visualizations

**Problem:** RingProgress charts and amortization visualizations lack semantic `<figure>` wrappers, missing an accessibility and SEO opportunity.

**Fix:** Wrap chart components in `<figure>` with `<figcaption>` describing the visualization (e.g., "Principal vs Interest breakdown for a $300,000 mortgage over 30 years").

---

## Bundle Size Impact Visualization

```
BEFORE (1 chunk):
┌─────────────────────────────────────────────────────────┐
│  index.js  1,020 KB  (React + Mantine + recharts +      │
│                         html2canvas + 9 calculators)     │
└─────────────────────────────────────────────────────────┘

AFTER (code-split):
┌──────────────────────────┐
│  shell.js   ~250 KB      │  ← critical path (React + Mantine + active calc)
├──────────────────────────┤
│  recharts.js  ~200 KB    │  ← lazy (Investment/Debt only)
├──────────────────────────┤
│  html2canvas.js ~100 KB  │  ← lazy (screenshot button)
├──────────────────────────┤
│  calcs-*.js   ~400 KB    │  ← lazy (remaining 8 calculators)
└──────────────────────────┘
  Total: ~950 KB, but only ~250 KB on critical path
```

---

## Implementation Priority & Effort Matrix

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| **P0** | Add `<h1>` heading | **Low** (3-line change) | **High** |
| **P0** | Add `og:image` / `twitter:image` | **Low** (2 new meta tags) | **High** |
| **P0** | Add PWA manifest + icons | **Medium** (new files + HTML) | **High** |
| **P1** | Code splitting (lazy load) | **Medium** (App.tsx + vite.config) | **Critical** |
| **P1** | Preconnect hints | **Low** (3 link tags) | **Medium** |
| **P1** | Semantic HTML | **Low** (wrap in sections) | **Medium** |
| **P2** | Expand sitemap | **Low** (XML update or plugin) | **Medium** |
| **P2** | BreadcrumbList schema | **Low** (JSON-LD snippet) | **Medium** |
| **P2** | Replace placeholder AdSense IDs | **Low** (4 search-replace) | **Medium** |
| **P2** | Service worker | **Medium** (new file + registration) | **Medium** |
| **P2** | Remove unused assets | **Low** (delete 3 files) | **Low** |
| **P3** | SoftwareApplication schemas | **Medium** (per-calc JSON-LD) | **Medium** |
| **P3** | Dynamic sitemap lastmod | **Low** (build script or plugin) | **Low** |
| **P3** | `hreflang` tags | **Low** (1 link tag) | **Low** |
| **P3** | `aggregateRating` | **Low** (JSON-LD field) | **Medium** |
| **P3** | `<figure>` wrappers | **Medium** (wrap chart components) | **Low** |
