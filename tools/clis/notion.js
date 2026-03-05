#!/usr/bin/env node

const API_KEY = process.env.NOTION_API_KEY
const BASE_URL = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

if (!API_KEY) {
  console.error(JSON.stringify({ error: 'NOTION_API_KEY environment variable required' }))
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

async function api(method, path, body) {
  if (args['dry-run']) {
    return { _dry_run: true, method, url: `${BASE_URL}${path}`, headers: { Authorization: 'Bearer ***', 'Notion-Version': NOTION_VERSION }, body }
  }
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
  }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(`${BASE_URL}${path}`, opts)
  const data = await res.json()
  if (!res.ok) return { error: data.message || JSON.stringify(data), status: res.status }
  return data
}

const args = parseArgs(process.argv.slice(2))
const [cmd, sub] = args._

async function main() {
  let result

  switch (cmd) {
    case 'search': {
      const body = {}
      if (args.query) body.query = args.query
      if (args.type) body.filter = { property: 'object', value: args.type }
      if (args.limit) body.page_size = parseInt(args.limit)
      result = await api('POST', '/search', body)
      break
    }

    case 'page':
      switch (sub) {
        case 'get': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('GET', `/pages/${args.id}`)
          break
        }
        case 'create': {
          if (!args.parent) { result = { error: '--parent (database_id) required' }; break }
          if (!args.title) { result = { error: '--title required' }; break }
          const body = {
            parent: { database_id: args.parent },
            properties: {
              Name: { title: [{ type: 'text', text: { content: args.title } }] },
            },
          }
          result = await api('POST', '/pages', body)
          break
        }
        case 'update': {
          if (!args.id) { result = { error: '--id required' }; break }
          const body = { properties: {} }
          if (args.title) body.properties.Name = { title: [{ type: 'text', text: { content: args.title } }] }
          if (args.archived) body.archived = args.archived === 'true'
          result = await api('PATCH', `/pages/${args.id}`, body)
          break
        }
        default:
          result = { error: 'Unknown page subcommand. Use: get, create, update' }
      }
      break

    case 'database':
      switch (sub) {
        case 'query': {
          if (!args.id) { result = { error: '--id required' }; break }
          const body = {}
          if (args.limit) body.page_size = parseInt(args.limit)
          result = await api('POST', `/databases/${args.id}/query`, body)
          break
        }
        case 'get': {
          if (!args.id) { result = { error: '--id required' }; break }
          result = await api('GET', `/databases/${args.id}`)
          break
        }
        default:
          result = { error: 'Unknown database subcommand. Use: query, get' }
      }
      break

    case 'blocks':
      switch (sub) {
        case 'list': {
          if (!args.id) { result = { error: '--id (page_id) required' }; break }
          const qs = args.limit ? `?page_size=${args.limit}` : ''
          result = await api('GET', `/blocks/${args.id}/children${qs}`)
          break
        }
        case 'append': {
          if (!args.id) { result = { error: '--id (block_id) required' }; break }
          if (!args.text) { result = { error: '--text required' }; break }
          const body = {
            children: [{
              object: 'block',
              type: 'paragraph',
              paragraph: { rich_text: [{ type: 'text', text: { content: args.text } }] },
            }],
          }
          result = await api('PATCH', `/blocks/${args.id}/children`, body)
          break
        }
        default:
          result = { error: 'Unknown blocks subcommand. Use: list, append' }
      }
      break

    case 'users': {
      result = await api('GET', '/users')
      break
    }

    default:
      result = {
        error: 'Unknown command',
        usage: {
          search: 'search [--query <text>] [--type page|database] [--limit <n>]',
          'page get': 'page get --id <page_id>',
          'page create': 'page create --parent <database_id> --title <title>',
          'page update': 'page update --id <page_id> [--title <title>] [--archived true|false]',
          'database get': 'database get --id <database_id>',
          'database query': 'database query --id <database_id> [--limit <n>]',
          'blocks list': 'blocks list --id <page_id> [--limit <n>]',
          'blocks append': 'blocks append --id <block_id> --text <content>',
          users: 'users',
        },
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
