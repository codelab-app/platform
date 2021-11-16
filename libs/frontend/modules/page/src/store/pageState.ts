import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { PageState, SetCurrentPageAction } from './types'

export const intialState: PageState = {
  ...initialCrudState,
  currentPage: undefined,
}

export const pageSlice = createCrudSlice('page', intialState, {
  setCurrentPage: (
    state: PageState,
    { payload }: PayloadAction<SetCurrentPageAction>,
  ) => ({
    ...state,
    currentPage: payload.currentPage,
  }),
})
