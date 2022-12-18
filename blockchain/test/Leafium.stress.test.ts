import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { deployments, ethers } from 'hardhat';
import type { Leafium, LeafiumToken } from '../typechain-types';

describe('Leafium stress test', () => {
  let leafium: Leafium;
  let leafiumToken: LeafiumToken;
  let user1: SignerWithAddress;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    user1 = accounts[1];
    await deployments.fixture('all');
    const { abi: abi1, address: address1 } = await deployments.get('Leafium');
    leafium = (await ethers.getContractAt(abi1, address1)) as Leafium;
    const { abi: abi2, address: address2 } = await deployments.get('LeafiumToken');
    leafiumToken = (await ethers.getContractAt(abi2, address2)) as LeafiumToken;
  });

  it('Allows to add a gateway (10 times)', async () => {
    const device = Array.from({ length: 10 }).map((_, i) => i);
    const txs = await Promise.all(device.map(d => {
      return leafium.addGateway(`eui-${d}`, 'lucky-${d}', '1', '1', '0');
    }));

    expect(txs.map(t => t.confirmations)).to.not.include(0);
  });

  it('Allows to add a gateway (100 times)', async () => {
    const device = Array.from({ length: 100 }).map((_, i) => i);
    const txs = await Promise.all(device.map(d => {
      return leafium.addGateway(`eui-${d}`, 'lucky-${d}', '1', '1', '0');
    }));

    expect(txs.map(t => t.confirmations)).to.not.include(0);
  });

  it('Allows to add a gateway (1000 times)', async () => {
    const device = Array.from({ length: 1000 }).map((_, i) => i);
    const txs = await Promise.all(device.map(d => {
      return leafium.addGateway(`eui-${d}`, 'lucky-${d}', '1', '1', '0');
    }));

    expect(txs.map(t => t.confirmations)).to.not.include(0);
  });
});
