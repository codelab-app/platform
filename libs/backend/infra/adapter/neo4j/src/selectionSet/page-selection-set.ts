import {
  exportStoreSelectionSet,
  storeSelectionSet,
} from './store-selection-set'

export const basePageSelectionSet = `
  app {
    id
    name
    _compoundName
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
  getServerSideProps
  pageContentContainer {
    id
    name
  }
  url
  _compoundName
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
