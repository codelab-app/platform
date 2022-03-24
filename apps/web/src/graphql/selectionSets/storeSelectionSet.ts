export const storeSelectionSet = `{ 
    id
    name
    state {
      name
      type
      defaultValue
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
