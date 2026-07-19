import axios from "axios";
import pool from "../db/connection.js";

try{
    const res = await axios.get("https://codeforces.com/api/problemset.problems");
    const problems = res.data.result.problems;

    await pool.query("BEGIN");
    await pool.query("TRUNCATE TABLE problems");
    
    for(const problem of problems){
        await pool.query(`
        INSERT INTO problems (contest_id, problem_index, name, rating, tags)
        VALUES ($1, $2, $3, $4, $5)`, [
            problem.contestId,
            problem.index,
            problem.name,
            problem.rating ?? null,
            problem.tags
        ])
    }
    await pool.query("COMMIT");
}
catch(err){
    await pool.query("ROLLBACK");
    console.error(err);
}
finally{
    await pool.end();
}