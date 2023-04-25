import { useState, useEffect } from "react";
import axios from "axios";
import config from "./data.js";
import { CSVLink, CSVDownload } from "react-csv";
import loading from "./assets/loading.svg";

function App() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    axios
      .get("https://thewordartisan.online/api/v1/pancake")
      .then(function (response) {
        console.log(response.data);
        setResult(response.data.result.reverse());
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="w-full h-full dark:bg-white">
      {isLoading ? (
        <div className="w-screen  flex justify-center dark:bg-white">
          <div>
            <img src={loading} alt="loading" className="w-28 bg-blue-400"></img>
            <p>Pancake loading...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-start my-2 gap-4">
            <CSVLink
              data={result}
              className=" bg-blue-400 p-2 text-white rounded-md "
            >
              Download me
            </CSVLink>
            <button
              className="bg-green-500 p-2 px-6  text-white rounded-md"
              onClick={() => handleClick()}
            >
              Refresh
            </button>
          </div>

          <table className="">
            <thead className="">
              <tr className="w-full gap-4  sticky top-0 bg-black dark:bg-black  dark:text-white text-white ">
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
            <tbody>
              {result.map((r, i) => (
                <tr
                  className={`${
                    i % 2 == 0
                      ? "bg-gray-200 dark:bg-gray-200"
                      : "dark:bg-white"
                  }   dark:text-black  `}
                  key={i}
                >
                  <td className="text-center border border-r-1">{r.epoch}</td>

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
        </>
      )}
    </div>
  );
}

export default App;
