import { __AppFragment } from '@codelab/codegen/graphql'
import { atom } from 'recoil'

export type AppType = __AppFragment

export interface AppState {
  loading: boolean
  modalVisible: boolean
  /** This is the currently updated app or undefined if no app is being edited atm */
  editingApp: AppType | undefined
}

export const initialAppState: AppState = {
  modalVisible: false, // do we need this, can't we use crudModal?
  loading: false,
  editingApp: undefined,
}

export const appState = atom<AppState>({
  key: 'appState',
  default: initialAppState,
})
