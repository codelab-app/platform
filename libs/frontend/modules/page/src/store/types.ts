import {
  CRUDModalState,
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/abstract/core'
import { IPage } from '@codelab/shared/abstract/core'

export type PageState = CRUDModalState<IPage> & {
  currentPage?: IPage
}

export type OpenDeletePageModalAction = OpenDeleteModalActionPayload<IPage>

export type OpenUpdatePageModalAction = OpenUpdateModalActionPayload<IPage>

export type SetCurrentPageAction = { currentPage: IPage }
