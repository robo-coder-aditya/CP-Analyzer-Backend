import {getUserInfo, getUserSubmissions, getRatingHistory} from "../services/codeforces.service.js";

const user = await getUserInfo("Aditya_Agarwala_2006");
console.log(user);

const submissions = await getUserSubmissions("Aditya_Agarwala_2006");
console.log(submissions);

const history = await getRatingHistory("Aditya_Agarwala_2006");
console.log(history);