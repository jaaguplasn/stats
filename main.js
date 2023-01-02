import { getInfo } from "./info.js";
import { LoginQuery } from "./queries.js";


const User = "jaaguplasn";

//magic
const btn = document
  .querySelector(".search-btn")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    let username = document.getElementById("searchInput").value;
    let userId = await LoginQuery(username); //only for seeing if user exists
    if (userId == undefined) {
      console.log("username does not exist");
    } else {
      activateLoading();
      let info = await getInfo(username, userId.id);
      console.log(info);
      deactivateLoading();
      //insert magic here
    }
  });

//on page load start magic with default user
window.addEventListener("load", function () {
  console.log("AUTOCLICKING BUTTON");
  document.querySelector("#searchInput").value = User;
  document.querySelector(".search-btn").click();
});

//showing load icon
const activateLoading=()=>{
  let loader = document.getElementsByClassName("spinner-frame")
  
      loader.setAttribute("visibility", "visible")
  }
  
  const deactivateLoading=()=>{
      let loader = document.getElementsByClassName("spinner-frame")
      
          loader.setAttribute("visibility", "hidden")
      }
  