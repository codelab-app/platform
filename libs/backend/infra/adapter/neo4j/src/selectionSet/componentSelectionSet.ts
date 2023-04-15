import { propSelectionSet } from './propSelectionSet'
import { storeSelectionSet } from './storeSelectionSet'
import { interfaceTypeSelectionSet } from './typeSelectionSet'
import { ownerFieldSelectionSet } from './userSelectionSet'

export const componentSelectionSet = `{
  id
  name
  rootElement {
    id
    name
  }
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
}`
