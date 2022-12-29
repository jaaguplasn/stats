 export const query = `query {
    user(where: { id: {_eq: 541}}) {
        id
        login
    }

}`;

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