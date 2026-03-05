#!/usr/bin/env node

// YouTube Analytics API v2 + YouTube Data API v3
// Requires OAuth2 access token with YouTube Analytics scope
// Set up via Google Cloud Console → APIs & Services

const ACCESS_TOKEN = process.env.YOUTUBE_ACCESS_TOKEN
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID
const YT_ANALYTICS_BASE = 'https://youtubeanalytics.googleapis.com/v2'
const YT_DATA_BASE = 'https://www.googleapis.com/youtube/v3'

if (!ACCESS_TOKEN) {
  console.error(JSON.stringify({ error: 'YOUTUBE_ACCESS_TOKEN environment variable required. See integration guide for OAuth2 setup.' }))
  process.exit(1)
}

function parseArgs(args) {
  const result = { _: [] }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = args[i + 1]
      if (next && !next.startsWith('--')) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else {
      result._.push(arg)
    }
  }
  return result
}

function today() {
  return new Date().toISOString().split('T')[0]
}
function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

async function analyticsApi(params) {
  if (args['dry-run']) {
    return { _dry_run: true, url: `${YT_ANALYTICS_BASE}/reports?${new URLSearchParams(params)}` }
  }
  const qs = new URLSearchParams({ ...params, access_token: ACCESS_TOKEN })
  const res = await fetch(`${YT_ANALYTICS_BASE}/reports?${qs}`)
  const data = await res.json()
  if (!res.ok) return { error: data.error?.message || JSON.stringify(data), status: res.status }
  return data
}

async function dataApi(path, params) {
  if (args['dry-run']) {
    return { _dry_run: true, url: `${YT_DATA_BASE}${path}?${new URLSearchParams(params)}` }
  }
  const qs = new URLSearchParams({ ...params, access_token: ACCESS_TOKEN })
  const res = await fetch(`${YT_DATA_BASE}${path}?${qs}`)
  const data = await res.json()
  if (!res.ok) return { error: data.error?.message || JSON.stringify(data), status: res.status }
  return data
}

const args = parseArgs(process.argv.slice(2))
const [cmd, sub] = args._

async function main() {
  let result
  const channelId = args.channel || CHANNEL_ID || 'mine'
  const startDate = args.start || daysAgo(30)
  const endDate = args.end || today()

  switch (cmd) {
    case 'channel':
      switch (sub) {
        case 'overview': {
          result = await analyticsApi({
            ids: `channel==${channelId}`,
            startDate,
            endDate,
            metrics: 'views,estimatedMinutesWatched,subscribersGained,subscribersLost,averageViewDuration',
            dimensions: '',
          })
          break
        }
        case 'daily': {
          result = await analyticsApi({
            ids: `channel==${channelId}`,
            startDate,
            endDate,
            metrics: 'views,estimatedMinutesWatched,subscribersGained',
            dimensions: 'day',
            sort: 'day',
          })
          break
        }
        default:
          result = { error: 'Unknown channel subcommand. Use: overview, daily' }
      }
      break

    case 'videos':
      switch (sub) {
        case 'top': {
          const metric = args.metric || 'views'
          const limit = args.limit || '25'
          result = await analyticsApi({
            ids: `channel==${channelId}`,
            startDate,
            endDate,
            metrics: 'views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained',
            dimensions: 'video',
            sort: `-${metric}`,
            maxResults: limit,
          })
          break
        }
        case 'list': {
          const params = {
            part: 'snippet,statistics,contentDetails',
            channelId: channelId === 'mine' ? undefined : channelId,
            mine: channelId === 'mine' ? 'true' : undefined,
            maxResults: args.limit || '25',
            order: args.order || 'date',
            type: 'video',
          }
          if (channelId !== 'mine') {
            params.channelId = channelId
            delete params.mine
          }
          result = await dataApi('/search', { ...params, forMine: channelId === 'mine' ? 'true' : undefined })
          break
        }
        case 'retention': {
          if (!args.video) { result = { error: '--video (video_id) required' }; break }
          result = await analyticsApi({
            ids: `channel==${channelId}`,
            startDate,
            endDate,
            metrics: 'audienceWatchRatio,relativeRetentionPerformance',
            dimensions: 'elapsedVideoTimeRatio',
            filters: `video==${args.video}`,
          })
          break
        }
        default:
          result = { error: 'Unknown videos subcommand. Use: top, list, retention' }
      }
      break

    case 'traffic': {
      result = await analyticsApi({
        ids: `channel==${channelId}`,
        startDate,
        endDate,
        metrics: 'views,estimatedMinutesWatched',
        dimensions: 'insightTrafficSourceType',
        sort: '-views',
      })
      break
    }

    case 'search-terms': {
      result = await analyticsApi({
        ids: `channel==${channelId}`,
        startDate,
        endDate,
        metrics: 'views',
        dimensions: 'insightTrafficSourceDetail',
        filters: 'insightTrafficSourceType==YT_SEARCH',
        sort: '-views',
        maxResults: args.limit || '25',
      })
      break
    }

    case 'demographics': {
      result = await analyticsApi({
        ids: `channel==${channelId}`,
        startDate,
        endDate,
        metrics: 'viewerPercentage',
        dimensions: 'ageGroup,gender',
      })
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          'channel overview': 'channel overview [--start YYYY-MM-DD] [--end YYYY-MM-DD] [--channel <id>]',
          'channel daily': 'channel daily [--start YYYY-MM-DD] [--end YYYY-MM-DD]',
          'videos top': 'videos top [--metric views|estimatedMinutesWatched|subscribersGained] [--limit <n>] [--start YYYY-MM-DD]',
          'videos list': 'videos list [--limit <n>] [--order date|viewCount|rating]',
          'videos retention': 'videos retention --video <video_id> [--start YYYY-MM-DD]',
          traffic: 'traffic [--start YYYY-MM-DD] [--end YYYY-MM-DD]',
          'search-terms': 'search-terms [--start YYYY-MM-DD] [--limit <n>]',
          demographics: 'demographics [--start YYYY-MM-DD] [--end YYYY-MM-DD]',
        },
        envVars: {
          YOUTUBE_ACCESS_TOKEN: 'OAuth2 access token with YouTubeAnalytics.readonly scope',
          YOUTUBE_CHANNEL_ID: 'Optional: channel ID (or use mine for authenticated channel)',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
