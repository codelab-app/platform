import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { DefaultRootState } from 'react-redux'
import { HookFragment } from '../graphql'

export type HookState = CRUDModalState<HookFragment>

const initialState: CRUDModalState<HookFragment> = {
  ...initialCrudState,
}

export const hookSlice = createCrudSlice('hook', initialState, {})

export const hookActions = hookSlice.actions
export const hookReducer = hookSlice.reducer

export const selectHook = (rootState: DefaultRootState) => rootState.hook
