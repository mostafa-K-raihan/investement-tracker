import express from "express";
import fs from "fs";

const app = express();

function calcAmount(arr) {
  return arr.reduce((acc, d) => {
    acc += parseInt(d.amount);
    return acc;
  }, 0);
}

app.get("/", (req, res) => {
  fs.readFile("./transaction-database.json", (err, data) => {
    err && console.log(err);
    const { data: transaction } = JSON.parse(data);
    const investments = transaction.filter((d) => d.type === "INVESTMENT");
    const profits = transaction.filter((d) => d.type === "PROFIT RETURN");

    const totalInvestment = calcAmount(investments);

    const totalProfit = calcAmount(profits);

    const individualProfits = profits.reduce((acc, p) => {
      const amount = parseInt(p.amount);
      acc[p.from] = !acc[p.from] ? amount : acc[p.from] + amount;
      return acc;
    }, {});

    const individualInvestments = investments.reduce((acc, i) => {
      const amount = parseInt(i.amount);
      acc[i.to] = !acc[i.to] ? amount : acc[i.to] + amount;
      return acc;
    }, {});

    res.send({
      totalInvestment,
      totalProfit,
      individualProfits,
      individualInvestments,
    });
  });
  // res.send('Hello from investment tracker app');

  //
});

app.listen(3768, () => {
  console.log("Hey mate on port 3768");
});
