import { exportTagSelectionSet, tagSelectionSet } from './tagSelectionSet'
import { interfaceTypeSelectionSet } from './typeSelectionSet'
import { ownerFieldSelectionSet } from './userSelectionSet'

export const atomSelectionSet = `{
  id
  name
  type
  api
    ${interfaceTypeSelectionSet}
  icon
  ${ownerFieldSelectionSet}
  tags
    ${tagSelectionSet}
  suggestedChildren {
    id
    name
    type
  }
  requiredParents {
    id
    name
    type
  }
}`

export const exportAtomSelectionSet = `{
  id
  name
  type
  api {
    id
  }
  icon
  tags
    ${exportTagSelectionSet}
  suggestedChildren {
    id
    name
    type
  }
  requiredParents {
    id
    name
    type
  }
}`
