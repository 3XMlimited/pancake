import React, { useState, useEffect } from "react";

import axios from "axios";
import TableIndicators from "../components/TableIndicators";
import loading from "../assets/loading.svg";
const TV = () => {
  const bnb = "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [minAcurracy, setMinAcurracy] = useState(50);
  const [hover, setHover] = useState("");
  const [results, setResults] = useState({
    RECOMMEND_1m: 0,
    SIGNAL_1m: 0,
    RECOMMEND_5m: 0,
    SIGNAL_5m: 0,
    RECOMMEND_15m: 0,
    SIGNAL_15m: 0,
    RECOMMEND_avg_1_5: 0,
    SIGNAL_avg_1_5: 0,
    RECOMMEND_avg_1_5_15: 0,
    SIGNAL_avg_1_5_15: 0,
    STRONG_1: 0,
    STRONG_5: 0,
    STRONG_15: 0,
  });
  const [count, setCount] = useState({
    RECOMMEND_1m: 0,
    SIGNAL_1m: 0,
    RECOMMEND_5m: 0,
    SIGNAL_5m: 0,
    RECOMMEND_15m: 0,
    SIGNAL_15m: 0,
    RECOMMEND_avg_1_5: 0,
    SIGNAL_avg_1_5: 0,
    RECOMMEND_avg_1_5_15: 0,
    SIGNAL_avg_1_5_15: 0,
    STRONG_1: 0,
    STRONG_5: 0,
    STRONG_15: 0,
  });

  useEffect(() => {
    if (data.length > 0) {
      setResults({
        RECOMMEND_1m: 0,
        SIGNAL_1m: 0,
        RECOMMEND_5m: 0,
        SIGNAL_5m: 0,
        RECOMMEND_15m: 0,
        SIGNAL_15m: 0,
        RECOMMEND_avg_1_5: 0,
        SIGNAL_avg_1_5: 0,
        RECOMMEND_avg_1_5_15: 0,
        SIGNAL_avg_1_5_15: 0,
        STRONG_1: 0,
        STRONG_5: 0,
        STRONG_15: 0,
        STRONG_5_AVG_1_5: 0,
      });
      setCount({
        RECOMMEND_1m: 0,
        SIGNAL_1m: 0,
        RECOMMEND_5m: 0,
        SIGNAL_5m: 0,
        RECOMMEND_15m: 0,
        SIGNAL_15m: 0,
        RECOMMEND_avg_1_5: 0,
        SIGNAL_avg_1_5: 0,
        RECOMMEND_avg_1_5_15: 0,
        SIGNAL_avg_1_5_15: 0,
        STRONG_1: 0,
        STRONG_5: 0,
        STRONG_15: 0,
        STRONG_5_AVG_1_5: 0,
      });

      let res = data;
      for (let index = 0; index < res.length; index++) {
        for (let i = 0; i < res[index].data.length; i++) {
          res[index].data[i].signal =
            res[index].data[i].BUY > res[index].data[i].SELL
              ? (res[index].data[i].BUY /
                  (res[index].data[i].BUY + res[index].data[i].SELL)) *
                100
              : (res[index].data[i].SELL /
                  (res[index].data[i].BUY + res[index].data[i].SELL)) *
                100;
          res[index].data[i].alert =
            res[index].data[i].BUY > res[index].data[i].SELL &&
            res[index].data[i].signal > minAcurracy
              ? "UP"
              : res[index].data[i].SELL > res[index].data[i].BUY &&
                res[index].data[i].signal > minAcurracy
              ? "DOWN"
              : "/";
          res[index].STRONG_5_AVG_1_5 =
            res[index].data[1].RECOMMENDATION === "STRONG_BUY" &&
            res[index].data[i].alert === "UP"
              ? "UP"
              : res[index].data[1].RECOMMENDATION === "STRONG_SELL" &&
                res[index].data[i].alert === "DOWN"
              ? "DOWN"
              : "/";
        }
      }
      setData(res);

      for (let i = 2; i < data.length; i++) {
        // 1m
        if (
          data[i].data[0]["RECOMMENDATION"] !== "NEUTRAL"
          // data[i].data[0]["RECOMMENDATION"] !== "STRONG_BUY" &&
          // data[i].data[0]["RECOMMENDATION"] !== "STRONG_SELL"
        ) {
          if (
            (data[i].result === "UP" &&
              data[i].data[0]["RECOMMENDATION"].includes("BUY")) ||
            (data[i].result === "DOWN" &&
              data[i].data[0]["RECOMMENDATION"].includes("SELL"))
          ) {
            setResults((prev) => ({
              ...prev,
              RECOMMEND_1m: prev.RECOMMEND_1m + 1,
            }));
          }

          setCount((prev) => ({
            ...prev,
            RECOMMEND_1m: prev.RECOMMEND_1m + 1,
          }));
        }

        if (data[i].data[0].alert !== "/") {
          if (data[i].result === data[i].data[0].alert) {
            setResults((prev) => ({
              ...prev,
              SIGNAL_1m: prev.SIGNAL_1m + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            SIGNAL_1m: prev.SIGNAL_1m + 1,
          }));
        }

        // 5m
        if (data[i].data[1]["RECOMMENDATION"] !== "NEUTRAL") {
          if (
            (data[i].result === "UP" &&
              data[i].data[1]["RECOMMENDATION"].includes("BUY")) ||
            (data[i].result === "DOWN" &&
              data[i].data[1]["RECOMMENDATION"].includes("SELL"))
          ) {
            setResults((prev) => ({
              ...prev,
              RECOMMEND_5m: prev.RECOMMEND_5m + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            RECOMMEND_5m: prev.RECOMMEND_5m + 1,
          }));
        }
        if (data[i].data[1].alert !== "/") {
          if (data[i].result === data[i].data[1].alert) {
            setResults((prev) => ({
              ...prev,
              SIGNAL_5m: prev.SIGNAL_5m + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            SIGNAL_5m: prev.SIGNAL_5m + 1,
          }));
        }

        // 15 m
        if (data[i].data[2]["RECOMMENDATION"] !== "NEUTRAL") {
          if (
            (data[i].result === "UP" &&
              data[i].data[3]["RECOMMENDATION"].includes("BUY")) ||
            (data[i].result === "DOWN" &&
              data[i].data[3]["RECOMMENDATION"].includes("SELL"))
          ) {
            setResults((prev) => ({
              ...prev,
              RECOMMEND_15m: prev.RECOMMEND_15m + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            RECOMMEND_15m: prev.RECOMMEND_15m + 1,
          }));
        }
        if (data[i].data[2].alert !== "/") {
          if (data[i].data[2].alert !== "") {
            if (data[i].result === data[i].data[2].alert) {
              setResults((prev) => ({
                ...prev,
                SIGNAL_15m: prev.SIGNAL_15m + 1,
              }));
            }
            setCount((prev) => ({
              ...prev,
              SIGNAL_15m: prev.SIGNAL_15m + 1,
            }));
          }
        }

        //   avg_1_5
        if (
          data[i].data[3]["RECOMMENDATION"] !== "NEUTRAL" &&
          data[i].data[3]["RECOMMENDATION"] !== "STRONG_BUY" &&
          data[i].data[3]["RECOMMENDATION"] !== "STRONG_SELL"
        ) {
          if (
            (data[i].result === "UP" &&
              data[i].data[3]["RECOMMENDATION"] === "BUY") ||
            (data[i].result === "DOWN" &&
              data[i].data[3]["RECOMMENDATION"] === "SELL")
          ) {
            setResults((prev) => ({
              ...prev,
              RECOMMEND_avg_1_5: prev.RECOMMEND_avg_1_5 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            RECOMMEND_avg_1_5: prev.RECOMMEND_avg_1_5 + 1,
          }));
        }

        if (data[i].data[3].alert !== "/") {
          if (data[i].result === data[i].data[3].alert) {
            setResults((prev) => ({
              ...prev,
              SIGNAL_avg_1_5: prev.SIGNAL_avg_1_5 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            SIGNAL_avg_1_5: prev.SIGNAL_avg_1_5 + 1,
          }));
        }

        //   avg_1_5_15
        if (
          data[i].data[4]["RECOMMENDATION"] !== "NEUTRAL" &&
          data[i].data[4]["RECOMMENDATION"] !== "STRONG_BUY" &&
          data[i].data[4]["RECOMMENDATION"] !== "STRONG_SELL"
        ) {
          if (
            (data[i].result === "UP" &&
              data[i].data[4]["RECOMMENDATION"] === "BUY") ||
            (data[i].result === "DOWN" &&
              data[i].data[4]["RECOMMENDATION"] === "SELL")
          ) {
            setResults((prev) => ({
              ...prev,
              RECOMMEND_avg_1_5_15: prev.RECOMMEND_avg_1_5_15 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            RECOMMEND_avg_1_5_15: prev.RECOMMEND_avg_1_5_15 + 1,
          }));
        }

        if (data[i].data[4].alert !== "/") {
          if (data[i].result === data[i].data[4].alert) {
            setResults((prev) => ({
              ...prev,
              SIGNAL_avg_1_5_15: prev.SIGNAL_avg_1_5_15 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            SIGNAL_avg_1_5_15: prev.SIGNAL_avg_1_5_15 + 1,
          }));
        }

        if (
          data[i].data[0]["RECOMMENDATION"] === "STRONG_BUY" ||
          data[i].data[0]["RECOMMENDATION"] === "STRONG_SELL"
        ) {
          if (
            (data[i].result === "UP" &&
              data[i].data[0]["RECOMMENDATION"] === "STRONG_BUY") ||
            (data[i].result === "DOWN" &&
              data[i].data[0]["RECOMMENDATION"] === "STRONG_SELL")
          ) {
            setResults((prev) => ({
              ...prev,
              STRONG_1: prev.STRONG_1 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            STRONG_1: prev.STRONG_1 + 1,
          }));
        }

        if (
          data[i].data[1]["RECOMMENDATION"] === "STRONG_BUY" ||
          data[i].data[1]["RECOMMENDATION"] === "STRONG_SELL"
        ) {
          if (
            (data[i].result === "UP" &&
              data[i].data[1]["RECOMMENDATION"] === "STRONG_BUY") ||
            (data[i].result === "DOWN" &&
              data[i].data[1]["RECOMMENDATION"] === "STRONG_SELL")
          ) {
            setResults((prev) => ({
              ...prev,
              STRONG_5: prev.STRONG_5 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            STRONG_5: prev.STRONG_5 + 1,
          }));
        }

        if (
          data[i].data[2]["RECOMMENDATION"] === "STRONG_BUY" ||
          data[i].data[2]["RECOMMENDATION"] === "STRONG_SELL"
        ) {
          if (
            (data[i].result === "UP" &&
              data[i].data[2]["RECOMMENDATION"] === "STRONG_BUY") ||
            (data[i].result === "DOWN" &&
              data[i].data[2]["RECOMMENDATION"] === "STRONG_SELL")
          ) {
            setResults((prev) => ({
              ...prev,
              STRONG_15: prev.STRONG_15 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            STRONG_15: prev.STRONG_15 + 1,
          }));
        }

        if (data[i].STRONG_5_AVG_1_5 !== "/") {
          if (data[i].STRONG_5_AVG_1_5 === data[i].result) {
            setResults((prev) => ({
              ...prev,
              STRONG_5_AVG_1_5: prev.STRONG_5_AVG_1_5 + 1,
            }));
          }
          setCount((prev) => ({
            ...prev,
            STRONG_5_AVG_1_5: prev.STRONG_5_AVG_1_5 + 1,
          }));
        }
      }

      setIsLoading(false);
      console.log("win", results);
      console.log("count", count);
      console.log(data.length);
    }
  }, [minAcurracy, data]);

  const handleData = () => {
    setIsLoading(true);
    axios
      .get(
        "https://thewordartisan.online/api/v1/pancake?dbname=trading_view_pred"
      )
      .then((response) => {
        console.log(response.data);
        let res = response.data.result;

        setData(res.reverse());
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    //   .finally(() => {

    //   });
  };

  useEffect(() => {
    setResults({
      RECOMMEND_1m: 0,
      SIGNAL_1m: 0,
      RECOMMEND_5m: 0,
      SIGNAL_5m: 0,
      RECOMMEND_15m: 0,
      SIGNAL_15m: 0,
      RECOMMEND_avg_1_5: 0,
      SIGNAL_avg_1_5: 0,
      RECOMMEND_avg_1_5_15: 0,
      SIGNAL_avg_1_5_15: 0,
      STRONG_1: 0,
      STRONG_5: 0,
      STRONG_15: 0,
      STRONG_5_AVG_1_5: 0,
    });

    setCount({
      RECOMMEND_1m: 0,
      SIGNAL_1m: 0,
      RECOMMEND_5m: 0,
      SIGNAL_5m: 0,
      RECOMMEND_15m: 0,
      SIGNAL_15m: 0,
      RECOMMEND_avg_1_5: 0,
      SIGNAL_avg_1_5: 0,
      RECOMMEND_avg_1_5_15: 0,
      SIGNAL_avg_1_5_15: 0,
      STRONG_1: 0,
      STRONG_5: 0,
      STRONG_15: 0,
      STRONG_5_AVG_1_5: 0,
    });

    handleData();
  }, []);

  return (
    <div>
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
        <>
          <table className="w-screen">
            <thead className="">
              <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
                {/* <th className="border border-x-1 px-2 ">dateTime</th> */}
                <th className="border border-x-1 px-2 "></th>
                <th className="border border-x-1 px-2 ">WIN</th>

                <th className="border border-x-1 px-2 "> COUNT </th>
                <th className="border border-x-1 px-2 "> %WIN </th>
              </tr>
            </thead>
            <tbody className="w-full">
              <tr
                className={`${"bg-gray-200 dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  REC_1m
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["RECOMMEND_1m"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["RECOMMEND_1m"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["RECOMMEND_1m"] / count["RECOMMEND_1m"]) * 100}
                </td>
              </tr>

              <tr className={`${" dark:bg-white"}  dark:text-black  w-full `}>
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  SIGNAL_1m
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["SIGNAL_1m"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["SIGNAL_1m"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["SIGNAL_1m"] / count["SIGNAL_1m"]) * 100}
                </td>
              </tr>

              <tr
                className={`${"bg-gray-200 dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  REC_5m
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["RECOMMEND_5m"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["RECOMMEND_5m"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["RECOMMEND_5m"] / count["RECOMMEND_5m"]) * 100}
                </td>
              </tr>

              <tr className={`${"0 dark:bg-white"}  dark:text-black  w-full `}>
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  SIGNAL_5m
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["SIGNAL_5m"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["SIGNAL_5m"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["SIGNAL_5m"] / count["SIGNAL_5m"]) * 100}
                </td>
              </tr>

              <tr
                className={`${"bg-gray-200  dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  REC_15m
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["RECOMMEND_15m"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["RECOMMEND_15m"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["RECOMMEND_15m"] / count["RECOMMEND_15m"]) * 100}
                </td>
              </tr>

              <tr className={`${" dark:bg-white"}  dark:text-black  w-full `}>
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  SIGNAL_15m
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["SIGNAL_15m"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["SIGNAL_15m"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["SIGNAL_15m"] / count["SIGNAL_15m"]) * 100}
                </td>
              </tr>

              <tr
                className={`${"bg-gray-200 dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  REC_avg_1_5
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["RECOMMEND_avg_1_5"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["RECOMMEND_avg_1_5"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["RECOMMEND_avg_1_5"] / count["RECOMMEND_avg_1_5"]) *
                    100}
                </td>
              </tr>

              <tr className={`${" dark:bg-white"}  dark:text-black  w-full `}>
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  SIGNAL_avg_1_5
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["SIGNAL_avg_1_5"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["SIGNAL_avg_1_5"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["SIGNAL_avg_1_5"] / count["SIGNAL_avg_1_5"]) * 100}
                </td>
              </tr>

              <tr
                className={`${"bg-gray-200 dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  REC_avg_1_5_15
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["RECOMMEND_avg_1_5_15"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["RECOMMEND_avg_1_5_15"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["RECOMMEND_avg_1_5_15"] /
                    count["RECOMMEND_avg_1_5_15"]) *
                    100}
                </td>
              </tr>

              <tr className={`${" dark:bg-white"}  dark:text-black  w-full `}>
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  SIGNAL_avg_1_5_15
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["SIGNAL_avg_1_5_15"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["SIGNAL_avg_1_5_15"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["SIGNAL_avg_1_5_15"] / count["SIGNAL_avg_1_5_15"]) *
                    100}
                </td>
              </tr>

              <tr
                className={`${"bg-gray-200 dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  STRONG_1
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["STRONG_1"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["STRONG_1"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["STRONG_1"] / count["STRONG_1"]) * 100}
                </td>
              </tr>

              <tr className={`${" dark:bg-white"}  dark:text-black  w-full `}>
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  STRONG_5
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["STRONG_5"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["STRONG_5"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["STRONG_5"] / count["STRONG_5"]) * 100}
                </td>
              </tr>

              <tr
                className={`${"bg-gray-200 dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  STRONG_15
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["STRONG_15"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["STRONG_15"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["STRONG_15"] / count["STRONG_15"]) * 100}
                </td>
              </tr>

              <tr
                className={`${"bg-gray-200 dark:bg-white"}  dark:text-black  w-full `}
              >
                <td className="text-center border border-r-1 text-yellow-900  font-mono">
                  STRONG_5 with AVG_1_5
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {results["STRONG_5_AVG_1_5"]}
                </td>
                <td className="text-center border border-r-1   font-mono">
                  {count["STRONG_5_AVG_1_5"]}
                </td>
                <td className="text-center border border-r-1  font-mono">
                  {(results["STRONG_5_AVG_1_5"] / count["STRONG_5_AVG_1_5"]) *
                    100}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="w-screen relative bg-white">
            <div className="w-full flex justify-start p-2 gap-4 ">
              <img src={bnb} alt="coin" className="w-10" />
              <button
                className="bg-green-500 p-2 px-6  text-white rounded-md font-bold"
                onClick={() => {
                  handleData();
                }}
              >
                Refresh
              </button>
            </div>
          </div>

          <TableIndicators
            result={data}
            isLoading={isLoading}
            minAcurracy={minAcurracy}
            setMinAcurracy={setMinAcurracy}
          />
        </>
      )}
    </div>
  );
};

export default TV;
