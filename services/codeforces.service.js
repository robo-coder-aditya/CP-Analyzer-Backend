import axios from "axios"

export async function getUserInfo(handle){
    try{
        const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}&lang=en`);

        const user = res.data.result[0];
        return res.data.result[0];

    }
    catch (err) {
        if (err.response?.data?.comment?.includes("User with handle not found")) {
            throw new Error("INVALID_HANDLE");
        }

        throw new Error("CODEFORCES_ERROR");
    }
    
}

export async function getUserSubmissions(handle){
    try{
        const res = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&lang=en`)

        const submissions = res.data.result;

        return res.data.result;
    }
    catch (err) {

        const comment = err.response?.data?.comment ?? "";

        if (comment.startsWith("handle:") && comment.includes("not found")){
            throw new Error("INVALID_HANDLE");
        }
        throw new Error("CODEFORCES_ERROR");
    }
    
}

export async function getRatingHistory(handle){
    try{
        const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}&lang=en`)

        const history = res.data.result;

        return res.data.result;
    }
    catch (err) {
        if (err.response?.data?.comment?.includes("User with handle not found")) {
            throw new Error("INVALID_HANDLE");
        }

        throw new Error("CODEFORCES_ERROR");
    }
}

