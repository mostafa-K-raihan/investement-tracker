import businessService from "./service.js";

async function getAllBusiness(req, res) {
  console.log("Fetching all business");

  const businesses = await businessService.getAllBusiness();

  res.status(200).json({ businesses });
}

async function saveBusiness(req, res) {
  console.log("Saving business");

  try {
    const { name } = req.body;
    if (!name) {
      throw new Error("Name is mandatory");
    }
    const business = await businessService.saveBusiness(name);
    res.status(201).send({ business });
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
}

async function deleteBusiness(req, res) {
  console.log("Inside delete business");
  const { name, _id } = req.body;

  if (!name && !_id) {
    res.status(400).json({ message: "Please provide either name or _id " });
  }

  await businessService.deleteBusiness(name, _id);
  return res.status(202).json({ message: "Successfully deleted" });
}

export default {
  getAllBusiness,
  saveBusiness,
  deleteBusiness,
};
