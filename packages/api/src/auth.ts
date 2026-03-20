import { z } from 'zod';
import { verifySiweMessage, createSession } from '@aifarcasters/auth';

const siweVerifySchema = z.object({
  message: z.string(),
  signature: z.string(),
  nonce: z.string(),
});

export async function handleSiweVerify(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parseResult = siweVerifySchema.safeParse(body);
  if (!parseResult.success) {
    return Response.json({ error: 'Validation error', details: parseResult.error.flatten() }, { status: 422 });
  }

  const result = await verifySiweMessage(parseResult.data);
  if (!result.success || !result.address) {
    return Response.json({ error: result.error ?? 'SIWE verification failed' }, { status: 401 });
  }

  const token = await createSession({
    userId: result.address,
    wallet: result.address,
    role: 'user',
  });

  return Response.json({ success: true, token, address: result.address });
}
