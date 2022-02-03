import {
  invalidatesAll,
  invalidatesById,
  TYPE_CACHE_TAG,
  TYPE_GRAPH_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/type.endpoints.v2.graphql.gen'

export const typeEndpoints = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateField: {
      invalidatesTags: (r) => [
        ...invalidatesAll(TYPE_GRAPH_CACHE_TAG),
        ...invalidatesById(r?.upsertFieldEdge.source, TYPE_CACHE_TAG),
      ],
    },
    UpdateField: {
      invalidatesTags: (r) => [
        ...invalidatesAll(TYPE_GRAPH_CACHE_TAG),
        ...invalidatesById(r?.upsertFieldEdge.source, TYPE_CACHE_TAG),
      ],
    },
    DeleteField: {
      invalidatesTags: (r) =>
        invalidatesAll(TYPE_GRAPH_CACHE_TAG, TYPE_CACHE_TAG),
    },
  },
})

export const {
  useUpdateFieldMutation,
  useCreateFieldMutation,
  useIsTypeDescendantOfQuery,
  useDeleteFieldMutation,
  useLazyIsTypeDescendantOfQuery,
  useGetTypeReferencesQuery,
  useLazyGetTypeReferencesQuery,
} = typeEndpoints
