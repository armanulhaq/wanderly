import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const askGemini = async (req: Request, res: Response) => {
    try {
        const { destination, budget, people, from, to } = req.body;
        if (!destination || !budget || !people || !from || !to) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        console.log(destination, budget, people, from, to);

        // The client gets the API key from the environment variable `GEMINI_API_KEY`.
        const ai = new GoogleGenAI({});
        async function main() {
            const prompt = `
        You are a travel assistant AI. Generate a detailed 7-day trip itinerary in JSON format based on the user inputs.
        Rules:
        - Output VALID JSON only — no markdown code blocks, no commentary, no escaped newlines, and no backslashes before quotes unless strictly needed for JSON.
        - No \` characters in output.
        - No properties missing from the schema.
        - All dates use YYYY-MM-DD.
        - All times use HH:mm 24h.
        - Numbers should not contain commas or currency symbols.
        - Ratings are numbers (max 1 decimal).
        - Output exactly one JSON object that matches this TypeScript type:

        User inputs:
        - Destination: ${destination}
        - Travel Dates: From ${from} to ${to}
        - Number of Travelers: ${people}
        - Budget Type: ${budget}  // Possible values: "saver", "comfort", or "luxury"

        Requirements:
        - Estimate a realistic totalBudget in INR based on the budget type:
          Saver = low cost, Comfort = moderate cost, Luxury = high cost.
        - All amounts must be numbers in INR without the ₹ symbol or commas.
        - All ratings must be numbers (1 decimal allowed).
        - All dates must follow YYYY-MM-DD format.
        - All times must follow HH:mm (24-hour) format.
        - No text outside the JSON.

        JSON structure (strict types):

        {
          "tripSummary": {
            "title": "string",
            "subtitle": "string",
            "location": "string",
            "durationDays": number,
            "travelers": number,
            "tripRating": number,
            "totalBudget": number
          },
          "dailyItinerary": [
            {
              "day": number,
              "date": "YYYY-MM-DD",
              "activities": [
                {
                  "time": "HH:mm",
                  "location": "string",
                  "title": "string",
                  "description": "string"
                }
              ]
            }
          ],
          "budgetBreakdown": {
            "totalBudget": number,
            "remaining": number,
            "categories": {
              "accommodation": { "amount": number, "percentage": number },
              "flights": { "amount": number, "percentage": number },
              "dining": { "amount": number, "percentage": number },
              "activities_entertainment": { "amount": number, "percentage": number },
              "transportation": { "amount": number, "percentage": number }
            }
          },
          "travelTips": [
            { "title": "string", "description": "string" }
          ],
          "recommendedAccommodations": [
            { "name": "string", "location": "string", "rating": number, "type": "string", "pricePerNight": number, "description": "string" }
          ],
          "topActivitiesAttractions": [
            { "name": "string", "location": "string", "rating": number, "type": "string", "durationHours": number, "groupSize": "string", "price": number, "description": "string" }
          ],
          "diningOptions": [
            { "name": "string", "location": "string", "rating": number, "cuisine": "string", "priceRange": number, "description": "string" }
          ]
        }

        Return only valid JSON.
        `;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    thinkingConfig: {
                        thinkingBudget: 0, // Disables thinking
                    },
                },
            });
            let cleaned = response.text?.replace(/^``````$/, ""); //removes ```
            try {
                const parsed = JSON.parse(cleaned!); //to make sure it can be parsed into a valid JSON
                cleaned = JSON.stringify(parsed); // making it string again
            } catch (err) {
                console.error("Invalid JSON from Gemini:", cleaned);
            }
            return cleaned;
        }
        return res.status(200).json({
            message: "Success we got everything...",
            response: await main(),
        });
    } catch (error) {
        console.error("Error in askGemini controller:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default askGemini;
