import { storeSelectionSet } from './storeSelectionSet'

export const appSelectionSet = `{
  __typename
  id
  name
  slug
  store {
    ${storeSelectionSet}
  }
  domains {
    id
    name
    app {
      id
    }
  }
}`
