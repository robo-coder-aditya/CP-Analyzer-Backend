import express from "express";
import { analyzeUser } from "../controllers/analysis.controller.js";

const router = express.Router();

router.post("/analyze", analyzeUser);

export default router;