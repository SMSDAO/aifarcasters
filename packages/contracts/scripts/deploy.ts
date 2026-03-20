import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');

  console.log('\nDeploying PromptNFT...');
  const PromptNFT = await ethers.getContractFactory('PromptNFT');
  const promptNFT = await PromptNFT.deploy(deployer.address);
  await promptNFT.waitForDeployment();
  const promptNFTAddress = await promptNFT.getAddress();
  console.log('PromptNFT deployed to:', promptNFTAddress);

  console.log('\nDeploying AiFarcasterAccessControl...');
  const AccessControlFactory = await ethers.getContractFactory('AiFarcasterAccessControl');
  const accessControl = await AccessControlFactory.deploy(deployer.address);
  await accessControl.waitForDeployment();
  const accessControlAddress = await accessControl.getAddress();
  console.log('AiFarcasterAccessControl deployed to:', accessControlAddress);

  console.log('\n✅ Deployment complete!');
  console.log('Contract addresses:');
  console.log(`  PromptNFT: ${promptNFTAddress}`);
  console.log(`  AccessControl: ${accessControlAddress}`);
  console.log('\nAdd these to your .env.local:');
  console.log(`  NEXT_PUBLIC_PROMPT_NFT_ADDRESS=${promptNFTAddress}`);
  console.log(`  NEXT_PUBLIC_ACCESS_CONTROL_ADDRESS=${accessControlAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
