import { getUserSubmissions, getUserInfo, getRatingHistory} from "./codeforces.service.js";
import { getAllProblems } from "./problem.service.js";

export async function getEnrichedSubmissions(handle){
    const submissions = await getUserSubmissions(handle);
    const problems = await getAllProblems();

    const problemMap = new Map();
    for(const problem of problems){
        problemMap.set(`${problem.contest_id}-${problem.problem_index}`, problem);
    }
    const enrichedSubmissions = [];
    for(const submission of submissions){
        const key = `${submission.problem.contestId}-${submission.problem.index}`;
        const problem = problemMap.get(key);
        if(!problem) continue;

        const enrichedSubmission = {
            contest_id: problem.contest_id,
            problem_index: problem.problem_index,
            verdict: submission.verdict,
            participant: submission.author.participantType,
            creationTime: submission.creationTimeSeconds,
            name: problem.name,
            rating: problem.rating,
            tags: problem.tags,
        }

        enrichedSubmissions.push(enrichedSubmission);
    }

    return enrichedSubmissions;
}

export function generateTopicStats(enrichedSubmissions){
    const topicStats = {};

    for(const submission of enrichedSubmissions){
        for(const tag of submission.tags){
            if(!(tag in topicStats)){
                const newStats = {attempted: 0,
                    solved: 0
                }
                topicStats[tag] = newStats;
            }

            topicStats[tag].attempted++;

            if(submission.verdict==="OK") topicStats[tag].solved++;
        }
    }

    return topicStats;
}

export function generateRatingStats(enrichedSubmissions){
    const ratingStats = {};

    for(const submission of enrichedSubmissions){
        if(submission.rating===null) continue;
        const rating = submission.rating;
        if(!(rating in ratingStats)){
            ratingStats[rating] = {
                attempted: 0,
                solved: 0
            }
        }
        ratingStats[rating].attempted++;

        if(submission.verdict=="OK") ratingStats[rating].solved++;
    }

    return ratingStats;
}

export async function analyseUser(handle){
    const enriched = await getEnrichedSubmissions(handle);
    const topicStats = generateTopicStats(enriched);
    const ratingStats = generateRatingStats(enriched);
    const profile = await getUserInfo(handle);
    const contestHistory = await getRatingHistory(handle);

    const newProfile = {
        handle: profile.handle,
        currentRating: profile.rating,
        currentRank: profile.rank,
        maxRating: profile.maxRating,
        maxRank: profile.maxRank,
        registrationTime: profile.registrationTimeSeconds
    }
    
    const newContestHistory = [];
    for(const contest of contestHistory){
        newContestHistory.push({
            contestId: contest.contestId,
            contestName: contest.contestName,
            rank: contest.rank,
            ratingUpdateTimeSeconds: contest.ratingUpdateTimeSeconds,
            oldRating: contest.oldRating,
            newRating: contest.newRating,
        })
    }

    return {
        profile: newProfile,
        topicStats,
        ratingStats,
        contestHistory: newContestHistory
    }
}