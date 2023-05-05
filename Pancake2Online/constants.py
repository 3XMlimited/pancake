from web3 import Web3
# from decouple import config
import json

# EXECUTION
SCAN_OPPORTUNITIES = True
IS_EXECUTE_TRADE = True

PROVIDER = "https://bsc-dataseed1.binance.org:443"
CONTRACT_ADDRESS = "0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA"
PRIVATE_KEY = "d6ef3447e07ee71a1ed9164a8f9d88a0428ef12a8463d90186117266ba13eaaa"
ACCOUNT = "0x3d7d1C8a4Ba43000ECe1F025F95708A6B322FFf4"

# Get ABI
with open("abi.json", "r") as myFile:
    data = myFile.read()
ABI = json.loads(data)

# Wallet details - mainnet
# ACCOUNT = config("ACCOUNT")
# PRIVATE_KEY = config("PRIVATE_KEY")

# Provider details
# PROVIDER_URL = config("PROVIDER")
# CONTRACT_ADDRESS = config("CONTRACT_ADDRESS")

# Web 3 provider and contract
w3 = Web3(Web3.HTTPProvider(PROVIDER))
CONTRACT = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)

# Strategy
NUM_RECORDS_HISTORY = 3000
