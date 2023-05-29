import { ownerFieldSelectionSet } from './user-selection-set'

export const baseAppSelectionSet = `
  __typename
  id
  name
  slug
  domains {
    id
    name
    app {
      id
    }
  }
`

export const appSelectionSet = `{
  ${baseAppSelectionSet}
  ${ownerFieldSelectionSet}
}`

export const exportAppSelectionSet = `{
  ${baseAppSelectionSet}

}`
