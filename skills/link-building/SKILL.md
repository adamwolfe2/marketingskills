---
name: link-building
description: "When the user wants to build backlinks, increase domain authority, or develop a link acquisition strategy. Also use when the user mentions 'link building,' 'backlinks,' 'domain authority,' 'DA,' 'DR,' 'link outreach,' 'HARO,' 'digital PR,' 'link-worthy content,' 'guest posting,' 'broken link building,' 'resource pages,' 'unlinked brand mentions,' 'link prospecting,' 'anchor text strategy,' 'toxic backlinks,' 'disavow,' 'link velocity,' or 'earning links.' Use this whenever someone wants more sites linking to them. For on-page SEO issues, see seo-audit. For content that earns links, see content-strategy."
metadata:
  version: 1.0.0
---

# Link Building

You are a link building strategist. Your goal is to help acquire high-quality backlinks that improve domain authority, rankings, and referral traffic — without risking Google penalties.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Current State
- What's the current Domain Rating (DR) or Domain Authority (DA)?
- How many referring domains does the site have?
- What's the primary keyword target / niche?
- Any existing backlink profile issues? (manual penalties, toxic links)

### 2. Resources
- Is there a budget for digital PR or content production?
- How many hours/week can go toward outreach?
- Any existing relationships with publishers, journalists, or industry sites?

### 3. Goals
- Improve ranking for specific keywords?
- Build general domain authority?
- Target a specific DR/DA threshold?

---

## How Links Work

### Why Links Matter

Backlinks are still one of Google's top 3 ranking factors. A link from another site is a vote of confidence. Not all votes are equal:

| Link Factor | High Value | Low Value |
|-------------|-----------|-----------|
| Domain authority | DR 50+ sites | DR <20 sites |
| Relevance | Same or related niche | Unrelated niche |
| Placement | Editorial, in body copy | Footer, sidebar |
| Anchor text | Descriptive, natural | Generic ("click here") |
| Link type | Dofollow | Nofollow (still some value) |
| Traffic | Site has real visitors | Zero-traffic site |

### Link Velocity

Build links at a natural pace. Sudden spikes can trigger Google scrutiny.
- New sites: start slow (5-10 links/month)
- Established sites: maintain steady growth
- Avoid: buying links in bulk, link schemes, PBNs

---

## The Six Best Link Building Strategies

### 1. Digital PR + Original Data

**Best for:** High-authority links from news, industry publications, trade press

Original research and data gets cited. Create:
- Annual surveys ("State of X" reports)
- Proprietary data analysis (from your user base, if applicable)
- Industry benchmarks and statistics
- First-of-kind research in your niche

**Process:**
1. Design study and collect data
2. Write research report with key findings
3. Create a standalone page (e.g., `/state-of-marketing-2026`)
4. Pitch to journalists and publications as a data source
5. Distribute via HARO (Help a Reporter Out), Connectively, or direct outreach

**Realistic targets:** 5-20 high-DA links per campaign, often from publications with DR 60-90+

### 2. HARO / Source Requests

**Best for:** Links from major publications (Forbes, Inc, TechCrunch, Entrepreneur)

Journalists ask for expert sources — you respond, they quote you and link to your site.

**Platforms:**
- **Connectively** (formerly HARO): https://www.connectively.us
- **Qwoted**: https://www.qwoted.com
- **SourceBottle**: https://www.sourcebottle.com
- **JournoRequests** (Twitter/X)

**How to win at HARO:**
- Respond within 2 hours of request (journalists work on deadline)
- Match their exact question directly in the first sentence
- Include a specific data point or stat in your answer
- Keep it to 2-4 short paragraphs
- Include your name, title, and company in the signature

### 3. Skyscraper / Content-Based Link Earning

**Best for:** Long-term link magnets in your niche

Find content with lots of links → create something significantly better → reach out to those linking to the original.

**Process:**
1. Find a page with 20+ backlinks in your niche (Ahrefs Content Explorer)
2. Audit what's missing: outdated stats, shallow coverage, poor UX
3. Create a definitive, more comprehensive version
4. Prospect every site linking to the original
5. Email: "You linked to [original]. We just published [better version] — thought it might be worth a mention."

**Success rate:** 5-10% response rate, 1-3% link rate is good

### 4. Broken Link Building

**Best for:** Quick wins, scalable prospecting

Find broken links (404s) on authoritative pages → offer your content as the replacement.

**Process:**
1. Find resource pages in your niche: `[niche] resources` or `[niche] links` in Google
2. Run through Ahrefs / Check My Links Chrome extension
3. Find broken links pointing to dead content
4. Check if you have (or can create) a replacement
5. Email: "I found a broken link on your [page]. [Your content] is a good replacement."

### 5. Unlinked Brand Mentions

**Best for:** Low-effort, high-conversion (they already like you)

Find sites that mention your brand without linking → ask them to add the link.

**Process:**
1. In Ahrefs: "Mentions" tab → search brand name → filter to no-link mentions
2. Or use Google Alerts for brand name
3. Email: "Thanks for mentioning [Brand]! Would you mind adding a link to [URL]?"
4. High conversion rate because they already know and like you

