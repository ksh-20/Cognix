import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Successfully!");
    } catch (error) {
        console.error("Error Connecting to MongoDB", error);
        process.exit(1);
    }
};