import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery } from "./queries.js";

let info = {
    id: null,
    level: null,
    xp: null
}
let res = await queryAPI(LoginQuery, {login: "jaaguplasn"});
info.id = res.data.user[0].id
res = await queryAPI(LevelQuery, {id: info.id});
console.log(res.data.transaction[0].amount)
//info.level = res.data.transaction[0].amount
//console.log("info is: ", info)