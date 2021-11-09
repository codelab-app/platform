import {
  invalidatesAll,
  providesAll,
  providesById,
  USER_CACHE_TAG,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from './user.endpoints.graphql.gen'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    DeleteUser: {
      invalidatesTags: () => invalidatesAll(USER_CACHE_TAG),
    },
    GetMe: {
      providesTags: (result) => providesById(result?.getMe?.id, USER_CACHE_TAG),
    },
    GetUsers: {
      providesTags: (result) => providesAll(result?.users, USER_CACHE_TAG),
    },
  },
})

export { generatedApi as userEndpoints }
export const {
  useDeleteUserMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = generatedApi
