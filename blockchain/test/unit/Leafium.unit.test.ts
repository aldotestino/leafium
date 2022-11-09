import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { assert } from 'chai';
import { deployments, ethers } from 'hardhat';
import type { Leafium } from '../../typechain-types';

describe('Leafium unit test', () => {
  let leafium: Leafium;
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    user1 = accounts[1];

    await deployments.fixture('all');
    const { abi, address } = await deployments.get('Leafium');
    leafium = (await ethers.getContractAt(abi, address)) as Leafium;
  });

  it('Allows to add a gateway', async () => {
    const tx = await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    await tx.wait(1);
    const myGateways = await leafium.getMyGateways();
    const gateway = await leafium.gateways(0);
    console.log('getMyGatways output:');
    console.log(myGateways);
    console.log('-----------------------------------');
    console.log('gatways output:');
    console.log(gateway);

    assert.deepEqual(myGateways[0], gateway);
  });
});
