import {
  invalidatesAll,
  invalidatesById,
  PAGE_CACHE_TAG,
  providesAll,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/Page.endpoints.graphql.gen'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    GetPages: {
      providesTags: (result) => providesAll(result?.pages, PAGE_CACHE_TAG),
    },
    GetPage: {
      providesTags: (result) => providesById(result?.page?.id, PAGE_CACHE_TAG),
    },
    CreatePage: {
      invalidatesTags: () => invalidatesAll(PAGE_CACHE_TAG),
    },
    DeletePage: {
      invalidatesTags: () => invalidatesAll(PAGE_CACHE_TAG),
    },
    UpdatePage: {
      invalidatesTags: (result) =>
        invalidatesById(result?.updatePage?.id, PAGE_CACHE_TAG),
    },
  },
})

export { generatedApi as pageEndpoints }
export const {
  useCreatePageMutation,
  useDeletePageMutation,
  useGetPageQuery,
  useLazyGetPageQuery,
  useGetPagesQuery,
  useLazyGetPagesQuery,
  useUpdatePageMutation,
  useAppPagesQuery,
  useLazyAppPagesQuery,
} = generatedApi
