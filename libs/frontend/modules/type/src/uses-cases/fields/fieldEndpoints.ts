import {
  FIELD_CACHE_TAG,
  invalidatesAll,
  providesById,
  TYPE_GRAPH_CACHE_TAG,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from './field.endpoints.graphql.gen'

export const fieldApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateField: {
      invalidatesTags: (result) => [
        TYPE_GRAPH_CACHE_TAG,
        providesById(result?.createField?.id, FIELD_CACHE_TAG)[0],
      ],
    },
    DeleteField: {
      invalidatesTags: () =>
        invalidatesAll(FIELD_CACHE_TAG, TYPE_GRAPH_CACHE_TAG),
    },
    GetField: {
      providesTags: (result) =>
        providesById(result?.getField?.id, FIELD_CACHE_TAG),
    },
    UpdateField: {
      invalidatesTags: (result) => [
        { type: FIELD_CACHE_TAG, id: result?.updateField?.id },
        { type: TYPE_GRAPH_CACHE_TAG },
      ],
    },
  },
})

export { generatedApi as fieldEndpoints }

export const {
  useCreateFieldMutation,
  useDeleteFieldMutation,
  useGetFieldQuery,
  useLazyGetFieldQuery,
  useUpdateFieldMutation,
} = generatedApi
