import { analyseUser } from "../services/analysis.service.js";
import { generateInsights } from "../services/llm/llm.service.js";

const analysis = await analyseUser("AnujKumar1729");
const insights = await generateInsights(analysis);

console.log(insights);