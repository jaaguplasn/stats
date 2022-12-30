//query id
export const LoginQuery = `
 query login($login: String){
   user(where: { login: { _eq: $login }}
    limit: 1
    offset: 0) {
     id
   }
 }
`;
//query level with id
export const LevelQuery = `query level($id: Int)
{
  transaction( where: {userId: {_eq: $id}, type: {_eq: "level"}}
    limit: 1
    offset: 0
    order_by: {amount: desc}
  ) {
    amount
  }
}`;

//query all tasks
export const TaskQuery = `query tasks($login: String!) {
  progress(
    order_by: {updatedAt: asc}
    where: {path: {_regex: "div-01/(?!piscine-js-2/|piscine-go|rust/)"}, user: {login: {_eq: $login}}, isDone: {_eq: true}}
 offset: 0 ) {
    object {
      name
    }
    updatedAt
  path
  }
}`;

//query  task xp
export const xpQuery = `query xp($login: String!, $task: String!) {
  transaction(
    limit: 1
    where: {user: {login: {_eq: $login}}, object: {name: {_eq: $task}}, type: {_eq: "xp"}}
    order_by: {amount: desc_nulls_last}
  ) {
    amount
  }
}`;
