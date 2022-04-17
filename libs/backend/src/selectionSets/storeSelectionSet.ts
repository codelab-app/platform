export const storeSelectionSet = `{
  id
  name
  state {
    id
    name
    state {
      id
      name
    }
    localState
    parentStore {
      id
      name
    }
    resources {
      id
      name
      type
    }
    parentStoreConnection {
      edges {
          storeKey
      }
    }
    resourcesConnection {
      edges {
        node {
          id
        }
        resourceKey
      }
    }
    actions {
      id
      name
    }
  }
}`
