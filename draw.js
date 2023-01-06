import { getInfo } from "./info.js";

export async function Draw(username, id) {
  let UserData = await getInfo(username, id);
  console.log(UserData);
  let InfoBoxes = document.getElementById("infoboxes");
  //Userinfo
  let UserInfoBox = document.createElement("div");
  UserInfoBox.innerText =
    "Username: " +
    UserData.username +
    "\n" +
    "ID: " +
    UserData.id +
    "\n" +
    "Level: " +
    UserData.level +
    "\n" +
    "Audit Ratio: " +
    UserData.auditInfo.auditRatio;
  InfoBoxes.appendChild(UserInfoBox);
  //Xpinfo
  if (UserData.username === "jaaguplasn") {
    // idk what but it doesn't work correctly cuz imo xp forumla?
    let XpInfoBox = document.createElement("div");
    let XpGraph = await DrawXPChart(UserData);
    XpInfoBox.appendChild(XpGraph);
    InfoBoxes.appendChild(XpInfoBox);
  }
}
async function DrawXPChart(UserData) {
  let LevelDifXp = UserData.xpTilNextLvl - UserData.xpTilCurrentLvl;
  let XpRemaining = UserData.xpTilNextLvl - UserData.xp;
  let XpGotten = LevelDifXp - XpRemaining;
  let XpGraph = document.createElement("canvas");
  XpGraph.id = "XpGraph";
  new Chart(XpGraph, {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "xp",
          data: [XpGotten, XpRemaining],
          backgroundColor: ["rgb(50, 214, 21)", "rgb(207, 205, 202)"],
          hoverOffset: 4,
        },
      ],
    },
  });
  return XpGraph;
}

export function clearDivs() {
  let infoBoxes = document.getElementById("infoboxes");
  infoBoxes.innerHTML = "";
}
