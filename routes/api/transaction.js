import transaction from "../../transaction/index.js";

const createRoute = (app) => {
  app.get("/api/transaction", transaction.getAllTransaction);
};

export default {
  name: "Transaction Routes",
  createRoute,
};
