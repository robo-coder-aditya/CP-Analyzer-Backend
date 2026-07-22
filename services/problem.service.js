import pool from "../db/connection.js";

export async function getAllProblems(){
    try{
        const res = await pool.query("SELECT * FROM problems");
        const problems = res.rows;

        return problems;
    }
    catch(err){
        throw new Error("DATABASE_ERROR");
        
    }
}