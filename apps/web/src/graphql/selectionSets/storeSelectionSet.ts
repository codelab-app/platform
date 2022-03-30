export const storeSelectionSet = `{ 
    id
    name
    state {
      id
      name
    }
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
