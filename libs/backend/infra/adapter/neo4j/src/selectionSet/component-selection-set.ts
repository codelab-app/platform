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

export const componentSelectionSet = `{
  id
  name
  rootElement
    ${elementSelectionSet}
  ${ownerFieldSelectionSet}
  props
    ${propSelectionSet}
  store {
    ${storeSelectionSet}
  }
  api
    ${interfaceTypeSelectionSet}
  childrenContainerElement {
    id
  }
  keyGenerator
}`

export const exportComponentSelectionSet = `{
  id
  name
  rootElement
    ${exportElementSelectionSet}
  props
    ${propSelectionSet}
  store {
    ${exportStoreSelectionSet}
  }
  api
    ${exportInterfaceTypeWithFieldsSelectionSet}
  childrenContainerElement {
    id
  }
  keyGenerator
}`
