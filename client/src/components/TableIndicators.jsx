import React, { useState, useEffect } from "react";
import moment from "moment";
const TableIndicators = ({
  result,
  isLoading,
  minAcurracy,
  setMinAcurracy,
}) => {
  const [hover, setHover] = useState("");
  //   const [minAcurracy, setMinAcurracy] = useState(50);

  return (
    <div>
      <div className="w-full overflow-x-scroll ">
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

        <table className="w-full  h-[50%] overflow-y-scroll">
          <thead className="">
            <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
              <th className="border border-x-1 px-2 " colSpan={2}></th>
              <th className="border border-x-1 px-2 " colSpan={4}>
                RESULT
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableIndicators;
