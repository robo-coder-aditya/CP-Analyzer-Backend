import { getEnrichedSubmissions, generateTopicStats, generateRatingStats, analyseUser} from "../services/analysis.service.js";

const enrichedSubmissions = await getEnrichedSubmissions("Aditya_Agarwala_2006");
const topicStats = await generateTopicStats(enrichedSubmissions);
const ratingStats = await generateRatingStats(enrichedSubmissions);

const finalData = await analyseUser("Aditya_Agarwala_2006");

console.log(finalData);