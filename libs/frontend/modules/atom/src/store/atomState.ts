import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { SetSelectedAtomIdsModalAction } from '.'
import { AtomState } from './types'

export const initialState: AtomState = {
  ...initialCrudState,
  selectedIds: [],
}

export const atomSlice = createCrudSlice('atom', initialState, {
  setSelectedIds: (
    state: AtomState,
    { payload }: PayloadAction<SetSelectedAtomIdsModalAction>,
  ) => ({
    ...state,
    selectedIds: payload.selectedIds,
  }),
})
