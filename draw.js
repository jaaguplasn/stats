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
  let XpGraph = DrawXPChart(UserData);
  XpInfoBox.appendChild(XpGraph);
  InfoBoxes.appendChild(XpInfoBox);
}


function DrawXPChart(UserData) {
    let svg = document.createElement("svg");
    svg.setAttribute("viewBox", "0 00 36 36")
    let path = document.createElement("path");
    path.setAttribute("d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831")
    path.setAttribute("fill", "none")
    path.setAttribute("stroke", "#444")
    path.setAttribute("stroke-width","1")
    let from = UserData.nextLvlXp - UserData.xp
    let to = UserData.nextLvlXp - UserData.lastLvlXp
    path.setAttribute("stroke-dasharray",`${from}, ${to}`)
    svg.appendChild(path)
    return svg
}


// function DrawXPChart(UserData) {
//   let XpGraph = document.createElement("canvas");
//   XpGraph.id = "XpGraph";
//   new Chart(XpGraph, {
//     type: "bar",
//     data: {
//       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//       datasets: [
//         {
//           label: "# of Votes",
//           data: [12, 19, 3, 5, 2, 3],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
//   return XpGraph;
// }
