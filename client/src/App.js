import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    // async function getData() {
    //   const res = await (await fetch("/")).json();
    //   console.log({ res });
    //   return res;
    // }

    fetch("/backend")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(console.log);
  }, []);

  if (!data) {
    return <div>...Loading!</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Investment Tracker</h1>
        <section className="total">
          <h2>Invested: {data.totalInvestment} BDT</h2>
          <h2>Returned: {data.totalProfit} BDT</h2>
        </section>
      </header>
      <section className="individual">
        <div>
          <h2>Individual Profits/Invested</h2>
          {Object.entries(data.individualInvestments || {}).map(
            ([k, v], index) => (
              <p
                key={`_${index}`}
                className={
                  data.individualInvestments[k] <= data.individualProfits[k]
                    ? "break-even"
                    : "not-break-even"
                }
              >
                {k} -{" "}
                {!data.individualProfits[k] ? 0 : data.individualProfits[k]}/{v}{" "}
                ={" "}
                {!data.individualProfits[k]
                  ? 0
                  : ((data.individualProfits[k] / v) * 100).toFixed(2)}
                %
              </p>
            )
          )}
        </div>
        {/* <div>
          <h2>Individual Profits</h2>

          {Object.entries(data.individualProfits || {}).map(([k, v], index) => (
            <p
              key={`_${index}`}
              className={
                data.individualInvestments[k] <= data.individualProfits[k]
                  ? "break-even"
                  : "not-break-even"
              }
            >
              {k}: {v} BDT
            </p>
          ))}
        </div> */}
      </section>
    </div>
  );
}

export default App;
