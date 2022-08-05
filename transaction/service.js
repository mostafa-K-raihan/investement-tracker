import mongoose from "mongoose";
const Transaction = mongoose.model("Transaction");

async function getAllTransaction() {
  const transactions = await Transaction.find({}, { __v: 0 }).lean();
  return transactions;
}

// async function saveBusiness(name) {
//   console.log(`Attempting to save business ${name}`);
//   const business = new Business({ name });

//   await business.save();
//   console.log(`Business ${name} has been saved successfully!`);
// }

// async function deleteBusiness(name, _id) {
//   if (_id) {
//     await Business.findByIdAndDelete(_id);
//     return;
//   }

//   if (name) {
//     await Business.findOneAndDelete({ name });
//     return;
//   }
// }

export default {
  getAllTransaction,
  // saveBusiness,
  // deleteBusiness,
};
