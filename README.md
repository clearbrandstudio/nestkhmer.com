# NestKhmer — Only Fresh Listings. Only Real Results.

Cambodia's rental intelligence platform.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- **Backend**: Hono.js + Drizzle ORM + PostgreSQL
- **Monorepo**: Turborepo

## Getting Started

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:3001

## Structure

```
apps/
  web/     — Next.js 15 frontend
  api/     — Hono.js API server
packages/
  shared/  — Zod schemas, types, DB schema
  ui/      — Design system components
```
