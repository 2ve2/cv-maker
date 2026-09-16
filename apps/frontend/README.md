# CV Maker Frontend

The React 19 SPA behind CV Maker — a real-time résumé editor with seven templates, live preview, one-click PDF export, and public share links.

> This app lives in the CV Maker monorepo. The API now ships alongside it in [`../backend`](../backend) — see the [root README](../../README.md) for the full picture.

## ✨ Highlights

- 🎨 **7 CV templates** — switch styles without losing content
- ✏️ **Real-time editor** — live preview as you type
- 📄 **PDF export** — instant download via jsPDF
- 🔗 **Public links** — share any saved CV with a URL
- 📱 **Responsive** — desktop, tablet, and mobile

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Styling |
| **Radix UI** | Accessible components |
| **TanStack Query** | Data fetching |
| **React Router** | Client-side routing |
| **jsPDF** | PDF generation |

## 🚀 Local Development

From the monorepo root (installs every workspace):

```bash
bun install
```

Then run this app — either scoped from the root:

```bash
bun run dev:frontend
```

or from inside `apps/frontend`:

```bash
cd apps/frontend
bun dev
```

The dev server starts at `http://localhost:5173`.

**Pairing with the local backend:** by default `src/lib/apiClient.ts` calls the deployed API (`https://cv-makers-backend.bdalrhmnmtwq53.workers.dev`). To develop against the backend in `../backend`, set `API_BASES[0]` to `http://localhost:3000` and start it with `bun run dev:backend`.

## 📜 Scripts

| Command | Description |
|---|---|
| `bun dev` | Start dev server with HMR |
| `bun run build` | Type-check (`tsc -b`) + production build |
| `bun run lint` | Run ESLint |
| `bun run preview` | Preview the production build locally |

## 🎨 Templates

| Template | Style |
|---|---|
| **Modern** | Two-column layout with accent sidebar |
| **Dark** | Dark theme, vibrant accents |
| **Classic** | Traditional single-column |
| **Minimal** | Ultra-clean minimalist |
| **Executive** | Corporate, strong typography |
| **Vibrant** | Colorful and creative |
| **ATS** | Applicant-tracking-system friendly |

All templates render from the same CV data model and are registered in `src/components/templates/registry.ts`.

## 📁 Project Structure

```
src/
├── components/
│   ├── CVEditor.tsx        # Main CV editor form
│   ├── SiteHeader.tsx      # Navigation header
│   ├── templates/          # 7 CV templates + registry + shared utils
│   └── ui/                 # Reusable UI components
├── pages/                  # Home, Editor, CVs, CV view, 404
├── hooks/                  # CV document state, mobile detection
├── lib/                    # apiClient, projects service, PDF export, utils
└── types/                  # CV & project types
```

## 📄 License

MIT
