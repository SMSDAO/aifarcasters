import { z } from 'zod';

export const optimizeRequestSchema = z.object({
  input: z.string().min(1).max(10_000),
  context: z.string().optional(),
  model: z.string().optional(),
  maxTokens: z.number().int().positive().max(8192).optional(),
  temperature: z.number().min(0).max(2).optional(),
});

export const optimizeResponseSchema = z.object({
  optimized: z.string(),
  tokensUsed: z.number(),
  model: z.string(),
  reasoning: z.string().optional(),
});

export type OptimizeRequest = z.infer<typeof optimizeRequestSchema>;
export type OptimizeResponse = z.infer<typeof optimizeResponseSchema>;
