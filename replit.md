# Wedding Website Builder

## Overview

This is a premium wedding website builder that allows couples to create animated, interactive wedding invitation websites. Couples receive an access code (tied to an Etsy order), log in, choose a template style, enter their wedding details, and then AI generates personalized content for their wedding site. The generated site can be previewed, downloaded as a zip, and shared via a public URL.

The product is designed to feel luxurious, romantic, and effortless — targeting non-technical brides and grooms aged 23–38 who want elegant results without design skills.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (React + Vite)
- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state; local component state with useState
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Animations**: Framer Motion for page transitions and scroll-reveal effects
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Styling**: Tailwind CSS with CSS custom properties for theming; multiple wedding template themes defined in `client/src/lib/themes.ts`
- **Key Pages**:
  - `/` — Login page (access code entry)
  - `/dashboard` — Multi-step wizard (choose template → enter details → generate)
  - `/preview` — Preview generated wedding site with download/share options
  - `/wedding/:id` — Public-facing wedding page for guests
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript, run via tsx in dev and esbuild-bundled for production
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod schemas for input validation and response types
- **Key Endpoints**:
  - `POST /api/login` — Authenticate with access code
  - `GET /api/orders/:id` — Get order details
  - `PUT /api/orders/:id` — Update order (template, wedding details)
  - `POST /api/orders/:id/generate` — AI-generate wedding content
  - `GET /api/orders/:id/download` — Download wedding site as ZIP
- **AI Content Generation**: Uses OpenAI API (via Replit AI Integrations) to generate personalized wedding copy (welcome message, love story, venue details, RSVP message, SEO content)
- **Static Serving**: In production, serves built Vite output from `dist/public/`; in dev, uses Vite middleware with HMR

### Shared Code (`shared/`)
- `schema.ts` — Drizzle ORM table definitions and Zod schemas (orders table with wedding details and generated content as JSONB)
- `routes.ts` — API route definitions with paths, methods, and Zod input/output schemas
- `models/chat.ts` — Chat/conversation tables (for Replit AI integrations, not core to wedding builder)

### Database
- **PostgreSQL** via Drizzle ORM with `node-postgres` driver
- **Schema Management**: `drizzle-kit push` for schema sync (no migration files needed for dev)
- **Main Table**: `orders` — stores Etsy order ID, access code, selected template, wedding details (JSONB), AI-generated content (JSONB), domain, status
- **Session Storage**: connect-pg-simple available for session management

### Wedding Templates
- 5 template themes: Sage Green, Old Money, Minimalist, Luxury Gold, Botanical
- Each theme has a full config in `client/src/lib/themes.ts` (colors, fonts, gradients)
- Template components in `client/src/components/templates/` render the actual wedding pages
- A unified `WeddingTemplate` component in `client/src/components/wedding-template.tsx` handles countdown, sections, RSVP, and music

### Build System
- **Dev**: `tsx server/index.ts` with Vite dev server middleware
- **Build**: Custom `script/build.ts` — Vite builds the client, esbuild bundles the server
- **Output**: `dist/` directory with `dist/public/` for static assets and `dist/index.cjs` for server

### Replit Integrations (in `server/replit_integrations/` and `client/replit_integrations/`)
- Pre-built modules for chat, audio/voice, image generation, and batch processing
- These use Replit's AI Integration environment variables (`AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`)
- Not all are actively used by the wedding builder, but are available infrastructure

## External Dependencies

### Database
- **PostgreSQL** — Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM** — Query builder and schema definition
- **connect-pg-simple** — PostgreSQL session store (available but may not be actively used)

### AI / LLM
- **OpenAI API** (via Replit AI Integrations) — Generates personalized wedding content
  - Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`
  - Used for text generation (wedding copy) and optionally image generation

### Frontend Libraries
- **Radix UI** — Accessible primitive components (dialog, popover, tabs, etc.)
- **shadcn/ui** — Pre-styled component layer on Radix
- **Framer Motion** — Animations and transitions
- **TanStack React Query** — Server state management and caching
- **canvas-confetti** — Celebration effect when wedding site is generated
- **date-fns** — Date formatting utilities
- **Embla Carousel** — Carousel component (via shadcn)
- **Recharts** — Charting library (via shadcn, may not be actively used)

### Build Tools
- **Vite** — Frontend dev server and bundler
- **esbuild** — Server-side bundling for production
- **tsx** — TypeScript execution for dev server
- **Tailwind CSS** — Utility-first CSS framework
- **PostCSS + Autoprefixer** — CSS processing

### Other
- **AdmZip** — ZIP file creation for downloadable wedding sites
- **Wouter** — Lightweight React router
- **Zod** — Schema validation (shared between client and server)
- **nanoid** — Unique ID generation