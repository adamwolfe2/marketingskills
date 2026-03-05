# YouTube Analytics

YouTube Analytics API v2 for channel performance data, video metrics, traffic sources, audience retention, and search terms.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | YouTube Analytics API v2 + YouTube Data API v3 |
| MCP | - | Not available |
| CLI | ✓ | `tools/clis/youtube-analytics.js` |
| SDK | ✓ | Google API Client Libraries |

## Authentication

- **Type**: OAuth2 (required — no service account support for analytics data)
- **Scopes needed**:
  - `https://www.googleapis.com/auth/yt-analytics.readonly`
  - `https://www.googleapis.com/auth/youtube.readonly` (for video list)
- **Get credentials**: Google Cloud Console → APIs & Services → Credentials → OAuth2 Client ID

### Quick OAuth2 Token (for testing)

1. Go to Google Cloud Console
2. Enable "YouTube Analytics API" and "YouTube Data API v3"
3. Create OAuth2 credentials (Desktop app type)
4. Use [OAuth Playground](https://developers.google.com/oauthplayground/) to get an access token
5. Set `YOUTUBE_ACCESS_TOKEN=ya29.xxxxx`

## Common Agent Operations

### Channel overview (past 30 days)

```bash
GET https://youtubeanalytics.googleapis.com/v2/reports
  ?ids=channel==mine
  &startDate=2026-02-01
  &endDate=2026-03-05
  &metrics=views,estimatedMinutesWatched,subscribersGained,subscribersLost,averageViewDuration
  &access_token={token}
```

### Top videos by views

```bash
GET https://youtubeanalytics.googleapis.com/v2/reports
  ?ids=channel==mine
  &startDate=2026-01-01
  &endDate=2026-03-05
  &metrics=views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained
  &dimensions=video
  &sort=-views
  &maxResults=25
  &access_token={token}
```

### Traffic sources

```bash
GET https://youtubeanalytics.googleapis.com/v2/reports
  ?ids=channel==mine
  &startDate=2026-02-01
  &endDate=2026-03-05
  &metrics=views,estimatedMinutesWatched
  &dimensions=insightTrafficSourceType
  &sort=-views
  &access_token={token}
```

### Top search terms that found your channel

```bash
GET https://youtubeanalytics.googleapis.com/v2/reports
  ?ids=channel==mine
  &startDate=2026-02-01
  &endDate=2026-03-05
  &metrics=views
  &dimensions=insightTrafficSourceDetail
  &filters=insightTrafficSourceType==YT_SEARCH
  &sort=-views
  &maxResults=25
  &access_token={token}
```

### Audience retention for a specific video

```bash
GET https://youtubeanalytics.googleapis.com/v2/reports
  ?ids=channel==mine
  &startDate=2026-01-01
  &endDate=2026-03-05
  &metrics=audienceWatchRatio,relativeRetentionPerformance
  &dimensions=elapsedVideoTimeRatio
  &filters=video==dQw4w9WgXcQ
  &access_token={token}
```

## Available Metrics

| Metric | Description |
|--------|-------------|
| `views` | Total views |
| `estimatedMinutesWatched` | Total watch time in minutes |
| `averageViewDuration` | Avg seconds watched per view |
| `averageViewPercentage` | Avg % of video watched |
| `subscribersGained` | New subscribers |
| `subscribersLost` | Unsubscribes |
| `likes`, `dislikes` | Engagement |
| `shares` | Times shared |
| `comments` | Comment count |

## Traffic Source Types

| Source | Description |
|--------|-------------|
| `YT_SEARCH` | YouTube search results |
| `SUGGESTED_VIDEO` | Suggested next to other videos |
| `BROWSE_FEATURES` | YouTube homepage/subscription feed |
| `EXT_URL` | External websites |
| `NOTIFICATION` | Push notifications |
| `PLAYLIST` | From a playlist |

## Response Format

```json
{
  "kind": "youtubeAnalytics#resultTable",
  "columnHeaders": [
    { "name": "video", "columnType": "DIMENSION", "dataType": "STRING" },
    { "name": "views", "columnType": "METRIC", "dataType": "INTEGER" }
  ],
  "rows": [
    ["dQw4w9WgXcQ", 12500],
    ["abcdefghijk", 8300]
  ]
}
```

## Rate Limits

- 10,000 quota units per day (default)
- Each analytics query: ~1 unit

## When to Use

- Identify top-performing videos for repurposing or content strategy
- Find search terms driving YouTube traffic (for video SEO optimization)
- Track subscriber growth trends
- Analyze audience retention drop-offs to improve future videos
- Understand traffic source mix (search vs. suggested vs. browse)
- Monthly channel performance reporting

## Relevant Skills

- video-seo
- content-strategy
- analytics-tracking
- social-content
