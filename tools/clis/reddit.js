#!/usr/bin/env node

// Reddit API v2 (OAuth2 client credentials for read-only operations)
// Requires a Reddit app: reddit.com/prefs/apps → "script" type
// Set: REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET
// Optional: REDDIT_USERNAME, REDDIT_PASSWORD (for user-context requests)

const CLIENT_ID = process.env.REDDIT_CLIENT_ID
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET
const BASE_URL = 'https://oauth.reddit.com'
const TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(JSON.stringify({ error: 'REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET environment variables required. Create an app at reddit.com/prefs/apps (script type).' }))
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

let _token = null
async function getToken() {
  if (_token) return _token
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'marketingskills-cli/1.0',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Auth failed: ${data.message || JSON.stringify(data)}`)
  _token = data.access_token
  return _token
}

async function redditApi(path, params = {}) {
  if (args['dry-run']) {
    return { _dry_run: true, url: `${BASE_URL}${path}?${new URLSearchParams(params)}` }
  }
  const token = await getToken()
  const qs = new URLSearchParams(params)
  const res = await fetch(`${BASE_URL}${path}?${qs}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'marketingskills-cli/1.0',
    },
  })
  const data = await res.json()
  if (!res.ok) return { error: data.message || JSON.stringify(data), status: res.status }
  return data
}

// Extract clean post data from Reddit API response
function formatPost(post) {
  const d = post.data
  return {
    id: d.id,
    title: d.title,
    subreddit: d.subreddit,
    url: `https://reddit.com${d.permalink}`,
    score: d.score,
    upvoteRatio: d.upvote_ratio,
    numComments: d.num_comments,
    author: d.author,
    created: new Date(d.created_utc * 1000).toISOString().split('T')[0],
    selftext: d.selftext ? d.selftext.slice(0, 300) : '',
    flair: d.link_flair_text || null,
    isVideo: d.is_video,
    domain: d.domain,
  }
}

function formatSubreddit(sr) {
  const d = sr.data
  return {
    name: d.display_name,
    title: d.title,
    subscribers: d.subscribers,
    description: d.public_description ? d.public_description.slice(0, 200) : '',
    url: `https://reddit.com${d.url}`,
    created: new Date(d.created_utc * 1000).toISOString().split('T')[0],
    over18: d.over18,
  }
}

const args = parseArgs(process.argv.slice(2))
const [cmd, sub] = args._

