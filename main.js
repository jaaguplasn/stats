import {getInfo } from "./info.js"
import { LoginQuery } from "./queries.js"

const User = "jaaguplasn"

const btn = document.querySelector('.search-btn')
.addEventListener("click", async(_) => {

  let userId = await LoginQuery(document.getElementById("searchInput").value);
  if (userId == undefined) {
    console.log("username does not exist")
  } else {
    console.log("do magic")
  }
})




//let info = await getInfo()

//console.log(info)
