import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  personality: String,
});

export { userSchema as User };
