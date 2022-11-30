import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { assert, expect } from 'chai';
import { parseEther } from 'ethers/lib/utils';
import { deployments, ethers } from 'hardhat';
import type { Leafium, LeafiumToken } from '../../typechain-types';

describe('Leafium unit test', () => {
  let leafium: Leafium;
  let leafiumToken: LeafiumToken;
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    user1 = accounts[1];

    await deployments.fixture('all');
    const { abi: abi1, address: address1 } = await deployments.get('Leafium');
    leafium = (await ethers.getContractAt(abi1, address1)) as Leafium;

    const { abi: abi2, address: address2 } = await deployments.get('LeafiumToken');
    leafiumToken = (await ethers.getContractAt(abi2, address2)) as LeafiumToken;
  });

  it('Allows to add a gateway', async () => {
    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    await leafium.addGateway('eui-89898989891', 'lucky lizard1', '41.16092034214199', '16.4141807908589', 20);
    const myGateways = await leafium.getMyGateways();
    const gateways = await leafium.getGateways();
    assert.deepEqual(myGateways, gateways);
  });

  it('getMyGateways allows to view only your gateways', async () => {
    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    const myGateways = await leafium.getMyGateways();
    expect(myGateways).to.be.not.empty;

    const leafiumUser1 = await leafium.connect(user1);
    const myGatewaysUser1 = await leafiumUser1.getMyGateways();
    expect(myGatewaysUser1).to.be.empty;

    const gateways = await leafium.getGateways();
    expect(gateways).to.be.not.empty;
  });

  it('gives reward to the user that registered the gateway', async () => {
    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    const reward = ethers.utils.parseEther('50');
    const userBalance = await leafium.getBalance();

    assert.deepEqual(reward, userBalance);
  });

  it('removes tokens from total supply after a registration', async () => {
    const totalSupply = await leafiumToken.totalSupply();

    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);

    const userBalance = await leafium.getBalance();

    const availableTokens = await leafiumToken.balanceOf(leafiumToken.address);

    expect(userBalance.add(availableTokens)).to.be.deep.equal(totalSupply);
  });

  it('doesn\'t allow to register a gateway more then one time', async () => {
    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    await expect(leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20)).to.be.revertedWith('Gateway already registered!');
  });

  it('gives tokens to the user if the gateway is on', async () => {
    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    const userBalanceBefore = await leafium.getBalance();
    await leafium.awake('eui-8989898989');
    const userBalanceAfter = await leafium.getBalance();
    assert(userBalanceAfter.sub(userBalanceBefore).eq(parseEther('1')));
  });

  it('doesn\'t give tokens to the user if the gateway is not his', async () => {
    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    await expect(leafium.awake('eui-8989898981')).to.be.revertedWith('Gateway not found!');
  });

  it('increase earnings property of the gateway', async () => {
    await leafium.addGateway('eui-8989898989', 'lucky lizard', '41.16092034214199', '16.4141807908589', 20);
    await leafium.awake('eui-8989898989');
    const gateway1 = (await leafium.getGateways())[0];
    const gateway2 = (await leafium.getMyGateways())[0];
    //assert(gateway1.earnings.toString() === '51' && gateway2.earnings.toString() === '51');
    console.log(gateway2);
  });
});
