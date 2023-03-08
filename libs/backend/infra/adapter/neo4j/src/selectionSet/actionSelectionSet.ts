export const actionSelectionProperties = `
  id
  name
  type
`

export const codeActionSelectionSet = `{
  ${actionSelectionProperties}
  code
}`

const edgeSelectionProperties = `
  ... on CodeAction {
    id
  }
  ... on ApiAction {
    id
  }
`

export const exportApiActionSelectionSet = `{
  ${actionSelectionProperties}
  successAction {
    ${edgeSelectionProperties}
  }
  errorAction {
    ${edgeSelectionProperties}
  }
  resource {
    id
  }
  config {
    data
    id
  }
}`
