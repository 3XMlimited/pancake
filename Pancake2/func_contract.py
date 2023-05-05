# Store results
from constants import CONTRACT
from func_structure import structure_info
import pandas as pd
import requests
import time


# Get contract information
def get_contract_info():

    # Get current epoch
    epoch_0 = CONTRACT.functions.currentEpoch().call()
    epoch_1 = epoch_0 - 1
    epoch_2 = epoch_1 - 1
    epoch_3 = epoch_2 - 1

    # Get next epoch for referencing later
    next_epoch = epoch_0 + 1

    # Store record for each epoch
    try:
        rounds_list_0 = CONTRACT.functions.rounds(epoch_0).call()
        # time.sleep(0.1)
        # rounds_list_1 = CONTRACT.functions.rounds(epoch_1).call()
        time.sleep(0.1)
        rounds_list_2 = CONTRACT.functions.rounds(epoch_2).call()
        # time.sleep(0.1)
        # rounds_list_3 = CONTRACT.functions.rounds(epoch_3).call()
    except Exception as e:
        print(e)
        exit(1)

    # Get stats for current and last two periods
    result_dict_0 = structure_info(rounds_list_0, epoch_0)
    result_dict_2 = structure_info(rounds_list_2, epoch_2)

    store_dict = {
        "epoch": epoch_0,
        "total_amount": result_dict_0["total_amount"],
        "lock_price": result_dict_0['lock_price'],
        "close_price": result_dict_0['close_price'],
        "bull_ratio": result_dict_0["bull_ratio"],
        "bear_ratio": result_dict_0["bear_ratio"],
    }
    store_dict_2 = {
        "epoch": epoch_2,
        "total_amount": result_dict_2["total_amount"],
        "lock_price": result_dict_2['lock_price'],
        "close_price": result_dict_2['close_price'],
        "bull_ratio": result_dict_2["bull_ratio"],
        "bear_ratio": result_dict_2["bear_ratio"],
    }

    # Construct dataframe
    df = pd.DataFrame([store_dict, store_dict_2])

    df['price_change_%'] = (
        df['close_price'][1] - df['lock_price'][1])/df['close_price'][1] * 100
    df['result'] = "UP" if df['close_price'][1] - \
        df['lock_price'][1] > 0 else "DOWN"
    df['result'][0] = ""
    df['price_change_%'][0] = ""

    # Return dict
    return df


# Get Unix Timestamp
def get_unix_timestamp():
    endpoint = "http://worldtimeapi.org/api/timezone/Etc/UTC"
    response = requests.get(endpoint)

    if response.status_code == 200:
        dt = response.json()["unixtime"]
        return dt
    else:
        print("No datetime available via API")
        exit(1)
