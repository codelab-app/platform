import {
  ActionType,
  createCrudSlice,
  CRUDModalState,
} from '@codelab/frontend/view/components'
import { DefaultRootState } from 'react-redux'
import { AppFragment } from '../App.fragment.graphql.gen'

export type AppState = CRUDModalState<AppFragment>

export const intialState: CRUDModalState<AppFragment> = {
  actionType: ActionType.None,
  loading: false,
  deleteIds: [],
  updateId: '',
  entity: undefined,
}

export const appSlice = createCrudSlice('app', intialState, {})

// Action creators are generated for each case reducer function
export const appActions = appSlice.actions
export const appReducer = appSlice.reducer

export const selectApp = (rootState: DefaultRootState) => rootState.app
