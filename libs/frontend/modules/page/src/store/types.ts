import {
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { PageBaseFragment } from '../graphql/PageBase.fragment.graphql.gen'

export type PageState = CRUDModalState<PageBaseFragment> & {
  currentPage?: PageBaseFragment
}

export type OpenDeletePageModalAction =
  OpenDeleteModalActionPayload<PageBaseFragment>

export type OpenUpdatePageModalAction =
  OpenUpdateModalActionPayload<PageBaseFragment>

export type SetCurrentPageAction = { currentPage: PageBaseFragment }
