import { tagSelectionSet } from './tagSelectionSet'

export const atomSelectionSet = `{
  id
  name
  type
  api {
    id
    name
  }
  icon
  tags ${tagSelectionSet}
  allowedChildren {
    id
    name
    type
  }
}`
