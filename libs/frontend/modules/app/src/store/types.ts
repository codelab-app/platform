import {
  AppActionType,
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/abstract/core'
import { AppFragment } from '../graphql/App.fragment.graphql.gen'

export type AppState = CRUDModalState<AppFragment, AppActionType> & {
  currentApp?: AppFragment
}

export type OpenDeleteAppModalAction = OpenDeleteModalActionPayload<AppFragment>

export type OpenUpdateAppModalAction = OpenUpdateModalActionPayload<AppFragment>

export type SetCurrentAppAction = { currentApp: AppFragment }
