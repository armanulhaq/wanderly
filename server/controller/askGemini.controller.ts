import type { Request, Response } from "express";

const askGemini = async (req: Request, res: Response) => {
    try {
        const { destination, budget, people, from, to } = req.body;
        if (!destination || !budget || !people || !from || !to) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        console.log(destination, budget, people, from, to);
        return res
            .status(200)
            .json({ message: "Success we got everything..." });
    } catch (error) {
        console.error("Error in askGemini controller:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default askGemini;
