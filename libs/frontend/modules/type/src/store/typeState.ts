import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { TypeFragment } from '../graphql/Type.fragment.graphql.gen'
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

export const typeActions = typeSlice.actions
export const typeReducer = typeSlice.reducer
