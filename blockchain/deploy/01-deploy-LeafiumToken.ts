import { network } from 'hardhat';
import 'dotenv/config';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import { developmentChains, helperNetworkConfig } from '../helper-hardhat-config';
import verify from '../utils/verify';

const deployContract: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log('🚀 Deploying LeafiumToken🍃...');
  const leafiumToken = await deploy('LeafiumToken', {
    from: deployer,
    args: [
      process.env.TOTAL_TOKENS
    ],
    log: true,
    waitConfirmations: helperNetworkConfig[network.name].blockConfirmations || 1
  });
  log('✅ LeafiumToken deployed!');


  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(leafiumToken.address, [process.env.TOTAL_TOKENS], 'contracts/LeafiumToken.sol:LeafiumToken');
  }
};

deployContract.tags = ['all'];
export default deployContract;