# CV Maker Backend

The REST API behind CV Maker — a Hono server on Bun that stores and serves CV projects, validated with Zod and persisted to serverless Neon PostgreSQL through Drizzle ORM. Deploys to Cloudflare Workers.

> This app lives in the CV Maker monorepo. The SPA that consumes this API ships in [`../frontend`](../frontend) — see the [root README](../../README.md) for the full picture.

## ✨ Features

- 📄 **Projects API** — Create, list, search, and fetch CV projects
- 🔍 **Pagination & search** — Offset pagination plus case-insensitive title search
- 🛡️ **Rate limiting** — Built-in protection on project routes
- 🔒 **Security headers** — Applied to every response
- 📏 **Payload limits** — Request body size capping
- ✅ **Zod validation** — Every input validated at the boundary
- 🚫 **No auth required** — Fully open access

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Bun** | JavaScript runtime & package manager |
| **Hono** | Fast, edge-ready web framework |
| **Cloudflare Workers** | Deployment target |
| **Neon PostgreSQL** | Serverless database |
| **Drizzle ORM** | Type-safe queries & migrations |
| **Zod** | Request validation |
| **cuid2** | Collision-resistant IDs |

## 🚀 Local Development

From the monorepo root (installs every workspace):

```bash
bun install
```

Then, from `apps/backend`:

```bash
# 1. Configure environment
cp .env.example .env        # then set DATABASE_URL to your Neon connection string

# 2. Push the database schema
bun run db:push

# 3. Start the dev server (hot reload)
bun run dev
```

The API serves at `http://localhost:3000`.

## 🔐 Environment Variables

Loaded from `apps/backend/.env` and validated with Zod at startup (`src/config/env.ts`).

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string, e.g. `postgresql://user:password@host/database?sslmode=require` |

## 📜 Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server with hot reload |
| `bun run start` | Start server without hot reload |
| `bun run build` | No-op — `wrangler deploy` bundles the Worker directly |
| `bun run db:generate` | Generate Drizzle migrations from the schema |
| `bun run db:migrate` | Apply generated migrations |
| `bun run db:push` | Push the schema directly to the database |
| `bun run db:studio` | Open Drizzle Studio (database GUI) |

## 🔌 API Endpoints

| Method | Endpoint | Description | Success |
|---|---|---|---|
| `GET` | `/` | Health check — status + timestamp | `200` |
| `GET` | `/api/projects` | List projects (paginated, searchable) | `200` |
| `GET` | `/api/projects/:id` | Get a single project by its cuid2 ID | `200` |
| `POST` | `/api/projects` | Create a new project | `201` |

### Query parameters — `GET /api/projects`

| Param | Type | Default | Description |
|---|---|---|---|
| `limit` | number (1–100) | `10` | Max projects to return |
| `offset` | number (≥ 0) | `0` | Pagination offset |
| `order` | `"asc"` \| `"desc"` | `"desc"` | Order by creation date |
| `qTitle` | string | — | Case-insensitive title search |

### Request body — `POST /api/projects`

| Field | Type | Rules |
|---|---|---|
| `title` | `string` | Required, 1–255 characters |
| `content` | `object` | Required, any JSON object (the CV data) |

### Response format

```jsonc
// Success
{ "status": true, "message": "Optional message", "result": { } }

// Error
{ "status": false, "error": "Human-readable message", "code": "NOT_FOUND | VALIDATION_ERROR | INTERNAL_ERROR" }
```

## 🗄️ Database

### `project` table

| Column | Type | Description |
|---|---|---|
| `id` | `text` (PK) | Unique cuid2 identifier |
| `title` | `text` | Project title (1–255 chars) |
| `content` | `jsonb` | CV data as flexible JSON |
| `created_at` | `timestamp` | Auto-set creation time |

**Indexes:** `idx_project_created_at`, `idx_project_title`

### Migrations

```bash
bun run db:generate   # generate SQL migrations from src/db/schema
bun run db:migrate    # apply pending migrations
bun run db:push       # sync schema directly (dev shortcut)
bun run db:studio     # browse data in Drizzle Studio
```

## 📦 Deployment (Cloudflare Workers)

The Worker is configured in `wrangler.jsonc` — name `cv-makers-backend`, entry `src/index.ts`, `nodejs_compat` enabled.

```bash
cd apps/backend
wrangler login
wrangler secret put DATABASE_URL   # paste your Neon connection string (one-time)
wrangler deploy
```

CORS origins are allow-listed in `src/index.ts` — update this list to match your Pages deployment domain (localhost origins are already included for local development).

## 📁 Project Structure

```
src/
├── index.ts                 # Hono app: middleware, error handler, routes
├── config/
│   └── env.ts               # Zod-validated environment config
├── db/
│   ├── index.ts             # Neon serverless connection
│   ├── migrations/          # Drizzle migration files
│   └── schema/
│       └── project.ts       # Project table schema
├── lib/
│   └── response-helpers.ts  # Standardized JSON response utilities
├── middleware/
│   ├── rate-limit.ts        # Rate limiting
│   ├── payload-limit.ts     # Request body size limiter
│   └── security-headers.ts  # Security headers
├── routes/
│   └── projects.ts          # Project route handlers
├── services/
│   └── projectService.ts    # Business logic & database queries
└── types/
    └── schemas.ts           # Zod validation schemas & types
```

## 📄 License

MIT
