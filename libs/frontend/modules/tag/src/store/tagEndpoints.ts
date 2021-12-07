import {
  COMPONENT_CACHE_TAG,
  invalidatesAll,
  providesAll,
  TAG_CACHE_TAG,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/tag.endpoints.graphql.gen'

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
      invalidatesTags: () => [TAG_CACHE_TAG, COMPONENT_CACHE_TAG],
    },
    DeleteTags: {
      invalidatesTags: () => invalidatesAll(TAG_CACHE_TAG),
    },
    UpdateTag: {
      invalidatesTags: (result) => [
        { type: TAG_CACHE_TAG, id: result?.updateTag?.id },
        COMPONENT_CACHE_TAG,
      ],
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
