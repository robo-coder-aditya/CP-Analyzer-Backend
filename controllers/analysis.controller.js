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
            insights: parsedInsights
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: "Failed to analyze user."
        });
    }
}