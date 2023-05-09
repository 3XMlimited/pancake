from tradingview_ta import TA_Handler, Interval, Exchange
import pandas as pd
from pprint import pprint
handler1m = TA_Handler(
    symbol="BNBUSDT",
    exchange="BINANCE",
    screener="crypto",
    interval="1m",
)
handler5m = TA_Handler(
    symbol="BNBUSDT",
    exchange="BINANCE",
    screener="crypto",
    interval="5m",
)
handler15m = TA_Handler(
    symbol="BNBUSDT",
    exchange="BINANCE",
    screener="crypto",
    interval="15m",
)
minAcurracy = 90


def percentage(a, b):

    return int((100 * a) / (a + b))


def getSignal():
    rec1m = handler1m.get_analysis().summary
    rec5m = handler5m.get_analysis().summary

    # rec15m = handler15m.get_analysis().summary

    # if rec1m and rec5m and rec15m:
    if rec1m and rec5m:

        avgBuy = int(rec1m['BUY'] + rec5m['BUY']) / 2
        avgSell = int(rec1m['SELL'] + rec5m['SELL']) / 2
        avgNeutral = int(rec1m['NEUTRAL'] + rec5m['NEUTRAL']) / 2
        m1REC = rec1m['RECOMMENDATION']
        m5REC = rec5m['RECOMMENDATION']

        # avgBuy3 = int((rec1m['BUY'] + rec5m['BUY'] + rec15m['BUY']) / 3)
        # avgSell3 = int((rec1m['SELL'] + rec5m['SELL'] + rec15m['SELL']) / 3)
        # avgNeutral3 = int(
        #     (rec1m['NEUTRAL'] + rec5m['NEUTRAL'] + rec15m['NEUTRAL']) / 3)
        # df = pd.DataFrame([rec1m, rec5m, rec15m])
        # df['Interval'] = ['1m', '5m', '15m']
        # df = pd.DataFrame([rec1m, rec5m])
        # df['Interval'] = ['1m', '5m']

        # df = df.append({"BUY": avgBuy, "SELL": avgSell,
        #                "NEUTRAL": avgNeutral, "Interval": "AVG_1m_5m"}, ignore_index=True)
        # df = df.append({"BUY": avgBuy3, "SELL": avgSell3,
        #                 "NEUTRAL": avgNeutral3, "Interval": "AVG_ALL"}, ignore_index=True)

        # df["RECOMMENDATION"][3] = "BUY" if avgBuy > avgSell else "SELL"
        # df["RECOMMENDATION"][4] = "BUY" if avgBuy3 > avgSell3 else "SELL"
        # df['ALERT'] = "BUY" if df['BUY'] > df['SELL'] else "SELL"
        # df['SIGNAL'] = df['BUY'] * 100 / \
        #     (df['BUY'] + df['SELL']) if df['BUY'] > df['SELL'] else df['SELL'] * \
        #     100 / (df['BUY'] + df['SELL'])

    # print(percentage(df['BUY'][4], df['SELL'][4]), "%")
    print(
        "-----------------------------AVG--SIGNAL---------------------------------"
    )
    print("做多信号:", avgBuy)
    print("做空信号:", avgSell)
    print("空仓信号:", avgNeutral)
    print("1分钟推荐信号:",  m1REC)
    print("5分钟推荐信号:",  m5REC)

    print(
        "-----------------------------AVG---SIGNAL--------------------------------"
    )
    # return df

    return {
        "buy": avgBuy,
        "sell": avgSell,
        "neutral": avgNeutral,
        "REC1":  m1REC,
        "REC5":  m5REC,
    }


# 168861

s = handler1m.get_analysis().indicators
s1o = handler1m.get_analysis().oscillators['COMPUTE']
s1m = handler1m.get_analysis().moving_averages['COMPUTE']
s1o.update(s1m)

s5o = handler5m.get_analysis().oscillators['COMPUTE']
s5m = handler5m.get_analysis().moving_averages['COMPUTE']
s5o.update(s5m)

s15o = handler15m.get_analysis().oscillators['COMPUTE']
s15m = handler15m.get_analysis().moving_averages['COMPUTE']
s15o.update(s15m)

df = pd.DataFrame([s1o, s5o, s15o])

pprint(df)

# s4 = handler1m.get_analysis().summary
# pprint(s4)
