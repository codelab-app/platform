import { fieldSelectionSet } from './field-selection-set'
import { ownerFieldSelectionSet } from './user-selection-set'

export const baseTypeSelection = `
  __typename
  id
  kind
  name
  ${ownerFieldSelectionSet}
`

export const primitiveTypeSelectionSet = `
  ${baseTypeSelection}
  primitiveKind
`

export const codeMirrorTypeSelectionSet = `
  ${baseTypeSelection}
  language
`

export const arrayTypeSelectionSet = `
  ${baseTypeSelection}
  itemType {
    ... on IBaseType {
      ${baseTypeSelection}
    }
  }
`

export const enumTypeSelectionSet = `
  ${baseTypeSelection}
  allowedValues {
    id
    key
    value
  }
`

export const unionTypeSelectionSet = `
  ${baseTypeSelection}
  typesOfUnionType {
    ... on IBaseType {
      ${baseTypeSelection}
    }
  }
`

export const interfaceTypeSelectionSet = `
  ${baseTypeSelection}
  fields {
    ${fieldSelectionSet}
  }
`
