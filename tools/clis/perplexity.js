#!/usr/bin/env node

const API_KEY = process.env.PERPLEXITY_API_KEY
const BASE_URL = 'https://api.perplexity.ai'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'PERPLEXITY_API_KEY environment variable required' }))
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

async function chatRequest(body) {
  if (args['dry-run']) {
    return { _dry_run: true, method: 'POST', url: `${BASE_URL}/chat/completions`, body }
  }
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) return { error: data.error?.message || JSON.stringify(data), status: res.status }
  return data
}

const args = parseArgs(process.argv.slice(2))
const [cmd, ...rest] = args._

async function main() {
  let result

  switch (cmd) {
    case 'search': {
      // Web search with citations
      const query = args.query || rest.join(' ')
      if (!query) { result = { error: '--query required' }; break }
      const model = args.model || 'llama-3.1-sonar-small-128k-online'
      const body = {
        model,
        messages: [
          { role: 'system', content: 'Be precise and concise. Include sources.' },
          { role: 'user', content: query },
        ],
        return_citations: true,
        return_related_questions: false,
        search_recency_filter: args.recency || 'month',
      }
      result = await chatRequest(body)
      if (result.choices) {
        const answer = result.choices[0]?.message?.content || ''
        const citations = result.citations || []
        result = { answer, citations }
      }
      break
    }

    case 'research': {
      // Deep research mode
      const query = args.query || rest.join(' ')
      if (!query) { result = { error: '--query required' }; break }
      const body = {
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a research assistant. Provide comprehensive, accurate information with specific sources. Include relevant statistics, expert opinions, and current data.',
          },
          { role: 'user', content: query },
        ],
        return_citations: true,
        return_related_questions: true,
        search_recency_filter: args.recency || 'year',
      }
      result = await chatRequest(body)
      if (result.choices) {
        const answer = result.choices[0]?.message?.content || ''
        const citations = result.citations || []
        const relatedQuestions = result.related_questions || []
        result = { answer, citations, relatedQuestions }
      }
      break
    }

    case 'competitive': {
      // Competitive intelligence search
      if (!args.brand) { result = { error: '--brand required' }; break }
      const competitor = args.competitor || ''
      const query = competitor
        ? `What are ${args.brand} and ${competitor} known for? What are their strengths, weaknesses, and positioning differences? Include recent news and customer sentiment.`
        : `What is ${args.brand} known for? What is their positioning, strengths, weaknesses, and customer sentiment? Include recent news.`
      const body = {
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          { role: 'system', content: 'Provide factual, balanced competitive intelligence with sources.' },
          { role: 'user', content: query },
        ],
        return_citations: true,
        search_recency_filter: 'month',
      }
      result = await chatRequest(body)
      if (result.choices) {
        const answer = result.choices[0]?.message?.content || ''
        const citations = result.citations || []
        result = { query, answer, citations }
      }
      break
    }

    case 'trends': {
      // Market trend research
      const topic = args.topic || rest.join(' ')
      if (!topic) { result = { error: '--topic required' }; break }
      const body = {
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          { role: 'system', content: 'Research current market trends. Include specific data points, statistics, and authoritative sources from the past 12 months.' },
          { role: 'user', content: `What are the current trends, market size, growth rate, and key developments in ${topic}? Include relevant statistics and expert predictions.` },
        ],
        return_citations: true,
        search_recency_filter: 'year',
      }
      result = await chatRequest(body)
      if (result.choices) {
        const answer = result.choices[0]?.message?.content || ''
        const citations = result.citations || []
        result = { topic, answer, citations }
      }
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          search: 'search --query <query> [--recency day|week|month|year] [--model <model>]',
          research: 'research --query <query> [--recency day|week|month|year]',
          competitive: 'competitive --brand <brand> [--competitor <competitor>]',
          trends: 'trends --topic <topic>',
        },
        models: {
          fast: 'llama-3.1-sonar-small-128k-online',
          standard: 'llama-3.1-sonar-large-128k-online',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
