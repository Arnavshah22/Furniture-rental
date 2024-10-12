import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection Error:", error.message);
        process.exit(1); // Exit the process if unable to connect
    }
};

export default connectDB;
