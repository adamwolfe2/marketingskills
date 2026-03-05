# Reddit

Reddit API v2 for brand mention monitoring, competitor analysis, subreddit discovery, trending content research, and AEO presence auditing (Reddit is heavily cited by AI search engines including Perplexity and ChatGPT).

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Reddit API v2 (OAuth2) |
| MCP | - | Not available |
| CLI | ✓ | `tools/clis/reddit.js` |
| SDK | ✓ | snoowrap (Node.js), PRAW (Python) |

## Authentication

- **Type**: OAuth2 Client Credentials (for read-only)
- **App type**: "script" at reddit.com/prefs/apps
- **Token endpoint**: `POST https://www.reddit.com/api/v1/access_token`
- **API base**: `https://oauth.reddit.com`
- **Required header**: `User-Agent: myapp/1.0` (Reddit blocks requests without User-Agent)

### Setup

1. Go to reddit.com/prefs/apps → "create another app"
2. Choose type: **script**
3. Set redirect URI: `http://localhost:8080`
4. Copy **client ID** (under app name) and **client secret**
5. Set `REDDIT_CLIENT_ID=your_client_id`
6. Set `REDDIT_CLIENT_SECRET=your_client_secret`

### Get Access Token

```bash
curl -X POST https://www.reddit.com/api/v1/access_token \
  -u "{client_id}:{client_secret}" \
  -H "User-Agent: myapp/1.0" \
  -d "grant_type=client_credentials"
```

Response: `{ "access_token": "...", "token_type": "bearer", "expires_in": 86400 }`

## Common Agent Operations

### Search posts across Reddit

```bash
GET https://oauth.reddit.com/search.json
  ?q=your+brand+name
  &sort=new
  &t=month
  &limit=25
  &type=link
Authorization: Bearer {token}
User-Agent: myapp/1.0
```

### Search within a specific subreddit

```bash
GET https://oauth.reddit.com/r/marketing/search.json
  ?q=content+strategy
  &sort=top
  &t=year
  &limit=25
  &restrict_sr=true
Authorization: Bearer {token}
User-Agent: myapp/1.0
```

### Get subreddit info

```bash
GET https://oauth.reddit.com/r/entrepreneur/about.json
Authorization: Bearer {token}
User-Agent: myapp/1.0
```

### Get top posts from a subreddit

```bash
GET https://oauth.reddit.com/r/startups/top.json
  ?t=month
  &limit=25
Authorization: Bearer {token}
User-Agent: myapp/1.0
```

### Find subreddits by topic

```bash
GET https://oauth.reddit.com/subreddits/search.json
  ?q=saas+marketing
  &limit=25
Authorization: Bearer {token}
User-Agent: myapp/1.0
```

### Get post comments

```bash
GET https://oauth.reddit.com/r/{subreddit}/comments/{post_id}.json
  ?limit=100
  &depth=3
Authorization: Bearer {token}
User-Agent: myapp/1.0
```

## Search Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `sort` | `relevance`, `hot`, `top`, `new`, `comments` | Sort order |
| `t` | `hour`, `day`, `week`, `month`, `year`, `all` | Time filter |
| `limit` | 1–100 | Results per page |
| `type` | `link`, `comment`, `sr` | Filter by content type |
| `restrict_sr` | `true` | Restrict to current subreddit |

## Response Format

```json
{
  "data": {
    "children": [
      {
        "data": {
          "id": "abc123",
          "title": "Post title",
          "subreddit": "marketing",
          "permalink": "/r/marketing/comments/abc123/post_title/",
          "score": 342,
          "upvote_ratio": 0.94,
          "num_comments": 47,
          "author": "username",
          "created_utc": 1709654400,
          "selftext": "Post body text...",
          "link_flair_text": "Discussion"
        }
      }
    ],
    "after": "t3_abc124"
  }
}
```

## AEO Use Case (Critical — Reddit is heavily cited by AI)

Reddit content is cited by Perplexity, ChatGPT, and Gemini for product recommendations, comparisons, and "best X" queries. Monitoring and participating in relevant subreddits is a high-leverage AEO strategy.

### Check if your brand appears in Reddit discussions

```bash
# Monitor brand mentions
node tools/clis/reddit.js mentions --brand "YourBrand" --time month

# Compare to competitor
node tools/clis/reddit.js competitor --brand "YourBrand" --competitor "CompetitorName"

# Find subreddits where your category is discussed
node tools/clis/reddit.js subreddit find --query "project management software"
```

### Key subreddits for B2B SaaS marketing

| Subreddit | Subscribers | Use Case |
|-----------|-------------|----------|
| r/entrepreneur | 3M+ | Startup discussions |
| r/startups | 1.5M+ | Early-stage companies |
| r/marketing | 1.5M+ | Marketing discussions |
| r/saas | 50K+ | SaaS-specific |
| r/SEO | 200K+ | SEO discussions |
| r/growthhacking | 200K+ | Growth tactics |
| r/smallbusiness | 1.5M+ | SMB owners |
| r/digitalnomad | 2M+ | Remote work tools |

## Rate Limits

- 60 requests per minute (OAuth)
- 10 requests per second burst limit
- Respect `X-Ratelimit-Remaining` response header

## Pagination

Use the `after` parameter with the last post's `t3_{id}` value to paginate:

```bash
GET /search.json?q=brand&after=t3_abc123&limit=25
```

## When to Use

- **AEO monitoring**: Track which brands are mentioned positively in your category subreddits
- **Brand mentions**: Monitor what Reddit users say about your product vs competitors
- **Content research**: Find trending topics and pain points in your ICP's subreddits
- **Community discovery**: Identify where your target audience congregates
- **Competitive intelligence**: See what subreddits competitors are mentioned in
- **Content inspiration**: Mine top posts for viral hooks and pain point framing

## Relevant Skills

- ai-seo
- competitor-alternatives
- community-led-growth
- content-strategy
- demand-generation
