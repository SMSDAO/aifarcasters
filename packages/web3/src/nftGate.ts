import { createPublicClient, http, type Address } from 'viem';
import { base } from 'wagmi/chains';

const publicClient = createPublicClient({ chain: base, transport: http() });

const ERC721_ABI = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export async function checkNftAccess(contractAddress: Address, walletAddress: Address): Promise<boolean> {
  try {
    const balance = await publicClient.readContract({
      address: contractAddress,
      abi: ERC721_ABI,
      functionName: 'balanceOf',
      args: [walletAddress],
    });
    return balance > 0n;
  } catch {
    return false;
  }
}
