import mongoose from "mongoose";

const Schema = mongoose.Schema;

export function importModels() {
  const businessSchema = new mongoose.Schema({
    name: String,
  });

  mongoose.model("Businesses", businessSchema);

  const transactionSchema = new mongoose.Schema({
    business: { type: Schema.Types.ObjectId, ref: "Business" },
    date: Date,
    amount: String,
    orderId: String,
    type: {
      type: String,
      enum: ["INVESTMENT", "PROFIT RETURN"],
    },
  });

  mongoose.model("Transactions", transactionSchema);
}
