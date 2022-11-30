import 'dotenv/config';
import { deployments, ethers, network } from 'hardhat';
import * as fs from 'fs';
import path from 'path';

const NODE_ADDRESSES_FILE = path.join(__dirname, '..', '..', 'node', 'contractAddresses.json');
const NODE_ABI_FILE = path.join(__dirname, '..', '..', 'node', 'abi.json');

const updateFrontend = async () => {
  if (process.env.UPDATE_NODE) {
    console.log('🚀 Updating node...');
    await updateContractAddresses();
    await updateAbi();
  }
};

async function updateContractAddresses() {
  const { address } = await deployments.get('Leafium');
  const contractAddresses = JSON.parse(fs.readFileSync(NODE_ADDRESSES_FILE, 'utf-8'));

  const chainId = network.config.chainId;

  if (chainId) {
    if (chainId.toString() in contractAddresses) {
      if (!contractAddresses[chainId].includes(address)) {
        contractAddresses[chainId].unshift(address);
      }
    } else {
      contractAddresses[chainId] = [address];
    }
  }

  fs.writeFileSync(NODE_ADDRESSES_FILE, JSON.stringify(contractAddresses));
}

async function updateAbi() {
  const { abi, address } = await deployments.get('Leafium');
  const leafium = await ethers.getContractAt(abi, address);
  fs.writeFileSync(NODE_ABI_FILE, leafium.interface.format(ethers.utils.FormatTypes.json).toString());
}

updateFrontend.tags = ['all', 'node'];
export default updateFrontend;

