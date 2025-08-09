import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    const uri: string = process.env.MONGODB_URI!; //by default process.env gives string | undefined, so even if we keep url type string, we need to tell typescript that it will never be undefined by using the ! operator
    try {
        await mongoose.connect(uri); //URI will be a string
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export default connectDB;
