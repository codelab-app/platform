import { storeSelectionSet } from './storeSelectionSet'

export const appSelectionSet = `{
  __typename
  id
  name
  slug
  rootElement {
    id
  }
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
