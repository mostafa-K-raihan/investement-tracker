import fs from "fs";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import importAllModels from "../models/index.js";
import yargs from "yargs";

dotenv.config();

async function run(actualRun = false) {
  const { default: businessService } = await import("../business/service.js");
  console.log({ businessService });
  const { Transaction } = mongoose.models;

  const data = fs.readFileSync("./transaction-database.json");
  const { data: transaction } = JSON.parse(data);

  const businesses = await businessService.getAllBusiness();

  const transactions = transaction
    .map(async (t) => {
      const dateFragments = t.time.split("/");
      const date = new Date(
        dateFragments[0],
        dateFragments[1] - 1,
        dateFragments[2]
      );
      const entity = t.to ?? t.from;

      const business = businesses.find((b) => b.name === entity);

      return {
        date,
        orderId: t.orderId,
        amount: t.amount,
        type: t.type,
        business: business._id,
      };
    })
    .map((t) => new Transaction(t));

  console.log(`Total ${transaction.length} transactions found`);

  if (actualRun) {
    await Promise.all(transactions.map((t) => t.save()));

    console.log("all transactions added!");
  }

  process.exit(0);
}

const argv = yargs.options({
  actualRun: {
    default: false,
    type: "boolean",
  },
}).argv;

(async function init() {
  await mongoose.connect(`${process.env.DB_URI}`);
  console.log("Connected to remote mongodb cluster");
  await importAllModels();
  console.log("All models have been imported");
  await run(argv.actualRun);
})();
