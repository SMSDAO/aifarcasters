import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'not-configured';

export const wagmiConfig = getDefaultConfig({
  appName: 'AiFarcaster',
  projectId,
  chains: [base, baseSepolia],
  ssr: true,
});
