from func_contract import get_contract_info, get_unix_timestamp
from func_write import send_tx
from constants import CONTRACT
from datetime import datetime
from tradingView import getSignal, percentage
import time


# Execute placing a trade
if __name__ == "__main__":

    print("start!")
    minAcurracy = 90
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
    try:
        time.sleep(sleep_time)
        # pass
    except Exception as e:
        print("error", e, "sleep time:", sleep_time)
    # Get contract round price information
    print("Retrieving live data...")
    # df_download = get_contract_info()
    # print(df_download)
    # Define columns

    # Keep relevant columns
    signals = getSignal()

    if (signals):
        if (signals['buy'] > signals['sell'] and percentage(signals['buy'], signals['sell']) > minAcurracy) or signals['REC1'] == "STRONG_BUY" or signals['REC5'] == "STRONG_BUY":
            print(epoch_0, "🔮预测: 上升UP 🟢", percentage(
                signals['buy'], signals['sell']))
            send_tx("bear")
        elif (signals['sell'] > signals['buy'] and percentage(signals['sell'], signals['buy']) > minAcurracy) or signals['REC1'] == "STRONG_SELL" or signals['REC5'] == "STRONG_SELL":
            print(epoch_0, "🔮预测: 下降DOWN 🔴", percentage(
                signals['sell'], signals['buy']))
            send_tx("bull")
        else:
            print(epoch_0, "🔮预测: 上升UP 🟢", percentage(
                signals['buy'], signals['sell']))
            print(epoch_0, "🔮预测: 下降DOWN 🔴", percentage(
                signals['sell'], signals['buy']))
            print("不着急，等待下一轮吧！")

# # Determine trade
# if pred_over_1 > PROBA_THRESH:
#     print("Placing trade...")
#     send_tx("bear")
