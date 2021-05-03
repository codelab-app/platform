import { GetAppsListQuery } from '@codelab/hasura'
import { atom } from 'recoil'

export type AppType = GetAppsListQuery['app'] extends Array<infer T>
  ? T
  : unknown

export interface AppState {
  loading: boolean
  modalVisible: boolean
  /** This is the currently updated app or undefined if no app is being edited atm */
  editingApp: AppType | undefined
}

export const initialAppState: AppState = {
  modalVisible: false,
  loading: false,
  editingApp: undefined,
}

export const appState = atom<AppState>({
  key: 'appState',
  default: initialAppState,
})
