import business from "../../business/index.js";

const createRoute = (app) => {
  app.get("/api/business", business.getAllBusiness);
  app.post("/api/business", business.saveBusiness);
};

export default {
  name: "Business Routes",
  createRoute,
};
