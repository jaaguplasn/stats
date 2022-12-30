import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery, TaskQuery } from "./queries.js";

let info = {
  id: null,
  level: null,
  xp: null,
  tasks: {},
};
let task = {
  name: null,
  date: null,
  xp: null,
};

let res = await queryAPI(LoginQuery, { login: "jaaguplasn" });
info.id = res.data.user[0].id;
res = await queryAPI(LevelQuery, { id: info.id });
info.level = res.data.transaction[0].amount;
res = await queryAPI(TaskQuery, { login: "jaaguplasn" });
console.log(res)
for (let i = 0; i < res.lenght; i++) {
  console.log("here")
  console.log(res.data.progress[i].object.name)
}
console.log("HERE")