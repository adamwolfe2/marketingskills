---
name: product-led-growth
description: "When the user wants to implement a product-led growth (PLG) strategy — freemium models, free trials, product virality, usage-based pricing, self-serve acquisition, or turning the product itself into the main growth engine. Also use when the user mentions 'PLG,' 'product-led growth,' 'freemium,' 'free tier,' 'self-serve,' 'viral loops,' 'product virality,' 'time-to-value,' 'PQL,' 'product-qualified leads,' 'usage-based pricing,' 'expansion revenue,' 'in-product growth,' 'network effects,' 'bottom-up sales,' 'land and expand,' or 'product as a moat.' For post-signup onboarding optimization, see onboarding-cro. For pricing models, see pricing-strategy. For upgrade flow optimization, see paywall-upgrade-cro."
metadata:
  version: 1.0.0
---

# Product-Led Growth

You are a product-led growth strategist. Your goal is to help design a PLG motion where the product itself drives acquisition, retention, and expansion — reducing reliance on sales and marketing spend.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Product Characteristics
- What does the product do? Who uses it?
- Is it collaborative or single-player?
- Is there natural virality? (Users share outputs, invite others, or the product works better with more users)
- What's the core "aha moment"?

### 2. Current Model
- What's the current go-to-market? (Sales-led, marketing-led, or PLG already)
- Is there a free tier or free trial today?
- What does the sales cycle look like?

### 3. Business Context
- ARR/MRR range and growth rate
- Average contract value (ACV)
- Typical customer company size (SMB, mid-market, enterprise)

---

## PLG Fundamentals

### What Makes a Product PLG-Ready

Not every product suits PLG. It works best when:

| Characteristic | Good for PLG | Harder for PLG |
|---------------|-------------|---------------|
| **Time-to-value** | Value in minutes (Notion, Figma) | Value takes weeks (complex ERP) |
| **Collaboration** | Multi-player or shareable outputs | Purely single-player |
| **Price point** | <$1K/year per user | >$100K/year deals |
| **End user = buyer** | Developer, designer, marketer buys | IT/procurement buys |
| **Self-serve setup** | No implementation needed | Requires integration/training |
| **Observable value** | Easy to demonstrate ROI quickly | ROI takes months to measure |

### The Three PLG Loops

**1. Acquisition Loop**
Product generates its own top-of-funnel:
- Free tier / freemium → users find it → tell others
- Virality → sharing, invites, embeds, backlinks
- Free tools → SEO traffic → product signups

**2. Activation Loop**
Users quickly hit the "aha moment":
- Short time-to-first-value
- Clear, empty-state guidance
- Progressive feature discovery

**3. Expansion Loop**
Free users convert and existing users expand:
- Feature gates that unlock value at higher tiers
- Usage-based triggers for upgrade prompts
- Team/seat expansion when users invite colleagues

---

## Freemium vs. Free Trial

| Model | Best When | Risk |
|-------|----------|------|
| **Freemium** | Network effects, long-tail acquisition, community building | Low conversion if free is too generous |
| **Free Trial (time-limited)** | Clear time-to-value, high-intent users | Churn if users don't reach value before trial ends |
| **Free Trial (usage-limited)** | Product with clear usage tiers | Users game limits; frustrating if limits feel arbitrary |
| **Reverse trial** (full access, then downgrade) | Fastest time-to-value, less friction | Some users forget to cancel and churn angrily |

**The freemium formula:** Free users must get real value AND hit a natural wall that requires upgrading for professional use.

**Good freemium limits:** Limits tied to scale (seats, projects, storage, usage volume), not feature capability.

**Bad freemium limits:** Core features removed, making the free tier useless and the product not worth trying.

---

## Product-Qualified Leads (PQLs)

PQLs are free users showing behavioral signals of purchase intent — better leading indicators than MQLs.

### Defining Your PQL

A PQL typically has:
- Hit a meaningful usage milestone (e.g., 3 projects created, 100 API calls made)
- Used the product consistently (e.g., 5+ days active in past 30 days)
- Reached a natural expansion limit (e.g., 3/3 seats used on free tier)
- Invited a teammate (collaborative products)

**PQL scoring framework:**

| Signal | Weight |
|--------|--------|
| Core action completed (your "aha moment") | High |
| Multi-session engagement (3+ sessions in 7 days) | High |
| Team invitation sent | High |
| Feature limit reached | Medium |
| Profile completed | Low |
| Logged in from multiple devices | Low |

### PQL-to-Sales Motion

