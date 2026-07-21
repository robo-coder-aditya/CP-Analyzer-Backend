import { analyseUser } from "../services/analysis.service.js";
import { generateInsights } from "../services/llm/llm.service.js";

const analysis = await analyseUser("anand_2486");
const insights = await generateInsights(analysis);

console.log(insights);