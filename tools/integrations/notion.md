# Notion

All-in-one workspace for notes, wikis, databases, and project management. Used by marketing teams to store content calendars, campaign briefs, competitive intel, and knowledge bases.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v1 |
| MCP | - | Not available |
| CLI | ✓ | `tools/clis/notion.js` |
| SDK | ✓ | `@notionhq/client` (Node/Python) |

## Authentication

- **Type**: Bearer Token (Internal Integration Token)
- **Header**: `Authorization: Bearer {token}`
- **Version Header**: `Notion-Version: 2022-06-28` (required on all requests)
- **Get token**: Notion Settings → Integrations → Create new integration
- **Share databases**: Must share the specific database/page with the integration

## Common Agent Operations

### Search all pages and databases

```bash
POST https://api.notion.com/v1/search
Authorization: Bearer {token}
Notion-Version: 2022-06-28
Content-Type: application/json

{
  "query": "content calendar",
  "filter": { "property": "object", "value": "page" },
  "page_size": 20
}
```

### Query a database

```bash
POST https://api.notion.com/v1/databases/{database_id}/query
Authorization: Bearer {token}
Notion-Version: 2022-06-28

{
  "page_size": 50
}
```

### Get page content (blocks)

```bash
GET https://api.notion.com/v1/blocks/{page_id}/children
Authorization: Bearer {token}
Notion-Version: 2022-06-28
```

### Create a page in a database

```bash
POST https://api.notion.com/v1/pages
Authorization: Bearer {token}
Notion-Version: 2022-06-28
Content-Type: application/json

{
  "parent": { "database_id": "{database_id}" },
  "properties": {
    "Name": {
      "title": [{ "type": "text", "text": { "content": "Page title" } }]
    }
  }
}
```

### Update page properties

```bash
PATCH https://api.notion.com/v1/pages/{page_id}
Authorization: Bearer {token}
Notion-Version: 2022-06-28
Content-Type: application/json

{
  "properties": {
    "Status": {
      "select": { "name": "In Progress" }
    }
  }
}
```

### Append content blocks to a page

```bash
PATCH https://api.notion.com/v1/blocks/{page_id}/children
Authorization: Bearer {token}
Notion-Version: 2022-06-28
Content-Type: application/json

{
  "children": [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [{ "type": "text", "text": { "content": "New paragraph content" } }]
      }
    }
  ]
}
```

## Response Format

JSON. Pages have `id`, `properties`, `url`, `created_time`, `last_edited_time`.

## Finding IDs

- **Page/Database ID**: Copy share link → UUID in URL after last `/`
- Or search for the page name: `POST /search` with `query` param

## Common Property Types

| Type | Value Format |
|------|-------------|
| `title` | `[{ "text": { "content": "..." } }]` |
| `rich_text` | `[{ "text": { "content": "..." } }]` |
| `select` | `{ "name": "Option Name" }` |
| `multi_select` | `[{ "name": "Tag1" }, { "name": "Tag2" }]` |
| `date` | `{ "start": "2026-03-01" }` |
| `checkbox` | `true` or `false` |
| `number` | `42` |
| `url` | `"https://example.com"` |

## Rate Limits

- 3 requests per second per integration

## When to Use

- Create content briefs, campaign plans, or content calendar entries
- Query existing databases for context (product roadmap, competitor tracking)
- Append AI-generated content to existing pages
- Search knowledge base for relevant existing content before creating new

## Relevant Skills

- content-strategy
- campaign planning
- marketing-ideas
- sales-enablement
