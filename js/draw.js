import { getInfo } from "./info.js";
google.charts.load("current", { packages: ["corechart", "line"] });
export async function Draw(username, id) {
  let UserData = await getInfo(username, id);
  console.log(UserData);
  let InfoBoxes = document.getElementById("infoboxes");
  let row = document.createElement("div");
  row.classList.add("userinfobox");
  row.classList.add("border");

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
  UserInfoBox.classList.add("userdata");
  row.appendChild(UserInfoBox);
  //graphs
  let GraphsBox = document.createElement("div");
  GraphsBox.classList.add("list-group");
  //TASKinfo
  let taskGraph = await DrawTaskChart(UserData);
  let TaskInfoBox = document.createElement("div");
  TaskInfoBox.classList.add("graph");
  TaskInfoBox.classList.add("taskgraph");
  TaskInfoBox.classList.add("mb-2");
  TaskInfoBox.classList.add("list-group-item");
  TaskInfoBox.appendChild(taskGraph);
  GraphsBox.appendChild(TaskInfoBox);

  //XPperTime
  let XpPerTimeGraph = await DrawXpPerTimeChart(UserData);
  let XpPerTimeInfoBox = document.createElement("div");
  XpPerTimeInfoBox.classList.add("graph");
  XpPerTimeInfoBox.classList.add("xppertimegraph");
  XpPerTimeInfoBox.classList.add("list-group-item");
  XpPerTimeInfoBox.classList.add("mb-2");
  XpPerTimeInfoBox.appendChild(XpPerTimeGraph);
  GraphsBox.appendChild(XpPerTimeInfoBox);
  InfoBoxes.appendChild(GraphsBox);
  svgTaskChart(UserData);
  svgXpChart(UserData);
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
      ctx.font = "15px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Level " + UserData.level, width / 2, top + height / 2);
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
    type: "bar",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Xp",
          data: xp,
          backgroundColor: "rgba(50, 214, 21, 0.2)",
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
          backgroundColor: "rgba(50, 214, 21, 0.2)",
          borderWidth: 1,
          fill: true,
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

//svg test
async function svgTaskChart(UserData) {
  //data
  let dataForGraph = new Array(UserData.tasks.length);
  for (let i = 0; i < UserData.tasks.length; i++) {
    dataForGraph[i] = [UserData.tasks[i].name, UserData.tasks[i].xp];
  }
  dataForGraph.shift();
  let data = new google.visualization.DataTable();
  data.addColumn("string", "TaskName");
  data.addColumn("number", "XP");
  data.addRows(dataForGraph);

  let options = {
    animation: {
      startup: true,
      duration: 2500,
      easing: "out",
    },
    title: "XP per task",
    hAxis: {
      title: "Xp",
    },
    vAxis: {
      title: "Task Name ",
    },
  };

  var chart = new google.visualization.BarChart(
    document.getElementById("TaskChartSvg")
  );
  chart.draw(data, options);
}

async function svgXpChart(UserData) {
  //data
  let cumXp = 0;
  let dataForGraph = new Array(UserData.tasks.length);
  for (let i = 0; i < UserData.tasks.length; i++) {
    if (i === 0) {
      dataForGraph[i] = [0, 0];
    } else {
      console.log(cumXp);
      console.log(UserData.tasks[i].xp);
      cumXp = cumXp + parseInt(UserData.tasks[i].xp);
      dataForGraph[i] = [new Date(UserData.tasks[i].date), cumXp];
    }
  }
  dataForGraph.shift();
  console.log(dataForGraph);

  let data = new google.visualization.DataTable();
  data.addColumn("date", "X");
  data.addColumn("number", "XP");
  data.addRows(dataForGraph);

  let options = {
    animation: {
      startup: true,
      duration: 2500,
      easing: "out",
    },
    title: "XP over time",
    hAxis: {
      title: "Xp",
    },
    vAxis: {
      title: "Task Name ",
    },
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("XpChartSvg")
  );
  chart.draw(data, options);
}

export function clearDivs() {
  let infoBoxes = document.getElementById("infoboxes");
  infoBoxes.innerHTML = "";
}
