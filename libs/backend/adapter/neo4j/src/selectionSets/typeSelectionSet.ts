import { userSelectionSet } from './userSelectionSet'

/**
 * We omit user during export, since this creates a non-reproducible file if exported from different accounts
 */
const exportBaseSelection = `
  __typename
  id
  kind
  name
`

const baseSelection = `
  __typename
  id
  kind
  name
  owner
    ${userSelectionSet}
`

export const exportPrimitiveTypeSelectionSet = `{
  ${exportBaseSelection}
  primitiveKind
}`

export const exportReactNodeTypeSelectionSet = `{
  ${exportBaseSelection}
}`

export const exportRenderPropsTypeSelectionSet = `{
  ${exportBaseSelection}
}`

export const exportEnumTypeSelectionSet = `{
  ${exportBaseSelection}
  allowedValues {
    id
    name
    value
  }
}`

export const exportInterfaceTypeSelectionSet = `{
  ${exportBaseSelection}
  ownerConnection {
    edges {
      data
    }
  }
  fieldsConnection {
    edges {
      id
      key
      name
      description
      validationRules
      node {
        ${exportBaseSelection}
      }
    }
  }
}`

export const interfaceTypeSelectionSet = `{
  ${baseSelection}
  ownerConnection {
    edges {
      data
    }
  }
  fieldsConnection {
    edges {
      id
      key
      name
      description
      validationRules
      node {
        ${exportBaseSelection}
      }
    }
  }
}`
