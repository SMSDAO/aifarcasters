import { type Address } from 'viem';

export interface DeployedContract {
  address: Address;
  chainId: number;
  deployedAt: Date;
  name: string;
}

export const PROMPT_NFT_ABI = [
  {
    inputs: [{ name: 'to', type: 'address' }, { name: 'tokenURI', type: 'string' }],
    name: 'mint',
    outputs: [{ name: 'tokenId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
