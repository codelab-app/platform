import {
  APP_CACHE_TAG,
  invalidatesAll,
  invalidatesById,
  providesAll,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from './App.web.graphql.gen'

// will add cache invalidation logic
export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    GetApps: {
      providesTags: (result) => providesAll(result?.apps, APP_CACHE_TAG),
    },
    GetApp: {
      providesTags: (result) => providesById(result?.app?.id, APP_CACHE_TAG),
    },
    CreateApp: {
      invalidatesTags: () => invalidatesAll(APP_CACHE_TAG),
    },
    DeleteApp: {
      invalidatesTags: () => invalidatesAll(APP_CACHE_TAG),
    },
    UpdateApp: {
      invalidatesTags: (result) =>
        invalidatesById(result?.updateApp?.id, APP_CACHE_TAG),
    },
  },
})

export { api as appApi }
export const {
  useGetAppsQuery,
  useLazyGetAppsQuery,
  useGetAppQuery,
  useLazyGetAppQuery,
  useCreateAppMutation,
  useDeleteAppMutation,
  useUpdateAppMutation,
} = api
