import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { DefaultRootState } from 'react-redux'
import { ElementFragment } from '../../graphql/Element.fragment.graphql.gen'

export type ElementState = CRUDModalState<ElementFragment>

export const initialState: CRUDModalState<ElementFragment> = {
  ...initialCrudState,
}

export const elementSlice = createCrudSlice('element', initialState, {})

export const elementActions = elementSlice.actions
export const elementReducer = elementSlice.reducer

export const selectElement = (rootState: DefaultRootState) => rootState.element
