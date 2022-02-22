import {
  ELEMENT_CACHE_TAG,
  invalidatesAll,
  providesAll,
  TAG_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import {
  api as generatedApi,
  GetTagGraphsQuery,
} from '../graphql/tag.endpoints.v2.graphql.gen'
import { TagFragment } from '../graphql/Tag.fragment.v2.graphql.gen'

const updateTagCache = (updatedTag: TagFragment) => {
  return generatedApi.util.updateQueryData(
    'GetTagGraphs',
    undefined,
    (draft: GetTagGraphsQuery) => {
      const cachedTag = draft.tagGraphs?.vertices.find(
        (el) => el.id === updatedTag.id,
      )

      if (cachedTag) {
        cachedTag.name = updatedTag.name
      }
    },
  )
}

generatedApi.enhanceEndpoints({
  addTagTypes: [TAG_CACHE_TAG],
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
      invalidatesTags: () => invalidatesAll(ELEMENT_CACHE_TAG),
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled } = api
        const { data } = await queryFulfilled
        const updatedTag = data?.updateTags?.tags[0]
        dispatch(updateTagCache(updatedTag))
      },
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
