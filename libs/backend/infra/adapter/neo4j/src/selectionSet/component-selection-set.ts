import { exportElementSelectionSet } from './element-selection-set'
import { propSelectionSet } from './prop-selection-set'
import { exportStoreSelectionSet } from './store-selection-set'
import { exportInterfaceTypeWithFieldsSelectionSet } from './type-selection-set'
import { ownerFieldSelectionSet } from './user-selection-set'

export const componentSelectionSet = `
  __typename
  id
  name
  ${ownerFieldSelectionSet}
  rootElement {
    id
  }
  props {
    ${propSelectionSet}
  }
  store {
    id
  }
  api {
    id
  }
`

export const exportComponentSelectionSet = `
  __typename
  id
  name
  rootElement {
    ${exportElementSelectionSet}
  }
  props {
    ${propSelectionSet}
  }
  store {
    ${exportStoreSelectionSet}
  }
  api {
    ${exportInterfaceTypeWithFieldsSelectionSet}
  }
`
