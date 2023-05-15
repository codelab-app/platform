import { elementSelectionSet } from './elementSelectionSet'
import { propSelectionSet } from './propSelectionSet'
import { storeSelectionSet } from './storeSelectionSet'
import { interfaceTypeSelectionSet } from './typeSelectionSet'
import { ownerFieldSelectionSet } from './userSelectionSet'

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
