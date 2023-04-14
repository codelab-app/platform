import { storeSelectionSet } from './storeSelectionSet'

export const pageSelectionSet = `{
  app {
    id
  }
  id
  name
  slug
  kind
  rootElement {
    id
    name
  }
  pageContentContainer {
    id
    name
  }
  store {
    ${storeSelectionSet}
  }
  url
}`
