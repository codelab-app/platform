import {
  invalidatesAll,
  PAGE_CACHE_TAG,
  providesAll,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql'

generatedApi.enhanceEndpoints({
  endpoints: {
    CreatePages: {
      invalidatesTags: (result) => invalidatesAll(PAGE_CACHE_TAG),
    },
    GetPages: {
      providesTags: (result) => providesAll(result?.pages, PAGE_CACHE_TAG),
    },
    DeletePages: {
      invalidatesTags: () => invalidatesAll(PAGE_CACHE_TAG),
    },
    UpdatePages: {
      // TODO: optimize to invalidate only updated ids
      invalidatesTags: () => invalidatesAll(PAGE_CACHE_TAG),
    },
  },
})

export { generatedApi as pageEndpoints }

export const {
  useCreatePagesMutation,
  useDeletePagesMutation,
  useUpdatePagesMutation,
  useGetPagesQuery,
  useLazyGetPagesQuery,
} = generatedApi
