import React, { useState } from "react";
import moment from "moment";
const TableTest = ({ result, isLoading }) => {
  const [hover, setHover] = useState("");

  console.log("result", result);
  return (
    <>
      <div className="w-full overflow-x-scroll ">
        <table className="w-full  h-[50%] overflow-y-scroll">
          <thead className="">
            <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
              <th className="border border-x-1 px-2 "></th>
              <th className="border border-x-1 px-2 " colSpan={5}>
                RESULT
              </th>
              <th className="border border-x-1 px-2 " colSpan={2}>
                LIVE
              </th>

              {/* <th className="border border-x-1 px-2 " colSpan={2}>
                Live
              </th> */}

              <th className="border border-x-1 px-2 " colSpan={3}>
                FIXED
              </th>
            </tr>
          </thead>
          <thead className="">
            <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
              {/* <th className="border border-x-1 px-2 ">dateTime</th> */}
              <th className="border border-x-1 px-2 ">epoch</th>
              <th className="border border-x-1 px-2 ">FINAL</th>
              <th className="border border-x-1 px-2 ">PRED </th>
              <th className="border border-x-1 px-2 ">PRED 3X </th>
              <th className="border border-x-1 px-2 ">PRED 4X </th>
              <th className="border border-x-1 px-2 ">PRED 3X - ODDS</th>

              <th className="border border-x-1 px-2 ">Up payout</th>
              <th className="border border-x-1 px-2 ">Down payout</th>

              {/* <th className="border border-x-1 px-2 "> Prev Result</th>
              <th className="border border-x-1 px-2 ">Prev %Change</th> */}

              {/* <th className="border border-x-1 px-2 ">epoch</th> */}
              {/* <th className="border border-x-1 px-2 ">Last Price </th>
              <th className="border border-x-1 px-2 ">Lock Price </th> */}
              {/* <th className="border border-x-1 px-2 ">% Price Change </th> */}
              {/* <th className="border border-x-1 px-2 ">Up payout</th>
              <th className="border border-x-1 px-2 ">Down payout</th> */}

              {/* <th className="border border-x-1 px-2 ">epoch</th> */}
              {/* <th className="border border-x-1 px-2 ">Close Price </th>
              <th className="border border-x-1 px-2 ">Lock Price </th> */}
              <th className="border border-x-1 px-2 ">Up payout</th>
              <th className="border border-x-1 px-2 ">Down payout </th>
              {/* <th className="border border-x-1 px-2 ">Result</th> */}
              <th className="border border-x-1 px-2 ">%Change</th>
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

                {/* <td className="text-center border border-r-1  w-[150px]">
                  <p className="w-[150px]">
                    {moment(r.dateTime).format("YYYY-MM-DD HH:mm")}
                  </p>
                </td> */}

                {result[index - 2]?.data ? (
                  <td className="text-center border border-r-1  ">
                    <p>
                      {result[index - 2].data[2].close_price <
                      result[index - 2].data[2].lock_price
                        ? "DOWN"
                        : result[index - 2].data[2].close_price >
                          result[index - 2].data[2].lock_price
                        ? "UP"
                        : ""}
                    </p>
                  </td>
                ) : (
                  <td></td>
                )}

                {r?.data?.[0] && isLoading === false && (
                  <td className="text-center border border-r-1  ">
                    <p
                      className={`${
                        r.data[0].down_payout < 1.4 &&
                        r.data[2].close_price < r.data[2].lock_price
                          ? "text-[#31d0aa]"
                          : r.data[0].up_payout < 1.4 &&
                            r.data[2].close_price > r.data[2].lock_price
                          ? "text-[#ed4b93]"
                          : ""
                      }`}
                    >
                      {r.data[0].down_payout < 1.4 &&
                      r.data[2].close_price < r.data[2].lock_price
                        ? "UP"
                        : r?.data[0].up_payout < 1.4 &&
                          r?.data[2].close_price > r.data[2].lock_price
                        ? "DOWN"
                        : ""}
                    </p>
                  </td>
                )}
                <td className="text-center border border-r-1  ">
                  <p>{r.pred2}</p>
                </td>
                <td className="text-center border border-r-1  ">
                  <p>{r.pred3}</p>
                </td>
                <td className="text-center border border-r-1  ">
                  <p>{r.pred4}</p>
                </td>

                {r.data?.map((s, i) =>
                  i === 1 ? (
                    <>
                      {/* <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                        {result[index - 1]?.data[1].epoch}
                      </td> */}

                      {/* <td className="text-center border border-r-1 ">
                        {s.close_price}
                      </td>
                      <td className="text-center border border-r-1 ">
                        {s.lock_price}
                      </td> */}
                      {/* <td
                        className={`text-center border border-r-1 ${
                          ((s.close_price - s.lock_price) / s.lock_price) *
                            100 >
                          0
                            ? "text-[#31d0aa]"
                            : "text-[#ed4b93]"
                        }`}
                      >
                        {(
                          ((s.close_price - s.lock_price) / s.lock_price) *
                          100
                        ).toFixed(4)}
                      </td> */}

                      <td className="text-center border border-r-1 bg-[#31d0aa] text-white  font-mono">
                        {result[index - 1]?.data[1].up_payout.toFixed(2)}
                      </td>
                      <td className="text-center border border-r-1 bg-[#ed4b93] text-white font-mono">
                        {result[index - 1]?.data[1].down_payout.toFixed(2)}
                      </td>
                    </>
                  ) : i === 2 ? (
                    <>
                      {/* <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                        {result[index - 2]?.data[2].epoch}
                      </td> */}

                      {/* <td className="text-center border border-r-1 ">
                        {s.close_price}
                      </td>
                      <td className="text-center border border-r-1 ">
                        {s.lock_price}
                      </td> */}
                      <td
                        className={`text-center border border-r-1 ${
                          ((result[index - 2]?.data[2].close_price -
                            result[index - 2]?.data[2].lock_price) /
                            result[index - 2]?.data[2].lock_price) *
                            100 >
                          0
                            ? "text-[#31d0aa]"
                            : "text-[#ed4b93]"
                        }`}
                      >
                        {(
                          ((result[index - 2]?.data[2].close_price -
                            result[index - 2]?.data[2].lock_price) /
                            result[index - 2]?.data[2].lock_price) *
                          100
                        ).toFixed(4)}
                      </td>

                      {/* <td className="text-center border border-r-1 bg-[#31d0aa] text-white  font-mono">
                        {result[index - 2]?.data[2].up_payout}
                      </td>
                      <td className="text-center border border-r-1 bg-[#ed4b93] text-white font-mono">
                        {result[index - 2]?.data[2].down_payout}
                      </td> */}
                    </>
                  ) : (
                    i == 0 && (
                      <>
                        {/* <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                          {s.epoch}
                        </td> */}
                        {/* {i !== 0 && (
                          <>
                            <td className="text-center border border-r-1 ">
                              {s.close_price}
                            </td>
                            <td className="text-center border border-r-1 ">
                              {s.lock_price}
                            </td>
                          </>
                        )} */}

                        <td className="text-center border border-r-1 bg-[#31d0aa] text-white  font-mono">
                          {s.up_payout.toFixed(2)}
                        </td>
                        <td className="text-center border border-r-1 bg-[#ed4b93] text-white font-mono">
                          {s.down_payout.toFixed(2)}
                        </td>
                        {/* <td
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
                            ((-s.lock_price + s.close_price) / s.lock_price) *
                              100 >
                            0
                              ? "text-[#31d0aa]"
                              : "text-[#ed4b93]"
                          }  ${i < 2 && "hidden"} text-center `}
                        >
                          {(
                            ((-s.lock_price + s.close_price) / s.lock_price) *
                            100
                          ).toFixed(4)}
                        </td> */}
                      </>
                    )
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableTest;

{
  /* <>
  <div className="w-full overflow-x-scroll ">
    <table className="w-full  h-[50%] overflow-y-scroll">
      <thead className="">
        <tr className="w-full gap-4 sticky top-0 bg-gray-700 dark:bg-gray-700  dark:text-white text-white  rounded-md font-mono">
          <th className="border border-x-1 px-2 "></th>
          <th className="border border-x-1 px-2 " colSpan={2}>
            RESULT
          </th>
          <th className="border border-x-1 px-2 " colSpan={8}>
            Next
          </th>

          <th className="border border-x-1 px-2 " colSpan={11}>
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
          <th className="border border-x-1 px-2 ">FINAL</th>
          <th className="border border-x-1 px-2 ">PRED </th>
          <th className="border border-x-1 px-2 ">epoch</th>
          <th className="border border-x-1 px-2 ">Up payout</th>
          <th className="border border-x-1 px-2 ">Down payout</th>
          <th className="border border-x-1 px-2 ">Close Price </th>
          <th className="border border-x-1 px-2 ">Lock Price </th>
          <th className="border border-x-1 px-2 ">Price Pool </th>
          <th className="border border-x-1 px-2 ">bull_amount</th>
          <th className="border border-x-1 px-2 ">bear_mount</th>

          <th className="border border-x-1 px-2 ">epoch</th>
          <th className="border border-x-1 px-2 "> Prev Result</th>
          <th className="border border-x-1 px-2 ">Prev %Change</th>
          <th className="border border-x-1 px-2 ">Up payout</th>
          <th className="border border-x-1 px-2 ">Down payout</th>
          <th className="border border-x-1 px-2 ">Last Price </th>
          <th className="border border-x-1 px-2 ">Lock Price </th>
          <th className="border border-x-1 px-2 ">% Price Change </th>
          <th className="border border-x-1 px-2 ">Price Pool </th>
          <th className="border border-x-1 px-2 ">bull_amount</th>
          <th className="border border-x-1 px-2 ">bear_mount</th>

          <th className="border border-x-1 px-2 ">epoch</th>
          <th className="border border-x-1 px-2 ">Result</th>
          <th className="border border-x-1 px-2 ">%Change</th>
          <th className="border border-x-1 px-2 ">Up payout</th>
          <th className="border border-x-1 px-2 ">Down payout </th>
          <th className="border border-x-1 px-2 ">Close Price </th>
          <th className="border border-x-1 px-2 ">Lock Price </th>
          <th className="border border-x-1 px-2 ">Price Pool </th>
          <th className="border border-x-1 px-2 ">bull_amount </th>
          <th className="border border-x-1 px-2 ">bear_mount </th>

          <th className="border border-x-1 px-2 ">epoch </th>
          <th className="border border-x-1 px-2 ">Result</th>
          <th className="border border-x-1 px-2 ">%Change</th>
          <th className="border border-x-1 px-2 ">Up payout </th>
          <th className="border border-x-1 px-2 ">Down payout </th>
          <th className="border border-x-1 px-2 ">Close Price </th>
          <th className="border border-x-1 px-2 ">Lock Price </th>
          <th className="border border-x-1 px-2 ">Price Pool </th>
          <th className="border border-x-1 px-2 ">bull_amount </th>
          <th className="border border-x-1 px-2 ">bear_mount </th>

          <th className="border border-x-1 px-2 ">epoch</th>
          <th className="border border-x-1 px-2 ">Result</th>
          <th className="border border-x-1 px-2 ">%Change</th>
          <th className="border border-x-1 px-2 ">Up payout </th>
          <th className="border border-x-1 px-2 ">Down payout </th>
          <th className="border border-x-1 px-2 ">Close Price </th>
          <th className="border border-x-1 px-2 ">Lock Price </th>
          <th className="border border-x-1 px-2 ">Price Pool </th>
          <th className="border border-x-1 px-2 ">bull_amount </th>
          <th className="border border-x-1 px-2 ">bear_mount </th>
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
            <td className="text-center border border-r-1  w-full">
              <p className="w-[200px]">
                {moment(r.dateTime).format("YYYY-MM-DD HH:mm")}
              </p>
            </td>

            {result[index - 2]?.data ? (
              <td className="text-center border border-r-1  w-full">
                <p>
                  {result[index - 2].data[2].close_price <
                  result[index - 2].data[2].lock_price
                    ? "DOWN"
                    : result[index - 2].data[2].close_price >
                      result[index - 2].data[2].lock_price
                    ? "UP"
                    : ""}
                </p>
              </td>
            ) : (
              <td></td>
            )}

            {r?.data?.[0] && isLoading === false && (
              <td className="text-center border border-r-1  w-full">
                <p
                  className={`${
                    r.data[0].down_payout < 1.4 &&
                    r.data[2].close_price < r.data[2].lock_price
                      ? "text-[#31d0aa]"
                      : r.data[0].up_payout < 1.4 &&
                        r.data[2].close_price > r.data[2].lock_price
                      ? "text-[#ed4b93]"
                      : ""
                  }`}
                >
                  {r.data[0].down_payout < 1.4 &&
                  r.data[2].close_price < r.data[2].lock_price
                    ? "UP"
                    : r?.data[0].up_payout < 1.4 &&
                      r?.data[2].close_price > r.data[2].lock_price
                    ? "DOWN"
                    : ""}
                </p>
              </td>
            )}

            {r.data?.map((s, i) =>
              i === 1 ? (
                <>
                  <td className="text-center border border-r-1 px-2 text-gray-400 font-bold ">
                    {s.epoch}
                  </td>
                  <td
                    className={`text-center border border-r-1  ${
                      i === 1
                        ? r.data[2].close_price > r.data[2].lock_price
                          ? "bg-[#31d0aa]"
                          : r.data[2].close_price === r.data[2].lock_price
                          ? "bg-gray-500"
                          : "bg-[#ed4b93]"
                        : s.close_price > s.lock_price
                        ? "bg-[#31d0aa]"
                        : s.close_price === s.lock_price
                        ? "bg-gray-500"
                        : "bg-[#ed4b93]"
                    } text-white font-mono  ${i < 1 && "hidden"} `}
                  >
                    {i === 1
                      ? r.data[2].close_price > r.data[2].lock_price
                        ? "UP"
                        : r.data[2].close_price === r.data[2].lock_price
                        ? "/"
                        : "DOWN"
                      : s.close_price > s.lock_price
                      ? "UP"
                      : s.close_price === s.lock_price
                      ? "/"
                      : "DOWN"}
                  </td>

                  <td
                    className={`${
                      i === 1
                        ? ((-r.data[2].lock_price + r.data[2].close_price) /
                            r.data[2].lock_price) *
                            100 >
                          0
                          ? "text-[#31d0aa]"
                          : "text-[#ed4b93]"
                        : ((-s.lock_price + s.close_price) / s.lock_price) *
                            100 >
                          0
                        ? "text-[#31d0aa]"
                        : "text-[#ed4b93]"
                    }  ${i < 1 && "hidden"} text-center `}
                  >
                    {i === 1
                      ? (
                          ((-r.data[2].lock_price + r.data[2].close_price) /
                            r.data[2].lock_price) *
                          100
                        ).toFixed(4)
                      : (
                          ((-r.data[2].lock_price + r.data[2].close_price) /
                            r.data[2].lock_price) *
                          100
                        ).toFixed(4)}
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
                  <td
                    className={`text-center border border-r-1 ${
                      ((s.close_price - s.lock_price) / s.lock_price) * 100 > 0
                        ? "text-[#31d0aa]"
                        : "text-[#ed4b93]"
                    }`}
                  >
                    {(
                      ((s.close_price - s.lock_price) / s.lock_price) *
                      100
                    ).toFixed(4)}
                  </td>

                  <td className="text-center border border-r-1 ">
                    {s.total_amount}
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
                      ((-s.lock_price + s.close_price) / s.lock_price) * 100 > 0
                        ? "text-[#31d0aa]"
                        : "text-[#ed4b93]"
                    }  ${i < 2 && "hidden"} text-center `}
                  >
                    {(
                      ((-s.lock_price + s.close_price) / s.lock_price) *
                      100
                    ).toFixed(4)}
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
  <div className="w-full overflow-x-scroll ">
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
              i % 2 == 0 ? "bg-gray-200 dark:bg-gray-200" : "dark:bg-white"
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
  </div>
</>; */
}
