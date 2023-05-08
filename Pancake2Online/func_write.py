from constants import w3, CONTRACT, ACCOUNT, PRIVATE_KEY

from web3 import Web3
import time

# Send a Transaction


def send_tx(side, epoch):

    # Variables
    chain_id = 56
    gas = 300000
    gas_price = Web3.to_wei("5.5", "gwei")
    send_bnb = 0.015
    amount = Web3.to_wei(0.015, "ether")

    # Get current epoch
    current_epoch = CONTRACT.functions.currentEpoch().call()

    print("Current EPOCH", current_epoch)
    if epoch == current_epoch:
        # Nonce
        nonce = w3.eth.get_transaction_count(ACCOUNT)
        print("NONCE", nonce)

        # Build Transaction - BULL
        if side == "bull":
            tx_build = CONTRACT.functions.betBull(current_epoch).build_transaction({
                "chainId": chain_id,
                "value": amount,
                "gas": gas,
                "gasPrice": gas_price,
                "nonce": nonce
            })

        if side == "bear":
            tx_build = CONTRACT.functions.betBear(current_epoch).build_transaction({
                "chainId": chain_id,
                "value": amount,
                "gas": gas,
                "gasPrice": gas_price,
                "nonce": nonce
            })

        # Sign transaction
        tx_signed = w3.eth.account.sign_transaction(
            tx_build, private_key=PRIVATE_KEY)

        # Send transaction
        sent_tx = w3.eth.send_raw_transaction(tx_signed.rawTransaction)
        print(sent_tx)


# Claim winnings
def claim_winnings(prev_epoch):

    try:
        # Claim winnings
        current_rounds_list = CONTRACT.functions.claimable(
            prev_epoch, ACCOUNT).call()

        # Guard: No winnings to claim
        print(current_rounds_list)
        if not current_rounds_list:
            return False

        # Variables
        chain_id = 56
        gas = 300000
        gas_price = Web3.toWei("5.5", "gwei")

        # Nonce
        nonce = w3.eth.getTransactionCount(ACCOUNT)

        # Caim Winnings
        tx_build = CONTRACT.functions.claim([prev_epoch]).buildTransaction({
            "chainId": chain_id,
            "gas": gas,
            "gasPrice": gas_price,
            "nonce": nonce
        })

        # Sign transaction
        tx_signed = w3.eth.account.signTransaction(
            tx_build, private_key=PRIVATE_KEY)
        print(tx_signed)

        # Send transaction
        sent_tx = w3.eth.sendRawTransaction(tx_signed.rawTransaction)
        print(sent_tx)

        # Return
        return True
    except Exception as e:
        print("error", e)
        return False


# 0.2442 BNB
# 0.2301
