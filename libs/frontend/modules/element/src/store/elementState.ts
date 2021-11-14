import {
  ActionType,
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { ElementFragment } from '../graphql'

export interface ElementStateCreateMetadata {
  parentElementId?: string
}

export interface ElementState extends CRUDModalState<ElementFragment> {
  createMetadata?: ElementStateCreateMetadata
}

export const initialState: ElementState = {
  ...initialCrudState,
  createMetadata: undefined,
}

export const elementSlice = createCrudSlice('element', initialState, {
  openCreateModal: (
    state,
    { payload }: PayloadAction<ElementStateCreateMetadata | undefined>,
  ) => {
    state.actionType = ActionType.Create
    state.entity = undefined
    state.createMetadata = payload
  },
  resetModal: (s) => ({
    ...s,
    actionType: ActionType.None,
    entity: undefined,
    deleteIds: [],
    updateId: '',
    createMetadata: undefined,
  }),
})

export const elementActions = elementSlice.actions
export const elementReducer = elementSlice.reducer

export const selectElement = (rootState: DefaultRootState) => rootState.element
