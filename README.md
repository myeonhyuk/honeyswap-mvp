# HoneySwap MVP Monorepo

This repo contains a legal, original MVP skeleton inspired by the used-goods marketplace domain.

## Stack
- Web: Next.js 14 (App Router)
- API: NestJS 10
- DB: Prisma + SQLite (easy local startup)

## Structure
- `apps/web`: Frontend app
- `apps/api`: Backend API and Prisma schema

## Quick Start
1. Copy `.env.example` to `.env` in root.
2. Install dependencies:
   - `npm install`
3. Generate Prisma client and migrate:
   - `npm run prisma:generate --workspace api`
   - `npm run prisma:migrate --workspace api`
4. Run backend:
   - `npm run dev:api`
5. Run frontend in another terminal:
   - `npm run dev:web`

## MVP Features Included
- Signup/login (JWT)
- Product list/create/update-status
- In-memory chat room/message API (MVP placeholder)
- Front page that consumes product list from API

## Next Steps
- Replace chat placeholder with WebSocket gateway and DB persistence.
- Add refresh tokens and role-based auth guards.
- Expand product filters and image upload.
