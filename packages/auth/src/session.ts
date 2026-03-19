import { SignJWT, jwtVerify } from 'jose';

export interface SessionPayload {
  userId: string;
  wallet: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Development-only fallback secret — memoized to avoid repeated encoding
const DEV_FALLBACK_SECRET = new TextEncoder().encode(
  'dev-only-secret-DO-NOT-USE-IN-PRODUCTION',
);

function getSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '[auth/session] NEXTAUTH_SECRET or JWT_SECRET must be set in production. ' +
        'Generate one with: openssl rand -base64 32',
      );
    }
    return DEV_FALLBACK_SECRET;
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: Omit<SessionPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function refreshSession(token: string): Promise<string | null> {
  const payload = await verifySession(token);
  if (!payload) return null;
  const { iat, exp, ...rest } = payload;
  void iat; void exp;
  return createSession(rest);
}
