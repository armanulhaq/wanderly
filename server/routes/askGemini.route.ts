import express from "express";
import askGemini from "../controller/askGemini.controller";

const router = express.Router();

router.post("/", askGemini);

export default router;
