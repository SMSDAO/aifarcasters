import { SignJWT, jwtVerify } from 'jose';

export interface SessionPayload {
  userId: string;
  wallet: string;
  role: string;
  iat?: number;
  exp?: number;
}

function getSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.JWT_SECRET ?? 'dev-secret-change-in-production';
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
