import { z } from 'zod';
import { withAuth } from '@aifarcasters/auth';

const createCheckoutSchema = z.object({
  plan: z.enum(['pro', 'enterprise']),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export async function handleCreateCheckout(request: Request): Promise<Response> {
  const authResult = await withAuth(request);
  if ('error' in authResult) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parseResult = createCheckoutSchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json({ error: 'Validation error', details: parseResult.error.flatten() }, { status: 422 });
  }

  const checkoutUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/dashboard?plan=${parseResult.data.plan}`;
  return Response.json({ success: true, checkoutUrl });
}
