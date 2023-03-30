import { propSelectionSet } from './propSelectionSet'
import { storeSelectionSet } from './storeSelectionSet'
import { interfaceTypeSelectionSet } from './typeSelectionSet'

export const componentSelectionSet = `{
  id
  name
  rootElement {
    id
    name
  }
  owner {
    id
    auth0Id
  }
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
