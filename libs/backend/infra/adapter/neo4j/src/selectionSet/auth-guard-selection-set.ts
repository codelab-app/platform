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
  redirect {
    ... on Page {
      __typename
      url
    }
    ... on Url {
      __typename
      url
    }
  }
`
