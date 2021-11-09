import {
  invalidatesAll,
  providesAll,
  providesById,
  TYPE_CACHE_TAG,
  TYPE_GRAPH_CACHE_TAG,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from './type.endpoints.graphql.gen'

export const typeApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateType: {
      invalidatesTags: () => [TYPE_GRAPH_CACHE_TAG, TYPE_CACHE_TAG],
    },
    GetType: {
      providesTags: (result) =>
        providesById(result?.getType?.id, TYPE_CACHE_TAG),
    },
    DeleteType: {
      invalidatesTags: () =>
        invalidatesAll(TYPE_CACHE_TAG, TYPE_GRAPH_CACHE_TAG),
    },
    GetTypeGraph: {
      providesTags: (result, _, arg) => [
        {
          type: TYPE_GRAPH_CACHE_TAG,
          id: arg.variables?.input.where.id ?? undefined,
        },
        ...(result?.getTypeGraph?.vertices.map((v) => ({
          type: TYPE_CACHE_TAG,
          id: v.id,
        })) ?? []),
      ],
    },
    GetTypes: {
      providesTags: (result) => providesAll(result?.getTypes, TYPE_CACHE_TAG),
    },
    UpdateEnumType: {
      invalidatesTags: (result) =>
        providesById(result?.updateEnumType?.id, TYPE_CACHE_TAG),
    },
    UpdatePrimitiveType: {
      invalidatesTags: (result) =>
        providesById(result?.updatePrimitiveType?.id, TYPE_CACHE_TAG),
    },
    UpdateType: {
      invalidatesTags: (result) =>
        providesById(result?.updateType?.id, TYPE_CACHE_TAG),
    },
    UpdateUnionType: {
      invalidatesTags: (result) => [
        providesById(result?.updateUnionType?.id, TYPE_CACHE_TAG)[0],
        TYPE_GRAPH_CACHE_TAG,
      ],
    },
    GetTypeKinds: {
      providesTags: (result) => providesAll(result?.getTypes, TYPE_CACHE_TAG),
    },
  },
})

export { generatedApi as typeEndpoints }

export const {
  useCreateTypeMutation,
  useDeleteTypeMutation,
  useGetTypeGraphQuery,
  useGetTypeQuery,
  useGetTypesQuery,
  useLazyGetTypeGraphQuery,
  useLazyGetTypeQuery,
  useLazyGetTypesQuery,
  useUpdateEnumTypeMutation,
  useUpdatePrimitiveTypeMutation,
  useUpdateTypeMutation,
  useUpdateUnionTypeMutation,
  useGetTypeKindsQuery,
  useLazyGetTypeKindsQuery,
} = generatedApi
