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
  info = await GetTaskandLevel(info);
  //audit
  info.auditInfo = await GetAudit(info);

  return info;
}

async function GetAudit(UserData) {
  let AuditInfo = {
    upAudit: [],
    upRatio: null,
    downAudit: [],
    downRatio: null,
    auditRatio: null,
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
        AuditInfo.upRatio += audit.amount;
      } else if (audit.type === "down") {
        AuditInfo.downAudit.push(audit);
        AuditInfo.downRatio += audit.amount;
      }
    });
    offset += 50;
  }

  AuditInfo.auditRatio = (AuditInfo.upRatio / AuditInfo.downRatio).toFixed(2);
  return AuditInfo;
}

async function GetTaskandLevel(UserData) {
  let offset = 0;
  let loop = true;
  while (loop) {
    console.log("LOOP")
    const data = await queryAPI(LevelAndTaskQuery, {
      login: UserData.username,
      id: UserData.id,
      offset: offset,
    });
    if (data.data.progress.length === 0) {
      loop = false;
      break;
    }
    for (let i = 0; i < data.data.progress.length; i++) {
      UserData.level = data.data.transaction[0].amount;
      if (data.data.progress[i].object.name === "Piscine Rust 2022") {
        let task = new Task(
          data.data.progress[i].object.name,
          new Date(data.data.progress[i].updatedAt),
          390000
        );
        UserData.tasks.push(task);
        UserData.xp += 390000;
      } else {
        let xpData = await queryAPI(XpQuery, {
          login: UserData.username,
          task: data.data.progress[i].object.name,
        });

        let task = new Task(
          data.data.progress[i].object.name,
          new Date(data.data.progress[i].updatedAt),
          xpData.data.transaction[0].amount
        );
        UserData.tasks.push(task);
        UserData.xp += xpData.data.transaction[0].amount;
      }
    }
    offset += 50;
  }
  UserData.xpTilNextLvl = levelNeededXP(UserData.level + 1);
  UserData.xpTilCurrentLvl = levelNeededXP(UserData.level);
  return UserData;
}

// Returns the amount of XP needed for any given level
function levelNeededXP(level) {
  return Math.round(level * (176 + 3 * level * (47 + 11 * level)));
}

export function clearInfo() {
  (info.id = null),
    (info.level = null),
    (info.xp = null),
    (info.xpTilNextLvl = null),
    (info.xpTilCurrentLvl = null),
    (info.tasks = [Task]);
}
