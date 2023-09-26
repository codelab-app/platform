import { actionSelectionSet } from './action-selection-set'
import { exportInterfaceTypeWithFieldsSelectionSet } from './type-selection-set'

export const storeSelectionSet = `
  id
  name
  api {
    id
  }
  actions ${actionSelectionSet}
`

export const exportStoreSelectionSet = `
  id
  name
  api {
    ${exportInterfaceTypeWithFieldsSelectionSet}
  }
  actions ${actionSelectionSet}
`
