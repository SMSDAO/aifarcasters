import { optimizePrompt } from './optimizer';
import type { OptimizeRequest, OptimizeResponse } from './schema';

export interface ChainStep {
  name: string;
  transform: (input: string, prev: OptimizeResponse | null) => OptimizeRequest;
}

export async function runChain(
  initial: string,
  steps: ChainStep[],
): Promise<{ steps: Array<{ name: string; result: OptimizeResponse }> }> {
  let prev: OptimizeResponse | null = null;
  const results: Array<{ name: string; result: OptimizeResponse }> = [];

  for (const step of steps) {
    const req = step.transform(prev?.optimized ?? initial, prev);
    const result = await optimizePrompt(req);
    results.push({ name: step.name, result });
    prev = result;
  }

  return { steps: results };
}
