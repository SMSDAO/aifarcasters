import { verifySession } from './session';
import { hasRole, type Role } from './rbac';

export interface AuthContext {
  userId: string;
  wallet: string;
  role: Role;
}

export async function withAuth(
  request: Request,
  allowedRoles?: Role[],
): Promise<{ context: AuthContext } | { error: string; status: number }> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return { error: 'Unauthorized: missing token', status: 401 };
  }

  const payload = await verifySession(token);
  if (!payload) {
    return { error: 'Unauthorized: invalid or expired token', status: 401 };
  }

  if (allowedRoles && !hasRole(payload.role as Role, allowedRoles)) {
    return { error: 'Forbidden: insufficient permissions', status: 403 };
  }

  return {
    context: {
      userId: payload.userId,
      wallet: payload.wallet,
      role: payload.role as Role,
    },
  };
}
