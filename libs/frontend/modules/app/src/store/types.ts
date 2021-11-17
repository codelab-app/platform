import {
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { AppFragment } from '../graphql/App.fragment.graphql.gen'

export type AppState = CRUDModalState<AppFragment> & {
  currentApp?: AppFragment
}
export type OpenDeleteAppModalAction = OpenDeleteModalActionPayload<AppFragment>
export type OpenUpdateAppModalAction = OpenUpdateModalActionPayload<AppFragment>
export type SetCurrentAppAction = { currentApp: AppFragment }
