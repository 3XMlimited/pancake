const {
  TradingViewScan,
  SCREENERS_ENUM,
  EXCHANGES_ENUM,
  INTERVALS_ENUM,
} = require("trading-view-recommends-parser");

const GLOBAL_CONFIG = {
  BET_AMOUNT: 5, // in USD
  DAILY_GOAL: 20, // in USD,
  WAITING_TIME: 261000, // in Miliseconds (4.3 Minutes)
  THRESHOLD: 50, // Minimum % of certainty of signals (50 - 100)
};

//Check Signals
const getSignals = async () => {
  //1 Minute signals
  let resultMin = await new TradingViewScan(
    SCREENERS_ENUM["crypto"],
    EXCHANGES_ENUM["BINANCE"],
    "BNBUSDT",
    INTERVALS_ENUM["1m"]
  ).analyze();
  let minObj = JSON.stringify(resultMin.summary);
  let minRecomendation = JSON.parse(minObj);

  //5 Minute signals
  let resultMed = await new TradingViewScan(
    SCREENERS_ENUM["crypto"],
    EXCHANGES_ENUM["BINANCE"],
    "BNBUSDT",
    INTERVALS_ENUM["5m"]
  ).analyze();
  let medObj = JSON.stringify(resultMed.summary);
  let medRecomendation = JSON.parse(medObj);

  //Average signals
  if (minRecomendation && medRecomendation) {
    let averageBuy =
      (parseInt(minRecomendation.BUY) + parseInt(medRecomendation.BUY)) / 2;
    let averageSell =
      (parseInt(minRecomendation.SELL) + parseInt(medRecomendation.SELL)) / 2;
    let averageNeutral =
      (parseInt(minRecomendation.NEUTRAL) +
        parseInt(medRecomendation.NEUTRAL)) /
      2;
    console.log(
      "-------------------------------SIGNAL---------------------------------"
    );
    console.log("做多信号:", averageBuy);
    console.log("做空信号:", averageSell);
    console.log("空仓信号:", averageNeutral);

    console.log(
      "--------------------------------SIGNAL--------------------------------"
    );
    return {
      buy: averageBuy,
      sell: averageSell,
      neutral: averageNeutral,
    };
  } else {
    return false;
  }
};

// Check BNBUSD PRICE
const getBNBPrice = async () => {
  const url = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT";
  try {
    const res = await fetch(url);
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    const price = await res.json();
    // console.log(price.price);
    return parseFloat(price.price);
  } catch (err) {
    console.error("Unable to connect to Binance API", err);
  }
};

//Percentage difference
const percentage = (a, b) => {
  console.log(parseInt((100 * a) / (a + b)));
  return parseInt((100 * a) / (a + b));
};

//Strategy of betting
const strategy = async (minAcurracy, epoch) => {
  let BNBPrice;
  //   let earnings = await getStats();
  //   if (earnings.profit_USD >= GLOBAL_CONFIG.DAILY_GOAL) {
  //     console.log("🧞 Daily goal reached. Shuting down... ✨");
  //     process.exit();
  //   }
  try {
    BNBPrice = await getBNBPrice();
  } catch (err) {
    return;
  }
  let signals = await getSignals();
  if (signals) {
    if (
      signals.buy > signals.sell &&
      percentage(signals.buy, signals.sell) > minAcurracy
    ) {
      console.log(
        `${epoch.toString()} 🔮预测: 上升UP 🟢 ${percentage(
          signals.buy,
          signals.sell
        )}%`
      );
      //   await betDown(GLOBAL_CONFIG.BET_AMOUNT / BNBPrice, epoch);
      //   await saveRound(epoch.toString(), [
      //     {
      //       round: epoch.toString(),
      //       betAmount: (GLOBAL_CONFIG.BET_AMOUNT / BNBPrice).toString(),
      //       bet: "bear", //bull
      //     },
      //   ]);
    } else if (
      signals.sell > signals.buy &&
      percentage(signals.sell, signals.buy) > minAcurracy
    ) {
      console.log(
        `${epoch.toString()} 🔮 预测: 下降DOWN 🔴 ${percentage(
          signals.sell,
          signals.buy
        )}%`
      );
      //   await betUp(GLOBAL_CONFIG.BET_AMOUNT / BNBPrice, epoch);
      //   await saveRound(epoch.toString(), [
      //     {
      //       round: epoch.toString(),
      //       betAmount: (GLOBAL_CONFIG.BET_AMOUNT / BNBPrice).toString(),
      //       bet: "bull", //bear
      //     },
      //   ]);
    } else {
      let lowPercentage;
      if (signals.buy > signals.sell) {
        lowPercentage = percentage(signals.buy, signals.sell);
      } else {
        lowPercentage = percentage(signals.sell, signals.buy);
      }
      console.log("Waiting for next round 🕑", lowPercentage + "%");
    }
  } else {
    console.log("Error obtaining signals");
  }
};

getBNBPrice();
