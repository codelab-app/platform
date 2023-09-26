import { exportTagSelectionSet, tagSelectionSet } from './tag-selection-set'
import { interfaceTypeSelectionSet } from './type-selection-set'
import { ownerFieldSelectionSet } from './user-selection-set'

export const atomSelectionSet = `{
  __typename
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
  externalCssSource
  externalJsSource
  externalSourceType
}`

export const exportAtomSelectionSet = `{
  __typename
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
  externalCssSource
  externalJsSource
  externalSourceType
}`
