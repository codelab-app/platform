import { CRUDModalState } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { DefaultRootState } from 'react-redux'
import { HookFragment } from '../graphql'
import { PropMapBindingFragment } from '../graphql/Element.fragment.graphql.gen'

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
