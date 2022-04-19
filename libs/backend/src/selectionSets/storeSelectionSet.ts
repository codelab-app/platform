export const storeSelectionSet = `{
  id
  name
  state {
    id
    name
  }
  initialState
  parentStore {
    id
    name
  }
  parentStoreConnection {
    edges {
      storeKey
    }
  }
  actions {
    id
    name
    body
    store {
      id
      name
    }
  }
}`
