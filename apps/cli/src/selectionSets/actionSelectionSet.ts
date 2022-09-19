import { actionSelectionProperties } from '@codelab/backend/adapter/neo4j'

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
  }
`
