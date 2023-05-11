import React, { useState, useEffect } from "react";
import moment from "moment";
const TableIndicators = ({
  result,
  isLoading,
  minAcurracy,
  setMinAcurracy,
}) => {
  const [hover, setHover] = useState("");
  const [indicator, setIndicator] = useState({
    s0_RSI: 0,
    "s0_STOCH.K": 0,
    s0_CCI: 0,
    s0_ADX: 0,
    s0_AO: 0,
    s0_Mom: 0,
    s0_MACD: 0,
    "s0_Stoch.RSI": 0,
    "s0_W%R": 0,
    s0_BBP: 0,
    s0_UO: 0,
    s0_EMA10: 0,
    s0_SMA10: 0,
    s0_EMA20: 0,
    s0_SMA20: 0,
    s0_EMA30: 0,
    s0_SMA30: 0,
    s0_EMA50: 0,
    s0_SMA50: 0,
    s0_EMA100: 0,
    s0_SMA100: 0,
    s0_EMA200: 0,
    s0_SMA200: 0,
    s0_Ichimoku: 0,
    s0_VWMA: 0,
    s0_HullMA: 0,

    s1_RSI: 0,
    "s1_STOCH.K": 0,
    s1_CCI: 0,
    s1_ADX: 0,
    s1_AO: 0,
    s1_Mom: 0,
    s1_MACD: 0,
    "s1_Stoch.RSI": 0,
    "s1_W%R": 0,
    s1_BBP: 0,
    s1_UO: 0,
    s1_EMA10: 0,
    s1_SMA10: 0,
    s1_EMA20: 0,
    s1_SMA20: 0,
    s1_EMA30: 0,
    s1_SMA30: 0,
    s1_EMA50: 0,
    s1_SMA50: 0,
    s1_EMA100: 0,
    s1_SMA100: 0,
    s1_EMA200: 0,
    s1_SMA200: 0,
    s1_Ichimoku: 0,
    s1_VWMA: 0,
    s1_HullMA: 0,

    s2_RSI: 0,
    "s2_STOCH.K": 0,
    s2_CCI: 0,
    s2_ADX: 0,
    s2_AO: 0,
    s2_Mom: 0,
    s2_MACD: 0,
    "s2_Stoch.RSI": 0,
    "s2_W%R": 0,
    s2_BBP: 0,
    s2_UO: 0,
    s2_EMA10: 0,
    s2_SMA10: 0,
    s2_EMA20: 0,
    s2_SMA20: 0,
    s2_EMA30: 0,
    s2_SMA30: 0,
    s2_EMA50: 0,
    s2_SMA50: 0,
    s2_EMA100: 0,
    s2_SMA100: 0,
    s2_EMA200: 0,
    s2_SMA200: 0,
    s2_Ichimoku: 0,
    s2_VWMA: 0,
    s2_HullMA: 0,
  });
  const [indicatorCount, setIndicatorCount] = useState({
    s0_RSI: 0,
    "s0_STOCH.K": 0,
    s0_CCI: 0,
    s0_ADX: 0,
    s0_AO: 0,
    s0_Mom: 0,
    s0_MACD: 0,
    "s0_Stoch.RSI": 0,
    "s0_W%R": 0,
    s0_BBP: 0,
    s0_UO: 0,
    s0_EMA10: 0,
    s0_SMA10: 0,
    s0_EMA20: 0,
    s0_SMA20: 0,
    s0_EMA30: 0,
    s0_SMA30: 0,
    s0_EMA50: 0,
    s0_SMA50: 0,
    s0_EMA100: 0,
    s0_SMA100: 0,
    s0_EMA200: 0,
    s0_SMA200: 0,
    s0_Ichimoku: 0,
    s0_VWMA: 0,
    s0_HullMA: 0,

    s1_RSI: 0,
    "s1_STOCH.K": 0,
    s1_CCI: 0,
    s1_ADX: 0,
    s1_AO: 0,
    s1_Mom: 0,
    s1_MACD: 0,
    "s1_Stoch.RSI": 0,
    "s1_W%R": 0,
    s1_BBP: 0,
    s1_UO: 0,
    s1_EMA10: 0,
    s1_SMA10: 0,
    s1_EMA20: 0,
    s1_SMA20: 0,
    s1_EMA30: 0,
    s1_SMA30: 0,
    s1_EMA50: 0,
    s1_SMA50: 0,
    s1_EMA100: 0,
    s1_SMA100: 0,
    s1_EMA200: 0,
    s1_SMA200: 0,
    s1_Ichimoku: 0,
    s1_VWMA: 0,
    s1_HullMA: 0,

    s2_RSI: 0,
    "s2_STOCH.K": 0,
    s2_CCI: 0,
    s2_ADX: 0,
    s2_AO: 0,
    s2_Mom: 0,
    s2_MACD: 0,
    "s2_Stoch.RSI": 0,
    "s2_W%R": 0,
    s2_BBP: 0,
    s2_UO: 0,
    s2_EMA10: 0,
    s2_SMA10: 0,
    s2_EMA20: 0,
    s2_SMA20: 0,
    s2_EMA30: 0,
    s2_SMA30: 0,
    s2_EMA50: 0,
    s2_SMA50: 0,
    s2_EMA100: 0,
    s2_SMA100: 0,
    s2_EMA200: 0,
    s2_SMA200: 0,
    s2_Ichimoku: 0,
    s2_VWMA: 0,
    s2_HullMA: 0,
  });
  //   const [minAcurracy, setMinAcurracy] = useState(50);
  const indicators = [
    "RSI",
    "STOCH.K",
    "CCI",
    "ADX",
    "AO",
    "Mom",
    "MACD",
    "Stoch.RSI",
    "W%R",
    "BBP",
    "UO",
    "EMA10",
    "SMA10",
    "EMA20",
    "SMA20",
    "EMA30",
    "SMA30",
    "EMA50",
    "SMA50",
    "EMA100",
    "SMA100",
    "EMA200",
    "SMA200",
    "Ichimoku",
    "VWMA",
    "HullMA",
  ];
  const v2_15 = ["ADX", "RSI", "STOCH.K"];
  const v2_5 = ["Ichimoku", "Stoch.RSI", "ADX", "RSI"];
  const v2_1 = ["Ichimoku", "Stoch.RSI", "AO", "RSI"];

  const v3 = {};
  v3["s0_Ichimoku"] = indicator["s0_Ichimoku"];
  v3["s0_Stoch.RSI"] = indicator["s0_Stoch.RSI"];
  v3["s0_AO"] = indicator["s0_AO"];
  v3["s0_RSI"] = indicator["s0_RSI"];
  v3["s1_Ichimoku"] = indicator["s1_Ichimoku"];
  v3["s1_Stoch.RSI"] = indicator["s1_Stoch.RSI"];
  v3["s1_ADX"] = indicator["s1_ADX"];
  v3["s1_RSI"] = indicator["s1_RSI"];

  v3["s2_ADX"] = indicator["s2_ADX"];
  v3["s2_RSI"] = indicator["s2_RSI"];
  v3["s2_STOCH.K"] = indicator["s2_STOCH.K"];

  const v3_count = {};
  v3_count["s0_Ichimoku"] = indicatorCount["s0_Ichimoku"];
  v3_count["s0_Stoch.RSI"] = indicatorCount["s0_Stoch.RSI"];
  v3_count["s0_AO"] = indicatorCount["s0_AO"];
  v3_count["s0_RSI"] = indicatorCount["s0_RSI"];
  v3_count["s1_Ichimoku"] = indicatorCount["s1_Ichimoku"];
  v3_count["s1_Stoch.RSI"] = indicatorCount["s1_Stoch.RSI"];
  v3_count["s1_ADX"] = indicatorCount["s1_ADX"];
  v3_count["s1_RSI"] = indicatorCount["s1_RSI"];

  v3_count["s2_ADX"] = indicatorCount["s2_ADX"];
  v3_count["s2_RSI"] = indicatorCount["s2_RSI"];
  v3_count["s2_STOCH.K"] = indicatorCount["s2_STOCH.K"];

  useEffect(() => {
    if (result) {
      result.map((r) => {
        r.indicators?.map((s, i) => {
          indicators?.map((l) => {
            (s[l]?.includes("BUY") && r.result === "UP") ||
            (s[l]?.includes("SELL") && r.result === "DOWN")
              ? setIndicator((prev) => ({
                  ...prev,
                  [`s${i}_${l}`]: prev[`s${i}_${l}`] + 1,
                }))
              : "";
            s[l] !== "NEUTRAL" && ["UP", "DOWN"].includes(r?.result)
              ? setIndicatorCount((prev) => ({
                  ...prev,
                  [`s${i}_${l}`]: prev[`s${i}_${l}`] + 1,
                }))
              : "";
          });
        });
      });
    }
  }, [isLoading]);
  return (
    <div>
      <div className=" ">
        {/* <div>
          <pre>{JSON.stringify(indicator, null, 2)}</pre>
        </div> */}

        <div className="my-5 border border-1">
          <div className="mx-5 font-mono dark:text-black">Indicator result</div>
          <table className="w-full  h-[50%] overflow-y-scroll">
            <thead className="">
              <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
                <th className="border border-x-1 px-2 " colSpan={26}>
                  📈 1 MINS
                </th>
                <th className="border border-x-1 px-2 " colSpan={26}>
                  📈 5 MINS
                </th>
                <th className="border border-x-1 px-2 " colSpan={26}>
                  📈 15 MINS
                </th>
              </tr>
            </thead>
            <thead className="">
              <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
                {indicators.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
                {indicators.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
                {indicators.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(indicator)?.map((i) => (
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {i}
                  </td>
                ))}
              </tr>
              <tr>
                {Object.values(indicatorCount)?.map((i) => (
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {i}
                  </td>
                ))}
              </tr>
              <tr>
                {Object.values(indicatorCount)?.map((i, index) => (
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {Object.values(indicator)[index] / i
                      ? ((Object.values(indicator)[index] / i) * 100).toFixed(2)
                      : Object.values(indicator)[index] / i}
                    %
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-5 border border-1">
          <div className="mx-5 font-mono dark:text-black">
            Indicator result (v2)
          </div>
          <table className="  h-[50%] overflow-y-scroll">
            <thead className="">
              <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
                <th className="border border-x-1 px-2 " colSpan={4}>
                  📈 1 MINS
                </th>
                <th className="border border-x-1 px-2 " colSpan={4}>
                  📈 5 MINS
                </th>
                <th className="border border-x-1 px-2 " colSpan={3}>
                  📈 15 MINS
                </th>
              </tr>
            </thead>
            <thead className="">
              <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
                {v2_1.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
                {v2_5.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
                {v2_15.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(v3)?.map((i) => (
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {i}
                  </td>
                ))}
              </tr>
              <tr>
                {Object.values(v3_count)?.map((i) => (
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {i}
                  </td>
                ))}
              </tr>
              <tr>
                {Object.values(v3_count)?.map((i, index) => (
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {Object.values(v3)[index] / i
                      ? ((Object.values(v3)[index] / i) * 100).toFixed(2)
                      : Object.values(v3)[index] / i}
                    %
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-5 flex gap-2">
          <p className="p-1">OVER:</p>
          <input
            type="number"
            className="bg-gray-400 w-20 rounded-md p-1"
            value={minAcurracy}
            onChange={(e) => setMinAcurracy(e.target.value)}
          />
          <p className="pt-1">%</p>
        </div>
        <div className="overflow-x-scroll">
          <table className="w-full  h-[50%] overflow-y-scroll">
            <thead className="">
              <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
                <th className="border border-x-1 px-2 " colSpan={2}></th>
                <th className="border border-x-1 px-2 " colSpan={4}>
                  RESULT
                </th>

                <th className="border border-x-1 px-2 " colSpan={1}>
                  STRONG with AVG
                </th>
                <th className="border border-x-1 px-2 " colSpan={6}>
                  📈 1 MINS
                </th>
                <th className="border border-x-1 px-2 " colSpan={6}>
                  📈 5 MINS
                </th>
                <th className="border border-x-1 px-2 " colSpan={6}>
                  📈 15 MINS
                </th>
                <th className="border border-x-1 px-2 " colSpan={6}>
                  📈 AVG (1MINS and 5 MINS)
                </th>
                <th className="border border-x-1 px-2 " colSpan={6}>
                  📈 AVG (1MINS and 5 MINS and 15MINS)
                </th>
                <th className="border border-x-1 px-2 " colSpan={26}>
                  Indicators (1 MINS)
                </th>
                <th className="border border-x-1 px-2 " colSpan={26}>
                  Indicators (5 MINS)
                </th>
                <th className="border border-x-1 px-2 " colSpan={26}>
                  Indicators (15 MINS)
                </th>
              </tr>
            </thead>
            <thead className="">
              <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
                {/* <th className="border border-x-1 px-2 ">dateTime</th> */}
                <th className="border border-x-1 px-2 ">epoch</th>
                <th className="border border-x-1 px-2 ">DateTime</th>
                {/* <th className="border border-x-1 px-2 ">INTERVAL</th> */}

                <th className="border border-x-1 px-2 "> CLOSE PRICE </th>
                <th className="border border-x-1 px-2 "> LOCK PRICE </th>
                <th className="border border-x-1 px-2 ">FINAL </th>
                <th className="border border-x-1 px-2 ">%Price Change </th>
                <th className="border border-x-1 px-2 ">
                  STRONG_5MINS with AVG_1_5
                </th>

                <th className="border border-x-1 px-2 "> RECOMMENDATION </th>
                <th className="border border-x-1 px-2 ">BUY COUNT </th>
                <th className="border border-x-1 px-2 ">SELL COUNT </th>
                <th className="border border-x-1 px-2 ">NEUTRAL COUNT</th>
                <th className="border border-x-1 px-2 ">SIGNAL</th>
                <th className="border border-x-1 px-2 ">SIGNAL %</th>

                <th className="border border-x-1 px-2 "> RECOMMENDATION </th>
                <th className="border border-x-1 px-2 ">BUY COUNT </th>
                <th className="border border-x-1 px-2 ">SELL COUNT </th>
                <th className="border border-x-1 px-2 ">NEUTRAL COUNT</th>
                <th className="border border-x-1 px-2 ">SIGNAL</th>
                <th className="border border-x-1 px-2 ">SIGNAL %</th>

                <th className="border border-x-1 px-2 "> RECOMMENDATION </th>
                <th className="border border-x-1 px-2 ">BUY COUNT </th>
                <th className="border border-x-1 px-2 ">SELL COUNT </th>
                <th className="border border-x-1 px-2 ">NEUTRAL COUNT</th>
                <th className="border border-x-1 px-2 ">SIGNAL</th>
                <th className="border border-x-1 px-2 ">SIGNAL %</th>

                <th className="border border-x-1 px-2 "> RECOMMENDATION </th>
                <th className="border border-x-1 px-2 ">BUY COUNT </th>
                <th className="border border-x-1 px-2 ">SELL COUNT </th>
                <th className="border border-x-1 px-2 ">NEUTRAL COUNT</th>
                <th className="border border-x-1 px-2 ">SIGNAL</th>
                <th className="border border-x-1 px-2 ">SIGNAL %</th>

                <th className="border border-x-1 px-2 "> RECOMMENDATION </th>
                <th className="border border-x-1 px-2 ">BUY COUNT </th>
                <th className="border border-x-1 px-2 ">SELL COUNT </th>
                <th className="border border-x-1 px-2 ">NEUTRAL COUNT</th>
                <th className="border border-x-1 px-2 ">SIGNAL</th>
                <th className="border border-x-1 px-2 ">SIGNAL %</th>

                {indicators.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
                {indicators.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
                {indicators.map((i) => (
                  <th className="border border-x-1 px-2 ">{i}</th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full">
              {result?.map((r, index) => (
                <tr
                  className={`${
                    index % 2 == 0
                      ? hover === index
                        ? "bg-blue-200 dark:bg-blue-200"
                        : "bg-gray-200 dark:bg-gray-200"
                      : "dark:bg-white"
                  } ${
                    hover === index ? "bg-blue-200" : ""
                  }   dark:text-black  w-full `}
                  key={index}
                  onClick={() => setHover(index)}
                >
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {r.epoch}
                  </td>
                  <td className="text-center border border-r-1  font-mono ">
                    <p className="w-[200px]">
                      {moment(r.datetime).format("YYYY-MM-DD HH:mm")}
                    </p>
                  </td>

                  <td className="text-center border border-r-1 px-2  ">
                    {r.close_price}
                  </td>
                  <td className="text-center border border-r-1 px-2  ">
                    {r.lock_price}
                  </td>

                  <td
                    className={`text-center border border-r-1 px-2 text-white ${
                      r.result === "UP"
                        ? "bg-[#31d0aa]"
                        : r.result === "DOWN"
                        ? "bg-[#ed4b93]"
                        : ""
                    } `}
                  >
                    {r.result}
                  </td>
                  <td
                    className={`text-center border border-r-1 px-2  ${
                      r.result === "UP"
                        ? "text-[#31d0aa]"
                        : r.result === "DOWN"
                        ? "text-[#ed4b93]"
                        : ""
                    } `}
                  >
                    {Number(r?.["%priceChange"] ?? 0).toFixed(2)}
                  </td>
                  <td className="text-center border border-r-1 px-2">
                    {r.STRONG_5_AVG_1_5}
                  </td>
                  {r.data?.map((s, i) => (
                    <>
                      {/* <td className="text-center border border-r-1  font-mono">
                      {s.Interval}
                    </td> */}
                      <td className="text-center border border-r-1 text-yellow-900  font-mono">
                        {s.RECOMMENDATION}
                      </td>

                      <td className="text-center border border-r-1 bg-[#31d0aa] text-white  font-mono">
                        {s.BUY}
                      </td>
                      <td className="text-center border border-r-1 bg-[#ed4b93] text-white font-mono">
                        {s.SELL}
                      </td>
                      <td className="text-center border border-r-1 bg-gray-500 text-white font-mono">
                        {s.NEUTRAL}
                      </td>

                      <td
                        className={`text-center border border-r-1  ${
                          s.alert === "UP"
                            ? " bg-[#31d0aa]"
                            : s.alert === "DOWN"
                            ? " bg-[#ed4b93]"
                            : ""
                        } font-mono text-white`}
                      >
                        {s.alert}
                      </td>

                      <td
                        className={`text-center border border-r-1   font-mono `}
                      >
                        {s.signal.toFixed(2)}
                      </td>
                    </>
                  ))}
                  {r.indicators?.map((s, i) =>
                    indicators?.map((l) => (
                      <td
                        className={`text-center border border-r-1 ${
                          s[l] === "BUY"
                            ? " bg-[#31d0aa]"
                            : s[l] === "SELL"
                            ? "bg-[#ed4b93]"
                            : "text-yellow-900"
                        } 
                        font-mono px-1 `}
                      >
                        <p>{s[l]}</p>
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableIndicators;
