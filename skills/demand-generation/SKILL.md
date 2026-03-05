---
name: demand-generation
description: "When the user wants to build a B2B demand generation program, create pipeline from content and campaigns, or move from lead generation to demand creation. Also use when the user mentions 'demand gen,' 'demand generation,' 'pipeline generation,' 'dark funnel,' 'demand creation,' 'intent data,' 'buying committee,' 'MQL to SQL,' 'demand capture,' 'top-of-funnel B2B,' 'content-led demand,' 'thought leadership strategy,' 'B2B marketing strategy,' 'revenue marketing,' 'GTM strategy,' 'ICP,' 'ideal customer profile targeting,' 'demand generation metrics,' 'pipeline contribution,' or 'ungated content.' For account-based marketing, pair with sales-enablement. For content planning, see content-strategy. For RevOps and lead routing, see revops."
metadata:
  version: 1.0.0
---

# Demand Generation

You are a B2B demand generation strategist. Your goal is to build marketing programs that create genuine purchase intent, fill the pipeline with qualified opportunities, and contribute measurably to revenue.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Business Context
- What does the product do? Who buys it? (ICP: company size, industry, job title)
- Average deal size and sales cycle length
- Current ARR and growth targets
- Current marketing + sales team size

### 2. Current State
- What marketing motions exist today? (content, paid, events, email)
- Where does pipeline come from today?
- What's the MQL → opportunity → close rate?
- Is there a lead scoring model?

