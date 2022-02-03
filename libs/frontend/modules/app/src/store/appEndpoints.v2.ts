import {
  APP_CACHE_TAG,
  invalidatesAll,
  invalidatesById,
  invalidatesByIds,
  providesAll,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/App.endpoints.v2.graphql.gen'

generatedApi.enhanceEndpoints({
  endpoints: {
    CreateApps: {
      invalidatesTags: (result) => invalidatesAll(APP_CACHE_TAG),
    },
    GetApps: {
      providesTags: (result) => providesAll(result?.apps, APP_CACHE_TAG),
    },
    DeleteApps: {
      invalidatesTags: () => invalidatesAll(APP_CACHE_TAG),
    },
    UpdateApps: {
      invalidatesTags: (result) =>
        invalidatesByIds(result?.updateApps?.apps, APP_CACHE_TAG),
    },
  },
})

export { generatedApi as appEndpoints }

export const {
  useCreateAppsMutation,
  useUpdateAppsMutation,
  useGetAppsQuery,
  useDeleteAppsMutation,
} = generatedApi
