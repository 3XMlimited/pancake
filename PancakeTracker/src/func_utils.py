import time
from datetime import datetime
from web3 import Web3
import requests


# Structure info
def structure_info(round_info, epoch_num):
    # print("round_info", round_info)
    lock_timestamp = round_info[2]
    lock_price = round_info[4]
    close_price = round_info[5]
    lock_timestamp = round_info[2]
    total_amount = round_info[8]
    bull_amount = round_info[9]
    bear_amount = round_info[10]
    # round_info [166597, 1682559503, 1682559803, 1682560109, {lockPrice:33269672108}, {closePrice: 33190512605}, 36893488147420841448, 36893488147420841478, {poolPrice:4438298425066799250}, {up:2598945789942276439}, down:1839352635124522811, 1839352635124522811, 4305149472314795273, True]
    # round_info [166604, 1682561645, 1682561945, 1682562245, 0,                        0,                        0,                    0,                              447808777587254109,        254458752888610980,         193350024698643129, 0, 0, False]

    # Sleep
    time.sleep(0.2)

    # Convert datetime
    date_log = datetime.fromtimestamp(lock_timestamp)

    # Calculate Ratio
    total_amount_normal = round(float(Web3.from_wei(total_amount, "ether")), 5)
    bull_amount_normal = round(float(Web3.from_wei(bull_amount, "ether")), 5)
    bear_amount_normal = round(float(Web3.from_wei(bear_amount, "ether")), 5)

    # Normalise prices
    lock_price_normal = round(float(Web3.from_wei(lock_price, "gwei")), 5) * 10
    close_price_normal = round(
        float(Web3.from_wei(close_price, "gwei")), 5) * 10

    # Format prices
    lock_price_normal = float(f'{lock_price_normal:.{5}g}')
    close_price_normal = float(f'{close_price_normal:.{5}g}')

    # Ratios
    if bull_amount_normal != 0 and bear_amount_normal != 0:
        bull_ratio = round(bull_amount_normal / bear_amount_normal, 2) + 1
        bear_ratio = round(bear_amount_normal / bull_amount_normal, 2) + 1

        # Format numbers
        bull_ratio = float(f'{bull_ratio:.{3}g}')
        bear_ratio = float(f'{bear_ratio:.{3}g}')
    else:
        bull_ratio = 0
        bear_ratio = 0

    # Construct item
    item_dict = {
        "epoch": epoch_num,
        "datetime": date_log.strftime('%Y-%m-%d %H:%M:%S'),
        "lock_price": lock_price_normal,
        "close_price": close_price_normal,
        "total_amount": total_amount_normal,
        "bull_amount": bull_amount_normal,
        "bear_amount": bear_amount_normal,
        "up_payout": round((bear_amount_normal/bull_amount_normal) + 1, 2),
        "down_payout": round((bull_amount_normal/bear_amount_normal) + 1, 2),

    }

    # Return dict
    return item_dict


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

        #  "hour": date_log.hour,
        # "minute": date_log.minute,
        # "second": date_log.second,
