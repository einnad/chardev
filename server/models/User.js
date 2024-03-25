import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8 },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
