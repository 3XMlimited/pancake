import React from "react";

const TableOrg = ({ result, isLoading }) => {
  return (
    <div className="w-full overflow-x-scroll px-2">
      <table className="w-full">
        <thead className="">
          <tr className="w-full gap-4 sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
            <th className="border border-x-1 px-2 ">epoch</th>
            <th className="border border-x-1 px-2 ">bull_ratio_1</th>
            <th className="border border-x-1 px-2 ">bull_ratio_0</th>
            <th className="border border-x-1 px-2 ">bull_ratio_2</th>
            <th className="border border-x-1 px-2 ">bull_amount_0</th>
            <th className="border border-x-1 px-2 ">bull_amt_change_2</th>
            <th className="border border-x-1 px-2 ">bull_amount_2</th>
            <th className="border border-x-1 px-2 ">bull_amt_change_1</th>
            <th className="border border-x-1 px-2 ">lock_price_change_1</th>
            <th className="border border-x-1 px-2 ">bull_amount_1</th>
            <th className="border border-x-1 px-2 ">bull_amt_change_0</th>
            <th className="border border-x-1 px-2 ">lock_price_change_2</th>
            <th className="border border-x-1 px-2 ">bull_ratio_change_0</th>
            <th className="border border-x-1 px-2 ">total_amount_2</th>
            <th className="border border-x-1 px-2 ">bull_ratio_change_2</th>
            <th className="border border-x-1 px-2 ">total_amount_0</th>
            <th className="border border-x-1 px-2 ">bull_ratio_change_1</th>
            <th className="border border-x-1 px-2 ">total_amount_1</th>
          </tr>
        </thead>
        <tbody className="">
          {result.map((r, i) => (
            <tr
              className={`${
                i % 2 == 0 ? "bg-gray-200 dark:bg-gray-200" : "dark:bg-white"
              }   dark:text-black  `}
              key={i}
            >
              <td className="text-center border border-r-1 ">{r.epoch}</td>

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
  );
};

export default TableOrg;
