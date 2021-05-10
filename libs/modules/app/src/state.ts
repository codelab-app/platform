import { GetAppsListQuery, Maybe } from '@codelab/dgraph'
import { atom } from 'recoil'

export type AppType = GetAppsListQuery['queryApp'] extends
  | Maybe<Array<Maybe<infer T>>>
  | undefined
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
