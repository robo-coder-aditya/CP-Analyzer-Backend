import {analyseUser} from "../services/analysis.service.js";

import { generateInsights } from "../services/llm/llm.service.js";

export async function analyzeUser(req, res){
    try{
        const {handle} = req.body;

        const analysis = await analyseUser(handle);
        const insights = await generateInsights(analysis);
        const cleanedInsights = insights
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        res.json(JSON.parse(cleanedInsights));
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: "Failed to analyze user."
        });
    }
}