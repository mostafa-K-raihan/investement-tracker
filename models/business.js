import mongoose from "mongoose";
const businessSchema = new mongoose.Schema({
  name: String,
});

const Business = mongoose.model("Business", businessSchema, "business");

export default Business;
