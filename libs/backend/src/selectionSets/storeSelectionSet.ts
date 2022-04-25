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
      operations {
        id
        name
        runOnInit
        config
      }
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
