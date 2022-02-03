import { CRUDModalState } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { TypeFragment } from '../graphql'
import { SetSelectedTypeIdsModalAction } from '.'

export type TypeState = CRUDModalState<TypeFragment> & {
  selectedIds: Array<string>
}

const initialState: TypeState = {
  ...initialCrudState,
  selectedIds: [],
}

export const typeSlice = createCrudSlice('type', initialState, {
  setSelectedIds: (
    state: TypeState,
    { payload }: PayloadAction<SetSelectedTypeIdsModalAction>,
  ) => ({
    ...state,
    selectedIds: payload.selectedIds,
  }),
})
