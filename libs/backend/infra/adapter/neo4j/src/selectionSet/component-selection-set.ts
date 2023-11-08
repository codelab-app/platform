import {
  elementSelectionSet,
  exportElementSelectionSet,
} from './element-selection-set'
import { propSelectionSet } from './prop-selection-set'
import {
  exportStoreSelectionSet,
  storeSelectionSet,
} from './store-selection-set'
import {
  exportInterfaceTypeWithFieldsSelectionSet,
  interfaceTypeSelectionSet,
} from './type-selection-set'
import { ownerFieldSelectionSet } from './user-selection-set'

export const componentSelectionSet = `
  __typename
  id
  name
  ${ownerFieldSelectionSet}
  rootElement {
    ${elementSelectionSet}
  }
  props {
    ${propSelectionSet}
  }
  store {
    ${storeSelectionSet}
  }
  api {
    ${interfaceTypeSelectionSet}
  }
  childrenContainerElement {
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
  childrenContainerElement {
    id
  }
`