### 6. Guest Posting

**Best for:** Building relationships and editorial links in your niche

Write content for other sites in exchange for a link.

**Finding opportunities:**
- Google: `[niche] "write for us"` or `[niche] "contribute"`
- Ahrefs: Find sites competitors have guest-posted on
- Direct relationships with publications you read

**Guest post guidelines:**
- Pitch their readers, not your product
- Offer unique angles, original data, or perspectives they can't get elsewhere
- Link to your site from a relevant, editorial mention (not a promotional line)
- Target DR 40+ sites in your niche
- Avoid: guest post farms, sites with no editorial standards, over-optimized anchor text

---

## Anchor Text Strategy

Anchor text distribution should look natural:

| Anchor Type | Example | Target % |
|------------|---------|---------|
| Branded | "Acme Corp" | 30-40% |
| Branded + keyword | "Acme Corp SEO tools" | 10-15% |
| Exact match keyword | "SEO tools" | 5-10% (less is more) |
| Partial match | "the best SEO tools" | 10-20% |
| Generic | "click here," "this article" | 10-15% |
| Naked URL | `example.com/seo-tools` | 10-15% |

**Over-optimized anchor text** (too many exact-match anchors) is a strong Google spam signal. Keep exact-match anchors under 10%.

---

## Outreach Templates

### Template 1: Resource Page Request

```
Subject: Quick resource suggestion for [page title]

Hi [Name],

Found your [page title] while researching [topic] — really thorough resource.

I noticed you link to [similar resource]. We recently published [your resource] at [URL], which covers [what makes it different/better].

Would it be worth adding to your list?

[Name]
[Title], [Company]
```

### Template 2: Broken Link Replacement

```
Subject: Broken link on [page title]

Hi [Name],

I came across your [page title] page while researching [topic]. Noticed that [link to broken page] returns a 404 now.

We have [your content] at [URL] that covers the same topic — might be a good replacement.

Either way, hope the heads-up is helpful!

[Name]
```

### Template 3: Unlinked Mention

```
Subject: Quick note re: your [publication] mention

Hi [Name],

Saw that [publication] mentioned [Brand] in [article title] — really appreciated the kind words!

Any chance you could add a link to [URL] when you mention us? Makes it easier for your readers to find us.

Thanks either way — great piece.

[Name], [Brand]
```

---

## Toxic Links & Disavow

### When to Disavow

Only disavow links if:
- You have a Google manual penalty for unnatural links
- You know you (or a previous SEO) built spammy links
- A large portion of your link profile is clearly manipulative

**Do NOT disavow:**
- Low-authority links (just low-value, not harmful)
- Nofollow links (Google ignores these already)
- Links from irrelevant sites (usually fine)

### Disavow File Format

```
# Disavow file - [date]
# Removing links from known spam networks

domain:spammydomain.com
domain:pbn-network.com
https://specificpage.com/specific-link
```

Submit via Google Search Console → Links → Disavow.

---

## Measurement

| Metric | Tool | Target |
|--------|------|--------|
| Domain Rating (DR) | Ahrefs | Track month-over-month |
| Referring domains | Ahrefs, GSC | Steady growth |
| New backlinks / month | Ahrefs | Consistent, not spiking |
| Anchor text distribution | Ahrefs | Natural mix (see above) |
| Ranking improvements | GSC, Semrush | Correlate with DR gains |

---

## Common Mistakes

- **Buying links**: Almost always a bad idea. Google's SpamBrain catches most paid links
- **Link farms / PBNs**: Short-term gains, severe long-term penalties
- **Only targeting DR**: A DR 30 site in your exact niche often beats a DR 80 unrelated site
- **Ignoring existing mentions**: Unlinked mentions are the lowest-hanging fruit
- **Quantity over quality**: 5 links from DR 60+ niche sites > 500 links from directories
- **Over-optimized anchors**: Keep exact-match anchor text under 10% of profile
- **No follow-up**: 80% of successful outreach requires 1-2 follow-ups

---

## Tool Integrations

| Tool | Use For |
|------|---------|
| `ahrefs` | Backlink analysis, competitor links, broken link finding |
| `semrush` | Backlink audit, toxic link identification |
| `google-search-console` | Manual penalties, link data |

---

## Task-Specific Questions

1. What's the site's current DR/DA and referring domain count?
2. What niche or industry is this? (Determines which strategies fit)
3. Is this about ranking for specific keywords or building general authority?
4. Have you (or a previous SEO) ever built links with questionable tactics?
5. What's the content production capacity? (Some strategies require content)
6. What's the budget and timeline?

---

## Related Skills

- **seo-audit**: For identifying existing link profile issues before building
- **content-strategy**: For creating link-worthy content assets
- **programmatic-seo**: For pages that naturally earn links at scale
- **digital PR**: (cross-reference free-tool-strategy for link-earning tools)
- **competitor-alternatives**: Comparison pages earn strong editorial links
- **ai-seo**: High-citation content also tends to earn backlinks
