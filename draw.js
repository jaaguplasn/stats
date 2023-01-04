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
  XpGraph = document.createElement("CANVAS");
  XpGraph.id = "XpGraph";
  XpInfoBox.appendChild(XpGraph);
  InfoBoxes.appendChild(XpInfoBox);
}
