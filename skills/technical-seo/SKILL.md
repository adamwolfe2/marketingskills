---
name: technical-seo
description: "When the user wants to implement technical SEO improvements — Core Web Vitals, page speed, crawl budget, hreflang, canonicalization, structured data implementation, mobile optimization, or indexation fixes. Also use when the user mentions 'Core Web Vitals,' 'LCP,' 'CLS,' 'INP,' 'FID,' 'page speed,' 'crawl budget,' 'XML sitemap,' 'robots.txt,' 'hreflang,' 'canonical tags,' 'redirect chains,' 'log file analysis,' 'technical SEO fixes,' 'site speed,' 'render blocking,' 'lazy loading,' 'JavaScript SEO,' or 'indexation issues.' Use this for implementing technical fixes after diagnosing issues with seo-audit. For AI search optimization, see ai-seo. For structured data markup, see schema-markup. For page structure and URLs, see site-architecture."
metadata:
  version: 1.0.0
---

# Technical SEO

You are a technical SEO engineer. Your goal is to implement the fixes that make a site crawlable, fast, indexable, and structured in a way that maximizes search engine visibility.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Current State
- What's the tech stack? (Next.js, WordPress, Webflow, custom)
- Do you have Google Search Console access? What errors does it show?
- What are the Core Web Vitals scores? (PageSpeed Insights)
- Is this a new implementation or fixing existing issues?

### 2. Priority Issues
- What's the primary goal? (Speed, indexation, international, structured data)
- Any known issues? (Pages not indexed, redirect problems, slow LCP)

### 3. Site Characteristics
- Static or server-rendered?
- JavaScript-heavy?
- Multi-language / multi-region?
- E-commerce, blog, SaaS, or local business?

---

## Core Web Vitals

### The Three Signals That Matter for Ranking

| Metric | What It Measures | Good | Needs Work | Poor |
|--------|-----------------|------|------------|------|
| **LCP** (Largest Contentful Paint) | Loading speed of main content | ≤2.5s | 2.5–4s | >4s |
| **INP** (Interaction to Next Paint) | Response to user interaction | ≤200ms | 200–500ms | >500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | ≤0.1 | 0.1–0.25 | >0.25 |

**How to check**: PageSpeed Insights → run on your most important page (homepage, pricing, key landing page).

### LCP Fixes (Most Common)

**1. Preload the LCP image**
```html
<link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high">
```

**2. Add `fetchpriority="high"` to the LCP image**
```html
<img src="/hero.webp" fetchpriority="high" alt="..." width="1200" height="630">
```

**3. Convert images to WebP/AVIF**
- WebP: ~30% smaller than JPEG, ~80% smaller than PNG
- AVIF: ~50% smaller than WebP (browser support now excellent)

**4. Use a CDN with edge caching**
- Cloudflare, Fastly, AWS CloudFront
- Critical for users far from your server

**5. Eliminate render-blocking resources**
```html
<!-- Bad: blocks rendering -->
<link rel="stylesheet" href="/styles.css">
<script src="/app.js"></script>

<!-- Good: non-blocking -->
<link rel="stylesheet" href="/critical.css">
<link rel="preload" href="/styles.css" as="style" onload="this.rel='stylesheet'">
<script src="/app.js" defer></script>
```

**6. Server response time (TTFB)**
- Target: <800ms TTFB
- Fix: CDN, server upgrade, caching headers, database query optimization

### CLS Fixes (Most Common)

**1. Set explicit dimensions on all images and embeds**
```html
<!-- Bad: no dimensions causes layout shift when image loads -->
<img src="/product.jpg" alt="Product">

<!-- Good: browser reserves space before image loads -->
<img src="/product.jpg" alt="Product" width="800" height="600">
```

**2. Reserve space for ads and embeds**
```css
.ad-container {
  min-height: 250px; /* Reserve space before ad loads */
}
```

**3. Avoid injecting content above existing content**
- Banners, cookie notices, and notification bars added dynamically cause CLS
- Render server-side or pre-reserve space

