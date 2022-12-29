import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery } from "./queries.js";

let info = {
  id: null,
  level: null,
  xp: null,
};
export async function start(logininfo) {
let res = await queryAPI(LoginQuery, { login: logininfo });
info.id = res.data.user[0].id;
res = await queryAPI(LevelQuery, { id: info.id });
info.level = res.data.transaction[0].amount;
console.log("info is: ", info);
}