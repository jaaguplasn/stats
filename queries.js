 export const query = `query {
    user(where: { id: {_eq: 541}}) {
        id
        login
    }

}`;
