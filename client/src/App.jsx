import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import loading from "./assets/loading.svg";
import moment from "moment";
function App() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("pancake");
  const [bnbdata, setBNBData] = useState([]);

  const pancake =
    "https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png";
  const bnb = "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png";
  const handleClick = () => {
    setIsLoading(true);
    axios
      .get(`https://thewordartisan.online/api/v1/pancake?dbname=${data}`)
      .then(function (response) {
        // console.log(response.data);
        setResult(
          response.data.result.sort(
            (a, b) => new Date(a.datetime) - new Date(b.dateTime)
          )
        );
        if (data === "bnb/live") {
          let blive = response.data.result.reverse().map((e) => e.data);
          let ress = [];
          console.log(response.data.result);
          blive.map((r, index) => {
            let res = {};
            r.map((g, i) => {
              res["dateTime"] = blive[index][0]["datetime"];
              res[`epoch${i}`] = g["epoch"];
              res[`bear amount ${i}`] = g["bear_amount"];
              res[`bull amount ${i}`] = g["bull_amount"];
              res[`close price ${i}`] = g["close_price"];
              res[`lock price ${i}`] = g["lock_price"];
              res[`price pool ${i}`] = g["total_amount"];
              res[`up payout ${i}`] =
                i === 1 ? r[2]["up_payout"] : g["up_payout"];
              res[`down payout ${i}`] =
                i === 1 ? r[2]["down_payout"] : g["down_payout"];
              res[`result ${i}`] =
                g.close_price > g.lock_price
                  ? "UP"
                  : g.close_price === g.lock_price
                  ? "/"
                  : "DOWN";
              res[`%change ${i}`] = (
                ((-g.lock_price + g.close_price) / g.lock_price) *
                100
              ).toFixed(4);
            });
            ress.push(res);
          });
          setBNBData(ress);
          console.log("ress", ress);
          //
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleClick();
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
              data={data === "bnb/live" ? bnbdata : result}
              className=" bg-blue-400 p-2 text-white rounded-md font-bold"
            >
              Download me
            </CSVLink>
            <button
              className="bg-green-500 p-2 px-6  text-white rounded-md font-bold"
              onClick={() => handleClick()}
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
            </select>
          </div>
          {data === "bnb/live" ? (
            <>
              <div className="w-full overflow-x-scroll ">
                <table className="w-full  h-[50%] overflow-y-scroll">
                  <thead className="">
                    <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
                      <th className="border border-x-1 px-2 "></th>
                      <th className="border border-x-1 px-2 " colSpan={8}>
                        Next
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={8}>
                        Live
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={10}>
                        Previous 1
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={10}>
                        Previous 2
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={10}>
                        Previous 3
                      </th>
                    </tr>
                  </thead>
                  <thead className="">
                    <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
                      <th className="border border-x-1 px-2 ">dateTime</th>
                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">Up payout</th>
                      <th className="border border-x-1 px-2 ">Down payout</th>
                      <th className="border border-x-1 px-2 ">Close Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 ">Price Pool </th>
                      {/* <th className="border border-x-1 px-2 ">Next Result</th> */}
                      <th className="border border-x-1 px-2 ">bull_amount</th>
                      <th className="border border-x-1 px-2 ">bear_mount</th>

                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">
                        Pre1 Up payout
                      </th>
                      <th className="border border-x-1 px-2 ">
                        Pre1 Down payout
                      </th>
                      <th className="border border-x-1 px-2 ">Last Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 ">Price Pool </th>
                      {/* <th className="border border-x-1 px-2 ">
                        Not Final Result
                      </th> */}

                      <th className="border border-x-1 px-2 ">bull_amount</th>
                      <th className="border border-x-1 px-2 ">bear_mount</th>

                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">Up payout</th>
                      <th className="border border-x-1 px-2 ">Down payout </th>
                      <th className="border border-x-1 px-2 ">Close Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 ">Price Pool </th>
                      <th className="border border-x-1 px-2 ">Result</th>
                      <th className="border border-x-1 px-2 ">%Change</th>
                      <th className="border border-x-1 px-2 ">bull_amount </th>
                      <th className="border border-x-1 px-2 ">bear_mount </th>

                      <th className="border border-x-1 px-2 ">epoch </th>
                      <th className="border border-x-1 px-2 ">Up payout </th>
                      <th className="border border-x-1 px-2 ">Down payout </th>
                      <th className="border border-x-1 px-2 ">Close Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 ">Price Pool </th>
                      <th className="border border-x-1 px-2 ">Result</th>
                      <th className="border border-x-1 px-2 ">%Change</th>
                      <th className="border border-x-1 px-2 ">bull_amount </th>
                      <th className="border border-x-1 px-2 ">bear_mount </th>

                      <th className="border border-x-1 px-2 ">Previous </th>
                      <th className="border border-x-1 px-2 ">Up payout </th>
                      <th className="border border-x-1 px-2 ">Down payout </th>
                      <th className="border border-x-1 px-2 ">Close Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 ">Price Pool </th>
                      <th className="border border-x-1 px-2 ">Result</th>
                      <th className="border border-x-1 px-2 ">%Change</th>
                      <th className="border border-x-1 px-2 ">bull_amount </th>
                      <th className="border border-x-1 px-2 ">bear_mount </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {result?.map((r, index) => (
                      <tr
                        className={`${
                          index % 2 == 0
                            ? "bg-gray-200 dark:bg-gray-200"
                            : "dark:bg-white"
                        }   dark:text-black  w-full `}
                        key={index}
                      >
                        <td className="text-center border border-r-1  w-full">
                          <p className="w-[200px]">
                            {moment(r.dateTime).format("YYYY-MM-DD HH:mm")}
                          </p>
                        </td>

                        {r.data?.map((s, i) =>
                          i === 1 ? (
                            <>
                              <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                                {s.epoch}
                              </td>

                              <td className="text-center border border-r-1 bg-[#31d0aa] text-white  font-mono">
                                {r.data[2].up_payout}
                              </td>
                              <td className="text-center border border-r-1 bg-[#ed4b93] text-white font-mono">
                                {r.data[2].down_payout}
                              </td>

                              <td className="text-center border border-r-1 ">
                                {s.close_price}
                              </td>
                              <td className="text-center border border-r-1 ">
                                {s.lock_price}
                              </td>
                              <td className="text-center border border-r-1 ">
                                {s.total_amount}
                              </td>

                              <td
                                className={`text-center border border-r-1  ${
                                  s.close_price > s.lock_price
                                    ? "bg-[#31d0aa]"
                                    : s.close_price === s.lock_price
                                    ? "bg-gray-500"
                                    : "bg-[#ed4b93]"
                                } text-white font-mono  ${i < 2 && "hidden"} `}
                              >
                                {s.close_price > s.lock_price
                                  ? "UP"
                                  : s.close_price === s.lock_price
                                  ? "/"
                                  : "DOWN"}
                              </td>

                              <td
                                className={`${
                                  ((-s.lock_price + s.close_price) /
                                    s.lock_price) *
                                    100 >
                                  0
                                    ? "text-[#31d0aa]"
                                    : "text-[#ed4b93]"
                                }  ${i < 2 && "hidden"} text-center `}
                              >
                                {(
                                  ((-s.lock_price + s.close_price) /
                                    s.lock_price) *
                                  100
                                ).toFixed(4)}
                              </td>

                              <td className="text-center border border-r-1 ">
                                {s.bull_amount}
                              </td>
                              <td className="text-center border border-r-1 ">
                                {s.bear_amount}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                                {s.epoch}
                              </td>

                              <td className="text-center border border-r-1 bg-[#31d0aa] text-white  font-mono">
                                {s.up_payout}
                              </td>
                              <td className="text-center border border-r-1 bg-[#ed4b93] text-white font-mono">
                                {s.down_payout}
                              </td>

                              <td className="text-center border border-r-1 ">
                                {s.close_price}
                              </td>
                              <td className="text-center border border-r-1 ">
                                {s.lock_price}
                              </td>
                              <td className="text-center border border-r-1 ">
                                {s.total_amount}
                              </td>

                              <td
                                className={`text-center border border-r-1  ${
                                  s.close_price > s.lock_price
                                    ? "bg-[#31d0aa]"
                                    : s.close_price === s.lock_price
                                    ? "bg-gray-500"
                                    : "bg-[#ed4b93]"
                                } text-white font-mono  ${i < 2 && "hidden"} `}
                              >
                                {s.close_price > s.lock_price
                                  ? "UP"
                                  : s.close_price === s.lock_price
                                  ? "/"
                                  : "DOWN"}
                              </td>

                              <td
                                className={`${
                                  ((-s.lock_price + s.close_price) /
                                    s.lock_price) *
                                    100 >
                                  0
                                    ? "text-[#31d0aa]"
                                    : "text-[#ed4b93]"
                                }  ${i < 2 && "hidden"} text-center `}
                              >
                                {(
                                  ((-s.lock_price + s.close_price) /
                                    s.lock_price) *
                                  100
                                ).toFixed(4)}
                              </td>

                              <td className="text-center border border-r-1 ">
                                {s.bull_amount}
                              </td>
                              <td className="text-center border border-r-1 ">
                                {s.bear_amount}
                              </td>
                            </>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="w-full overflow-x-scroll ">
                <table className="w-full mt-10 h-[50%] overflow-y-scroll">
                  <thead className="">
                    <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
                      <th className="border border-x-1 px-2 "></th>
                      <th className="border border-x-1 px-2 " colSpan={4}>
                        Next
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={4}>
                        Live
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={4}>
                        Previous 1
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={4}>
                        Previous 2
                      </th>

                      <th className="border border-x-1 px-2 " colSpan={6}>
                        Previous 3
                      </th>
                    </tr>
                  </thead>

                  <thead className="">
                    <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
                      <th className="border border-x-1 px-2 ">dateTime</th>
                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">Close Price</th>
                      <th className="border border-x-1 px-2 ">Lock Price</th>
                      <th className="border border-x-1 px-2 ">Price Pool</th>

                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">Close Price</th>
                      <th className="border border-x-1 px-2 ">Lock Price</th>
                      <th className="border border-x-1 px-2 "> Price Pool</th>

                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">Close Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 "> Price Pool </th>

                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">Close Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 "> Price Pool </th>

                      <th className="border border-x-1 px-2 ">epoch</th>
                      <th className="border border-x-1 px-2 ">Close Price </th>
                      <th className="border border-x-1 px-2 ">Lock Price </th>
                      <th className="border border-x-1 px-2 "> Price Pool </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {result?.map((r, i) => (
                      <tr
                        className={`${
                          i % 2 == 0
                            ? "bg-gray-200 dark:bg-gray-200"
                            : "dark:bg-white"
                        }   dark:text-black  w-full `}
                        key={i}
                      >
                        <td className="text-center border border-r-1  ">
                          <p className="w-[200px]">
                            {moment(r.dateTime).format("YYYY-MM-DD HH:mm")}
                          </p>
                        </td>

                        {r.data?.map((s) => (
                          <>
                            <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                              {s.epoch}
                            </td>

                            <td className="text-center border border-r-1 ">
                              {s.close_price}
                            </td>
                            <td className="text-center border border-r-1 ">
                              {s.lock_price}
                            </td>
                            <td className="text-center border border-r-1 ">
                              {s.total_amount}
                            </td>
                          </>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
            </>
          ) : (
            <div className="w-full overflow-x-scroll px-2">
              <table className="w-full">
                <thead className="">
                  <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
                    <th className="border border-x-1 px-2 ">epoch</th>
                    <th className="border border-x-1 px-2 ">bull_ratio_1</th>
                    <th className="border border-x-1 px-2 ">bull_ratio_0</th>
                    <th className="border border-x-1 px-2 ">bull_ratio_2</th>
                    <th className="border border-x-1 px-2 ">bull_amount_0</th>
                    <th className="border border-x-1 px-2 ">
                      bull_amt_change_2
                    </th>
                    <th className="border border-x-1 px-2 ">bull_amount_2</th>
                    <th className="border border-x-1 px-2 ">
                      bull_amt_change_1
                    </th>
                    <th className="border border-x-1 px-2 ">
                      lock_price_change_1
                    </th>
                    <th className="border border-x-1 px-2 ">bull_amount_1</th>
                    <th className="border border-x-1 px-2 ">
                      bull_amt_change_0
                    </th>
                    <th className="border border-x-1 px-2 ">
                      lock_price_change_2
                    </th>
                    <th className="border border-x-1 px-2 ">
                      bull_ratio_change_0
                    </th>
                    <th className="border border-x-1 px-2 ">total_amount_2</th>
                    <th className="border border-x-1 px-2 ">
                      bull_ratio_change_2
                    </th>
                    <th className="border border-x-1 px-2 ">total_amount_0</th>
                    <th className="border border-x-1 px-2 ">
                      bull_ratio_change_1
                    </th>
                    <th className="border border-x-1 px-2 ">total_amount_1</th>
                  </tr>
                </thead>
                <tbody className="">
                  {result.map((r, i) => (
                    <tr
                      className={`${
                        i % 2 == 0
                          ? "bg-gray-200 dark:bg-gray-200"
                          : "dark:bg-white"
                      }   dark:text-black  `}
                      key={i}
                    >
                      <td className="text-center border border-r-1 ">
                        {r.epoch}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.bull_ratio_1}
                      </td>
                      <td className="text-center border border-r-1">
                        {r.bull_ratio_0}
                      </td>
                      <td className="text-center border border-r-1">
                        {r.bull_ratio_2}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.bull_amount_0}
                      </td>
                      <td className="text-center border border-r-1">
                        {r.bull_amt_change_2}
                      </td>
                      <td className="text-center border border-r-1">
                        {r.bull_amount_2}
                      </td>
                      <td className="text-center border border-r-1">
                        {r.bull_amt_change_1}
                      </td>
                      <td className="text-center border border-r-1">
                        {r.lock_price_change_1}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.bull_amount_1}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.bull_amt_change_0}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.lock_price_change_2}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.bull_ratio_change_0}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.total_amount_2}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.bull_ratio_change_2}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.total_amount_0}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.bull_ratio_change_1}
                      </td>

                      <td className="text-center border border-r-1">
                        {r.total_amount_1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
