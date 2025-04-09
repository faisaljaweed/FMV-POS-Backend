import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB = async () => {
  try {
    const connectioninstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MongoDB Connected ${connectioninstance.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error ${error}`);
  }
};
export default connectDB;
