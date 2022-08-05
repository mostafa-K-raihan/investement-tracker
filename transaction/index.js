import transactionService from "./service.js";

async function getAllTransaction(req, res) {
  console.log("Inside getAllTransaction function");
  const transactions = transactionService.getAllTransaction();

  return res.status(200).json({ transactions });
}

export default {
  getAllTransaction,
};
