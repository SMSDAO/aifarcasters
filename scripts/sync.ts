#!/usr/bin/env ts-node
/**
 * sync.ts - AiFarcaster monorepo sync script
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');

function log(msg: string) { console.log(`[sync] ${msg}`); }
function warn(msg: string) { console.warn(`[sync] ⚠️  ${msg}`); }
function success(msg: string) { console.log(`[sync] ✅ ${msg}`); }

function run(cmd: string, cwd = ROOT): void {
  execSync(cmd, { cwd, stdio: 'inherit' });
}

async function syncEnv() {
  log('Syncing .env.example...');
  const envExample = path.join(ROOT, '.env.example');
  const webEnvExample = path.join(ROOT, 'apps/web/.env.example');
  
  if (fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, webEnvExample);
    success('.env.example synced to apps/web/');
  }
}

async function generateDbTypes() {
  log('Generating Prisma client types...');
  const schemaPath = path.join(ROOT, 'packages/db/prisma/schema.prisma');

  if (fs.existsSync(schemaPath)) {
    run('pnpm --filter @aifarcasters/db db:generate');
    success('Prisma types generated');
  } else {
    warn('packages/db/prisma/schema.prisma not found, skipping');
  }
}

async function validateContracts() {
  log('Validating contracts...');
  const contractsPath = path.join(ROOT, 'packages/contracts');
  
  const contracts = ['src/PromptNFT.sol', 'src/AccessControl.sol'];
  for (const contract of contracts) {
    const fullPath = path.join(contractsPath, contract);
    if (!fs.existsSync(fullPath)) {
      warn(`Contract not found: ${contract}`);
    } else {
      success(`Contract exists: ${contract}`);
    }
  }
}

async function main() {
  log('Starting AiFarcaster monorepo sync...\n');

  let failed = false;

  const steps: Array<[string, () => Promise<void>]> = [
    ['syncEnv', syncEnv],
    ['generateDbTypes', generateDbTypes],
    ['validateContracts', validateContracts],
  ];

  for (const [name, step] of steps) {
    try {
      await step();
    } catch (err) {
      console.error(`[sync] ❌ Step '${name}' failed:`, err);
      failed = true;
    }
  }

  if (failed) {
    console.error('\n❌ Sync completed with errors. See above for details.');
    process.exit(1);
  }

  console.log('\n✅ Sync complete!');
}

main().catch((err) => {
  console.error('[sync] Fatal error:', err);
  process.exit(1);
});
