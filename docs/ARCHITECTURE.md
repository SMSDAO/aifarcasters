# AiFarcaster Architecture

## Overview

AiFarcaster is a Turborepo monorepo consisting of multiple apps and packages.

## Structure

```
aifarcasters/
├── apps/
│   ├── web/          # Next.js web application
│   ├── mobile/       # React Native + Expo mobile app
│   └── desktop/      # Electron desktop app
├── packages/
│   ├── core/         # Shared config, env, logger
│   ├── ui/           # Shared UI components + themes
│   ├── ai/           # OpenAI client, optimizer, chains
│   ├── db/           # Prisma schema + client
│   ├── auth/         # JWT sessions, SIWE, RBAC
│   ├── web3/         # wagmi config, wallet utils, NFT gating
│   ├── api/          # Shared API handlers
│   └── contracts/    # Solidity smart contracts (Hardhat)
├── infra/
│   ├── docker/       # Dockerfile + docker-compose
│   ├── ci/           # GitHub Actions workflows
│   └── vercel/       # Vercel deployment config
├── docs/             # Documentation
└── scripts/          # Utility scripts
```

## Packages

### @aifarcasters/core
Foundation package with environment validation, logging (pino), and shared config.

### @aifarcasters/ui
Reusable React components (Button, Card, Modal, Sidebar, Navbar) and themes (dark, neon).

### @aifarcasters/ai
OpenAI integration: prompt optimizer, chain runner, fallback strategy, cost tracking.

### @aifarcasters/db
Prisma ORM schema with models: User, Prompt, Usage, Subscription, Feed.

### @aifarcasters/auth
Authentication: JWT sessions (jose), SIWE (Sign-In with Ethereum), RBAC.

### @aifarcasters/web3
wagmi/RainbowKit config, wallet utilities, NFT access gating.

### @aifarcasters/api
Shared Next.js-compatible API handlers for AI, auth, billing, feed, contracts.

### @aifarcasters/contracts
Hardhat project with PromptNFT (ERC-721) and AiFarcasterAccessControl contracts.

## Data Flow

```
User → Next.js (apps/web) → @aifarcasters/api → @aifarcasters/ai → OpenAI
                                               → @aifarcasters/auth → JWT/SIWE
                                               → @aifarcasters/db → PostgreSQL
```

## Build Pipeline

Turborepo orchestrates builds with dependency awareness:
- `pnpm build` → builds all packages in dependency order
- `pnpm dev` → starts all apps in dev mode
- `pnpm lint` → lints all packages
- `pnpm type-check` → TypeScript checks across all packages
