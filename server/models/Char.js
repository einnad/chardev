import mongoose from "mongoose";

const charSchema = new mongoose.Schema({
  name: String,
  age: String,
  personality: String,
  appearance: String,
  relationships: String,
  notes: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const charModel = mongoose.model("Char", charSchema);
export default charModel;
