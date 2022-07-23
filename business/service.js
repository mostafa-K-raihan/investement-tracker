import mongoose from "mongoose";
const Business = mongoose.models.Business;

async function saveBusiness(name) {
  console.log(`Attempting to save business ${name}`);
  const business = new Business({ name });

  await business.save();
  console.log(`Business ${name} has been saved successfully!`);
}

export default {
  saveBusiness,
};
