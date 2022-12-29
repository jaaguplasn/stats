import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery } from "./queries.js";

let info = {
    id: null,
    level: null,
    xp: null
}
let res = await queryAPI(LoginQuery, {login: "jaaguplasn"});
console.log(res.data.user[0])

info.id = res.data.user[0].id
console.log("info is: ", info)