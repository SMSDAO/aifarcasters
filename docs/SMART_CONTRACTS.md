# Smart Contracts

## Overview

AiFarcaster uses two smart contracts deployed on Base chain.

## Contracts

### PromptNFT (ERC-721)
`packages/contracts/src/PromptNFT.sol`

Mints NFTs representing optimized AI prompts.

**Functions:**
- `mint(address to, string tokenURI)` — mint a prompt NFT
- `setPublicMintEnabled(bool)` — toggle public minting (owner only)
- `setMintPrice(uint256)` — update mint price (owner only)
- `withdraw()` — withdraw contract balance (owner only)
- `totalSupply()` — total tokens minted

### AiFarcasterAccessControl
`packages/contracts/src/AccessControl.sol`

On-chain role management and user blocking.

**Roles:**
- `ADMIN_ROLE` — full control
- `DEVELOPER_ROLE` — developer access
- `USER_ROLE` — basic user access

**Functions:**
- `grantUserRole(address)` — grant USER_ROLE
- `grantDeveloperRole(address)` — grant DEVELOPER_ROLE
- `blockUser(address)` / `unblockUser(address)` — manage blocked users
- `hasAccess(address)` — check if account has access

## Deployment

```bash
cd packages/contracts

# Local
pnpm deploy:local

# Base mainnet
DEPLOYER_PRIVATE_KEY=0x... BASE_RPC_URL=... pnpm deploy:base
```

## Environment Variables

```
NEXT_PUBLIC_PROMPT_NFT_ADDRESS=0x...
NEXT_PUBLIC_ACCESS_CONTROL_ADDRESS=0x...
DEPLOYER_PRIVATE_KEY=0x...
```
