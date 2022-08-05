import express from "express";
import fs from "fs";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import importAllModels from "./models/index.js";
import createAllRoute from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(bodyParser.json());
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

(async function initMongo() {
  await mongoose.connect(`${process.env.DB_URI}`);
  console.log("Connected to remote mongodb cluster");
  await importAllModels();
  console.log("All models have been imported");

  createAllRoute(app);
})();

function calcAmount(arr) {
  return arr.reduce((acc, d) => {
    acc += parseInt(d.amount);
    return acc;
  }, 0);
}

app.get("/", (req, res) => {
  res.send("Welcome from Investment Tracker");
});

app.get("/backend", (req, res) => {
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

    res.json({
      totalInvestment,
      totalProfit,
      individualProfits,
      individualInvestments,
    });
  });
});
