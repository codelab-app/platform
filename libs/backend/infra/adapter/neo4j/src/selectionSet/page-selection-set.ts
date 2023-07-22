import {
  exportStoreSelectionSet,
  storeSelectionSet,
} from './store-selection-set'

export const basePageSelectionSet = `
  app {
    id
    _compoundName
  }
  id
  _compoundName
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

export const pageSelectionSet = `{
  ${basePageSelectionSet}
  store {
    ${storeSelectionSet}
  }
}`

export const exportPageSelectionSet = `{
  ${basePageSelectionSet}
  store {
     ${exportStoreSelectionSet}
  }
}`
