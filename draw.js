import { getInfo } from "./info.js";

export async function Draw(username, id) {
  let UserData = await getInfo(username, id);
  console.log(UserData);
  //Xpinfo
  if (UserData.username === "jaaguplasn") {
    // idk what but it doesn't work correctly cuz imo xp forumla?
    let XpGraphBox = document.getElementById("XpGraphBox");
    console.log(XpGraphBox);
    XpGraphBox.classList.add("graph");
    XpGraphBox.classList.add("xpgraph");
    let XpGraph = await DrawXPChart(UserData);
    XpGraphBox.appendChild(XpGraph);
  }
  //Userinfo
  UserInfoBox = document.getElementById("UserInfoBox");
  let UserInfoText = await DrawUserInfo(UserData);
  UserInfoBox.appendChild(UserInfoText);
  //graphs

  let GraphsBoxes = document.getElementById("GraphBoxes");

  //TASKinfo
  let taskGraph = await DrawTaskChart(UserData);
  let TaskInfoBox = document.createElement("div");
  TaskInfoBox.classList.add("graph");
  TaskInfoBox.classList.add("taskgraph");
  TaskInfoBox.appendChild(taskGraph);
  GraphsBoxes.appendChild(TaskInfoBox);

  //XPperTime
  let XpPerTimeGraph = await DrawXpPerTimeChart(UserData);
  let XpPerTimeInfoBox = document.createElement("div");
  XpPerTimeInfoBox.classList.add("graph");
  XpPerTimeInfoBox.classList.add("xppertimegraph");
  XpPerTimeInfoBox.appendChild(XpPerTimeGraph);
  GraphsBoxes.appendChild(XpPerTimeInfoBox);
}

async function DrawUserInfo(UserData) {
  let UserInfoBox = document.createElement("div");
  let UserInfoText = document.createElement("p");
  UserInfoText.innerText =
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
  UserInfoBox.classList.add("col");
  UserInfoBox.appendChild(UserInfoText);
  return UserInfoBox;
}

async function DrawXPChart(UserData) {
  const LevelDifXp = UserData.xpTilNextLvl - UserData.xpTilCurrentLvl;
  const XpRemaining = UserData.xpTilNextLvl - UserData.xp;
  const XpGotten = LevelDifXp - XpRemaining;
  const XpGraph = document.createElement("canvas");
  const counterPlugin = {
    id: "counter",
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, right, bottom, left, width, height },
      } = chart;
      ctx.save();
      ctx.fillStyle = "rgb(50, 214, 21)";
      ctx.font = "30px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(UserData.level, width / 2, top + height / 2);
    },
  };
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
          cutout: "90%",
        },
      ],
    },
    plugins: [counterPlugin],
  });
  return XpGraph;
}

async function DrawTaskChart(UserData) {
  const Graph = document.createElement("canvas");
  Graph.id = "TaskGraph";
  const xlabels = [];
  const xp = [];
  UserData.tasks.forEach((task, index) => {
    if (index !== 0) {
      xlabels.push(task.name);
      xp.push(task.xp);
    }
  });

  new Chart(Graph, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Xp",
          data: xp,
          backgroundColor: "rgb(50, 214, 21)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Xp by task",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  });
  return Graph;
}

async function DrawXpPerTimeChart(UserData) {
  const Graph = document.createElement("canvas");
  Graph.id = "TaskGraph";
  const date = [];
  const xp = [];
  let xpadd = 0;
  UserData.tasks.forEach((task, index) => {
    if (index !== 0) {
      date.push(new Date(task.date).toLocaleString("en-GB"));
      xpadd = xpadd + task.xp;
      xp.push(xpadd);
    }
  });

  new Chart(Graph, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Xp",
          data: xp,
          backgroundColor: "rgb(50, 214, 21)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Xp by time",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  });
  return Graph;
}

export function clearDivs() {
  let infoBoxes = document.getElementById("infoboxes");
  infoBoxes.innerHTML = "";
}
