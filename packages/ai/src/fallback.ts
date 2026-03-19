import { getOpenAIClient } from './client';
import { config } from '@aifarcasters/core';

const MODELS = [config.ai.model, config.ai.fallbackModel, 'gpt-3.5-turbo'] as const;

export async function withFallback<T>(
  fn: (client: ReturnType<typeof getOpenAIClient>, model: string) => Promise<T>,
): Promise<T> {
  const client = getOpenAIClient();
  let lastError: Error | null = null;

  for (const model of MODELS) {
    try {
      return await fn(client, model);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`[ai/fallback] Model ${model} failed, trying next:`, lastError.message);
    }
  }

  throw lastError ?? new Error('[ai/fallback] All models exhausted');
}
