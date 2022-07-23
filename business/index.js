import businessService from "./service.js";

function getAllBusiness(req, res) {
  console.log("Inside getAllBusiness function");
  res.json({ msg: "Hello from get All business" });
}

async function saveBusiness(req, res) {
  console.log("Inside save business");

  try {
    const { name } = req.body;
    await businessService.saveBusiness(name);
    res.status(201);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
}

export default {
  getAllBusiness,
  saveBusiness,
};
