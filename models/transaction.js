import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  date: Date,
  amount: String,
  orderId: String,
  type: {
    type: String,
    enum: ["INVESTMENT", "PROFIT RETURN"],
  },
});

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema,
  "transaction"
);

export default Transaction;
