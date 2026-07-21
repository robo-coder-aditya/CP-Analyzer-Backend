import dotenv from "dotenv";
import Groq from "groq-sdk";
import { buildPrompt } from "./prompt.service.js";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function generateInsights(analysis) {
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: "You are an expert competitive programming coach"
            }, 
            {
                role: "user",
                content: buildPrompt(analysis)
            }
        ]
    })

    return response.choices[0].message.content;
}