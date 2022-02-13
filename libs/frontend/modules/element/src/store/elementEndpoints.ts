import {
  COMPONENT_CACHE_TAG,
  ELEMENT_CACHE_TAG,
  ELEMENT_GRAPH_CACHE_TAG,
  providesById,
} from '@codelab/frontend/model/infra/redux'
import { api as generatedApi } from '../graphql/element.endpoints.graphql.gen'

export const elementApi = generatedApi.enhanceEndpoints({
  endpoints: {
    UpdateElementProps: {
      invalidatesTags: (result) =>
        providesById(result?.updateElementProps?.id, ELEMENT_CACHE_TAG),
    },
    ConvertElementToComponent: {
      invalidatesTags: () => [
        ELEMENT_CACHE_TAG,
        ELEMENT_GRAPH_CACHE_TAG,
        COMPONENT_CACHE_TAG,
      ],
    },
  },
})

export { generatedApi as elementEndpoints }

export const {
  useUpdateElementPropsMutation,
  useConvertElementToComponentMutation,
} = generatedApi