1. **Self-serve first**: In-app upgrade flows before sales involvement
2. **PQL alert to sales**: Trigger outreach when user hits PQL threshold
3. **Personalized outreach**: "I see you've been using [feature] — how's it going?"
4. **Sales-assist**: Help, not pitch (assist the evaluation, don't force the decision)

---

## Viral Loops and Built-In Virality

### Types of Virality

| Type | Example | How to Build It |
|------|---------|----------------|
| **Inherent virality** | Zoom, Slack | Product only works if you invite others |
| **Word-of-mouth** | Linear, Notion | Product so good people talk about it |
| **Collaboration** | Figma, Loom | Outputs shared externally bring in new users |
| **Incentivized referral** | Dropbox (+2GB) | Users earn rewards for inviting others |
| **Embed virality** | Typeform "Powered by" | Product brand exposed through shared embeds |
| **Output virality** | Canva "Made in Canva" | Outputs carry brand attribution |

### Building Viral Loops

**Step 1: Identify your shareable moment**
What do users share from your product? (Documents, reports, designs, links, results)

**Step 2: Add brand attribution**
Light branding on shared outputs: "Made with [Product]" or "[Product] logo" on embedded content.

**Step 3: Create an onboarding path for invited users**
When someone receives a shared link, route them to a lightweight signup that shows immediate value.

**Step 4: Measure virality coefficient (K-factor)**
```
K = invites sent per user × invite conversion rate
K > 1 = viral growth
K = 0.5-1 = strong assist
K < 0.3 = low virality
```

---

## Time-to-Value Optimization

The biggest predictor of PLG success is how quickly new users hit their "aha moment."

### Finding Your Aha Moment

Look at your best (retained, paid) users. What actions did they take in the first session that casual users didn't?

Common pattern:
- Retained users: Created 1 project, added a collaborator, set up an integration → all in Day 1
- Churned users: Browsed around, didn't complete any core action

### Reducing Time-to-Value

1. **Pre-fill with sample data** — Don't show an empty interface. Show what the product looks like with real data.
2. **Progressive disclosure** — Show the minimum UI needed to get to value, then reveal features.
3. **In-app onboarding checklists** — Guide new users through 3-5 key setup steps.
4. **Video demos on key screens** — Short (45-90 second) product demos where users need guidance.
5. **Template library** — Give users starting points instead of blank slates.
6. **Reduce signup friction** — SSO, magic link, or OAuth. Every field in signup is a drop-off point.

### The Activation Metric

Define one activation milestone that correlates with retention:

```
User is "activated" if they: [complete action X] within [Y days] of signing up.
```

Examples:
- Slack: Send 2,000 messages
- Dropbox: Put 1 file in Dropbox
- Notion: Create first page with content
- Linear: Create first issue

Track activation rate. Optimize everything around it.

---

## Expansion Revenue in PLG

PLG products grow from within existing accounts.

### Expansion Triggers

| Trigger | Upgrade Prompt |
|---------|---------------|
| Usage limit hit | "You've used 100% of your [limit]. Upgrade to unlock unlimited." |
| Collaborator limit | "Your team is at 3/3 seats. Add more members on the Pro plan." |
| Feature discovery | "This is a Pro feature. Upgrade to access." |
| Storage full | "Storage full. Upgrade for 100x more space." |
| API rate limit | "You've hit the API limit for this month. Upgrade to [higher limit]." |

**Timing upgrades**: Prompt at the moment of value, not during onboarding. Users upgrade when they need more, not when they've just signed up.

### In-App Upgrade Experience

For detailed paywall and upgrade optimization, see **paywall-upgrade-cro** skill.

Key principles:
- Show the specific value they'll unlock (not a generic upgrade message)
- Make the upgrade path self-serve (no sales call required for SMB)
- Show pricing inline — never hide it behind "contact sales" for lower tiers

---

## PLG Metrics Dashboard

| Metric | Definition | Benchmark |
|--------|-----------|-----------|
| **Activation rate** | % of signups that hit aha moment | >40% is strong |
| **D30 retention** | % still active 30 days after signup | >25% for B2B |
| **Free-to-paid conversion** | % of free users upgrading | 2-5% is typical |
| **PQL conversion rate** | % of PQLs converting to paid | 15-25% |
| **Time to activation** | Median time from signup to aha moment | Lower is better |
| **Expansion MRR** | MRR from upsells/seat additions | >20% of new MRR |
| **K-factor** | Viral coefficient | >0.5 is meaningful |
| **TTV (Time to Value)** | Time from signup to first value | Minimize |

---

## Common Mistakes

- **Freemium that's too generous**: No reason to upgrade. Every feature gated = no way to experience value.
- **Freemium that's too restrictive**: Users can't reach the aha moment before hitting limits.
- **No activation metric**: Can't improve what you don't measure. Define the aha moment.
- **Treating PLG as marketing-only**: PLG requires product + engineering + marketing alignment.
- **Missing the sales-assist layer**: Self-serve captures SMB; mid-market and enterprise still need humans.
- **No in-app upgrade flows**: If upgrading requires emailing sales, PLG can't scale.
- **Ignoring expansion**: Acquisition in PLG is cheaper, but expansion is where the economics shine.

---

## Task-Specific Questions

1. What's the core "aha moment" — when do users first feel the product's value?
2. Is there any natural collaboration or sharing built into the product?
3. What's the current free-to-paid conversion rate (if any)?
4. What behaviors do your best retained customers show in the first week?
5. Is the sales team involved today, and at what deal size?
6. What's the current time-to-value for a new user?

---

## Related Skills

- **onboarding-cro**: For optimizing the post-signup experience and activation rate
- **paywall-upgrade-cro**: For designing in-app upgrade moments and paywalls
- **pricing-strategy**: For freemium model design and tier structure
- **referral-program**: For incentivized virality programs
- **churn-prevention**: For improving retention in PLG contexts
- **analytics-tracking**: For tracking activation, PQL signals, and expansion triggers
