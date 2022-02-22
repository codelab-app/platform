import { CRUDModalState } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { DefaultRootState } from 'react-redux'

export type PropMapBindingState = CRUDModalState<IPropMapBinding>

const initialState: CRUDModalState<IPropMapBinding> = initialCrudState

export const propMapBindingSlice = createCrudSlice(
  'propMapBinding',
  initialState,
  {},
)

export const propMapBindingActions = propMapBindingSlice.actions
export const propMapBindingReducer = propMapBindingSlice.reducer

export const selectPropMapBinding = (rootState: DefaultRootState) =>
  rootState.propMapBinding
