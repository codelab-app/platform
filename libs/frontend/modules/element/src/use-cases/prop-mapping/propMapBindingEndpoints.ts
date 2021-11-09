import {
  ELEMENT_CACHE_TAG,
  providesById,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../../graphql/prop-map-binding.endpoints.graphql.gen'

export const propMapBindingApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreatePropMapBinding: {
      invalidatesTags: (result, _, args) =>
        providesById(args.variables?.input.elementId, ELEMENT_CACHE_TAG),
    },
    DeletePropMapBinding: {
      invalidatesTags: () => [ELEMENT_CACHE_TAG],
    },
    UpdatePropMapBinding: {
      invalidatesTags: () => [ELEMENT_CACHE_TAG],
    },
  },
})

export { generatedApi as propMapBindingEndpoints }

export const {
  useCreatePropMapBindingMutation,
  useDeletePropMapBindingMutation,
  useUpdatePropMapBindingMutation,
} = generatedApi
