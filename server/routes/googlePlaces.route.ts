import express from "express";
import dotenv from "dotenv";
import getAutoComplete from "../controller/googlePlaces.controller.ts";

dotenv.config();

const router = express.Router();

router.get("/places", getAutoComplete);

export default router;
