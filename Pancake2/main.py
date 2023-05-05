from func_contract import get_unix_timestamp

from constants import CONTRACT
from datetime import datetime
from tradingView import getSignal
import time
from pymongo import MongoClient
import certifi
import pandas as pd


def UpdatePrev1(epoch):
    connection_url = "mongodb+srv://3XM:chuchupa888@cluster0.6uckc.mongodb.net/pancakes?retryWrites=true&w=majority"
    myclient = MongoClient(connection_url, tlsCAFile=certifi.where())
    db = myclient["pancakes"]
    Collection = db["bnb/live"]
    i = Collection.find_one({"epoch": epoch})
    # print(i['data'][2])
    # df = pd.DataFrame([i['data'][2]])
    i = i['data'][2]
    # df = df[['epoch', 'lock_price', 'close_price']]
    i['result'] = "UP" if i['close_price'] - i['lock_price'] > 0 else "DOWN"
    i['%priceChange'] = (i['close_price'] - i['lock_price']
                         ) / i['close_price'] * 100

    if i['result']:
        connection_url = "mongodb+srv://3XM:chuchupa888@cluster0.6uckc.mongodb.net/pancakes?retryWrites=true&w=majority"
        myclient = MongoClient(connection_url, tlsCAFile=certifi.where())
        db = myclient["pancakes"]
        Collection = db["trading_view_pred"]
        Collection.update_one({'epoch': i['epoch']}, {"$set": {'lock_price': i['lock_price'],
                              'close_price': i['close_price'], 'result': i['result'], '%priceChange': i['%priceChange']}})
        print('finish', epoch)

    print(i)
    # return i['data'][2]


# Execute placing a trade
if __name__ == "__main__":

    print("start!")
    UpdatePrev1(168915)
    # Get current epoch
    # epoch_0 = CONTRACT.functions.currentEpoch().call()

    # # Get time until next round
    # rounds_list_curr = CONTRACT.functions.rounds(epoch_0).call()
    # lock_timestamp = rounds_list_curr[2]
    # date_log = datetime.fromtimestamp(lock_timestamp)
    # datenow = get_unix_timestamp()
    # seconds_diff = lock_timestamp - int(datenow)

    # # Sleep for 30 seconds until just before lock time
    # if seconds_diff > 30:
    #     sleep_time = seconds_diff - 30
    # else:
    #     sleep_time = 0

    # # Sleep until ready
    # print("Sleeping for: ", sleep_time)
    # try:
    #     time.sleep(sleep_time)
    #     pass
    # except Exception as e:
    #     print("error", e, "sleep time:", sleep_time)
    # # Get contract round price information
    # print("Retrieving live data...")

    # # GET SIGNAL FROM TRADING VIEW
    # df = getSignal()
    # # df['epoch'] = epoch_0

    # # print(df)
    # now = datetime.now()

    # # save to DB
    # TD = df.to_dict("records")
    # TD = {"datetime": now, 'epoch': epoch_0, "data": TD}
    # connection_url = "mongodb+srv://3XM:chuchupa888@cluster0.6uckc.mongodb.net/pancakes?retryWrites=true&w=majority"
    # myclient = MongoClient(connection_url, tlsCAFile=certifi.where())
    # db = myclient["pancakes"]
    # Collection = db["trading_view_pred"]
    # Collection.insert_one(TD)
    # print('finish', epoch_0)
