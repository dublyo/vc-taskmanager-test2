# VibeCoder Template -- Next.js

A production-ready, full-stack Next.js starter template from **[VibeCoder](https://vibecode.new)** -- the AI vibe-coding platform. Clone it, configure your environment variables, and start building.

---

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | Next.js 16.1 (App Router, standalone output)|
| Language     | TypeScript 5.9                              |
| UI           | React 19, Tailwind CSS v4, Lucide icons     |
| Database     | PostgreSQL 17 via Prisma 7 ORM              |
| Auth         | NextAuth.js (credentials provider)          |
| Payments     | Stripe (webhook-ready)                      |
| Email        | Resend                                      |
| File Uploads | UploadThing                                 |
| Cache        | Redis 7 (via ioredis)                       |
| Validation   | Zod 4                                       |
| Toasts       | Sonner                                      |
| Data Fetch   | TanStack React Query                        |
| Font         | DM Sans (Google Fonts)                      |
| Containers   | Docker multi-stage build, Docker Compose    |

## Features

**Authentication**
- Email/password login and registration
- Forgot password and reset password flows
- Session management via NextAuth.js

**Dashboard**
- Sidebar layout with responsive navigation
- User settings -- profile editing and password change
- Dark/light mode toggle (next-themes)

**Payments**
- Stripe integration with webhook endpoint (`/api/stripe/webhook`)
- Ready for subscriptions or one-time charges

**Infrastructure**
- Transactional email via Resend
- File uploads via UploadThing
- Redis for caching and rate limiting
- Health check endpoint (`/api/health`)
- Custom 404 and error pages
- Database seed script (`prisma/seed.ts`)
- Multi-stage Dockerfile with standalone output
- Docker Compose for local Postgres + Redis

**Design System**
- Shuffle-inspired purple (`#382CDD`) accent color
- DM Sans typeface throughout
- Tailwind CSS v4 with `clsx` and `tailwind-merge` utilities

---

## Quick Start

### Prerequisites

- Node.js 22+
- Docker and Docker Compose (for Postgres and Redis)

### 1. Clone and install

```bash
git clone <repo-url> my-app
cd my-app
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values (see the [Environment Variables](#environment-variables) table below). Stripe, Resend, and UploadThing are optional -- the app runs without them.

### 3. Start Postgres and Redis

```bash
docker compose up postgres redis -d
```

### 4. Set up the database

```bash
npx prisma migrate dev
```

### 5. Seed the database (optional)

```bash
npx prisma db seed
```

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
vibecoder-template-nextjs/
|-- prisma/
|   |-- schema.prisma          # Database schema (User, Account, Session, tokens)
|   |-- prisma.config.ts       # Prisma config
|   |-- seed.ts                # Seed script
|-- src/
|   |-- app/
|   |   |-- (auth)/            # Auth pages: login, register, forgot/reset password
|   |   |-- api/
|   |   |   |-- auth/          # NextAuth route + register/forgot/reset endpoints
|   |   |   |-- health/        # Health check
|   |   |   |-- stripe/webhook # Stripe webhook handler
|   |   |   |-- uploadthing/   # UploadThing route
|   |   |   |-- user/          # Profile and password update APIs
|   |   |-- dashboard/         # Dashboard page + settings
|   |   |-- layout.tsx         # Root layout (fonts, providers, theme)
|   |   |-- page.tsx           # Landing page
|   |   |-- not-found.tsx      # Custom 404
|   |   |-- error.tsx          # Error boundary
|   |   |-- globals.css        # Tailwind directives + custom styles
|   |   |-- providers.tsx      # Client providers (session, query, theme, toasts)
|   |-- components/
|   |   |-- layout/            # Header, Footer, Sidebar
|   |   |-- ui/                # ThemeToggle and shared UI
|   |-- lib/
|   |   |-- auth.ts            # NextAuth config
|   |   |-- config.ts          # Centralized env var access
|   |   |-- prisma.ts          # Prisma client singleton
|   |   |-- redis.ts           # Redis client
|   |   |-- resend.ts          # Resend email client
|   |   |-- stripe.ts          # Stripe client
|   |   |-- utils.ts           # Utility helpers
|   |   |-- formatters.ts      # Formatting functions
|   |-- types/
|   |   |-- next-auth.d.ts     # NextAuth type augmentation
|-- Dockerfile                 # Multi-stage production build
|-- docker-compose.yml         # App + Postgres + Redis
|-- next.config.ts             # Next.js config (standalone output)
|-- tsconfig.json
```

---

## Environment Variables

| Variable                             | Required | Description                          |
| ------------------------------------ | -------- | ------------------------------------ |
| `DATABASE_URL`                       | Yes      | PostgreSQL connection string         |
| `AUTH_SECRET`                        | Yes      | Secret for NextAuth.js sessions      |
| `APP_URL`                            | No       | Public app URL (default: `http://localhost:3000`) |
| `NEXTAUTH_URL`                       | No       | NextAuth callback URL (defaults to APP_URL)       |
| `REDIS_URL`                          | No       | Redis connection string (default: `redis://localhost:6379`) |
| `STRIPE_SECRET_KEY`                  | No       | Stripe secret key                    |
| `STRIPE_WEBHOOK_SECRET`             | No       | Stripe webhook signing secret        |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No       | Stripe publishable key (client-side) |
| `RESEND_API_KEY`                     | No       | Resend API key for transactional email |
| `UPLOADTHING_TOKEN`                  | No       | UploadThing token for file uploads   |

All optional integrations (Stripe, Resend, UploadThing) are automatically disabled when their keys are not set.

---

## Deployment

### Docker (recommended)

Build and run the production image:

```bash
docker build -t my-app .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e AUTH_SECRET="your-secret" \
  -e REDIS_URL="redis://host:6379" \
  my-app
```

The Dockerfile uses a multi-stage build (Node 22 bookworm-slim) and outputs a minimal standalone bundle. On startup it runs `prisma db push` to apply schema changes, then starts the server.

### Docker Compose (full stack)

```bash
docker compose up --build
```

This starts the app, PostgreSQL 17, and Redis 7 together with health checks and persistent volumes.

### Standalone Output

The Next.js config sets `output: 'standalone'`, producing a self-contained `.next/standalone` directory. You can deploy this to any Node.js host:

```bash
npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
node .next/standalone/server.js
```

---

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start development server           |
| `npm run build`     | Production build (standalone)      |
| `npm run start`     | Start production server            |
| `npx prisma studio` | Open Prisma database browser       |
| `npx prisma db seed`| Run the seed script                |

---

## License

MIT

---

Built with [VibeCoder](https://vibecode.new)
