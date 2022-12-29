import { queryAPI } from "./queryAPI.js";
import { query, LevelQuery } from "./queries.js";

let info = {
    id: null,
    level: null,
    xp: null
}
let data = await queryAPI(LevelQuery, {id: "541"});
console.log(data[data])