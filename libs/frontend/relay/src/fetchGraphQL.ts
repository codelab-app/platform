export const fetchGraphQL = async (text: string, variables: any) => {
  const relayEndpoint = process.env.NEXT_PUBLIC_URL_PROXY_RELAY

  if (!relayEndpoint) {
    throw new Error('Missing NEXT_PUBLIC_URL_PROXY_RELAY')
  }

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch(relayEndpoint, {
    method: 'POST',
    // headers: {
    //   Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })

  // Get the response as JSON
  return await response.json()
}
