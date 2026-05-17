# SEO & Content Strategy Implementation Plan

This plan outlines the steps to implement the exact enterprise-grade technical SEO and content strategy used in `convert-all` into your `myloanmaster` application. 

## Goal Description
The objective is to transition `myloanmaster` from a Single-Page Application (SPA) with a single URL to a multi-page architecture with unique, indexable URLs for every tool and policy page. We will implement dynamic meta tags, targeted structured data (Schema.org), and an automated sitemap generation script, mirroring the successful `build_pages.js` strategy from `convert-all`. Finally, we will prepare the site for AdSense submission.

## User Review Required
> [!IMPORTANT]
> **React Router & Pre-rendering**: Since `myloanmaster` is built with React/Vite, we will install `react-router-dom` to handle navigation. To ensure Google bots can crawl the pages just like they do for standard HTML sites, I will create a Node.js post-build script (`build_seo.js`) that duplicates the built `index.html` for each route, injecting the correct SEO meta tags and stripping irrelevant JSON-LD schemas. Please approve adding `react-router-dom` and `react-helmet-async` as dependencies.

## Open Questions
> [!WARNING]
> **AdSense Publisher ID**: I noticed your `index.html` currently uses a placeholder `ca-pub-XXXXXXXXXXXXXXXX`. The `convert-all` app uses `pub-4267788472666268`. Do you want me to use the `4267788472666268` ID for `myloanmaster`'s AdSense integration and `ads.txt`, or do you have a different one for this specific app?

## Proposed Changes

### 1. Routing & Dependencies
- **Dependencies**: Install `react-router-dom` (for routing) and `react-helmet-async` (for dynamic `<head>` injection).
- **Refactor `App.tsx`**: Replace local state (`activeTab`) with `<BrowserRouter>` and `<Routes>`.

### 2. Page Components Extraction
Create dedicated pages to match the `convert-all` structure:
#### [NEW] `src/pages/Home.tsx`
#### [NEW] `src/pages/About.tsx`
#### [NEW] `src/pages/Contact.tsx`
#### [NEW] `src/pages/Privacy.tsx`
#### [NEW] `src/pages/Terms.tsx`
#### [NEW] `src/pages/calculators/*` (Individual routes like `/mortgage`, `/refinance`)

### 3. Schema Cleanup & Dynamic SEO
- Remove the massive global `FAQPage` and `HowTo` JSON-LD blocks from `index.html`.
- Create a reusable `<SEO>` component.
- **Home Page**: Gets the `FAQPage` schema.
- **Calculator Pages**: Each gets its specific `HowTo` schema and unique canonical URL.
- **Policy Pages**: Strip out FAQ/HowTo schemas entirely to avoid Google penalties (as done in `convert-all`).

### 4. Automated Build Script (`build_seo.js`)
#### [NEW] `build_seo.js` (Root directory)
- A Node script executed after `vite build` (e.g., `"build": "tsc -b && vite build && node build_seo.js"`).
- Generates physical `.html` files in the `dist` folder for every route (`dist/mortgage/index.html`, `dist/about/index.html`).
- Constructs a flawless `sitemap.xml` mapping all generated URLs with correct priorities (1.0 for home, 0.9 for tools, 0.8 for policy pages).

### 5. Static AdSense Assets
#### [NEW] `public/robots.txt`
- Standard allow-all policy with a direct link to the `sitemap.xml`.
#### [NEW] `public/ads.txt`
- Authorize your Google AdSense publisher ID.

## Verification Plan

### Automated Tests
- Run `npm run build` and verify that `dist/` contains folders for every route with their own `index.html`.
- Inspect the generated `dist/sitemap.xml` for correctness.

### Manual Verification
- Review the built `index.html` files to ensure `FAQPage` schema is ONLY on the homepage.
- Provide a step-by-step AdSense Submission Guide upon completion.
