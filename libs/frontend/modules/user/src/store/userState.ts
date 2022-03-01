import {
  CRUDActionType,
  CRUDModalState,
  OpenDeleteModalActionPayload,
} from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { IUser, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { __UserFragment } from '../graphql/User.fragment.graphql.gen'
import { SetAuthenticatedUserPayload } from './types'

export interface UserState extends CRUDModalState<__UserFragment> {
  deleteMetadata?: {
    userNames: string
  }
  user: IUser
}

export interface UserStateDeletePayload
  extends OpenDeleteModalActionPayload<__UserFragment> {
  userNames: string
}

const initialState: UserState = {
  ...initialCrudState,
  deleteMetadata: undefined,
  // Current user
  user: {
    id: '',
    auth0Id: '',
    roles: [],
  },
}

export const userSlice = createCrudSlice(
  'user',
  initialState,
  {
    setAuthenticatedUser: (
      state: UserState,
      { payload }: PayloadAction<SetAuthenticatedUserPayload>,
    ) => {
      return {
        ...state,
        user: {
          id: '',
          auth0Id: payload?.sub,
          roles: payload?.[JWT_CLAIMS]?.roles,
        },
      }
    },
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
  },
  {
    [HYDRATE]: (state, action) => {
      if (!action.payload.user) {
        return state
      }

      const { user } = action.payload.user
      // console.log('userState HYDRATE', state, user)

      return {
        ...state,
        user,
      }
    },
  },
)
