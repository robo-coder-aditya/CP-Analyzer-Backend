import {analyseUser} from "../services/analysis.service.js";
import { getUserInfo } from "../services/codeforces.service.js";

import { generateInsights } from "../services/llm/llm.service.js";

export async function analyzeUser(req, res){
    try{
        const {handle} = req.body;

        const analysis = await analyseUser(handle);
        const insights = await generateInsights(analysis);
        const profile = await getUserInfo(handle);
        const cleanedInsights = insights
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedInsights = JSON.parse(cleanedInsights);
        res.json({
            profile,
            stats: analysis,
            insights: parsedInsights
        });
    }
    catch (err) {

        console.error(err);

        switch (err.message) {

            case "INVALID_HANDLE":
                return res.status(404).json({
                    error: "Codeforces handle not found. Please check the username."
                });

            case "CODEFORCES_ERROR":
                return res.status(502).json({
                    error: "Unable to reach Codeforces. Please try again later."
                });

            case "GROQ_RATE_LIMIT":
                return res.status(429).json({
                    error: "AI service is currently busy. Please try again later."
                });

            case "LLM_ERROR":
                return res.status(502).json({
                    error: "AI service is currently unavailable."
                });

            case "DATABASE_ERROR":
                return res.status(500).json({
                    error: "Database is currently unavailable. Please try again later."
                });
                
            default:
                return res.status(500).json({
                    error: "Something went wrong. Please try again later."
                });
        }
    }
}