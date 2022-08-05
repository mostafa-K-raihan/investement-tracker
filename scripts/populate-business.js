import fs from "fs";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import importAllModels from "../models/index.js";

dotenv.config();

async function run(actualRun = false) {
  const { Business } = mongoose.models;
  console.log(mongoose.models);

  const data = fs.readFileSync("./transaction-database.json");
  const { data: transaction } = JSON.parse(data);

  const businesses = Array.from(
    new Set(transaction.map((t) => t.to ?? t.from))
  ).map((b) => new Business({ name: b }));
  console.log(`Total ${businesses.length} businesses found`);
  console.log(businesses.map((b) => b.name));

  if (actualRun) {
    await Promise.all(businesses.map((b) => b.save()));

    console.log("all businesses added!");
  }

  process.exit(0);
}

(async function init() {
  await mongoose.connect(`${process.env.DB_URI}`);
  console.log("Connected to remote mongodb cluster");
  await importAllModels();
  console.log("All models have been imported");
  await run(true);
})();
