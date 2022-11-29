from web3 import Web3
import json

abi_file = open('abi.json')
contract_addresses_file = open('contractAddresses.json')
key_file = open('key.json')

abi = json.load(abi_file)
contract_addresses = json.load(contract_addresses_file)
key = json.load(key_file)

abi_file.close()
contract_addresses_file.close()
key_file.close()


contract_address = contract_addresses['31337'][0]


RPC_URL = 'http://127.0.0.1:8545/'
PRIVATE_KEY = key["privateKey"]

print(PRIVATE_KEY)


# PRIVATE_KEY_1 = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
# PRIVATE_KEY_2 = '59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'

# w3 = Web3(Web3.HTTPProvider(RPC_URL))
# account = w3.eth.account.from_key(PRIVATE_KEY)
#
# w3.eth.defaultAccount = account.address
#
# leafium = w3.eth.contract(address=contract_address, abi=abi)
# awake = leafium.get_function_by_name('awake')
# leafium.caller().call_function(awake, "eui-3a0d8533b9824dad")
