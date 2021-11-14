import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { DefaultRootState } from 'react-redux'
import { HookFragment, PropMapBindingFragment } from '../graphql'

export type PropMapBindingState = CRUDModalState<PropMapBindingFragment>

const initialState: CRUDModalState<HookFragment> = {
  ...initialCrudState,
}

export const propMapBindingSlice = createCrudSlice(
  'propMapBinding',
  initialState,
  {},
)

export const propMapBindingActions = propMapBindingSlice.actions
export const propMapBindingReducer = propMapBindingSlice.reducer

export const selectPropMapBinding = (rootState: DefaultRootState) =>
  rootState.propMapBinding
