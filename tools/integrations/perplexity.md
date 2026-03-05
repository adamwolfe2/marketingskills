# Perplexity

AI-powered search engine that returns answers with real-time web citations. Ideal for competitive research, market intelligence, trend analysis, and AEO auditing (checking if your brand is cited in AI answers).

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Chat Completions API |
| MCP | - | Not available |
| CLI | ✓ | `tools/clis/perplexity.js` |
| SDK | - | API-only (REST) |

## Authentication

- **Type**: Bearer Token
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: perplexity.ai → Settings → API

## Common Agent Operations

### Web search with citations

```bash
POST https://api.perplexity.ai/chat/completions
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "model": "llama-3.1-sonar-small-128k-online",
  "messages": [
    { "role": "user", "content": "What are the best AI SEO tools in 2026?" }
  ],
  "return_citations": true,
  "search_recency_filter": "month"
}
```

### Deep research with related questions

```bash
POST https://api.perplexity.ai/chat/completions
Authorization: Bearer {api_key}

{
  "model": "llama-3.1-sonar-large-128k-online",
  "messages": [
    { "role": "user", "content": "What is the current state of B2B SaaS demand generation in 2026?" }
  ],
  "return_citations": true,
  "return_related_questions": true,
  "search_recency_filter": "year"
}
```

## Available Models

| Model | Use Case | Speed |
|-------|---------|-------|
| `llama-3.1-sonar-small-128k-online` | Quick searches, real-time queries | Fast |
| `llama-3.1-sonar-large-128k-online` | Deep research, complex analysis | Moderate |
| `llama-3.1-sonar-huge-128k-online` | Maximum quality research | Slower |

## Response Format

```json
{
  "id": "...",
  "model": "llama-3.1-sonar-large-128k-online",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "The answer text with inline citations [1][2]..."
      }
    }
  ],
  "citations": [
    "https://source1.com/article",
    "https://source2.com/article"
  ],
  "related_questions": ["Related question 1?", "Related question 2?"]
}
```

## Search Recency Options

- `day` — Results from past 24 hours
- `week` — Results from past week
- `month` — Results from past month (recommended default)
- `year` — Results from past year

## Rate Limits

- Varies by plan (see perplexity.ai/pricing)
- Pro: Higher limits; API: token-based billing

## When to Use

- **AEO audit**: Check if your brand/product is cited in AI answers for key queries
- **Competitive research**: Who is being cited for your target keywords?
- **Market intelligence**: Real-time industry trends with sources
- **Content research**: Find authoritative sources for claims and statistics
- **SEO research**: What content is ranking and being cited for your topics?

## AEO Use Case (Critical for AI Search Optimization)

Use Perplexity to audit your AI search presence:

```bash
# Check if you're cited for your main category keyword
node tools/clis/perplexity.js search --query "best [your product category] tools"

# Check competitor citations
node tools/clis/perplexity.js competitive --brand "CompetitorName"

# Monitor industry terms
node tools/clis/perplexity.js search --query "how to [problem your product solves]" --recency month
```

## Relevant Skills

- ai-seo
- seo-audit
- competitor-alternatives
- content-strategy
- demand-generation
