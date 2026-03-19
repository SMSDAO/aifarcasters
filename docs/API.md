# API Reference

## Base URL

```
https://aifarcasters.xyz/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

Obtain a token by signing in with SIWE (Sign-In with Ethereum).

## Endpoints

### POST /api/auth/siwe/verify
Verify a SIWE signature and obtain a session token.

**Body:**
```json
{
  "message": "...",
  "signature": "0x...",
  "nonce": "..."
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJ...",
  "address": "0x..."
}
```

### POST /api/ai/optimize
Optimize a prompt using AI.

**Auth:** Required (user, developer, admin)

**Body:**
```json
{
  "input": "Your prompt here",
  "context": "Optional context",
  "model": "gpt-4o-mini",
  "maxTokens": 2048,
  "temperature": 0.7
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "optimized": "Optimized prompt...",
    "tokensUsed": 150,
    "model": "gpt-4o-mini",
    "reasoning": "..."
  }
}
```

### GET /api/feed
Get the social feed.

**Auth:** Required

**Query params:**
- `limit` (number, 1-100, default: 20)
- `cursor` (string, optional)

### POST /api/billing/checkout
Create a Stripe checkout session.

**Auth:** Required

**Body:**
```json
{
  "plan": "pro",
  "successUrl": "https://...",
  "cancelUrl": "https://..."
}
```

### GET /api/contracts
Get deployed contract addresses.

**Auth:** Required (admin, developer)

## Error Responses

```json
{
  "error": "Error message",
  "details": { ... }
}
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 422 | Validation error |
| 500 | Server error |
