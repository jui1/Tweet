import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import useRoutes from "./Routes/userRoutes.js";
import tweetRouter from "./Routes/tweetRoutes.js";
import cors from "cors"

dotenv.config({
    path: ".env"
});

const app = express(); 

const corsOption ={
    origin :"http://localhost:3000",
    credentials:true
}

app.use(cors(corsOption))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", useRoutes);
app.use("/api/v1/tweet", tweetRouter);


app.get("/home", (req, res) => {
    res.status(200).json({
        message: "coming from backend...."
    });
});

databaseConnection();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening at Port ${PORT}`);
});