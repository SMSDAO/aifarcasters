import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[seed] Seeding database...');

  const adminWallet = process.env.ADMIN_WALLET_ADDRESS;
  if (!adminWallet) {
    console.warn(
      '[seed] ADMIN_WALLET_ADDRESS is not set. ' +
      'Set this env var to a real wallet address before seeding production.',
    );
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[seed] ADMIN_WALLET_ADDRESS must be set in production.');
    }
  }

  // Create a default admin user (wallet-based, no password)
  const admin = await prisma.user.upsert({
    where: { wallet: adminWallet ?? '0xDEADBEEF00000000000000000000000000000001' },
    update: {},
    create: {
      wallet: adminWallet ?? '0xDEADBEEF00000000000000000000000000000001',
      role: 'ADMIN',
    },
  });
  console.log('[seed] Admin user:', admin.id);

  // Create a default free subscription for the admin
  await prisma.subscription.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      plan: 'FREE',
      status: 'ACTIVE',
    },
  });
  console.log('[seed] ✅ Seed complete!');
}

main()
  .catch((err) => {
    console.error('[seed] Fatal error:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
