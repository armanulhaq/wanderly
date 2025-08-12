import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/DB";
import authenticationRoute from "./routes/authentication.route";
import googlePlacesRouter from "./routes/googlePlaces.route";
import askGeminiRouter from "./routes/askGemini.route";

connectDB();
dotenv.config();

const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // frontend URL
        methods: ["GET", "POST"],
        credentials: true, // if you're using cookies or sessions
    })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from Wanderly server!");
});

app.use("/api/auth", authenticationRoute);
app.use("/api/google", googlePlacesRouter);
app.use("/api/askgemini", askGeminiRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
