import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery } from "./queries.js";

let info = {
    id: null,
    level: null,
    xp: null
}
let res = await queryAPI(LoginQuery, {login: "jaaguplasn"});
console.log(res.data.user.id)