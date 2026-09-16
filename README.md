<div align="center">

# CV Maker

**Build a polished, recruiter-ready résumé in minutes — free, open-source, no sign-up.**

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#-license)
[![React 19](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)](#%EF%B8%8F-tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](#%EF%B8%8F-tech-stack)
[![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)](#%EF%B8%8F-tech-stack)
[![Hono](https://img.shields.io/badge/Hono-E36002)](#%EF%B8%8F-tech-stack)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white)](#-deployment)

</div>

CV Maker is a full-stack résumé builder with a real-time editor, seven professionally designed templates, and one-click PDF export. Everything runs on Cloudflare's global edge — the SPA on Pages, the API on Workers, with serverless Neon Postgres behind it — so it's fast everywhere and costs nothing to host.

## ✨ Features

Seven hand-crafted templates, all rendering from the same CV data — switch styles without losing content:

| Template | Style |
|---|---|
| **Modern** | Clean two-column layout with accent sidebar |
| **Dark** | Dark theme with vibrant accent colors |
| **Classic** | Traditional single-column professional design |
| **Minimal** | Ultra-clean minimalist layout |
| **Executive** | Corporate style with strong typography |
| **Vibrant** | Colorful and creative design |
| **ATS** | Applicant-tracking-system friendly single column |

Plus a real-time editor with live preview, instant PDF export, and public share links for every saved CV — no account required.

## 🏗️ Architecture

A Bun-workspaces monorepo with two independently deployable apps:

```
  Browser
    │
    ├── static SPA ──────►  Cloudflare Pages  ·  apps/frontend
    │                       React 19 · Vite · Tailwind CSS
    │
    └── REST · JSON ─────►  Cloudflare Workers  ·  apps/backend
                            Hono · Zod · Drizzle ORM
                                  │
                                  └── SQL over HTTPS ──►  Neon PostgreSQL
```

The frontend talks to the backend through a single axios client (`apps/frontend/src/lib/apiClient.ts`) pointing at the deployed Worker. The backend validates every request with Zod, applies rate limits and security headers, and persists CV projects to Neon Postgres via Drizzle ORM.

## 🛠️ Tech Stack

| | Frontend (`apps/frontend`) | Backend (`apps/backend`) |
|---|---|---|
| **Runtime** | — | [Bun](https://bun.sh) |
| **Framework** | [React 19](https://react.dev) | [Hono](https://hono.dev) |
| **Language** | TypeScript | TypeScript |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + Radix UI | — |
| **Build** | [Vite 8](https://vite.dev) | Wrangler (bundles at deploy) |
| **Data** | TanStack Query · axios | [Drizzle ORM](https://orm.drizzle.team) · [Zod](https://zod.dev) · [Neon Postgres](https://neon.tech) |
| **Hosting** | Cloudflare Pages | Cloudflare Workers |

## 🚀 Quick Start

**Prerequisites:** [Bun](https://bun.sh/) ≥ 1.0 and a [Neon](https://neon.tech/) PostgreSQL database (free tier works).

```bash
# 1. Clone and install all workspace dependencies
git clone https://github.com/2ve2/cv-maker-frontend.git cv-maker
cd cv-maker
bun install

# 2. Configure the backend
cp apps/backend/.env.example apps/backend/.env
#    edit apps/backend/.env and set your Neon connection string

# 3. Push the database schema
cd apps/backend && bun run db:push && cd ../..

# 4. Run everything
bun run dev
```

| URL | App |
|---|---|
| `http://localhost:5173` | Frontend (Vite dev server) |
| `http://localhost:3000` | Backend (Hono API) |

The only environment variable the monorepo needs:

| Variable | Location | Description |
|---|---|---|
| `DATABASE_URL` | `apps/backend/.env` | Neon PostgreSQL connection string, e.g. `postgresql://user:password@host/database?sslmode=require` |

<details>
<summary>Other useful scripts</summary>

| Command | Description |
|---|---|
| `bun run dev:frontend` | Frontend dev server only |
| `bun run dev:backend` | Backend dev server only |
| `bun run build:frontend` | Type-check + production build |
| `bun run build:backend` | No-op — `wrangler deploy` bundles the Worker directly |

</details>

> By default the frontend calls the deployed API at `https://cv-makers-backend.bdalrhmnmtwq53.workers.dev`. To pair it with your local backend, point `API_BASES[0]` in `apps/frontend/src/lib/apiClient.ts` at `http://localhost:3000`.

## 📦 Deployment

Each app deploys independently to Cloudflare.

### Frontend → Cloudflare Pages

Connect the repo in the Cloudflare dashboard (**Workers & Pages → Create → Pages → Git**) with:

| Setting | Value |
|---|---|
| Root directory | `apps/frontend` |
| Build command | `bun run build` |
| Build output directory | `dist` |

Or deploy from the CLI:

```bash
cd apps/frontend
bun run build
wrangler pages deploy dist
```

`public/_redirects` already contains the SPA fallback (`/* /index.html 200`).

### Backend → Cloudflare Workers

```bash
cd apps/backend
wrangler login
wrangler secret put DATABASE_URL   # paste your Neon connection string
wrangler deploy
```

Configuration lives in `apps/backend/wrangler.jsonc` (Worker name `cv-makers-backend`, entry `src/index.ts`, `nodejs_compat` enabled). Note that CORS origins are allow-listed in `apps/backend/src/index.ts` — update that list if your Pages domain differs from `https://cv-maker-2cl.pages.dev`.

## 📁 Project Structure

```
cv-maker/
├── apps/
│   ├── frontend/               # React 19 + Vite + Tailwind CSS
│   │   ├── public/             # Static assets + Pages SPA fallback
│   │   └── src/
│   │       ├── components/     # CVEditor, SiteHeader, templates/, ui/
│   │       ├── pages/          # Home, Editor, CVs, CV view, 404
│   │       ├── hooks/          # CV document state, mobile detection
│   │       ├── lib/            # apiClient, projects service, PDF export
│   │       └── types/          # CV & project type definitions
│   └── backend/                # Hono + Bun + Drizzle + Neon
│       └── src/
│           ├── config/         # Zod-validated environment
│           ├── db/             # Connection, schema, migrations
│           ├── middleware/     # Rate limit, payload limit, security headers
│           ├── routes/         # /api/projects handlers
│           ├── services/       # Business logic & queries
│           └── types/          # Zod schemas
├── package.json                # Workspace root + convenience scripts
├── bun.lock                    # Single lockfile for the monorepo
└── README.md
```

## 🤝 Contributing

Issues and pull requests are welcome. To contribute:

1. Fork the repo and create a branch for your change
2. `bun install` from the root, then `bun run dev` to work on either app
3. Keep changes focused — no application-logic rewrites in a single PR
4. Open a pull request with a short description of what and why

## 📄 License

MIT
