# Role-Based Access Control (RBAC)

## Roles

| Role      | Description                              |
|-----------|------------------------------------------|
| admin     | Full access to all resources             |
| developer | Access to prompts, feed, contracts, analytics |
| user      | Basic access to prompts and feed         |

## Permissions

### admin
- All resources: read, write, delete, admin

### developer
- prompts: read, write, delete
- feed: read, write
- contracts: read, write
- analytics: read

### user
- prompts: read, write
- feed: read

## Usage

```typescript
import { hasPermission, requireRole } from '@aifarcasters/auth';

// Check permission
if (hasPermission(userRole, 'prompts', 'write')) {
  // allowed
}

// Require role (throws if not allowed)
requireRole(userRole, ['admin', 'developer']);
```

## API Middleware

```typescript
import { withAuth } from '@aifarcasters/auth';

export async function GET(request: Request) {
  const auth = await withAuth(request, ['admin']);
  if ('error' in auth) {
    return Response.json({ error: auth.error }, { status: auth.status });
  }
  // auth.context.userId, auth.context.role available
}
```
