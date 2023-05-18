import { exportTagSelectionSet, tagSelectionSet } from './tag-selection-set'
import { interfaceTypeSelectionSet } from './type-selection-set'
import { ownerFieldSelectionSet } from './user-selection-set'

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
