import { queryAPI } from "./queryAPI.js";
import { LevelAndTaskQuery, XpQuery, Audits, AuditQuery } from "./queries.js";

class Task {
  constructor(name, date, xp) {
    (this.name = name), (this.date = date), (this.xp = xp);
  }
}

export let info = {
  username: null,
  id: null,
  level: null,
  xp: null,
  xpTilNextLvl: null,
  xpTilCurrentLvl: null,
  Audits: {},
  tasks: [Task],
};

export async function getInfo(username, id) {
  info.id = id;
  info.username = username;
  let res = await queryAPI(LevelAndTaskQuery, { login: username, id: info.id });
  for (let i = 0; i < res.data.progress.length; i++) {
    //get level
    info.level = res.data.transaction[0].amount;
    //get task and xp
    if (res.data.progress[i].object.name == "Piscine Rust 2022") {
      //if its piscine rust 2022 add xp manually
      let task = new Task(
        res.data.progress[i].object.name,
        new Date(res.data.progress[i].updatedAt),
        390000
      );
      info.tasks.push(task);
      info.xp += 390000;
    } else {
      let xpData = await queryAPI(XpQuery, {
        login: username,
        task: res.data.progress[i].object.name,
      });

      let task = new Task(
        res.data.progress[i].object.name,
        new Date(res.data.progress[i].updatedAt),
        xpData.data.transaction[0].amount
      );
      info.tasks.push(task);
      info.xp += xpData.data.transaction[0].amount;
    }
  }
  info.xpTilNextLvl = levelNeededXP(info.level + 1);
  info.xpTilCurrentLvl = levelNeededXP(info.level);

  //audit
  let audits = await queryAPI(AuditQuery, { id: info.id });
  audits.forEach((audit) => {
    if (audit.type === "up") {
      info.Audits.push(audit);
    }
  })
  console.log(info.Audits.length);

  return info;
}

export function clearInfo() {
  (info.id = null),
    (info.level = null),
    (info.xp = null),
    (info.xpTilNextLvl = null),
    (info.xpTilCurrentLvl = null),
    (info.tasks = [Task]);
}

// Returns the amount of XP needed for any given level
function levelNeededXP(level) {
  return Math.round(level * (176 + 3 * level * (47 + 11 * level)));
}
