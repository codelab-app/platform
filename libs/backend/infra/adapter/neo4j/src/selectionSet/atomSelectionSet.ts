import { exportTagSelectionSet, tagSelectionSet } from './tagSelectionSet'
import {
  exportInterfaceTypeSelectionSet,
  interfaceTypeSelectionSet,
} from './typeSelectionSet'
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
  allowedChildren {
    id
    name
    type
  }
}`

export const exportAtomSelectionSet = `{
  id
  name
  type
  api
    ${exportInterfaceTypeSelectionSet}
  icon

  tags
    ${exportTagSelectionSet}
  allowedChildren {
    id
    name
    type
  }
}`
