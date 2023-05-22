import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import loading from "../assets/loading.svg";
import moment from "moment";

import TableLive from "../components/TableLive";
import TableOrg from "../components/TableOrg";
import TableTest from "../components/TableTest";
function Main() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("pancake");
  const [bnbdata, setBNBData] = useState([]);
  const [bnbdatatest, setBNBDataTEST] = useState([]);

  const [rate, setRate] = useState({
    win1: 0,
    count1: 0,
    win2: 0,
    count2: 0,
    win3: 0,
    count3: 0,
    win4: 0,
    count4: 0,
    win_cake: 0,
    count_cake: 0,
  });

  const pancake =
    "https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png";
  const bnb = "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png";

  const handleClick = () => {
    setIsLoading(true);
    axios
      .get(
        `https://thewordartisan.online/api/v1/pancake?dbname=${
          data === "bnb/live_test"
            ? "bnb/live"
            : data === "cake/live_test"
            ? "cake/live"
            : data
        }`
      )
      .then(function (response) {
        // console.log(response.data);

        if (data === "bnb/live") {
          const results = response.data.result
            .reverse()
            .sort((a, b) => new Date(a.datetime) - new Date(b.dateTime));
          // const indexs = [results.length - 1, results.length - 2];
          const indexs = [0, 1];
          results.forEach((r, index) => {
            r["final"] = indexs.includes(index)
              ? ""
              : results[index - 2]?.data[2].close_price <
                results[index - 2]?.data[2].lock_price
              ? "DOWN"
              : results[index - 2]?.data[2].close_price >
                results[index - 2]?.data[2].lock_price
              ? "UP"
              : "";
            r["pred"] =
              r.data[0].down_payout < 1.4 &&
              r.data[2].close_price < r.data[2].lock_price
                ? "UP"
                : r?.data[0].up_payout < 1.4 &&
                  r?.data[2].close_price > r.data[2].lock_price
                ? "DOWN"
                : "";

            if (r["pred"] === r["final"]) {
              setWin((prev) => prev + 1);
            }
            if (r["pred"] !== "") {
              setCount((prev) => prev + 1);
            }
          });
          setResult(results);

          let ress = [];

          // blive.map((r, index) => {
          //   let res = {};
          //   r.map((g, i) => {
          //     res["dateTime"] = blive[index][0]["datetime"];
          //     res[`epoch${i}`] = g["epoch"];
          //     res[`bear amount ${i}`] = g["bear_amount"];
          //     res[`bull amount ${i}`] = g["bull_amount"];
          //     res[`close price ${i}`] = g["close_price"];
          //     res[`lock price ${i}`] = g["lock_price"];
          //     res[`% price change  ${i}`] =
          //       ((g.close_price - g.lock_price) / g.lock_price) * 100;
          //     res[`price pool ${i}`] = g["total_amount"];
          //     res[`up payout ${i}`] = g["up_payout"];
          //     res[`down payout ${i}`] = g["down_payout"];
          //     res[`result ${i}`] =
          //       i === 1
          //         ? r[2].close_price > r[2].lock_price
          //           ? "UP"
          //           : r[2].close_price === r[2].lock_price
          //           ? "/"
          //           : "DOWN"
          //         : g.close_price > g.lock_price
          //         ? "UP"
          //         : g.close_price === g.lock_price
          //         ? "/"
          //         : "DOWN";
          //     res[`%change ${i}`] =
          //       i === 1
          //         ? (
          //             ((-g.lock_price + g.close_price) / g.lock_price) *
          //             100
          //           ).toFixed(4)
          //         : (
          //             ((-r[2].lock_price + r[2].close_price) /
          //               r[2].lock_price) *
          //             100
          //           ).toFixed(4);
          //   });
          //   ress.push(res);
          // });
          results.map((r, index) => {
            let res = {};
            res["dateTime"] = moment(r["dateTime"]).format("YYYY-MM-DD HH:mm");
            res["epoch"] = r["epoch"];
            res["Final Result"] = r["final"];
            res["Predict Result"] = r["pred"];
            res[`up payout`] = r["data"][0]["up_payout"];
            res[`down payout`] = r["data"][0]["down_payout"];
            res[`PREV UP Payout`] = index > 1 ? r["data"][2]["up_payout"] : "";
            res[`PREV DOWN Payout`] =
              index > 1 ? r["data"][2]["down_payout"] : "";

            // r.map((g, i) => {
            //   res["dateTime"] = blive[index][0]["datetime"];
            //   res[`epoch${i}`] = g["epoch"];
            //   res[`bear amount ${i}`] = g["bear_amount"];
            //   res[`bull amount ${i}`] = g["bull_amount"];
            //   res[`close price ${i}`] = g["close_price"];
            //   res[`lock price ${i}`] = g["lock_price"];
            //   res[`% price change  ${i}`] =
            //     ((g.close_price - g.lock_price) / g.lock_price) * 100;
            //   res[`price pool ${i}`] = g["total_amount"];
            //   res[`up payout ${i}`] = g["up_payout"];
            //   res[`down payout ${i}`] = g["down_payout"];
            // });
            ress.push(res);
          });
          setBNBData(ress);
          // console.log("ress", ress);
          //
        } else if (data === "bnb/live_test") {
          const results = response.data.result
            .reverse()
            .sort((a, b) => new Date(a.datetime) - new Date(b.dateTime));
          console.log(results);
          // const indexs = [results.length - 1, results.length - 2];
          const indexs = [0, 1];
          results.forEach((r, index) => {
            r["final"] = indexs.includes(index)
              ? ""
              : results[index - 2]?.data[2].close_price <
                results[index - 2]?.data[2].lock_price
              ? "DOWN"
              : results[index - 2]?.data[2].close_price >
                results[index - 2]?.data[2].lock_price
              ? "UP"
              : "";

            r["pred"] =
              r.data[0].down_payout < 1.4 &&
              r.data[2].close_price > r.data[2].lock_price
                ? "DOWN"
                : r?.data[0].up_payout < 1.4 &&
                  r?.data[2].close_price < r.data[2].lock_price
                ? "UP"
                : "";
            r["pred4"] =
              r.data[2].up_payout > 2 &&
              r.data[3].up_payout > 2 &&
              r.data[4].up_payout > 2
                ? "UP"
                : r.data[2].down_payout > 2 &&
                  r.data[3].down_payout > 2 &&
                  r.data[4].down_payout > 2
                ? "DOWN"
                : "";

            if (r["pred"] !== "") {
              setRate((prev) => ({ ...prev, count1: prev.count1 + 1 }));
              if (r["pred"] === r["final"]) {
                setRate((prev) => ({ ...prev, win1: prev.win1 + 1 }));
              }
            }

            if (r["pred4"] !== "") {
              setRate((prev) => ({ ...prev, count4: prev.count4 + 1 }));
              if (r["pred4"] === r["final"]) {
                setRate((prev) => ({ ...prev, win4: prev.win4 + 1 }));
              }
            }
          });

          results.forEach((r, index) => {
            r["pred2"] =
              index <= results.length - 4
                ? results[index + 2]["final"] === results[index + 3]?.final &&
                  results[index + 3]?.final === results[index + 4]?.final &&
                  results[index + 2]["final"] === results[index + 4]?.final
                  ? results[index + 2]["final"] === "UP"
                    ? "DOWN"
                    : "UP"
                  : ""
                : "";

            r["pred3"] =
              index <= results.length - 5
                ? results[index + 2]?.final === results[index + 3]?.final &&
                  results[index + 2]?.final === results[index + 4]?.final &&
                  results[index + 2]?.final === results[index + 5]?.final &&
                  results[index + 3]?.final === results[index + 4]?.final &&
                  results[index + 3]?.final === results[index + 5]?.final &&
                  results[index + 4]?.final === results[index + 5]?.final
                  ? results[index + 2]["final"] === "UP"
                    ? "DOWN"
                    : "UP"
                  : ""
                : "";

            // if (r["pred2"] === r["final"]) {
            //   setWin2((prev) => prev + 1);
            // }
            if (r["pred2"] !== "") {
              // setCount2((prev) => prev + 1);
              setRate((prev) => ({ ...prev, count2: prev.count2 + 1 }));
              if (r["pred2"] === r["final"]) {
                setRate((prev) => ({ ...prev, win2: prev.win2 + 1 }));
              }
            }

            if (r["pred3"] !== "") {
              setRate((prev) => ({ ...prev, count3: prev.count3 + 1 }));
              if (r["pred3"] === r["final"]) {
                setRate((prev) => ({ ...prev, win3: prev.win3 + 1 }));
              }
            }
          });

          setResult(results);

          let ress = [];

          results.map((r, index) => {
            let res = {};
            res["epoch"] = r["epoch"];
            res["dateTime"] = moment(r["dateTime"]).format("YYYY-MM-DD HH:mm");

            res["Final Result"] = r["final"];
            res["Predict Result"] = r["pred"];
            res["Predict Result 2"] = r["pred2"];
            res["Predict Result 3"] = r["pred3"];
            res["Predict Result 4"] = r["pred4"];

            res[`LIVE UP Payout`] = r["data"][0]["up_payout"];
            res[`LIVE DOWN Payout`] = r["data"][0]["down_payout"];
            res[`FIXED UP Payout`] = results[index - 1]?.data[1]["up_payout"];
            res[`FIXED DOWN Payout`] =
              results[index - 1]?.data[1]["down_payout"];
            // res[`NEXT UP Payout`] = r["data"][0]["up_payout"];
            // res[`NEXT DOWN Payout`] = r["data"][0]["down_payout"];
            // res[`LIVE last price`] = r["data"][1]["close_price"];
            // res[`LIVE lock price`] = r["data"][1]["lock_price"];
            // res[`LIVE %price change`] = (
            //   ((r["data"][1].close_price - r["data"][1].lock_price) /
            //     r["data"][1].lock_price) *
            //   100
            // ).toFixed(4);
            // res[`LIVE UP Payout`] = r.data[1]["up_payout"];
            // res[`LIVE DOWN Payout`] = r.data[1]["up_payout"];

            // res[`PREV1 last price`] = r["data"][2]["close_price"];
            // res[`PREV1 lock price`] = r["data"][2]["lock_price"];

            // res[`PREV result`] =
            //   r["data"][2]["close_price"] - r["data"][2]["lock_price"] > 0
            //     ? "UP"
            //     : "DOWN";

            res[`PREV1 %price change`] = (
              ((r.data[2].close_price - r["data"][2].lock_price) /
                r.data[2].lock_price) *
              100
            ).toFixed(4);

            res["total_amount"] = results[index - 1]?.data[1].total_amount;
            ress.push(res);
          });

          setBNBDataTEST(ress);
        } else if (data === "cake/live_test") {
          const results = response.data.result
            .reverse()
            .sort((a, b) => new Date(a.datetime) - new Date(b.dateTime));
          // const indexs = [results.length - 1, results.length - 2];
          const indexs = [0, 1];
          results.forEach((r, index) => {
            r["final"] = indexs.includes(index)
              ? ""
              : results[index - 2]?.data[2].close_price <
                results[index - 2]?.data[2].lock_price
              ? "DOWN"
              : results[index - 2]?.data[2].close_price >
                results[index - 2]?.data[2].lock_price
              ? "UP"
              : "";
            r["pred"] =
              r.data[0].down_payout < 1.4 &&
              r.data[2].close_price > r.data[2].lock_price
                ? "DOWN"
                : r?.data[0].up_payout < 1.4 &&
                  r?.data[2].close_price < r.data[2].lock_price
                ? "UP"
                : "";
            r["pred4"] =
              r.data[2].up_payout > 2 &&
              r.data[3].up_payout > 2 &&
              r.data[4].up_payout > 2
                ? "UP"
                : r.data[2].down_payout > 2 &&
                  r.data[3].down_payout > 2 &&
                  r.data[4].down_payout > 2
                ? "DOWN"
                : "";
            r["pred_cake"] =
              r.data[0].up_payout > 2
                ? "UP"
                : r.data[0].down_payout > 2
                ? "DOWN"
                : "";
            if (r["pred"] !== "") {
              setRate((prev) => ({ ...prev, count1: prev.count1 + 1 }));
              if (r["pred"] === r["final"]) {
                setRate((prev) => ({ ...prev, win1: prev.win1 + 1 }));
              }
            }

            if (r["pred4"] !== "") {
              setRate((prev) => ({ ...prev, count4: prev.count4 + 1 }));
              if (r["pred4"] === r["final"]) {
                setRate((prev) => ({ ...prev, win4: prev.win4 + 1 }));
              }
            }
            if (r["pred_cake"] !== "") {
              setRate((prev) => ({
                ...prev,
                count_cake: prev.count_cake + 1,
              }));
              if (r["pred_cake"] === r["final"]) {
                setRate((prev) => ({
                  ...prev,
                  win_cake: prev.win_cake + 1,
                }));
              }
            }
          });

          results.forEach((r, index) => {
            r["pred2"] =
              index <= results.length - 4
                ? results[index + 2]["final"] === results[index + 3]?.final &&
                  results[index + 3]?.final === results[index + 4]?.final &&
                  results[index + 2]["final"] === results[index + 4]?.final
                  ? results[index + 2]["final"] === "UP"
                    ? "DOWN"
                    : "UP"
                  : ""
                : "";

            r["pred3"] =
              index <= results.length - 5
                ? results[index + 2]?.final === results[index + 3]?.final &&
                  results[index + 2]?.final === results[index + 4]?.final &&
                  results[index + 2]?.final === results[index + 5]?.final &&
                  results[index + 3]?.final === results[index + 4]?.final &&
                  results[index + 3]?.final === results[index + 5]?.final &&
                  results[index + 4]?.final === results[index + 5]?.final
                  ? results[index + 2]["final"] === "UP"
                    ? "DOWN"
                    : "UP"
                  : ""
                : "";

            // if (r["pred2"] === r["final"]) {
            //   setWin2((prev) => prev + 1);
            // }
            if (r["pred2"] !== "") {
              // setCount2((prev) => prev + 1);
              setRate((prev) => ({ ...prev, count2: prev.count2 + 1 }));
              if (r["pred2"] === r["final"]) {
                setRate((prev) => ({ ...prev, win2: prev.win2 + 1 }));
              }
            }

            if (r["pred3"] !== "") {
              setRate((prev) => ({ ...prev, count3: prev.count3 + 1 }));
              if (r["pred3"] === r["final"]) {
                setRate((prev) => ({ ...prev, win3: prev.win3 + 1 }));
              }
            }
          });

          setResult(results);

          let ress = [];

          results.map((r, index) => {
            let res = {};
            res["epoch"] = r["epoch"];
            res["dateTime"] = moment(r["dateTime"]).format("YYYY-MM-DD HH:mm");

            res["Final Result"] = r["final"];
            res["Predict Result"] = r["pred"];
            res["Predict Result 2"] = r["pred2"];
            res["Predict Result 3"] = r["pred3"];
            res["Predict Result 4"] = r["pred4"];

            res[`LIVE UP Payout`] = r["data"][0]["up_payout"];
            res[`LIVE DOWN Payout`] = r["data"][0]["down_payout"];
            res[`FIXED UP Payout`] = results[index - 1]?.data[1]["up_payout"];
            res[`FIXED DOWN Payout`] =
              results[index - 1]?.data[1]["down_payout"];

            res[`PREV1 %price change`] = (
              ((r.data[2].close_price - r["data"][2].lock_price) /
                r.data[2].lock_price) *
              100
            ).toFixed(4);

            ress.push(res);
          });

          setBNBDataTEST(ress);
        } else {
          setResult(response.data.result.reverse());
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleClick();
    setRate({
      win1: 0,
      count1: 0,
      win2: 0,
      count2: 0,
      win3: 0,
      count3: 0,
      win4: 0,
      count4: 0,
      win_cake: 0,
      count_cake: 0,
    });
  }, [data]);

  return (
    <div className="w-screen h-full dark:bg-white">
      {isLoading ? (
        <div className="w-screen  flex justify-center dark:bg-white">
          <div className="dark:text-black">
            <img
              src={loading}
              alt="loading"
              className="w-40 bg-blue-400 "
            ></img>
            <p className="font-bold font-mono">Pancake loading...</p>
          </div>
        </div>
      ) : (
        <div className="w-screen relative bg-white">
          <div className="w-full flex justify-start p-2 gap-4 ">
            <CSVLink
              data={
                data === "bnb/live"
                  ? bnbdata
                  : data === "bnb/live_test"
                  ? bnbdatatest
                  : data === "cake/live_test"
                  ? bnbdatatest
                  : result
              }
              className=" bg-blue-400 p-2 text-white rounded-md font-bold"
            >
              Download me
            </CSVLink>
            <button
              className="bg-green-500 p-2 px-6  text-white rounded-md font-bold"
              onClick={() => {
                handleClick();
                setRate({
                  win1: 0,
                  count1: 0,
                  win2: 0,
                  count2: 0,
                  win3: 0,
                  count3: 0,
                  win4: 0,
                  count4: 0,
                  win_cake: 0,
                  count_cake: 0,
                });
              }}
            >
              Refresh
            </button>

            <img
              src={`${data === "cake" ? pancake : bnb}`}
              alt="coin"
              className="w-10"
            />

            <select
              className="font-bold bg-white dark:bg-white dark:text-black"
              onChange={(e) => setData(e.target.value)}
              value={data}
            >
              <option value="pancake">BNB</option>
              <option value="cake">CAKE</option>
              <option value="bnb/live">BNB/Live</option>
              <option value="bnb/live_test">TEST - BNB</option>
              <option value="cake/live_test">TEST - CAKE</option>
            </select>
            <div className="dark:text-black text-center font-bold text-sm  p-2">
              PRED1: {rate.win1} / {rate.count1} ~{" "}
              {(rate.win1 / rate.count1).toFixed(3)}
            </div>
            <div className="dark:text-black text-center font-bold text-sm  p-2">
              X3: {rate.win2} / {rate.count2} ~{" "}
              {(rate.win2 / rate.count2).toFixed(3)}
            </div>
            <div className="dark:text-black text-center font-bold text-sm  p-2">
              X4: {rate.win3} / {rate.count3} ~{" "}
              {(rate.win3 / rate.count3).toFixed(3)}
            </div>

            <div className="dark:text-black text-center font-bold text-sm  p-2">
              Greater than 2: {rate.win4} / {rate.count4} ~{" "}
              {(rate.win4 / rate.count4).toFixed(3)}
            </div>

            <div className="dark:text-black text-center font-bold text-sm  p-2">
              CAKE: {rate.win_cake} / {rate.count_cake} ~{" "}
              {(rate.win_cake / rate.count_cake).toFixed(3)}
            </div>
          </div>
          {data === "bnb/live" ? (
            <TableLive result={result} isLoading={isLoading} />
          ) : data === "bnb/live_test" || data === "cake/live_test" ? (
            <TableTest result={result} isLoading={isLoading} />
          ) : (
            <TableOrg result={result} isLoading={isLoading} />
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
