import { network } from 'hardhat';
import 'dotenv/config';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import { developmentChains, helperNetworkConfig, INITIAL_SUPPLY } from '../helper-hardhat-config';
import verify from '../utils/verify';

const deployContract: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log('🚀 Deploying LeafiumToken🍃...');
  const leafiumToken = await deploy('LeafiumToken', {
    from: deployer,
    args: [
      INITIAL_SUPPLY
    ],
    log: true,
    waitConfirmations: helperNetworkConfig[network.name].blockConfirmations || 1
  });
  log('✅ LeafiumToken deployed!');


  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(leafiumToken.address, [INITIAL_SUPPLY], 'contracts/LeafiumToken.sol:LeafiumToken');
  }
};

deployContract.tags = ['all', 'leafium'];
export default deployContract;