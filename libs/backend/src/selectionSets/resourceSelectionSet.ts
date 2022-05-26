import { operationSelectionSet } from './operationSelectionSet'

export const resourceSelectionSet = `{ 
  id
  type
  name
  config {
    id
    data
  }
  operations {
    ${operationSelectionSet}
  }
}
`
