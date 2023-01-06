import { queryAPI } from "./queryAPI.js";
import { LevelAndTaskQuery, XpQuery, AuditQuery } from "./queries.js";

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
  auditInfo: null,
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
  info.auditInfo = await GetAudit(info)

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

async function GetAudit(UserData) {
  let AuditInfo = {
    upAudit: [],
    upRatio: null,
    downAudit: [],
    downRatio: null,
    auditRatio : null,
    xpArray: [],
    xpp: null,
  };

  let offset = 0;
  let loop = true;
  while (loop) {
    const data = await queryAPI(AuditQuery, {
      id: UserData.id,
      offset: offset,
    });
    if (data.data.transaction.length === 0) {
      loop = false;
      break;
    }
    data.data.transaction.forEach((audit) => {
      if (audit.type === "up") {
        AuditInfo.upAudit.push(audit);
        AuditInfo.upRatio += audit.amount
      } else if (audit.type === "down") {
        AuditInfo.downAudit.push(audit);
        AuditInfo.downRatio += audit.amount
      } else {
        AuditInfo.xpArray.push(audit.amount)
      }
    });
    offset += 50
  }
  AuditInfo.xpp = AuditInfo.xpArray.reduce((v1, v2) => { v1 + v2})
  AuditInfo.auditRatio = (AuditInfo.upRatio / AuditInfo.downRatio).toFixed(2);
  return AuditInfo
}
