import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery } from "./queries.js";

let info = {
    id: null,
    level: null,
    xp: null
}
let data = await queryAPI(LoginQuery, {login: "jaaguplasn"});
console.log(data.user)