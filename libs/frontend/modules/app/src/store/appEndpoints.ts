import {
  APP_CACHE_TAG,
  invalidatesAll,
  invalidatesById,
  providesAll,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/App.endpoints.graphql.gen'

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
    ExportApp: {
      providesTags: (_, __, payload) =>
        providesById(payload.variables?.input.appId, APP_CACHE_TAG),
    },
    ImportApp: {
      invalidatesTags: () => invalidatesAll(APP_CACHE_TAG),
    },
  },
})
export { generatedApi as appEndpoints }
export const {
  useGetAppsQuery,
  useLazyGetAppsQuery,
  useGetAppQuery,
  useLazyGetAppQuery,
  useCreateAppMutation,
  useDeleteAppMutation,
  useUpdateAppMutation,
  useExportAppQuery,
  useLazyExportAppQuery,
  useImportAppMutation,
} = generatedApi
