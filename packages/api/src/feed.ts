import { withAuth } from '@aifarcasters/auth';
import { z } from 'zod';

const feedQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  cursor: z.string().optional(),
});

export async function handleGetFeed(request: Request): Promise<Response> {
  const authResult = await withAuth(request);
  if ('error' in authResult) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  const url = new URL(request.url);
  const queryResult = feedQuerySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!queryResult.success) {
    return Response.json({ error: 'Validation error', details: queryResult.error.flatten() }, { status: 422 });
  }

  return Response.json({ success: true, data: { items: [], cursor: null, limit: queryResult.data.limit } });
}
