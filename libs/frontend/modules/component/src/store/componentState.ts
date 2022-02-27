import { CRUDModalState } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { IComponent } from '@codelab/shared/abstract/core'
import { DefaultRootState } from 'react-redux'

export type ComponentState = CRUDModalState<IComponent>

const initialState: CRUDModalState<IComponent> = initialCrudState

export const componentSlice = createCrudSlice('component', initialState, {})

export const componentActions = componentSlice.actions
export const componentReducer = componentSlice.reducer

export const selectComponent = (rootState: DefaultRootState) =>
  rootState.component
