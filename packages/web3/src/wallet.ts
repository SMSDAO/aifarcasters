import { type Address, isAddress } from 'viem';

export function isValidAddress(address: string): address is Address {
  return isAddress(address);
}

export function shortenAddress(address: string, chars = 4): string {
  if (!isValidAddress(address)) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function normalizeAddress(address: string): Address {
  if (!isValidAddress(address)) throw new Error(`Invalid address: ${address}`);
  return address.toLowerCase() as Address;
}
