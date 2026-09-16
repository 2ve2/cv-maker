# CV Maker Frontend

A modern, open-source CV/Resume builder frontend built with React and TypeScript. Create beautiful resumes with 7 professionally designed templates, a real-time editor, and instant PDF export.

> **Backend Repository:** [cv-maker-backend](https://github.com/2ve2/cv-maker-backend)

## ✨ Features

- 🎨 **7 CV Templates** — Modern, Dark, Classic, Minimal, Executive, Vibrant, and ATS
- ✏️ **Real-time Editor** — Live preview as you type
- 📄 **PDF Export** — Instant download with one click
- 🔗 **Public Links** — Share your CV with recruiters via a public URL
- 📱 **Responsive** — Works on desktop, tablet, and mobile
- 🆓 **Free Forever** — No sign-up required, no paywalls

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

## 📋 Prerequisites

- [Bun](https://bun.sh/) >= 1.0 (recommended) or Node.js >= 18
- The [CV Maker Backend](https://github.com/2ve2/cv-maker-backend) running locally or deployed

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/2ve2/cv-maker-frontend.git
cd cv-maker-frontend
```

### 2. Install dependencies

```bash
bun install
```

### 3. Start the development server

```bash
bun dev
```

Opens on `http://localhost:5173`.

### 4. API base URL

By default the frontend connects to the deployed backend at `https://cv-makers-backend.bdalrhmnmtwq53.workers.dev` (hardcoded in `src/lib/apiClient.ts`). To run against a local backend instead, edit `API_BASES[0]` in that file.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `bun dev` | Start development server with HMR |
| `bun run build` | Type-check and build for production |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint |

## 🎨 Templates

| Template | Style |
|---|---|
| **Modern** | Clean two-column layout with accent sidebar |
| **Dark** | Dark theme with vibrant accent colors |
| **Classic** | Traditional single-column professional design |
| **Minimal** | Ultra-clean minimalist layout |
| **Executive** | Corporate-style with strong typography |
| **Vibrant** | Colorful and creative design |
| **ATS** | Applicant-tracking-system friendly single-column |

## 📁 Project Structure

```
src/
├── components/
│   ├── CVEditor.tsx           # Main CV editor form
│   ├── SiteHeader.tsx         # Navigation header
│   ├── templates/             # 7 CV templates
│   │   ├── ModernTemplate.tsx
│   │   ├── DarkTemplate.tsx
│   │   ├── ClassicTemplate.tsx
│   │   ├── MinimalTemplate.tsx
│   │   ├── ExecutiveTemplate.tsx
│   │   ├── VibrantTemplate.tsx
│   │   ├── ATSTemplate.tsx     # ATS-friendly single-column
│   │   ├── registry.ts        # Template registry
│   │   └── shared.tsx         # Shared template utilities
│   └── ui/                    # Reusable UI components
├── pages/
│   ├── HomePage.tsx           # Landing page
│   ├── EditorPage.tsx         # CV editor page
│   ├── CVsPage.tsx            # Published CVs list
│   ├── CVViewPage.tsx         # Single CV view/share
│   └── NotFoundPage.tsx       # 404 page
├── hooks/
│   ├── use-cv-document.ts     # CV document state management
│   └── use-mobile.tsx         # Mobile detection hook
├── lib/
│   ├── apiClient.ts           # Axios API client
│   ├── projectsService.ts     # Project API service
│   ├── pdf.ts                 # PDF export utility
│   └── utils.ts               # General utilities
├── types/
│   ├── cv.ts                  # CV data types
│   └── project.ts             # Project & API types
├── App.tsx                    # Root component with routes
└── main.tsx                   # Entry point
```

## 🔌 API Integration

This frontend connects to the [CV Maker Backend](https://github.com/2ve2/cv-maker-backend) API:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | List all projects (paginated) |
| `GET` | `/api/projects/:id` | Get a single project |
| `POST` | `/api/projects` | Create a new project |

## 📄 License

MIT
