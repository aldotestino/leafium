import { network } from 'hardhat';
import 'dotenv/config';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import { developmentChains, helperNetworkConfig } from '../helper-hardhat-config';
import verify from '../utils/verify';

const deployContract: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log('🚀 Deploying Leafium🍃...');
  const leafium = await deploy('Leafium', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: helperNetworkConfig[network.name].blockConfirmations || 1
  });
  log('✅ Leafium deployed!');

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(leafium.address, [], 'contracts/Leafium.sol:Leafium');
  }
};

deployContract.tags = ['all'];
export default deployContract;