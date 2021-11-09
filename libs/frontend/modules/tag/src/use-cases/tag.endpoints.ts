import {
  invalidatesAll,
  invalidatesById,
  providesAll,
  TAG_CACHE_TAG,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from './tag.endpoints.graphql.gen'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    GetTags: {
      providesTags: (result) => providesAll(result?.getTags, TAG_CACHE_TAG),
    },
    GetTagGraphs: {
      providesTags: () => providesAll([], TAG_CACHE_TAG),
    },
    GetTagGraph: {
      providesTags: (result) => providesAll([], TAG_CACHE_TAG),
    },
    CreateTag: {
      invalidatesTags: () => invalidatesAll(TAG_CACHE_TAG),
    },
    DeleteTags: {
      invalidatesTags: () => invalidatesAll(TAG_CACHE_TAG),
    },
    UpdateTag: {
      invalidatesTags: (result) =>
        invalidatesById(result?.updateTag?.id, TAG_CACHE_TAG),
    },
  },
})
export { generatedApi as tagEndpoints }
export const {
  useCreateTagMutation,
  useDeleteTagsMutation,
  useExportTagsQuery,
  useLazyExportTagsQuery,
  useGetTagGraphQuery,
  useLazyGetTagGraphQuery,
  useGetTagGraphsQuery,
  useLazyGetTagGraphsQuery,
  useGetTagsQuery,
  useLazyGetTagsQuery,
  useImportTagsMutation,
  useUpdateTagMutation,
} = generatedApi
