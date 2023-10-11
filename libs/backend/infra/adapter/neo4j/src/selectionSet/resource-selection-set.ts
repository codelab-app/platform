import { propSelectionSet } from './prop-selection-set'

export const resourceSelectionSet = `
  id
  type
  name
  config {
    ${propSelectionSet}
  }
`
