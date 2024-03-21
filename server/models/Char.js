import mongoose from "mongoose";

export const charSchema = new mongoose.Schema({
  name: String,
  age: String,
  personality: String,
});
