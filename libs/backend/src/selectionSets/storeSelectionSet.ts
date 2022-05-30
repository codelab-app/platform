import { actionSelectionSet } from './actionSelectionSet'

export const storeSelectionSet = `
  id
  name
  stateApi { id }
  state { 
    id
    data
  }
  actions {
    ${actionSelectionSet}
  }
`
