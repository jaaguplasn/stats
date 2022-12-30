import { queryAPI } from "./queryAPI.js";
import { LoginQuery, LevelQuery, TaskQuery, XpQuery } from "./queries.js";

class Task {
  constructor(name, date, xp) {
    (this.name = name), (this.date = date), (this.xp = xp);
  }
}

let info = {
  id: null,
  level: null,
  xp: null,
  tasks: { Task },
};

let res = await queryAPI(LoginQuery, { login: "jaaguplasn" });
info.id = res.data.user[0].id;
res = await queryAPI(LevelQuery, { id: info.id });
info.level = res.data.transaction[0].amount;
res = await queryAPI(TaskQuery, { login: "jaaguplasn" });
for (let i = 0; i < res.data.progress.length; i++) {
  //get task xp
  let xpData = await queryAPI(XpQuery, { login: "jaaguplasn" });
  console.log(xpData);
  //task.name = res.data.progress[i].object.name;
  //task.date = res.data.progress[i].updatedAt
}
