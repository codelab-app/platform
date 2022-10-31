import { actionSelectionProperties } from '@codelab/backend/infra/adapter/neo4j'

const edgeSelectionProperties = `
    ... on CodeAction {
      id
    }
    ... on ApiAction {
      id
    }  
`

export const exportApiActionSelectionSet = `
 {
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
 }
`
