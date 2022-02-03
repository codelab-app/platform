import {
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/abstract/core'
import { PageFragment } from '../graphql/Page.fragment.v2.graphql.gen'

export type PageState = CRUDModalState<PageFragment> & {
  currentPage?: PageFragment
}

export type OpenDeletePageModalAction =
  OpenDeleteModalActionPayload<PageFragment>

export type OpenUpdatePageModalAction =
  OpenUpdateModalActionPayload<PageFragment>

export type SetCurrentPageAction = { currentPage: PageFragment }
