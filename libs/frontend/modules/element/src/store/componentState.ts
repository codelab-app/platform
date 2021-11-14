import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { DefaultRootState } from 'react-redux'

export type ComponentState = CRUDModalState<never>

const initialState: CRUDModalState<never> = {
  ...initialCrudState,
}

export const componentSlice = createCrudSlice('component', initialState, {})

export const componentActions = componentSlice.actions
export const componentReducer = componentSlice.reducer

export const selectComponent = (rootState: DefaultRootState) =>
  rootState.component
