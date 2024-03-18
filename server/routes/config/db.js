import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_STRING);
    console.log(`DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
