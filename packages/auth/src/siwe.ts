import { SiweMessage } from 'siwe';

export interface SiweVerifyParams {
  message: string;
  signature: string;
  nonce: string;
  domain?: string;
}

export interface SiweVerifyResult {
  success: boolean;
  address?: string;
  error?: string;
}

export async function verifySiweMessage(params: SiweVerifyParams): Promise<SiweVerifyResult> {
  try {
    const siweMessage = new SiweMessage(params.message);
    const result = await siweMessage.verify({
      signature: params.signature,
      nonce: params.nonce,
      domain: params.domain,
    });

    if (!result.success) {
      return { success: false, error: result.error?.type ?? 'Verification failed' };
    }

    return { success: true, address: siweMessage.address };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error during SIWE verification',
    };
  }
}

export function createSiweMessage(params: {
  address: string;
  chainId: number;
  nonce: string;
  statement?: string;
  uri?: string;
  domain?: string;
}): string {
  const { address, chainId, nonce, domain = 'aifarcasters.xyz', uri = `https://${domain}`, statement = 'Sign in to AiFarcaster' } = params;
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri,
    version: '1',
    chainId,
    nonce,
  });
  return message.prepareMessage();
}
