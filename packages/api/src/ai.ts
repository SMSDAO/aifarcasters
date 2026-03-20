import { z } from 'zod';
import { optimizePrompt, optimizeRequestSchema } from '@aifarcasters/ai';
import { withAuth } from '@aifarcasters/auth';

export async function handleOptimizeRequest(request: Request): Promise<Response> {
  const authResult = await withAuth(request, ['user', 'developer', 'admin']);
  if ('error' in authResult) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parseResult = optimizeRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json({ error: 'Validation error', details: parseResult.error.flatten() }, { status: 422 });
  }

  try {
    const result = await optimizePrompt(parseResult.data);
    return Response.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI optimization failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
