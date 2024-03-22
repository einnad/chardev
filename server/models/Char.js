import mongoose from "mongoose";

const charSchema = new mongoose.Schema({
  name: String,
  age: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export { charSchema as Char };
