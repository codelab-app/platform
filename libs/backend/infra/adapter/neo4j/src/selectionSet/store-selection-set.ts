import { actionSelectionSet } from './action-selection-set'
import {
  exportInterfaceTypeWithFieldsSelectionSet,
  interfaceTypeSelectionSet,
} from './type-selection-set'

export const storeSelectionSet = `
  id
  name
  api
    ${interfaceTypeSelectionSet}
  actions
    ${actionSelectionSet}
`

export const exportStoreSelectionSet = `
  id
  name
  api
    ${exportInterfaceTypeWithFieldsSelectionSet}
  actions
    ${actionSelectionSet}
`
