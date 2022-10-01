import { actionSelectionProperties } from '@codelab/backend/infra/adapter/neo4j'

export const exportApiActionSelectionSet = `
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
    ... on CodeAction {
      id
    }
    ... on ApiAction {
      id
    }
  }
`
