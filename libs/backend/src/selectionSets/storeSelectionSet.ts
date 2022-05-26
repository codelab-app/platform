import { actionSelectionSet } from './actionSelectionSet'
import { resourceSelectionSet } from './resourceSelectionSet'

export const storeSelectionSet = `{
  id
  name
  stateApi { id }
  state { 
    id
    data
  }
  parentStore {
    id
    name
  }
  actions {
    ${actionSelectionSet}
  }
  resources {
    ${resourceSelectionSet}
  }
}`
