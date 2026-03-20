export const config = {
  app: {
    name: 'AiFarcaster',
    version: process.env.npm_package_version ?? '0.1.0',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  },
  ai: {
    model: 'gpt-4o-mini',
    fallbackModel: 'gpt-3.5-turbo',
    maxTokens: 2048,
    temperature: 0.7,
  },
  rateLimits: {
    ai: { requests: 10, window: '1m' },
    api: { requests: 100, window: '1m' },
    auth: { requests: 5, window: '1m' },
  },
  subscription: {
    free: { tokensPerMonth: 10_000, promptsPerDay: 50 },
    pro: { tokensPerMonth: 100_000, promptsPerDay: 500 },
    enterprise: { tokensPerMonth: -1, promptsPerDay: -1 },
  },
} as const;

export type Config = typeof config;
