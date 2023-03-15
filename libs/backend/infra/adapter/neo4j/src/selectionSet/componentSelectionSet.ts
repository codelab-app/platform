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
  api
    ${interfaceTypeSelectionSet}
  childrenContainerElement {
    id
  }
}`
