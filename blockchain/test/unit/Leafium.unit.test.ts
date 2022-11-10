import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { assert, expect } from 'chai';
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
    const tx1 = await leafium.addGateway('eui-89898989891', 'lucky lizard1', '41.16092034214199', '16.4141807908589', 20);
    await tx1.wait(1);
    const myGateways = await leafium.getMyGateways();
    const gateways = await leafium.getGateways();
    console.log('getMyGatways output:');
    console.log(myGateways);
    console.log('-----------------------------------');
    console.log('gatways output:');
    console.log(gateways);

    assert.deepEqual(myGateways, gateways);
  });

  it('getMyGateways allows to view only your gateways', async () => {
    const tx = await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    await tx.wait(1);
    const myGateways = await leafium.getMyGateways();
    expect(myGateways).to.be.not.empty;

    const leafiumUser1 = await leafium.connect(user1);
    const myGatewaysUser1 = await leafiumUser1.getMyGateways();
    expect(myGatewaysUser1).to.be.empty;

    const gateways = await leafium.getGateways();
    expect(gateways).to.be.not.empty;
  });
});
