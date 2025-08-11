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

          User inputs:
          - Destination: ${destination}
          - Travel Dates: From ${from} to ${to}
          - Number of Travelers: ${people}
          - Budget Type: ${budget}  // Possible values: "saver", "comfort", or "luxury"

          Requirements:
          - Estimate a realistic totalBudget in Indian Rupees (₹) based on the budget type:
            - Saver: prioritize saving money, keep totalBudget low with budget options.
            - Comfort: balance cost and comfort; moderate totalBudget.
            - Luxury: freehand spending, premium options allowed.
          - Plan the entire itinerary and costs according to this estimated totalBudget.
          - Budget breakdown must be realistic, in ₹, and cover accommodation, flights, dining, activities/entertainment, and transportation.
          - Maintain the exact JSON structure below without any deviation.
          - Respond ONLY with the valid JSON, no extra text.

          JSON structure:

          {
            "tripSummary": {
              "title": "Your Perfect 7-Day ${destination} Adventure",
              "subtitle": "An unforgettable experience tailored for your budget",
              "location": "${destination}",
              "durationDays": 3,
              "travelers": "${people}",
              "tripRating": 4.7, // AI to estimate and fill realistic trip rating
              "totalBudget": 0 // AI to estimate and fill realistic total budget in ₹
            },
            "dailyItinerary": [
              {
                "day": 1,
                "date": "YYYY-MM-DD",
                "activities": [
                  {
                    "time": "HH:MM AM/PM",
                    "location": "Location name",
                    "title": "Activity title",
                    "description": "Detailed activity description"
                  }
                  // More activities...
                ]
              }
              // More days...
            ],
            "budgetBreakdown": {
              "totalBudget": 0, // same as tripSummary.totalBudget
              "remaining": 0,
              "categories": {
                "accommodation": {
                  "amount": 0,
                  "percentage": 0
                },
                "flights": {
                  "amount": 0,
                  "percentage": 0
                },
                "dining": {
                  "amount": 0,
                  "percentage": 0
                },
                "activities_entertainment": {
                  "amount": 0,
                  "percentage": 0
                },
                "transportation": {
                  "amount": 0,
                  "percentage": 0
                }
              }
            },
            "travelTips": [
              {
                "title": "Tip title",
                "description": "Detailed tip description"
              }
              // More tips...
            ],
            "recommendedAccommodations": [
              {
                "name": "Hotel name",
                "location": "Hotel address or area",
                "rating": 0,
                "type": "Hotel type, e.g. Luxury, Budget, Boutique",
                "pricePerNight": 0,
                "description": "Hotel description"
              }
              // More hotels...
            ],
            "topActivitiesAttractions": [
              {
                "name": "Attraction name",
                "location": "Attraction location",
                "rating": 0,
                "type": "Type of attraction",
                "durationHours": "Duration e.g. 2-3",
                "groupSize": "Suggested group size",
                "price": "Cost or Free",
                "description": "Brief description"
              }
              // More attractions...
            ],
            "diningOptions": [
              {
                "name": "Restaurant name",
                "location": "Restaurant location",
                "rating": 0,
                "cuisine": "Cuisine type",
                "priceRange": "₹₹ or ₹₹₹₹ etc.",
                "description": "Short description"
              }
              // More dining options...
            ]
          }

          Ensure every date is correct for the trip duration, and cost estimates are appropriate for the Indian Rupee economy.

          Respond ONLY with the valid JSON, nothing else.
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
            console.log(response.text);
        }
        main();
        return res
            .status(200)
            .json({ message: "Success we got everything..." });
    } catch (error) {
        console.error("Error in askGemini controller:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default askGemini;
