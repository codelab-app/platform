export const appSelectionSet = `{
  __typename
  id
  name
  slug
  owner {
    auth0Id
  }
  domains {
    id
    name
    app {
      id
    }
  }
}`
