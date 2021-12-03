import { AtomType } from '@codelab/frontend/abstract/codegen'
import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { HookFragment } from '../graphql'

export type HookState = CRUDModalState<HookFragment> & {
  selectedType?: AtomType
}

export type SetSelectedTypeAction = {
  selectedType: AtomType
}

const initialState: CRUDModalState<HookFragment> = {
  ...initialCrudState,
}

export const hookSlice = createCrudSlice('hook', initialState, {
  setSelectedType: (
    state: HookState,
    { payload }: PayloadAction<SetSelectedTypeAction>,
  ) => ({
    ...state,
    selectedType: payload.selectedType,
  }),
  resetSelectedType: (state: HookState) => ({
    ...state,
    selectedType: undefined,
  }),
})

export const hookActions = hookSlice.actions
export const hookReducer = hookSlice.reducer

export const selectHook = (rootState: DefaultRootState) => rootState.hook
