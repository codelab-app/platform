import {
  invalidatesAll,
  invalidatesByIds,
  providesAll,
  TAG_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/tag.endpoints.v2.graphql.gen'

generatedApi.enhanceEndpoints({
  endpoints: {
    GetTags: {
      providesTags: (result) => providesAll(result?.tags, TAG_CACHE_TAG),
    },
    GetTagGraphs: {
      providesTags: () => providesAll([], TAG_CACHE_TAG),
    },
    CreateTags: {
      invalidatesTags: (result) => invalidatesAll(TAG_CACHE_TAG),
    },
    DeleteTags: {
      invalidatesTags: () => invalidatesAll(TAG_CACHE_TAG),
    },
    UpdateTags: {
      invalidatesTags: (result) =>
        invalidatesByIds(result?.updateTags?.tags, TAG_CACHE_TAG),
    },
  },
})

export { generatedApi as tagEndpoints }

export const {
  useCreateTagsMutation,
  useUpdateTagsMutation,
  useGetTagsQuery,
  useGetTagGraphsQuery,
  useDeleteTagsMutation,
} = generatedApi
