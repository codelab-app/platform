import {
  ActionType,
  createCrudSlice,
  CRUDModalState,
} from '@codelab/frontend/view/components'
import { DefaultRootState } from 'react-redux'
import { PageBaseFragment } from '../graphql/PageBase.fragment.graphql.gen'

export type PageState = CRUDModalState<PageBaseFragment>

export const intialState: CRUDModalState<PageBaseFragment> = {
  actionType: ActionType.None,
  loading: false,
  deleteIds: [],
  updateId: '',
  entity: undefined,
}

export const pageSlice = createCrudSlice('page', intialState, {})

// Action creators are generated for each case reducer function
export const pageActions = pageSlice.actions
export const pageReducer = pageSlice.reducer

export const selectPage = (rootState: DefaultRootState) => rootState.page
