import pool from "../db/connection.js"

try{
    const res = await pool.query("SELECT NOW()");
    console.log("Connection Successful");
    console.log(res.rows[0]);
}
catch(err){
    console.error(err);
}
finally{
    await pool.end();
}