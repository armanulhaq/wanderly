import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/DB.ts";
import authenticationRoute from "./routes/authentication.route.ts";

connectDB();
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from Wanderly server!");
});

app.use("/api/auth", authenticationRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
