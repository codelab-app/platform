import { storeSelectionSet } from './store-selection-set'

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
