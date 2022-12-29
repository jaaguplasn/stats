export async function queryAPI(query, variables = {}) {
  try {
    let response =  await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    console.log(response);
    if (!response.ok) throw Error("Couldn't fetch data from API");
    let data = await response.json();
  } catch (e) {
    alert(e);
  }
}
