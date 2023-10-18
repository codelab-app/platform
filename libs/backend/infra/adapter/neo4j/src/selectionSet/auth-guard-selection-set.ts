import { propSelectionSet } from './prop-selection-set'
import { resourceSelectionSet } from './resource-selection-set'

export const authGuardSelectionSet = `
  id
  name
  responseTransformer
  config {
    ${propSelectionSet}
  }
  resource {
    ${resourceSelectionSet}
  }
`
