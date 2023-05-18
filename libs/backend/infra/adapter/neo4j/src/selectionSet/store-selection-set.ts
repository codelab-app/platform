import { actionSelectionSet } from './action-selection-set'
import { interfaceTypeSelectionSet } from './type-selection-set'

export const storeSelectionSet = `
  id
  name
  api
    ${interfaceTypeSelectionSet}
  actions
    ${actionSelectionSet}
`
