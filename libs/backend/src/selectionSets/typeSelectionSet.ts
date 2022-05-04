import { userSelectionSet } from './userSelectionSet'

const baseSelection = `
  __typename
  id
  kind
  name
  owner
    ${userSelectionSet}
`

export const primitiveTypeSelectionSet = `{
  ${baseSelection}
  primitiveKind
}`

export const enumTypeSelectionSet = `{
  ${baseSelection}
  allowedValues {
    id
    name
    value
  }
}`

// export const interfaceTypeSelectionSet = `{
//   ${baseSelection}
// }`

export const interfaceTypeSelectionSet = `{
  ${baseSelection}
  fieldsConnection {
    edges {
      id
      key
      name
      description
      node {
        ${baseSelection}
      }
    }
  }
}`
