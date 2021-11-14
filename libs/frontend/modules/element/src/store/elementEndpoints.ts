import {
  COMPONENT_CACHE_TAG,
  ELEMENT_CACHE_TAG,
  ELEMENT_GRAPH_CACHE_TAG,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/element.endpoints.graphql.gen'

export const elementApi = generatedApi.enhanceEndpoints({
  endpoints: {
    GetElement: {
      providesTags: (result) =>
        providesById(result?.getElement?.id, ELEMENT_CACHE_TAG),
    },
    CreateElement: {
      invalidatesTags: (result) => [
        ELEMENT_GRAPH_CACHE_TAG,
        providesById(result?.createElement?.id, ELEMENT_CACHE_TAG)[0],
      ],
    },
    DeleteElement: {
      invalidatesTags: () => [
        ELEMENT_CACHE_TAG,
        ELEMENT_GRAPH_CACHE_TAG,
        COMPONENT_CACHE_TAG, // The element could be a component too
      ],
    },
    GetElementGraph: {
      providesTags: (result, _, arg) => [
        {
          type: ELEMENT_GRAPH_CACHE_TAG,
          id: arg.variables?.input.where.id ?? undefined,
        },
        ...(result?.getElementGraph.vertices.map((v) => ({
          type: ELEMENT_CACHE_TAG,
          id: v.id,
        })) ?? []),
      ],
    },
    MoveElement: {
      invalidatesTags: (result) =>
        providesById(result?.moveElement?.id, ELEMENT_CACHE_TAG),
    },
    UpdateElement: {
      invalidatesTags: (result) =>
        providesById(result?.updateElement?.id, ELEMENT_CACHE_TAG),
    },
    UpdateElementProps: {
      invalidatesTags: (result) =>
        providesById(result?.updateElementProps?.id, ELEMENT_CACHE_TAG),
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
