import { getInfo } from "./info.js";

export async function Draw(username, id) {
  let UserData = await getInfo(username, id);
  console.log(UserData);
  let InfoBoxes = document.getElementById("infoboxes");
  let row = document.createElement("div");

  //Xpinfo
  let col = document.createElement("div");
  let XpInfoBox = document.createElement("div");
  col.classList.add("graph");
  col.classList.add("xpgraph");
  let XpGraph = await DrawXPChart(UserData);
  col.appendChild(XpGraph);

  //TOTAL XP INFO
  let totalXpP = document.createElement("p");
  totalXpP.innerText = `TotalXp: ${UserData.xp}`;
  col.appendChild(totalXpP);
  row.appendChild(col);
  InfoBoxes.appendChild(row);

  //Userinfo
  let UserInfoBox = await DrawUserInfo(UserData);
  row.appendChild(UserInfoBox);
  //graphs
  let GraphsBox = document.createElement("div");
  GraphsBox.classList.add("list-group");
  //TASKinfo
  let taskGraph = await DrawTaskChart(UserData);
  let TaskInfoBox = document.createElement("div");
  TaskInfoBox.classList.add("graph");
  TaskInfoBox.classList.add("taskgraph");
  TaskInfoBox.classList.add("list-group-item");
  TaskInfoBox.appendChild(taskGraph);
  GraphsBox.appendChild(TaskInfoBox);

  //XPperTime
  let XpPerTimeGraph = await DrawXpPerTimeChart(UserData);
  let XpPerTimeInfoBox = document.createElement("div");
  XpPerTimeInfoBox.classList.add("graph");
  XpPerTimeInfoBox.classList.add("xppertimegraph");
  XpPerTimeInfoBox.classList.add("list-group-item");
  XpPerTimeInfoBox.appendChild(XpPerTimeGraph);
  GraphsBox.appendChild(XpPerTimeInfoBox);
  InfoBoxes.appendChild(GraphsBox);
}

async function DrawUserInfo(UserData) {
  let UserInfoBox = document.createElement("div");
  let UserInfoText = document.createElement("p");
  UserInfoText.innerText =
    UserData.username +
    " #" +
    UserData.id +
    "\n" +
    "Audit Ratio: " +
    UserData.auditInfo.auditRatio;
  UserInfoBox.appendChild(UserInfoText);
  return UserInfoBox;
}

async function DrawXPChart(UserData) {
  const LevelDifXp = UserData.xpNextLvl - UserData.xpCurrentLvl;
  const XpRemaining = UserData.xpNextLvl - UserData.xp;
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
      ctx.fillText("Level" + UserData.level, width / 2, top + height / 2);
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
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
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
  Graph.id = "XpPerTimeGraph";
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
