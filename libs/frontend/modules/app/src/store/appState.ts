import { ImportAppActionType } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { AppState, SetCurrentAppAction } from './types'

const initialState: AppState = {
  ...initialCrudState,
  currentApp: undefined,
}

export const appSlice = createCrudSlice('app', initialState, {
  setCurrentApp: (
    state: AppState,
    { payload }: PayloadAction<SetCurrentAppAction>,
  ) => ({
    ...state,
    currentApp: payload.currentApp,
  }),
  openImportModal: (state) => ({
    ...state,
    actionType: ImportAppActionType.Import,
  }),
})
