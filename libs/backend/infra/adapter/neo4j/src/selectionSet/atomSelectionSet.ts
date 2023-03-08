import { tagSelectionSet } from './tagSelectionSet'
import { interfaceTypeSelectionSet } from './typeSelectionSet'

export const atomSelectionSet = `{
  id
  name
  type
  api
    ${interfaceTypeSelectionSet}
  icon
  owner {
    auth0Id
  }
  tags
    ${tagSelectionSet}
  allowedChildren {
    id
    name
    type
  }
}`
