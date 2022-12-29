import { queryAPI } from "./queryAPI.js";
import { query, LevelQuery } from "./queries.js";
let data = await queryAPI(LevelQuery, {id: "541"});
console.log(data)