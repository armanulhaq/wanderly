import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/places", async (req, res) => {
    try {
        const input = req.query.input as string;
        if (!input) {
            return res.status(400).json({ error: "Missing input parameter" });
        }

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                input
            )}&key=${process.env.GOOGLE_API_KEY}&types=(cities)` //encodeURIComponent() ensures special characters (spaces, punctuation) in the query don’t break the URL.
        );

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Google Places API Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
