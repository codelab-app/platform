import { atom } from 'recoil'
import { GetAppsListQuery } from '../../../../../libs/generated/src/graphql-client-hasura.generated'

export type AppType = GetAppsListQuery['apps'] extends Array<infer T>
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
