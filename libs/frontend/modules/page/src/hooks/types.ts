import {
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { PageBaseFragment } from '../graphql/PageBase.fragment.graphql.gen'

export type OpenDeletePageModalAction =
  OpenDeleteModalActionPayload<PageBaseFragment>

export type OpenUpdatePageModalAction =
  OpenUpdateModalActionPayload<PageBaseFragment>
