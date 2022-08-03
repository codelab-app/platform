import { actionSelectionProperties } from '@codelab/backend'

export const exportResourceActionSelectionSet = `
 {
  ${actionSelectionProperties}
  successAction {
    id
  }
  errorAction {
    id
  }
  resource {
    id
  }
  config {
    data
    id
  }
 }
`

const edgeSelectionProperties = `
  orders
  node {
    ... on CustomAction {
      id
    }
    ... on ResourceAction {
      id
    }
    ... on PipelineAction {
      id
    }
  }
`

export const exportPipelineActionSelectionSet = `
 {
  ${actionSelectionProperties}
  actionsConnection {
    edges {
      ${edgeSelectionProperties}
    }
  }
 }
`
