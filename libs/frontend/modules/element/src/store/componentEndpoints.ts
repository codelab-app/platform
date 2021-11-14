import {
  COMPONENT_CACHE_TAG,
  ELEMENT_CACHE_TAG,
  providesAll,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/component.endpoints.graphql.gen'

export const componentApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateComponent: {
      invalidatesTags: () => [COMPONENT_CACHE_TAG, ELEMENT_CACHE_TAG],
    },
    GetComponents: {
      providesTags: (result) =>
        providesAll(result?.getComponents, COMPONENT_CACHE_TAG),
    },
  },
})

export { generatedApi as componentEndpoints }

export const {
  useCreateComponentMutation,
  useGetComponentsQuery,
  useLazyGetComponentsQuery,
} = generatedApi
