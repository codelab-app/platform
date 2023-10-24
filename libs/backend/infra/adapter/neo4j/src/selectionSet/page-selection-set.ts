import { authGuardSelectionSet } from './auth-guard-selection-set'
import { redirectSelectionSet } from './redirect-selection-set'
import {
  exportStoreSelectionSet,
  storeSelectionSet,
} from './store-selection-set'

const pageAuthGuardSelectionSet = `
{
  id
  authGuard {
    ${authGuardSelectionSet}
  }
  redirect {
    ${redirectSelectionSet}
  }
}
`

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
  pageContentContainer {
    id
    name
  }
  authGuard {
    ${pageAuthGuardSelectionSet}
  }
  url
  _compoundName
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
