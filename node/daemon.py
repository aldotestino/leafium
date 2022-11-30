import os
from web3 import Web3
import json
from utils import set_interval

pid = os.getpid()
pid_file = open(".pid", "w")
pid_file.write(f"{pid}")
pid_file.close()

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

# PRIVATE_KEY_1 = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
# PRIVATE_KEY_2 = '59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'

w3 = Web3(Web3.HTTPProvider(RPC_URL))
account = w3.eth.account.from_key(PRIVATE_KEY)

leafium = w3.eth.contract(address=contract_address, abi=abi)


def awake():
    nonce = w3.eth.get_transaction_count(account.address)

    tx = leafium.functions.awake("eui-3a0d8533b9824dad").build_transaction({
        "chainId": 31337,
        "gas": 70000,
        "maxFeePerGas": w3.toWei("2", "gwei"),
        "maxPriorityFeePerGas": w3.toWei("1", "gwei"),
        "nonce": nonce
    })

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)

    w3.eth.send_raw_transaction(signed_tx.rawTransaction)


if __name__ == "__main__":
    set_interval(awake, 60)
