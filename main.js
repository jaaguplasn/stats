import {getInfo } from "./info.js"
import { LoginQuery } from "./queries.js"

const User = "jaaguplasn"

const btn = document.querySelector('.search-btn')
.addEventListener("click", async(event) => {
  event.preventDefault()
  let username = document.getElementById("searchInput").value
  let userId = await LoginQuery(username); //only for seeing if user exists
  if (userId == undefined) {
    console.log("username does not exist")
  } else {
    console.log("username and id are: ", username, " ", userId)
    let info = await getInfo(username, userId)
    console.log(info)
  }
})

