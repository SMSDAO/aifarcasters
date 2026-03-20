export type Role = 'admin' | 'developer' | 'user';

export interface Permission {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'admin';
}

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    { resource: '*', action: 'admin' },
    { resource: '*', action: 'read' },
    { resource: '*', action: 'write' },
    { resource: '*', action: 'delete' },
  ],
  developer: [
    { resource: 'prompts', action: 'read' },
    { resource: 'prompts', action: 'write' },
    { resource: 'prompts', action: 'delete' },
    { resource: 'feed', action: 'read' },
    { resource: 'feed', action: 'write' },
    { resource: 'contracts', action: 'read' },
    { resource: 'contracts', action: 'write' },
    { resource: 'analytics', action: 'read' },
  ],
  user: [
    { resource: 'prompts', action: 'read' },
    { resource: 'prompts', action: 'write' },
    { resource: 'feed', action: 'read' },
  ],
};

export function hasRole(userRole: Role, allowed: Role[]): boolean {
  return allowed.includes(userRole);
}

export function hasPermission(userRole: Role, resource: string, action: Permission['action']): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] ?? [];
  return permissions.some(
    (p) =>
      (p.resource === '*' || p.resource === resource) &&
      (p.action === 'admin' || p.action === action),
  );
}

export function requireRole(userRole: Role | undefined, allowed: Role[]): void {
  if (!userRole || !allowed.includes(userRole)) {
    throw new Error(`Access denied. Required role: ${allowed.join(' or ')}`);
  }
}
