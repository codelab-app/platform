import {
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { AppFragment } from '../graphql'

export type OpenDeleteAppModalAction = OpenDeleteModalActionPayload<AppFragment>
export type OpenUpdateAppModalAction = OpenUpdateModalActionPayload<AppFragment>
