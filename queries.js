 
 //query id
 export const LoginQuery = `
 query login($login: String){
   user(where: { login: { _eq: $login }}) {
     id
     login
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
}`
