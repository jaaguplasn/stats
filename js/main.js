import { Draw } from "./draw.js";
import { LoginQuery } from "./queries.js";
import { clearItems } from "./utils.js";

const User = "jaaguplasn";

//magic
const btn = document
  .querySelector(".search-btn")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    clearItems();
    let username = document.getElementById("searchInput").value;
    let userId = await LoginQuery(username); //only for seeing if user exists
    if (userId == undefined) {
      alert("username does not exist");
    } else {
      activateLoading();
      await Draw(username, userId.id);
      deactivateLoading();
    }
  });

//on page load start magic with default user
window.addEventListener("load", function () {
  document.querySelector("#searchInput").value = User;
  document.querySelector(".search-btn").click();
});

//showing load icon
const activateLoading = () => {
  let loader = document.querySelector(".loader");
  loader.style.visibility = "visible";
};

const deactivateLoading = () => {
  let loader = document.querySelector(".loader");

  loader.style.visibility = "hidden";
};