**4. Font loading — prevent FOIT/FOUT**
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: optional; /* Never shows unstyled text */
}
```

### INP Fixes

- Break up long JavaScript tasks into smaller chunks
- Use `requestIdleCallback()` for non-critical work
- Defer non-critical third-party scripts
- Reduce DOM size (target <800 nodes)

---

## Crawl Budget & Indexation

### What Crawl Budget Is

Search engine bots have a finite number of pages they'll crawl per day. Wasting crawl budget on low-value pages means important pages get crawled less often.

**Crawl budget matters more when:**
- Site has 10,000+ pages (especially programmatic SEO)
- Large e-commerce catalog
- Frequent content updates
- Poor server response times

### robots.txt

Controls what crawlers can access. Place at `yourdomain.com/robots.txt`.

```
User-agent: *
Allow: /

# AI bots — allow for citation, block for training only
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

# Block training-only crawlers
User-agent: CCBot
Disallow: /

# Block internal/low-value paths
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/
Disallow: /account/
Disallow: /search?*
Disallow: /*?sort=*
Disallow: /*?filter=*

Sitemap: https://yourdomain.com/sitemap.xml
```

**Key rules:**
- `Disallow: /` blocks everything; `Allow: /` allows everything
- Parameter-based URLs (`?sort=`, `?filter=`) often duplicate content — block them
- Cart, checkout, account pages: block (no SEO value, privacy concerns)
- Always include your sitemap URL

### XML Sitemap

Your sitemap tells search engines what pages exist and when they were last updated.

**Sitemap structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-03-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/pricing</loc>
    <lastmod>2026-02-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

**Sitemap checklist:**
- [ ] Only include indexable pages (no noindex, no 404, no redirects)
- [ ] Keep each sitemap under 50,000 URLs or 50MB
- [ ] Use sitemap index for large sites
- [ ] Reference in robots.txt: `Sitemap: https://yourdomain.com/sitemap.xml`
- [ ] Submit to Google Search Console
- [ ] Auto-generate — don't maintain manually

**Sitemap index (for large sites):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-products.xml</loc>
  </sitemap>
</sitemapindex>
```

### Canonical Tags

Canonical tags tell search engines which URL is the "official" version when multiple URLs have the same or similar content.

```html
<!-- On every page, self-referencing canonical -->
<link rel="canonical" href="https://example.com/blog/seo-guide">

<!-- On paginated pages, point to the first page -->
<link rel="canonical" href="https://example.com/blog">

<!-- On parameter variations, point to clean URL -->
<!-- URL: /products?color=blue → canonical: /products/blue-widget -->
<link rel="canonical" href="https://example.com/products/blue-widget">
```

**Common canonical mistakes:**
- Canonical pointing to wrong URL
- Missing canonical on paginated pages
- HTTP and HTTPS versions without canonical
- www vs non-www without canonical
- Trailing slash inconsistency (`/page` vs `/page/`)

### Redirect Management

| Redirect Type | Status Code | Use Case |
|--------------|-------------|----------|
| Permanent redirect | 301 | Page permanently moved — passes link equity |
| Temporary redirect | 302 | Page temporarily at new location |
| Gone | 410 | Page permanently deleted — faster de-indexing than 404 |

**Redirect chain detection:**
```
Bad: A → B → C → D (3 hops)
Good: A → D (1 hop, direct)
```

Fix redirect chains by updating A to point directly to D. Each hop slows page load and can dilute link equity.

---

## International SEO (hreflang)

For multi-language or multi-region sites.

### hreflang Implementation

Place in `<head>` of every language/region variant:

```html
<!-- English (global) -->
<link rel="alternate" hreflang="en" href="https://example.com/page">

<!-- English (US) -->
<link rel="alternate" hreflang="en-us" href="https://example.com/us/page">

<!-- French (France) -->
<link rel="alternate" hreflang="fr-fr" href="https://example.com/fr/page">

<!-- Default fallback -->
<link rel="alternate" hreflang="x-default" href="https://example.com/page">
```

**Rules:**
- Must be bidirectional — every page must reference all its alternates, including itself
- Use ISO 639-1 language codes (`en`, `fr`, `de`) and ISO 3166-1 country codes (`US`, `FR`, `DE`)
- `x-default` specifies the fallback for users in unlisted regions
- Can also implement via XML sitemap or HTTP headers

**URL structure options:**
- `example.com/fr/` — subfolder (recommended)
- `fr.example.com/` — subdomain
- `example.fr` — ccTLD (strongest geo-signal, hardest to maintain)

---

## JavaScript SEO

For single-page apps (React, Next.js, Vue, Angular).

### The Problem

Googlebot crawls JavaScript but renders it separately (with delay). Content that requires JavaScript to render may not be indexed as quickly or reliably.

### Solutions by Framework

**Next.js (App Router)** — Server-side rendering by default
```jsx
// Server Component (rendered server-side — no JS SEO issues)
export default async function Page() {
  const data = await fetchData()
  return <div>{data.content}</div>
}
```

**Next.js — Force static generation for SEO-critical pages**
```jsx
export const dynamic = 'force-static'
```

**React / Vue — Use SSR or SSG**
- Next.js (React), Nuxt (Vue), SvelteKit (Svelte)
- Or: Prerender.io, Rendertron for client-side apps

**Verify rendering**: Use Google Search Console → URL Inspection → "View Tested Page" → "Screenshot" tab. What Googlebot sees = what gets indexed.

### Dynamic Content That Needs to Be Indexed

- Lazy-loaded content: ensure it loads without user interaction
- Content behind tabs/accordions: include in initial HTML
- Infinite scroll: consider pagination with `<link rel="next">` for older browsers or provide an index

---

## Meta Tags Checklist

Every page needs these:

```html
<head>
  <!-- Title: 50-60 chars, include primary keyword -->
  <title>Marketing Skills for AI Agents | Agent Skills Library</title>

  <!-- Meta description: 150-160 chars, include CTA -->
  <meta name="description" content="32 AI agent skills for conversion optimization, SEO, copywriting, email, and growth engineering. Works with Claude Code, Cursor, and any agent.">

  <!-- Canonical -->
  <link rel="canonical" href="https://example.com/page">

  <!-- Open Graph (social sharing) -->
  <meta property="og:title" content="Marketing Skills for AI Agents">
  <meta property="og:description" content="32 AI agent skills for conversion optimization, SEO, copywriting, and growth.">
  <meta property="og:image" content="https://example.com/og-image.png">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Marketing Skills for AI Agents">
  <meta name="twitter:description" content="32 AI agent skills for conversion optimization, SEO, copywriting, and growth.">
  <meta name="twitter:image" content="https://example.com/og-image.png">

  <!-- Viewport (mobile) -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

---

## Technical SEO Audit Checklist

### Crawlability
- [ ] robots.txt exists and is correct
- [ ] Sitemap submitted to Google Search Console
- [ ] No important pages blocked by robots.txt
- [ ] No critical pages set to `noindex`
- [ ] Internal links use absolute or correct relative URLs

### Speed (Core Web Vitals)
- [ ] LCP ≤2.5s (PageSpeed Insights)
- [ ] INP ≤200ms
- [ ] CLS ≤0.1
- [ ] Images have explicit width/height attributes
- [ ] Hero images preloaded with `fetchpriority="high"`
- [ ] Images served in WebP/AVIF
- [ ] Render-blocking CSS/JS eliminated
- [ ] CDN in place for static assets

### Indexation
- [ ] All important pages have self-referencing canonicals
- [ ] No redirect chains (max 1 hop)
- [ ] No 404 pages linked internally
- [ ] Paginated pages handled correctly

### Structure
- [ ] Title tags: 50-60 chars, unique per page
- [ ] Meta descriptions: 150-160 chars, unique per page
- [ ] H1: one per page, matches page topic
- [ ] Heading hierarchy logical (H1 → H2 → H3)
- [ ] Schema markup on key page types

### Mobile
- [ ] Viewport meta tag set
- [ ] Tap targets ≥48px
- [ ] No horizontal scroll on mobile
- [ ] Fonts legible at 16px+

---

## Tool Integrations

| Tool | Use For |
|------|---------|
| `google-search-console` | Indexation errors, Core Web Vitals, sitemaps |
| `dataforseo` | Bulk technical audits, SERP data |
| `semrush` | Site audits, crawl issues |
| `ahrefs` | Site audit, crawl budget analysis |
| `ga4` | Page speed impact on bounce rate |

---

## Task-Specific Questions

1. What tech stack is the site built on?
2. What does PageSpeed Insights show for your key pages?
3. What errors are showing in Google Search Console?
4. Is the site single-language or multi-language?
5. Are there indexation issues (pages not showing in Google)?
6. How large is the site (approximate page count)?

---

## Related Skills

- **seo-audit**: For diagnosing SEO issues before implementing fixes
- **schema-markup**: For structured data implementation
- **site-architecture**: For URL structure, canonical hierarchy, and sitemap planning
- **ai-seo**: For optimizing content for AI search engines
- **programmatic-seo**: For technical implementation of scaled page generation
