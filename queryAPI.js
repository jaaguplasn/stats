export async function queryAPI(query, variables = {}) {
  fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data[data]);
    });
}
