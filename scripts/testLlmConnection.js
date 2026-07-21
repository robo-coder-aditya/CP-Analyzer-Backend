import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
        {
            role: "user",
            content: "Say hello in one sentence."
        }
    ]
});

console.log(response.choices[0].message.content);