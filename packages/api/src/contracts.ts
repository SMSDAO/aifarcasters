import { withAuth } from '@aifarcasters/auth';

export async function handleGetContracts(request: Request): Promise<Response> {
  const authResult = await withAuth(request, ['admin', 'developer']);
  if ('error' in authResult) {
    return Response.json({ error: authResult.error }, { status: authResult.status });
  }

  return Response.json({ success: true, data: { contracts: [] } });
}