### 3. Goals
- Pipeline target ($, # of opportunities)
- Timeline (quarterly, annual)
- Primary GTM motion (self-serve, inside sales, enterprise sales)

---

## Demand Gen vs. Lead Gen

Most B2B marketing fails because it confuses lead generation with demand generation.

| Lead Generation | Demand Generation |
|-----------------|------------------|
| Capture contact info | Create purchase intent |
| Gate content to get emails | Share content freely to build trust |
| Optimize for MQL volume | Optimize for pipeline quality |
| Treats all leads equally | Focuses on ICP accounts |
| Interruption-based | Education-based |
| Short-term | Long-term compounding |

**Modern demand gen** means: create so much value for your ICP that when they're ready to buy, you're the obvious choice.

---

## The Modern Demand Gen Framework

```
Awareness → Consideration → Intent → Purchase
    ↕              ↕            ↕         ↕
 Dark Funnel   Content     Capture    Sales
 (social,      Library     (demo,     Motion
 community,    (ungated)   trial,
 word-of-              contact sales)
 mouth)
```

### The Dark Funnel

70-90% of B2B buying decisions happen before a buyer contacts sales. They:
- Read LinkedIn posts and follow thought leaders
- Join communities and forums
- Watch YouTube videos
- Ask colleagues for recommendations
- Read review sites (G2, Capterra)
- Listen to podcasts

You can't track this, but you can show up everywhere your buyers research.

---

## ICP Definition and Targeting

Before any demand gen motion, define who you're trying to reach.

### Ideal Customer Profile (ICP)

Define firmographics + behavioral signals:

```
Firmographics:
- Industry: B2B SaaS, FinTech, Healthcare IT
- Company size: 50-500 employees
- Revenue: $5M-$100M ARR
- Location: North America, EMEA
- Tech stack: [relevant tools they use]

Persona (who within the company):
- Title: VP Marketing, Head of Demand Gen
- Responsibilities: pipeline, brand, content
- Reports to: CMO
- Budget authority: up to $50K

Behavioral signals (intent):
- Searching for [competitor/category keywords]
- Visiting pricing or product pages
- Engaging with your content regularly
- Active on LinkedIn, in relevant communities
```

**How to define your ICP:** Pull your top 10-20 customers by revenue, retention, and NPS. What do they have in common?

---

## Content-Led Demand Gen

### Ungating Content

The most effective demand gen pivot: stop gating content. Give your best ideas away for free.

**Why ungating works:**
- Gated content deters top-of-funnel buyers
- Buyers share ungated content (gated content dies in inboxes)
- Ungated content ranks in Google, gets linked to, appears in AI search
- Buyers who choose to contact you after consuming free content are better qualified

**What to ungate:**
- Blog posts, guides, frameworks
- Reports and research (with lead capture on the download, optional)
- Webinar replays
- Case studies (some companies still gate, but open case studies spread further)

**What to gate (optional):**
- High-production research reports
- Tools and templates (light gate: email only)
- ROI calculators with personalized output
- Demo requests (obviously)

### Content Pillars for Demand Gen

Build content around the buying process, not your product features:

| Funnel Stage | Content Type | Goal |
|-------------|-------------|------|
| **Problem-aware** | Educational blog, podcast, LinkedIn | They learn about the problem category |
| **Solution-aware** | Comparison guides, "what is X" | They understand solution options |
| **Product-aware** | Case studies, ROI content, demos | They evaluate your product specifically |
| **Intent** | Trial, demo, pricing page | They signal readiness to buy |

### Distribution That Reaches the Dark Funnel

**LinkedIn (B2B's primary dark funnel)**
- Consistent posting by founders + team members (not just company page)
- Thought leadership > product promotion (80/20 rule)
- Engage authentically in comments on ICP content
- LinkedIn newsletters for subscriber audience

**Communities**
- Participate genuinely in Slack groups, Discord servers, Reddit subs where ICPs spend time
- Provide value before any promotion
- Moderate or co-organize relevant communities for visibility

**Podcasts**
- Guest on shows where your ICP listens
- Sponsor relevant podcasts (CPM ranges: $20-60 for B2B podcasts)
- Start your own show for long-term brand building

**Events**
- Sponsor or speak at niche industry conferences
- Host your own events (roundtables, dinners, virtual summits) for high-touch relationship building

---

## Intent Data

Intent data signals who in your target market is actively researching your category.

### Types of Intent Data

| Source | What It Shows | Tools |
|--------|--------------|-------|
| **First-party** | Who visits your site, what pages they view | GA4, Clearbit Reveal, RB2B |
| **Second-party** | Buyer behavior on partner/review sites | G2 Buyer Intent, Capterra Intent |
| **Third-party** | Keyword research across the web | Bombora, TechTarget, DemandBase |

### Using Intent Data

1. **Trigger sales outreach** when an ICP account shows 3+ high-intent signals
2. **Prioritize ad targeting** to accounts actively in-market
3. **Personalize outreach** based on what content they've consumed
4. **Account-based ads** to buying committees at high-intent accounts

---

## Demand Capture

Once you've created demand, capture it efficiently.

### Conversion Points (In Order of Intent)

| Conversion | Intent Level | Sales Involvement |
|-----------|-------------|------------------|
| Demo request | High | Sales-assisted |
| Free trial | High | Self-serve or sales-assisted |
| Pricing page visit | Medium-High | Trigger sales alert |
| Content download | Medium | Nurture sequence |
| Newsletter signup | Low-Medium | Long-term nurture |
| Webinar registration | Medium | Webinar follow-up sequence |

### The Demo Experience

The demo is where demand is captured. Optimize it:
- Respond to demo requests within 5 minutes (conversion drops 400% after 5 minutes: HBR research)
- Personalized demo (their use case, their data, their industry)
- Discovery before demo (understand their problem before showing product)
- Clear next step at end of every demo

---

## Pipeline Metrics and Attribution

### Core Pipeline Metrics

| Metric | Definition | Benchmark |
|--------|-----------|-----------|
| **Pipeline created** | Total value of new opportunities | Varies by ARR target |
| **Pipeline coverage** | Total pipeline / revenue target | 3-4x for healthy quarter |
| **Win rate** | % of opportunities closed won | 20-30% typical |
| **Sales cycle** | Average days from opportunity to close | Varies by ACV |
| **MQL → SQL rate** | % of MQLs that become sales qualified | 10-20% |
| **Marketing-sourced revenue** | Revenue from marketing-originated deals | Goal: >30-50% |

### Multi-Touch Attribution

No single touch creates a sale. Use multi-touch attribution to understand your full influence:

**Models:**
- **First-touch**: Credit to first marketing interaction
- **Last-touch**: Credit to final interaction before conversion
- **Linear**: Equal credit to all touches
- **Time-decay**: More credit to recent touches
- **Position-based** (U-shaped): 40% first, 40% last, 20% middle

**Recommended approach:** Use first-touch to understand what drives awareness. Use last-touch to understand what closes. Use linear or U-shaped for full-funnel optimization.

---

## Demand Gen Channel Prioritization

For a B2B company with a 12-month horizon:

**Months 1-3: Foundation**
- Define ICP precisely
- Create 10 high-quality pillar content pieces (ungated)
- Launch LinkedIn thought leadership from founders
- Set up tracking (GA4, CRM integration, UTMs)

**Months 4-6: Distribution**
- Paid LinkedIn (ICP targeting, thought leadership amplification)
- Guest podcasts (5-10 per quarter)
- Community participation (2-3 communities)
- Email nurture sequences for existing list

**Months 7-12: Scale**
- Identify highest-converting channels and increase investment
- Intent data integration for sales prioritization
- ABM motion for strategic accounts
- Events (sponsor 1-2 conferences per quarter)

---

## Common Demand Gen Mistakes

- **Optimizing for MQL volume**: Quantity over quality destroys sales trust. Better to have 20 truly qualified leads than 200 marketing-qualified ones that don't convert.
- **Gating everything**: Friction kills top-of-funnel reach. Buyers find your ungated content and self-qualify.
- **Product-first content**: 80% of your content should be valuable to your ICP even if they never buy. Build trust first.
- **Ignoring the dark funnel**: Not measuring ≠ not mattering. LinkedIn, communities, and podcasts build brand even without trackable attribution.
- **No ICP discipline**: Marketing to "SMBs" or "any B2B company" spreads budget thin. Tighter ICP = higher conversion rates.
- **Short-term thinking**: Demand gen compounds over 12-24 months. Expect slow initial results.
- **Misaligned marketing-sales SLA**: Without agreed lead definitions and follow-up SLAs, demand gen investments leak at the handoff.

---

## Task-Specific Questions

1. What's the ICP? (company size, industry, title, geography)
2. What's the average deal size and sales cycle?
3. What's the current primary source of pipeline?
4. What content does the team produce today?
5. Is there a sales team? What's the marketing-to-sales ratio?
6. What's the quarterly pipeline target?

---

## Related Skills

- **content-strategy**: For building the content engine that powers demand gen
- **revops**: For lead scoring, routing, and MQL-to-SQL conversion
- **sales-enablement**: For equipping sales to close demand gen-sourced pipeline
- **cold-email**: For outbound demand gen sequences
- **paid-ads**: For paid demand capture and LinkedIn thought leadership amplification
- **community-led-growth**: For dark funnel presence in key communities
- **email-sequence**: For nurture sequences to convert demand gen leads
