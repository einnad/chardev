import mongoose from "mongoose";

const charSchema = new mongoose.Schema({
  name: String,
  age: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const charModel = mongoose.model("Char", charSchema);
export default charModel;