async function main() {
  let result
  const limit = args.limit || '25'

  switch (cmd) {
    case 'search': {
      // Search posts across Reddit
      const query = args.query || args._[1]
      if (!query) { result = { error: '--query required' }; break }
      const sort = args.sort || 'relevance' // relevance, hot, top, new, comments
      const time = args.time || 'year' // hour, day, week, month, year, all
      const subreddit = args.subreddit ? `/r/${args.subreddit}` : ''
      const data = await redditApi(`${subreddit}/search.json`, {
        q: query,
        sort,
        t: time,
        limit,
        type: 'link',
      })
      if (data.error || data._dry_run) { result = data; break }
      const posts = (data.data?.children || []).map(formatPost)
      result = { query, sort, time, count: posts.length, posts }
      break
    }

    case 'subreddit': {
      switch (sub) {
        case 'info': {
          const name = args.name || args._[2]
          if (!name) { result = { error: '--name (subreddit name) required' }; break }
          const data = await redditApi(`/r/${name}/about.json`)
          if (data.error || data._dry_run) { result = data; break }
          result = formatSubreddit(data)
          break
        }
        case 'top': {
          const name = args.name || args._[2]
          if (!name) { result = { error: '--name (subreddit name) required' }; break }
          const time = args.time || 'month'
          const data = await redditApi(`/r/${name}/top.json`, { t: time, limit })
          if (data.error || data._dry_run) { result = data; break }
          const posts = (data.data?.children || []).map(formatPost)
          result = { subreddit: name, time, count: posts.length, posts }
          break
        }
        case 'hot': {
          const name = args.name || args._[2]
          if (!name) { result = { error: '--name (subreddit name) required' }; break }
          const data = await redditApi(`/r/${name}/hot.json`, { limit })
          if (data.error || data._dry_run) { result = data; break }
          const posts = (data.data?.children || []).map(formatPost)
          result = { subreddit: name, count: posts.length, posts }
          break
        }
        case 'find': {
          // Find subreddits matching a topic
          const query = args.query || args._[2]
          if (!query) { result = { error: '--query required' }; break }
          const data = await redditApi('/subreddits/search.json', { q: query, limit })
          if (data.error || data._dry_run) { result = data; break }
          const subs = (data.data?.children || []).map(formatSubreddit)
          result = { query, count: subs.length, subreddits: subs }
          break
        }
        default:
          result = { error: 'Unknown subreddit subcommand. Use: info, top, hot, find' }
      }
      break
    }

    case 'mentions': {
      // Brand/keyword mention monitoring across Reddit
      const brand = args.brand || args._[1]
      if (!brand) { result = { error: '--brand (brand or keyword to monitor) required' }; break }
      const time = args.time || 'month'
      const sort = args.sort || 'new'

      // Search for brand mentions
      const data = await redditApi('/search.json', {
        q: brand,
        sort,
        t: time,
        limit,
        type: 'link,comment',
      })
      if (data.error || data._dry_run) { result = data; break }
      const posts = (data.data?.children || []).map(formatPost)

      // Analyze sentiment distribution roughly via score
      const highScore = posts.filter(p => p.score >= 100)
      const subredditBreakdown = {}
      posts.forEach(p => {
        subredditBreakdown[p.subreddit] = (subredditBreakdown[p.subreddit] || 0) + 1
      })

      result = {
        brand,
        time,
        sort,
        totalMentions: posts.length,
        highEngagementPosts: highScore.length,
        subredditBreakdown,
        posts,
      }
      break
    }

    case 'competitor': {
      // Compare your brand vs a competitor's Reddit presence
      const brand = args.brand
      const competitor = args.competitor
      if (!brand || !competitor) { result = { error: '--brand and --competitor required' }; break }
      const time = args.time || 'month'

      const [brandData, competitorData] = await Promise.all([
        redditApi('/search.json', { q: brand, sort: 'new', t: time, limit }),
        redditApi('/search.json', { q: competitor, sort: 'new', t: time, limit }),
      ])
      if (brandData.error) { result = brandData; break }
      if (competitorData.error) { result = competitorData; break }

      const brandPosts = (brandData.data?.children || []).map(formatPost)
      const competitorPosts = (competitorData.data?.children || []).map(formatPost)

      result = {
        time,
        brand: {
          name: brand,
          mentions: brandPosts.length,
          avgScore: brandPosts.length ? Math.round(brandPosts.reduce((s, p) => s + p.score, 0) / brandPosts.length) : 0,
          topSubreddits: Object.entries(
            brandPosts.reduce((acc, p) => { acc[p.subreddit] = (acc[p.subreddit] || 0) + 1; return acc }, {})
          ).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })),
        },
        competitor: {
          name: competitor,
          mentions: competitorPosts.length,
          avgScore: competitorPosts.length ? Math.round(competitorPosts.reduce((s, p) => s + p.score, 0) / competitorPosts.length) : 0,
          topSubreddits: Object.entries(
            competitorPosts.reduce((acc, p) => { acc[p.subreddit] = (acc[p.subreddit] || 0) + 1; return acc }, {})
          ).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => ({ name, count })),
        },
      }
      break
    }

    case 'trending': {
      // Get trending/hot posts in a specific subreddit for content inspiration
      const subredditName = args.subreddit || args._[1]
      if (!subredditName) { result = { error: '--subreddit required' }; break }
      const time = args.time || 'week'
      const data = await redditApi(`/r/${subredditName}/top.json`, { t: time, limit })
      if (data.error || data._dry_run) { result = data; break }
      const posts = (data.data?.children || []).map(formatPost)

      // Extract content patterns
      const titleWords = posts.flatMap(p => p.title.toLowerCase().split(/\s+/))
        .filter(w => w.length > 4)
        .reduce((acc, w) => { acc[w] = (acc[w] || 0) + 1; return acc }, {})
      const topWords = Object.entries(titleWords)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([word, count]) => ({ word, count }))

      result = {
        subreddit: subredditName,
        time,
        totalPosts: posts.length,
        contentInsights: { topTitleWords: topWords },
        posts,
      }
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          search: 'search --query <query> [--subreddit <name>] [--sort relevance|hot|top|new] [--time hour|day|week|month|year|all] [--limit <n>]',
          'subreddit info': 'subreddit info --name <subreddit>',
          'subreddit top': 'subreddit top --name <subreddit> [--time week|month|year|all] [--limit <n>]',
          'subreddit hot': 'subreddit hot --name <subreddit> [--limit <n>]',
          'subreddit find': 'subreddit find --query <topic>',
          mentions: 'mentions --brand <brand> [--time month|year|all] [--sort new|relevance|top]',
          competitor: 'competitor --brand <your-brand> --competitor <competitor> [--time month|year]',
          trending: 'trending --subreddit <name> [--time week|month|year]',
        },
        envVars: {
          REDDIT_CLIENT_ID: 'App client ID from reddit.com/prefs/apps',
          REDDIT_CLIENT_SECRET: 'App client secret from reddit.com/prefs/apps',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
