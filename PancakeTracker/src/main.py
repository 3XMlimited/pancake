from constants import CONTRACT
from func_utils import structure_info, get_unix_timestamp
import ccxt
from datetime import datetime
import time
from pymongo import MongoClient
import certifi


# Scan and save events with live data
# San on the 4th minute of each five minutes
if __name__ == "__main__":
    # get close price
    now = datetime.now()

    binance = ccxt.binance()
    binance = binance.fetch_ticker("BNB/USDT")['last']
    # Get current epoch
    epoch_0 = CONTRACT.functions.currentEpoch().call()

    # Get time until next round
    rounds_list_curr = CONTRACT.functions.rounds(epoch_0).call()
    lock_timestamp = rounds_list_curr[2]
    date_log = datetime.fromtimestamp(lock_timestamp)
    datenow = get_unix_timestamp()
    seconds_diff = lock_timestamp - int(datenow)

    # Sleep for 30 seconds until just before lock time
    if seconds_diff > 30:
        sleep_time = seconds_diff - 30
    else:
        sleep_time = 0

    # Sleep until ready
    print("Sleeping for: ", sleep_time)
    time.sleep(sleep_time)

    # Get next epoch for referencing later
    next_epoch = epoch_0 + 1

    # Store record for each epoch
    epoch_1 = epoch_0 - 1
    epoch_2 = epoch_1 - 1
    epoch_3 = epoch_2 - 1
    epoch_4 = epoch_3 - 1
    try:
        rounds_list_0 = CONTRACT.functions.rounds(epoch_0).call()

        time.sleep(0.1)
        # print( rounds_list_0)
        rounds_list_1 = CONTRACT.functions.rounds(epoch_1).call()
        time.sleep(0.1)
        rounds_list_2 = CONTRACT.functions.rounds(epoch_2).call()
        time.sleep(0.1)
        rounds_list_3 = CONTRACT.functions.rounds(epoch_3).call()
        time.sleep(0.1)
        rounds_list_4 = CONTRACT.functions.rounds(epoch_4).call()
    except Exception as e:
        print(e)
        exit(1)

    # Get stats for current and last two periods

    result_dict_0 = structure_info(rounds_list_0, epoch_0)
    result_dict_1 = structure_info(rounds_list_1, epoch_1)
    result_dict_1['close_price'] = binance
    result_dict_2 = structure_info(rounds_list_2, epoch_2)
    result_dict_3 = structure_info(rounds_list_3, epoch_3)
    result_dict_4 = structure_info(rounds_list_4, epoch_4)
    Data = []
    Data.append(result_dict_0)
    Data.append(result_dict_1)
    Data.append(result_dict_2)
    Data.append(result_dict_3)
    Data.append(result_dict_4)

    TD = {"epoch": epoch_0, "data": Data, "dateTime": now}
    print(TD)

    # save to DB
    connection_url = "mongodb+srv://3XM:chuchupa888@cluster0.6uckc.mongodb.net/pancakes?retryWrites=true&w=majority"
    myclient = MongoClient(connection_url, tlsCAFile=certifi.where())
    db = myclient["pancakes"]
    Collection = db["bnb/live"]

    if result_dict_0['up_payout'] == result_dict_1["up_payout"] and result_dict_0['down_payout'] == result_dict_1["down_payout"]:
        for x in Collection.find():
            if x['epoch'] == result_dict_0['epoch']:
                res = x['data'][0]
        myquery = {"epoch": result_dict_0['epoch']}
        newData = Data
        newData[0] = res
        newvalues = {"$set": {'data': newData}}
        Collection.update_one(myquery,   newvalues)
        print(result_dict_0['epoch'], "update....")

    else:
        Collection.insert_one(TD)
    print("finish:", now)

    # Get changes - Current Epoch
    bull_amt_change_0 = round(
        result_dict_0["bull_amount"] / result_dict_1["bull_amount"], 2)
    bear_amt_change_0 = round(
        result_dict_0["bear_amount"] / result_dict_1["bear_amount"], 2)
    bull_ratio_change_0 = round(
        result_dict_0["bull_ratio"] / result_dict_1["bull_ratio"], 2)

    # Get changes - Epoch - 1
    bull_amt_change_1 = round(
        result_dict_1["bull_amount"] / result_dict_2["bull_amount"], 2)
    bear_amt_change_1 = round(
        result_dict_1["bear_amount"] / result_dict_2["bear_amount"], 2)
    bull_ratio_change_1 = round(
        result_dict_1["bull_ratio"] / result_dict_2["bull_ratio"], 2)

    # Get changes - Epoch - 2
    bull_amt_change_2 = round(
        result_dict_2["bull_amount"] / result_dict_3["bull_amount"], 2)
    bear_amt_change_2 = round(
        result_dict_2["bear_amount"] / result_dict_3["bear_amount"], 2)
    bull_ratio_change_2 = round(
        result_dict_2["bull_ratio"] / result_dict_3["bull_ratio"], 2)

    # Last known lock or close price change
    try:
        lock_price_change_1 = round(
            result_dict_1["lock_price"] / result_dict_2["lock_price"], 5)
        lock_price_change_2 = round(
            result_dict_2["lock_price"] / result_dict_3["lock_price"], 5)
    except:
        lock_price_change_1 = 0
        lock_price_change_2 = 0

    """
    Timestem 0: Represents current round you can place a bet on (up or down) - payouts still being entered
    Timestem 1: Represents the prior wagered round playing out in live play - payouts are known
    Timestem 2: Represents the last known full game which has ended - round fully complete
  """

    # Store results
    # store_dict = {
    #     "epoch": epoch_0,

    #     "total_amount_0": result_dict_0["total_amount"],
    #     "bull_amount_0": result_dict_0["bull_amount"],
    #     "bull_ratio_0": result_dict_0["bull_ratio"],

    #     "bull_amt_change_0": bull_amt_change_0,
    #     "bull_ratio_change_0": bull_ratio_change_0,

    #     "total_amount_1": result_dict_1["total_amount"],
    #     "bull_amount_1": result_dict_1["bull_amount"],
    #     "bull_ratio_1": result_dict_1["bull_ratio"],

    #     "bull_amt_change_1": bull_amt_change_1,
    #     "bull_ratio_change_1": bull_ratio_change_1,
    #     "lock_price_change_1": lock_price_change_1,

    #     "total_amount_2": result_dict_2["total_amount"],
    #     "bull_amount_2": result_dict_2["bull_amount"],
    #     "bull_ratio_2": result_dict_2["bull_ratio"],

    #     "bull_amt_change_2": bull_amt_change_2,
    #     "bull_ratio_change_2": bull_ratio_change_2,
    #     "lock_price_change_2": lock_price_change_2,
    # }

    # Send to AWS timestream
    # timestream_write(store_dict)


# {'epoch': 168059, 'datetime': '2023-05-02 05:52:00', 'hour': 5, 'minute': 52, 'second': 0, 'lock_price': 0.0, 'close_price': 0.0,
#     'total_amount': 2.16558, 'bull_amount': 0.99484, 'bear_amount': 1.17074, 'bull_ratio': 1.85, 'bear_ratio': 2.18}
# {'epoch': 168057, 'datetime': '2023-05-02 05:41:46', 'hour': 5, 'minute': 41, 'second': 46, 'lock_price': 323.76,
#     'close_price': 323.94, 'total_amount': 8.92837, 'bull_amount': 6.27178, 'bear_amount': 2.6566, 'bull_ratio': 3.36, 'bear_ratio': 1.42}
