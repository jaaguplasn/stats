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
    UserData.level;
  InfoBoxes.appendChild(UserInfoBox);
  //Xpinfo
  let XpInfoBox = document.createElement("div");
  let XpGraph = await DrawXPChart(UserData);
  XpInfoBox.appendChild(XpGraph);
  InfoBoxes.appendChild(XpInfoBox);
}
async function DrawXPChart(UserData) {
  let LevelDifXp = UserData.nextLvlXp - UserData.lastLvlXp;
  let XpRemaining = UserData.nextLvlXp - UserData.xp;
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
