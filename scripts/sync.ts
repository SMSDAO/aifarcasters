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

function run(cmd: string, cwd = ROOT) {
  try {
    execSync(cmd, { cwd, stdio: 'inherit' });
  } catch (err) {
    warn(`Command failed: ${cmd}`);
  }
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
  const dbPath = path.join(ROOT, 'packages/db');
  
  if (fs.existsSync(path.join(dbPath, 'prisma/schema.prisma'))) {
    run('npx prisma generate', dbPath);
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
  
  await syncEnv();
  await generateDbTypes();
  await validateContracts();
  
  console.log('\n✅ Sync complete!');
}

main().catch((err) => {
  console.error('[sync] Fatal error:', err);
  process.exit(1);
});
