import {
  COMPONENT_CACHE_TAG,
  invalidatesAll,
  providesAll,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/component.endpoints.v2.graphql.gen'

generatedApi.enhanceEndpoints({
  endpoints: {
    CreateComponents: {
      invalidatesTags: (result) => invalidatesAll(COMPONENT_CACHE_TAG),
    },
    GetComponents: {
      providesTags: (result) =>
        providesAll(result?.components, COMPONENT_CACHE_TAG),
    },
    DeleteComponents: {
      invalidatesTags: () => invalidatesAll(COMPONENT_CACHE_TAG),
    },
    UpdateComponents: {
      invalidatesTags: () => invalidatesAll(COMPONENT_CACHE_TAG),
    },
  },
})

export { generatedApi as componentEndpoints }

export const {
  useCreateComponentsMutation,
  useDeleteComponentsMutation,
  useUpdateComponentsMutation,
  useGetComponentsQuery,
  useLazyGetComponentsQuery,
} = generatedApi
