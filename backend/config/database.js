import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "../config/.env"
});

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
};

export default databaseConnection;
