import {
  ELEMENT_CACHE_TAG,
  invalidatesAll,
  providesAll,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/element.endpoints.v2.graphql.gen'

export const elementApiV2 = generatedApi.enhanceEndpoints({
  endpoints: {
    GetElements: {
      providesTags: (result) =>
        providesAll(result?.elements, ELEMENT_CACHE_TAG),
    },
    CreateElements: {
      invalidatesTags: (result) => invalidatesAll(ELEMENT_CACHE_TAG),
    },
    DeleteElements: {
      invalidatesTags: () => invalidatesAll(ELEMENT_CACHE_TAG),
    },
    UpdateElements: {
      invalidatesTags: () => invalidatesAll(ELEMENT_CACHE_TAG),
    },
  },
})

export { generatedApi as elementEndpointsV2 }

export const {
  useCreateElementsMutation,
  useDeleteElementsMutation,
  useUpdateElementsMutation,
  useGetElementsQuery,
  useLazyGetElementsQuery,
} = generatedApi
