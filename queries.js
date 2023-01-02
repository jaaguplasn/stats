import { queryAPI } from "./queryAPI.js";

//query id
export async function LoginQuery(username) {
  const data = await queryAPI(
    `
 query login($login: String){
   user(where: { login: { _eq: $login }}
    limit: 1
    offset: 0) {
     id
   }
 }
`,
    { login: username }
  );
  return data.data.user[0];
}
//query level and task with id and loginname

export const LevelAndTaskQuery = `query LevelAndTasks($id: Int, $login: String) {
  transaction(
    where: {userId: {_eq: $id}, type: {_eq: "level"}}
    limit: 1
    offset: 0
    order_by: {amount: desc}
  ) {
    amount
  }
  progress(
    order_by: {updatedAt: asc}
    where: {path: {_regex: "div-01/(?!(piscine-js|piscine-js-2)/|piscine-go|rust/)"}, user: {login: {_eq: $login}}, isDone: {_eq: true}}
    offset: 0
  ) {
    object {
      name
    }
    updatedAt
    path
  }
}`;

//query  task xp
export const XpQuery = `query xp($login: String!, $task: String!) {
  transaction(
    limit: 1
    where: {user: {login: {_eq: $login}}, object: {name: {_eq: $task}}, type: {_eq: "xp"}}
    order_by: {amount: desc_nulls_last}
  ) {
    amount
  }
}`;
