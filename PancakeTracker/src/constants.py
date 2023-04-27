from web3 import Web3
# from decouple import config
import json

# TRAIN
SAVE_HISTORY = True
RUN_MODEL_1 = True
RUN_MODEL_2 = True

# EXECUTION
SCAN_OPPORTUNITIES = True
IS_EXECUTE_TRADE = True

# Get ABI
with open("../abi.json", "r") as myFile:
    data = myFile.read()
ABI = json.loads(data)

# Wallet details - mainnet
PROVIDER_URL = "https://bsc-dataseed1.binance.org:443"
CONTRACT_ADDRESS = "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"

# Web 3 provider and contract
w3 = Web3(Web3.HTTPProvider(PROVIDER_URL))
CONTRACT = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)


# Strategy
NUM_RECORDS_HISTORY = 3000
