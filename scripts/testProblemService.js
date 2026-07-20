import { getAllProblems } from "../services/problem.service.js";

const problems = await getAllProblems();
console.log(problems.length);
console.log(problems[0]);