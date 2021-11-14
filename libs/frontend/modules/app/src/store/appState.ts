import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { createSelector } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { AppFragment } from '../graphql/App.fragment.graphql.gen'

export type AppState = CRUDModalState<AppFragment>

export const initialState: CRUDModalState<AppFragment> = {
  ...initialCrudState,
}

export const appSlice = createCrudSlice('app', initialState, {})

// Action creators are generated for each case reducer function
export const appActions = appSlice.actions
export const appReducer = appSlice.reducer

export const selectApp = (rootState: DefaultRootState) => rootState.app

export const appSelectors = {
  actionType: createSelector(selectApp, (s) => s.actionType),
  deleteIds: createSelector(selectApp, (s) => s.deleteIds),
  updateId: createSelector(selectApp, (s) => s.updateId),
  appName: createSelector(selectApp, (s) => s.entity?.name),
  entity: createSelector(selectApp, (s) => s.entity),
}
