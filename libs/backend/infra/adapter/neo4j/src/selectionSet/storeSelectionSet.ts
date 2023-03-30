import { actionSelectionSet } from './actionSelectionSet'
import { interfaceTypeSelectionSet } from './typeSelectionSet'

export const storeSelectionSet = `
  id
  name
  api
    ${interfaceTypeSelectionSet}
  actions
    ${actionSelectionSet}
`
