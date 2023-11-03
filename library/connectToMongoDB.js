import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { Mongo_DB_URI } = process.env;

if (!Mongo_DB_URI) {
  throw new Error("Invalid environment variable: MONGODB_URI");
}

export const connectToMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(Mongo_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connection.readyState === 1) {
      console.log("App connected to MongoDB successfully");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
