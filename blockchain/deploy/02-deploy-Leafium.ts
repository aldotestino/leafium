import { network } from 'hardhat';
import 'dotenv/config';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import { developmentChains, helperNetworkConfig } from '../helper-hardhat-config';
import verify from '../utils/verify';

const deployContract: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const { address: leafiumTokenAddress } = await deployments.get('LeafiumToken');

  log('🚀 Deploying Leafium🍃...');
  const leafium = await deploy('Leafium', {
    from: deployer,
    args: [
      leafiumTokenAddress
    ],
    log: true,
    waitConfirmations: helperNetworkConfig[network.name].blockConfirmations || 1
  });
  log('✅ Leafium deployed!');

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(leafium.address, [leafiumTokenAddress], 'contracts/Leafium.sol:Leafium');
  }
};

deployContract.tags = ['all', 'leafium'];
export default deployContract;