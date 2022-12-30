import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery, TaskQuery } from "./queries.js";

let info = {
  id: null,
  level: null,
  xp: null,
  tasks: { Task },
};
class Task {
  constructor(name, date, xp) {
    (this.name = name), (this.date = date), (this.xp = xp);
  }
}

let res = await queryAPI(LoginQuery, { login: "jaaguplasn" });
info.id = res.data.user[0].id;
res = await queryAPI(LevelQuery, { id: info.id });
info.level = res.data.transaction[0].amount;
res = await queryAPI(TaskQuery, { login: "jaaguplasn" });
console.log(res.data.progress);
for (let i = 0; i < res.data.progress.length; i++) {
  //get task xp
  let xpData = await queryAPI(TaskQuery, { login: "jaaguplasn" });
  console.log(xpData)
  //task.name = res.data.progress[i].object.name;
  //task.date = res.data.progress[i].updatedAt
}

