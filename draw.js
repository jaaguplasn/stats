import { getInfo } from "./info";

export async function Draw(username, id) {
  let userData = await getInfo(username, id);
  console.log(userData);
}
