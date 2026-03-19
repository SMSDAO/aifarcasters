# Deployment Guide

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker (optional)

## Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set the root directory to the repo root
3. Vercel will use `vercel.json` at the root

**Environment variables to configure in Vercel:**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Docker

```bash
# Build and start
docker-compose -f infra/docker/docker-compose.yml up -d

# Stop
docker-compose -f infra/docker/docker-compose.yml down
```

## Manual Deployment

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start the web app
cd apps/web && pnpm start
```

## Environment Setup

Copy `.env.example` to `.env.local` in `apps/web/`:
```bash
cp .env.example apps/web/.env.local
```

Fill in all required values. See `.env.example` for documentation.

## Database Migrations

```bash
cd packages/db
pnpm db:generate  # generate Prisma client
pnpm db:migrate   # run migrations (dev)
pnpm db:push      # push schema (prod)
```

## Smart Contract Deployment

See [SMART_CONTRACTS.md](./SMART_CONTRACTS.md) for contract deployment instructions.
