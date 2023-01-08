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
  //TASKinfo
  DrawTaskChart(UserData);
}
async function DrawXPChart(UserData) {
  const LevelDifXp = UserData.xpTilNextLvl - UserData.xpTilCurrentLvl;
  const XpRemaining = UserData.xpTilNextLvl - UserData.xp;
  const XpGotten = LevelDifXp - XpRemaining;
  const XpGraph = document.createElement("canvas");
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

async function DrawTaskChart(UserData) {
  const Graph = document.createElement("canvas");
  Graph.id = "TaskGraph";
  const xlabels = [];
  const ylabels = [];
  UserData.tasks.forEach((task) => {
    console.log(task);
  });

  // new Chart(Graph, {
  //   type: 'bar',
  //   data: {
  //     labels: xlabels,
  //     datasets: [
  //       {

  //       }
  //     ]
  //   }
  // })
}

export function clearDivs() {
  let infoBoxes = document.getElementById("infoboxes");
  infoBoxes.innerHTML = "";
}
