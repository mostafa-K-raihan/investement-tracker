import mongoose from "mongoose";
const Business = mongoose.model("Business");

async function getAllBusiness() {
  const businesses = await Business.find({}, { __v: 0 }).lean();
  return businesses;
}

async function saveBusiness(name) {
  console.log(`Attempting to save business ${name}`);
  const business = new Business({ name });

  await business.save();
  console.log(`Business ${name} has been saved successfully!`);
}

async function deleteBusiness(name, _id) {
  if (_id) {
    await Business.findByIdAndDelete(_id);
    return;
  }

  if (name) {
    await Business.findOneAndDelete({ name });
    return;
  }
}

export default {
  getAllBusiness,
  saveBusiness,
  deleteBusiness,
};
