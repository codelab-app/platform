const baseActionSelectionSet = `
  __typename
  id
  name
  type
`

const edgeSelectionProperties = `
  ... on CodeAction {
    id
    name
  }
  ... on ApiAction {
    id
    name
  }
`

export const apiActionSelectionSet = `
  ${baseActionSelectionSet}
  successAction 
    ${edgeSelectionProperties}
  errorAction 
    ${edgeSelectionProperties}
  resource {
    id
  }
  config {
    data
    id
  }
`

export const codeActionSelectionSet = `{
  ${baseActionSelectionSet}
  code
}`

export const actionSelectionSet = `
  {
    ... on CodeAction {
        ${codeActionSelectionSet}
      }
    ... on ApiAction {
        ${apiActionSelectionSet}
      }
  }
`

export const exportCodeActionSelectionSet = `{
  ${baseActionSelectionSet}
  code
}`

export const exportApiActionSelectionSet = `{
  ${baseActionSelectionSet}
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
