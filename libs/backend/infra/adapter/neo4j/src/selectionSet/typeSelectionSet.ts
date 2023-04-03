import { fieldSelectionSet } from './fieldSelectionSet'
import { userSelectionSet } from './userSelectionSet'

/**
 * We omit user during export, since this creates a non-reproducible file if exported from different accounts
 */
const exportBaseTypeSelection = `
  __typename
  id
  kind
  name
`

export const baseTypeSelection = `
  __typename
  id
  kind
  name
  owner
    ${userSelectionSet}
`

export const exportPrimitiveTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  primitiveKind
}`

export const exportReactNodeTypeSelectionSet = `{
  ${exportBaseTypeSelection}
}`

export const exportRenderPropsTypeSelectionSet = `{
  ${exportBaseTypeSelection}
}`

export const exportActionTypeSelectionSet = `{
  ${exportBaseTypeSelection}
}`

export const exportArrayTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  itemType {
    id
    kind
  }
}`

export const exportEnumTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  allowedValues {
    id
    key
    value
  }
}`

export const exportInterfaceTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  fields {
    id
  }
}`

export const exportUnionTypeSelectionSet = `{
  ${exportBaseTypeSelection}
  descendantTypesIds
}`

export const interfaceTypeSelectionSet = `{
  ${baseTypeSelection}
  fields
    ${fieldSelectionSet}
}`
