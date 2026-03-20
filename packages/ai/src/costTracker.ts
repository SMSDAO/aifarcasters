interface TokenUsage {
  model: string;
  tokensUsed: number;
  userId: string;
  timestamp: Date;
}

const COST_PER_1K_TOKENS: Record<string, number> = {
  'gpt-4o': 0.005,
  'gpt-4o-mini': 0.00015,
  'gpt-3.5-turbo': 0.002,
};

export function calculateCost(model: string, tokens: number): number {
  const rate = COST_PER_1K_TOKENS[model] ?? 0.002;
  return (tokens / 1000) * rate;
}

export function createUsageRecord(model: string, tokensUsed: number, userId: string): TokenUsage {
  return { model, tokensUsed, userId, timestamp: new Date() };
}
