import {
  exportStoreSelectionSet,
  storeSelectionSet,
} from './store-selection-set'

export const basePageSelectionSet = `
  app {
    id
    name
    owner {
      auth0Id
    }
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
  url
`

export const pageSelectionSet = `
  ${basePageSelectionSet}
  store {
    ${storeSelectionSet}
  }
`

export const exportPageSelectionSet = `
  ${basePageSelectionSet}
  store {
     ${exportStoreSelectionSet}
  }
`
