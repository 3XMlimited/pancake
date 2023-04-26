import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import loading from "./assets/loading.svg";

function App() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("bnb");
  const pancake =
    "https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png";
  const bnb = "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png";
  const handleClick = () => {
    setIsLoading(true);
    axios
      .get(`https://thewordartisan.online/api/v1/pancake?dbname=${data}`)
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
  }, [data]);

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
              src={`${data === "bnb" ? bnb : pancake}`}
              alt="coin"
              className="w-10"
            />

            <select
              className="font-bold bg-white dark:bg-white dark:text-black"
              onChange={(e) => setData(e.target.value)}
              value={data}
            >
              <option value="bnb">BNB</option>
              <option value="cake">CAKE</option>
            </select>
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
