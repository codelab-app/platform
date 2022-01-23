import {
  CRUDActionType,
  ExecuteCommandActionType,
} from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { AdminState } from './types'

const initialState: AdminState = {
  ...initialCrudState,
  actionType: CRUDActionType.None,
}

export const adminSlice = createCrudSlice('admin', initialState, {
  openExecuteCommandModal: (state) => ({
    ...state,
    actionType: ExecuteCommandActionType.Execute,
  }),
})
