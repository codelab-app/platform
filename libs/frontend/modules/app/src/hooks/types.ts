import {
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { AppFragment } from '../graphql/App.fragment.graphql.gen'

export type OpenDeleteAppModalAction = OpenDeleteModalActionPayload<AppFragment>
export type OpenUpdateAppModalAction = OpenUpdateModalActionPayload<AppFragment>
