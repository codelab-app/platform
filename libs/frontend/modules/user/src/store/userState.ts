import {
  CRUDActionType,
  CRUDModalState,
  OpenDeleteModalActionPayload,
} from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { __UserFragment } from '../graphql/User.fragment.graphql.gen'

export interface UserState extends CRUDModalState<__UserFragment> {
  deleteMetadata?: {
    userNames: string
  }
}

export interface UserStateDeletePayload
  extends OpenDeleteModalActionPayload<__UserFragment> {
  userNames: string
}

export const initialState: UserState = {
  ...initialCrudState,
  deleteMetadata: undefined,
}

export const userSlice = createCrudSlice('user', initialState, {
  openDeleteModal: (
    state,
    { payload }: PayloadAction<UserStateDeletePayload>,
  ) => ({
    ...state,
    entity: payload.entity,
    deleteIds: payload.deleteIds,
    actionType: CRUDActionType.Delete,
    deleteMetadata: { userNames: payload.userNames },
  }),
  resetModal: (s) => ({
    ...s,
    ...initialState,
  }),
})

export const selectUser = (rootState: DefaultRootState): UserState =>
  rootState.user
