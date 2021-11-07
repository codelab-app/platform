import {
  ELEMENT_CACHE_TAG,
  ELEMENT_GRAPH_CACHE_TAG,
  invalidatesAll,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/element.endpoints.graphql.gen'

export const api = generatedApi.enhanceEndpoints({
  endpoints: {
    GetElement: {
      providesTags: (result) =>
        providesById(result?.getElement?.id, ELEMENT_CACHE_TAG),
    },
    CreateElement: {
      invalidatesTags: () => [ELEMENT_GRAPH_CACHE_TAG, ELEMENT_CACHE_TAG],
    },
    DeleteElement: {
      invalidatesTags: () =>
        invalidatesAll(ELEMENT_CACHE_TAG, ELEMENT_GRAPH_CACHE_TAG),
    },
    GetElementGraph: {
      providesTags: (result, _, arg) =>
        providesById(
          arg.variables?.input.where.id ?? undefined,
          ELEMENT_GRAPH_CACHE_TAG,
        ),
    },
    MoveElement: {
      invalidatesTags: () =>
        invalidatesAll(ELEMENT_CACHE_TAG, ELEMENT_GRAPH_CACHE_TAG),
    },
    UpdateElement: {
      invalidatesTags: () => [ELEMENT_GRAPH_CACHE_TAG, ELEMENT_CACHE_TAG],
    },
    UpdateElementProps: {
      invalidatesTags: () => [ELEMENT_GRAPH_CACHE_TAG, ELEMENT_CACHE_TAG],
    },
  },
})
export { generatedApi as elementEndpoints }
export const {
  useCreateElementMutation,
  useDeleteElementMutation,
  useGetElementQuery,
  useLazyGetElementQuery,
  useGetElementGraphQuery,
  useLazyGetElementGraphQuery,
  useMoveElementMutation,
  useUpdateElementMutation,
  useUpdateElementPropsMutation,
} = generatedApi
