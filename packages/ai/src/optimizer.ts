import { getOpenAIClient } from './client';
import type { OptimizeRequest, OptimizeResponse } from './schema';
import { config } from '@aifarcasters/core';

const SYSTEM_PROMPT = `You are an expert prompt optimizer. Your job is to rewrite user prompts to be:
1. More specific and clear
2. Better structured for AI models
3. Include relevant context and constraints
4. Optimized for the target use case

Return a JSON object with:
- optimized: the rewritten prompt
- reasoning: brief explanation of changes made`;

export async function optimizePrompt(req: OptimizeRequest): Promise<OptimizeResponse> {
  const client = getOpenAIClient();
  const model = req.model ?? config.ai.model;

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: req.context
          ? `Context: ${req.context}\n\nPrompt to optimize: ${req.input}`
          : `Prompt to optimize: ${req.input}`,
      },
    ],
    max_tokens: req.maxTokens ?? config.ai.maxTokens,
    temperature: req.temperature ?? config.ai.temperature,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content ?? '{}';
  let parsed: { optimized?: string; reasoning?: string } = {};
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = { optimized: content };
  }

  return {
    optimized: parsed.optimized ?? req.input,
    tokensUsed: completion.usage?.total_tokens ?? 0,
    model,
    reasoning: parsed.reasoning,
  };
}
