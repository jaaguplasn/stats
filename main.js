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
  tasks: [ Task ],
};

let res = await queryAPI(LoginQuery, { login: "jaaguplasn" });
info.id = res.data.user[0].id;
res = await queryAPI(LevelQuery, { id: info.id });
info.level = res.data.transaction[0].amount;
res = await queryAPI(TaskQuery, { login: "jaaguplasn" });
for (let i = 0; i < res.data.progress.length; i++) {
  //get task xp

  if (res.data.progress[i].object.name == "Piscine Rust 2022") {
    //if its piscine rust 2022 add xp manually
    let task = new Task(res.data.progress[i].object.name, res.data.progress[i].updatedAt, 390000)
    info.tasks.push(task);
  } else {
    let xpData = await queryAPI(XpQuery, {
      login: "jaaguplasn",
      task: res.data.progress[i].object.name,
    });
    //console.log(xpData.data.transaction[0].amount);
    //task.name = res.data.progress[i].object.name;
    //task.date = res.data.progress[i].updatedAt
    let task = new Task(res.data.progress[i].object.name, res.data.progress[i].updatedAt, xpData.data.transaction[0].amount)
    info.tasks.push(task)
  }
}
console.log(info)
